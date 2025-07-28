<template>
  <div
    class="bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden"
    v-if="!isLoading"
  >
    <div class="overflow-x-auto" v-if="data && data.stocks.length > 0">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="column in TABLE_COLUMNS"
              :key="column.key"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <div
                class="flex items-center space-x-1"
                :class="
                  isSortableColumn(column.key)
                    ? 'cursor-pointer hover:text-gray-700 select-none'
                    : ''
                "
                @click="handleColumnClick(column.key)"
              >
                <span>{{ column.label }}</span>
                <template v-if="isSortableColumn(column.key)">
                  <ChevronDownIcon v-if="showDownArrow(column.key)" class="w-4 h-4 text-blue-500" />
                  <ChevronUpIcon
                    v-else-if="showUpArrow(column.key)"
                    class="w-4 h-4 text-blue-500"
                  />
                </template>
              </div>
            </th>

            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Acciones
            </th>
          </tr>
        </thead>

        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="stock in data.stocks"
            :key="stock.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-6 py-4">
              <div class="flex flex-col max-w-[150px]">
                <div class="text-sm font-medium text-gray-900">
                  {{ stock.ticker }}
                </div>

                <div class="text-sm text-gray-500 whitespace-nowrap truncate">
                  {{ stock.companyName }}
                </div>
              </div>
            </td>

            <td class="px-6 py-4 whitespace-nowrap truncate max-w-[200px] text-sm text-gray-900">
              {{ stock.brokerage }}
            </td>

            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800"
              >
                {{ stock.action }}
              </span>
            </td>

            <td class="px-6 py-4 whitespace-nowrap text-xs">
              <span class="font-medium">{{ stock.ratingTo }}</span>
            </td>

            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <span class="font-medium">${{ formatNumber(stock.targetTo) }}</span>
            </td>

            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(stock.time) }}
            </td>

            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="handleDetails(stock)"
                @mouseover="prefetchStockAnalyst(stock.id)"
                class="text-blue-600 hover:text-blue-900 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <EyeIcon class="w-4 h-4" />

                <span>Ver detalles</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty state -->
    <div v-else-if="data && data.stocks.length === 0" class="text-center py-12">
      <FileTextIcon class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-2 text-sm font-medium text-gray-900">No hay recomendaciones</h3>
      <p class="mt-1 text-sm text-gray-500">
        No se encontraron recomendaciones con los filtros aplicados.
      </p>
    </div>

    <!-- Pagination -->
    <StockPagination
      v-if="data?.stocks && data.stocks.length > 0"
      :next="data.cursor.next"
      :prev="data.cursor.prev"
    />
  </div>

  <div v-else>
    <StockTableSkeleton />
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'

import { useQueryClient } from '@tanstack/vue-query'
import { EyeIcon, FileTextIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'

import { useStocks } from '@/composables/useStocks'
import { useTableSort } from '@/composables/useTableSort'
import { TABLE_COLUMNS } from '@/constants/tableColumns'
import { formatDate, formatNumber } from '@/helpers/formatters'
import { StockAnalystClient } from '@/services/stockAnalystClient'
import { useStockFiltersStore } from '@/stores/stockFiltersStore'
import { useStockModalStore } from '@/stores/stockModalStore'
import { useStockStore } from '@/stores/stockStore'
import type { Stock } from '@/type/stockModel'

import StockPagination from './StockPagination.vue'
import StockTableSkeleton from './StockTableSkeleton.vue'

const stockFiltersStorage = useStockFiltersStore()
const { filters } = storeToRefs(stockFiltersStorage)

const stockStore = useStockStore()
const { cursor, limit } = storeToRefs(stockStore)

const {
  sortField,
  sortOrder,
  isSortableColumn,
  handleColumnClick,
  showDownArrow,
  showUpArrow,
  resetSort,
} = useTableSort({
  onSortChange: () => stockStore.resetCursor(),
})

const { data, isLoading } = useStocks({
  searchQuery: () => filters.value.searchQuery,
  limit: () => limit.value,
  cursor: () => ({
    current: cursor.value.current ?? undefined,
    direction: cursor.value.direction ?? undefined,
  }),
  filters: () => ({
    brokerage: filters.value.brokerage,
  }),
  sort: () =>
    sortField.value && sortOrder.value
      ? { field: sortField.value, order: sortOrder.value }
      : undefined,
})

const queryClient = useQueryClient()

const prefetchStockAnalyst = async (stockId: string) => {
  await queryClient.fetchQuery({
    queryKey: ['stockAnalyst', stockId],
    queryFn: () => StockAnalystClient.getByStockId(stockId),
  })
}

const stockModalStore = useStockModalStore()

const handleDetails = async (item: Stock) => {
  const stockAnalyst = await queryClient.fetchQuery({
    queryKey: ['stockAnalyst', item.id],
    queryFn: () => StockAnalystClient.getByStockId(item.id),
  })

  stockModalStore.openModal({
    itemStock: item,
    itemStockAnalyst: stockAnalyst,
  })
}

watch([() => filters.value.searchQuery, () => filters.value.brokerage], () => {
  stockStore.resetCursor()
  stockStore.resetLimit()
  resetSort()
})

watch([() => sortField.value, () => sortOrder.value, () => limit.value], () => {
  stockStore.resetCursor()
})
</script>

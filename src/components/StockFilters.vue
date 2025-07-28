<template>
  <div
    class="bg-white rounded-lg shadow-sm border border-gray-300 p-6 mb-6"
    v-if="!isLoading && brokerages"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Search -->
      <div class="lg:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Buscar por ticker o empresa
        </label>

        <div class="relative">
          <input
            v-model="localSearchQuery"
            type="text"
            placeholder="Ej: AAPL, Apple Inc..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <SearchIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <!-- Filter Controls -->

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Firma</label>
        <select
          v-model="filters.brokerage"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Todas las firmas</option>
          <option v-for="brokerage in brokerages" :key="brokerage" :value="brokerage">
            {{ brokerage }}
          </option>
        </select>
      </div>
    </div>

    <!-- Clear filters button -->
    <div class="mt-4">
      <button
        @click="clearFilters"
        class="text-sm text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
      >
        Limpiar filtros
      </button>
    </div>
  </div>

  <div v-else>
    <StockFiltersSkeleton />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

import { SearchIcon } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'

import { useBrokerages } from '@/composables/useBrokerages'
import { useStockFiltersStore } from '@/stores/stockFiltersStore'

import StockFiltersSkeleton from './StockFiltersSkeleton.vue'

const stockFiltersStore = useStockFiltersStore()
const { filters } = storeToRefs(stockFiltersStore)

const { data: brokerages, isLoading } = useBrokerages()

const localSearchQuery = ref('')
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(localSearchQuery, (newValue) => {
  if (debounceTimer) clearTimeout(debounceTimer)

  debounceTimer = setTimeout(() => {
    if (newValue.trim().length >= 1) {
      stockFiltersStore.setFilter('searchQuery', newValue)

      return
    }

    stockFiltersStore.setFilter('searchQuery', '')
  }, 500)
})

const clearFilters = () => {
  localSearchQuery.value = ''
  stockFiltersStore.resetFilters()
}
</script>

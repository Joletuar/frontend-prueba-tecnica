<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="column in TABLE_COLUMNS"
              :key="column.key"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <div class="flex items-center space-x-1">
                <span>{{ column.label }}</span>
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
          <tr v-for="n in 10" :key="n" class="animate-pulse">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
            </td>

            <td class="px-6 py-4 whitespace-nowrap">
              <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            </td>

            <td class="px-6 py-4 whitespace-nowrap">
              <div class="h-4 bg-gray-200 rounded w-1/3"></div>
            </td>

            <td class="px-6 py-4 whitespace-nowrap">
              <div class="h-4 bg-gray-200 rounded w-2/3"></div>
            </td>

            <td class="px-6 py-4 whitespace-nowrap">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            </td>

            <td class="px-6 py-4 whitespace-nowrap">
              <div class="h-4 bg-gray-200 rounded w-1/3"></div>
            </td>

            <td class="px-6 py-4 whitespace-nowrap">
              <div class="h-4 bg-gray-200 rounded w-1/4"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <StockPaginationSkeleton />
  </div>
</template>

<script setup lang="ts">
import { TABLE_COLUMNS } from '@/constants/tableColumns'

import StockPaginationSkeleton from './StockPaginationSkeleton.vue'
</script>

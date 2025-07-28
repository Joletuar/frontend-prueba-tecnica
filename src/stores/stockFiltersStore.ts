import { reactive } from 'vue'

import { defineStore } from 'pinia'

export const useStockFiltersStore = defineStore('StockFilters', () => {
  const filters = reactive({
    searchQuery: '',
    brokerage: '',
  })

  const setFilter = (key: keyof typeof filters, value: string) => {
    filters[key] = value
  }

  const resetFilters = () => {
    filters.searchQuery = ''
    filters.brokerage = ''
  }

  return {
    filters,

    setFilter,
    resetFilters,
  }
})

import { reactive, ref } from 'vue'

import { defineStore } from 'pinia'

export const useStockStore = defineStore('StockStore', () => {
  const cursor = reactive<{
    current?: string | null
    direction?: 'next' | 'prev'
  }>({
    current: null,
    direction: undefined,
  })
  const limit = ref(10)

  const setCursor = (cursorValue: string | null, direction: 'next' | 'prev') => {
    cursor.current = cursorValue
    cursor.direction = direction
  }

  const resetCursor = () => {
    cursor.current = null
    cursor.direction = undefined
  }

  const setLimit = (newLimit?: number) => {
    if (newLimit) limit.value = newLimit
  }

  const resetLimit = () => {
    limit.value = 10
  }

  return {
    cursor,
    limit,

    setCursor,
    resetCursor,
    setLimit,
    resetLimit,
  }
})

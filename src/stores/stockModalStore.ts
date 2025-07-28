import { ref } from 'vue'

import { defineStore } from 'pinia'

import type { StockAnalyst } from '@/type/stockAnalystModel'
import type { Stock } from '@/type/stockModel'

export const useStockModalStore = defineStore('StockModalStore', () => {
  const isOpen = ref(false)

  const stock = ref<Stock | null>(null)
  const stockAnalyst = ref<StockAnalyst | null>(null)

  const openModal = (props: { itemStock: Stock; itemStockAnalyst: StockAnalyst }) => {
    const { itemStock, itemStockAnalyst } = props

    if (itemStock) stock.value = itemStock
    if (itemStockAnalyst) stockAnalyst.value = itemStockAnalyst

    isOpen.value = true
  }

  const closeModal = () => {
    isOpen.value = false

    stock.value = null
    stockAnalyst.value = null
  }

  return {
    isOpen,
    stock,
    stockAnalyst,

    openModal,
    closeModal,
  }
})

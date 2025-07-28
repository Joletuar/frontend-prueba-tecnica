<template>
  <div>
    <select
      id="stock-limit"
      class="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      v-model="localLimit"
    >
      <option v-for="limit in LIMITS" :key="limit" :value="limit">Mostrando {{ limit }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { storeToRefs } from 'pinia'

import { useStockStore } from '@/stores/stockStore'

const stockStore = useStockStore()
const { limit } = storeToRefs(stockStore)

const localLimit = computed({
  get: () => limit.value,
  set: (value) => stockStore.setLimit(value),
})
const LIMITS = [10, 30, 50, 100]
</script>

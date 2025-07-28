<template>
  <div
    v-if="!isLoading && bestRecommendation && stockData"
    class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6"
  >
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-900 flex items-center">
        <span class="text-2xl mr-2">🏆</span>
        Mejor Recomendación
      </h2>
      <div
        class="flex items-center px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 rounded-full text-sm font-bold shadow-lg"
      >
        <span class="text-lg mr-1">⭐</span>
        <span>{{ Math.round(bestRecommendation.score) }}% confianza</span>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div>
        <div class="text-sm text-gray-600 font-medium">Empresa</div>
        <div class="text-lg font-semibold text-gray-900">{{ stockData.ticker }}</div>
        <div class="text-sm text-gray-500 italic">{{ stockData.companyName }}</div>
      </div>

      <div>
        <div class="text-sm text-gray-600 font-medium">Precio Actual</div>
        <div class="text-2xl font-bold text-blue-600">
          ${{ formatNumber(bestRecommendation.currentPrice) }}
        </div>
      </div>

      <div>
        <div class="text-sm text-gray-600 font-medium">Potencial de Crecimiento</div>
        <div class="text-2xl font-bold text-green-600">
          +{{ formatNumber(bestRecommendation.potentialGrowth) }}%
        </div>
      </div>
    </div>

    <div class="mb-6">
      <div class="text-gray-600 mb-2 font-medium">Análisis</div>
      <div class="bg-blue-50 rounded-lg p-4">
        <p class="text-sm text-gray-700">{{ bestRecommendation.reason }}</p>
      </div>
    </div>

    <div class="flex justify-end">
      <button
        @click="handleViewDetails"
        class="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer"
      >
        <EyeIcon class="w-4 h-4 mr-2" />
        Ver análisis completo
      </button>
    </div>
  </div>

  <div v-else>
    <BestRecommendationCardSkeleton />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { EyeIcon } from 'lucide-vue-next'

import { useBestRecommendation } from '@/composables/useBestRecommendation'
import { useStock } from '@/composables/useStock'
import { formatNumber } from '@/helpers/formatters'
import { useStockModalStore } from '@/stores/stockModalStore'

import BestRecommendationCardSkeleton from './BestRecommendationCardSkeleton.vue'

const { data: bestRecommendation, isLoading } = useBestRecommendation()

const stockId = computed(() => bestRecommendation.value?.stockId || '')

const { data: stockData } = useStock(stockId)

const stockModalStore = useStockModalStore()

const handleViewDetails = () => {
  stockModalStore.openModal({
    itemStock: stockData.value!,
    itemStockAnalyst: bestRecommendation.value!,
  })
}
</script>

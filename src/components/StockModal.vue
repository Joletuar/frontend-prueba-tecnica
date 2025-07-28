<template>
  <Teleport to="#portals">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
      @click.self="closeModal"
    >
      <div
        class="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 bg-white rounded-full opacity-75"></div>
              <h2 class="text-xl font-bold">{{ stock?.ticker }}</h2>
              <span class="text-blue-100">{{ stock?.companyName }}</span>
            </div>

            <button @click="closeModal" class="cursor-pointer">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div class="p-6 space-y-6">
            <!-- Main Stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Current Price -->
              <div
                class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200"
              >
                <div class="text-sm text-green-600 font-medium mb-1">Precio Actual</div>
                <div class="text-2xl font-bold text-green-800">
                  ${{ formatNumber(stockAnalyst?.currentPrice || 0) }}
                </div>
              </div>

              <!-- Potential Growth -->
              <div
                class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200"
              >
                <div class="text-sm text-blue-600 font-medium mb-1">Crecimiento Potencial</div>
                <div class="text-2xl font-bold text-blue-800 flex items-center">
                  {{ stockAnalyst?.potentialGrowth?.toFixed(1) }}%
                  <svg class="w-5 h-5 ml-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>

              <!-- Score -->
              <div
                class="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200"
              >
                <div class="text-sm text-purple-600 font-medium mb-1">Puntuación</div>
                <div class="flex items-center">
                  <div class="text-2xl font-bold text-purple-800">
                    {{ stockAnalyst?.score || 0 }}/100
                  </div>
                  <div class="ml-3 flex-1">
                    <div class="w-full bg-purple-200 rounded-full h-2">
                      <div
                        class="bg-purple-600 h-2 rounded-full transition-all duration-500"
                        :style="{ width: `${((stockAnalyst?.score || 0) / 100) * 100}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="text-xs text-purple-600 mt-1">
                  {{ getScoreLevel(stockAnalyst?.score || 0) }}
                </div>
              </div>
            </div>

            <!-- Stock Information -->
            <div class="bg-gray-50 rounded-xl p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Información del Stock
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-3 border-2 border-gray-200 p-5 rounded-xl">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Brokerage:</span>
                    <span class="font-medium text-gray-800">{{ stock?.brokerage }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Acción:</span>
                    <span
                      class="px-3 py-1 rounded-full text-sm font-medium"
                      :class="getActionClass(stock?.action)"
                    >
                      {{ getActionText(stock?.action) }}
                    </span>
                  </div>

                  <div class="flex justify-between">
                    <span class="text-gray-600">Rating:</span>
                    <span class="font-medium text-gray-800">
                      {{ stock?.ratingFrom }} →
                      <template v-if="(stock?.ratingFrom ?? '').length > 10"><br /></template
                      >{{ stock?.ratingTo }}
                    </span>
                  </div>
                </div>

                <div class="space-y-3 border-2 border-gray-200 p-5 rounded-xl">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Target Price:</span>
                    <div class="text-right">
                      <div class="font-medium text-gray-800">
                        ${{ formatNumber(stock?.targetFrom || 0) }} → ${{
                          formatNumber(stock?.targetTo || 0)
                        }}
                      </div>
                      <div
                        class="text-sm font-medium"
                        :class="
                          getPriceChangeTextClass(stock?.targetFrom || 0, stock?.targetTo || 0)
                        "
                      >
                        {{ getPriceChange(stock?.targetFrom || 0, stock?.targetTo || 0) }}
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Fecha:</span>
                    <span class="font-medium text-gray-800">{{
                      formatDate(stock?.time || new Date())
                    }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Analyst Reasoning -->
            <div
              class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200"
            >
              <h3 class="text-lg font-semibold text-amber-800 mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Análisis
              </h3>
              <div class="bg-white bg-opacity-60 rounded-lg p-4 mb-4">
                <div class="text-sm text-amber-700 font-medium mb-2">Composición del Score:</div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div class="text-center">
                    <div class="font-semibold text-blue-600">Rating (40%)</div>
                    <div class="text-gray-600">{{ getRatingChange(stock) }}</div>
                  </div>
                  <div class="text-center">
                    <div class="font-semibold text-green-600">Target (30%)</div>
                    <div class="text-gray-600">{{ getTargetAnalysis(stock, stockAnalyst) }}</div>
                  </div>
                  <div class="text-center">
                    <div class="font-semibold text-purple-600">Acción (20%)</div>
                    <div class="text-gray-600">{{ getActionDescription(stock?.action) }}</div>
                  </div>
                  <div class="text-center">
                    <div class="font-semibold text-orange-600">Recencia (10%)</div>
                    <div class="text-gray-600">{{ getRecencyInfo(stock) }}</div>
                  </div>
                </div>
              </div>
              <p class="text-amber-800 leading-relaxed font-medium">{{ stockAnalyst?.reason }}</p>
            </div>

            <!-- Key Metrics -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Investment Recommendation -->
              <div class="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h4 class="font-semibold text-gray-800 mb-3">Recomendación de Inversión</h4>
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600">Precio Objetivo Promedio:</span>
                    <span class="font-bold text-lg">
                      ${{ formatNumber(((stock?.targetFrom || 0) + (stock?.targetTo || 0)) / 2) }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600">Potencial de Ganancia:</span>
                    <span
                      class="font-bold text-lg"
                      :class="
                        stockAnalyst?.potentialGrowth && stockAnalyst.potentialGrowth > 0
                          ? 'text-green-600'
                          : 'text-red-600'
                      "
                    >
                      {{ stockAnalyst?.potentialGrowth?.toFixed(1) }}%
                    </span>
                  </div>
                </div>
              </div>

              <!-- Risk Assessment -->
              <div class="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h4 class="font-semibold text-gray-800 mb-3">Evaluación de Riesgo</h4>
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600">Confianza:</span>
                    <div class="flex items-center">
                      <div class="flex space-x-1">
                        <div
                          v-for="i in 5"
                          :key="i"
                          class="w-3 h-3 rounded-full"
                          :class="
                            i <= Math.floor((stockAnalyst?.score || 0) / 20)
                              ? 'bg-yellow-400'
                              : 'bg-gray-300'
                          "
                        ></div>
                      </div>
                      <span class="ml-2 text-sm text-gray-600">
                        {{ getConfidenceLevel(stockAnalyst?.score || 0) }}
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600">Volatilidad Esperada:</span>
                    <span
                      class="px-2 py-1 rounded text-sm font-medium"
                      :class="getVolatilityClass(stockAnalyst?.potentialGrowth || 0)"
                    >
                      {{ getVolatilityLevel(stockAnalyst?.potentialGrowth || 0) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import {
  formatDate,
  formatNumber,
  getPriceChange,
  getPriceChangeTextClass,
} from '@/helpers/formatters'
import {
  getActionClass,
  getActionDescription,
  getActionText,
  getConfidenceLevel,
  getRatingChange,
  getRecencyInfo,
  getScoreLevel,
  getTargetAnalysis,
  getVolatilityClass,
  getVolatilityLevel,
} from '@/helpers/stockModalHelpers'
import { useStockModalStore } from '@/stores/stockModalStore'

const stockModalStore = useStockModalStore()
const { isOpen, stock, stockAnalyst } = storeToRefs(stockModalStore)

const closeModal = () => {
  stockModalStore.closeModal()
}
</script>

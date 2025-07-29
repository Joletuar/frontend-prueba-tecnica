<template>
  <!-- Mobile-->
  <div
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
  >
    <div class="flex-1 flex justify-between sm:hidden">
      <button
        @click="goToPrevPage()"
        :disabled="!canGoPrev"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </button>

      <button
        @click="goToFirstPage"
        :disabled="isFirstPage"
        class="mx-2 relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Inicio
      </button>

      <button
        @click="goToNextPage()"
        :disabled="!canGoNext"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente
      </button>
    </div>

    <!-- Desktop-->

    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <button
          @click="goToFirstPage"
          :disabled="isFirstPage"
          class="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed mr-3 cursor-pointer"
        >
          Volver al inicio
        </button>
      </div>

      <div>
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
          <button
            @click="goToPrevPage"
            :disabled="!canGoPrev"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeftIcon class="h-5 w-5" />
          </button>

          <button
            @click="goToNextPage"
            :disabled="!canGoNext"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRightIcon class="h-5 w-5" />
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'

import { useStockStore } from '@/stores/stockStore'

interface Props {
  next?: string | null
  prev?: string | null
}

const props = withDefaults(defineProps<Props>(), { next: null, prev: null })

const stockStore = useStockStore()

const canGoNext = computed(() => !!props.next)
const canGoPrev = computed(() => !!props.prev)
const isFirstPage = computed(() => !props.prev)

const goToNextPage = () => {
  stockStore.setCursor(props.next, 'next')
}

const goToPrevPage = () => {
  stockStore.setCursor(props.prev, 'prev')
}

const goToFirstPage = () => {
  stockStore.resetCursor()
}
</script>

<template>
  <!-- Mobile-->
  <div
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
  >
    <div class="flex-1 flex justify-between sm:hidden">
      <button
        class="relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md cursor-not-allowed opacity-50"
      >
        Anterior
      </button>

      <button
        class="mx-2 relative inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md cursor-not-allowed opacity-50"
      >
        Inicio
      </button>

      <button
        class="relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md cursor-not-allowed opacity-50"
      >
        Siguiente
      </button>
    </div>

    <!-- Desktop-->
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <button
          class="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md cursor-not-allowed opacity-50 mr-3"
        >
          Volver al inicio
        </button>
      </div>

      <div>
        <div class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
          <div
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium size-9 animate-pulse cursor-not-allowed text-gray-300"
          >
            <ChevronLeftIcon class="h-5 w-5" />
          </div>
          <div
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium size-9 cursor-not-allowed"
          >
            <ChevronRightIcon class="h-5 w-5 text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'
</script>

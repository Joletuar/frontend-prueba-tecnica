<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Datos Bursátiles</h1>
        <p class="text-gray-600">Gestiona y visualiza los datos bursátiles</p>
      </div>

      <!-- Best Recommendation -->
      <BestRecommendationCard />

      <!-- Search and Filters -->
      <StockFilters />

      <!--Number of Elements-->
      <div class="md:flex mb-3 justify-end">
        <StockElementsLimit />
      </div>

      <!-- Table -->
      <StockTable />
    </div>

    <!-- Modal -->
    <StockModal />
  </div>
</template>

<script setup lang="ts">
import BestRecommendationCard from '@/components/BestRecommendationCard.vue'
import StockElementsLimit from '@/components/StockElementsLimit.vue'
import StockFilters from '@/components/StockFilters.vue'
import StockModal from '@/components/StockModal.vue'
import StockTable from '@/components/StockTable.vue'
</script>

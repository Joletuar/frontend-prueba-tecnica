import { computed, toValue, type MaybeRefOrGetter } from 'vue'

import { useQuery } from '@tanstack/vue-query'

import { StockClient } from '@/services/stockClient'

export const useStock = (id: MaybeRefOrGetter<string>) => {
  const idValue = computed(() => toValue(id))

  const query = useQuery({
    queryKey: ['stocks', 'id', idValue],
    queryFn: () => StockClient.getStockById(idValue.value),
    enabled: computed(() => !!idValue.value),
  })

  return query
}

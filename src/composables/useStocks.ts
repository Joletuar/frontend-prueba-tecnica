import { computed, type MaybeRefOrGetter, toValue } from 'vue'

import { useQuery } from '@tanstack/vue-query'

import { StockClient } from '@/services/stockClient'
import type { StockCursorHttpRequest } from '@/type/stockModel'

interface UseStocksProps {
  searchQuery?: MaybeRefOrGetter<string>
  limit?: MaybeRefOrGetter<number>
  cursor: MaybeRefOrGetter<{
    current?: string
    direction?: 'next' | 'prev'
  }>
  filters: MaybeRefOrGetter<{
    ticker?: string
    brokerage?: string
  }>
  sort?: MaybeRefOrGetter<
    | {
        order: 'asc' | 'desc'
        field: 'time' | 'brokerage' | 'action'
      }
    | undefined
  >
}

export const useStocks = (props: UseStocksProps) => {
  const queryParams = computed<StockCursorHttpRequest>(() => ({
    search: toValue(props.searchQuery),
    limit: toValue(props.limit),
    cursor: toValue(props.cursor),
    filters: toValue(props.filters),
    sort: toValue(props.sort),
  }))

  const query = useQuery({
    queryKey: ['Stocks', queryParams],
    queryFn: () => StockClient.getAll(queryParams.value),
  })

  return query
}

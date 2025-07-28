import { useQuery } from '@tanstack/vue-query'

import { StockAnalystClient } from '@/services/stockAnalystClient'

export const useBestRecommendation = () => {
  const query = useQuery({
    queryKey: ['best-recommendation'],
    queryFn: StockAnalystClient.getBestRecommendation,
  })

  return query
}

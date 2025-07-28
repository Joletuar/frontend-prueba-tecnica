import { useQuery } from '@tanstack/vue-query'

import { StockClient } from '@/services/stockClient'

export const useBrokerages = () => {
  const query = useQuery({
    queryKey: ['brokerages'],
    queryFn: StockClient.getAllBrokerages,
    staleTime: 1000 * 60 * 60, // 1 hour,
  })

  return query
}

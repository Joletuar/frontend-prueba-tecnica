import { StockAnalystMapper } from '@/helpers/stockAnalsytMapper'
import type { ApiSuccessResponse } from '@/type/apiResponse'
import type { StockAnalyst, StockAnalystHttpResponse } from '@/type/stockAnalystModel'

import { apiClient } from './apiClient'

export const StockAnalystClient = {
  async getByStockId(stockId: string): Promise<StockAnalyst> {
    try {
      const res = await apiClient.get<ApiSuccessResponse<StockAnalystHttpResponse[]>>(
        `/stock-analyst/stock/${stockId}`,
      )

      const { data } = res.data
      const item = data[0]

      if (!item) throw new Error(`No stock analyst found for stock id: ${stockId}`)

      return StockAnalystMapper.toModel(item)
    } catch (error) {
      console.error('Error fetching stock analyst by stock id:', error)

      throw error
    }
  },

  async getBestRecommendation(): Promise<StockAnalyst> {
    try {
      const res =
        await apiClient.get<ApiSuccessResponse<StockAnalystHttpResponse>>('/stock-analyst/best')

      const { data } = res.data

      return StockAnalystMapper.toModel(data)
    } catch (error) {
      console.error('Error fetching best recommendation:', error)

      throw error
    }
  },
}

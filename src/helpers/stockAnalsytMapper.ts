import type { StockAnalyst, StockAnalystHttpResponse } from '@/type/stockAnalystModel'

export const StockAnalystMapper = {
  toModel(response: StockAnalystHttpResponse): StockAnalyst {
    return {
      id: response.id,
      stockId: response.stockId,
      currentPrice: response.currentPrice,
      potentialGrowth: response.potentialGrowth,
      score: response.score,
      reason: response.reason,
    }
  },

  toModelList(responseList: StockAnalystHttpResponse[]): StockAnalyst[] {
    return responseList.map(this.toModel)
  },
}

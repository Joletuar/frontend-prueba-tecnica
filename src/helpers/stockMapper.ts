import type { Stock, StockHttpResponse } from '@/type/stockModel'

export const StockMapper = {
  toModel(dto: StockHttpResponse): Stock {
    return {
      id: dto.id,
      ticker: dto.ticker,
      companyName: dto.companyName,
      brokerage: dto.brokerage,
      action: dto.action,
      ratingFrom: dto.ratingFrom,
      ratingTo: dto.ratingTo,
      targetFrom: dto.targetFrom,
      targetTo: dto.targetTo,
      time: new Date(dto.time),
    }
  },

  toModelList(dtos: StockHttpResponse[]): Stock[] {
    return dtos.map(this.toModel)
  },
}

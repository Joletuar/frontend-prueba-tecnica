export interface Stock {
  id: string
  ticker: string
  companyName: string
  brokerage: string
  action: string
  ratingFrom: string
  ratingTo: string
  targetFrom: number
  targetTo: number
  time: Date
}

export interface StockHttpResponse extends Omit<Stock, 'time'> {
  time: string
}

export interface StockCursorHttpRequest {
  search?: string
  limit?: number
  cursor: {
    current?: string | null
    direction?: 'next' | 'prev'
  }
  filters: {
    brokerage?: string
  }
  sort?: {
    order: 'asc' | 'desc'
    field: 'time' | 'brokerage' | 'action'
  }
}

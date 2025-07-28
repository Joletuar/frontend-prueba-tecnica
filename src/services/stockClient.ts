import { StockMapper } from '@/helpers/stockMapper'
import type { ApiCursorPaginatedResponse, ApiSuccessResponse } from '@/type/apiResponse'
import type { Stock, StockCursorHttpRequest, StockHttpResponse } from '@/type/stockModel'

import { apiClient } from './apiClient'

export const StockClient = {
  async getAll(props: StockCursorHttpRequest): Promise<{
    stocks: Stock[]
    cursor: {
      next?: string | null
      prev?: string | null
    }
  }> {
    const params = builtParams(props)

    try {
      const res = await apiClient.get<ApiCursorPaginatedResponse<StockHttpResponse>>('/stocks', {
        params: {
          ...params,
        },
      })

      const { data, meta } = res.data

      return {
        stocks: StockMapper.toModelList(data),
        cursor: {
          next: meta.pagination.next,
          prev: meta.pagination.prev,
        },
      }
    } catch (error) {
      console.error('Error fetching stocks:', error)

      throw error
    }
  },

  async getAllBrokerages(): Promise<string[]> {
    try {
      const res = await apiClient.get<ApiSuccessResponse<string[]>>('/stocks/brokerages')

      const { data } = res.data

      return data
    } catch (error) {
      console.error('Error fetching brokerages:', error)

      throw error
    }
  },

  async getStockById(id: string): Promise<Stock> {
    try {
      const res = await apiClient.get<ApiSuccessResponse<StockHttpResponse>>(`/stocks/${id}`)

      const { data } = res.data

      return StockMapper.toModel(data)
    } catch (error) {
      console.error('Error fetching stock by id:', error)

      throw error
    }
  },
}

const builtParams = (props: StockCursorHttpRequest): Record<string, string | number> => {
  const params: Record<string, string | number> = {}

  if (props.limit) {
    params['limit'] = props.limit ? props.limit : 10
  }

  if (props.cursor.current) {
    if (props.cursor.direction === 'next') {
      params['next'] = props.cursor.current
    } else if (props.cursor.direction === 'prev') {
      params['prev'] = props.cursor.current
    }
  }

  if (props.filters.brokerage) {
    params['brokerage'] = props.filters.brokerage
  }

  if (props.search) {
    params['search'] = props.search
  }

  if (props.sort) {
    params['sortOrder'] = props.sort.order
    params['sortField'] = props.sort.field
  }

  return params
}

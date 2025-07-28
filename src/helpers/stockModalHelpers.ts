import type { StockAnalyst } from '@/type/stockAnalystModel'
import type { Stock } from '@/type/stockModel'

export const getActionClass = (action: string | undefined) => {
  switch (action?.toLowerCase()) {
    case 'upgrade':
      return 'bg-green-100 text-green-800'
    case 'downgrade':
      return 'bg-red-100 text-red-800'
    case 'initiate':
      return 'bg-blue-100 text-blue-800'
    case 'maintain':
    case 'reiterate':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const getActionText = (action: string | undefined) => {
  switch (action?.toLowerCase()) {
    case 'upgrade':
      return 'Mejora'
    case 'downgrade':
      return 'Rebaja'
    case 'initiate':
      return 'Iniciada'
    case 'maintain':
      return 'Mantener'
    case 'reiterate':
      return 'Reiterar'
    default:
      return action || 'N/A'
  }
}

export const getActionDescription = (action: string | undefined) => {
  switch (action?.toLowerCase()) {
    case 'upgrade':
      return 'Mejora (1.5x)'
    case 'downgrade':
      return 'Rebaja (0.5x)'
    case 'initiate':
      return 'Iniciada (1.2x)'
    case 'maintain':
      return 'Mantener (1.0x)'
    case 'reiterate':
      return 'Reiterar (1.0x)'
    default:
      return 'Estándar (1.0x)'
  }
}

export const getScoreLevel = (score: number) => {
  if (score >= 80) return 'Excelente'
  if (score >= 60) return 'Muy Bueno'
  if (score >= 40) return 'Bueno'
  if (score >= 20) return 'Regular'

  return 'Bajo'
}

export const getRatingChange = (stock: Stock | null) => {
  if (!stock) return 'N/A'

  const from = stock.ratingFrom
  const to = stock.ratingTo

  return from === to ? `${to} (sin cambio)` : `${from} → ${to}`
}

export const getTargetAnalysis = (stock: Stock | null, stockAnalyst: StockAnalyst | null) => {
  if (!stock || !stockAnalyst) return 'N/A'

  const current = stockAnalyst.currentPrice
  const target = stock.targetTo

  if (current > 0) return `$${current.toFixed(0)} → $${target}`

  return `$${stock.targetFrom} → $${target}`
}

export const getRecencyInfo = (stock: Stock | null) => {
  if (!stock) return 'N/A'

  const daysSince = Math.floor((Date.now() - stock.time.getTime()) / (1000 * 60 * 60 * 24))

  if (daysSince === 0) return 'Hoy'
  if (daysSince <= 7) return `${daysSince}d`

  return `${Math.floor(daysSince / 7)}sem`
}

export const getConfidenceLevel = (score: number) => {
  if (score >= 80) return 'Muy Alta'
  if (score >= 60) return 'Alta'
  if (score >= 40) return 'Media'
  if (score >= 20) return 'Baja'

  return 'Muy Baja'
}

export const getVolatilityClass = (growth: number) => {
  const absGrowth = Math.abs(growth)

  if (absGrowth >= 20) return 'bg-red-100 text-red-800'
  if (absGrowth >= 10) return 'bg-yellow-100 text-yellow-800'

  return 'bg-green-100 text-green-800'
}

export const getVolatilityLevel = (growth: number) => {
  const absGrowth = Math.abs(growth)

  if (absGrowth >= 20) return 'Alta'
  if (absGrowth >= 10) return 'Media'

  return 'Baja'
}

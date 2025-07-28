export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('us-en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value)
}

export const getPriceChangePercentage = (from: number, to: number) => {
  const change = ((to - from) / from) * 100

  return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`
}

export const getPriceChangeClass = (from: number, to: number) => {
  const change = to - from

  if (change > 0) return 'bg-green-100 text-green-800'
  if (change < 0) return 'bg-red-100 text-red-800'

  return 'bg-gray-100 text-gray-800'
}

export const getPriceChange = (from: number, to: number) => {
  const change = to - from
  const percentage = ((change / from) * 100).toFixed(1)

  return `${change > 0 ? '+' : ''}${'$'}${change} (${change > 0 ? '+' : ''}${percentage}%)`
}

export const getPriceChangeTextClass = (from: number, to: number) => {
  const change = to - from

  return change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'
}

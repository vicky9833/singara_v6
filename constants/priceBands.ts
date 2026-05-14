export const PRICE_BANDS = [
  { id: 'budget', label: 'Budget', min: 0, max: 999 },
  { id: 'mid', label: 'Mid-range', min: 1000, max: 2999 },
  { id: 'premium', label: 'Premium', min: 3000, max: 7999 },
  { id: 'luxury', label: 'Luxury', min: 8000, max: Infinity },
] as const

export type PriceBandId = typeof PRICE_BANDS[number]['id']

export const CATEGORIES = [
  { id: 'bridal', label: 'Bridal', icon: 'Crown' },
  { id: 'hair', label: 'Hair', icon: 'Scissors' },
  { id: 'skincare', label: 'Skincare', icon: 'Sparkles' },
  { id: 'makeup', label: 'Makeup', icon: 'Palette' },
  { id: 'nails', label: 'Nails', icon: 'Hand' },
  { id: 'brows', label: 'Brows & Lashes', icon: 'Eye' },
  { id: 'mehendi', label: 'Mehendi', icon: 'Flower' },
  { id: 'spa', label: 'Spa & Wellness', icon: 'Leaf' },
  { id: 'massage', label: 'Massage', icon: 'Heart' },
  { id: 'kids', label: 'Kids', icon: 'Star' },
] as const

export type CategoryId = typeof CATEGORIES[number]['id']

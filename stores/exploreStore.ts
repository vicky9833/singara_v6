import { create } from 'zustand'
import type { FilterState, ServiceCategory } from '@/types'

export const DEFAULT_FILTERS: FilterState = {
  categories: [],
  priceRange: [0, 999999],
  minRating: 0,
  sortBy: 'rating',
  availableOnly: false,
}

interface ExploreState {
  searchQuery: string
  filters: FilterState
  setSearchQuery: (q: string) => void
  setFilters: (f: FilterState) => void
  resetFilters: () => void
  toggleCategory: (c: ServiceCategory) => void
  setSortBy: (s: FilterState['sortBy']) => void
  setPriceRange: (r: [number, number]) => void
  setMinRating: (r: number) => void
  setAvailableOnly: (a: boolean) => void
}

export const useExploreStore = create<ExploreState>()((set) => ({
  searchQuery: '',
  filters: { ...DEFAULT_FILTERS },
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: { ...DEFAULT_FILTERS } }),
  toggleCategory: (c) =>
    set((state) => ({
      filters: {
        ...state.filters,
        categories: state.filters.categories.includes(c)
          ? state.filters.categories.filter((x) => x !== c)
          : [...state.filters.categories, c],
      },
    })),
  setSortBy: (sortBy) =>
    set((state) => ({ filters: { ...state.filters, sortBy } })),
  setPriceRange: (priceRange) =>
    set((state) => ({ filters: { ...state.filters, priceRange } })),
  setMinRating: (minRating) =>
    set((state) => ({ filters: { ...state.filters, minRating } })),
  setAvailableOnly: (availableOnly) =>
    set((state) => ({ filters: { ...state.filters, availableOnly } })),
}))

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ArtistDashboardStore {
  todayBookings: number
  todayEarnings: number
  pendingRequests: number
  totalEarnings: number
  weeklyEarnings: number[]
  avgRating: number
  totalReviews: number
  totalBookings: number
  profileViews: number
  isAvailable: boolean
  availabilityMode: 'available' | 'busy' | 'break'
  hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
  setAvailability: (available: boolean) => void
  setAvailabilityMode: (mode: 'available' | 'busy' | 'break') => void
}

export const useArtistDashboardStore = create<ArtistDashboardStore>()(
  persist(
    (set) => ({
      todayBookings: 2,
      todayEarnings: 18000,
      pendingRequests: 3,
      totalEarnings: 245000,
      weeklyEarnings: [8000, 12000, 0, 15000, 9000, 22000, 18000],
      avgRating: 4.8,
      totalReviews: 94,
      totalBookings: 210,
      profileViews: 1240,
      isAvailable: true,
      availabilityMode: 'available',
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
      setAvailability: (available) => set({ isAvailable: available }),
      setAvailabilityMode: (mode) => set({ availabilityMode: mode }),
    }),
    {
      name: 'singara-artist-dashboard',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)

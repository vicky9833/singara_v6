import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface StoredBooking {
  id: string
  artistId: string
  artistName: string
  serviceNames: string[]
  date: string
  time: string
  totalAmount: number
  status: 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
}

interface BookingsState {
  bookings: StoredBooking[]
  hasHydrated: boolean
  setHasHydrated: (v: boolean) => void
  addBooking: (booking: StoredBooking) => void
}

export const useBookingsStore = create<BookingsState>()(
  persist(
    (set) => ({
      bookings: [],
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
      addBooking: (booking) =>
        set((state) =>
          state.bookings.some((b) => b.id === booking.id)
            ? state
            : { bookings: [booking, ...state.bookings] },
        ),
    }),
    {
      name: 'singara-bookings',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesState {
  favoriteArtistIds: string[]
  hasHydrated: boolean
  setHasHydrated: (v: boolean) => void
  toggleFavorite: (artistId: string) => void
  isFavorite: (artistId: string) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteArtistIds: [],
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
      toggleFavorite: (artistId) =>
        set((state) => ({
          favoriteArtistIds: state.favoriteArtistIds.includes(artistId)
            ? state.favoriteArtistIds.filter((id) => id !== artistId)
            : [...state.favoriteArtistIds, artistId],
        })),
      isFavorite: (artistId) => get().favoriteArtistIds.includes(artistId),
    }),
    {
      name: 'singara-favorites',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)

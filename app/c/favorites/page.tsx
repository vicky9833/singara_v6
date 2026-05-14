'use client'

import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { getArtistById } from '@/lib/mock-data'
import ArtistCard from '@/components/shared/ArtistCard'
import type { Artist } from '@/types'

export default function FavoritesPage() {
  const router = useRouter()
  const favoriteArtistIds = useFavoritesStore((s) => s.favoriteArtistIds)

  const artists = favoriteArtistIds
    .map((id) => getArtistById(id))
    .filter((a): a is Artist => a !== undefined)

  return (
    <div
      className="flex flex-col min-h-[100dvh]"
      style={{ backgroundColor: 'var(--color-sandstone)', paddingBottom: 96 }}
    >
      {/* Header */}
      <div
        className="px-6 pt-5 pb-4 border-b border-dune"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 20px)' }}
      >
        <h1 className="font-heading text-ink" style={{ fontSize: 24 }}>
          Favorites
        </h1>
        {artists.length > 0 && (
          <p className="font-sans text-ash-warm mt-1" style={{ fontSize: 13 }}>
            {artists.length} {artists.length === 1 ? 'artist' : 'artists'} saved
          </p>
        )}
      </div>

      {/* Grid or empty state */}
      {artists.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-dune)' }}
          >
            <Heart size={28} strokeWidth={1.5} className="text-silver-sand" />
          </div>
          <p className="font-heading text-ink text-center" style={{ fontSize: 20 }}>
            No favorites yet
          </p>
          <p className="font-sans text-ash-warm text-center" style={{ fontSize: 14 }}>
            Artists you love will appear here
          </p>
          <button
            type="button"
            onClick={() => router.push('/c/explore')}
            className="mt-2 h-10 px-6 border border-emerald-jhoola text-emerald-jhoola font-sans font-semibold rounded-[12px]"
            style={{ fontSize: 14 }}
          >
            Explore artists
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-6 pt-4">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} variant="grid" showFavorite />
          ))}
        </div>
      )}
    </div>
  )
}


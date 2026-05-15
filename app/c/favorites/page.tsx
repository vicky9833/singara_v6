'use client'

import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { getArtistById } from '@/lib/mock-data'
import ArtistCard from '@/components/shared/ArtistCard'
import type { Artist } from '@/types'

// ── Skeleton card (matches grid ArtistCard shape) ────────────────────────────
function SkeletonCard() {
  return (
    <div
      className="bg-alabaster border border-dune overflow-hidden"
      style={{ borderRadius: '20px 32px 20px 20px' }}
    >
      <div
        className="h-[140px]"
        style={{ backgroundColor: 'var(--color-dune)' }}
      />
      <div className="px-3 py-3 space-y-2">
        <div className="h-3.5 rounded-full w-3/4" style={{ backgroundColor: 'var(--color-dune)' }} />
        <div className="h-3 rounded-full w-1/2" style={{ backgroundColor: 'var(--color-mist-warm)' }} />
        <div className="h-3 rounded-full w-1/3" style={{ backgroundColor: 'var(--color-mist-warm)' }} />
      </div>
    </div>
  )
}

export default function FavoritesPage() {
  const router = useRouter()
  const hasHydrated = useFavoritesStore((s) => s.hasHydrated)
  const favoriteArtistIds = useFavoritesStore((s) => s.favoriteArtistIds)

  const artists = favoriteArtistIds
    .map((id) => getArtistById(id))
    .filter((a): a is Artist => a !== undefined)

  return (
    <motion.div
      className="flex flex-col min-h-[100dvh]"
      style={{ backgroundColor: 'var(--color-sandstone)', paddingBottom: 96 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
    >
      {/* Header */}
      <div
        className="px-6 pt-5 pb-4 border-b border-dune"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 20px)' }}
      >
        <h1 className="font-heading text-ink" style={{ fontSize: 24 }}>
          Favorites
        </h1>
        {hasHydrated && artists.length > 0 && (
          <p className="font-sans text-ash-warm mt-1" style={{ fontSize: 13 }}>
            {artists.length} {artists.length === 1 ? 'artist' : 'artists'} saved
          </p>
        )}
      </div>

      {/* Skeleton while hydrating */}
      {!hasHydrated ? (
        <div className="grid grid-cols-2 gap-3 px-6 pt-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : artists.length === 0 ? (
        /* Empty state */
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
        /* Grid */
        <div className="grid grid-cols-2 gap-3 px-6 pt-4">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} variant="grid" showFavorite />
          ))}
        </div>
      )}
    </motion.div>
  )
}



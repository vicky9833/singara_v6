'use client'

import { useRouter } from 'next/navigation'
import { Star, Shield, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn, formatINR } from '@/lib/utils'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useHaptic } from '@/hooks/useHaptic'
import { ARTIST_CARD_GRADIENTS } from '@/lib/mock-data'
import type { Artist } from '@/types'

// ── Gradient assignment by artist id ────────────────────────────────────────
function getArtistGradient(artistId: string): string {
  const index = parseInt(artistId.replace(/\D/g, ''), 10) - 1
  return ARTIST_CARD_GRADIENTS[index % ARTIST_CARD_GRADIENTS.length]
}

// ── Shared props ─────────────────────────────────────────────────────────────
interface ArtistCardProps {
  artist: Artist
  variant?: 'featured' | 'grid'
  showFavorite?: boolean
  isFirst?: boolean
  isLast?: boolean
}

// ── Favorite button (used in both variants) ──────────────────────────────────
function FavoriteButton({ artistId }: { artistId: string }) {
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite)
  const hasHydrated = useFavoritesStore((s) => s.hasHydrated)
  const isFav = useFavoritesStore((s) => s.isFavorite(artistId))
  const isFavorite = hasHydrated ? isFav : false
  const { trigger: haptic } = useHaptic()

  function handleTap(e: React.MouseEvent) {
    e.stopPropagation()
    haptic('light')
    toggleFavorite(artistId)
  }

  return (
    <motion.button
      type="button"
      onClick={handleTap}
      whileTap={{ scale: 0.85 }}
      className="absolute top-2 right-2 w-[30px] h-[30px] rounded-full flex items-center justify-center"
      style={{ backgroundColor: 'var(--color-alabaster)' }}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <motion.div
        animate={{ scale: isFavorite ? [1, 1.3, 1] : 1 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <Heart
          size={14}
          strokeWidth={1.5}
          className={isFavorite ? 'text-vermilion' : 'text-silver-sand'}
          fill={isFavorite ? 'currentColor' : 'none'}
        />
      </motion.div>
    </motion.button>
  )
}

// ── Initials from artist ─────────────────────────────────────────────────────
function getInitials(artist: Artist): string {
  return (artist.firstName[0] + artist.lastName[0]).toUpperCase()
}

// ── Featured variant (200px wide, horizontal scroll) ─────────────────────────
function FeaturedCard({
  artist,
  showFavorite,
  isFirst,
  isLast,
}: ArtistCardProps) {
  const router = useRouter()

  return (
    <div className={cn(isFirst && 'ml-6', isLast && 'mr-6')}>
      <button
        type="button"
        onClick={() => router.push(`/c/artist/${artist.id}`)}
        className="w-[200px] flex-shrink-0 bg-alabaster border border-dune overflow-hidden text-left transition-transform duration-[220ms] active:scale-[0.98]"
        style={{ borderRadius: '20px 32px 20px 20px' }}
      >
        {/* Photo placeholder */}
        <div
          className="h-[120px] relative flex items-center justify-center"
          style={{ background: getArtistGradient(artist.id) }}
        >
          <span
            className="font-display font-semibold"
            style={{ fontSize: 28, color: 'var(--color-heritage-gold)' }}
          >
            {getInitials(artist)}
          </span>
          {showFavorite && <FavoriteButton artistId={artist.id} />}
        </div>

        {/* Info */}
        <div className="p-[14px]">
          <div className="flex items-center gap-1">
            <p className="font-sans font-semibold text-ink truncate flex-1" style={{ fontSize: 14 }}>
              {artist.displayName}
            </p>
            {artist.isVerified && (
              <Shield size={12} strokeWidth={1.5} className="text-emerald-jhoola flex-shrink-0" />
            )}
          </div>
          <p className="font-sans text-ash-warm mt-0.5 truncate" style={{ fontSize: 12 }}>
            {artist.categories[0].charAt(0).toUpperCase() + artist.categories[0].slice(1)} • {artist.area}
          </p>
          <div className="flex items-center gap-1 mt-2">
            <Star size={14} strokeWidth={1.5} className="text-marigold" fill="currentColor" />
            <span className="font-sans text-ink" style={{ fontSize: 13 }}>
              {artist.avgRating.toFixed(1)}
            </span>
            <span className="font-sans text-silver-sand" style={{ fontSize: 12 }}>
              ({artist.totalReviews})
            </span>
          </div>
          <p className="font-sans font-semibold text-emerald-jhoola mt-1" style={{ fontSize: 13 }}>
            From {formatINR(artist.startingPrice)}
          </p>
        </div>
      </button>
    </div>
  )
}

// ── Grid variant (fills column width, 2-col grid) ────────────────────────────
function GridCard({ artist, showFavorite }: ArtistCardProps) {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.push(`/c/artist/${artist.id}`)}
      className="bg-alabaster border border-dune overflow-hidden text-left w-full transition-transform duration-[220ms] active:scale-[0.98]"
      style={{ borderRadius: '20px 32px 20px 20px' }}
    >
      {/* Photo placeholder */}
      <div
        className="h-[140px] relative flex items-center justify-center"
        style={{ background: getArtistGradient(artist.id) }}
      >
        <span
          className="font-display font-semibold"
          style={{ fontSize: 32, color: 'var(--color-heritage-gold)' }}
        >
          {getInitials(artist)}
        </span>
        {showFavorite && <FavoriteButton artistId={artist.id} />}
      </div>

      {/* Info */}
      <div className="px-3 py-3">
        <div className="flex items-center gap-1">
          <p className="font-sans font-semibold text-ink truncate flex-1" style={{ fontSize: 14 }}>
            {artist.displayName}
          </p>
          {artist.isVerified && (
            <Shield size={12} strokeWidth={1.5} className="text-emerald-jhoola flex-shrink-0" />
          )}
        </div>
        <p className="font-sans text-ash-warm mt-0.5 truncate" style={{ fontSize: 12 }}>
          {artist.categories[0].charAt(0).toUpperCase() + artist.categories[0].slice(1)} • {artist.area}
        </p>
        <div className="flex items-center gap-1 mt-1.5">
          <Star size={14} strokeWidth={1.5} className="text-marigold" fill="currentColor" />
          <span className="font-sans text-ink" style={{ fontSize: 13 }}>
            {artist.avgRating.toFixed(1)}
          </span>
          <span className="font-sans text-silver-sand" style={{ fontSize: 12 }}>
            ({artist.totalReviews})
          </span>
        </div>
        <p className="font-sans font-semibold text-emerald-jhoola mt-1" style={{ fontSize: 13 }}>
          From {formatINR(artist.startingPrice)}
        </p>
      </div>
    </button>
  )
}

// ── Exported component ────────────────────────────────────────────────────────
export default function ArtistCard({
  artist,
  variant = 'grid',
  showFavorite = false,
  isFirst,
  isLast,
}: ArtistCardProps) {
  if (variant === 'featured') {
    return (
      <FeaturedCard
        artist={artist}
        showFavorite={showFavorite}
        isFirst={isFirst}
        isLast={isLast}
      />
    )
  }
  return <GridCard artist={artist} showFavorite={showFavorite} />
}

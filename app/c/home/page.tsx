'use client'

import { useRouter } from 'next/navigation'
import { Search, Crown, Sparkles, Sun, Camera, Paintbrush, Scissors, Droplets, Layers, Zap, Bell } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useProfileSetupStore } from '@/stores/profileSetupStore'
import { useSingaraPause } from '@/hooks/useSingaraPause'
import { getFeaturedArtists } from '@/lib/mock-data'
import ArtistCard from '@/components/shared/ArtistCard'

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const

// ── Time-of-day greeting ────────────────────────────────────────────────────
function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

// ── Category chips data ─────────────────────────────────────────────────────
const CATEGORIES = [
  { label: 'Bridal', slug: 'bridal', icon: Crown },
  { label: 'Party', slug: 'party', icon: Sparkles },
  { label: 'Everyday', slug: 'everyday', icon: Sun },
  { label: 'Editorial', slug: 'editorial', icon: Camera },
  { label: 'Mehendi', slug: 'mehendi', icon: Paintbrush },
  { label: 'Hair', slug: 'hair', icon: Scissors },
  { label: 'Skincare', slug: 'skincare', icon: Droplets },
  { label: 'Draping', slug: 'draping', icon: Layers },
]

// ── Home page ───────────────────────────────────────────────────────────────
const FEATURED_ARTISTS = getFeaturedArtists()

export default function HomePage() {
  const router = useRouter()
  const singaraPause = useSingaraPause()
  const firstName = useProfileSetupStore((s) => s.firstName)
  const hasHydrated = useProfileSetupStore((s) => s.hasHydrated)
  const timeOfDay = getTimeOfDay()

  const greeting =
    hasHydrated && firstName
      ? `Good ${timeOfDay}, ${firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()}`
      : `Good ${timeOfDay}`

  const handleSearchTap = () => {
    singaraPause(() => router.push('/c/explore'))
  }

  return (
    <motion.div
      className="flex flex-col"
      style={{ paddingBottom: 96 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: LUXURY_EASE, delay: 0.08 }}
    >
      {/* ── Greeting ── */}
      <div className="px-6 pt-4 flex items-start justify-between">
        <div className="flex-1">
          <h1
            className="font-display text-ink"
            style={{ fontSize: 28, fontWeight: 400 }}
          >
            {greeting}
          </h1>
          <p className="mt-2 font-sans text-ash-warm" style={{ fontSize: 14 }}>
            What are you looking for today?
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push('/c/notifications')}
          className="w-11 h-11 flex items-center justify-center rounded-full relative flex-shrink-0 mt-1 transition-colors duration-[220ms] active:bg-mist-warm"
        >
          <Bell size={22} strokeWidth={1.5} className="text-ink" />
          <span
            className="absolute top-2 right-2 w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--color-vermilion)' }}
          />
        </button>
      </div>

      {/* ── Search bar ── */}
      <div className="px-6 mt-4">
        <button
          type="button"
          onClick={handleSearchTap}
          className="w-full h-[52px] bg-alabaster flex items-center gap-3 px-4 border border-dune transition-transform duration-[220ms] active:scale-[0.98]"
          style={{ borderRadius: 26 }}
        >
          <Search size={20} strokeWidth={1.5} className="text-silver-sand flex-shrink-0" />
          <span className="font-sans text-silver-sand" style={{ fontSize: 14 }}>
            Search artists, services, looks...
          </span>
        </button>
      </div>

      {/* ── Category chips ── */}
      <div className="mt-8">
        <div
          className="flex gap-3 overflow-x-auto"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollSnapType: 'x mandatory',
          }}
        >
          {CATEGORIES.map(({ label, slug, icon: Icon }, i) => (
            <button
              key={slug}
              type="button"
              onClick={() => singaraPause(() => router.push(`/c/explore?category=${slug}`))}
              className={cn(
                'flex-shrink-0 h-10 px-4 flex items-center gap-2 bg-alabaster border border-dune font-sans text-ink',
                'transition-colors duration-[220ms] active:bg-mist-warm',
                i === 0 && 'ml-6',
                i === CATEGORIES.length - 1 && 'mr-6'
              )}
              style={{ fontSize: 13, borderRadius: 20, scrollSnapAlign: 'start' }}
            >
              <Icon size={16} strokeWidth={1.5} className="text-emerald-jhoola flex-shrink-0" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Instant Match banner ── */}
      <div className="px-6 mt-8">
        <div
          className="card-elevated overflow-hidden p-5 flex items-center"
          style={{
            background: 'var(--gradient-haldi-sunrise)',
            borderRadius: 20,
          }}
        >
          {/* Left: text + CTA */}
          <div className="flex-1 pr-4">
            <p className="font-heading text-white" style={{ fontSize: 18 }}>
              Need an artist now?
            </p>
            <p className="mt-1 font-sans" style={{ fontSize: 13, color: 'rgba(255,255,255,0.80)' }}>
              Get matched in under 60 seconds
            </p>
            <button
              type="button"
              onClick={() => singaraPause(() => router.push('/c/instant-match'))}
              className="mt-4 bg-alabaster text-emerald-jhoola font-sans font-semibold h-9 px-5 transition-transform duration-[220ms] active:scale-[0.97]"
              style={{ fontSize: 14, borderRadius: 12 }}
            >
              Match me
            </button>
          </div>

          {/* Right: decorative Zap */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Zap
              size={48}
              strokeWidth={1.5}
              style={{ color: 'rgba(255,255,255,0.40)' }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Featured artists ── */}
      <div className="mt-8">
        {/* Section header */}
        <div className="flex items-baseline justify-between px-6 mb-4">
          <h2 className="font-heading text-ink" style={{ fontSize: 20 }}>
            Featured artists
          </h2>
          <button
            type="button"
            onClick={() => singaraPause(() => router.push('/c/explore'))}
            className="font-sans text-emerald-jhoola"
            style={{ fontSize: 13 }}
          >
            See all
          </button>
        </div>

        {/* Horizontal scroll */}
        <div
          className="flex gap-4 overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {FEATURED_ARTISTS.map((artist, i) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              variant="featured"
              showFavorite
              isFirst={i === 0}
              isLast={i === FEATURED_ARTISTS.length - 1}
            />
          ))}
        </div>
      </div>

      {/* ── Singara Stories ── */}
      <div className="px-6 mt-8">
        {/* Section header */}
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-heading text-ink" style={{ fontSize: 20 }}>
            Singara Stories
          </h2>
          <button
            type="button"
            className="font-sans text-emerald-jhoola"
            style={{ fontSize: 13 }}
          >
            Read more
          </button>
        </div>

        {/* Editorial card */}
        <div
          className="card-elevated h-[200px] overflow-hidden relative flex items-end"
          style={{
            borderRadius: 20,
            background: 'var(--gradient-peacock-veil)',
          }}
        >
          <div className="p-5">
            <p
              className="font-sans uppercase text-heritage-gold"
              style={{ fontSize: 10, letterSpacing: '1.5px' }}
            >
              Editorial
            </p>
            <p
              className="font-heading text-white mt-1 line-clamp-2"
              style={{ fontSize: 18 }}
            >
              The art of bridal beauty: a guide for your biggest day
            </p>
            <p
              className="font-sans mt-2"
              style={{ fontSize: 12, color: 'rgba(255,255,255,0.60)' }}
            >
              5 min read
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

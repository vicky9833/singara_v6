'use client'

import { use, useRef, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Heart, Share2, Shield, ShieldCheck, Star, Clock, MapPin, Globe, Zap, ChevronRight, Flag } from 'lucide-react'
import { motion } from 'framer-motion'
import { getArtistById, ARTIST_CARD_GRADIENTS, PORTFOLIO_GRADIENTS } from '@/lib/mock-data'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useReservationStore } from '@/stores/reservationStore'
import { formatINR } from '@/lib/utils'
import type { Artist } from '@/types'

// ── Gradient by artist index ─────────────────────────────────────────────────
function heroGradient(artistId: string): string {
  const n = parseInt(artistId.replace(/\D/g, ''), 10) - 1
  return ARTIST_CARD_GRADIENTS[n % ARTIST_CARD_GRADIENTS.length]
}

// ── Initials ─────────────────────────────────────────────────────────────────
function initials(a: Artist) {
  return (a.firstName[0] + a.lastName[0]).toUpperCase()
}

// ── Reserve button ───────────────────────────────────────────────────────────
function ReserveButton({ artistId }: { artistId: string }) {
  const router = useRouter()
  const resetReservation = useReservationStore((s) => s.reset)
  const setArtistId = useReservationStore((s) => s.setArtistId)

  function handleReserve() {
    resetReservation()
    setArtistId(artistId)
    router.push(`/c/reserve/${artistId}`)
  }

  return (
    <button
      type="button"
      onClick={handleReserve}
      className="flex-1 h-[52px] bg-emerald-jhoola text-white font-sans font-semibold rounded-[14px] transition-opacity duration-[220ms] active:opacity-80"
      style={{ fontSize: 16 }}
    >
      Reserve
    </button>
  )
}

// ── Rating stars (filled) ────────────────────────────────────────────────────
function RatingStars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          strokeWidth={1.5}
          className={i <= Math.round(rating) ? 'text-marigold' : 'text-dune'}
          fill={i <= Math.round(rating) ? 'currentColor' : 'none'}
        />
      ))}
    </span>
  )
}

// ── Availability mode badge ──────────────────────────────────────────────────
function AvailabilityBadge({ mode }: { mode: Artist['availabilityMode'] }) {
  const map: Record<Artist['availabilityMode'], { label: string; color: string }> = {
    available: { label: 'Taking bookings', color: '#0F5F4C' },
    busy: { label: 'Busy — accepting future dates', color: '#E8A33D' },
    break: { label: 'On break', color: '#6B5D54' },
    travel: { label: 'Taking bookings', color: '#0F5F4C' },
    studio_only: { label: 'Studio only', color: '#6B5D54' },
  }
  const { label, color } = map[mode]
  return (
    <span
      className="inline-flex items-center h-6 px-3 rounded-full font-sans font-medium"
      style={{ fontSize: 12, backgroundColor: `${color}1A`, color }}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5" style={{ backgroundColor: color }} />
      {label}
    </span>
  )
}

// ── Bio with read-more ───────────────────────────────────────────────────────
function Bio({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false)
  const truncated = text.length > 200 && !expanded

  return (
    <div>
      <p
        className="font-sans text-ink leading-relaxed"
        style={{ fontSize: 14 }}
      >
        {truncated ? `${text.slice(0, 200)}…` : text}
      </p>
      {text.length > 200 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="font-sans text-emerald-jhoola mt-1"
          style={{ fontSize: 14 }}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  )
}

// ── Service category label ───────────────────────────────────────────────────
function labelCat(c: string) {
  return c.charAt(0).toUpperCase() + c.slice(1)
}

// ── Artist profile inner (has data) ─────────────────────────────────────────
function ArtistProfileContent({ artist }: { artist: Artist }) {
  const router = useRouter()
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite)
  const hasHydrated = useFavoritesStore((s) => s.hasHydrated)
  const isFav = useFavoritesStore((s) => s.isFavorite(artist.id))
  const isFavorite = hasHydrated ? isFav : false

  const scrollY = useRef(0)
  const [headerSolid, setHeaderSolid] = useState(false)

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    scrollY.current = (e.target as HTMLDivElement).scrollTop
    setHeaderSolid(scrollY.current > 200)
  }, [])

  async function handleShare() {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: artist.displayName, url })
      } catch {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
      } catch {
        // ignore
      }
    }
  }

  function handleFavorite() {
    toggleFavorite(artist.id)
  }

  return (
    <div className="flex flex-col min-h-[100dvh] relative" style={{ backgroundColor: 'var(--color-sandstone)' }}>
      {/* ── Scrollable content ── */}
      <div
        className="flex-1 overflow-y-auto"
        onScroll={onScroll}
        style={{ paddingBottom: 96 }}
      >
        {/* ── Hero section ── */}
        <div
          className="relative h-[320px] flex flex-col justify-end"
          style={{ background: heroGradient(artist.id) }}
        >
          {/* Gradient overlay at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(28,24,20,0.55))',
            }}
          />
          {/* Initials */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-display font-semibold"
              style={{ fontSize: 72, color: 'var(--color-heritage-gold)' }}
            >
              {initials(artist)}
            </span>
          </div>
          {/* Name + categories overlaid */}
          <div className="relative z-10 px-6 pb-5">
            <div className="flex items-center gap-2">
              <h1
                className="font-heading text-white"
                style={{ fontSize: 26, textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
              >
                {artist.displayName}
              </h1>
              {artist.isVerified && (
                <Shield size={18} strokeWidth={1.5} className="text-white/80 flex-shrink-0" />
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {artist.categories.map((c) => (
                <span
                  key={c}
                  className="font-sans text-white/90"
                  style={{
                    fontSize: 12,
                    backgroundColor: 'rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(4px)',
                    padding: '2px 10px',
                    borderRadius: 10,
                  }}
                >
                  {labelCat(c)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Stat bar ── */}
        <div
          className="flex divide-x"
          style={{ backgroundColor: 'var(--color-alabaster)', borderBottom: '1px solid var(--color-dune)' }}
        >
          {[
            { val: artist.avgRating.toFixed(1), label: 'Rating' },
            { val: artist.totalReviews, label: 'Reviews' },
            { val: `${artist.experienceYears}yr`, label: 'Experience' },
            { val: artist.totalBookings, label: 'Bookings' },
          ].map(({ val, label }) => (
            <div key={label} className="flex-1 flex flex-col items-center py-3 gap-0.5">
              <span className="font-sans font-semibold text-ink" style={{ fontSize: 16 }}>
                {val}
              </span>
              <span className="font-sans text-ash-warm" style={{ fontSize: 11 }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Content cards ── */}
        <div className="px-6 space-y-6 pt-5">
          {/* Info pills */}
          <div className="flex flex-wrap gap-2">
            <AvailabilityBadge mode={artist.availabilityMode} />
            <span className="inline-flex items-center gap-1.5 h-6 px-3 rounded-full bg-alabaster border border-dune font-sans text-ink" style={{ fontSize: 12 }}>
              <Zap size={12} strokeWidth={1.5} className="text-emerald-jhoola" />
              Replies in ~{artist.responseTimeMinutes} min
            </span>
            <span className="inline-flex items-center gap-1.5 h-6 px-3 rounded-full bg-alabaster border border-dune font-sans text-ink" style={{ fontSize: 12 }}>
              <MapPin size={12} strokeWidth={1.5} className="text-emerald-jhoola" />
              {artist.area}, {artist.city}
            </span>
            {artist.travelRadiusKm && (
              <span className="inline-flex items-center gap-1.5 h-6 px-3 rounded-full bg-alabaster border border-dune font-sans text-ink" style={{ fontSize: 12 }}>
                <MapPin size={12} strokeWidth={1.5} className="text-ash-warm" />
                Travels up to {artist.travelRadiusKm} km
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 h-6 px-3 rounded-full bg-alabaster border border-dune font-sans text-ink" style={{ fontSize: 12 }}>
              <Globe size={12} strokeWidth={1.5} className="text-emerald-jhoola" />
              {artist.languages.join(', ')}
            </span>
          </div>

          {/* Bio */}
          <div
            className="bg-alabaster border border-dune p-4 rounded-[16px]"
          >
            <h2 className="font-heading text-ink mb-2" style={{ fontSize: 16 }}>
              About
            </h2>
            <Bio text={artist.bio} />
          </div>

          {/* Services */}
          <div>
            <h2 className="font-heading text-ink mb-3" style={{ fontSize: 18 }}>
              Services
            </h2>
            <div className="space-y-2">
              {artist.services.map((svc) => (
                <div
                  key={svc.id}
                  className="bg-alabaster border border-dune p-4 rounded-[14px]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-sans font-semibold text-ink" style={{ fontSize: 14 }}>
                          {svc.name}
                        </p>
                        {svc.isPopular && (
                          <span
                            className="font-sans font-medium flex-shrink-0"
                            style={{
                              fontSize: 10,
                              color: 'var(--color-heritage-gold)',
                              backgroundColor: 'var(--color-heritage-gold)',
                              padding: '1px 6px',
                              borderRadius: 6,
                              background: 'linear-gradient(135deg, var(--color-heritage-gold)22, var(--color-heritage-gold)44)',
                              border: '1px solid var(--color-heritage-gold)44',
                            }}
                          >
                            Popular
                          </span>
                        )}
                      </div>
                      {svc.description && (
                        <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 13 }}>
                          {svc.description}
                        </p>
                      )}
                      <div className="flex items-center gap-1.5 mt-1">
                        <Clock size={12} strokeWidth={1.5} className="text-silver-sand" />
                        <span className="font-sans text-silver-sand" style={{ fontSize: 12 }}>
                          {svc.durationMinutes >= 60
                            ? `${Math.floor(svc.durationMinutes / 60)}h${svc.durationMinutes % 60 ? ` ${svc.durationMinutes % 60}m` : ''}`
                            : `${svc.durationMinutes}m`}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-sans font-semibold text-emerald-jhoola" style={{ fontSize: 15 }}>
                        {formatINR(svc.basePrice)}
                      </p>
                      {svc.peakPrice && svc.peakPrice > svc.basePrice && (
                        <p className="font-sans text-silver-sand" style={{ fontSize: 12 }}>
                          Peak {formatINR(svc.peakPrice)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio grid (3×3) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-heading text-ink" style={{ fontSize: 18 }}>
                Portfolio
              </h2>
              <button
                type="button"
                onClick={() => router.push(`/c/artist/${artist.id}/portfolio`)}
                className="flex items-center gap-0.5 font-sans text-emerald-jhoola"
                style={{ fontSize: 13 }}
              >
                See all <ChevronRight size={14} strokeWidth={1.5} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {artist.portfolioImages.slice(0, 9).map((img, i) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => router.push(`/c/artist/${artist.id}/portfolio`)}
                  className="aspect-square overflow-hidden"
                  style={{ borderRadius: 10 }}
                  aria-label={`Portfolio image ${i + 1}`}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      background: PORTFOLIO_GRADIENTS[i % PORTFOLIO_GRADIENTS.length],
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Reviews (first 3) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-heading text-ink" style={{ fontSize: 18 }}>
                Reviews
              </h2>
              <button
                type="button"
                onClick={() => router.push(`/c/artist/${artist.id}/reviews`)}
                className="flex items-center gap-0.5 font-sans text-emerald-jhoola"
                style={{ fontSize: 13 }}
              >
                All {artist.totalReviews} <ChevronRight size={14} strokeWidth={1.5} />
              </button>
            </div>
            <div className="space-y-3">
              {artist.reviews.slice(0, 3).map((rev) => (
                <div
                  key={rev.id}
                  className="bg-alabaster border border-dune p-4 rounded-[14px]"
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div
                      className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center bg-dune"
                    >
                      <span className="font-sans font-semibold text-ash-warm" style={{ fontSize: 12 }}>
                        {rev.customerName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-sans font-semibold text-ink truncate" style={{ fontSize: 14 }}>
                          {rev.customerName}
                        </p>
                        <RatingStars rating={rev.rating} />
                      </div>
                      <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 12 }}>
                        {labelCat(rev.serviceCategory)} •{' '}
                        {new Date(rev.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                      </p>
                      <p className="font-sans text-ink mt-2 leading-relaxed" style={{ fontSize: 13 }}>
                        {rev.text}
                      </p>
                      {rev.artistResponse && (
                        <div
                          className="mt-2 pl-3 border-l-2 border-emerald-jhoola/30"
                        >
                          <p className="font-sans text-ash-warm" style={{ fontSize: 12 }}>
                            <span className="text-emerald-jhoola font-medium">Artist reply: </span>
                            {rev.artistResponse}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location placeholder */}
          <div>
            <h2 className="font-heading text-ink mb-3" style={{ fontSize: 18 }}>
              Location
            </h2>
            <div
              className="h-[160px] rounded-[14px] flex flex-col items-center justify-center gap-2"
              style={{ backgroundColor: 'var(--color-mist-warm)', border: '1px solid var(--color-dune)' }}
            >
              <MapPin size={28} strokeWidth={1.5} className="text-silver-sand" />
              <p className="font-sans text-ash-warm" style={{ fontSize: 14 }}>
                {artist.area}, {artist.city}
              </p>
            </div>
          </div>

          {/* Availability */}
          <div>
            <h2 className="font-heading text-ink mb-3" style={{ fontSize: 18 }}>
              Availability
            </h2>
            <div
              className="bg-alabaster border border-dune p-4 rounded-[14px] flex items-center justify-between"
            >
              <div>
                <AvailabilityBadge mode={artist.availabilityMode} />
                <p className="font-sans text-ash-warm mt-1.5" style={{ fontSize: 13 }}>
                  {artist.workingHours.start} – {artist.workingHours.end}
                </p>
              </div>
            </div>

            {/* 7-day date pills */}
            <div
              className="flex gap-2 mt-3 overflow-x-auto"
              style={{ scrollbarWidth: 'none' }}
            >
              {Array.from({ length: 7 }, (_, i) => {
                const d = new Date()
                d.setDate(d.getDate() + i)
                const label = i === 0 ? 'Today' : d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' })
                return (
                  <div
                    key={i}
                    className="flex-shrink-0 h-10 px-3 flex items-center justify-center bg-alabaster border border-dune rounded-[10px] font-sans text-ash-warm"
                    style={{ fontSize: 12 }}
                  >
                    {label}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Trust and safety */}
          <div>
            <h2 className="font-heading text-ink mb-3" style={{ fontSize: 18 }}>
              Trust and safety
            </h2>
            <div className="space-y-3">
              {artist.isVerified && (
                <div className="flex items-start gap-3">
                  <ShieldCheck size={18} strokeWidth={1.5} style={{ color: 'var(--color-emerald-jhoola)', flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <p className="font-sans text-ink" style={{ fontSize: 14 }}>Identity verified</p>
                    <p className="font-sans text-ash-warm" style={{ fontSize: 12 }}>Aadhaar and selfie verified by Singara</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Clock size={18} strokeWidth={1.5} style={{ color: 'var(--color-ash-warm)', flexShrink: 0, marginTop: 1 }} />
                <div>
                  <p className="font-sans text-ink" style={{ fontSize: 14 }}>Response time: under 2 hours</p>
                  <p className="font-sans text-ash-warm" style={{ fontSize: 12 }}>Based on last 30 days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star size={18} strokeWidth={1.5} style={{ color: 'var(--color-marigold)', flexShrink: 0, marginTop: 1 }} />
                <div>
                  <p className="font-sans text-ink" style={{ fontSize: 14 }}>94 completed bookings</p>
                  <p className="font-sans text-ash-warm" style={{ fontSize: 12 }}>0 disputes</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => router.push(`/c/sos/report?artistId=${artist.id}`)}
              className="flex items-center gap-1 mt-4 transition-opacity duration-[220ms] active:opacity-60"
            >
              <Flag size={12} strokeWidth={1.5} style={{ color: 'var(--color-ash-warm)' }} />
              <span className="font-sans" style={{ fontSize: 12, color: 'var(--color-ash-warm)' }}>
                Report this artist
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Sticky header (transparent → solid) ── */}
      <div
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-[300ms]"
        style={{
          backgroundColor: headerSolid ? 'var(--color-sandstone)' : 'transparent',
          borderBottom: headerSolid ? '1px solid var(--color-dune)' : 'none',
          paddingTop: 'env(safe-area-inset-top)',
        }}
      >
        <div className="max-w-[480px] mx-auto flex items-center justify-between h-[56px] px-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-[220ms]"
            style={{
              backgroundColor: headerSolid ? 'transparent' : 'rgba(28,24,20,0.35)',
            }}
            aria-label="Go back"
          >
            <ArrowLeft
              size={22}
              strokeWidth={1.5}
              style={{ color: headerSolid ? 'var(--color-ink)' : 'white' }}
            />
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-[220ms]"
              style={{
                backgroundColor: headerSolid ? 'transparent' : 'rgba(28,24,20,0.35)',
              }}
              aria-label="Share artist"
            >
              <Share2
                size={20}
                strokeWidth={1.5}
                style={{ color: headerSolid ? 'var(--color-ink)' : 'white' }}
              />
            </button>
            <motion.button
              type="button"
              onClick={handleFavorite}
              whileTap={{ scale: 0.85 }}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-[220ms]"
              style={{
                backgroundColor: headerSolid ? 'transparent' : 'rgba(28,24,20,0.35)',
              }}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <motion.div
                animate={{ scale: isFavorite ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <Heart
                  size={20}
                  strokeWidth={1.5}
                  style={{ color: headerSolid ? 'var(--color-ink)' : 'white' }}
                  fill={isFavorite ? 'currentColor' : 'none'}
                  className={isFavorite ? 'text-vermilion' : ''}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Sticky bottom CTA ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 px-6 pb-6 pt-3"
        style={{
          backgroundColor: 'var(--color-sandstone)',
          borderTop: '1px solid var(--color-dune)',
        }}
      >
        <div className="max-w-[480px] mx-auto flex items-center gap-4">
          <div>
            <p className="font-sans text-ash-warm" style={{ fontSize: 12 }}>
              Starting from
            </p>
            <p className="font-sans font-semibold text-ink" style={{ fontSize: 18 }}>
              {formatINR(artist.startingPrice)}
            </p>
          </div>
          <ReserveButton artistId={artist.id} />
        </div>
      </div>
    </div>
  )
}

// ── Page wrapper ─────────────────────────────────────────────────────────────
export default function ArtistProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const artist = getArtistById(id)

  if (!artist) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100dvh] gap-3 px-6" style={{ backgroundColor: 'var(--color-sandstone)' }}>
        <p className="font-heading text-ink text-center" style={{ fontSize: 22 }}>
          Artist not found
        </p>
        <p className="font-sans text-ash-warm text-center" style={{ fontSize: 14 }}>
          This artist may no longer be available
        </p>
      </div>
    )
  }

  return <ArtistProfileContent artist={artist} />
}

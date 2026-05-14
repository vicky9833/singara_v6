'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Bell,
  Clock,
  MapPin,
  CalendarX,
  Lightbulb,
  TrendingUp,
  Star,
  MessageSquare,
  CalendarCheck,
  Eye,
} from 'lucide-react'
import { useArtistDashboardStore } from '@/stores/artistDashboardStore'
import { useArtistOnboardingStore } from '@/stores/artistOnboardingStore'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]
const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

function formatINR(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none z-50 px-6">
      <div className="bg-ink text-white px-5 py-3 font-sans" style={{ fontSize: 13, borderRadius: 12 }}>
        {message}
      </div>
    </div>
  )
}

export default function ArtistDashboardPage() {
  const router = useRouter()
  const [toast, setToast] = useState<string | null>(null)

  const {
    todayBookings,
    todayEarnings,
    pendingRequests,
    weeklyEarnings,
    avgRating,
    totalReviews,
    totalBookings,
    profileViews,
    isAvailable,
    setAvailability,
    hasHydrated,
  } = useArtistDashboardStore()

  const firstName = useArtistOnboardingStore((s) => s.firstName)
  const displayName = firstName || 'Artist'

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const weekTotal = weeklyEarnings.reduce((a, b) => a + b, 0)
  const maxEarning = Math.max(...weeklyEarnings)

  return (
    <div className="flex flex-col min-h-[100dvh] bg-sandstone">
      {/* Top bar */}
      <div
        className="flex items-center h-14 px-4 bg-sandstone"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => router.push('/a/notifications')}
          className="w-10 h-10 flex items-center justify-center rounded-full"
        >
          <Bell size={22} strokeWidth={1.5} className="text-ink" />
        </button>
      </div>

      {/* Scrollable content */}
      <motion.div
        className="flex-1 overflow-y-auto px-4 pb-[96px]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: LUXURY, delay: 0.08 }}
      >
        {/* Greeting + availability */}
        <div className="pt-2 pb-4">
          <p className="font-display text-ink" style={{ fontSize: 26 }}>
            Good {getGreeting()}, {displayName}
          </p>
          <button
            type="button"
            onClick={() => setAvailability(!isAvailable)}
            className="mt-3 flex items-center h-10 px-4 transition-colors duration-[220ms] active:opacity-80"
            style={{
              borderRadius: 20,
              backgroundColor: isAvailable ? 'var(--color-tulsi)' : 'var(--color-dune)',
            }}
          >
            <span
              className="font-sans font-semibold"
              style={{
                fontSize: 13,
                color: isAvailable ? '#ffffff' : 'var(--color-ash-warm)',
              }}
            >
              {isAvailable ? 'Available' : 'Unavailable'}
            </span>
          </button>
        </div>

        {/* Today's overview — 3 stat cards */}
        <div className="flex gap-3">
          <div className="flex-1 bg-alabaster rounded-2xl p-4 text-center">
            <p className="font-sans font-bold text-ink" style={{ fontSize: 24 }}>
              {hasHydrated ? todayBookings : 0}
            </p>
            <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 11 }}>bookings</p>
            <p className="font-sans text-ash-warm" style={{ fontSize: 10 }}>Today</p>
          </div>
          <div className="flex-1 bg-alabaster rounded-2xl p-4 text-center">
            <p className="font-sans font-bold text-ink leading-tight" style={{ fontSize: 16 }}>
              {hasHydrated ? formatINR(todayEarnings) : '—'}
            </p>
            <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 11 }}>earned</p>
            <p className="font-sans text-ash-warm" style={{ fontSize: 10 }}>Today</p>
          </div>
          <div className="flex-1 bg-alabaster rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-1">
              <p className="font-sans font-bold text-ink" style={{ fontSize: 24 }}>
                {hasHydrated ? pendingRequests : 0}
              </p>
              {hasHydrated && pendingRequests > 0 && (
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-marigold)' }}
                />
              )}
            </div>
            <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 11 }}>pending</p>
            <p className="font-sans text-ash-warm" style={{ fontSize: 10 }}>Requests</p>
          </div>
        </div>

        {/* Next booking card */}
        <div className="mt-6">
          {todayBookings > 0 ? (
            <div
              className="bg-alabaster flex gap-0 overflow-hidden"
              style={{ borderRadius: 20 }}
            >
              {/* Left accent strip */}
              <div
                className="w-1 flex-shrink-0"
                style={{ backgroundColor: 'var(--color-emerald-jhoola)' }}
              />
              <div className="flex-1 p-5 min-w-0">
                <p
                  className="font-sans text-ash-warm uppercase"
                  style={{ fontSize: 11, letterSpacing: 1 }}
                >
                  Next appointment
                </p>
                <p className="font-sans font-semibold text-ink mt-1" style={{ fontSize: 16 }}>
                  Priya S.
                </p>
                <p className="font-sans text-ash-warm" style={{ fontSize: 14 }}>
                  Bridal Complete
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Clock size={14} strokeWidth={1.5} className="text-ink flex-shrink-0" />
                  <p className="font-sans text-ink" style={{ fontSize: 14 }}>Today, 2:00 PM</p>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <MapPin size={14} strokeWidth={1.5} className="text-ash-warm flex-shrink-0" />
                  <p className="font-sans text-ash-warm" style={{ fontSize: 13 }}>Koramangala</p>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Booking detail coming soon')}
                  className="mt-2 font-sans"
                  style={{ fontSize: 13, color: 'var(--color-emerald-jhoola)' }}
                >
                  View details
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-alabaster p-5 flex flex-col items-center gap-3" style={{ borderRadius: 20 }}>
              <CalendarX size={32} strokeWidth={1.5} style={{ color: 'var(--color-dune)' }} />
              <p className="font-sans text-ash-warm" style={{ fontSize: 14 }}>No upcoming bookings</p>
            </div>
          )}
        </div>

        {/* Weekly earnings chart */}
        <div className="mt-6">
          <div className="flex items-baseline justify-between mb-3">
            <p className="font-heading text-ink" style={{ fontSize: 18 }}>This week</p>
            <p className="font-sans font-semibold text-ink" style={{ fontSize: 16 }}>
              {formatINR(weekTotal)}
            </p>
          </div>
          <div className="bg-alabaster p-5" style={{ borderRadius: 16 }}>
            {/* Bars */}
            <div style={{ display: 'flex', height: 66 }}>
              {weeklyEarnings.map((val, i) => {
                const isMax = maxEarning > 0 && val === maxEarning
                const barH =
                  maxEarning > 0
                    ? Math.max(Math.round((val / maxEarning) * 60), val > 0 ? 4 : 2)
                    : 2
                const color =
                  val === 0
                    ? 'var(--color-dune)'
                    : isMax
                      ? 'var(--color-heritage-gold)'
                      : 'var(--color-emerald-jhoola)'
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: barH,
                        borderRadius: '4px 4px 0 0',
                        backgroundColor: color,
                      }}
                    />
                  </div>
                )
              })}
            </div>
            {/* Day labels */}
            <div style={{ display: 'flex', marginTop: 6 }}>
              {DAY_LABELS.map((d, i) => (
                <span
                  key={i}
                  className="font-sans text-ash-warm"
                  style={{ flex: 1, textAlign: 'center', fontSize: 11 }}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick stats 2x2 */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="bg-alabaster p-4" style={{ borderRadius: 16 }}>
            <Star size={20} strokeWidth={1.5} style={{ color: 'var(--color-marigold)' }} className="mb-2" />
            <p className="font-sans font-semibold text-ink" style={{ fontSize: 20 }}>
              {hasHydrated ? avgRating : '—'}
            </p>
            <p className="font-sans text-ash-warm" style={{ fontSize: 11 }}>avg rating</p>
          </div>
          <div className="bg-alabaster p-4" style={{ borderRadius: 16 }}>
            <MessageSquare size={20} strokeWidth={1.5} className="text-ash-warm mb-2" />
            <p className="font-sans font-semibold text-ink" style={{ fontSize: 20 }}>
              {hasHydrated ? totalReviews : '—'}
            </p>
            <p className="font-sans text-ash-warm" style={{ fontSize: 11 }}>reviews</p>
          </div>
          <div className="bg-alabaster p-4" style={{ borderRadius: 16 }}>
            <CalendarCheck size={20} strokeWidth={1.5} className="text-ash-warm mb-2" />
            <p className="font-sans font-semibold text-ink" style={{ fontSize: 20 }}>
              {hasHydrated ? totalBookings : '—'}
            </p>
            <p className="font-sans text-ash-warm" style={{ fontSize: 11 }}>completed</p>
          </div>
          <div className="bg-alabaster p-4" style={{ borderRadius: 16 }}>
            <Eye size={20} strokeWidth={1.5} className="text-ash-warm mb-2" />
            <p className="font-sans font-semibold text-ink" style={{ fontSize: 20 }}>
              {hasHydrated ? profileViews.toLocaleString('en-IN') : '—'}
            </p>
            <p className="font-sans text-ash-warm" style={{ fontSize: 11 }}>profile views</p>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6">
          <p className="font-heading text-ink mb-3" style={{ fontSize: 18 }}>
            Tips for you
          </p>
          <div className="space-y-3">
            <div className="bg-alabaster p-4 flex gap-3" style={{ borderRadius: 16 }}>
              <Lightbulb
                size={20}
                strokeWidth={1.5}
                style={{ color: 'var(--color-heritage-gold)', flexShrink: 0, marginTop: 2 }}
              />
              <div>
                <p className="font-sans font-semibold text-ink" style={{ fontSize: 14 }}>
                  Update your portfolio
                </p>
                <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 13 }}>
                  Artists with 10+ photos get 3x more bookings
                </p>
              </div>
            </div>
            <div className="bg-alabaster p-4 flex gap-3" style={{ borderRadius: 16 }}>
              <TrendingUp
                size={20}
                strokeWidth={1.5}
                style={{ color: 'var(--color-emerald-jhoola)', flexShrink: 0, marginTop: 2 }}
              />
              <div>
                <p className="font-sans font-semibold text-ink" style={{ fontSize: 14 }}>
                  Respond faster
                </p>
                <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 13 }}>
                  Artists who respond within 2 hours get priority in search
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {toast && <Toast message={toast} />}
    </div>
  )
}

'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CalendarDays, Clock, ChevronRight } from 'lucide-react'
import { useBookingsStore } from '@/stores/bookingsStore'
import { motion } from 'framer-motion'

const STATUS_CONFIG = {
  confirmed: {
    label: 'Confirmed',
    bg: 'rgba(74, 124, 89, 0.10)',
    text: 'var(--color-tulsi)',
  },
  completed: {
    label: 'Completed',
    bg: 'rgba(201, 169, 97, 0.12)',
    text: 'var(--color-heritage-gold)',
  },
  cancelled: {
    label: 'Cancelled',
    bg: 'rgba(200, 68, 50, 0.10)',
    text: 'var(--color-vermilion)',
  },
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const hasHydrated = useBookingsStore((s) => s.hasHydrated)
  const bookings = useBookingsStore((s) => s.bookings)
  const booking = bookings.find((b) => b.id === id)

  if (!hasHydrated) {
    return (
      <div className="flex flex-col min-h-[100dvh] bg-sandstone">
        <div
          className="flex items-center h-14 px-4 gap-3 border-b border-dune bg-sandstone"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
          <button
            type="button"
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full -ml-1"
          >
            <ArrowLeft size={22} strokeWidth={1.5} className="text-ink" />
          </button>
          <div className="h-4 w-32 bg-dune rounded animate-pulse" />
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="flex flex-col min-h-[100dvh] bg-sandstone">
        <div
          className="flex items-center h-14 px-4 gap-3 border-b border-dune bg-sandstone"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
          <button
            type="button"
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full -ml-1"
          >
            <ArrowLeft size={22} strokeWidth={1.5} className="text-ink" />
          </button>
          <p className="flex-1 font-sans font-semibold text-ink" style={{ fontSize: 15 }}>
            Booking
          </p>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-3 py-16">
          <p className="font-heading text-ink text-center" style={{ fontSize: 20 }}>
            Booking not found
          </p>
          <button
            type="button"
            onClick={() => router.push('/c/bookings')}
            className="font-sans"
            style={{ fontSize: 14, color: 'var(--color-emerald-jhoola)' }}
          >
            Back to bookings
          </button>
        </div>
      </div>
    )
  }

  const sc = STATUS_CONFIG[booking.status]

  return (
    <div className="flex flex-col min-h-[100dvh] bg-sandstone" style={{ paddingBottom: 32 }}>
      <div
        className="flex items-center h-14 px-4 gap-3 border-b border-dune bg-sandstone"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <button
          type="button"
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full -ml-1"
        >
          <ArrowLeft size={22} strokeWidth={1.5} className="text-ink" />
        </button>
        <p className="flex-1 font-sans font-semibold text-ink" style={{ fontSize: 15 }}>
          Booking details
        </p>
      </div>

      <motion.div
        className="flex-1 overflow-y-auto px-6 pt-4 space-y-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      >
        {/* Status banner */}
        <div
          className="flex items-center gap-3 p-3 rounded-[12px]"
          style={{ backgroundColor: sc.bg }}
        >
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: sc.text }} />
          <p className="font-sans font-semibold" style={{ fontSize: 14, color: sc.text }}>
            {sc.label}
          </p>
        </div>

        {/* Artist mini-card */}
        <button
          type="button"
          onClick={() => router.push(`/c/artist/${booking.artistId}`)}
          className="w-full bg-alabaster border border-dune px-4 py-4 flex items-center gap-3 text-left transition-colors duration-[220ms] active:bg-mist-warm rounded-[16px]"
        >
          <div
            className="w-12 h-12 rounded-full flex-shrink-0"
            style={{ background: 'var(--gradient-peacock-veil)' }}
          />
          <div className="flex-1">
            <p className="font-sans font-semibold text-ink" style={{ fontSize: 14 }}>
              {booking.artistName}
            </p>
            <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 12 }}>
              View artist profile
            </p>
          </div>
          <ChevronRight size={16} strokeWidth={1.5} style={{ color: 'var(--color-silver-sand)' }} />
        </button>

        {/* Booking details card */}
        <div className="bg-alabaster border border-dune p-4 space-y-4 rounded-[16px]">
          <div>
            <p
              className="font-sans text-ash-warm mb-1"
              style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px' }}
            >
              Booking ID
            </p>
            <p className="font-sans font-semibold text-ink" style={{ fontSize: 14, fontFamily: 'monospace' }}>
              {booking.id}
            </p>
          </div>
          <div style={{ height: 1, backgroundColor: 'var(--color-dune)' }} />
          <div>
            <p
              className="font-sans text-ash-warm mb-1"
              style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px' }}
            >
              Services
            </p>
            <div className="space-y-1">
              {booking.serviceNames.map((s) => (
                <p key={s} className="font-sans text-ink" style={{ fontSize: 14 }}>
                  {s}
                </p>
              ))}
            </div>
          </div>
          <div style={{ height: 1, backgroundColor: 'var(--color-dune)' }} />
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} strokeWidth={1.5} style={{ color: 'var(--color-ash-warm)' }} />
              <p className="font-sans text-ink" style={{ fontSize: 13 }}>
                {formatDate(booking.date)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} strokeWidth={1.5} style={{ color: 'var(--color-ash-warm)' }} />
            <p className="font-sans text-ink" style={{ fontSize: 13 }}>
              {booking.time}
            </p>
          </div>
          <div style={{ height: 1, backgroundColor: 'var(--color-dune)' }} />
          <div className="flex items-center justify-between">
            <p className="font-sans text-ash-warm" style={{ fontSize: 14 }}>
              Total
            </p>
            <p className="font-sans font-semibold text-ink" style={{ fontSize: 16 }}>
              ₹{booking.totalAmount.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        {booking.status === 'confirmed' && (
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={() => router.push(`/c/bookings/${booking.id}/cancel`)}
              className="w-full h-[48px] font-sans font-semibold rounded-[14px] transition-opacity duration-[220ms] active:opacity-80"
              style={{
                fontSize: 15,
                backgroundColor: 'transparent',
                color: 'var(--color-vermilion)',
                border: '1.5px solid var(--color-vermilion)',
              }}
            >
              Cancel booking
            </button>
          </div>
        )}

        {booking.status === 'completed' && (
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={() => router.push(`/c/bookings/${booking.id}/review`)}
              className="w-full h-[48px] bg-emerald-jhoola text-white font-sans font-semibold rounded-[14px] transition-opacity duration-[220ms] active:opacity-80"
              style={{ fontSize: 15 }}
            >
              Leave a review
            </button>
            <button
              type="button"
              onClick={() => router.push(`/c/reserve/${booking.artistId}`)}
              className="w-full h-[48px] font-sans font-semibold rounded-[14px] transition-opacity duration-[220ms] active:opacity-80"
              style={{
                fontSize: 15,
                backgroundColor: 'transparent',
                color: 'var(--color-emerald-jhoola)',
                border: '1.5px solid var(--color-emerald-jhoola)',
              }}
            >
              Book again
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

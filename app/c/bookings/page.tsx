'use client'

import { useRouter } from 'next/navigation'
import { CalendarCheck } from 'lucide-react'
import { useBookingsStore } from '@/stores/bookingsStore'
import { formatINR } from '@/lib/utils'

const STATUS_META: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  confirmed: {
    bg: 'rgba(74,124,89,0.12)',
    text: 'var(--color-tulsi)',
    label: 'Confirmed',
  },
  completed: {
    bg: 'rgba(201,169,97,0.12)',
    text: 'var(--color-heritage-gold)',
    label: 'Completed',
  },
  cancelled: {
    bg: 'rgba(200,68,50,0.12)',
    text: 'var(--color-vermilion)',
    label: 'Cancelled',
  },
}

function SkeletonCard() {
  return (
    <div
      className="bg-alabaster border border-dune p-4 space-y-3"
      style={{ borderRadius: 16 }}
    >
      <div
        className="h-4 rounded-full"
        style={{ width: '60%', backgroundColor: 'var(--color-dune)' }}
      />
      <div
        className="h-3 rounded-full"
        style={{ width: '80%', backgroundColor: 'var(--color-mist-warm)' }}
      />
      <div
        className="h-3 rounded-full"
        style={{ width: '50%', backgroundColor: 'var(--color-mist-warm)' }}
      />
    </div>
  )
}

function formatBookingDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatBookingTime(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${displayH}:${m.toString().padStart(2, '0')} ${period}`
}

export default function BookingsPage() {
  const router = useRouter()
  const hasHydrated = useBookingsStore((s) => s.hasHydrated)
  const bookings = useBookingsStore((s) => s.bookings)

  return (
    <div
      className="flex flex-col min-h-[100dvh]"
      style={{ backgroundColor: 'var(--color-sandstone)', paddingBottom: 96 }}
    >
      {/* Header */}
      <div
        className="px-6 pb-4 border-b border-dune"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 20px)' }}
      >
        <h1 className="font-heading text-ink" style={{ fontSize: 24 }}>
          My bookings
        </h1>
      </div>

      {/* Content */}
      {!hasHydrated ? (
        <div className="px-6 pt-4 space-y-3">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4 py-16">
          <CalendarCheck
            size={48}
            strokeWidth={1.5}
            style={{ color: 'var(--color-dune)' }}
          />
          <p className="font-heading text-ink text-center" style={{ fontSize: 20 }}>
            No bookings yet
          </p>
          <p
            className="font-sans text-ash-warm text-center"
            style={{ fontSize: 14 }}
          >
            Your upcoming appointments will appear here
          </p>
          <button
            type="button"
            onClick={() => router.push('/c/explore')}
            className="mt-2 h-10 px-6 font-sans font-semibold rounded-[12px]"
            style={{
              fontSize: 14,
              border: '1.5px solid var(--color-emerald-jhoola)',
              color: 'var(--color-emerald-jhoola)',
              backgroundColor: 'transparent',
            }}
          >
            Find an artist
          </button>
        </div>
      ) : (
        <div className="px-6 pt-4 space-y-3">
          {bookings.map((booking) => {
            const meta = STATUS_META[booking.status] ?? STATUS_META.confirmed
            return (
              <div
                key={booking.id}
                className="bg-alabaster border border-dune p-4"
                style={{ borderRadius: 16 }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="font-sans font-semibold text-ink" style={{ fontSize: 15 }}>
                    {booking.artistName}
                  </p>
                  <span
                    className="font-sans font-medium flex-shrink-0 px-2 py-0.5 rounded-full"
                    style={{
                      fontSize: 11,
                      backgroundColor: meta.bg,
                      color: meta.text,
                    }}
                  >
                    {meta.label}
                  </span>
                </div>
                <p className="font-sans text-ash-warm" style={{ fontSize: 13 }}>
                  {booking.serviceNames.join(' • ')}
                </p>
                <p className="font-sans text-ash-warm mt-1" style={{ fontSize: 12 }}>
                  {booking.date ? formatBookingDate(booking.date) : ''}{' '}
                  {booking.time ? `• ${formatBookingTime(booking.time)}` : ''}
                </p>
                <div
                  className="flex items-center justify-between mt-3 pt-3"
                  style={{ borderTop: '1px solid var(--color-dune)' }}
                >
                  <span className="font-sans text-ash-warm" style={{ fontSize: 12 }}>
                    {booking.id}
                  </span>
                  <span
                    className="font-sans font-semibold text-ink"
                    style={{ fontSize: 14 }}
                  >
                    {formatINR(booking.totalAmount)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}


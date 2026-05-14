'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Lock } from 'lucide-react'
import { useBookingsStore } from '@/stores/bookingsStore'

function formatVaultDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function VaultPage() {
  const router = useRouter()
  const hasHydrated = useBookingsStore((s) => s.hasHydrated)
  const bookings = useBookingsStore((s) => s.bookings)
  const completed = bookings.filter((b) => b.status === 'completed')

  return (
    <div className="flex flex-col min-h-[100dvh] bg-sandstone">
      {/* Top bar */}
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
          The Vault
        </p>
        <Lock size={20} strokeWidth={1.5} style={{ color: 'var(--color-heritage-gold)' }} />
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-8">
        {/* Explanation card */}
        <div
          className="bg-alabaster border border-dune p-4 mb-5"
          style={{ borderRadius: 16 }}
        >
          <p className="font-heading text-ink" style={{ fontSize: 18 }}>
            Your private beauty history
          </p>
          <p className="mt-1 font-sans text-ash-warm" style={{ fontSize: 13 }}>
            Products, looks, and notes from your appointments — only visible to you.
          </p>
        </div>

        {!hasHydrated || completed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Lock size={48} strokeWidth={1.5} style={{ color: 'var(--color-dune)' }} />
            <p className="font-heading text-ink text-center" style={{ fontSize: 20 }}>
              Nothing here yet
            </p>
            <p className="font-sans text-ash-warm text-center" style={{ fontSize: 14 }}>
              Complete a booking to start building your beauty vault
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {completed.map((booking) => (
              <div
                key={booking.id}
                className="bg-alabaster border border-dune p-4 space-y-3"
                style={{ borderRadius: 16 }}
              >
                <div>
                  <p className="font-sans font-semibold text-ink" style={{ fontSize: 15 }}>
                    {booking.artistName}
                  </p>
                  <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 13 }}>
                    {booking.date ? formatVaultDate(booking.date) : ''} •{' '}
                    {booking.serviceNames.join(', ')}
                  </p>
                </div>
                <div
                  style={{ height: 1, backgroundColor: 'var(--color-dune)' }}
                />
                <div>
                  <p
                    className="font-sans font-semibold text-ash-warm mb-1"
                    style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px' }}
                  >
                    Products used
                  </p>
                  <p className="font-sans text-ash-warm" style={{ fontSize: 13, fontStyle: 'italic' }}>
                    Product details will appear after the artist logs them
                  </p>
                </div>
                <div>
                  <p
                    className="font-sans font-semibold text-ash-warm mb-1"
                    style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px' }}
                  >
                    Notes
                  </p>
                  <p className="font-sans text-ash-warm" style={{ fontSize: 13, fontStyle: 'italic' }}>
                    Artist notes will appear here
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

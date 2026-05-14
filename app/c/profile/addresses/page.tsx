'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, MapPin } from 'lucide-react'
import { useBookingsStore } from '@/stores/bookingsStore'

export default function AddressesPage() {
  const router = useRouter()
  const hasHydrated = useBookingsStore((s) => s.hasHydrated)
  const bookings = useBookingsStore((s) => s.bookings)

  // No address stored in StoredBooking — show empty state always for now
  const hasAddress = false

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
          Saved addresses
        </p>
      </div>

      {!hasHydrated || !hasAddress ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4 py-16">
          <MapPin size={48} strokeWidth={1.5} style={{ color: 'var(--color-dune)' }} />
          <p className="font-heading text-ink text-center" style={{ fontSize: 20 }}>
            No saved addresses
          </p>
          <p className="font-sans text-ash-warm text-center" style={{ fontSize: 14 }}>
            Addresses from your bookings will appear here
          </p>
        </div>
      ) : null}
    </div>
  )
}

'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, MapPin } from 'lucide-react'
import { useBookingsStore } from '@/stores/bookingsStore'
import { motion } from 'framer-motion'

export default function AddressesPage() {
  const router = useRouter()
  const hasHydrated = useBookingsStore((s) => s.hasHydrated)
  const bookings = useBookingsStore((s) => s.bookings)

  // No address stored in StoredBooking — show empty state always for now
  const hasAddress = false

  return (
    <motion.div
      className="flex flex-col min-h-[100dvh] bg-sandstone"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
    >
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
        <div className="flex flex-col items-center px-6 pt-16 pb-32">
          <MapPin size={48} strokeWidth={1.5} style={{ color: 'var(--color-dune)' }} />
          <p className="font-heading text-ink text-center mt-4" style={{ fontSize: 18 }}>
            No saved addresses
          </p>
          <p className="font-sans text-ash-warm text-center mt-2" style={{ fontSize: 14, maxWidth: 280 }}>
            Addresses from your bookings will appear here
          </p>
        </div>
      ) : null}
    </motion.div>
  )
}

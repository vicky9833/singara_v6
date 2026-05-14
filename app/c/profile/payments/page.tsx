'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard, Info } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PaymentsPage() {
  const router = useRouter()
  const [showNote, setShowNote] = useState(false)

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
          Payment methods
        </p>
      </div>

      <motion.div
        className="flex-1 overflow-y-auto px-6 pt-16 pb-32"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      >
        <div className="flex flex-col items-center">
          <CreditCard size={48} strokeWidth={1.5} style={{ color: 'var(--color-dune)' }} />
          <p className="font-heading text-ink text-center mt-4" style={{ fontSize: 18 }}>
            No payment methods saved
          </p>
          <p className="font-sans text-ash-warm text-center mt-2" style={{ fontSize: 14, maxWidth: 280 }}>
            Your saved cards and UPI IDs will appear here after your first booking
          </p>
          <button
            type="button"
            onClick={() => setShowNote((v) => !v)}
            className="mt-6 h-12 px-6 font-sans font-semibold transition-opacity duration-[220ms] active:opacity-70"
            style={{
              fontSize: 14,
              color: 'var(--color-emerald-jhoola)',
              backgroundColor: 'transparent',
              border: '1.5px solid var(--color-emerald-jhoola)',
              borderRadius: 12,
            }}
          >
            Add payment method
          </button>
          {showNote && (
            <motion.div
              className="flex items-center gap-2 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.22 }}
            >
              <Info size={14} strokeWidth={1.5} className="text-ash-warm flex-shrink-0" />
              <p className="font-sans text-ash-warm" style={{ fontSize: 12 }}>
                Payment integration coming soon
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

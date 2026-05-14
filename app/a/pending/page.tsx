'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Clock, ChevronDown, ChevronUp, Search, BadgeCheck, Rocket, Star } from 'lucide-react'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

const NEXT_STEPS = [
  { number: '01', title: 'Profile review', desc: 'Our team reviews your portfolio and documents within 48 hours' },
  { number: '02', title: 'Background verification', desc: 'Identity documents are verified by our trust & safety team' },
  { number: '03', title: 'Profile goes live', desc: 'Once approved, your profile is visible to customers in your area' },
  { number: '04', title: 'Start earning', desc: 'Accept bookings and receive payments directly to your bank account' },
]

const STEP_ICONS = [Search, BadgeCheck, Rocket, Star]

export default function ArtistPendingPage() {
  const router = useRouter()
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="min-h-[100dvh] flex flex-col max-w-[480px] mx-auto"
      style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}
    >
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Animated clock */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: LUXURY }}
          className="mb-6"
        >
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(201,169,97,0.12)' }}
          >
            <Clock size={48} strokeWidth={1.5} style={{ color: 'var(--color-heritage-gold)' }} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: LUXURY, delay: 0.15 }}
          className="flex items-center gap-2 mb-3"
        >
          <CheckCircle size={20} strokeWidth={1.5} style={{ color: 'var(--color-tulsi)' }} />
          <p className="font-sans font-semibold" style={{ fontSize: 14, color: 'var(--color-tulsi)' }}>
            Application submitted
          </p>
        </motion.div>

        <motion.h1
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: LUXURY, delay: 0.22 }}
          className="font-display text-ink"
          style={{ fontSize: 26, fontWeight: 500, lineHeight: 1.25 }}
        >
          We&apos;ll be in touch soon
        </motion.h1>

        <motion.p
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: LUXURY, delay: 0.29 }}
          className="font-sans text-ash-warm mt-3"
          style={{ fontSize: 15, lineHeight: 1.6, maxWidth: 300 }}
        >
          We&apos;ll review your profile within 48 hours
        </motion.p>

        <motion.p
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: LUXURY, delay: 0.34 }}
          className="font-sans text-ash-warm mt-1"
          style={{ fontSize: 13 }}
        >
          You&apos;ll receive an SMS when your profile is approved
        </motion.p>

        {/* What happens next — expandable */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: LUXURY, delay: 0.42 }}
          className="w-full mt-8"
        >
          <button
            type="button"
            onClick={() => setExpanded((p) => !p)}
            className="w-full flex items-center justify-between px-5 py-4 rounded-[16px] transition-colors duration-[220ms] active:bg-mist-warm"
            style={{ border: '1.5px solid var(--color-dune)', backgroundColor: 'var(--color-alabaster)' }}
          >
            <p className="font-sans font-semibold text-ink" style={{ fontSize: 15 }}>
              What happens next?
            </p>
            {expanded
              ? <ChevronUp size={18} strokeWidth={1.5} style={{ color: 'var(--color-ash-warm)' }} />
              : <ChevronDown size={18} strokeWidth={1.5} style={{ color: 'var(--color-ash-warm)' }} />
            }
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: LUXURY }}
                className="overflow-hidden"
              >
                <div
                  className="rounded-b-[16px] px-5 pt-4 pb-5"
                  style={{ border: '1.5px solid var(--color-dune)', borderTop: 'none', backgroundColor: 'var(--color-alabaster)', marginTop: -2 }}
                >
                  <div className="space-y-5">
                    {NEXT_STEPS.map((step, i) => {
                      const Icon = STEP_ICONS[i]
                      return (
                        <div key={step.number} className="flex items-start gap-4">
                          <div className="flex-shrink-0 flex flex-col items-center">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: 'rgba(201,169,97,0.12)' }}
                            >
                              <Icon size={20} strokeWidth={1.5} style={{ color: 'var(--color-heritage-gold)' }} />
                            </div>
                            {i < NEXT_STEPS.length - 1 && (
                              <div className="w-px flex-1 mt-1 min-h-[20px]" style={{ backgroundColor: 'var(--color-dune)' }} />
                            )}
                          </div>
                          <div className="pb-1">
                            <p
                              className="font-display text-ink"
                              style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.2 }}
                            >
                              {step.title}
                            </p>
                            <p className="font-sans text-ash-warm mt-1" style={{ fontSize: 13, lineHeight: 1.5 }}>
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: LUXURY, delay: 0.5 }}
        className="flex-shrink-0 px-6"
      >
        <button
          type="button"
          onClick={() => router.push('/')}
          className="w-full h-[52px] font-sans font-semibold rounded-[14px] transition-all duration-[220ms] active:opacity-80"
          style={{
            fontSize: 16,
            backgroundColor: 'var(--color-emerald-jhoola)',
            color: 'white',
          }}
        >
          Back to home
        </button>
      </motion.div>
    </div>
  )
}

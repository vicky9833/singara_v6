'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Camera, ShieldCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

const ISSUE_TYPES = [
  'Customer was inappropriate',
  'Unsafe location or environment',
  'Customer asked for off-platform payment',
  'Customer no-show',
  'Damage to my equipment',
  'Other',
]

export default function ArtistReportPage() {
  const router = useRouter()

  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [details, setDetails] = useState('')
  const [contact, setContact] = useState<'sms' | 'call'>('sms')
  const [submitted, setSubmitted] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [refNum] = useState(
    () => 'RPT-' + String(Math.floor(100000 + Math.random() * 900000)),
  )

  const canSubmit = selectedType !== null && details.trim().length >= 20

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  function handleSubmit() {
    if (!canSubmit) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col min-h-[100dvh] bg-sandstone">
        <div
          className="flex items-center h-14 px-4 gap-3 border-b border-dune bg-sandstone flex-shrink-0"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        />
        <motion.div
          className="flex-1 flex flex-col items-center justify-center px-8 gap-4 text-center pb-16"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.32, ease: LUXURY }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: LUXURY, delay: 0.08 }}
          >
            <ShieldCheck size={48} strokeWidth={1.5} style={{ color: 'var(--color-emerald-jhoola)' }} />
          </motion.div>
          <p className="font-display text-ink" style={{ fontSize: 26 }}>
            Report submitted
          </p>
          <p className="font-sans text-ash-warm" style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 280 }}>
            Our safety team will review your report within 4 hours. We take every concern seriously.
          </p>
          <p className="font-sans" style={{ fontSize: 13, color: 'var(--color-silver-sand)' }}>
            Reference: {refNum}
          </p>
          <button
            type="button"
            onClick={() => router.push('/a/requests')}
            className="w-full h-[52px] bg-emerald-jhoola text-white font-sans font-semibold rounded-[14px] transition-opacity duration-[220ms] active:opacity-80 mt-4"
            style={{ fontSize: 16 }}
          >
            Back to requests
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-sandstone">
      {/* Header */}
      <div
        className="flex items-center h-14 px-4 gap-3 border-b border-dune bg-sandstone flex-shrink-0"
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
          Report an issue
        </p>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: LUXURY }}
            className="mx-4 mt-3 px-4 py-3 rounded-xl font-sans text-white text-center"
            style={{ fontSize: 13, backgroundColor: 'var(--color-tulsi)' }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="flex-1 overflow-y-auto px-5 pt-5 pb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: LUXURY, delay: 0.08 }}
      >
        {/* Report type */}
        <h2 className="font-heading text-ink mb-4" style={{ fontSize: 20 }}>
          What happened?
        </h2>
        <div className="bg-alabaster border border-dune rounded-[16px] overflow-hidden mb-6">
          {ISSUE_TYPES.map((type, idx) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className="w-full h-14 flex items-center px-4 gap-3 text-left transition-colors duration-[220ms] active:bg-mist-warm"
              style={{ borderTop: idx > 0 ? '1px solid var(--color-dune)' : 'none' }}
            >
              <div
                className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{
                  border: selectedType === type
                    ? '2px solid var(--color-emerald-jhoola)'
                    : '2px solid var(--color-silver-sand)',
                }}
              >
                {selectedType === type && (
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: 'var(--color-emerald-jhoola)' }}
                  />
                )}
              </div>
              <p className="font-sans text-ink flex-1" style={{ fontSize: 14 }}>
                {type}
              </p>
            </button>
          ))}
        </div>

        {/* Details */}
        <AnimatePresence>
          {selectedType && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.22, ease: LUXURY }}
              className="mb-6"
            >
              <h2 className="font-heading text-ink mb-3" style={{ fontSize: 18 }}>
                Tell us more
              </h2>
              <div className="bg-alabaster border border-dune rounded-[14px] overflow-hidden">
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value.slice(0, 500))}
                  placeholder="Please describe what happened in detail. Include dates, times, and any relevant information."
                  className="w-full p-4 font-sans text-ink bg-transparent resize-none outline-none"
                  style={{ fontSize: 14, height: 120, lineHeight: 1.5 }}
                />
                <div
                  className="px-4 pb-3 text-right font-sans"
                  style={{ fontSize: 11, color: 'var(--color-silver-sand)' }}
                >
                  {details.length}/500
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Evidence upload */}
        <div className="mb-6">
          <p className="font-sans text-ash-warm mb-3" style={{ fontSize: 14 }}>
            Add photos or screenshots (optional)
          </p>
          <button
            type="button"
            onClick={() => showToast('Photo upload coming soon')}
            className="h-10 px-4 flex items-center gap-2 rounded-[12px] font-sans font-semibold transition-opacity duration-[220ms] active:opacity-80"
            style={{
              fontSize: 14,
              backgroundColor: 'transparent',
              color: 'var(--color-emerald-jhoola)',
              border: '1.5px solid var(--color-emerald-jhoola)',
            }}
          >
            <Camera size={16} strokeWidth={1.5} />
            Add photos
          </button>
        </div>

        {/* Contact preference */}
        <div className="mb-8">
          <p className="font-sans font-semibold text-ink mb-3" style={{ fontSize: 14 }}>
            How should we reach you?
          </p>
          <div className="flex gap-2">
            {(['sms', 'call'] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setContact(opt)}
                className="h-9 px-5 rounded-full font-sans font-semibold transition-all duration-[220ms]"
                style={{
                  fontSize: 14,
                  backgroundColor: contact === opt ? 'var(--color-emerald-jhoola)' : 'transparent',
                  color: contact === opt ? 'white' : 'var(--color-ash-warm)',
                  border: contact === opt
                    ? '1.5px solid var(--color-emerald-jhoola)'
                    : '1.5px solid var(--color-dune)',
                }}
              >
                {opt === 'sms' ? 'SMS' : 'Phone call'}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full h-[52px] font-sans font-semibold rounded-[14px] transition-opacity duration-[220ms] active:opacity-80 disabled:opacity-40"
          style={{
            fontSize: 16,
            backgroundColor: 'var(--color-vermilion)',
            color: 'white',
          }}
        >
          Submit report
        </button>
      </motion.div>
    </div>
  )
}

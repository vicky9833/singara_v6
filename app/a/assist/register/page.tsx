'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  HandHeart,
  TrendingUp,
  Wallet,
  Award,
  Check,
  CheckCircle,
} from 'lucide-react'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

const ALL_SKILLS = [
  'Hair styling',
  'Draping',
  'Mehendi',
  'Skin prep',
  'Touch-ups',
  'Photography assist',
  'Product management',
  'Client handling',
]

const ALL_AREAS = [
  'Koramangala',
  'Indiranagar',
  'HSR Layout',
  'Whitefield',
  'Jayanagar',
  'JP Nagar',
  'Malleshwaram',
  'Bellandur',
]

function ChipSelect({
  options,
  selected,
  onToggle,
}: {
  options: string[]
  selected: Set<string>
  onToggle: (val: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.has(opt)
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className="h-9 px-3 font-sans font-medium transition-colors duration-220 border flex items-center gap-1.5"
            style={{
              fontSize: 13,
              borderRadius: 20,
              backgroundColor: active ? 'var(--color-emerald-jhoola)' : 'var(--color-alabaster)',
              color: active ? '#fff' : 'var(--color-ink)',
              borderColor: active ? 'transparent' : 'var(--color-dune)',
            }}
          >
            {active && <Check size={12} strokeWidth={2} />}
            {opt}
          </button>
        )
      })}
    </div>
  )
}

function SectionLabel({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="flex items-baseline gap-1.5 mb-2">
      <span
        className="font-sans font-semibold text-ash-warm uppercase"
        style={{ fontSize: 11, letterSpacing: '0.06em' }}
      >
        {label}
      </span>
      {sub && (
        <span className="font-sans text-ash-warm" style={{ fontSize: 12 }}>
          {sub}
        </span>
      )}
    </div>
  )
}

export default function RegisterAssistantPage() {
  const router = useRouter()
  const [available, setAvailable] = useState(true)
  const [rate, setRate] = useState('')
  const [skills, setSkills] = useState<Set<string>>(new Set())
  const [areas, setAreas] = useState<Set<string>>(new Set())
  const [bio, setBio] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const canSubmit =
    available && rate.trim() !== '' && skills.size > 0 && areas.size > 0

  function toggleSkill(s: string) {
    setSkills((prev) => {
      const next = new Set(prev)
      if (next.has(s)) next.delete(s)
      else next.add(s)
      return next
    })
  }

  function toggleArea(a: string) {
    setAreas((prev) => {
      const next = new Set(prev)
      if (next.has(a)) next.delete(a)
      else next.add(a)
      return next
    })
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-sandstone">
      {/* Header */}
      <div
        className="flex items-center h-14 px-4 gap-3 bg-sandstone border-b border-dune flex-shrink-0"
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
          Become an assistant
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          /* ── FORM ── */
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 0, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.32, ease: LUXURY }}
            className="flex-1 overflow-y-auto pb-32"
          >
            {/* Decorative header */}
            <div className="flex flex-col items-center px-6 pt-8 pb-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: 'rgba(201,169,97,0.08)' }}
              >
                <HandHeart size={32} strokeWidth={1.5} style={{ color: 'var(--color-heritage-gold)' }} />
              </div>
              <h1 className="font-heading text-ink text-center" style={{ fontSize: 22 }}>
                Build your career
              </h1>
              <p
                className="font-sans text-ash-warm text-center mt-2"
                style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 320 }}
              >
                Join Singara's assistant network to work alongside experienced artists, gain real-world experience, and earn from day one.
              </p>
            </div>

            {/* Benefits */}
            <div className="px-6 mt-2 mb-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <TrendingUp size={18} strokeWidth={1.5} style={{ color: 'var(--color-emerald-jhoola)', flexShrink: 0 }} />
                <span className="font-sans text-ink" style={{ fontSize: 14 }}>
                  Learn from experienced professionals
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Wallet size={18} strokeWidth={1.5} style={{ color: 'var(--color-heritage-gold)', flexShrink: 0 }} />
                <span className="font-sans text-ink" style={{ fontSize: 14 }}>
                  Earn ₹800–1,500 per session
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Award size={18} strokeWidth={1.5} style={{ color: 'var(--color-marigold)', flexShrink: 0 }} />
                <span className="font-sans text-ink" style={{ fontSize: 14 }}>
                  Build your reputation and portfolio
                </span>
              </div>
            </div>

            <div className="px-5 flex flex-col gap-6">
              {/* Section 1 — Availability */}
              <div>
                <SectionLabel label="Availability" />
                <div
                  className="flex items-center justify-between px-4 py-4"
                  style={{ backgroundColor: 'var(--color-alabaster)', borderRadius: 16 }}
                >
                  <span className="font-sans text-ink" style={{ fontSize: 15 }}>
                    Available for assist work
                  </span>
                  <button
                    type="button"
                    onClick={() => setAvailable((v) => !v)}
                    className="relative w-12 h-6 flex-shrink-0 transition-colors duration-220"
                    style={{
                      borderRadius: 12,
                      backgroundColor: available ? 'var(--color-emerald-jhoola)' : 'var(--color-dune)',
                    }}
                  >
                    <span
                      className="absolute top-1 transition-all duration-220"
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        left: available ? 'calc(100% - 20px)' : 4,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                      }}
                    />
                  </button>
                </div>
              </div>

              {/* Section 2 — Rate */}
              <div>
                <SectionLabel label="Your rate per session" />
                <div
                  className="flex items-center h-12 border border-dune px-4 gap-1"
                  style={{ backgroundColor: 'var(--color-alabaster)', borderRadius: 12 }}
                >
                  <span className="font-sans text-ash-warm" style={{ fontSize: 15 }}>₹</span>
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="1,000"
                    className="flex-1 bg-transparent font-sans text-ink outline-none placeholder:text-silver-sand"
                    style={{ fontSize: 15 }}
                  />
                  <span className="font-sans text-ash-warm" style={{ fontSize: 13 }}>/session</span>
                </div>
                <p className="font-sans text-ash-warm mt-1.5" style={{ fontSize: 12 }}>
                  Average rate in Bangalore: ₹800–1,500
                </p>
              </div>

              {/* Section 3 — Skills */}
              <div>
                <SectionLabel label="Your skills" sub="— select all that apply" />
                <ChipSelect options={ALL_SKILLS} selected={skills} onToggle={toggleSkill} />
              </div>

              {/* Section 4 — Areas */}
              <div>
                <SectionLabel label="Areas you can work in" />
                <ChipSelect options={ALL_AREAS} selected={areas} onToggle={toggleArea} />
              </div>

              {/* Section 5 — About */}
              <div>
                <SectionLabel label="About your experience" />
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value.slice(0, 300))}
                  placeholder="Tell senior artists about your background, training, and what you bring to a booking..."
                  maxLength={300}
                  className="w-full px-4 py-3 font-sans text-ink border border-dune outline-none resize-none placeholder:text-silver-sand"
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    borderRadius: 12,
                    backgroundColor: 'var(--color-alabaster)',
                    height: 80,
                  }}
                />
                <p
                  className="font-sans text-silver-sand text-right mt-1"
                  style={{ fontSize: 11 }}
                >
                  {bio.length}/300
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ── SUCCESS ── */
          <motion.div
            key="success"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.32, ease: LUXURY }}
            className="flex-1 overflow-y-auto pb-10"
          >
            <div className="flex flex-col items-center px-6 pt-12 pb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.1, 1] }}
                transition={{ duration: 0.48, ease: LUXURY }}
              >
                <CheckCircle
                  size={48}
                  strokeWidth={1.5}
                  style={{ color: 'var(--color-emerald-jhoola)' }}
                />
              </motion.div>
              <h1 className="font-display text-ink text-center mt-4" style={{ fontSize: 26 }}>
                You're all set
              </h1>
              <p
                className="font-sans text-ash-warm text-center mt-2"
                style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 300 }}
              >
                Senior artists in Bangalore can now find and hire you for their bookings.
              </p>
            </div>

            {/* Profile preview card */}
            <div className="px-5 mt-6">
              <div
                className="p-5"
                style={{ backgroundColor: 'var(--color-alabaster)', borderRadius: 16 }}
              >
                <p className="font-heading text-ink mb-3" style={{ fontSize: 16 }}>
                  Your profile
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-ash-warm" style={{ fontSize: 13 }}>Rate</span>
                    <span
                      className="font-sans font-semibold"
                      style={{ fontSize: 14, color: 'var(--color-emerald-jhoola)' }}
                    >
                      ₹{Number(rate).toLocaleString('en-IN')}/session
                    </span>
                  </div>
                  {skills.size > 0 && (
                    <div>
                      <span className="font-sans text-ash-warm block mb-1.5" style={{ fontSize: 13 }}>
                        Skills
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {[...skills].map((s) => (
                          <span
                            key={s}
                            className="font-sans text-white px-2 py-0.5"
                            style={{
                              fontSize: 11,
                              borderRadius: 10,
                              backgroundColor: 'var(--color-emerald-jhoola)',
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {areas.size > 0 && (
                    <div>
                      <span className="font-sans text-ash-warm block mb-1.5" style={{ fontSize: 13 }}>
                        Areas
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {[...areas].map((a) => (
                          <span
                            key={a}
                            className="font-sans text-ash-warm px-2 py-0.5 border border-dune"
                            style={{ fontSize: 11, borderRadius: 10 }}
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-center gap-3 mt-6 px-5">
              <button
                type="button"
                onClick={() => router.push('/a/assist')}
                className="h-11 px-8 font-sans font-semibold border active:opacity-80 transition-opacity"
                style={{
                  fontSize: 14,
                  borderRadius: 12,
                  borderColor: 'var(--color-emerald-jhoola)',
                  color: 'var(--color-emerald-jhoola)',
                  backgroundColor: 'transparent',
                }}
              >
                Back to Assist
              </button>
              <button
                type="button"
                onClick={() => router.push('/a/profile')}
                className="font-sans active:opacity-60"
                style={{ fontSize: 13, color: 'var(--color-emerald-jhoola)' }}
              >
                View your profile
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pinned CTA (only shown on form) */}
      <AnimatePresence>
        {!submitted && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22, ease: LUXURY }}
            className="fixed bottom-0 left-0 right-0 px-5 pb-safe bg-sandstone border-t border-dune"
            style={{ paddingTop: 12 }}
          >
            <div className="max-w-[480px] mx-auto">
              <button
                type="button"
                onClick={() => canSubmit && setSubmitted(true)}
                disabled={!canSubmit}
                className="w-full font-sans font-semibold h-[52px] transition-colors duration-220"
                style={{
                  fontSize: 15,
                  borderRadius: 16,
                  backgroundColor: canSubmit ? 'var(--color-emerald-jhoola)' : 'var(--color-dune)',
                  color: canSubmit ? '#fff' : 'var(--color-silver-sand)',
                }}
              >
                Register as assistant
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

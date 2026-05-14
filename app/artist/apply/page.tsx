'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle, Check } from 'lucide-react'
import { CITIES } from '@/constants/cities'
import type { ServiceCategory } from '@/types'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

const CATEGORIES: Array<{ slug: ServiceCategory; label: string }> = [
  { slug: 'bridal', label: 'Bridal' },
  { slug: 'party', label: 'Party' },
  { slug: 'everyday', label: 'Everyday' },
  { slug: 'editorial', label: 'Editorial' },
  { slug: 'mehendi', label: 'Mehendi' },
  { slug: 'hair', label: 'Hair' },
  { slug: 'skincare', label: 'Skincare' },
  { slug: 'draping', label: 'Draping' },
]

const EXPERIENCE_OPTIONS = [
  { value: '0-1', label: 'Less than 1 year' },
  { value: '1-3', label: '1–3 years' },
  { value: '3-5', label: '3–5 years' },
  { value: '5-10', label: '5–10 years' },
  { value: '10+', label: '10+ years' },
]

interface FormState {
  fullName: string
  phone: string
  city: string
  instagram: string
  experience: string
  category: ServiceCategory | ''
}

const EMPTY_FORM: FormState = {
  fullName: '', phone: '', city: '', instagram: '', experience: '', category: '',
}

export default function ArtistApplyPage() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState<Record<string, boolean>>({})

  const canSubmit =
    form.fullName.trim().length >= 2 &&
    form.phone.replace(/\D/g, '').length === 10 &&
    form.city.length > 0 &&
    form.experience.length > 0 &&
    form.category.length > 0

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((p) => ({ ...p, [key]: value }))
  }

  function handlePhoneChange(v: string) {
    const digits = v.replace(/\D/g, '').slice(0, 10)
    setField('phone', digits)
  }

  async function handleSubmit() {
    if (!canSubmit || loading) return
    setLoading(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    setSubmitted(true)
  }

  const inputStyle = (k: string): React.CSSProperties => ({
    height: 52,
    background: 'var(--color-alabaster)',
    border: `1.5px solid ${focused[k] ? 'var(--color-emerald-jhoola)' : 'var(--color-dune)'}`,
    borderRadius: 12,
    padding: '0 16px',
    fontSize: 15,
    color: 'var(--color-ink)',
    width: '100%',
    outline: 'none',
    boxShadow: focused[k] ? '0 0 0 3px rgba(15,95,76,0.12)' : 'none',
    transition: 'border-color 220ms, box-shadow 220ms',
    fontFamily: 'inherit',
  })
  const foc = (k: string) => setFocused((p) => ({ ...p, [k]: true }))
  const blr = (k: string) => setFocused((p) => ({ ...p, [k]: false }))

  return (
    <div
      className="min-h-[100dvh] bg-sandstone max-w-[480px] mx-auto flex flex-col"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0">
        <button
          type="button"
          onClick={() => router.push('/artist')}
          className="w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-[220ms] active:bg-mist-warm"
        >
          <ArrowLeft size={22} strokeWidth={1.5} style={{ color: 'var(--color-ink)' }} />
        </button>
        <p className="font-sans font-semibold text-ink" style={{ fontSize: 17 }}>
          Apply to Singara
        </p>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: LUXURY }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 overflow-y-auto px-6 pt-2 pb-4 space-y-4">
              <div>
                <p className="font-sans text-ash-warm" style={{ fontSize: 14, lineHeight: 1.6 }}>
                  Tell us a bit about yourself. We&apos;ll be in touch within 48 hours.
                </p>
              </div>

              {/* Full name */}
              <div>
                <p className="font-sans font-semibold text-ink mb-1.5" style={{ fontSize: 13 }}>Full name</p>
                <input
                  type="text" value={form.fullName} onChange={(e) => setField('fullName', e.target.value)}
                  placeholder="Your full name"
                  onFocus={() => foc('name')} onBlur={() => blr('name')}
                  style={inputStyle('name')} />
              </div>

              {/* Phone */}
              <div>
                <p className="font-sans font-semibold text-ink mb-1.5" style={{ fontSize: 13 }}>Phone number</p>
                <div className="flex gap-2">
                  <div
                    className="flex items-center px-3 rounded-[12px] flex-shrink-0"
                    style={{ height: 52, backgroundColor: 'var(--color-alabaster)', border: '1.5px solid var(--color-dune)' }}
                  >
                    <p className="font-sans text-ink" style={{ fontSize: 15 }}>🇮🇳 +91</p>
                  </div>
                  <input
                    type="tel" inputMode="numeric" value={form.phone} onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="10-digit mobile number"
                    onFocus={() => foc('phone')} onBlur={() => blr('phone')}
                    style={{ ...inputStyle('phone'), flex: 1 }} />
                </div>
              </div>

              {/* City */}
              <div>
                <p className="font-sans font-semibold text-ink mb-2" style={{ fontSize: 13 }}>City</p>
                <div className="grid grid-cols-2 gap-2">
                  {CITIES.map((c) => {
                    const active = c.id === 'bengaluru'
                    const sel = form.city === c.id
                    return (
                      <button
                        key={c.id} type="button" disabled={!active}
                        onClick={() => active && setField('city', c.id)}
                        className="h-11 font-sans rounded-[12px] transition-all duration-[220ms] flex items-center justify-between px-3"
                        style={{
                          fontSize: 14,
                          backgroundColor: sel ? 'var(--color-emerald-jhoola)' : 'var(--color-alabaster)',
                          color: sel ? 'white' : active ? 'var(--color-ink)' : 'var(--color-silver-sand)',
                          border: sel ? 'none' : '1.5px solid var(--color-dune)',
                          opacity: active ? 1 : 0.6,
                        }}
                      >
                        <span>{c.name}</span>
                        {!active && <span style={{ fontSize: 10, color: 'var(--color-silver-sand)' }}>Soon</span>}
                        {sel && <Check size={14} strokeWidth={2} />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Instagram */}
              <div>
                <p className="font-sans font-semibold text-ink mb-1.5" style={{ fontSize: 13 }}>
                  Instagram handle <span className="font-normal text-ash-warm">(optional)</span>
                </p>
                <div className="relative">
                  <span
                    className="absolute left-4 top-1/2 -translate-y-1/2 font-sans text-ash-warm pointer-events-none"
                    style={{ fontSize: 15 }}
                  >
                    @
                  </span>
                  <input
                    type="text" value={form.instagram}
                    onChange={(e) => setField('instagram', e.target.value.replace(/^@/, ''))}
                    placeholder="yourhandle"
                    onFocus={() => foc('ig')} onBlur={() => blr('ig')}
                    style={{ ...inputStyle('ig'), paddingLeft: 32 }} />
                </div>
              </div>

              {/* Experience */}
              <div>
                <p className="font-sans font-semibold text-ink mb-2" style={{ fontSize: 13 }}>Years of experience</p>
                <div className="space-y-2">
                  {EXPERIENCE_OPTIONS.map((opt) => {
                    const sel = form.experience === opt.value
                    return (
                      <button
                        key={opt.value} type="button" onClick={() => setField('experience', opt.value)}
                        className="w-full h-11 px-4 flex items-center justify-between font-sans rounded-[12px] transition-all duration-[220ms]"
                        style={{
                          fontSize: 14,
                          backgroundColor: sel ? 'var(--color-emerald-jhoola)' : 'var(--color-alabaster)',
                          color: sel ? 'white' : 'var(--color-ink)',
                          border: sel ? 'none' : '1.5px solid var(--color-dune)',
                        }}
                      >
                        {opt.label}
                        {sel && <Check size={14} strokeWidth={2} />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Primary category */}
              <div>
                <p className="font-sans font-semibold text-ink mb-2" style={{ fontSize: 13 }}>Primary specialty</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(({ slug, label }) => {
                    const sel = form.category === slug
                    return (
                      <button
                        key={slug} type="button" onClick={() => setField('category', slug)}
                        className="h-9 px-4 font-sans font-semibold rounded-full transition-all duration-[220ms]"
                        style={{
                          fontSize: 13,
                          backgroundColor: sel ? 'var(--color-emerald-jhoola)' : 'var(--color-alabaster)',
                          color: sel ? 'white' : 'var(--color-ash-warm)',
                          border: sel ? 'none' : '1.5px solid var(--color-dune)',
                        }}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div
              className="flex-shrink-0 px-6 pt-3"
              style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}
            >
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit || loading}
                className="w-full h-[52px] font-sans font-semibold rounded-[14px] transition-all duration-[220ms] active:opacity-80"
                style={{
                  fontSize: 16,
                  backgroundColor: canSubmit ? 'var(--color-emerald-jhoola)' : 'var(--color-dune)',
                  color: canSubmit ? 'white' : 'var(--color-silver-sand)',
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                }}
              >
                {loading ? 'Submitting…' : 'Submit application'}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: LUXURY }}
            className="flex-1 flex flex-col items-center justify-center px-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: LUXURY }}
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: 'rgba(15,95,76,0.10)' }}
            >
              <CheckCircle size={44} strokeWidth={1.5} style={{ color: 'var(--color-tulsi)' }} />
            </motion.div>

            <h2 className="font-display text-ink mb-3" style={{ fontSize: 28, fontWeight: 500 }}>
              Application received!
            </h2>

            <p className="font-sans text-ash-warm mb-2" style={{ fontSize: 15, lineHeight: 1.6 }}>
              Thanks for applying, {form.fullName.split(' ')[0]}.
            </p>
            <p className="font-sans text-ash-warm mb-2" style={{ fontSize: 14, lineHeight: 1.6 }}>
              We&apos;ll review your application and reach out to{' '}
              <span className="font-semibold text-ink">+91 {form.phone}</span>
              {' '}within 48 hours.
            </p>

            <div
              className="w-full mt-6 p-4 rounded-[14px]"
              style={{ backgroundColor: 'rgba(201,169,97,0.08)', border: '1px solid rgba(201,169,97,0.20)' }}
            >
              <p className="font-sans font-semibold text-ink mb-1" style={{ fontSize: 14 }}>
                While you wait…
              </p>
              <p className="font-sans text-ash-warm" style={{ fontSize: 13, lineHeight: 1.5 }}>
                Start thinking about your portfolio photos. The more high-quality images you upload, the faster you&apos;ll get bookings.
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push('/')}
              className="w-full mt-8 h-[52px] font-sans font-semibold rounded-[14px] transition-all duration-[220ms] active:opacity-80"
              style={{ fontSize: 16, backgroundColor: 'var(--color-emerald-jhoola)', color: 'white' }}
            >
              Back to home
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

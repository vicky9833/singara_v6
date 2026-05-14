'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, Pencil, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useProfileSetupStore } from '@/stores/profileSetupStore'
import { useSingaraPause } from '@/hooks/useSingaraPause'

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const

const CITIES = [
  'Bangalore', 'Mumbai', 'Delhi NCR', 'Chennai',
  'Hyderabad', 'Pune', 'Kolkata', 'Jaipur',
] as const

const GENDER_OPTIONS = [
  { value: 'woman' as const, label: 'Woman' },
  { value: 'man' as const, label: 'Man' },
  { value: 'prefer-not-to-say' as const, label: 'Prefer not to say' },
]

const LANGUAGES = [
  'English', 'Hindi', 'Kannada', 'Tamil', 'Telugu',
  'Malayalam', 'Marathi', 'Bengali', 'Gujarati', 'Punjabi',
]

const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
}

// ── Step 1: Name + Photo ────────────────────────────────────────────────────
function Step1() {
  const { firstName, setFirstName, photoUrl, setPhotoUrl, setStep } =
    useProfileSetupStore()
  const singaraPause = useSingaraPause()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [nameError, setNameError] = useState('')

  const isNameInvalid =
    firstName.length > 0 &&
    (firstName.length < 2 || !/^[a-zA-Z\s]+$/.test(firstName))
  const canContinue = !isNameInvalid

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      if (ev.target?.result) setPhotoUrl(ev.target.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleContinue = () => {
    if (!canContinue) {
      setNameError('Name must be at least 2 letters and contain only letters')
      return
    }
    setNameError('')
    singaraPause(() => setStep(2))
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-6 pt-6">
        <h2 className="font-heading font-semibold text-ink" style={{ fontSize: 22 }}>
          Let&rsquo;s get to know you
        </h2>
        <p className="mt-2 font-sans text-ash-warm" style={{ fontSize: 14 }}>
          This helps artists prepare for your appointment
        </p>

        {/* Photo upload */}
        <div className="flex flex-col items-center mt-8">
          <div className="relative">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-24 h-24 rounded-full bg-dune flex items-center justify-center overflow-hidden"
              style={{ border: '2px dashed var(--color-silver-sand)' }}
              aria-label={photoUrl ? 'Change photo' : 'Add photo'}
            >
              {photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoUrl}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera size={24} strokeWidth={1.5} className="text-ash-warm" />
              )}
            </button>

            {photoUrl && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-jhoola flex items-center justify-center"
                aria-label="Edit photo"
              >
                <Pencil size={12} strokeWidth={1.5} className="text-alabaster" />
              </button>
            )}
          </div>

          <p className="mt-3 font-sans text-ash-warm" style={{ fontSize: 13 }}>
            {photoUrl ? 'Change photo' : 'Add photo'}
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>

        {/* First name input */}
        <div className="mt-8">
          <label className="block font-sans text-ink mb-2" style={{ fontSize: 13 }}>
            First name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value)
              if (nameError) setNameError('')
            }}
            placeholder="What should artists call you?"
            className={cn(
              'w-full h-12 bg-alabaster rounded-xl px-4 text-base font-medium text-ink outline-none border',
              'placeholder:text-silver-sand font-sans',
              'transition-shadow duration-[220ms] focus:shadow-[0_0_0_3px_rgba(15,95,76,0.12)]',
              isNameInvalid
                ? 'border-vermilion'
                : 'border-dune focus:border-emerald-jhoola'
            )}
          />
          {(nameError || isNameInvalid) && (
            <p className="mt-1.5 font-sans text-vermilion" style={{ fontSize: 13 }}>
              {nameError || 'Name must be at least 2 letters and contain only letters'}
            </p>
          )}
        </div>
      </div>

      {/* CTA pinned to bottom */}
      <div className="px-6 pb-8 pt-4 bg-sandstone">
        <button
          onClick={handleContinue}
          className={cn(
            'w-full h-12 rounded-2xl font-sans text-base font-semibold transition-colors duration-[220ms]',
            canContinue
              ? 'bg-emerald-jhoola text-alabaster active:brightness-95'
              : 'bg-dune text-silver-sand cursor-not-allowed'
          )}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

// ── Step 2: City + Gender ───────────────────────────────────────────────────
function Step2() {
  const { city, setCity, gender, setGender, setStep } = useProfileSetupStore()
  const singaraPause = useSingaraPause()
  const canContinue = city !== null

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-6 pt-6">
        <h2 className="font-heading font-semibold text-ink" style={{ fontSize: 22 }}>
          Where are you based?
        </h2>

        {/* City grid */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {CITIES.map((c) => {
            const isSelected = city === c
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCity(c)}
                className={cn(
                  'bg-alabaster rounded-2xl p-4 font-sans text-center transition-all duration-[220ms]',
                  isSelected
                    ? 'text-emerald-jhoola border-2 border-emerald-jhoola shadow-[0_0_0_3px_rgba(15,95,76,0.12)]'
                    : 'text-ink border border-dune'
                )}
                style={{ fontSize: 14 }}
              >
                {c}
              </button>
            )
          })}
        </div>

        <p
          className="mt-4 font-accent italic text-silver-sand text-center"
          style={{ fontSize: 14 }}
        >
          Other cities coming soon
        </p>

        {/* Gender selector */}
        <div className="mt-6">
          <p className="font-sans text-ash-warm mb-3" style={{ fontSize: 13 }}>
            Gender <span className="text-silver-sand">(optional)</span>
          </p>
          <div className="flex gap-3 flex-wrap">
            {GENDER_OPTIONS.map(({ value, label }) => {
              const isSelected = gender === value
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setGender(isSelected ? null : value)}
                  className={cn(
                    'h-8 px-4 font-sans transition-all duration-[220ms]',
                    isSelected
                      ? 'bg-emerald-jhoola text-alabaster'
                      : 'bg-alabaster border border-dune text-ink'
                  )}
                  style={{ fontSize: 14, borderRadius: 14 }}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA pinned to bottom */}
      <div className="px-6 pb-8 pt-4 bg-sandstone">
        <button
          onClick={() => canContinue && singaraPause(() => setStep(3))}
          disabled={!canContinue}
          className={cn(
            'w-full h-12 rounded-2xl font-sans text-base font-semibold transition-colors duration-[220ms]',
            canContinue
              ? 'bg-emerald-jhoola text-alabaster active:brightness-95'
              : 'bg-dune text-silver-sand cursor-not-allowed'
          )}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

// ── Step 3: Languages ───────────────────────────────────────────────────────
function Step3() {
  const router = useRouter()
  const { languages, toggleLanguage, completeSetup } = useProfileSetupStore()
  const singaraPause = useSingaraPause()
  const canComplete = languages.length > 0

  const handleComplete = () => {
    if (!canComplete) return
    singaraPause(() => {
      completeSetup()
      router.push('/c/home')
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-6 pt-6">
        <h2 className="font-heading font-semibold text-ink" style={{ fontSize: 22 }}>
          Languages you speak
        </h2>
        <p className="mt-2 font-sans text-ash-warm" style={{ fontSize: 14 }}>
          So we can match you with artists who speak your language
        </p>

        {/* Language chips */}
        <div className="mt-6 flex flex-wrap gap-3">
          {LANGUAGES.map((lang) => {
            const isSelected = languages.includes(lang)
            return (
              <button
                key={lang}
                type="button"
                onClick={() => toggleLanguage(lang)}
                className={cn(
                  'h-9 px-4 flex items-center gap-1.5 font-sans transition-all duration-[220ms]',
                  isSelected
                    ? 'bg-emerald-jhoola text-alabaster'
                    : 'bg-alabaster border border-dune text-ink'
                )}
                style={{ fontSize: 14, borderRadius: 20 }}
              >
                {isSelected && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.15, ease: LUXURY_EASE }}
                    className="flex items-center"
                  >
                    <Check size={12} strokeWidth={2} />
                  </motion.span>
                )}
                {lang}
              </button>
            )
          })}
        </div>
      </div>

      {/* CTA pinned to bottom */}
      <div className="px-6 pb-8 pt-4 bg-sandstone">
        <button
          onClick={handleComplete}
          disabled={!canComplete}
          className={cn(
            'w-full h-12 rounded-2xl font-sans text-base font-semibold transition-all duration-[220ms]',
            !canComplete && 'bg-dune text-silver-sand cursor-not-allowed'
          )}
          style={
            canComplete
              ? {
                  background: 'var(--gradient-haldi-sunrise)',
                  border: '1.5px solid var(--color-heritage-gold)',
                  color: 'white',
                }
              : undefined
          }
        >
          Start exploring
        </button>
      </div>
    </div>
  )
}

// ── Main page ───────────────────────────────────────────────────────────────
export default function ProfileSetupPage() {
  const { step, stepDirection } = useProfileSetupStore()

  return (
    <div className="flex-1 relative overflow-hidden">
      <AnimatePresence custom={stepDirection} initial={false}>
        <motion.div
          key={step}
          custom={stepDirection}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.32, ease: LUXURY_EASE }}
          className="absolute inset-0"
        >
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

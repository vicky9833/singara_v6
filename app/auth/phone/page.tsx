'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import PhoneInput from '@/components/auth/PhoneInput'
import { useAuthStore } from '@/stores'
import { useSingaraPause } from '@/hooks/useSingaraPause'

const luxuryEase = [0.22, 1, 0.36, 1] as const

export default function PhonePage() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setPhoneNumber, setOtpSessionId } = useAuthStore()
  const singaraPause = useSingaraPause()

  const isEnabled = phone.length === 10 && !isSubmitting

  const handleSubmit = () => {
    if (!isEnabled) return
    setIsSubmitting(true)
    singaraPause(() => {
      try {
        setPhoneNumber(phone)
        setTimeout(() => {
          setOtpSessionId('mock-session-id')
          router.push('/auth/otp')
        }, 800)
      } catch (err) {
        console.error(err)
        setIsSubmitting(false)
      }
    })
  }

  return (
    <motion.div
      className="flex flex-col flex-1"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.48, ease: luxuryEase, delay: 0.08 }}
    >
      {/* Back button */}
      <button
        type="button"
        onClick={() => router.back()}
        className="self-start p-3 rounded-xl text-ink hover:bg-mist-warm/50 mb-6 -ml-3 transition-colors duration-[220ms]"
      >
        <ArrowLeft size={20} strokeWidth={1.5} />
      </button>

      {/* Heading */}
      <div className="text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink">
          Welcome to Singara
        </h2>
        <p className="text-sm text-ash-warm mt-2">
          Enter your mobile number to continue
        </p>
      </div>

      {/* Phone input */}
      <div className="mt-8">
        <PhoneInput value={phone} onChange={setPhone} disabled={isSubmitting} />
      </div>

      {/* CTA — pinned to bottom */}
      <div className="mt-auto pt-4 w-full pb-safe">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isEnabled}
          className={`w-full h-[52px] rounded-[14px] font-medium text-base ${
            phone.length < 10
              ? 'bg-dune text-silver-sand cursor-not-allowed'
              : isSubmitting
              ? 'bg-emerald-jhoola text-alabaster pointer-events-none'
              : 'bg-emerald-jhoola text-alabaster hover:bg-emerald-jhoola/90'
          }`}
          style={{
            transition:
              'background-color 220ms cubic-bezier(0.22, 1, 0.36, 1), color 220ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <span className="w-5 h-5 border-2 border-alabaster border-t-transparent rounded-full animate-spin" />
            </span>
          ) : (
            'Continue'
          )}
        </button>

        {/* Terms — below the button */}
        <p className="mt-3 text-center text-[11px] text-ash-warm leading-relaxed">
          By continuing, you agree to our{' '}
          <a
            href="/terms"
            className="text-emerald-jhoola underline underline-offset-2"
          >
            Terms of Service
          </a>
          {' '}and{' '}
          <a
            href="/privacy"
            className="text-emerald-jhoola underline underline-offset-2"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </motion.div>
  )
}

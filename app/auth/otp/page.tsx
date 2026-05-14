'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import OtpInput from '@/components/auth/OtpInput'
import { useAuthStore } from '@/stores'

const luxuryEase = [0.22, 1, 0.36, 1] as const

function formatPhone(phone: string) {
  if (phone.length !== 10) return phone ? `+91 ${phone}` : ''
  return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`
}

export default function OtpPage() {
  const router = useRouter()
  const phoneNumber = useAuthStore((s) => s.phoneNumber)

  const [otp, setOtp] = useState('')
  const [error, setError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [canResend, setCanResend] = useState(false)

  const errorClearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Recursive countdown
  useEffect(() => {
    if (canResend) return
    if (countdown <= 0) {
      setCanResend(true)
      return
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown, canResend])

  const handleVerify = useCallback(() => {
    if (otp.length < 6 || isSubmitting) return
    setIsSubmitting(true)
    setTimeout(() => {
      if (otp === '000000') {
        setError(true)
        setIsSubmitting(false)
        errorClearTimerRef.current = setTimeout(() => {
          setError(false)
          setOtp('')
        }, 2000)
      } else {
        router.push('/auth/role')
      }
    }, 880)
  }, [otp, isSubmitting, router])

  // Auto-submit when all 6 digits are entered (300ms delay)
  useEffect(() => {
    if (otp.length !== 6 || isSubmitting || error) return
    const timer = setTimeout(handleVerify, 300)
    return () => clearTimeout(timer)
  }, [otp.length, isSubmitting, error, handleVerify])

  const handleResend = () => {
    if (!canResend) return
    setCanResend(false)
    setCountdown(30)
    setError(false)
    setOtp('')
    toast('Code sent again')
  }

  const handleOtpChange = (val: string) => {
    if (error) {
      setError(false)
      if (errorClearTimerRef.current) {
        clearTimeout(errorClearTimerRef.current)
        errorClearTimerRef.current = null
      }
    }
    setOtp(val)
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
        <h2 className="font-display text-2xl font-semibold text-ink">
          Enter verification code
        </h2>
        <p className="text-sm text-ash-warm mt-2">
          {formatPhone(phoneNumber)}
        </p>
        {/* Edit link */}
        <button
          type="button"
          onClick={() => router.push('/auth/phone')}
          className="inline-flex items-center gap-1 text-emerald-jhoola text-[13px] mt-1.5"
        >
          <ArrowLeft size={12} strokeWidth={1.5} />
          Edit
        </button>
      </div>

      {/* OTP input */}
      <div className="mt-8">
        <OtpInput
          value={otp}
          onChange={handleOtpChange}
          error={error}
          disabled={isSubmitting}
        />
      </div>

      {/* Error message — reserved space to avoid layout shift */}
      <div className="mt-3 h-5 flex items-center justify-center">
        {error && (
          <p className="text-[13px] text-vermilion text-center">
            Incorrect code. Please try again.
          </p>
        )}
      </div>

      {/* Resend pill */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={handleResend}
          disabled={!canResend}
          className="rounded-full px-4 py-2 text-[13px]"
          style={{
            backgroundColor: canResend
              ? 'var(--color-emerald-jhoola)'
              : 'var(--color-dune)',
            color: canResend ? 'var(--color-alabaster)' : 'var(--color-silver-sand)',
            transition:
              'background-color 320ms cubic-bezier(0.22, 1, 0.36, 1), color 320ms cubic-bezier(0.22, 1, 0.36, 1)',
            cursor: canResend ? 'pointer' : 'default',
            borderRadius: '20px',
          }}
        >
          {canResend
            ? 'Resend code'
            : `Resend code in 0:${String(countdown).padStart(2, '0')}`}
        </button>
      </div>

      {/* CTA — pinned to bottom */}
      <div className="mt-auto pt-4 w-full pb-safe">
        <button
          type="button"
          onClick={handleVerify}
          disabled={otp.length < 6 || isSubmitting}
          className={`w-full h-[52px] rounded-[14px] font-medium text-base ${
            otp.length < 6
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
            'Verify'
          )}
        </button>
      </div>
    </motion.div>
  )
}

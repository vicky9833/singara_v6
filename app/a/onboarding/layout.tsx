'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import SingaraLogo from '@/components/shared/SingaraLogo'
import { useArtistOnboardingStore } from '@/stores/artistOnboardingStore'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]
const TOTAL_STEPS = 8

export default function ArtistOnboardingLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const currentStep = useArtistOnboardingStore((s) => s.currentStep)
  const setStep = useArtistOnboardingStore((s) => s.setStep)
  const progress = (currentStep / TOTAL_STEPS) * 100

  function handleBack() {
    if (currentStep === 1) {
      router.push('/auth/role')
    } else {
      setStep(currentStep - 1)
    }
  }

  return (
    <div
      className="flex flex-col min-h-[100dvh] bg-sandstone max-w-[480px] mx-auto"
    >
      {/* Header */}
      <div
        className="flex-shrink-0 bg-sandstone"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        {/* Back + Logo row */}
        <div className="flex items-center h-14 px-4">
          <button
            type="button"
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center rounded-full -ml-1 transition-colors duration-[220ms] active:bg-mist-warm"
          >
            <ArrowLeft size={22} strokeWidth={1.5} className="text-ink" />
          </button>
          <div className="flex-1 flex justify-center">
            <SingaraLogo size="sm" variant="dark" />
          </div>
          <div className="w-10" />
        </div>

        {/* Progress bar */}
        <div className="px-6 pb-4 flex items-center gap-3">
          <div
            className="flex-1 overflow-hidden"
            style={{ height: 3, backgroundColor: 'var(--color-dune)', borderRadius: 2 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: 'var(--color-emerald-jhoola)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.32, ease: LUXURY }}
            />
          </div>
          <p
            className="font-sans flex-shrink-0"
            style={{ fontSize: 12, color: 'var(--color-ash-warm)' }}
          >
            Step {currentStep} of {TOTAL_STEPS}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-x-hidden">
        {children}
      </div>
    </div>
  )
}

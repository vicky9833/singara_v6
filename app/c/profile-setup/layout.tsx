'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import SingaraLogo from '@/components/shared/SingaraLogo'
import { useProfileSetupStore } from '@/stores/profileSetupStore'

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const

export default function ProfileSetupLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const step = useProfileSetupStore((s) => s.step)
  const setStep = useProfileSetupStore((s) => s.setStep)

  const handleBack = () => {
    if (step === 1) {
      router.push('/auth/role')
    } else {
      setStep((step - 1) as 1 | 2 | 3)
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-sandstone">
      {/* Header: back button + logo */}
      <div className="relative flex items-center justify-center h-14 px-4 mt-3">
        <button
          onClick={handleBack}
          className="absolute left-4 w-11 h-11 flex items-center justify-center rounded-full"
          aria-label="Go back"
        >
          <ArrowLeft size={20} strokeWidth={1.5} className="text-ink" />
        </button>
        <SingaraLogo size="sm" variant="dark" showWordmark={false} />
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 pt-3 pb-1">
        {([1, 2, 3] as const).map((dot) => (
          <motion.div
            key={dot}
            className="w-2 h-2 rounded-full"
            animate={{
              backgroundColor:
                dot < step
                  ? 'var(--color-heritage-gold)'
                  : dot === step
                    ? 'var(--color-emerald-jhoola)'
                    : 'var(--color-dune)',
            }}
            transition={{ duration: 0.22, ease: LUXURY_EASE }}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  )
}

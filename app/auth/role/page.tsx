'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, Palette, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/stores'
import { useSingaraPause } from '@/hooks/useSingaraPause'

const luxuryEase = [0.22, 1, 0.36, 1] as const

type Role = 'customer' | 'artist'

interface CardDef {
  role: Role
  icon: typeof Sparkles
  title: string
  subtitle: string
  delay: number
}

const cards: CardDef[] = [
  {
    role: 'customer',
    icon: Sparkles,
    title: "I'm looking for an artist",
    subtitle: 'Discover and reserve verified artists.',
    delay: 0.08,
  },
  {
    role: 'artist',
    icon: Palette,
    title: "I'm a makeup artist",
    subtitle: 'Showcase your craft, grow your practice.',
    delay: 0.18,
  },
]

export default function RolePage() {
  const router = useRouter()
  const setRole = useAuthStore((s) => s.setRole)
  const singaraPause = useSingaraPause()

  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const ctaLabel =
    selectedRole === 'customer'
      ? 'Find my artist'
      : selectedRole === 'artist'
      ? 'Join as artist'
      : 'Continue'

  const handleContinue = () => {
    if (!selectedRole || isSubmitting) return
    setIsSubmitting(true)
    singaraPause(() => {
      setRole(selectedRole)
      if (selectedRole === 'customer') {
        router.push('/c/profile-setup')
      } else {
        router.push('/a/onboarding')
      }
    })
  }

  return (
    <div className="flex flex-col flex-1">
      {/* Heading */}
      <div className="text-center">
        <h2 className="font-heading text-xl font-semibold text-ink">
          How would you like to use Singara?
        </h2>
      </div>

      {/* Role cards */}
      <div className="mt-8 flex flex-col gap-4">
        {cards.map(({ role, icon: Icon, title, subtitle, delay }) => {
          const isSelected = selectedRole === role
          const isDeemphasized = selectedRole !== null && !isSelected

          return (
            <motion.button
              key={role}
              type="button"
              onClick={() => setSelectedRole(role)}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, ease: luxuryEase, delay }}
              className="rounded-[20px] p-5 cursor-pointer relative text-left active:scale-[0.98]"
              style={{
                backgroundColor: isSelected
                  ? 'var(--color-sandstone)'
                  : 'var(--color-alabaster)',
                border: isSelected
                  ? '2px solid var(--color-emerald-jhoola)'
                  : '1px solid var(--color-dune)',
                opacity: isDeemphasized ? 0.6 : 1,
                boxShadow: isSelected
                  ? '0 0 0 3px rgba(15, 95, 76, 0.12)'
                  : '0 0 0 0px rgba(15, 95, 76, 0)',
                transition:
                  'border-color 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1), background-color 220ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {/* Checkmark badge — animates in with scale */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.22, ease: luxuryEase }}
                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-jhoola flex items-center justify-center"
                  >
                    <Check size={14} strokeWidth={2} className="text-alabaster" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icon — 28px, Emerald Jhoola, above title */}
              <Icon size={28} strokeWidth={1.5} className="text-emerald-jhoola mb-3" />

              {/* Title */}
              <p className="text-base font-semibold text-ink">{title}</p>

              {/* Subtitle */}
              <p className="text-[13px] text-ash-warm mt-1">{subtitle}</p>
            </motion.button>
          )
        })}
      </div>

      {/* CTA — pinned to bottom */}
      <div className="mt-auto pt-4 w-full pb-safe">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!selectedRole || isSubmitting}
          className={`w-full h-[52px] rounded-[14px] font-medium text-base relative overflow-hidden ${
            !selectedRole ? 'cursor-not-allowed' : isSubmitting ? 'pointer-events-none' : ''
          }`}
          style={{
            backgroundColor: selectedRole
              ? 'var(--color-emerald-jhoola)'
              : 'var(--color-dune)',
            color: selectedRole ? 'var(--color-alabaster)' : 'var(--color-silver-sand)',
            transition:
              'background-color 220ms cubic-bezier(0.22, 1, 0.36, 1), color 220ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isSubmitting ? (
              <motion.span
                key="spinner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="w-5 h-5 border-2 border-alabaster border-t-transparent rounded-full animate-spin" />
              </motion.span>
            ) : (
              <motion.span
                key={ctaLabel}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15, ease: luxuryEase }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {ctaLabel}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  )
}

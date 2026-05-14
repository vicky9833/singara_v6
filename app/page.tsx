'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import SingaraLogo from '@/components/shared/SingaraLogo'

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const

export default function Home() {
  const router = useRouter()
  const [fadingOut, setFadingOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadingOut(true), 2000)
    const navTimer = setTimeout(() => router.push('/onboarding'), 2300)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(navTimer)
    }
  }, [router])

  return (
    <motion.main
      className="min-h-[100dvh] flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0A1B2E 0%, #0F5F4C 60%, #1A3A4A 100%)' }}
      animate={{ opacity: fadingOut ? 0 : 1 }}
      transition={{ duration: 0.3, ease: LUXURY_EASE }}
    >
      {/* Logo + wordmark + gold line */}
      <SingaraLogo size="lg" variant="light" showWordmark animate iconSize={64} />

      {/* Tagline */}
      <motion.p
        className="font-sans uppercase text-heritage-gold mt-6"
        style={{ fontSize: 13, letterSpacing: '0.2em' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: LUXURY_EASE, delay: 0.9 }}
      >
        The art of being seen.
      </motion.p>
    </motion.main>
  )
}

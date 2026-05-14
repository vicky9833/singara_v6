'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useOnboardingStore } from '@/stores'
import VanityIllustration from '@/components/illustrations/VanityIllustration'
import CalendarIllustration from '@/components/illustrations/CalendarIllustration'
import BrideIllustration from '@/components/illustrations/BrideIllustration'

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const

interface SlideData {
  gradient: string
  illustration: React.ReactNode
  heading: string
  subtext: string
}

const slides: SlideData[] = [
  {
    gradient: 'linear-gradient(180deg, #E4B8B0 0%, #F4EDE1 100%)',
    illustration: <VanityIllustration />,
    heading: 'Find your artist.',
    subtext: 'Discover verified makeup artists near you, matched to your style and occasion.',
  },
  {
    gradient: 'linear-gradient(180deg, #EDE5D6 0%, #F4EDE1 100%)',
    illustration: <CalendarIllustration />,
    heading: 'Reserve the moment.',
    subtext: 'Secure your date with transparent pricing and instant confirmation.',
  },
  {
    gradient: 'linear-gradient(180deg, #F5D49A 0%, #F0D8A8 55%, #F4EDE1 100%)',
    illustration: <BrideIllustration className="w-64 h-56" />,

    heading: 'Become the masterpiece.',
    subtext: 'From your first look to the final reveal, Singara is with you.',
  },
]

function AmbientShapes() {
  return (
    <>
      <div className="absolute top-8 left-6 w-2 h-2 rounded-full bg-[#C9A961] opacity-15" />
      <div className="absolute top-12 right-10 w-3 h-3 rounded-full bg-[#C9A961] opacity-15" />
      <div className="absolute bottom-16 left-12 w-2.5 h-2.5 bg-[#C9A961] opacity-10 rotate-45" />
      <div className="absolute bottom-8 right-8 w-2.5 h-2.5 bg-[#C9A961] opacity-10 rotate-45" />
    </>
  )
}

export default function OnboardingPage() {
  const router = useRouter()
  const { currentSlide, setSlide, completeOnboarding } = useOnboardingStore()

  const goNext = () => {
    if (currentSlide < slides.length - 1) setSlide(currentSlide + 1)
  }

  const goPrev = () => {
    if (currentSlide > 0) setSlide(currentSlide - 1)
  }

  const handleSkip = () => {
    completeOnboarding()
    router.push('/auth/phone')
  }

  const handleBegin = () => {
    completeOnboarding()
    router.push('/auth/phone')
  }

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })

  // Drag handling
  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const { offset, velocity } = info
    if (offset.x < -50 || velocity.x < -500) goNext()
    else if (offset.x > 50 || velocity.x > 500) goPrev()
  }

  const slide = slides[currentSlide]

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-[#F4EDE1] flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="flex flex-col flex-1"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.32, ease: LUXURY_EASE }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
        >
          {/* Mood zone — 55vh */}
          <div
            className="h-[55vh] flex items-center justify-center relative overflow-hidden"
            style={{ background: slide.gradient }}
          >
            <AmbientShapes />
            <div className="relative z-10">{slide.illustration}</div>
          </div>

          {/* Content zone — 45vh */}
          <div className="h-[45vh] bg-[#FCF9F3] rounded-t-3xl flex flex-col items-center px-6 pt-8 pb-6">
            <h2 className="font-display text-3xl font-semibold text-[#1C1814] text-center">
              {slide.heading}
            </h2>
            <p className="text-base text-[#6B5D54] text-center max-w-[280px] mt-3 leading-relaxed font-sans">
              {slide.subtext}
            </p>

            {/* Push navigation to bottom */}
            <div className="mt-auto w-full">
              {/* Dot indicators */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {slides.map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-2 rounded-full"
                    animate={{
                      width: i === currentSlide ? 24 : 8,
                      backgroundColor: i === currentSlide ? '#C9A961' : '#DDD2C1',
                    }}
                    transition={{ duration: 0.22, ease: LUXURY_EASE }}
                  />
                ))}
              </div>

              {/* Buttons row */}
              <div className="flex justify-between items-center w-full">
                {/* Skip */}
                <button
                  type="button"
                  className="text-sm text-ink font-medium px-2 py-1 rounded-lg hover:bg-black/5 transition-colors duration-[220ms] cursor-pointer"
                  onClick={handleSkip}
                >
                  Skip
                </button>

                {/* Next / Begin */}
                {currentSlide < slides.length - 1 ? (
                  <button
                    type="button"
                    className="h-11 px-6 rounded-2xl bg-[#0F5F4C] text-[#FCF9F3] font-medium text-sm transition-all duration-[220ms]"
                    onClick={goNext}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    className="h-11 px-6 rounded-2xl font-semibold text-sm text-[#1C1814] transition-all duration-[220ms]"
                    style={{ backgroundImage: 'linear-gradient(135deg, #E8A33D 0%, #C9A961 50%, #E4B8B0 100%)' }}
                    onClick={handleBegin}
                  >
                    Begin your story
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

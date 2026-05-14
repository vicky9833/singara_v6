import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface OnboardingState {
  currentSlide: number
  hasCompleted: boolean
  setSlide: (slide: number) => void
  completeOnboarding: () => void
  reset: () => void
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      currentSlide: 0,
      hasCompleted: false,
      setSlide: (slide) => set({ currentSlide: slide }),
      completeOnboarding: () => set({ hasCompleted: true }),
      reset: () => set({ currentSlide: 0, hasCompleted: false }),
    }),
    { name: 'singara-onboarding' }
  )
)

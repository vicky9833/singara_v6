import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Gender = 'woman' | 'man' | 'prefer-not-to-say' | null

interface ProfileSetupState {
  step: 1 | 2 | 3
  stepDirection: 1 | -1
  firstName: string
  photoUrl: string | null
  city: string | null
  gender: Gender
  languages: string[]
  isComplete: boolean
  hasHydrated: boolean
  setHasHydrated: (v: boolean) => void
  setStep: (step: 1 | 2 | 3) => void
  setFirstName: (firstName: string) => void
  setPhotoUrl: (photoUrl: string | null) => void
  setCity: (city: string | null) => void
  setGender: (gender: Gender) => void
  toggleLanguage: (language: string) => void
  completeSetup: () => void
}

export const useProfileSetupStore = create<ProfileSetupState>()(
  persist(
    (set) => ({
      step: 1,
      stepDirection: 1,
      firstName: '',
      photoUrl: null,
      city: null,
      gender: null,
      languages: [],
      isComplete: false,
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
      setStep: (newStep) =>
        set((state) => ({
          step: newStep,
          stepDirection: newStep > state.step ? 1 : -1,
        })),
      setFirstName: (firstName) =>
        set({ firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase() }),
      setPhotoUrl: (photoUrl) => set({ photoUrl }),
      setCity: (city) => set({ city }),
      setGender: (gender) => set({ gender }),
      toggleLanguage: (language) =>
        set((state) => ({
          languages: state.languages.includes(language)
            ? state.languages.filter((l) => l !== language)
            : [...state.languages, language],
        })),
      completeSetup: () => set({ isComplete: true }),
    }),
    {
      name: 'singara-profile-setup',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)

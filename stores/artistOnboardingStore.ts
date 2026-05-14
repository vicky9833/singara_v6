import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ServiceCategory } from '@/types'

type Gender = 'woman' | 'man' | 'non_binary' | null

export interface ArtistService {
  id: string
  name: string
  category: ServiceCategory
  description: string
  durationMinutes: number
  basePrice: number
  peakPrice: number
}

export interface ArtistPortfolioImage {
  id: string
  url: string
  caption: string
  category: ServiceCategory
}

interface ArtistOnboardingState {
  currentStep: number
  stepDirection: 1 | -1

  // Step 1
  firstName: string
  lastName: string
  gender: Gender
  dateOfBirth: string

  // Step 2
  photoUrl: string | null

  // Step 3
  city: string
  area: string
  travelRadiusKm: number
  studioAddress: string
  hasStudio: boolean

  // Step 4
  selectedCategories: ServiceCategory[]
  services: ArtistService[]

  // Step 5
  portfolioImages: ArtistPortfolioImage[]

  // Step 6
  experienceYears: number
  certifications: string[]
  brandsWorkedWith: string[]
  bio: string

  // Step 7
  languages: string[]

  // Step 8
  aadhaarUploaded: boolean
  panUploaded: boolean
  selfieUploaded: boolean

  // Meta
  isSubmitted: boolean
  hasHydrated: boolean

  // Actions
  setStep: (step: number) => void
  setBasicInfo: (
    info: Partial<
      Pick<ArtistOnboardingState, 'firstName' | 'lastName' | 'gender' | 'dateOfBirth'>
    >,
  ) => void
  setPhotoUrl: (url: string | null) => void
  setLocation: (
    info: Partial<
      Pick<
        ArtistOnboardingState,
        'city' | 'area' | 'travelRadiusKm' | 'studioAddress' | 'hasStudio'
      >
    >,
  ) => void
  setSelectedCategories: (cats: ServiceCategory[]) => void
  addService: (service: ArtistService) => void
  removeService: (id: string) => void
  updateService: (id: string, updates: Partial<ArtistService>) => void
  addPortfolioImage: (image: ArtistPortfolioImage) => void
  removePortfolioImage: (id: string) => void
  setExperience: (
    info: Partial<
      Pick<
        ArtistOnboardingState,
        'experienceYears' | 'certifications' | 'brandsWorkedWith' | 'bio'
      >
    >,
  ) => void
  setLanguages: (langs: string[]) => void
  setVerification: (
    info: Partial<
      Pick<ArtistOnboardingState, 'aadhaarUploaded' | 'panUploaded' | 'selfieUploaded'>
    >,
  ) => void
  submit: () => void
  reset: () => void
  setHasHydrated: (v: boolean) => void
}

const INITIAL_STATE = {
  currentStep: 1,
  stepDirection: 1 as 1 | -1,
  firstName: '',
  lastName: '',
  gender: null as Gender,
  dateOfBirth: '',
  photoUrl: null,
  city: '',
  area: '',
  travelRadiusKm: 10,
  studioAddress: '',
  hasStudio: false,
  selectedCategories: [] as ServiceCategory[],
  services: [] as ArtistService[],
  portfolioImages: [] as ArtistPortfolioImage[],
  experienceYears: 0,
  certifications: [] as string[],
  brandsWorkedWith: [] as string[],
  bio: '',
  languages: [] as string[],
  aadhaarUploaded: false,
  panUploaded: false,
  selfieUploaded: false,
  isSubmitted: false,
  hasHydrated: false,
}

export const useArtistOnboardingStore = create<ArtistOnboardingState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      setStep: (step) =>
        set((state) => ({
          currentStep: step,
          stepDirection: step > state.currentStep ? 1 : -1,
        })),
      setBasicInfo: (info) => set(info),
      setPhotoUrl: (url) => set({ photoUrl: url }),
      setLocation: (info) => set(info),
      setSelectedCategories: (cats) => set({ selectedCategories: cats }),
      addService: (service) =>
        set((state) => ({ services: [...state.services, service] })),
      removeService: (id) =>
        set((state) => ({ services: state.services.filter((s) => s.id !== id) })),
      updateService: (id, updates) =>
        set((state) => ({
          services: state.services.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        })),
      addPortfolioImage: (image) =>
        set((state) => ({ portfolioImages: [...state.portfolioImages, image] })),
      removePortfolioImage: (id) =>
        set((state) => ({
          portfolioImages: state.portfolioImages.filter((p) => p.id !== id),
        })),
      setExperience: (info) => set(info),
      setLanguages: (langs) => set({ languages: langs }),
      setVerification: (info) => set(info),
      submit: () => set({ isSubmitted: true }),
      reset: () => set({ ...INITIAL_STATE }),
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: 'singara-artist-onboarding',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)

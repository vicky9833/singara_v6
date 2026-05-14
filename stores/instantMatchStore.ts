import { create } from 'zustand'
import type { ServiceCategory, Artist } from '@/types'

export type BudgetOption = 'under_3k' | '3k_8k' | '8k_15k' | 'above_15k' | null

interface InstantMatchState {
  // Request
  category: ServiceCategory | null
  date: string | null // ISO date YYYY-MM-DD
  time: string | null // HH:MM
  budget: BudgetOption
  location: string
  notes: string

  // Matching state
  matchStatus: 'idle' | 'searching' | 'found' | 'no_match'
  matchedArtist: Artist | null
  matchTimeSeconds: number // fictional display time

  // Steps: 1=form, 2=searching, 3=result
  currentStep: number

  // Actions
  setCategory: (cat: ServiceCategory) => void
  setDate: (date: string) => void
  setTime: (time: string) => void
  setBudget: (budget: BudgetOption) => void
  setLocation: (loc: string) => void
  setNotes: (notes: string) => void
  startMatching: () => void
  setMatchResult: (artist: Artist | null, seconds: number) => void
  setStep: (step: number) => void
  reset: () => void
}

const INITIAL_STATE = {
  category: null as ServiceCategory | null,
  date: null as string | null,
  time: null as string | null,
  budget: null as BudgetOption,
  location: '',
  notes: '',
  matchStatus: 'idle' as const,
  matchedArtist: null as Artist | null,
  matchTimeSeconds: 0,
  currentStep: 1,
}

export const useInstantMatchStore = create<InstantMatchState>()((set) => ({
  ...INITIAL_STATE,

  setCategory: (cat) => set({ category: cat }),
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setBudget: (budget) => set({ budget }),
  setLocation: (loc) => set({ location: loc }),
  setNotes: (notes) => set({ notes }),

  startMatching: () => set({ matchStatus: 'searching', currentStep: 2 }),

  setMatchResult: (artist, seconds) =>
    set({
      matchedArtist: artist,
      matchTimeSeconds: seconds,
      matchStatus: artist ? 'found' : 'no_match',
      currentStep: 3,
    }),

  setStep: (step) => set({ currentStep: step }),

  reset: () => set({ ...INITIAL_STATE }),
}))

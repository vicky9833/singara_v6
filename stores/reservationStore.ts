import { create } from 'zustand'

interface AddressState {
  line1: string
  line2: string
  city: string
  pincode: string
  landmark: string
}

interface ReservationState {
  artistId: string | null
  selectedServiceIds: string[]
  selectedDate: string | null // YYYY-MM-DD
  selectedTime: string | null // HH:MM
  locationType: 'customer' | 'studio' | null
  address: AddressState
  needsTrial: boolean
  needsAssistant: boolean
  specialInstructions: string
  currentStep: number // 1–5

  setArtistId: (id: string) => void
  toggleService: (serviceId: string) => void
  setDate: (date: string) => void
  setTime: (time: string) => void
  setLocationType: (type: 'customer' | 'studio') => void
  setAddress: (partial: Partial<AddressState>) => void
  setNeedsTrial: (v: boolean) => void
  setNeedsAssistant: (v: boolean) => void
  setSpecialInstructions: (text: string) => void
  setStep: (step: number) => void
  reset: () => void
}

const INITIAL_STATE = {
  artistId: null,
  selectedServiceIds: [] as string[],
  selectedDate: null,
  selectedTime: null,
  locationType: null as 'customer' | 'studio' | null,
  address: {
    line1: '',
    line2: '',
    city: 'Bangalore',
    pincode: '',
    landmark: '',
  },
  needsTrial: false,
  needsAssistant: false,
  specialInstructions: '',
  currentStep: 1,
}

export const useReservationStore = create<ReservationState>()((set) => ({
  ...INITIAL_STATE,

  setArtistId: (id) => set({ artistId: id }),

  toggleService: (serviceId) =>
    set((state) => ({
      selectedServiceIds: state.selectedServiceIds.includes(serviceId)
        ? state.selectedServiceIds.filter((id) => id !== serviceId)
        : [...state.selectedServiceIds, serviceId],
    })),

  setDate: (date) => set({ selectedDate: date, selectedTime: null }),

  setTime: (time) => set({ selectedTime: time }),

  setLocationType: (type) => set({ locationType: type }),

  setAddress: (partial) =>
    set((state) => ({ address: { ...state.address, ...partial } })),

  setNeedsTrial: (v) => set({ needsTrial: v }),

  setNeedsAssistant: (v) => set({ needsAssistant: v }),

  setSpecialInstructions: (text) => set({ specialInstructions: text }),

  setStep: (step) => set({ currentStep: step }),

  reset: () => set({ ...INITIAL_STATE }),
}))

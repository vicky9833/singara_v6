import { create } from 'zustand'

type UserRole = 'customer' | 'artist' | null

interface AuthState {
  phoneNumber: string
  countryCode: string
  otpSessionId: string | null
  role: UserRole
  isAuthenticated: boolean
  setPhoneNumber: (phoneNumber: string) => void
  setCountryCode: (countryCode: string) => void
  setOtpSessionId: (otpSessionId: string | null) => void
  setRole: (role: UserRole) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
  reset: () => void
}

const initialState = {
  phoneNumber: '',
  countryCode: '+91',
  otpSessionId: null,
  role: null as UserRole,
  isAuthenticated: false,
}

export const useAuthStore = create<AuthState>()((set) => ({
  ...initialState,
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setCountryCode: (countryCode) => set({ countryCode }),
  setOtpSessionId: (otpSessionId) => set({ otpSessionId }),
  setRole: (role) => set({ role }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  reset: () => set(initialState),
}))

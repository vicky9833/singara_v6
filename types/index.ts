export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'refunded'

export type ServiceCategory =
  | 'bridal'
  | 'party'
  | 'everyday'
  | 'editorial'
  | 'mehendi'
  | 'hair'
  | 'skincare'
  | 'draping'

export interface Service {
  id: string
  name: string
  category: ServiceCategory
  description: string
  durationMinutes: number
  basePrice: number
  peakPrice: number
  isPopular?: boolean
}

export interface PortfolioImage {
  id: string
  url: string
  caption?: string
  category: ServiceCategory
}

export interface Review {
  id: string
  customerName: string
  customerPhotoUrl: string | null
  rating: number
  text: string
  date: string
  serviceCategory: ServiceCategory
  photos?: string[]
  artistResponse?: string
}

export interface Artist {
  id: string
  firstName: string
  lastName: string
  displayName: string
  photoUrl: string | null
  bio: string
  city: string
  area: string
  categories: ServiceCategory[]
  experienceYears: number
  avgRating: number
  totalReviews: number
  totalBookings: number
  responseTimeMinutes: number
  isVerified: boolean
  isAvailable: boolean
  availabilityMode: 'available' | 'busy' | 'travel' | 'studio_only' | 'break'
  travelCity?: string
  breakReturnDate?: string
  languages: string[]
  gender: 'woman' | 'man' | 'non_binary'
  startingPrice: number
  portfolioImages: PortfolioImage[]
  services: Service[]
  reviews: Review[]
  travelRadiusKm: number
  workingHours: { start: string; end: string }
  memberSince: string
}

export interface FilterState {
  categories: ServiceCategory[]
  priceRange: [number, number]
  minRating: number
  sortBy: 'rating' | 'price_low' | 'price_high' | 'distance' | 'reviews'
  availableOnly: boolean
}

export interface Customer {
  id: string
  fullName: string
  phoneNumber: string
  avatarUrl: string | null
  cityId: string | null
  createdAt: string
}

export interface Booking {
  id: string
  artistId: string
  customerId: string
  serviceId: string
  status: BookingStatus
  scheduledAt: string
  addressText: string
  totalAmountInr: number
  razorpayOrderId: string | null
  createdAt: string
}

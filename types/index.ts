export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'refunded'

export interface Service {
  id: string
  name: string
  description: string
  durationMinutes: number
  priceInr: number
  categoryId: string
}

export interface Artist {
  id: string
  displayName: string
  bio: string
  cityId: string
  categoryIds: string[]
  services: Service[]
  avatarUrl: string | null
  portfolioUrls: string[]
  ratingAverage: number
  ratingCount: number
  isVerified: boolean
  createdAt: string
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

export interface Review {
  id: string
  bookingId: string
  artistId: string
  customerId: string
  rating: 1 | 2 | 3 | 4 | 5
  comment: string | null
  createdAt: string
}

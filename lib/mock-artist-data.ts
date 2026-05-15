import type { ServiceCategory } from '@/types'

// ── Types ────────────────────────────────────────────────────────────────────

export interface BookingRequest {
  id: string
  customerName: string
  customerPhotoUrl: string | null
  serviceNames: string[]
  category: ServiceCategory
  date: string
  time: string
  duration: string
  location: string
  totalAmount: number
  status: 'pending' | 'accepted' | 'declined' | 'expired'
  requestedAt: string // ISO datetime
  expiresAt: string // 24hr from requestedAt
  customerNote?: string
  isRepeatCustomer: boolean
  customerBookingCount: number
}

export interface CalendarEvent {
  id: string
  type: 'booking' | 'blocked'
  date: string
  startTime?: string
  endTime?: string
  customerName?: string
  serviceName?: string
  amount?: number
  note?: string
}

export interface Transaction {
  id: string
  type: 'booking_payout' | 'tip' | 'referral_bonus' | 'assist_payment'
  description: string
  amount: number
  date: string
  status: 'completed' | 'pending' | 'processing'
  bookingId?: string
  customerName?: string
}

export interface PayoutRecord {
  id: string
  amount: number
  bookingIds: string[]
  status: 'completed' | 'processing' | 'pending'
  bankReference?: string
  processedAt?: string
  createdAt: string
}

// ── Mock Data ─────────────────────────────────────────────────────────────────

const NOW = new Date('2026-05-15T10:00:00+05:30')

function hoursAgo(h: number): string {
  return new Date(NOW.getTime() - h * 60 * 60 * 1000).toISOString()
}

function daysAgo(d: number): string {
  return new Date(NOW.getTime() - d * 24 * 60 * 60 * 1000).toISOString()
}

function hoursFromNow(h: number): string {
  return new Date(NOW.getTime() + h * 60 * 60 * 1000).toISOString()
}

const BOOKING_REQUESTS: BookingRequest[] = [
  {
    id: 'req-001',
    customerName: 'Aisha Patel',
    customerPhotoUrl: null,
    serviceNames: ['Bridal Complete', 'Bridal Trial'],
    category: 'bridal',
    date: '2026-05-22',
    time: '10:00 AM',
    duration: '3 hr',
    location: 'Koramangala',
    totalAmount: 15000,
    status: 'pending',
    requestedAt: hoursAgo(2),
    expiresAt: hoursFromNow(22),
    customerNote: 'Looking for South Indian bridal style with traditional silk saree draping.',
    isRepeatCustomer: true,
    customerBookingCount: 3,
  },
  {
    id: 'req-002',
    customerName: 'Neha Gupta',
    customerPhotoUrl: null,
    serviceNames: ['Party Look'],
    category: 'party',
    date: '2026-05-23',
    time: '4:00 PM',
    duration: '1.5 hr',
    location: 'Indiranagar',
    totalAmount: 4500,
    status: 'pending',
    requestedAt: hoursAgo(5),
    expiresAt: hoursFromNow(19),
    isRepeatCustomer: false,
    customerBookingCount: 0,
  },
  {
    id: 'req-003',
    customerName: 'Lakshmi Iyer',
    customerPhotoUrl: null,
    serviceNames: ['Mehendi Occasion'],
    category: 'mehendi',
    date: '2026-05-24',
    time: '11:00 AM',
    duration: '2 hr',
    location: 'Whitefield',
    totalAmount: 6000,
    status: 'pending',
    requestedAt: hoursAgo(8),
    expiresAt: hoursFromNow(16),
    isRepeatCustomer: false,
    customerBookingCount: 1,
  },
  {
    id: 'req-004',
    customerName: 'Priya Sharma',
    customerPhotoUrl: null,
    serviceNames: ['South Indian Bridal'],
    category: 'bridal',
    date: '2026-05-20',
    time: '9:00 AM',
    duration: '4 hr',
    location: 'JP Nagar',
    totalAmount: 20000,
    status: 'accepted',
    requestedAt: daysAgo(2),
    expiresAt: daysAgo(1),
    isRepeatCustomer: true,
    customerBookingCount: 2,
  },
  {
    id: 'req-005',
    customerName: 'Ritu Agarwal',
    customerPhotoUrl: null,
    serviceNames: ['Everyday Look'],
    category: 'everyday',
    date: '2026-05-19',
    time: '3:00 PM',
    duration: '1 hr',
    location: 'HSR Layout',
    totalAmount: 2500,
    status: 'declined',
    requestedAt: daysAgo(3),
    expiresAt: daysAgo(2),
    customerNote: 'Schedule conflict — another booking already confirmed for this slot.',
    isRepeatCustomer: false,
    customerBookingCount: 0,
  },
]

const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'cal-001',
    type: 'booking',
    date: '2026-05-16',
    startTime: '9:00 AM',
    endTime: '12:00 PM',
    customerName: 'Deepa Menon',
    serviceName: 'South Indian Bridal',
    amount: 18000,
  },
  {
    id: 'cal-002',
    type: 'booking',
    date: '2026-05-16',
    startTime: '2:00 PM',
    endTime: '3:30 PM',
    customerName: 'Suma Reddy',
    serviceName: 'Party Look',
    amount: 4500,
  },
  {
    id: 'cal-003',
    type: 'booking',
    date: '2026-05-18',
    startTime: '10:00 AM',
    endTime: '1:00 PM',
    customerName: 'Ananya Singh',
    serviceName: 'Engagement Look',
    amount: 7000,
  },
  {
    id: 'cal-004',
    type: 'booking',
    date: '2026-05-20',
    startTime: '9:00 AM',
    endTime: '1:00 PM',
    customerName: 'Priya Sharma',
    serviceName: 'South Indian Bridal',
    amount: 20000,
  },
  {
    id: 'cal-005',
    type: 'booking',
    date: '2026-05-22',
    startTime: '10:00 AM',
    endTime: '1:00 PM',
    customerName: 'Aisha Patel',
    serviceName: 'Bridal Complete',
    amount: 15000,
  },
  {
    id: 'cal-006',
    type: 'blocked',
    date: '2026-05-25',
    note: 'Personal break',
  },
  {
    id: 'cal-007',
    type: 'blocked',
    date: '2026-05-26',
    note: 'Personal break',
  },
  {
    id: 'cal-008',
    type: 'booking',
    date: '2026-05-28',
    startTime: '11:00 AM',
    endTime: '2:00 PM',
    customerName: 'Kavitha Nair',
    serviceName: 'Reception Look',
    amount: 8500,
  },
]

const TRANSACTIONS: Transaction[] = [
  {
    id: 'txn-001',
    type: 'booking_payout',
    description: 'Bridal Complete payout',
    amount: 12750,
    date: daysAgo(1),
    status: 'completed',
    bookingId: 'bk-015',
    customerName: 'Meera Krishnan',
  },
  {
    id: 'txn-002',
    type: 'tip',
    description: 'Tip received',
    amount: 1000,
    date: daysAgo(1),
    status: 'completed',
    bookingId: 'bk-015',
    customerName: 'Meera Krishnan',
  },
  {
    id: 'txn-003',
    type: 'booking_payout',
    description: 'Party Look payout',
    amount: 3825,
    date: daysAgo(3),
    status: 'completed',
    bookingId: 'bk-014',
    customerName: 'Divya Rao',
  },
  {
    id: 'txn-004',
    type: 'booking_payout',
    description: 'Engagement Look payout',
    amount: 5950,
    date: daysAgo(5),
    status: 'completed',
    bookingId: 'bk-013',
    customerName: 'Pooja Shetty',
  },
  {
    id: 'txn-005',
    type: 'referral_bonus',
    description: 'Referral bonus — Priya A. joined',
    amount: 500,
    date: daysAgo(6),
    status: 'completed',
  },
  {
    id: 'txn-006',
    type: 'booking_payout',
    description: 'South Indian Bridal payout',
    amount: 17000,
    date: daysAgo(8),
    status: 'completed',
    bookingId: 'bk-012',
    customerName: 'Rashmi Iyer',
  },
  {
    id: 'txn-007',
    type: 'tip',
    description: 'Tip received',
    amount: 500,
    date: daysAgo(8),
    status: 'completed',
    bookingId: 'bk-012',
    customerName: 'Rashmi Iyer',
  },
  {
    id: 'txn-008',
    type: 'booking_payout',
    description: 'Reception Look payout',
    amount: 7225,
    date: daysAgo(10),
    status: 'completed',
    bookingId: 'bk-011',
    customerName: 'Nandita Verma',
  },
  {
    id: 'txn-009',
    type: 'booking_payout',
    description: 'Everyday Look payout',
    amount: 2125,
    date: daysAgo(12),
    status: 'completed',
    bookingId: 'bk-010',
    customerName: 'Shruti Pillai',
  },
  {
    id: 'txn-010',
    type: 'booking_payout',
    description: 'Bridal Trial payout',
    amount: 4250,
    date: daysAgo(14),
    status: 'completed',
    bookingId: 'bk-009',
    customerName: 'Sonal Shah',
  },
  {
    id: 'txn-011',
    type: 'booking_payout',
    description: 'Party Look payout',
    amount: 3825,
    date: daysAgo(17),
    status: 'completed',
    bookingId: 'bk-008',
    customerName: 'Vidya Kumar',
  },
  {
    id: 'txn-012',
    type: 'assist_payment',
    description: 'Assist session — assistant fee',
    amount: 1500,
    date: daysAgo(19),
    status: 'completed',
  },
  {
    id: 'txn-013',
    type: 'booking_payout',
    description: 'Engagement Look payout',
    amount: 5950,
    date: daysAgo(22),
    status: 'completed',
    bookingId: 'bk-006',
    customerName: 'Lalitha Bhat',
  },
  {
    id: 'txn-014',
    type: 'booking_payout',
    description: 'South Indian Bridal payout',
    amount: 17000,
    date: daysAgo(26),
    status: 'processing',
    bookingId: 'bk-005',
    customerName: 'Aruna Nair',
  },
  {
    id: 'txn-015',
    type: 'booking_payout',
    description: 'Bridal Complete payout',
    amount: 12750,
    date: daysAgo(29),
    status: 'pending',
    bookingId: 'bk-004',
    customerName: 'Sarita Menon',
  },
]

const PAYOUT_RECORDS: PayoutRecord[] = [
  {
    id: 'pay-001',
    amount: 45800,
    bookingIds: ['bk-015', 'bk-014', 'bk-013', 'bk-012'],
    status: 'completed',
    bankReference: 'HDFC2026051200123',
    processedAt: daysAgo(2),
    createdAt: daysAgo(4),
  },
  {
    id: 'pay-002',
    amount: 32400,
    bookingIds: ['bk-011', 'bk-010', 'bk-009', 'bk-008'],
    status: 'completed',
    bankReference: 'HDFC2026050500456',
    processedAt: daysAgo(12),
    createdAt: daysAgo(14),
  },
  {
    id: 'pay-003',
    amount: 17000,
    bookingIds: ['bk-005'],
    status: 'processing',
    createdAt: daysAgo(3),
  },
  {
    id: 'pay-004',
    amount: 12750,
    bookingIds: ['bk-004'],
    status: 'pending',
    createdAt: daysAgo(1),
  },
]

// ── Helper Functions ──────────────────────────────────────────────────────────

export function getBookingRequests(): BookingRequest[] {
  return BOOKING_REQUESTS
}

export function getPendingRequests(): BookingRequest[] {
  return BOOKING_REQUESTS.filter((r) => r.status === 'pending')
}

export function getCalendarEvents(month: number, year: number): CalendarEvent[] {
  return CALENDAR_EVENTS.filter((e) => {
    const d = new Date(e.date)
    return d.getMonth() + 1 === month && d.getFullYear() === year
  })
}

export function getTransactions(): Transaction[] {
  return [...TRANSACTIONS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

export function getPayoutRecords(): PayoutRecord[] {
  return [...PAYOUT_RECORDS].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

export function getEarningsSummary(): {
  thisWeek: number
  thisMonth: number
  total: number
  pending: number
} {
  const completed = TRANSACTIONS.filter((t) => t.status === 'completed')
  const now = new Date(NOW)
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  const thisWeek = completed
    .filter((t) => new Date(t.date) >= weekAgo)
    .reduce((s, t) => s + t.amount, 0)

  const thisMonth = completed
    .filter((t) => new Date(t.date) >= monthStart)
    .reduce((s, t) => s + t.amount, 0)

  const total = completed.reduce((s, t) => s + t.amount, 0)

  const pending = TRANSACTIONS.filter(
    (t) => t.status === 'pending' || t.status === 'processing',
  ).reduce((s, t) => s + t.amount, 0)

  return { thisWeek, thisMonth, total, pending }
}

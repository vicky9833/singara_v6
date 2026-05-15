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

// ── Assist Types ─────────────────────────────────────────────────────────────

export interface AssistantProfile {
  id: string
  firstName: string
  lastName: string
  photoUrl: string | null
  area: string
  city: string
  experienceYears: number
  avgRating: number
  totalAssists: number
  ratePerSession: number
  skills: string[]
  isAvailable: boolean
  bio: string
  languages: string[]
}

export interface AssistRequest {
  id: string
  seniorArtistName: string
  serviceName: string
  date: string
  time: string
  location: string
  payAmount: number
  status: 'pending' | 'accepted' | 'completed'
  scope: string
}

// ── Assist Mock Data ──────────────────────────────────────────────────────────

const ASSISTANT_PROFILES: AssistantProfile[] = [
  {
    id: 'ast-001',
    firstName: 'Ananya',
    lastName: 'Rao',
    photoUrl: null,
    area: 'Koramangala',
    city: 'Bangalore',
    experienceYears: 2,
    avgRating: 4.5,
    totalAssists: 18,
    ratePerSession: 1200,
    skills: ['Hair styling', 'Skin prep', 'Touch-ups'],
    isAvailable: true,
    bio: 'Passionate about bridal artistry — I have been assisting senior artists for two years and am building my expertise in South Indian bridal looks and hair styling.',
    languages: ['English', 'Kannada', 'Hindi'],
  },
  {
    id: 'ast-002',
    firstName: 'Deepa',
    lastName: 'Kumar',
    photoUrl: null,
    area: 'Whitefield',
    city: 'Bangalore',
    experienceYears: 1,
    avgRating: 4.3,
    totalAssists: 8,
    ratePerSession: 800,
    skills: ['Draping', 'Photography assist'],
    isAvailable: true,
    bio: 'Recently graduated from the VLCC Makeup Academy. I bring fresh techniques, a keen eye for detail, and genuine enthusiasm for every booking I assist on.',
    languages: ['English', 'Hindi'],
  },
  {
    id: 'ast-003',
    firstName: 'Sakshi',
    lastName: 'Jain',
    photoUrl: null,
    area: 'HSR Layout',
    city: 'Bangalore',
    experienceYears: 3,
    avgRating: 4.7,
    totalAssists: 32,
    ratePerSession: 1500,
    skills: ['Hair styling', 'Mehendi', 'Skin prep', 'Touch-ups'],
    isAvailable: false,
    bio: 'Experienced freelance makeup artist transitioning into assisted work. With three years across weddings, events, and editorial shoots, I am reliable and efficient under pressure.',
    languages: ['English', 'Hindi', 'Marathi'],
  },
  {
    id: 'ast-004',
    firstName: 'Pooja',
    lastName: 'Hegde',
    photoUrl: null,
    area: 'Jayanagar',
    city: 'Bangalore',
    experienceYears: 1,
    avgRating: 4.4,
    totalAssists: 14,
    ratePerSession: 1000,
    skills: ['Draping', 'Skin prep'],
    isAvailable: true,
    bio: 'Specializing in South Indian bridal assists. I understand the nuances of silk saree draping and traditional bridal prep, making me an ideal support for senior bridal artists.',
    languages: ['English', 'Kannada', 'Telugu'],
  },
  {
    id: 'ast-005',
    firstName: 'Nisha',
    lastName: 'Fernandes',
    photoUrl: null,
    area: 'Indiranagar',
    city: 'Bangalore',
    experienceYears: 2,
    avgRating: 4.6,
    totalAssists: 22,
    ratePerSession: 1300,
    skills: ['Hair styling', 'Touch-ups', 'Photography assist'],
    isAvailable: true,
    bio: 'My background in editorial and fashion shoots means I work quickly without sacrificing quality. I am comfortable on high-pressure sets and collaborative by nature.',
    languages: ['English', 'Hindi', 'Konkani'],
  },
]

const ASSIST_REQUESTS: AssistRequest[] = [
  {
    id: 'areq-001',
    seniorArtistName: 'Meera Reddy',
    serviceName: 'South Indian Bridal',
    date: '2026-05-24',
    time: '8:00 AM',
    location: 'Malleshwaram',
    payAmount: 1500,
    status: 'pending',
    scope: 'Hair styling and draping support for bridal party of 4',
  },
  {
    id: 'areq-002',
    seniorArtistName: 'Priya Agarwal',
    serviceName: 'Bridal Complete',
    date: '2026-05-26',
    time: '9:00 AM',
    location: 'Jayanagar',
    payAmount: 1200,
    status: 'accepted',
    scope: 'Skin prep and touch-ups during ceremony',
  },
  {
    id: 'areq-003',
    seniorArtistName: 'Rashmi Joshi',
    serviceName: 'Editorial Shoot',
    date: '2026-05-18',
    time: '2:00 PM',
    location: 'JP Nagar',
    payAmount: 1000,
    status: 'completed',
    scope: 'Lighting and product management',
  },
]

// ── Helper Functions ──────────────────────────────────────────────────────────

export function getAvailableAssistants(): AssistantProfile[] {
  return ASSISTANT_PROFILES
}

export function searchAssistants(query: string): AssistantProfile[] {
  const q = query.toLowerCase()
  return ASSISTANT_PROFILES.filter(
    (a) =>
      `${a.firstName} ${a.lastName}`.toLowerCase().includes(q) ||
      a.skills.some((s) => s.toLowerCase().includes(q)) ||
      a.area.toLowerCase().includes(q),
  )
}

export function getAssistRequests(): AssistRequest[] {
  return ASSIST_REQUESTS
}

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

// ── Chat Types ────────────────────────────────────────────────────────────────

export interface ChatConversation {
  id: string
  bookingId: string
  otherPartyName: string
  otherPartyPhotoUrl: string | null
  otherPartyInitials: string
  lastMessage: string
  lastMessageTime: string // ISO datetime
  unreadCount: number
  isArtist: boolean // true if other party is artist (customer view), false for customer (artist view)
}

export interface ChatMessage {
  id: string
  conversationId: string
  senderId: string
  senderRole: 'customer' | 'artist'
  type: 'text' | 'image' | 'system'
  content: string
  timestamp: string // ISO datetime
  isRead: boolean
}

// ── Chat Mock Data ────────────────────────────────────────────────────────────

const CUSTOMER_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'conv-001',
    bookingId: 'SNG-874755',
    otherPartyName: 'Meera Reddy',
    otherPartyPhotoUrl: null,
    otherPartyInitials: 'MR',
    lastMessage: "I'll bring the premium bridal kit. See you tomorrow!",
    lastMessageTime: hoursAgo(2),
    unreadCount: 0,
    isArtist: true,
  },
  {
    id: 'conv-002',
    bookingId: 'SNG-302783',
    otherPartyName: 'Kavitha Nair',
    otherPartyPhotoUrl: null,
    otherPartyInitials: 'KN',
    lastMessage: 'Can you share some reference photos for the look you want?',
    lastMessageTime: daysAgo(1),
    unreadCount: 1,
    isArtist: true,
  },
  {
    id: 'conv-003',
    bookingId: '',
    otherPartyName: 'Priya Agarwal',
    otherPartyPhotoUrl: null,
    otherPartyInitials: 'PA',
    lastMessage: 'Hi! I saw your portfolio and loved the South Indian bridal looks',
    lastMessageTime: daysAgo(3),
    unreadCount: 0,
    isArtist: true,
  },
]

const ARTIST_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'conv-001',
    bookingId: 'SNG-874755',
    otherPartyName: 'Priya Sharma',
    otherPartyPhotoUrl: null,
    otherPartyInitials: 'PS',
    lastMessage: "I'll bring the premium bridal kit. See you tomorrow!",
    lastMessageTime: hoursAgo(2),
    unreadCount: 0,
    isArtist: false,
  },
  {
    id: 'conv-002',
    bookingId: 'SNG-302783',
    otherPartyName: 'Riya Mehta',
    otherPartyPhotoUrl: null,
    otherPartyInitials: 'RM',
    lastMessage: 'Can you share some reference photos for the look you want?',
    lastMessageTime: daysAgo(1),
    unreadCount: 1,
    isArtist: false,
  },
  {
    id: 'conv-003',
    bookingId: '',
    otherPartyName: 'Sunitha Rao',
    otherPartyPhotoUrl: null,
    otherPartyInitials: 'SR',
    lastMessage: 'Hi! I saw your portfolio and loved the South Indian bridal looks',
    lastMessageTime: daysAgo(3),
    unreadCount: 0,
    isArtist: false,
  },
]

const CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  'conv-001': [
    {
      id: 'msg-001',
      conversationId: 'conv-001',
      senderId: 'system',
      senderRole: 'customer',
      type: 'system',
      content: 'Booking confirmed — South Indian Bridal, May 14',
      timestamp: hoursAgo(26),
      isRead: true,
    },
    {
      id: 'msg-002',
      conversationId: 'conv-001',
      senderId: 'cust-001',
      senderRole: 'customer',
      type: 'text',
      content: 'Hi Meera! Looking forward to the appointment',
      timestamp: hoursAgo(25),
      isRead: true,
    },
    {
      id: 'msg-003',
      conversationId: 'conv-001',
      senderId: 'artist-001',
      senderRole: 'artist',
      type: 'text',
      content: "Hello! Me too. Could you share some reference photos of the look you're going for?",
      timestamp: hoursAgo(24.5),
      isRead: true,
    },
    {
      id: 'msg-004',
      conversationId: 'conv-001',
      senderId: 'cust-001',
      senderRole: 'customer',
      type: 'text',
      content: 'Sure! I love the classic South Indian bridal look with gold eyes and red lips',
      timestamp: hoursAgo(24),
      isRead: true,
    },
    {
      id: 'msg-005',
      conversationId: 'conv-001',
      senderId: 'artist-001',
      senderRole: 'artist',
      type: 'text',
      content: "That's my specialty! Do you have any allergies to specific makeup products?",
      timestamp: hoursAgo(23.5),
      isRead: true,
    },
    {
      id: 'msg-006',
      conversationId: 'conv-001',
      senderId: 'cust-001',
      senderRole: 'customer',
      type: 'text',
      content: 'No allergies. I prefer cruelty-free products if possible',
      timestamp: hoursAgo(23),
      isRead: true,
    },
    {
      id: 'msg-007',
      conversationId: 'conv-001',
      senderId: 'artist-001',
      senderRole: 'artist',
      type: 'text',
      content: "Absolutely. I use Forest Essentials and Kama Ayurveda for base products. They're all cruelty-free",
      timestamp: hoursAgo(22.5),
      isRead: true,
    },
    {
      id: 'msg-008',
      conversationId: 'conv-001',
      senderId: 'cust-001',
      senderRole: 'customer',
      type: 'text',
      content: 'Perfect! One more thing — my mom and sister also need light makeup. Can we add that?',
      timestamp: hoursAgo(22),
      isRead: true,
    },
    {
      id: 'msg-009',
      conversationId: 'conv-001',
      senderId: 'artist-001',
      senderRole: 'artist',
      type: 'text',
      content: "Of course! I can add party looks for them. I'll update the booking with additional services",
      timestamp: hoursAgo(21.5),
      isRead: true,
    },
    {
      id: 'msg-010',
      conversationId: 'conv-001',
      senderId: 'system',
      senderRole: 'customer',
      type: 'system',
      content: 'Booking updated — 2 additional party looks added',
      timestamp: hoursAgo(21),
      isRead: true,
    },
    {
      id: 'msg-011',
      conversationId: 'conv-001',
      senderId: 'cust-001',
      senderRole: 'customer',
      type: 'text',
      content: 'Great, thank you!',
      timestamp: hoursAgo(4),
      isRead: true,
    },
    {
      id: 'msg-012',
      conversationId: 'conv-001',
      senderId: 'artist-001',
      senderRole: 'artist',
      type: 'text',
      content: "I'll bring the premium bridal kit. See you tomorrow!",
      timestamp: hoursAgo(2),
      isRead: true,
    },
  ],
  'conv-002': [
    {
      id: 'msg-c2-001',
      conversationId: 'conv-002',
      senderId: 'cust-001',
      senderRole: 'customer',
      type: 'text',
      content: 'Hi Kavitha, just confirmed the booking for the reception',
      timestamp: daysAgo(2),
      isRead: true,
    },
    {
      id: 'msg-c2-002',
      conversationId: 'conv-002',
      senderId: 'artist-002',
      senderRole: 'artist',
      type: 'text',
      content: 'So excited for this! Do you have a dress colour in mind?',
      timestamp: hoursAgo(36),
      isRead: true,
    },
    {
      id: 'msg-c2-003',
      conversationId: 'conv-002',
      senderId: 'cust-001',
      senderRole: 'customer',
      type: 'text',
      content: 'Royal blue silk saree',
      timestamp: hoursAgo(30),
      isRead: true,
    },
    {
      id: 'msg-c2-004',
      conversationId: 'conv-002',
      senderId: 'artist-002',
      senderRole: 'artist',
      type: 'text',
      content: 'Perfect! That will look stunning with a golden eye look and nude lips',
      timestamp: hoursAgo(26),
      isRead: true,
    },
    {
      id: 'msg-c2-005',
      conversationId: 'conv-002',
      senderId: 'artist-002',
      senderRole: 'artist',
      type: 'text',
      content: 'Can you share some reference photos for the look you want?',
      timestamp: daysAgo(1),
      isRead: false,
    },
  ],
  'conv-003': [
    {
      id: 'msg-c3-001',
      conversationId: 'conv-003',
      senderId: 'cust-001',
      senderRole: 'customer',
      type: 'text',
      content: 'Hi! I saw your portfolio and loved the South Indian bridal looks',
      timestamp: daysAgo(3),
      isRead: true,
    },
    {
      id: 'msg-c3-002',
      conversationId: 'conv-003',
      senderId: 'artist-003',
      senderRole: 'artist',
      type: 'text',
      content: 'Thank you so much! I specialise in exactly that. When is your occasion?',
      timestamp: hoursAgo(60),
      isRead: true,
    },
    {
      id: 'msg-c3-003',
      conversationId: 'conv-003',
      senderId: 'cust-001',
      senderRole: 'customer',
      type: 'text',
      content: "It's in July. Still in the planning stage",
      timestamp: daysAgo(2),
      isRead: true,
    },
  ],
}

// ── Chat Helper Functions ─────────────────────────────────────────────────────

export function getCustomerConversations(): ChatConversation[] {
  return CUSTOMER_CONVERSATIONS
}

export function getArtistConversations(): ChatConversation[] {
  return ARTIST_CONVERSATIONS
}

export function getMessages(conversationId: string): ChatMessage[] {
  return CHAT_MESSAGES[conversationId] ?? []
}

export function getConversationByBookingId(bookingId: string): ChatConversation | undefined {
  return CUSTOMER_CONVERSATIONS.find((c) => c.bookingId === bookingId)
}

export function getCustomerConversationById(id: string): ChatConversation | undefined {
  return CUSTOMER_CONVERSATIONS.find((c) => c.id === id)
}

export function getArtistConversationById(id: string): ChatConversation | undefined {
  return ARTIST_CONVERSATIONS.find((c) => c.id === id)
}

// ── Dispute model ─────────────────────────────────────────────────────────────

export interface Dispute {
  id: string
  reportedBy: 'customer' | 'artist'
  reporterName: string
  otherPartyName: string
  bookingId: string
  type: string
  description: string
  status: 'open' | 'under_review' | 'resolved'
  resolution?: string
  createdAt: string
  resolvedAt?: string
}

const MOCK_DISPUTES: Dispute[] = [
  {
    id: 'disp-001',
    reportedBy: 'customer',
    reporterName: 'Aisha Patel',
    otherPartyName: 'Meera Reddy',
    bookingId: 'SNG-874755',
    type: 'Artist was late or didn\'t show up',
    description: 'The artist arrived 45 minutes late without prior notice. The event started before she arrived and we had to manage without her.',
    status: 'open',
    createdAt: daysAgo(1),
  },
  {
    id: 'disp-002',
    reportedBy: 'artist',
    reporterName: 'Sneha Kapoor',
    otherPartyName: 'Ritu Agarwal',
    bookingId: 'SNG-302783',
    type: 'Customer no-show',
    description: 'Customer did not show up or respond to calls. I traveled to the location and waited for 1 hour.',
    status: 'resolved',
    resolution: 'Full payout released to artist',
    createdAt: daysAgo(7),
    resolvedAt: daysAgo(5),
  },
]

export function getDisputes(): Dispute[] {
  return MOCK_DISPUTES
}

export function getDisputeById(id: string): Dispute | undefined {
  return MOCK_DISPUTES.find((d) => d.id === id)
}

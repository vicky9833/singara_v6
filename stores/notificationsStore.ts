import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface StoredNotification {
  id: string
  type: 'booking' | 'reminder' | 'artist' | 'review' | 'welcome' | 'system'
  title: string
  body: string
  isRead: boolean
  createdAt: string
  actionUrl?: string
}

interface NotificationsStore {
  notifications: StoredNotification[]
  unreadCount: number
  hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
}

const INITIAL_NOTIFICATIONS: StoredNotification[] = [
  {
    id: 'notif-001',
    type: 'booking',
    title: 'Booking confirmed',
    body: 'Your appointment with Priya Sharma has been confirmed for June 14.',
    isRead: false,
    createdAt: '2026-05-15T09:58:00.000Z',
    actionUrl: '/c/bookings',
  },
  {
    id: 'notif-002',
    type: 'reminder',
    title: 'Reminder: Appointment tomorrow',
    body: 'Your bridal makeup session with Ananya Krishnamurthy is at 10:00 AM tomorrow.',
    isRead: false,
    createdAt: '2026-05-15T09:00:00.000Z',
    actionUrl: '/c/bookings',
  },
  {
    id: 'notif-003',
    type: 'artist',
    title: 'New artist in your area',
    body: 'Meena Iyer just joined Singara in Indiranagar. View her portfolio.',
    isRead: true,
    createdAt: '2026-05-15T07:00:00.000Z',
    actionUrl: '/c/explore',
  },
  {
    id: 'notif-004',
    type: 'review',
    title: 'Leave a review',
    body: 'How was your session with Lakshmi Devi? Share your experience with the community.',
    isRead: true,
    createdAt: '2026-05-14T10:00:00.000Z',
    actionUrl: '/c/bookings',
  },
  {
    id: 'notif-005',
    type: 'system',
    title: 'Singara Stories: Navratri looks',
    body: 'Discover the most stunning festive beauty trends curated by our top artists.',
    isRead: true,
    createdAt: '2026-05-13T10:00:00.000Z',
  },
]

export const useNotificationsStore = create<NotificationsStore>()(
  persist(
    (set) => ({
      notifications: INITIAL_NOTIFICATIONS,
      unreadCount: INITIAL_NOTIFICATIONS.filter((n) => !n.isRead).length,
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
      markAsRead: (id) =>
        set((s) => {
          const notifications = s.notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n,
          )
          return {
            notifications,
            unreadCount: notifications.filter((n) => !n.isRead).length,
          }
        }),
      markAllAsRead: () =>
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, isRead: true })),
          unreadCount: 0,
        })),
    }),
    {
      name: 'singara-notifications',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true)
          // Recompute unreadCount after rehydration
          state.unreadCount = state.notifications.filter((n) => !n.isRead).length
        }
      },
    },
  ),
)

'use client'

import { useRouter } from 'next/navigation'
import { CalendarCheck, Clock, UserPlus, Star, Sparkles, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

interface NotificationItem {
  id: string
  icon: React.ElementType
  iconColor: string
  iconBg: string
  title: string
  body: string
  time: string
  unread: boolean
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    icon: CalendarCheck,
    iconColor: 'var(--color-tulsi)',
    iconBg: 'rgba(74, 124, 89, 0.10)',
    title: 'Booking confirmed',
    body: 'Your appointment with Priya Sharma has been confirmed for June 14.',
    time: '2 min ago',
    unread: true,
  },
  {
    id: '2',
    icon: Clock,
    iconColor: 'var(--color-marigold)',
    iconBg: 'rgba(232, 163, 61, 0.10)',
    title: 'Reminder: Appointment tomorrow',
    body: 'Your bridal makeup session with Ananya Krishnamurthy is at 10:00 AM tomorrow.',
    time: '1 hr ago',
    unread: true,
  },
  {
    id: '3',
    icon: UserPlus,
    iconColor: 'var(--color-emerald-jhoola)',
    iconBg: 'rgba(15, 95, 76, 0.08)',
    title: 'New artist in your area',
    body: 'Meena Iyer just joined Singara in Indiranagar. View her portfolio.',
    time: '3 hr ago',
    unread: false,
  },
  {
    id: '4',
    icon: Star,
    iconColor: 'var(--color-marigold)',
    iconBg: 'rgba(232, 163, 61, 0.10)',
    title: 'Leave a review',
    body: 'How was your session with Lakshmi Devi? Share your experience with the community.',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: '5',
    icon: Sparkles,
    iconColor: 'var(--color-heritage-gold)',
    iconBg: 'rgba(201, 169, 97, 0.12)',
    title: 'Singara Stories: Navratri looks',
    body: 'Discover the most stunning festive beauty trends curated by our top artists.',
    time: '2 days ago',
    unread: false,
  },
]

export default function NotificationsPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-[100dvh] bg-sandstone" style={{ paddingBottom: 32 }}>
      {/* Header */}
      <div
        className="px-4 pt-4 pb-3 border-b border-dune bg-sandstone flex items-center justify-between"
        style={{ paddingTop: 'max(16px, env(safe-area-inset-top))' }}
      >
        <button type="button" onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center -ml-2">
          <ArrowLeft size={22} strokeWidth={1.5} className="text-ink" />
        </button>
        <p className="font-heading text-ink flex-1 ml-1" style={{ fontSize: 20, fontWeight: 400 }}>
          Notifications
        </p>
        <button
          type="button"
          className="font-sans mb-0.5"
          style={{ fontSize: 13, color: 'var(--color-emerald-jhoola)' }}
        >
          Mark all as read
        </button>
      </div>

      <motion.div
        className="flex-1 overflow-y-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      >
        {NOTIFICATIONS.map((notif) => {
          const Icon = notif.icon
          return (
            <div
              key={notif.id}
              className="flex items-start gap-3 px-6 py-4"
              style={{
                backgroundColor: notif.unread ? 'var(--color-mist-warm)' : 'var(--color-alabaster)',
                borderBottom: '1px solid var(--color-dune)',
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: notif.iconBg }}
              >
                <Icon size={18} strokeWidth={1.5} style={{ color: notif.iconColor }} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-sans font-semibold text-ink leading-tight" style={{ fontSize: 14 }}>
                    {notif.title}
                  </p>
                  <p className="font-sans flex-shrink-0" style={{ fontSize: 11, color: 'var(--color-silver-sand)', marginTop: 1 }}>
                    {notif.time}
                  </p>
                </div>
                <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 13, lineHeight: 1.5 }}>
                  {notif.body}
                </p>
              </div>

              {/* Unread dot */}
              {notif.unread && (
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                  style={{ backgroundColor: 'var(--color-emerald-jhoola)' }}
                />
              )}
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

'use client'

import { useRouter } from 'next/navigation'
import { CalendarCheck, Clock, UserPlus, Star, Sparkles, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNotificationsStore, type StoredNotification } from '@/stores/notificationsStore'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

type IconConfig = { icon: React.ElementType; iconColor: string; iconBg: string }

const TYPE_META: Record<StoredNotification['type'], IconConfig> = {
  booking: {
    icon: CalendarCheck,
    iconColor: 'var(--color-tulsi)',
    iconBg: 'rgba(74, 124, 89, 0.10)',
  },
  reminder: {
    icon: Clock,
    iconColor: 'var(--color-marigold)',
    iconBg: 'rgba(232, 163, 61, 0.10)',
  },
  artist: {
    icon: UserPlus,
    iconColor: 'var(--color-emerald-jhoola)',
    iconBg: 'rgba(15, 95, 76, 0.08)',
  },
  review: {
    icon: Star,
    iconColor: 'var(--color-marigold)',
    iconBg: 'rgba(232, 163, 61, 0.10)',
  },
  welcome: {
    icon: Sparkles,
    iconColor: 'var(--color-heritage-gold)',
    iconBg: 'rgba(201, 169, 97, 0.12)',
  },
  system: {
    icon: Sparkles,
    iconColor: 'var(--color-heritage-gold)',
    iconBg: 'rgba(201, 169, 97, 0.12)',
  },
}

function formatTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs} hr ago`
  const days = Math.floor(hrs / 24)
  if (days === 1) return 'Yesterday'
  return `${days} days ago`
}

export default function NotificationsPage() {
  const router = useRouter()
  const notifications = useNotificationsStore((s) => s.notifications)
  const markAsRead = useNotificationsStore((s) => s.markAsRead)
  const markAllAsRead = useNotificationsStore((s) => s.markAllAsRead)

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
          onClick={markAllAsRead}
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
        transition={{ duration: 0.32, ease: LUXURY, delay: 0.08 }}
      >
        {notifications.map((notif) => {
          const meta = TYPE_META[notif.type] ?? TYPE_META.system
          const Icon = meta.icon
          return (
            <button
              key={notif.id}
              type="button"
              className="w-full flex items-start gap-3 px-6 py-4 text-left transition-colors duration-[220ms] active:opacity-80"
              style={{
                backgroundColor: !notif.isRead ? 'var(--color-mist-warm)' : 'var(--color-alabaster)',
                borderBottom: '1px solid var(--color-dune)',
              }}
              onClick={() => {
                markAsRead(notif.id)
                if (notif.actionUrl) router.push(notif.actionUrl)
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: meta.iconBg }}
              >
                <Icon size={18} strokeWidth={1.5} style={{ color: meta.iconColor }} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-sans font-semibold text-ink leading-tight" style={{ fontSize: 14 }}>
                    {notif.title}
                  </p>
                  <p className="font-sans flex-shrink-0" style={{ fontSize: 11, color: 'var(--color-silver-sand)', marginTop: 1 }}>
                    {formatTime(notif.createdAt)}
                  </p>
                </div>
                <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 13, lineHeight: 1.5 }}>
                  {notif.body}
                </p>
              </div>

              {/* Unread dot */}
              {!notif.isRead && (
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                  style={{ backgroundColor: 'var(--color-emerald-jhoola)' }}
                />
              )}
            </button>
          )
        })}
      </motion.div>
    </div>
  )
}

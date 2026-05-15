'use client'

import { useRouter } from 'next/navigation'
import {
  User,
  Lock,
  Sparkles,
  Gift,
  CreditCard,
  MapPin,
  Languages,
  Bell,
  HelpCircle,
  Info,
  Settings,
  ChevronRight,
  MessageSquare,
} from 'lucide-react'
import { useProfileSetupStore } from '@/stores/profileSetupStore'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useBookingsStore } from '@/stores/bookingsStore'
import { useNotificationsStore } from '@/stores/notificationsStore'
import { getCustomerConversations } from '@/lib/mock-artist-data'
import { motion } from 'framer-motion'

type MenuItem = {
  icon: React.ElementType
  label: string
  subtitle?: string
  href: string
  badge?: number
}

const GROUPS: { title: string; items: MenuItem[] }[] = [
  {
    title: 'My Singara',
    items: [
      { icon: MessageSquare, label: 'Messages', href: '/c/chat' },
      { icon: Lock, label: 'The Vault', subtitle: 'Your private beauty history', href: '/c/profile/vault' },
      { icon: Sparkles, label: 'Singara Glow', subtitle: 'AI beauty recommendations', href: '/c/glow' },
      { icon: Gift, label: 'Refer a friend', subtitle: 'Earn ₹200 per referral', href: '/c/profile/refer' },
    ],
  },
  {
    title: 'Account',
    items: [
      { icon: CreditCard, label: 'Payment methods', href: '/c/profile/payments' },
      { icon: MapPin, label: 'Saved addresses', href: '/c/profile/addresses' },
      { icon: Languages, label: 'Language preference', href: '/c/profile/language' },
      { icon: Bell, label: 'Notification settings', href: '/c/profile/notifications' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: HelpCircle, label: 'Help & support', href: '/c/profile/help' },
      { icon: Info, label: 'About Singara', href: '/c/profile/about' },
    ],
  },
  {
    title: 'Settings',
    items: [
      { icon: Settings, label: 'Settings', href: '/c/profile/settings' },
    ],
  },
]

export default function ProfilePage() {
  const router = useRouter()
  const hasHydrated = useProfileSetupStore((s) => s.hasHydrated)
  const firstName = useProfileSetupStore((s) => s.firstName)
  const photoUrl = useProfileSetupStore((s) => s.photoUrl)
  const city = useProfileSetupStore((s) => s.city)
  const favHydrated = useFavoritesStore((s) => s.hasHydrated)
  const favoriteIds = useFavoritesStore((s) => s.favoriteArtistIds)
  const bookHydrated = useBookingsStore((s) => s.hasHydrated)
  const bookings = useBookingsStore((s) => s.bookings)

  const formatName = (name: string) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  const displayName = hasHydrated && firstName ? formatName(firstName) : 'Guest'
  const displayCity = hasHydrated && city ? city : 'Bangalore'
  const favCount = favHydrated ? favoriteIds.length : 0
  const bookCount = bookHydrated ? bookings.length : 0

  const chatUnreadCount = getCustomerConversations().reduce(
    (sum, c) => sum + c.unreadCount,
    0,
  )

  // Inject badge count for Messages item
  const groupsWithBadge = GROUPS.map((group) => ({
    ...group,
    items: group.items.map((item) =>
      item.href === '/c/chat'
        ? { ...item, badge: chatUnreadCount > 0 ? chatUnreadCount : undefined }
        : item,
    ),
  }))

  return (
    <motion.div
      className="flex flex-col min-h-[100dvh]"
      style={{ paddingBottom: 96 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
    >
      {/* ── Header spacer ── */}
      <div style={{ paddingTop: 'max(env(safe-area-inset-top), 20px)' }} />

      {/* ── Profile header ── */}
      <div className="flex flex-col items-center px-6 pt-4">
        {/* Photo */}
        <div
          className="w-[72px] h-[72px] rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'var(--color-dune)' }}
        >
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User size={32} strokeWidth={1.5} style={{ color: 'var(--color-ash-warm)' }} />
          )}
        </div>

        {/* Name */}
        <p className="font-heading text-ink mt-3" style={{ fontSize: 22 }}>
          {displayName}
        </p>

        {/* City */}
        <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 14 }}>
          {displayCity}
        </p>

        {/* Edit link */}
        <button
          type="button"
          onClick={() => router.push('/c/profile/edit')}
          className="mt-2 font-sans transition-opacity duration-[220ms] active:opacity-60"
          style={{ fontSize: 13, color: 'var(--color-emerald-jhoola)' }}
        >
          Edit profile
        </button>
      </div>

      {/* ── Stats row ── */}
      <div
        className="mx-6 mt-6 bg-alabaster border border-dune flex items-stretch"
        style={{ borderRadius: 16 }}
      >
        {[
          { value: bookCount, label: 'bookings' },
          { value: favCount, label: 'saved' },
          { value: '2026', label: 'member since' },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center justify-center py-4"
            style={{
              borderRight: i < 2 ? '1px solid var(--color-dune)' : 'none',
            }}
          >
            <span className="font-sans font-semibold text-ink" style={{ fontSize: 16 }}>
              {stat.value}
            </span>
            <span className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 12 }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Menu groups ── */}
      <div className="px-6 mt-6 space-y-4">
        {groupsWithBadge.map((group) => (
          <div key={group.title}>
            <p
              className="font-sans text-ash-warm mb-2 px-1"
              style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px' }}
            >
              {group.title}
            </p>
            <div
              className="bg-alabaster border border-dune overflow-hidden"
              style={{ borderRadius: 16 }}
            >
              {group.items.map((item, idx) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => router.push(item.href)}
                    className="w-full h-14 flex items-center px-4 gap-3 text-left transition-colors duration-[220ms] active:bg-mist-warm"
                    style={{
                      borderTop: idx > 0 ? '1px solid var(--color-dune)' : 'none',
                    }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.5}
                      style={{ color: 'var(--color-ash-warm)', flexShrink: 0 }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-ink" style={{ fontSize: 14 }}>
                        {item.label}
                      </p>
                      {item.subtitle && (
                        <p className="font-sans text-ash-warm" style={{ fontSize: 12 }}>
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'var(--color-emerald-jhoola)' }}
                      >
                        <span className="font-sans font-semibold text-white" style={{ fontSize: 11 }}>
                          {item.badge}
                        </span>
                      </div>
                    )}
                    <ChevronRight
                      size={16}
                      strokeWidth={1.5}
                      style={{ color: 'var(--color-silver-sand)', flexShrink: 0 }}
                    />
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}


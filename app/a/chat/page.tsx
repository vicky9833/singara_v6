'use client'

import { useRouter } from 'next/navigation'
import { MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { getArtistConversations, type ChatConversation } from '@/lib/mock-artist-data'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

function ConversationRow({ conv }: { conv: ChatConversation }) {
  const router = useRouter()
  const hasUnread = conv.unreadCount > 0

  return (
    <button
      type="button"
      onClick={() => router.push(`/a/chat/${conv.id}`)}
      className="w-full flex items-center px-6 transition-colors duration-[220ms] active:bg-mist-warm"
      style={{ height: 72, borderBottom: '1px solid var(--color-dune)' }}
    >
      {/* Avatar */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
        style={{ backgroundColor: 'var(--color-dune)' }}
      >
        {conv.otherPartyPhotoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={conv.otherPartyPhotoUrl}
            alt={conv.otherPartyName}
            className="w-full h-full object-cover"
          />
        ) : (
          <span
            className="font-sans font-semibold"
            style={{ fontSize: 16, color: 'var(--color-ash-warm)' }}
          >
            {conv.otherPartyInitials}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 ml-3">
        {/* Top row: name + time */}
        <div className="flex items-center justify-between gap-2">
          <p
            className="font-sans truncate"
            style={{
              fontSize: 15,
              fontWeight: hasUnread ? 700 : 600,
              color: 'var(--color-ink)',
            }}
          >
            {conv.otherPartyName}
          </p>
          <p
            className="font-sans flex-shrink-0"
            style={{ fontSize: 11, color: 'var(--color-silver-sand)' }}
          >
            {timeAgo(conv.lastMessageTime)}
          </p>
        </div>

        {/* Bottom row: preview */}
        <p
          className="font-sans truncate mt-0.5"
          style={{
            fontSize: 13,
            color: hasUnread ? 'var(--color-ink)' : 'var(--color-ash-warm)',
            maxWidth: 'calc(100% - 32px)',
          }}
        >
          {conv.lastMessage}
        </p>
      </div>

      {/* Unread badge */}
      {hasUnread && (
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ml-2"
          style={{ backgroundColor: 'var(--color-emerald-jhoola)' }}
        >
          <span
            className="font-sans font-semibold text-white"
            style={{ fontSize: 11 }}
          >
            {conv.unreadCount}
          </span>
        </div>
      )}
    </button>
  )
}

const CONVERSATIONS = getArtistConversations()

export default function ArtistChatListPage() {
  return (
    <div
      className="flex flex-col min-h-[100dvh] bg-sandstone"
      style={{ paddingBottom: 96 }}
    >
      {/* Header */}
      <div
        className="px-6 border-b border-dune bg-sandstone"
        style={{
          paddingTop: 'max(20px, env(safe-area-inset-top))',
          paddingBottom: 16,
        }}
      >
        <p className="font-heading text-ink" style={{ fontSize: 22, fontWeight: 400 }}>
          Messages
        </p>
      </div>

      {CONVERSATIONS.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-3 py-16">
          <MessageSquare
            size={48}
            strokeWidth={1.5}
            style={{ color: 'var(--color-dune)' }}
          />
          <p className="font-heading text-ink text-center" style={{ fontSize: 18 }}>
            No messages yet
          </p>
          <p
            className="font-sans text-ash-warm text-center"
            style={{ fontSize: 14 }}
          >
            Accepted requests will appear here
          </p>
        </div>
      ) : (
        <motion.div
          className="flex-1 overflow-y-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: LUXURY, delay: 0.08 }}
        >
          {CONVERSATIONS.map((conv) => (
            <ConversationRow key={conv.id} conv={conv} />
          ))}
        </motion.div>
      )}
    </div>
  )
}

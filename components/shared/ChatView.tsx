'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Phone,
  MoreVertical,
  Paperclip,
  Send,
  CalendarCheck,
  Images,
  Check,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getMessages, type ChatMessage } from '@/lib/mock-artist-data'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

export interface ChatViewProps {
  conversationId: string
  perspective: 'customer' | 'artist'
  otherPartyName: string
  otherPartyInitials: string
  otherPartyPhotoUrl?: string | null
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  const h = d.getHours()
  const m = d.getMinutes()
  const period = h >= 12 ? 'PM' : 'AM'
  const displayH = h % 12 || 12
  return `${displayH}:${m.toString().padStart(2, '0')} ${period}`
}

function getDateLabel(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today.getTime() - 86400000)
  const msgDay = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  if (msgDay.getTime() === today.getTime()) return 'Today'
  if (msgDay.getTime() === yesterday.getTime()) return 'Yesterday'
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function ChatView({
  conversationId,
  perspective,
  otherPartyName,
  otherPartyInitials,
  otherPartyPhotoUrl,
}: ChatViewProps) {
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    getMessages(conversationId),
  )
  const [input, setInput] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on mount and when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const handleSend = useCallback(() => {
    const text = input.trim()
    if (!text) return

    const newMsg: ChatMessage = {
      id: `msg-local-${Date.now()}`,
      conversationId,
      senderId: 'current-user',
      senderRole: perspective,
      type: 'text',
      content: text,
      timestamp: new Date().toISOString(),
      isRead: false,
    }

    setMessages((prev) => [...prev, newMsg])
    setInput('')
  }, [input, conversationId, perspective])

  // Group messages by date
  const grouped: { dateLabel: string; messages: ChatMessage[] }[] = []
  let currentDate = ''
  for (const msg of messages) {
    const label = getDateLabel(msg.timestamp)
    if (label !== currentDate) {
      currentDate = label
      grouped.push({ dateLabel: label, messages: [msg] })
    } else {
      grouped[grouped.length - 1].messages.push(msg)
    }
  }

  const isMine = (msg: ChatMessage) => msg.senderRole === perspective

  return (
    <div className="relative flex flex-col h-[100dvh] overflow-hidden">
      {/* ── Header ── */}
      <div
        className="flex-shrink-0 flex items-center gap-1 px-1 border-b border-dune bg-alabaster z-10"
        style={{
          paddingTop: 'max(env(safe-area-inset-top), 8px)',
          paddingBottom: 8,
        }}
      >
        {/* Back */}
        <button
          type="button"
          onClick={() => router.back()}
          className="w-11 h-11 flex items-center justify-center rounded-full flex-shrink-0"
        >
          <ArrowLeft size={22} strokeWidth={1.5} className="text-ink" />
        </button>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
          style={{ backgroundColor: 'var(--color-dune)' }}
        >
          {otherPartyPhotoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={otherPartyPhotoUrl}
              alt={otherPartyName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span
              className="font-sans font-semibold"
              style={{ fontSize: 12, color: 'var(--color-ash-warm)' }}
            >
              {otherPartyInitials}
            </span>
          )}
        </div>

        {/* Name + status */}
        <div className="flex-1 min-w-0 ml-1">
          <p
            className="font-sans font-semibold text-ink truncate"
            style={{ fontSize: 15 }}
          >
            {otherPartyName}
          </p>
          <p
            className="font-sans"
            style={{ fontSize: 11, color: 'var(--color-silver-sand)' }}
          >
            Online
          </p>
        </div>

        {/* Phone */}
        <button
          type="button"
          onClick={() => showToast('Voice call coming soon')}
          className="w-11 h-11 flex items-center justify-center rounded-full flex-shrink-0"
        >
          <Phone
            size={20}
            strokeWidth={1.5}
            style={{ color: 'var(--color-ash-warm)' }}
          />
        </button>

        {/* More */}
        <button
          type="button"
          className="w-11 h-11 flex items-center justify-center rounded-full flex-shrink-0"
        >
          <MoreVertical
            size={20}
            strokeWidth={1.5}
            style={{ color: 'var(--color-ash-warm)' }}
          />
        </button>
      </div>

      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: LUXURY }}
            className="flex-shrink-0 overflow-hidden z-20"
          >
            <div
              className="px-4 py-2 text-center font-sans text-white"
              style={{ fontSize: 13, backgroundColor: 'var(--color-tulsi)' }}
            >
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Message area ── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3"
        style={{
          backgroundColor: 'var(--color-sandstone)',
          scrollBehavior: 'smooth',
        }}
      >
        {grouped.map(({ dateLabel, messages: dateMsgs }) => (
          <div key={dateLabel}>
            {/* Date header */}
            <div className="flex justify-center my-3">
              <span
                className="font-sans px-3 py-1 rounded-full"
                style={{
                  fontSize: 11,
                  color: 'var(--color-silver-sand)',
                  backgroundColor: 'var(--color-dune)',
                }}
              >
                {dateLabel}
              </span>
            </div>

            {dateMsgs.map((msg) => {
              // System message
              if (msg.type === 'system') {
                return (
                  <div key={msg.id} className="flex flex-col items-center gap-1 my-3">
                    <div className="flex items-center gap-1.5">
                      <CalendarCheck
                        size={12}
                        strokeWidth={1.5}
                        style={{ color: 'var(--color-silver-sand)' }}
                      />
                      <p
                        className="font-sans text-center"
                        style={{ fontSize: 12, color: 'var(--color-silver-sand)' }}
                      >
                        {msg.content}
                      </p>
                    </div>
                  </div>
                )
              }

              // Image message
              if (msg.type === 'image') {
                const mine = isMine(msg)
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: LUXURY }}
                    className={`flex mb-3 ${mine ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className="flex items-center justify-center flex-col gap-1"
                      style={{
                        width: 160,
                        height: 120,
                        backgroundColor: 'var(--color-mist-warm)',
                        borderRadius: 12,
                      }}
                    >
                      <Images
                        size={24}
                        strokeWidth={1.5}
                        style={{ color: 'var(--color-ash-warm)' }}
                      />
                      <p
                        className="font-sans"
                        style={{ fontSize: 11, color: 'var(--color-ash-warm)' }}
                      >
                        Image
                      </p>
                    </div>
                  </motion.div>
                )
              }

              // Text message
              const mine = isMine(msg)
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: LUXURY }}
                  className={`flex mb-3 ${mine ? 'justify-end' : 'justify-start'}`}
                >
                  <div style={{ maxWidth: '75%' }}>
                    <div
                      className="font-sans"
                      style={{
                        backgroundColor: mine
                          ? 'var(--color-emerald-jhoola)'
                          : 'var(--color-alabaster)',
                        color: mine ? 'white' : 'var(--color-ink)',
                        borderRadius: mine
                          ? '16px 16px 4px 16px'
                          : '16px 16px 16px 4px',
                        padding: '8px 12px',
                        lineHeight: 1.5,
                        fontSize: 14,
                      }}
                    >
                      {msg.content}
                    </div>
                    <div
                      className={`flex items-center gap-1 mt-1 ${mine ? 'justify-end' : 'justify-start'}`}
                    >
                      <p
                        className="font-sans"
                        style={{
                          fontSize: 10,
                          color: mine
                            ? 'rgba(255,255,255,0.6)'
                            : 'var(--color-silver-sand)',
                        }}
                      >
                        {formatTime(msg.timestamp)}
                      </p>
                      {mine && msg.isRead && (
                        <Check
                          size={10}
                          strokeWidth={1.5}
                          style={{ color: 'rgba(255,255,255,0.6)' }}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ))}
        {/* Bottom padding so last message doesn't sit flush at edge */}
        <div style={{ height: 8 }} />
      </div>

      {/* ── Input area ── */}
      <div
        className="flex-shrink-0 border-t border-dune bg-alabaster flex items-center gap-2 px-3"
        style={{
          paddingTop: 8,
          paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
        }}
      >
        {/* Attachment */}
        <button
          type="button"
          onClick={() => showToast('Photo sharing coming soon')}
          className="w-11 h-11 flex items-center justify-center rounded-full flex-shrink-0"
        >
          <Paperclip
            size={20}
            strokeWidth={1.5}
            style={{ color: 'var(--color-ash-warm)' }}
          />
        </button>

        {/* Text input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          placeholder="Type a message..."
          className="flex-1 font-sans outline-none"
          style={{
            height: 40,
            backgroundColor: 'var(--color-mist-warm)',
            borderRadius: 20,
            paddingLeft: 16,
            paddingRight: 16,
            fontSize: 14,
            color: 'var(--color-ink)',
            border: 'none',
          }}
        />

        {/* Send */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!input.trim()}
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-[220ms] flex-shrink-0"
          style={{
            backgroundColor: input.trim()
              ? 'var(--color-emerald-jhoola)'
              : 'var(--color-dune)',
          }}
        >
          <Send
            size={18}
            strokeWidth={1.5}
            style={{
              color: input.trim() ? 'white' : 'var(--color-silver-sand)',
            }}
          />
        </button>
      </div>
    </div>
  )
}

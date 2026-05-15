'use client'

import { use } from 'react'
import { getCustomerConversationById } from '@/lib/mock-artist-data'
import ChatView from '@/components/shared/ChatView'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function CustomerChatPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const conv = getCustomerConversationById(id)

  if (!conv) {
    return (
      <div className="flex flex-col min-h-[100dvh] bg-sandstone">
        <div
          className="flex items-center h-14 px-4 gap-3 border-b border-dune bg-alabaster"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
          <button
            type="button"
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full -ml-1"
          >
            <ArrowLeft size={22} strokeWidth={1.5} className="text-ink" />
          </button>
          <p className="flex-1 font-sans font-semibold text-ink" style={{ fontSize: 15 }}>
            Conversation
          </p>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-3">
          <p className="font-heading text-ink text-center" style={{ fontSize: 18 }}>
            Conversation not found
          </p>
          <button
            type="button"
            onClick={() => router.push('/c/chat')}
            className="font-sans"
            style={{ fontSize: 14, color: 'var(--color-emerald-jhoola)' }}
          >
            Back to messages
          </button>
        </div>
      </div>
    )
  }

  return (
    <ChatView
      conversationId={conv.id}
      perspective="customer"
      otherPartyName={conv.otherPartyName}
      otherPartyInitials={conv.otherPartyInitials}
      otherPartyPhotoUrl={conv.otherPartyPhotoUrl}
    />
  )
}

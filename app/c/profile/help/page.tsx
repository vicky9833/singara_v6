'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Search, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

const FAQ_SECTIONS = [
  {
    title: 'Booking & Reservations',
    items: [
      {
        q: 'How do I book an artist?',
        a: 'Browse artists on the Explore tab, tap an artist to view their profile, select the services you need, and follow the reservation flow. You can choose your preferred date, time, and location.',
      },
      {
        q: 'Can I reschedule a booking?',
        a: 'Yes, you can request a reschedule up to 24 hours before your appointment. Go to My Bookings, tap the booking, and select "Modify booking". The artist will confirm the new slot.',
      },
      {
        q: 'What is the cancellation policy?',
        a: 'Free cancellation up to 48 hours before your appointment. 50% refund for cancellations made 24–48 hours before. No refund for cancellations within 24 hours. If the artist cancels, you receive a full refund.',
      },
    ],
  },
  {
    title: 'Payments',
    items: [
      {
        q: 'What payment methods are accepted?',
        a: 'We accept UPI, debit/credit cards, net banking, and digital wallets via Razorpay. More payment options will be added soon.',
      },
      {
        q: 'How do refunds work?',
        a: 'Refunds are processed within 5–7 business days to the original payment method. For cancellations, the refund amount depends on the time of cancellation as per our cancellation policy.',
      },
    ],
  },
  {
    title: 'Account',
    items: [
      {
        q: 'How do I delete my account?',
        a: 'Go to Profile → Settings → Delete account. This will permanently delete all your data including bookings, favorites, and profile information as required by DPDPA 2023.',
      },
      {
        q: 'How do I change my phone number?',
        a: 'Phone number changes require identity verification. Please contact our support team at support@singara.in with your request and we will assist you within 24 hours.',
      },
    ],
  },
]

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderTop: '1px solid var(--color-dune)' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left transition-colors duration-[220ms] active:bg-mist-warm"
      >
        <p className="font-sans font-semibold text-ink flex-1" style={{ fontSize: 14 }}>
          {question}
        </p>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: LUXURY }}
          style={{ flexShrink: 0 }}
        >
          <ChevronDown size={18} strokeWidth={1.5} style={{ color: 'var(--color-silver-sand)' }} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: LUXURY }}
            className="overflow-hidden"
          >
            <p
              className="font-sans text-ash-warm px-4 pb-4"
              style={{ fontSize: 14, lineHeight: 1.6 }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function HelpPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = FAQ_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) =>
        !searchQuery ||
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  })).filter((s) => s.items.length > 0)

  return (
    <div className="flex flex-col min-h-[100dvh] bg-sandstone">
      <div
        className="flex items-center h-14 px-4 gap-3 border-b border-dune bg-sandstone"
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
          Help & support
        </p>
      </div>

      <motion.div
        className="flex-1 overflow-y-auto px-6 pt-4 pb-32"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      >
        {/* Search */}
        <div
          className="flex items-center gap-3 bg-alabaster border border-dune px-4 h-12 mb-6 transition-all duration-[220ms]"
          style={{ borderRadius: 24 }}
        >
          <Search size={18} strokeWidth={1.5} style={{ color: 'var(--color-silver-sand)', flexShrink: 0 }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search help articles..."
            className="flex-1 bg-transparent font-sans text-ink focus:outline-none placeholder:text-silver-sand"
            style={{ fontSize: 14 }}
          />
        </div>

        {/* FAQ sections */}
        <div className="space-y-5">
          {filtered.map((section) => (
            <div key={section.title}>
              <p
                className="font-sans text-ash-warm mb-2 px-1"
                style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '1px' }}
              >
                {section.title}
              </p>
              <div className="bg-alabaster border border-dune overflow-hidden" style={{ borderRadius: 16 }}>
                {section.items.map((item) => (
                  <FaqItem key={item.q} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}

          {filtered.length === 0 && searchQuery && (
            <p className="font-sans text-ash-warm text-center py-8" style={{ fontSize: 14 }}>
              No results for &ldquo;{searchQuery}&rdquo;
            </p>
          )}
        </div>

        {/* Contact */}
        <div
          className="mt-8 bg-alabaster border border-dune p-5 text-center"
          style={{ borderRadius: 16 }}
        >
          <p className="font-sans font-semibold text-ink mb-1" style={{ fontSize: 14 }}>
            Still need help?
          </p>
          <a
            href="mailto:support@singara.in"
            className="font-sans"
            style={{ fontSize: 14, color: 'var(--color-emerald-jhoola)' }}
          >
            support@singara.in
          </a>
          <p className="font-sans text-ash-warm mt-1" style={{ fontSize: 12 }}>
            Response time: within 4 hours
          </p>
        </div>
      </motion.div>
    </div>
  )
}

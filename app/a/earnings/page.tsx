'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IndianRupee, Heart, Gift, Users } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  getTransactions,
  getPayoutRecords,
  getEarningsSummary,
  type Transaction,
  type PayoutRecord,
} from '@/lib/mock-artist-data'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

function formatINR(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return `${days} days ago`
}

function TxnIcon({ type }: { type: Transaction['type'] }) {
  const iconProps = { size: 14, strokeWidth: 1.5, color: '#fff' }
  const bg =
    type === 'booking_payout'
      ? 'var(--color-emerald-jhoola)'
      : type === 'tip'
        ? 'var(--color-heritage-gold)'
        : type === 'referral_bonus'
          ? 'var(--color-marigold)'
          : 'var(--color-tulsi)'

  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: bg }}
    >
      {type === 'booking_payout' && <IndianRupee {...iconProps} />}
      {type === 'tip' && <Heart {...iconProps} />}
      {type === 'referral_bonus' && <Gift {...iconProps} />}
      {type === 'assist_payment' && <Users {...iconProps} />}
    </div>
  )
}

function StatusBadge({ status }: { status: 'completed' | 'pending' | 'processing' }) {
  const styles = {
    completed: { bg: 'rgba(74,124,89,0.10)', color: 'var(--color-tulsi)' },
    pending: { bg: 'rgba(212,136,31,0.10)', color: 'var(--color-turmeric)' },
    processing: { bg: 'rgba(15,95,76,0.10)', color: 'var(--color-emerald-jhoola)' },
  }
  const s = styles[status]
  return (
    <span
      className="px-2 py-0.5 rounded-full font-sans capitalize"
      style={{ fontSize: 11, backgroundColor: s.bg, color: s.color }}
    >
      {status}
    </span>
  )
}

function TransactionCard({ txn }: { txn: Transaction }) {
  return (
    <div
      className="flex items-center gap-3 p-3.5 mb-2"
      style={{ backgroundColor: 'var(--color-alabaster)', borderRadius: 16 }}
    >
      <TxnIcon type={txn.type} />
      <div className="flex-1 min-w-0">
        <p className="font-sans text-ink" style={{ fontSize: 14 }}>
          {txn.description}
        </p>
        <p className="font-sans text-ash-warm mt-0.5" style={{ fontSize: 12 }}>
          {timeAgo(txn.date)}
          {txn.customerName ? ` · ${txn.customerName}` : ''}
        </p>
      </div>
      <div className="text-right flex-shrink-0">
        <p
          className="font-sans font-semibold"
          style={{ fontSize: 15, color: 'var(--color-emerald-jhoola)' }}
        >
          +{formatINR(txn.amount)}
        </p>
        <div className="mt-0.5 flex justify-end">
          <StatusBadge status={txn.status} />
        </div>
      </div>
    </div>
  )
}

function PayoutCard({ payout }: { payout: PayoutRecord }) {
  return (
    <div
      className="p-4 mb-3"
      style={{ backgroundColor: 'var(--color-alabaster)', borderRadius: 16 }}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-sans font-semibold text-ink" style={{ fontSize: 18 }}>
          {formatINR(payout.amount)}
        </span>
        <StatusBadge status={payout.status} />
      </div>
      <p className="font-sans text-ash-warm" style={{ fontSize: 13 }}>
        {formatDate(payout.createdAt)}
      </p>
      {payout.bankReference && (
        <p
          className="font-sans text-silver-sand mt-1"
          style={{ fontSize: 12, letterSpacing: '0.04em' }}
        >
          Ref: {payout.bankReference}
        </p>
      )}
      <p className="font-sans text-ash-warm mt-1" style={{ fontSize: 12 }}>
        {payout.bookingIds.length} {payout.bookingIds.length === 1 ? 'booking' : 'bookings'}
      </p>
    </div>
  )
}

export default function EarningsPage() {
  const [toast, setToast] = useState<string | null>(null)
  const summary = getEarningsSummary()
  const transactions = getTransactions()
  const payouts = getPayoutRecords()

  const totalEarned = transactions
    .filter((t) => t.status === 'completed')
    .reduce((s, t) => s + t.amount, 0)
  const commission = Math.round(totalEarned * 0.15)
  const net = totalEarned - commission

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-sandstone">
      {/* Header */}
      <div
        className="flex items-center h-14 px-4 bg-sandstone border-b border-dune"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <p className="font-sans font-semibold text-ink" style={{ fontSize: 16 }}>
          Earnings
        </p>
      </div>

      <motion.div
        className="flex-1 overflow-y-auto pb-[96px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: LUXURY }}
      >
        {/* Summary 2x2 grid */}
        <div className="grid grid-cols-2 gap-3 px-4 pt-4">
          <div className="bg-alabaster p-4 rounded-2xl">
            <p className="font-sans text-ash-warm mb-1" style={{ fontSize: 11 }}>This week</p>
            <p
              className="font-sans font-bold"
              style={{ fontSize: 22, color: 'var(--color-emerald-jhoola)' }}
            >
              {formatINR(summary.thisWeek)}
            </p>
          </div>
          <div className="bg-alabaster p-4 rounded-2xl">
            <p className="font-sans text-ash-warm mb-1" style={{ fontSize: 11 }}>This month</p>
            <p
              className="font-sans font-bold"
              style={{ fontSize: 22, color: 'var(--color-emerald-jhoola)' }}
            >
              {formatINR(summary.thisMonth)}
            </p>
          </div>
          <div className="bg-alabaster p-4 rounded-2xl">
            <p className="font-sans text-ash-warm mb-1" style={{ fontSize: 11 }}>Total earned</p>
            <p
              className="font-sans font-bold"
              style={{ fontSize: 22, color: 'var(--color-emerald-jhoola)' }}
            >
              {formatINR(summary.total)}
            </p>
          </div>
          <div className="bg-alabaster p-4 rounded-2xl">
            <p className="font-sans text-ash-warm mb-1" style={{ fontSize: 11 }}>Pending payout</p>
            <p
              className="font-sans font-bold"
              style={{
                fontSize: 22,
                color:
                  summary.pending > 0
                    ? 'var(--color-turmeric)'
                    : 'var(--color-emerald-jhoola)',
              }}
            >
              {formatINR(summary.pending)}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="transactions" className="mt-4">
          <TabsList className="mx-4 grid grid-cols-3 h-10 bg-mist-warm rounded-xl">
            <TabsTrigger
              value="transactions"
              className="rounded-lg font-sans text-xs data-[state=active]:bg-alabaster data-[state=active]:text-ink data-[state=active]:shadow-sm"
            >
              Transactions
            </TabsTrigger>
            <TabsTrigger
              value="payouts"
              className="rounded-lg font-sans text-xs data-[state=active]:bg-alabaster data-[state=active]:text-ink data-[state=active]:shadow-sm"
            >
              Payouts
            </TabsTrigger>
            <TabsTrigger
              value="tax"
              className="rounded-lg font-sans text-xs data-[state=active]:bg-alabaster data-[state=active]:text-ink data-[state=active]:shadow-sm"
            >
              Tax
            </TabsTrigger>
          </TabsList>

          {/* Transactions */}
          <TabsContent value="transactions" className="px-4 pt-3">
            {transactions.map((txn) => (
              <TransactionCard key={txn.id} txn={txn} />
            ))}
          </TabsContent>

          {/* Payouts */}
          <TabsContent value="payouts" className="px-4 pt-3">
            {payouts.map((p) => (
              <PayoutCard key={p.id} payout={p} />
            ))}
            {/* Payout settings card */}
            <div
              className="p-4 mt-2"
              style={{ backgroundColor: 'var(--color-alabaster)', borderRadius: 16 }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-sans font-semibold text-ink" style={{ fontSize: 14 }}>
                  Payout settings
                </p>
                <button
                  type="button"
                  onClick={() => showToast('Payout settings coming in Sprint 16')}
                  className="font-sans"
                  style={{ fontSize: 13, color: 'var(--color-emerald-jhoola)' }}
                >
                  Edit
                </button>
              </div>
              <p className="font-sans text-ash-warm" style={{ fontSize: 13 }}>
                Bank account: HDFC ****1234
              </p>
              <p className="font-sans text-ash-warm" style={{ fontSize: 13 }}>
                UPI: artist@upi
              </p>
            </div>
          </TabsContent>

          {/* Tax */}
          <TabsContent value="tax" className="px-4 pt-3">
            <div
              className="p-5"
              style={{ backgroundColor: 'var(--color-alabaster)', borderRadius: 20 }}
            >
              <p className="font-heading text-ink mb-4" style={{ fontSize: 18 }}>
                FY 2025–26
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-ash-warm" style={{ fontSize: 14 }}>
                    Total earned
                  </span>
                  <span className="font-sans font-semibold text-ink" style={{ fontSize: 14 }}>
                    {formatINR(totalEarned)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-ash-warm" style={{ fontSize: 14 }}>
                    Platform commission (15%)
                  </span>
                  <span
                    className="font-sans font-semibold"
                    style={{ fontSize: 14, color: 'var(--color-vermilion)' }}
                  >
                    −{formatINR(commission)}
                  </span>
                </div>
                <div
                  className="h-px"
                  style={{ backgroundColor: 'var(--color-dune)' }}
                />
                <div className="flex items-center justify-between">
                  <span className="font-sans font-semibold text-ink" style={{ fontSize: 14 }}>
                    Net earnings
                  </span>
                  <span
                    className="font-sans font-semibold"
                    style={{ fontSize: 14, color: 'var(--color-emerald-jhoola)' }}
                  >
                    {formatINR(net)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-ash-warm" style={{ fontSize: 13 }}>
                    TDS deducted
                  </span>
                  <span className="font-sans text-ash-warm" style={{ fontSize: 13 }}>
                    ₹0 (below threshold)
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => showToast('Tax document generation coming soon')}
                className="w-full h-11 mt-5 rounded-xl font-sans font-semibold border"
                style={{
                  fontSize: 14,
                  color: 'var(--color-emerald-jhoola)',
                  borderColor: 'var(--color-emerald-jhoola)',
                  backgroundColor: 'transparent',
                }}
              >
                Download tax summary
              </button>
            </div>

            <p
              className="font-sans text-ash-warm italic text-center mt-4 px-2"
              style={{ fontSize: 12 }}
            >
              This is an estimated summary. Consult a tax professional for accurate filing.
            </p>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22, ease: LUXURY }}
            className="fixed bottom-24 left-0 right-0 flex justify-center pointer-events-none z-50 px-6"
          >
            <div
              className="bg-ink text-white px-5 py-3 font-sans"
              style={{ fontSize: 13, borderRadius: 12 }}
            >
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


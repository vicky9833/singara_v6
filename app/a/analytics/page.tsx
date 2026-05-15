'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Eye,
  Target,
  IndianRupee,
  Clock,
  TrendingUp,
  TrendingDown,
  Calendar,
  MapPin,
  Star,
} from 'lucide-react'

const LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Period = 'week' | 'month' | 'all'

function useCountUp(target: number, duration = 800, delay = 80) {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (started.current) return
    started.current = true
    const timer = setTimeout(() => {
      const startTime = Date.now()
      const tick = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(target * eased))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(timer)
  }, [target, duration, delay])
  return count
}

const BAR_DATA = [
  { day: 'M', value: 45 },
  { day: 'T', value: 62 },
  { day: 'W', value: 38 },
  { day: 'T', value: 71 },
  { day: 'F', value: 55 },
  { day: 'S', value: 89 },
  { day: 'S', value: 67 },
]
const BAR_MAX = Math.max(...BAR_DATA.map((d) => d.value))
const CHART_HEIGHT = 140

const SERVICES = [
  { name: 'South Indian Bridal', count: 45 },
  { name: 'Bridal Complete', count: 32 },
  { name: 'Mehendi Occasion', count: 18 },
]

const STAR_ROWS = [
  { star: 5, fill: 0.34 },
  { star: 4, fill: 0.26 },
  { star: 3, fill: 0.18 },
  { star: 2, fill: 0.09 },
  { star: 1, fill: 0.05 },
]

function MetricCard({
  icon,
  iconBg,
  value,
  label,
  trend,
  trendDir,
  isDown = false,
}: {
  icon: React.ReactNode
  iconBg: string
  value: string
  label: string
  trend: string
  trendDir: 'up' | 'down'
  isDown?: boolean
}) {
  return (
    <div
      className="flex flex-col p-5"
      style={{ backgroundColor: 'var(--color-alabaster)', borderRadius: 16 }}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center mb-3"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </div>
      <p className="font-sans font-bold text-ink" style={{ fontSize: 24 }}>
        {value}
      </p>
      <p className="font-sans text-ash-warm mt-1" style={{ fontSize: 12 }}>
        {label}
      </p>
      <div className="flex items-center gap-1 mt-2">
        {trendDir === 'up' ? (
          <TrendingUp size={12} strokeWidth={1.5} style={{ color: 'var(--color-tulsi)' }} />
        ) : (
          <TrendingDown size={12} strokeWidth={1.5} style={{ color: 'var(--color-tulsi)' }} />
        )}
        <span className="font-sans" style={{ fontSize: 11, color: 'var(--color-tulsi)' }}>
          {trend}
        </span>
      </div>
    </div>
  )
}

// SVG donut — 34% fill, r=24, cx=cy=30
const DONUT_R = 24
const DONUT_C = 2 * Math.PI * DONUT_R // ~150.8
const DONUT_FILL = DONUT_C * 0.34 // ~51.3

export default function AnalyticsPage() {
  const router = useRouter()
  const [period, setPeriod] = useState<Period>('month')

  const views = useCountUp(1240)
  const conversionNum = useCountUp(18)
  const avgBooking = useCountUp(8500)
  const responseNum = useCountUp(18) // 1.8 → shown as "1.8 hr" using raw value / 10

  return (
    <div className="flex flex-col min-h-[100dvh] bg-sandstone">
      {/* Header */}
      <div
        className="flex items-center h-14 px-4 gap-3 border-b border-dune bg-sandstone flex-shrink-0"
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
          Analytics
        </p>
      </div>

      <motion.div
        className="flex-1 overflow-y-auto pb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: LUXURY, delay: 0.08 }}
      >
        {/* Time period selector */}
        <div className="px-5 pt-4 flex gap-2">
          {(['week', 'month', 'all'] as Period[]).map((p) => {
            const label = p === 'week' ? 'This week' : p === 'month' ? 'This month' : 'All time'
            const active = period === p
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className="h-8 px-4 font-sans font-medium border transition-colors duration-220"
                style={{
                  fontSize: 13,
                  borderRadius: 16,
                  backgroundColor: active ? 'var(--color-emerald-jhoola)' : 'var(--color-alabaster)',
                  color: active ? '#fff' : 'var(--color-ink)',
                  borderColor: active ? 'transparent' : 'var(--color-dune)',
                }}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Key metrics 2x2 */}
        <div className="px-5 mt-4 grid grid-cols-2 gap-3">
          <MetricCard
            icon={<Eye size={18} strokeWidth={1.5} style={{ color: 'var(--color-emerald-jhoola)' }} />}
            iconBg="rgba(15,95,76,0.08)"
            value={views.toLocaleString('en-IN')}
            label="profile views"
            trend="+12%"
            trendDir="up"
          />
          <MetricCard
            icon={<Target size={18} strokeWidth={1.5} style={{ color: 'var(--color-heritage-gold)' }} />}
            iconBg="rgba(201,169,97,0.08)"
            value={`${conversionNum}%`}
            label="conversion rate"
            trend="+3%"
            trendDir="up"
          />
          <MetricCard
            icon={<IndianRupee size={18} strokeWidth={1.5} style={{ color: 'var(--color-marigold)' }} />}
            iconBg="rgba(232,163,61,0.08)"
            value={`₹${avgBooking.toLocaleString('en-IN')}`}
            label="avg booking value"
            trend="+8%"
            trendDir="up"
          />
          <MetricCard
            icon={<Clock size={18} strokeWidth={1.5} style={{ color: 'var(--color-emerald-jhoola)' }} />}
            iconBg="rgba(15,95,76,0.08)"
            value={`${(responseNum / 10).toFixed(1)} hr`}
            label="avg response time"
            trend="-15%"
            trendDir="down"
          />
        </div>

        {/* Profile views chart */}
        <div className="px-5 mt-6">
          <div className="flex items-baseline justify-between mb-3">
            <p className="font-heading text-ink" style={{ fontSize: 18 }}>
              Profile views
            </p>
            <p className="font-sans text-ash-warm" style={{ fontSize: 12 }}>
              Last 7 days
            </p>
          </div>
          <div
            className="px-5 py-5"
            style={{ backgroundColor: 'var(--color-alabaster)', borderRadius: 16 }}
          >
            <div className="flex items-end justify-between gap-2" style={{ height: CHART_HEIGHT }}>
              {BAR_DATA.map((d, i) => {
                const h = Math.max(4, Math.round((d.value / BAR_MAX) * CHART_HEIGHT))
                const isHighest = d.value === BAR_MAX
                return (
                  <div key={i} className="flex flex-col items-center gap-2 flex-1">
                    <div
                      style={{
                        height: h,
                        borderRadius: '4px 4px 2px 2px',
                        backgroundColor: isHighest
                          ? 'var(--color-heritage-gold)'
                          : 'var(--color-emerald-jhoola)',
                        width: '100%',
                      }}
                    />
                    <span className="font-sans text-ash-warm" style={{ fontSize: 11 }}>
                      {d.day}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Popular services */}
        <div className="px-5 mt-6">
          <p className="font-heading text-ink mb-3" style={{ fontSize: 18 }}>
            Most booked services
          </p>
          <div
            className="px-5 py-5 flex flex-col gap-4"
            style={{ backgroundColor: 'var(--color-alabaster)', borderRadius: 16 }}
          >
            {SERVICES.map((s, i) => {
              const pct = (s.count / SERVICES[0].count) * 100
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="font-sans font-semibold"
                        style={{ fontSize: 14, color: 'var(--color-heritage-gold)', width: 16 }}
                      >
                        {i + 1}
                      </span>
                      <span className="font-sans text-ink" style={{ fontSize: 14 }}>
                        {s.name}
                      </span>
                    </div>
                    <span className="font-sans text-ash-warm" style={{ fontSize: 13 }}>
                      {s.count} bookings
                    </span>
                  </div>
                  <div
                    className="w-full"
                    style={{ height: 6, borderRadius: 3, backgroundColor: 'var(--color-dune)' }}
                  >
                    <div
                      style={{
                        height: 6,
                        borderRadius: 3,
                        width: `${pct}%`,
                        backgroundColor: 'var(--color-emerald-jhoola)',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Customer insights */}
        <div className="px-5 mt-6">
          <p className="font-heading text-ink mb-3" style={{ fontSize: 18 }}>
            Customer insights
          </p>
          <div
            className="px-5 py-5"
            style={{ backgroundColor: 'var(--color-alabaster)', borderRadius: 16 }}
          >
            {/* Repeat customer rate */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-sans text-ink" style={{ fontSize: 14 }}>
                  Repeat customers
                </p>
                <p className="font-sans text-ash-warm mt-1" style={{ fontSize: 12 }}>
                  34% of your customers book again
                </p>
              </div>
              {/* SVG Donut */}
              <div className="flex-shrink-0 relative" style={{ width: 60, height: 60 }}>
                <svg viewBox="0 0 60 60" width={60} height={60}>
                  {/* Track */}
                  <circle
                    cx={30}
                    cy={30}
                    r={DONUT_R}
                    fill="none"
                    stroke="var(--color-dune)"
                    strokeWidth={6}
                  />
                  {/* Fill */}
                  <circle
                    cx={30}
                    cy={30}
                    r={DONUT_R}
                    fill="none"
                    stroke="var(--color-emerald-jhoola)"
                    strokeWidth={6}
                    strokeDasharray={`${DONUT_FILL} ${DONUT_C}`}
                    strokeLinecap="round"
                    transform="rotate(-90 30 30)"
                  />
                </svg>
                <span
                  className="absolute inset-0 flex items-center justify-center font-sans font-semibold text-ink"
                  style={{ fontSize: 13 }}
                >
                  34%
                </span>
              </div>
            </div>

            <div
              style={{ height: 1, backgroundColor: 'var(--color-dune)', margin: '16px 0' }}
            />

            {/* Peak day */}
            <div className="flex items-center gap-2.5 mb-2">
              <Calendar size={16} strokeWidth={1.5} className="text-ash-warm flex-shrink-0" />
              <span className="font-sans text-ink" style={{ fontSize: 14 }}>
                Most bookings on Saturday
              </span>
            </div>

            {/* Top area */}
            <div className="flex items-center gap-2.5 mb-2">
              <MapPin size={16} strokeWidth={1.5} className="text-ash-warm flex-shrink-0" />
              <span className="font-sans text-ink" style={{ fontSize: 14 }}>
                Most popular area: Koramangala
              </span>
            </div>

            {/* Average rating */}
            <div className="flex items-center gap-2.5">
              <Star
                size={16}
                strokeWidth={0}
                fill="var(--color-marigold)"
                style={{ color: 'var(--color-marigold)', flexShrink: 0 }}
              />
              <span className="font-sans text-ink" style={{ fontSize: 14 }}>
                Average rating: 4.8 / 5
              </span>
              <div className="flex items-center gap-0.5 ml-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={12}
                    strokeWidth={0}
                    fill={s <= 4 ? 'var(--color-marigold)' : 'var(--color-dune)'}
                    style={{ color: s <= 4 ? 'var(--color-marigold)' : 'var(--color-dune)' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

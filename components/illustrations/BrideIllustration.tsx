export default function BrideIllustration({ className }: { className?: string }) {
  // 8 radiating petals at 45° intervals — larger distance & size
  const petals = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 45 * Math.PI) / 180
    const cx = 140 + Math.cos(angle) * 64
    const cy = 128 + Math.sin(angle) * 64
    return { cx, cy, angle: i * 45 }
  })

  // Marigold garland dots — crescent arc below center
  const garlandDots = Array.from({ length: 9 }, (_, i) => {
    const angle = Math.PI + (i * Math.PI) / 8
    return {
      x: 140 + Math.cos(angle) * 50,
      y: 128 + Math.sin(angle) * 50 + 76,
      opacity: 0.6 + (i % 3) * 0.1,
    }
  })

  // Decorative rosewater dots — scaled positions
  const decorDots = [
    { cx: 89, cy: 78 }, { cx: 191, cy: 78 },
    { cx: 70, cy: 128 }, { cx: 210, cy: 128 },
    { cx: 96, cy: 178 }, { cx: 184, cy: 178 },
    { cx: 140, cy: 66 }, { cx: 140, cy: 190 },
  ]

  return (
    <svg
      viewBox="0 0 280 260"
      className={className ?? 'w-64 h-56'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 8 radiating petals — larger, stronger */}
      {petals.map(({ cx, cy, angle }, i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx="14"
          ry="26"
          fill="#E8A33D"
          fillOpacity="0.70"
          stroke="#C9A961"
          strokeWidth="1"
          transform={`rotate(${angle}, ${cx}, ${cy})`}
        />
      ))}

      {/* Central medallion outer ring */}
      <circle cx="140" cy="128" r="32" stroke="#C9A961" strokeWidth="2.5" fill="none" />

      {/* Medallion secondary ring */}
      <circle cx="140" cy="128" r="22" stroke="#C9A961" strokeWidth="1" strokeOpacity="0.4" fill="none" />

      {/* Medallion inner emerald fill */}
      <circle cx="140" cy="128" r="14" fill="#0F5F4C" />

      {/* Medallion center gold */}
      <circle cx="140" cy="128" r="5" fill="#C9A961" />

      {/* Jhumka left */}
      <circle cx="84" cy="124" r="6" fill="#C9A961" />
      <path d="M79 130 L74 158 L94 158 L89 130 Z" fill="#C9A961" />
      <line x1="84" y1="158" x2="84" y2="170" stroke="#C9A961" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="84" cy="174" r="4" fill="#C9A961" />

      {/* Jhumka right */}
      <circle cx="196" cy="124" r="6" fill="#C9A961" />
      <path d="M191 130 L186 158 L206 158 L201 130 Z" fill="#C9A961" />
      <line x1="196" y1="158" x2="196" y2="170" stroke="#C9A961" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="196" cy="174" r="4" fill="#C9A961" />

      {/* Marigold garland — larger circles, stronger opacity */}
      {garlandDots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="7" fill="#E8A33D" fillOpacity={d.opacity} />
      ))}

      {/* Decorative rosewater dots */}
      {decorDots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r="2.5" fill="#E4B8B0" />
      ))}
    </svg>
  )
}

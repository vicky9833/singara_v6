export default function CalendarIllustration({ className }: { className?: string }) {
  // Full date grid: 5 rows × 7 columns
  const dates = [
    { n: '1',  x: 46,  y: 88 },
    { n: '2',  x: 76,  y: 88 },
    { n: '3',  x: 106, y: 88 },
    { n: '4',  x: 136, y: 88 },
    { n: '5',  x: 166, y: 88 },
    { n: '6',  x: 196, y: 88 },
    { n: '7',  x: 226, y: 88 },
    { n: '8',  x: 46,  y: 116 },
    { n: '9',  x: 76,  y: 116 },
    { n: '10', x: 106, y: 116 },
    { n: '11', x: 136, y: 116 },
    { n: '12', x: 166, y: 116 },
    { n: '13', x: 196, y: 116 },
    // 14 is highlighted — rendered separately
    { n: '15', x: 46,  y: 144 },
    { n: '16', x: 76,  y: 144 },
    { n: '17', x: 106, y: 144 },
    { n: '18', x: 136, y: 144 },
    { n: '19', x: 166, y: 144 },
    { n: '20', x: 196, y: 144 },
    { n: '21', x: 226, y: 144 },
    { n: '22', x: 46,  y: 172 },
    { n: '23', x: 76,  y: 172 },
    { n: '24', x: 106, y: 172 },
    { n: '25', x: 136, y: 172 },
  ]

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const dayXPositions = [46, 76, 106, 136, 166, 196, 226]

  return (
    <svg
      viewBox="0 0 272 210"
      className={className ?? 'w-64 h-52'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Drop shadow via rect underneath */}
      <rect x="18" y="20" width="236" height="184" rx="16" fill="#DDD2C1" fillOpacity="0.4" />

      {/* Calendar card */}
      <rect x="16" y="16" width="240" height="184" rx="16" fill="#FCF9F3" stroke="#DDD2C1" strokeWidth="1.5" />

      {/* Ring holes — left and right */}
      <circle cx="86" cy="16" r="6" fill="#FCF9F3" stroke="#DDD2C1" strokeWidth="1.5" />
      <circle cx="186" cy="16" r="6" fill="#FCF9F3" stroke="#DDD2C1" strokeWidth="1.5" />

      {/* Emerald header — rounded top corners only */}
      <rect x="16" y="16" width="240" height="42" rx="16" fill="#0F5F4C" />
      <rect x="16" y="36" width="240" height="22" fill="#0F5F4C" />

      {/* Month label */}
      <text x="136" y="43" textAnchor="middle" fill="#FCF9F3" fontSize="14" fontWeight="600" fontFamily="sans-serif" letterSpacing="2">
        JANUARY
      </text>

      {/* Day-of-week headers */}
      {dayLabels.map((label, i) => (
        <text
          key={i}
          x={dayXPositions[i]}
          y={72}
          textAnchor="middle"
          fill="#0F5F4C"
          fontSize="9"
          fontWeight="600"
          fontFamily="sans-serif"
          opacity="0.7"
        >
          {label}
        </text>
      ))}

      {/* Divider below day headers */}
      <line x1="28" y1="78" x2="244" y2="78" stroke="#DDD2C1" strokeWidth="0.75" />

      {/* Date numbers */}
      {dates.map(({ n, x, y }) => (
        <text key={n} x={x} y={y} textAnchor="middle" fill="#6B5D54" fontSize="11" fontFamily="sans-serif">
          {n}
        </text>
      ))}

      {/* Highlighted date 14 — Heritage Gold circle */}
      <circle cx="226" cy="113" r="16" fill="#C9A961" />
      <text x="226" y="118" textAnchor="middle" fill="#1C1814" fontSize="13" fontWeight="700" fontFamily="sans-serif">
        14
      </text>



      {/* Decorative marigold dot — top-right corner */}
      <circle cx="246" cy="24" r="3" fill="#E8A33D" fillOpacity="0.5" />
      <circle cx="238" cy="20" r="2" fill="#E8A33D" fillOpacity="0.35" />

      {/* Decorative rosewater dot — bottom-left */}
      <circle cx="26" cy="192" r="2.5" fill="#E4B8B0" fillOpacity="0.6" />
    </svg>
  )
}

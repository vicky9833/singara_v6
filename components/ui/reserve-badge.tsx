interface ReserveBadgeProps {
  children: React.ReactNode
}

export function ReserveBadge({ children }: ReserveBadgeProps) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
      style={{
        backgroundImage: 'linear-gradient(135deg, #E8A33D 0%, #C9A961 50%, #E4B8B0 100%)',
        color: '#C9A961',
        border: '1px solid rgba(201,169,97,0.3)',
      }}
    >
      {children}
    </span>
  )
}

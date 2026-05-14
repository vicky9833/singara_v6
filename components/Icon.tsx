import type { LucideIcon } from 'lucide-react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: LucideIcon
  size?: number
  className?: string
}

export function Icon({ icon: IconComponent, size = 20, className, ...props }: IconProps) {
  return (
    <IconComponent
      size={size}
      strokeWidth={1.5}
      className={className}
      {...props}
    />
  )
}

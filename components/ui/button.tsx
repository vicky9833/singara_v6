import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl font-medium transition-all duration-[220ms] disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*=size-])]:size-4 shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-[#0F5F4C] text-[#FCF9F3] hover:bg-[#0F5F4C]/90',
        secondary:
          'bg-[#EDE5D6] text-[#1C1814] hover:bg-[#DDD2C1]',
        outline:
          'border border-[#DDD2C1] bg-transparent text-[#1C1814] hover:bg-[#EDE5D6]',
        ghost:
          'bg-transparent text-[#1C1814] hover:bg-[#EDE5D6]/50',
        reserve:
          'bg-[image:linear-gradient(135deg,#E8A33D_0%,#C9A961_50%,#E4B8B0_100%)] text-[#1C1814] font-semibold shadow-sm hover:shadow-md hover:brightness-105',
        destructive:
          'bg-[#C84432] text-[#FCF9F3] hover:bg-[#C84432]/90',
        link: 'text-[#0F5F4C] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-4',
        lg: 'h-12 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

import React from 'react'
import { DivideIcon as LucideIcon } from 'lucide-react'
import { useFormStatus } from 'react-dom'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white' | 'secondar'
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  fullWidth = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const { pending } = useFormStatus()
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all rounded-full'

  const variants = {
    primary:
      'bg-primary-500 text-white hover:bg-primary-600 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
    secondary:
      'bg-primary-400/20 backdrop-blur-sm text-white border border-primary-300/30 hover:bg-primary-400/30',
    outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50',
    ghost: 'text-primary-500 hover:bg-primary-50',
    white: 'bg-white text-primary-900 hover:bg-primary-50',
    secondar: 'bg-secondary-900 text-white border border-secondary-300/30 hover:bg-secondary-700',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const styles = [
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ')

  return (
    <button className={styles} {...props} disabled={pending}>
      {Icon && iconPosition === 'left' && <Icon className="mr-2 h-4 w-4 flex-shrink-0" />}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon className="ml-2 h-4 w-4 flex-shrink-0 transition-transform group-hover:translate-x-1" />
      )}
    </button>
  )
}

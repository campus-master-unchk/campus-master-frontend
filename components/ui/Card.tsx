// components/ui/Card.tsx
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export default function Card({
  children,
  className = '',
  hover = false,
  padding = 'md'
}: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  return (
    <div className={`
      bg-surface 
      border border-border 
      rounded-lg 
      shadow-sm
      ${paddings[padding]}
      ${hover ? 'hover:shadow-md hover:border-primary/30 cursor-pointer' : ''}
      transition-all duration-300
      ${className}
    `}>
      {children}
    </div>
  )
}
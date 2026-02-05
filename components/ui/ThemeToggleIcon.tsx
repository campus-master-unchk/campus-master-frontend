'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/app/ThemeProvider'

export default function ThemeToggleIcon() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="
        w-10 h-10
        flex items-center justify-center
        rounded-lg
        bg-surface
        text-foreground
        hover:bg-surface/80
        transition-all duration-300
        focus:outline-none focus:ring-0 focus:ring-primary
      "
      aria-label={`Basculer en mode ${theme === 'light' ? 'sombre' : 'clair'}`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  )
}
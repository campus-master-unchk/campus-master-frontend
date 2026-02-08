"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Bell, ChevronDown } from "lucide-react"
import { HiOutlineAcademicCap } from "react-icons/hi"
import ThemeToggleIcon from "@/components/ui/ThemeToggleIcon"
import { NavItem } from "@/types/navigation"
import ProfileDropdown from "../commun/ProfileDropdown"

type HeaderProps = {
  navItems: NavItem[]
  user_type: 'student'|'teacher'
}

export default function Header({ navItems, user_type }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-sm">
        <nav className="flex items-center justify-between h-16 md:h-20 px-4 max-w-[1920px] mx-auto">
          {/* Logo + Burger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-md hover:bg-surface-hover"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>

            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <HiOutlineAcademicCap className="text-white w-6 h-6" />
              </div>
              <span className="font-semibold text-lg">CampusMaster</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon
              const active = isActive(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors
                    ${active
                      ? "text-primary bg-primary/10"
                      : "text-muted hover:text-foreground hover:bg-surface-hover"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-surface-hover">
              <Bell className="w-5 h-5" />
            </button>

            <ThemeToggleIcon />

                            <ProfileDropdown user_type={user_type} />
            
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-surface">
            <div className="px-4 py-3 space-y-1">
              {navItems.map(item => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-surface-hover"
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </header>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  )
}

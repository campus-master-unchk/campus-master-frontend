"use client"
import { Bell, ChevronDown, Shield, Menu, X } from "lucide-react";
import ThemeToggleIcon from "../ui/ThemeToggleIcon";

// Interface pour les props
interface AdminHeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
  isMobile?: boolean;
}

export default function AdminHeader({ onMenuClick, sidebarOpen, isMobile = false }: AdminHeaderProps) {
    return (
        <header className={`
          h-16 
          bg-surface 
          shadow-sm
          fixed top-0 right-0 
          z-40 
          transition-all duration-300 
          ${sidebarOpen ? 'lg:left-64' : 'left-0'}
        `}>
          <div className="h-full px-4 md:px-6 flex items-center justify-between">
            {/* Left Side - Menu Toggle */}
            <div className="flex items-center gap-4">
              {/* Bouton hamburger - toujours visible */}
              <button 
                onClick={onMenuClick}
                className="
                  w-10 h-10 
                  flex items-center justify-center 
                  rounded-lg 
                  transition-colors
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                "
                aria-label={sidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5  text-muted " />
                ) : (
                  <Menu className="w-5 h-5  text-muted " />
                )}
              </button>
              
              {/* Titre de la page actuelle (optionnel) */}
              <div className="hidden md:block">
                <h1 className="text-lg font-semibold text-foreground">
                  Tableau de bord
                </h1>
              </div>
            </div>

            {/* Right Side - Actions & User */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="
                relative 
                w-10 h-10 
                flex items-center justify-center 
                rounded-lg 
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ">
                <Bell className="w-5 h-5  text-muted " />
                <span className="
                  absolute top-2 right-2 
                  w-2.5 h-2.5 
                  bg-red-500 
                  rounded-full 
                  border border-white
                "></span>
              </button>

              {/* Theme Toggle */}
              <div className="">
                <ThemeToggleIcon />
              </div>

              {/* User Menu */}
              <button className="
                flex items-center gap-3 
                px-3 py-2 
                rounded-lg 
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ">
                <div className="
                  w-9 h-9 
                  rounded-full 
                  bg-gradient-to-br from-purple-500 to-blue-600 
                  flex items-center justify-center 
                  border-2 border-white
                  shadow-sm
                ">
                  <span className="text-sm font-semibold text-white">AS</span>
                </div>
                
                {/* Info utilisateur - caché sur mobile */}
                <div className="hidden md:block text-left">
                  <span className="text-sm font-medium text-muted block">
                    Admin Sophie
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Shield className="w-3 h-3 text-muted" />
                    <span className="text-xs text-muted font-medium">
                      Administrateur
                    </span>
                  </div>
                </div>
                
                <ChevronDown className="w-4 h-4 text-muted hidden md:block" />
              </button>

              
            </div>
          </div>
        </header>
    )
}
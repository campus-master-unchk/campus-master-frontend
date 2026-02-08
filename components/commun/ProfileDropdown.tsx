"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, LogOut, ChevronDown, Shield, Settings, ChevronRight, Key } from "lucide-react";
import { authStore } from "@/store/auth.store";
import { authService } from "@/services/authService";

type Props = {
  user_type: "admin" | "teacher" | "student";
};

export default function ProfileDropdown({ user_type }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { myProfil,getMyProfil } = authStore();

  useEffect(() => {
    getMyProfil();
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    authStore.getState().myProfil = null;
    authService.logout();
    router.push("/");
  };

  // Fonction pour obtenir la couleur en fonction du type d'utilisateur
  const getUserColor = () => {
    switch (user_type) {
      case 'admin': return 'bg-red-500';
      case 'teacher': return 'bg-blue-500';
      case 'student': return 'bg-green-500';
      default: return 'bg-purple-500';
    }
  };

  // Fonction pour obtenir la couleur de fond du badge
  const getUserBadgeColor = () => {
    switch (user_type) {
      case 'admin': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      case 'teacher': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'student': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300';
    }
  };

  // Fonction pour formater le type d'utilisateur
  const formatUserType = (type: string) => {
    switch (type) {
      case 'admin': return 'Administrateur';
      case 'teacher': return 'Enseignant';
      case 'student': return 'Étudiant';
      default: return 'Utilisateur';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bouton déclencheur */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-surface/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getUserColor()} border border-border shadow-sm`}>
          <span className="text-sm text-white font-semibold">
            {myProfil?.last_name?.charAt(0) ?? myProfil?.first_name?.charAt(0) ?? "U"}
          </span>
        </div>

        {/* Info utilisateur - caché sur mobile */}
        <div className="hidden md:block text-left">
          <span className="text-sm font-medium text-foreground block truncate max-w-[120px]">
            {myProfil?.last_name} {myProfil?.first_name}
          </span>
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-muted" />
            <span className="text-xs text-muted font-medium truncate max-w-[100px]">
              {formatUserType(user_type)}
            </span>
          </div>
        </div>

        {/* Flèche avec animation */}
        <ChevronDown 
          className={`w-4 h-4 text-muted transition-all duration-300 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-surface border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-fadeIn">
          {/* En-tête du profil */}
          <div className="p-4 border-b border-border bg-surface/50">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getUserColor()} border border-border shadow-sm`}>
                <span className="text-base text-white font-semibold">
                  {myProfil?.last_name?.charAt(0) ?? myProfil?.first_name?.charAt(0) ?? "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {myProfil?.last_name} {myProfil?.first_name}
                </p>
                <p className="text-sm text-muted truncate">
                  {myProfil?.email || "utilisateur@campus.fr"}
                </p>
                
              </div>
            </div>
          </div>

          {/* Section de navigation */}
          <div className="py-2">
            {/* Profil */}
   

            {/* Paramètres */}
            <Link
              href={`/${user_type}/parametres`}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-4 py-3 text-foreground hover:bg-surface/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Settings className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">Paramètres</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

           
          </div>

          {/* Séparateur */}
          <div className="border-t border-border"></div>

          {/* Déconnexion */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <LogOut className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-sm">Déconnexion</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>

         
        </div>
      )}

      {/* Styles d'animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
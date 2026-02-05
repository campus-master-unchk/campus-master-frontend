"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { 
  LayoutGrid, 
  BookOpen, 
  Megaphone, 
  Users, 
  Folder,
  Layers,
  FileText,
  BarChart3, 
  Bell, 
  Settings, 
  X ,
  Tag
} from "lucide-react";
import ThemeToggleIcon from "@/components/ui/ThemeToggleIcon";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen = true, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navItems = {
    main: [
      { href: "/admin", icon: LayoutGrid, label: "Tableau de bord" },
      { href: "/admin/cours", icon: BookOpen, label: "Cours" },
      { href: "/admin/annonces", icon: Megaphone, label: "Annonces", badge: 2 },
    ],
    gestion: [
    { href: "/admin/users", icon: Users, label: "Utilisateurs" },
    { href: "/admin/modules", icon: Layers, label: "Modules" },
    { href: "/admin/departments", icon: Folder, label: "Départements" },
    { href: "/admin/levels", icon: FileText, label: "Niveaux" },
    { href: "/admin/specialities", icon: Tag, label: "Spécialités" },
    { href: "/admin/statistiques", icon: BarChart3, label: "Statistiques" },
  ],
    preferences: [
      { href: "/admin/notifications", icon: Bell, label: "Notifications" },
      { href: "/admin/parametres", icon: Settings, label: "Paramètres" },
    ]
  };

  const renderNavItems = (items: typeof navItems.main) => (
    <nav className="space-y-1">
      {items.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => window.innerWidth < 1024 && onClose?.()}
            className={`
              group
              flex items-center gap-3 
              px-3 py-2.5 
              rounded-lg 
              text-sm font-medium
              transition-all duration-300
              relative
              ${active
                ? 'bg-primary/10 text-primary' 
                : 'text-foreground hover:bg-surface-hover hover:text-primary'
              }
            `}
          >
            {/* Indicateur d'activité */}
            {active && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r"></div>
            )}
            
            <item.icon className={`
              w-4 h-4 
              transition-colors duration-300
              ${active ? 'text-primary' : 'text-muted group-hover:text-primary'}
            `} />
            
            <span>{item.label}</span>
            
            {item.badge && (
              <span className="
                ml-auto 
                bg-red-500 
                text-white 
                text-xs font-semibold 
                px-2 py-1 
                rounded-full
                min-w-6 h-6
                flex items-center justify-center
                transition-colors duration-300
              ">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Sidebar */}
      <div 
        className={`
          w-64 h-screen 
          bg-surface 
          border-r border-border 
          fixed left-0 top-0 flex flex-col z-50
          transform transition-all duration-300 ease-in-out
          shadow-lg
          ${isOpen 
            ? 'translate-x-0 lg:translate-x-0' 
            : '-translate-x-full lg:-translate-x-full'
          }
        `}
      >
        {/* Logo et header */}
        <div className="
          h-16 
          border-b border-border 
          px-4 
          flex items-center justify-between
          bg-surface/80
          backdrop-blur-sm
        ">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            {/* Logo */}
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl"></div>
              <div className="absolute top-1 left-1 w-8 h-8 text-white">
                <HiOutlineAcademicCap className="w-8 h-8" />
              </div>
            </div>
            
            {/* Nom de l'application */}
            <div>
              <span className="
                font-open-sans 
                text-lg font-bold 
                text-foreground 
                transition-colors duration-300
              ">
                CampusMaster
              </span>
              <p className="text-xs text-muted transition-colors duration-300">
                Administration
              </p>
            </div>
          </Link>
          
          {/* Bouton fermer pour mobile */}
          <button 
            onClick={onClose}
            className="
              lg:hidden 
              w-8 h-8 
              flex items-center justify-center 
              rounded-lg 
              hover:bg-surface-hover 
              text-foreground 
              transition-colors duration-300
            "
            aria-label="Fermer le menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-6">
          {/* Menu Principal */}
          <div className="mb-8">
            <p className="
              px-3 
              text-xs font-semibold 
              text-muted 
              uppercase tracking-wider 
              mb-3
              transition-colors duration-300
            ">
              Menu Principal
            </p>
            {renderNavItems(navItems.main)}
          </div>

          {/* Gestion */}
          <div className="mb-8">
            <p className="
              px-3 
              text-xs font-semibold 
              text-muted 
              uppercase tracking-wider 
              mb-3
              transition-colors duration-300
            ">
              Gestion
            </p>
            {renderNavItems(navItems.gestion)}
          </div>

          {/* Préférences */}
          <div className="mb-8">
            <p className="
              px-3 
              text-xs font-semibold 
              text-muted 
              uppercase tracking-wider 
              mb-3
              transition-colors duration-300
            ">
              Préférences
            </p>
            {renderNavItems(navItems.preferences)}
          </div>

          {/* Toggle thème en bas de la sidebar (visible sur desktop) */}
          <div className="mt-auto px-3 pt-6 border-t border-border hidden lg:block">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Thème</span>
              <ThemeToggleIcon />
            </div>
          </div>
        </div>

        {/* Footer - version mobile */}
        <div className="
          lg:hidden
          h-14 
          border-t border-border 
          px-4 
          flex items-center justify-between
          bg-surface/80
          backdrop-blur-sm
        ">
          <p className="text-xs text-muted">
            © 2024 CampusMaster
          </p>
          <ThemeToggleIcon />
        </div>
      </div>
    </>
  );
}
import { Home, BookOpen, FileText, Megaphone } from "lucide-react"
import { NavItem } from "@/types/navigation"

export const studentNav: NavItem[] = [
  { label: "Accueil", href: "/student", icon: Home },
  { label: "Cours", href: "/student/cours", icon: BookOpen },
  { label: "Devoirs", href: "/student/devoirs", icon: FileText },
  { label: "Annonces", href: "/student/annonces", icon: Megaphone },
]


export const TeacherNav : NavItem[] = [
  { label: "Accueil", href: "/teacher", icon: Home },
  { label: "Cours", href: "/teacher/cours", icon: BookOpen },
  { label: "Devoirs", href: "/teacher/devoirs", icon: FileText },
  { label: "Annonces", href: "/teacher/annonces", icon: Megaphone },
]
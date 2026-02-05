import { BookOpen, FileText, Megaphone, GraduationCap } from "lucide-react";
import QuickAccessCard from "./QuickAccessCard";

export default function QuickAccessGrid() {
  const quickAccessItems = [
    {
      title: "Mes Cours",
      description: "Accéder aux supports et ressources",
      href: "/cours",
      icon: <BookOpen className="w-5 h-5 md:w-6 md:h-6" />,
      count: "8 cours actifs",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Devoirs",
      description: "Soumettre et consulter vos travaux",
      href: "/devoirs",
      icon: <FileText className="w-5 h-5 md:w-6 md:h-6" />,
      count: "4 en attente",
      color: "text-amber-500 dark:text-amber-400"
    },
    {
      title: "Annonces",
      description: "Consulter les nouveaux annonces",
      href: "/annonces",
      icon: <Megaphone className="w-5 h-5 md:w-6 md:h-6" />,
      count: "12 nouveaux annonces",
      color: "text-green-500 dark:text-green-400"
    },
    {
      title: "Mes Notes",
      description: "Consulter vos résultats",
      href: "/notes",
      icon: <GraduationCap className="w-5 h-5 md:w-6 md:h-6" />,
      count: "Moyenne: 15.2/20",
      color: "text-purple-500 dark:text-purple-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
      {quickAccessItems.map((item, index) => (
        <QuickAccessCard key={index} {...item} />
      ))}
    </div>
  );
}
import { Bell } from "lucide-react";
import AnnouncementItem from "./AnnouncementItem";

interface Announcement {
  id: string;
  title: string;
  author: string;
  subject: string;
  date: string;
  tags: string[];
  excerpt: string;
  type: "alert" | "info" | "reminder";
}

export default function AnnouncementsSection() {
  const announcements: Announcement[] = [
    {
      id: "1",
      title: "Modification de l'horaire du cours de Statistiques",
      author: "Prof. Martin Dubois",
      subject: "Statistiques",
      date: "01/12/2025 10:30",
      tags: ["#urgent", "#horaire"],
      excerpt: "Le cours de statistiques du jeudi 7 décembre est déplacé au vendredi 8 décembre à 14h00 en salle B204. Merci de noter ce changement dans…",
      type: "alert"
    },
    {
      id: "2",
      title: "Nouvelle ressource disponible pour le projet ML",
      author: "Prof. Sophie Laurent",
      subject: "Informatique",
      date: "30/11/2025 16:45",
      tags: ["#ressources", "#projet"],
      excerpt: "Un nouveau dataset et des exemples de code sont maintenant disponibles dans la section ressources du cours de Machine Learning.",
      type: "info"
    },
    {
      id: "3",
      title: "Rappel: Inscription aux soutenances",
      author: "Administration",
      subject: "Général",
      date: "29/11/2025 09:15",
      tags: ["#soutenance", "#inscription"],
      excerpt: "N'oubliez pas de vous inscrire pour vos créneaux de soutenance avant le 5 décembre. Les inscriptions se font via le portail étudiant.",
      type: "reminder"
    }
  ];

  return (
    <div className="
      bg-surface 
      border border-border 
      rounded-lg 
      shadow-sm 
      p-4 md:p-6
      transition-colors duration-300
    ">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1 transition-colors duration-300">
            Annonces Récentes
          </h2>
          <p className="text-sm text-muted transition-colors duration-300">
            Dernières informations importantes
          </p>
        </div>
        <button 
          className="
            w-8 h-8 md:w-10 md:h-10 
            flex items-center justify-center 
            rounded-md 
            hover:bg-surface-hover 
            transition-colors duration-300
          "
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 md:w-5 md:h-5 text-foreground transition-colors duration-300" />
        </button>
      </div>

      <div className="space-y-3 md:space-y-4">
        {announcements.map((announcement) => (
          <AnnouncementItem key={announcement.id} {...announcement} />
        ))}
      </div>
    </div>
  );
}
import Link from "next/link";
import HomeworkItem from "./HomeworkItem";

interface Homework {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  daysLeft: string;
  priority: "urgent" | "medium" | "low";
  buttonText: string;
}

export default function HomeworkSection() {
  const homeworks: Homework[] = [
    {
      id: "1",
      title: "Projet de Machine Learning",
      subject: "Informatique",
      dueDate: "05/12/2025",
      daysLeft: "4 jours restants",
      priority: "urgent",
      buttonText: "Soumettre"
    },
    {
      id: "2",
      title: "Analyse Statistique des Données",
      subject: "Statistiques",
      dueDate: "08/12/2025",
      daysLeft: "7 jours restants",
      priority: "medium",
      buttonText: "Soumettre"
    },
    {
      id: "3",
      title: "Rapport de Recherche",
      subject: "Mathématiques",
      dueDate: "12/12/2025",
      daysLeft: "11 jours restants",
      priority: "medium",
      buttonText: "Soumettre"
    },
    {
      id: "4",
      title: "Présentation Orale",
      subject: "Physique",
      dueDate: "15/12/2025",
      daysLeft: "14 jours restants",
      priority: "low",
      buttonText: "Soumettre"
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6 gap-3">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1 transition-colors duration-300">
            Devoirs à Venir
          </h2>
          <p className="text-sm text-muted transition-colors duration-300">
            4 devoirs en attente
          </p>
        </div>
        <Link 
          href="/devoirs" 
          className="
            text-sm 
            text-primary 
            hover:text-primary/80 
            font-medium
            whitespace-nowrap
            transition-colors duration-300
            hover:underline
          "
        >
          Voir tout →
        </Link>
      </div>

      <div className="space-y-3 md:space-y-4">
        {homeworks.map((homework) => (
          <HomeworkItem key={homework.id} {...homework} />
        ))}
      </div>
    </div>
  );
}
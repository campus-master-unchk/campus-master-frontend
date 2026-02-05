import { Users, BookOpen, GraduationCap, TrendingUp } from "lucide-react";
import Card from "@/components/ui/Card";

export default function AdminStats() {
  const stats = [
    {
      title: "Utilisateurs actifs",
      value: "1,248",
      icon: <Users className="w-5 h-5 text-blue-600" />,
      change: "+12% ce mois",
      color: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Cours publiés",
      value: "156",
      icon: <BookOpen className="w-5 h-5 text-green-600" />,
      change: "+5 cette semaine",
      color: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "Taux de réussite",
      value: "89.2%",
      icon: <GraduationCap className="w-5 h-5 text-amber-600" />,
      change: "+2.3% vs dernier trimestre",
      color: "bg-amber-50 dark:bg-amber-900/20"
    },
    {
      title: "Engagement",
      value: "74%",
      icon: <TrendingUp className="w-5 h-5 text-purple-600" />,
      change: "-3.1% à surveiller",
      color: "bg-purple-50 dark:bg-purple-900/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className={`text-xs mt-1 ${
                stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 
                stat.change.startsWith('-') ? 'text-red-600 dark:text-red-400' : 
                'text-muted'
              }`}>
                {stat.change}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
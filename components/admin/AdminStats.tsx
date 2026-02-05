import { Users, BookOpen, GraduationCap, TrendingUp, Book } from "lucide-react";
import { PiChalkboardTeacherBold, PiStudentBold } from "react-icons/pi";
import Card from "@/components/ui/Card";
import { Analytics } from "@/types/analyticsType";

interface AdminStatsProps {
  totalStudents: number;
  totalTeachers: number;
  totalModules: number;
  totalCourses: number;
}

export default function AdminStats({ totalStudents, totalTeachers, totalModules, totalCourses }: AdminStatsProps) {
  const stats = [
    {
      title: "Étudiants",
      value: totalStudents,
      icon: <PiStudentBold className="w-5 h-5 text-blue-600" />,
      change: "+12% ce mois",
      color: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Professeurs",
      value: totalTeachers,
      icon: <PiChalkboardTeacherBold className="w-5 h-5 text-blue-600" />,
      change: "+12% ce mois",
      color: "bg-success-badge-bg"
    },
    {
      title: "Modules",
      value: totalModules,
      icon: <Book className="w-5 h-5 text-amber-600" />,
      change: "+2.3% vs dernier trimestre",
      color: "bg-amber-50 dark:bg-amber-900/20"
    },
    {
      title: "Cours publiés",
      value: totalCourses,
      icon: <BookOpen className="w-5 h-5 text-green-600" />,
      change: "+5 cette semaine",
      color: "bg-green-50 dark:bg-green-900/20"
    },
    
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
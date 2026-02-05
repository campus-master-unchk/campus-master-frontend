"use client";

import { useState } from 'react';
import { 
  UserPlus, 
  BookOpen, 
  FileText, 
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import Card from "@/components/ui/Card";

const activities = [
  {
    id: 1,
    user: "Marie Curie",
    action: "a soumis un devoir",
    target: "Projet de Machine Learning",
    time: "Il y a 2 heures",
    icon: <FileText className="w-4 h-4 text-blue-600" />,
    status: "success"
  },
  {
    id: 2,
    user: "Prof. Martin Dubois",
    action: "a publié un nouveau cours",
    target: "Statistiques Avancées",
    time: "Il y a 4 heures",
    icon: <BookOpen className="w-4 h-4 text-green-600" />,
    status: "info"
  },
  {
    id: 3,
    user: "Admin système",
    action: "a ajouté un nouvel utilisateur",
    target: "Étudiant - Jean Dupont",
    time: "Il y a 6 heures",
    icon: <UserPlus className="w-4 h-4 text-purple-600" />,
    status: "warning"
  },
  {
    id: 4,
    user: "Prof. Sophie Laurent",
    action: "a envoyé un message",
    target: "Groupe Master 2 Informatique",
    time: "Il y a 1 jour",
    icon: <MessageSquare className="w-4 h-4 text-amber-600" />,
    status: "info"
  },
  {
    id: 5,
    user: "Système",
    action: "Maintenance planifiée",
    target: "Samedi 15 décembre 02h00-04h00",
    time: "Il y a 2 jours",
    icon: <Clock className="w-4 h-4 text-gray-600" />,
    status: "neutral"
  }
];

export default function RecentActivity() {
  const [filter, setFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'success': return 'text-green-600 dark:text-green-400';
      case 'warning': return 'text-amber-600 dark:text-amber-400';
      case 'info': return 'text-blue-600 dark:text-blue-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'success': return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'warning': return <XCircle className="w-3 h-3 text-amber-500" />;
      default: return null;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Activités récentes
        </h3>
        <div className="flex items-center gap-2">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm border border-border rounded-md px-3 py-1 bg-surface"
          >
            <option value="all">Toutes les activités</option>
            <option value="students">Étudiants</option>
            <option value="teachers">Enseignants</option>
            <option value="system">Système</option>
          </select>
          <button className="text-sm text-primary hover:underline">
            Voir tout
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div 
            key={activity.id}
            className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-surface-hover transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5">
              {activity.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-foreground">
                  {activity.user}
                </span>
                <span className="text-sm text-muted">
                  {activity.action}
                </span>
                {getStatusIcon(activity.status)}
              </div>
              
              <p className="text-sm text-foreground font-medium truncate">
                {activity.target}
              </p>
              
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted">
                  {activity.time}
                </span>
                <span className={`text-xs font-medium ${getStatusColor(activity.status)}`}>
                  {activity.status === 'success' ? 'Réussi' : 
                   activity.status === 'warning' ? 'Attention' : 
                   activity.status === 'info' ? 'Information' : 'Neutre'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
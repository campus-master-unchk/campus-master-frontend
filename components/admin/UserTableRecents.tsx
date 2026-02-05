"use client";

import { useState } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield,
  MoreVertical,
  CheckCircle,
  XCircle
} from "lucide-react";
import Card from "@/components/ui/Card";

interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  joined: string;
  status: 'active' | 'inactive' | 'pending';
}

interface UserTableProps {
  limit?: number;
}

export default function UserTableRecents({ limit }: UserTableProps) {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Jean Dupont", email: "jean.dupont@campus.fr", role: 'student', joined: "15/09/2024", status: 'active' },
    { id: 2, name: "Prof. Martin Dubois", email: "martin.dubois@campus.fr", role: 'teacher', joined: "01/09/2024", status: 'active' },
    { id: 3, name: "Marie Curie", email: "marie.curie@campus.fr", role: 'student', joined: "20/09/2024", status: 'active' },
    { id: 4, name: "Admin Sophie", email: "admin@campus.fr", role: 'admin', joined: "01/08/2024", status: 'active' },
    { id: 5, name: "Prof. Sophie Laurent", email: "sophie.laurent@campus.fr", role: 'teacher', joined: "05/09/2024", status: 'pending' },
    { id: 6, name: "Pierre Martin", email: "pierre.martin@campus.fr", role: 'student', joined: "10/09/2024", status: 'inactive' },
  ]);

  const displayedUsers = limit ? users.slice(0, limit) : users;

  const getRoleColor = (role: string) => {
    switch(role) {
      case 'admin': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'teacher': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'student': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'active': return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'inactive': return <XCircle className="w-3 h-3 text-red-500" />;
      case 'pending': return <div className="w-3 h-3 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />;
      default: return null;
    }
  };

  const getRoleIcon = (role: string) => {
    switch(role) {
      case 'admin': return <Shield className="w-3 h-3" />;
      case 'teacher': return <User className="w-3 h-3" />;
      case 'student': return <User className="w-3 h-3" />;
      default: return <User className="w-3 h-3" />;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-medium text-muted">Utilisateur</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted">Rôle</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted">Statut</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((user) => (
            <tr key={user.id} className="border-b border-border hover:bg-surface-hover transition-colors">
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <div className="flex items-center gap-1 text-xs text-muted">
                      <Mail className="w-3 h-3" />
                      <span>{user.email}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-1 rounded-md text-xs font-medium ${getRoleColor(user.role)}`}>
                    <div className="flex items-center gap-1">
                      {getRoleIcon(user.role)}
                      <span>
                        {user.role === 'admin' ? 'Administrateur' : 
                         user.role === 'teacher' ? 'Enseignant' : 'Étudiant'}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(user.status)}
                  <span className="text-sm capitalize">
                    {user.status === 'active' ? 'Actif' : 
                     user.status === 'inactive' ? 'Inactif' : 'En attente'}
                  </span>
                </div>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
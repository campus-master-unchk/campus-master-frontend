"use client";

import { useState } from 'react';
import { 
  User as UserIcon, 
  Mail, 
  Shield,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { User } from '@/types/userType';

interface UserTableProps {
  limit?: number;
  users?: User[];
}

export default function UserTableRecents({ limit, users }: UserTableProps) {

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
      case 'teacher': return <UserIcon className="w-3 h-3" />;
      case 'student': return <UserIcon className="w-3 h-3" />;
      default: return <UserIcon className="w-3 h-3" />;
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
          {users?.map((user) => (
            <tr key={user.id} className="border-b border-border hover:bg-surface-hover transition-colors">
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{user.first_name + " " + user.last_name}</p>
                    <div className="flex items-center gap-1 text-xs text-muted">
                      <Mail className="w-3 h-3" />
                      <span>{user.email}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-1 rounded-md text-xs font-medium ${getRoleColor(user.user_type)}`}>
                    <div className="flex items-center gap-1">
                      {getRoleIcon(user.user_type)}
                      <span>
                        {user.user_type === 'teacher' ? 'Enseignant' : 'Étudiant'}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(user?.status)}
                  <span className="text-sm capitalize">
                    {user?.status === 'active' ? 'Actif' : 
                     user?.status === 'inactive' ? 'Inactif' : 'En attente'}
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
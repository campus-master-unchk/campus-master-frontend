"use client";

import { X, User, Mail, Calendar, Shield, CheckCircle, XCircle, Clock } from "lucide-react";
import {User as UserType} from '@/types/userType'

interface ViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
}

export default function ViewUserModal({ isOpen, onClose, user }: ViewUserModalProps) {
  if (!isOpen || !user) return null;

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-red-500 dark:text-red-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400" />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'pending': return 'En attente';
      default: return '';
    }
  };

  const getRoleText = (role: string) => {
    switch(role) {
      case 'admin': return 'Administrateur';
      case 'teacher': return 'Enseignant';
      case 'student': return 'Étudiant';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4 transition-colors duration-300">
      <div className="bg-surface border border-border rounded-lg w-full max-w-md shadow-xl transition-colors duration-300">
        {/* En-tête */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">{user.name}</h3>
              <p className="text-sm text-muted">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-md hover:bg-surface/50 transition-colors"
          >
            <X className="w-5 h-5 text-muted" />
          </button>
        </div>

        {/* Informations */}
        <div className="p-6 space-y-4">
          {/* Rôle */}
          <div className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-muted" />
              <div>
                <p className="text-sm text-muted">Rôle</p>
                <p className="font-medium text-foreground">{getRoleText(user.role)}</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              user.role === 'admin' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
              user.role === 'teacher' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
              'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
            }`}>
              {user.role.toUpperCase()}
            </div>
          </div>

          {/* Statut */}
          <div className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
            <div className="flex items-center gap-3">
              {getStatusIcon(user.status)}
              <div>
                <p className="text-sm text-muted">Statut</p>
                <p className="font-medium text-foreground">{getStatusText(user.status)}</p>
              </div>
            </div>
            <span className={`text-sm font-medium ${
              user.status === 'active' ? 'text-green-600 dark:text-green-400' :
              user.status === 'inactive' ? 'text-red-600 dark:text-red-400' : 
              'text-amber-600 dark:text-amber-400'
            }`}>
              {getStatusText(user.status)}
            </span>
          </div>

          {/* Date d'inscription */}
          <div className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-muted" />
              <div>
                <p className="text-sm text-muted">Date d'inscription</p>
                <p className="font-medium text-foreground">{user.createdAt}</p>
              </div>
            </div>
          </div>

          {/* ID utilisateur */}
          <div className="p-4 bg-surface/50 rounded-lg">
            <p className="text-sm text-muted mb-1">ID Utilisateur</p>
            <p className="font-mono text-foreground">#{user.id.toString().padStart(6, '0')}</p>
          </div>
        </div>

        {/* Pied de page */}
        <div className="flex justify-end gap-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-border rounded-lg hover:bg-surface/50 text-foreground transition-colors duration-300"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
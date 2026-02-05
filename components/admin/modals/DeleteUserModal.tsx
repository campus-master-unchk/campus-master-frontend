"use client";

import { AlertTriangle, User, Mail, Shield } from "lucide-react";
import {User as UserType} from '@/types/userType'

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
  onDelete: (userId: number) => void;
}

export default function DeleteUserModal({ isOpen, onClose, user, onDelete }: DeleteUserModalProps) {
  if (!isOpen || !user) return null;

  const handleDelete = () => {
    onDelete(user.id);
    onClose();
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
        {/* En-tête avec avertissement */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Supprimer l'utilisateur</h3>
              <p className="text-sm text-muted">Cette action est irréversible</p>
            </div>
          </div>
        </div>

        {/* Détails de l'utilisateur */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{user.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="w-3 h-3 text-muted" />
                <p className="text-sm text-muted">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted">Rôle</span>
              <div className="flex items-center gap-2">
                <Shield className="w-3 h-3 text-muted" />
                <span className="font-medium text-foreground">{getRoleText(user.role)}</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted">ID Utilisateur</span>
              <span className="font-mono text-foreground">#{user.id.toString().padStart(6, '0')}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted">Date d'inscription</span>
              <span className="text-foreground">{user.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Avertissements */}
        <div className="p-6 border-b border-border">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">
                Toutes les données associées à cet utilisateur seront définitivement supprimées.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">
                Les cours créés, les messages et les activités seront également supprimés.
              </p>
            </div>
            {user.role === 'teacher' && (
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-foreground">
                  Attention : Cet utilisateur est enseignant. Ses cours seront affectés.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Confirmation */}
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Tapez "SUPPRIMER" pour confirmer
            </label>
            <input
              type="text"
              placeholder='Écrivez "SUPPRIMER" ici'
              className="w-full bg-surface border border-border rounded-lg px-4 py-2 
                       text-foreground placeholder:text-muted
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       transition-colors duration-300"
              id="confirm-delete"
            />
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-border rounded-lg 
                       hover:bg-surface/50 text-foreground
                       transition-colors duration-300"
            >
              Annuler
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg 
                       hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed
                       transition-colors duration-300"
              disabled={true} // À activer seulement si l'input contient "SUPPRIMER"
              id="delete-button"
            >
              Supprimer définitivement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
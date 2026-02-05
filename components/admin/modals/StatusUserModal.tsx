"use client";

import { useState } from 'react';
import { X, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import {User as UserType} from '@/types/userType'

interface StatusUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
  onStatusChange: (userId: number, newStatus: UserType['status']) => void;
}

export default function StatusUserModal({ isOpen, onClose, user, onStatusChange }: StatusUserModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<UserType['status']>(user?.status || 'active');
  const [reason, setReason] = useState('');

  if (!isOpen || !user) return null;

  const statusOptions = [
    { value: 'active' as const, label: 'Actif', icon: CheckCircle, color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-50 dark:bg-green-900/20', description: 'L\'utilisateur a accès à toutes les fonctionnalités' },
    { value: 'inactive' as const, label: 'Inactif', icon: XCircle, color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-50 dark:bg-red-900/20', description: 'L\'utilisateur ne peut plus se connecter' },
    { value: 'pending' as const, label: 'En attente', icon: Clock, color: 'text-amber-600 dark:text-amber-400', bgColor: 'bg-amber-50 dark:bg-amber-900/20', description: 'En attente de validation ou d\'activation' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStatus !== user.status) {
      onStatusChange(user.id, selectedStatus);
    }
    onClose();
  };

  const getCurrentStatus = () => {
    return statusOptions.find(opt => opt.value === user.status);
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4 transition-colors duration-300">
      <div className="bg-surface border border-border rounded-lg w-full max-w-md shadow-xl transition-colors duration-300">
        {/* En-tête */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-xl font-semibold text-foreground">Changer le statut</h3>
            <p className="text-sm text-muted">{user.name}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-md hover:bg-surface/50 transition-colors"
          >
            <X className="w-5 h-5 text-muted" />
          </button>
        </div>

        {/* Statut actuel */}
        <div className="p-6 border-b border-border">
          <p className="text-sm text-muted mb-2">Statut actuel</p>
          <div className="flex items-center gap-3 p-3 bg-surface/50 rounded-lg">
            {/* {getCurrentStatus()?.icon && (
              <getCurrentStatus().icon
                className={`w-5 h-5 ${getCurrentStatus()?.color}`}
              />
            )} */}
            <div>
              <p className="font-medium text-foreground">{getCurrentStatus()?.label}</p>
              <p className="text-sm text-muted">{getCurrentStatus()?.description}</p>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nouveau statut */}
          <div>
            <p className="text-sm font-medium text-foreground mb-3">Sélectionner le nouveau statut</p>
            <div className="space-y-2">
              {statusOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-300 ${
                    selectedStatus === option.value 
                      ? `${option.bgColor} border border-primary/30` 
                      : 'hover:bg-surface/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={selectedStatus === option.value}
                    onChange={(e) => setSelectedStatus(e.target.value as UserType['status'])}
                    className="sr-only"
                  />
                  <div className={`p-2 rounded-md ${option.bgColor}`}>
                    <option.icon className={`w-4 h-4 ${option.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{option.label}</p>
                    <p className="text-xs text-muted">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Raison du changement (optionnel) */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Raison du changement (optionnel)
              </div>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ex: Demande de l'utilisateur, inactivité prolongée, etc."
              className="w-full h-24 bg-surface border border-border rounded-lg px-4 py-2 
                       text-foreground placeholder:text-muted
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       transition-colors duration-300 resize-none"
            />
          </div>

          {/* Avertissement si changement important */}
          {(selectedStatus === 'inactive' && user.status !== 'inactive') && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-800 dark:text-red-300">
                    Attention : Désactivation de compte
                  </p>
                  <p className="text-xs text-red-700 dark:text-red-400 mt-1">
                    L'utilisateur ne pourra plus se connecter à son compte jusqu'à réactivation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pied de page */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border rounded-lg 
                       hover:bg-surface/50 text-foreground
                       transition-colors duration-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg 
                       hover:bg-primary/90 transition-colors duration-300"
              disabled={selectedStatus === user.status}
            >
              Confirmer le changement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
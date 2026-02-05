"use client";

import { useState } from 'react';
import { X, User, Mail, Shield, Calendar } from "lucide-react";
import { User as UserType, Department, Specialty, Level } from "@/types/userType";


interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
  onSave: (userData: Partial<UserType>) => void;
   departments: Department[];
  specialties: Specialty[];
  levels: Level[];
}

export default function EditUserModal({ isOpen, onClose, user, onSave }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'student',
  });

  if (!isOpen || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: user.id,
      ...formData
    });
    onClose();
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4 transition-colors duration-300">
      <div className="bg-surface border border-border rounded-lg w-full max-w-md shadow-xl transition-colors duration-300">
        {/* En-tête */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Modifier l'utilisateur</h3>
              <p className="text-sm text-muted">ID: #{user.id.toString().padStart(6, '0')}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-md hover:bg-surface/50 transition-colors"
          >
            <X className="w-5 h-5 text-muted" />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Nom complet
              </div>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-4 py-2 
                       text-foreground placeholder:text-muted
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       transition-colors duration-300"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </div>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-4 py-2 
                       text-foreground placeholder:text-muted
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       transition-colors duration-300"
              required
            />
          </div>

          {/* Rôle */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Rôle
              </div>
            </label>
            <select
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-4 py-2 
                       text-foreground focus:outline-none focus:ring-2 focus:ring-primary
                       transition-colors duration-300"
            >
              <option value="student">Étudiant</option>
              <option value="teacher">Enseignant</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>

          {/* Date d'inscription (non modifiable) */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date d'inscription
              </div>
            </label>
            <input
              type="text"
              value={user.createdAt}
              disabled
              className="w-full bg-surface/50 border border-border rounded-lg px-4 py-2 
                       text-foreground/70 cursor-not-allowed
                       transition-colors duration-300"
            />
            <p className="text-xs text-muted mt-1">Cette information ne peut pas être modifiée</p>
          </div>

          {/* Pied de page */}
          <div className="flex justify-end gap-3 pt-6 border-t border-border">
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
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
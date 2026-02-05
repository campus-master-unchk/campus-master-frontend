"use client";

import { X } from "lucide-react";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddUserModal({ isOpen, onClose }: AddUserModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4 transition-colors duration-300">
      <div className="bg-surface border border-border rounded-lg w-full max-w-md shadow-xl transition-colors duration-300">
        {/* En-tête */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-xl font-semibold text-foreground">Ajouter un nouvel utilisateur</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-md hover:bg-surface/50 transition-colors"
          >
            <X className="w-5 h-5 text-muted" />
          </button>
        </div>

        {/* Formulaire */}
        <form className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Nom complet
            </label>
            <input
              type="text"
              className="w-full bg-surface border border-border rounded-lg px-4 py-2 
                       text-foreground placeholder:text-muted
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       transition-colors duration-300"
              placeholder="Jean Dupont"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full bg-surface border border-border rounded-lg px-4 py-2 
                       text-foreground placeholder:text-muted
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       transition-colors duration-300"
              placeholder="jean.dupont@campus.fr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Rôle
            </label>
            <select className="w-full bg-surface border border-border rounded-lg px-4 py-2 
                             text-foreground focus:outline-none focus:ring-2 focus:ring-primary
                             transition-colors duration-300">
              <option value="student">Étudiant</option>
              <option value="teacher">Enseignant</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Mot de passe temporaire
            </label>
            <input
              type="password"
              className="w-full bg-surface border border-border rounded-lg px-4 py-2 
                       text-foreground placeholder:text-muted
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       transition-colors duration-300"
              placeholder="••••••••"
            />
          </div>
        </form>

        {/* Pied de page */}
        <div className="flex justify-end gap-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-border rounded-lg 
                     hover:bg-surface/50 text-foreground
                     transition-colors duration-300"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              // Logique d'ajout
              onClose();
            }}
            className="px-4 py-2 bg-primary text-white rounded-lg 
                     hover:bg-primary/90 transition-colors duration-300"
          >
            Créer l'utilisateur
          </button>
        </div>
      </div>
    </div>
  );
}
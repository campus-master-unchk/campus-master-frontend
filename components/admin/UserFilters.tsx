"use client";

import { Search, Filter } from "lucide-react";

interface Filters {
  role: string;
  status: string;
  search: string;
}

interface UserFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters | ((prev: Filters) => Filters)) => void;
}

export default function UserFilters({ filters, onFilterChange }: UserFiltersProps) {
   const handleChange = (key: keyof Filters, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 transition-colors duration-300">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Barre de recherche */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={filters.search}
              onChange={(e) => handleChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg 
                       text-foreground placeholder:text-muted
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       transition-colors duration-300"
            />
          </div>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-3">
          {/* Filtre par rôle */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted" />
            <select
              value={filters.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className="bg-surface border border-border rounded-lg px-3 py-2 
                       text-foreground focus:outline-none focus:ring-2 focus:ring-primary
                       transition-colors duration-300"
            >
              <option value="all">Tous les rôles</option>
              <option value="admin">Administrateur</option>
              <option value="teacher">Enseignant</option>
              <option value="student">Étudiant</option>
            </select>
          </div>

          {/* Filtre par statut */}
          <select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="bg-surface border border-border rounded-lg px-3 py-2 
                     text-foreground focus:outline-none focus:ring-2 focus:ring-primary
                     transition-colors duration-300"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
            <option value="pending">En attente</option>
          </select>

          {/* Bouton réinitialiser */}
          <button
            onClick={() => onFilterChange({ role: 'all', status: 'all', search: '' })}
            className="px-4 py-2 border border-border rounded-lg 
                     hover:bg-surface/50 text-foreground
                     transition-colors duration-300"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
}
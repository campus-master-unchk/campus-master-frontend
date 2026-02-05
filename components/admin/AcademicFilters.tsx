// components/admin/AcademicFilters.tsx
"use client";

import { Building, GraduationCap, BookOpen } from "lucide-react";
import { Department, Specialty, Level } from "@/types/userType";

interface AcademicFiltersProps {
  departments: Department[];
  specialties: Specialty[];
  levels: Level[];
  filters: {
    role: string;
    status: string;
    search: string;
    department: string;
    specialty: string;
    level: string;
  };
  onFilterChange: (filters: any) => void;
}

export default function AcademicFilters({ 
  departments, 
  specialties, 
  levels, 
  filters, 
  onFilterChange 
}: AcademicFiltersProps) {
  
  const handleChange = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  // Filtrer les spécialités par département sélectionné
  const filteredSpecialties = filters.department
    ? specialties.filter(s => s.departmentId === parseInt(filters.department))
    : specialties;

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Filtre par département */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <Building className="w-4 h-4" />
            Département
          </label>
          <select
            value={filters.department}
            onChange={(e) => handleChange('department', e.target.value)}
            className="w-full bg-surface border border-border rounded-lg px-3 py-2 
                     text-foreground focus:outline-none focus:ring-2 focus:ring-primary
                     transition-colors duration-300"
          >
            <option value="">Tous les départements</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>
                {dept.name} ({dept.code})
              </option>
            ))}
          </select>
        </div>

        {/* Filtre par spécialité */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <BookOpen className="w-4 h-4" />
            Spécialité
          </label>
          <select
            value={filters.specialty}
            onChange={(e) => handleChange('specialty', e.target.value)}
            className="w-full bg-surface border border-border rounded-lg px-3 py-2 
                     text-foreground focus:outline-none focus:ring-2 focus:ring-primary
                     transition-colors duration-300"
            disabled={!filters.department}
          >
            <option value="">Toutes les spécialités</option>
            {filteredSpecialties.map(spec => (
              <option key={spec.id} value={spec.id}>
                {spec.name}
              </option>
            ))}
          </select>
          {!filters.department && (
            <p className="text-xs text-muted mt-1">Sélectionnez d'abord un département</p>
          )}
        </div>

        {/* Filtre par niveau */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <GraduationCap className="w-4 h-4" />
            Niveau
          </label>
          <select
            value={filters.level}
            onChange={(e) => handleChange('level', e.target.value)}
            className="w-full bg-surface border border-border rounded-lg px-3 py-2 
                     text-foreground focus:outline-none focus:ring-2 focus:ring-primary
                     transition-colors duration-300"
          >
            <option value="">Tous les niveaux</option>
            {levels.map(level => (
              <option key={level.id} value={level.id}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        {/* Bouton réinitialiser */}
        <div className="flex items-end">
          <button
            onClick={() => onFilterChange({
              role: filters.role,
              status: filters.status,
              search: filters.search,
              department: '',
              specialty: '',
              level: ''
            })}
            className="w-full px-4 py-2 border border-border rounded-lg 
                     hover:bg-surface/50 text-foreground
                     transition-colors duration-300"
          >
            Réinitialiser filtres académiques
          </button>
        </div>
      </div>
    </div>
  );
}
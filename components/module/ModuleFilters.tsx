"use client";

import { Department, Level, Speciality } from "@/types/academic";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  departments: Department[];
  departmentId: number | null;
  onDepartmentChange: (value: number | null) => void;
  levels: Level[];
  levelId: number | null;
  onLevelChange: (value: number | null) => void;
  specialities: Speciality[];
  specialityId: number | null;
  onSpecialityChange: (value: number | null) => void;
}

export default function ModuleFilters({
  search,
  onSearchChange,
  departments,
  departmentId,
  onDepartmentChange,
  levels,
  levelId,
  onLevelChange,
  specialities,
  specialityId,
  onSpecialityChange,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-center">
      <input
        type="text"
        placeholder="Rechercher par nom..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="border border-border rounded px-3 py-2 w-full sm:w-64"
      />

      <select
        value={departmentId || ''}
        onChange={e => onDepartmentChange(e.target.value ? Number(e.target.value) : null)}
        className="border border-border rounded px-3 py-2"
      >
        <option value="">Tous les départements</option>
        {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>

      <select
        value={levelId || ''}
        onChange={e => onLevelChange(e.target.value ? Number(e.target.value) : null)}
        className="border border-border rounded px-3 py-2"
      >
        <option value="">Tous les niveaux</option>
        {levels.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
      </select>

      <select
        value={specialityId || ''}
        onChange={e => onSpecialityChange(e.target.value ? Number(e.target.value) : null)}
        className="border border-border rounded px-3 py-2"
      >
        <option value="">Toutes les spécialités</option>
        {specialities.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
    </div>
  );
}

"use client";

import Select from "react-select";
import { Department, Level, Speciality } from "@/types/academic";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  role: "teacher" | "student" | null;
  onRoleChange: (value: "teacher" | "student" | null) => void;
  status: "active" | "inactive" | null;
  onStatusChange: (value: "active" | "inactive" | null) => void;
  departments: Department[];
  departmentId: number | null;
  onDepartmentChange: (id: number | null) => void;
  levels: Level[];
  levelId: number | null;
  onLevelChange: (id: number | null) => void;
  specialities: Speciality[];
  specialityId: number | null;
  onSpecialityChange: (id: number | null) => void;
}

export default function UserFilters({
  search,
  onSearchChange,
  role,
  onRoleChange,
  status,
  onStatusChange,
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
  // Options pour React-Select
  const departmentOptions = departments.map((d) => ({ value: d.id, label: d.name }));
  const levelOptions = levels.map((l) => ({ value: l.id, label: l.name }));
  const specialityOptions = specialities.map((s) => ({ value: s.id, label: s.name }));

  return (
    <div className="flex flex-wrap gap-4 items-end">
      {/* Recherche */}
      <div>
        <label className="text-sm text-muted block mb-1">Recherche</label>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Nom ou email"
          className="border border-border rounded px-3 py-2 w-48 bg-background text-foreground"
        />
      </div>

      {/* Rôle */}
      <div>
        <label className="text-sm text-muted block mb-1">Rôle</label>
        <select
          value={role || ""}
          onChange={(e) =>
            onRoleChange(e.target.value ? (e.target.value as "teacher" | "student") : null)
          }
          className="border border-border rounded px-3 py-2 bg-background text-foreground"
        >
          <option value="">Tous</option>
          <option value="student">Étudiant</option>
          <option value="teacher">Enseignant</option>
        </select>
      </div>

      {/* Statut */}
      <div>
        <label className="text-sm text-muted block mb-1">Statut</label>
        <select
          value={status || ""}
          onChange={(e) =>
            onStatusChange(e.target.value ? (e.target.value as "active" | "inactive") : null)
          }
          className="border border-border rounded px-3 py-2 bg-background text-foreground"
        >
          <option value="">Tous</option>
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
        </select>
      </div>

      {/* Département */}
      <div>
        <label className="text-sm text-muted block mb-1">Département</label>
        <Select
          options={departmentOptions}
          value={departmentOptions.find((opt) => opt.value === departmentId) || null}
          onChange={(v) => onDepartmentChange(v?.value ?? null)}
          isClearable
          className="w-48"
        />
      </div>

      {/* Niveau */}
      <div>
        <label className="text-sm text-muted block mb-1">Niveau</label>
        <Select
          options={levelOptions}
          value={levelOptions.find((opt) => opt.value === levelId) || null}
          onChange={(v) => onLevelChange(v?.value ?? null)}
          isClearable
          className="w-48"
        />
      </div>

      {/* Spécialité */}
      <div>
        <label className="text-sm text-muted block mb-1">Spécialité</label>
        <Select
          options={specialityOptions}
          value={specialityOptions.find((opt) => opt.value === specialityId) || null}
          onChange={(v) => onSpecialityChange(v?.value ?? null)}
          isClearable
          className="w-48"
        />
      </div>
    </div>
  );
}

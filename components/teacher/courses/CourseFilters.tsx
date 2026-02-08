"use client";

import { useEffect } from "react";
import { useAcademicStore } from "@/store/admin/academic.store";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  state: "published" | "draft" | null;
  onStateChange: (v: "published" | "draft" | null) => void;
  moduleId: number | null;
  onModuleChange: (v: number | null) => void;
  modules: number[];
}

export default function CourseFilters({
  search,
  onSearchChange,
  state,
  onStateChange,
  moduleId,
  onModuleChange,
  modules,
}: Props) {

    const {modules: modulesData , fetchModules} = useAcademicStore();

    useEffect(() => {
        fetchModules();
    }, [fetchModules]);


  return (
    <div className="flex flex-wrap gap-4 mb-6 items-end">
      {/* Recherche */}
      <div>
        <label className="text-sm block mb-1">Recherche</label>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Nom du cours"
          className="border rounded px-3 py-2 w-48"
        />
      </div>

      {/* Module */}
      <div>
        <label className="text-sm block mb-1">Module</label>
        <select
          value={moduleId ?? ""}
          onChange={(e) =>
            onModuleChange(e.target.value ? Number(e.target.value) : null)
          }
          className="border rounded px-3 py-2 w-48"
        >
          <option value="">Tous</option>
          {modulesData.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      {/* Statut */}
      <div>
        <label className="text-sm block mb-1">Statut</label>
        <select
          value={state ?? ""}
          onChange={(e) =>
            onStateChange(
              e.target.value
                ? (e.target.value as "published" | "draft")
                : null
            )
          }
          className="border rounded px-3 py-2 w-40"
        >
          <option value="">Tous</option>
          <option value="published">Publié</option>
          <option value="draft">Brouillon</option>
        </select>
      </div>
    </div>
  );
}

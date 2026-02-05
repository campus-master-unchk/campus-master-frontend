"use client";

import { useEffect, useState } from "react";
import Table from "@/components/ui/Table";
import LevelFilters from "@/components/level/LevelFilters";
import LevelModal from "@/components/level/LevelModal";
import { getLevelColumns, getLevelActions } from "@/components/level/LevelColumns";
import { useAcademicStore } from "@/store/admin/academic.store";
import { Level } from "@/types/academic";
import { toast } from "sonner";

export default function LevelPage() {
  const {
    levels,
    loading,
    fetchLevels,
    addLevel,
    updateLevel,
    deleteLevel,
  } = useAcademicStore();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Level | null>(null);

  useEffect(() => {
    fetchLevels();
  }, [fetchLevels]);

  const filteredLevels = Array.isArray(levels)
    ? levels.filter((l) =>
        l.name?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const handleSave = async (data: { name: string }) => {
    try {
      selected
        ? await updateLevel(selected.id, data)
        : await addLevel(data);

      toast.success("Niveau enregistré");
      fetchLevels();
    } catch {
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  const handleDelete = async (level: Level) => {
    try {
      await deleteLevel(level.id);
      toast.success("Niveau supprimé");
      fetchLevels();
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Niveaux</h1>
        <button
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Ajouter
        </button>
      </div>

      <LevelFilters search={search} onSearchChange={setSearch} />

      <Table
        data={filteredLevels}
        columns={getLevelColumns()}
        actions={getLevelActions(
          (l) => {
            setSelected(l);
            setOpen(true);
          },
          handleDelete
        )}
        isLoading={loading.levels}
        emptyMessage="Aucun niveau"
      />

      {open && (
        <LevelModal
          level={selected}
          onClose={() => setOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

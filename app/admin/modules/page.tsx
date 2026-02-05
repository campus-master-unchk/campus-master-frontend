"use client";

import { useEffect, useMemo, useState } from "react";
import Table from "@/components/ui/Table";
import ModuleFilters from "@/components/module/ModuleFilters";
import ModuleModal from "@/components/module/ModuleModal";
import ShowModuleModal from "@/components/module/ShowModuleModal";
import { getModuleColumns, getModuleActions } from "@/components/module/ModuleColumns";

import { useAcademicStore } from "@/store/admin/academic.store";
import { Module } from "@/types/academic";
import Swal from "sweetalert2";
import { toast } from "sonner";

export default function ModulePage() {
  const {
    modules,
    departments,
    levels,
    specialities,
    loading,
    fetchModules,
    fetchDepartments,
    fetchLevels,
    fetchSpecialities,
    addModule,
    updateModule,
    deleteModule
  } = useAcademicStore();

  const [search, setSearch] = useState('');
  const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [levelId, setLevelId] = useState<number | null>(null);
  const [specialityId, setSpecialityId] = useState<number | null>(null);

  const [selected, setSelected] = useState<Module | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);

  /* ---------------- Fetch ---------------- */
  const fetchData = async () => {
    await fetchModules();
    await fetchDepartments();
    await fetchLevels();
    await fetchSpecialities();
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ---------------- Filters ---------------- */
  const filteredModules = useMemo(() => {
    if (!Array.isArray(modules)) return [];

    return modules.filter(m => {
      const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
      const matchDepartment = !departmentId || m.department_id === departmentId;
      const matchLevel = !levelId || m.level_id === levelId;
      const matchSpeciality = !specialityId || m.specialty_id === specialityId;

      return matchSearch && matchDepartment && matchLevel && matchSpeciality;
    });
  }, [modules, search, departmentId, levelId, specialityId]);

  /* ---------------- Actions ---------------- */
  const handleAdd = () => {
    setSelected(null);
    setIsModalOpen(true);
  };
  const handleEdit = (module: Module) => {
    setSelected(module);
    setIsModalOpen(true);
  };
  const handleShow = (module: Module) => {
    setSelected(module);
    setIsShowModalOpen(true);
  };
  const handleDelete = async (module: Module) => {
    const result = await Swal.fire({
      title: "Supprimer le module ?",
      text: `Le module "${module.name}" sera supprimé.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler"
    });
    if (!result.isConfirmed) return;

    try {
      await deleteModule(module.id);
      await fetchModules();
      toast.success("Module supprimé");
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleSave = async (formData: FormData) => {
    try {
      if (selected) {
        await updateModule(selected.id, formData);
        toast.success("Module mis à jour");
      } else {
        await addModule(formData);
        toast.success("Module créé");
      }

      await fetchModules();
      setIsModalOpen(false);
    } catch {
      toast.error("Erreur lors de l’enregistrement");
    }
  };

  console.log("filteredModules", modules)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Modules</h1>
        <button onClick={handleAdd} className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">+ Ajouter</button>
      </div>

      {/* Filters */}
      <ModuleFilters
        search={search}
        onSearchChange={setSearch}
        departments={departments}
        departmentId={departmentId}
        onDepartmentChange={setDepartmentId}
        levels={levels}
        levelId={levelId}
        onLevelChange={setLevelId}
        specialities={specialities}
        specialityId={specialityId}
        onSpecialityChange={setSpecialityId}
      />

      {/* Table */}
      <Table
        data={filteredModules}
        columns={getModuleColumns()}
        actions={getModuleActions(handleEdit, handleDelete, handleShow)}
        isLoading={loading.modules}
        emptyMessage="Aucun module trouvé"
        striped
        hoverable
        bordered
      />

      {/* Modals */}
      {isModalOpen && selected !== undefined && (
        <ModuleModal
          module={selected}
          departments={departments}
          levels={levels}
          specialities={specialities}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
      {isShowModalOpen && selected !== null && (
        <ShowModuleModal
          module={selected}
          departments={departments}
          levels={levels}
          specialities={specialities}
          onClose={() => setIsShowModalOpen(false)}
        />
      )}
    </div>
  );
}

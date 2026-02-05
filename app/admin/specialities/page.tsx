"use client";

import { useEffect, useMemo, useState } from "react";
import Table from "@/components/ui/Table";
import SpecialityModal from "@/components/speciality/SpecialityModal";
import SpecialityFilters from "@/components/speciality/SpecialityFilters";
import {
  getSpecialityColumns,
  getSpecialityActions,
} from "@/components/speciality/SpecialityColumns";

import { useAcademicStore } from "@/store/admin/academic.store";
import { Speciality } from "@/types/academic";
import { toast } from "sonner";
import Swal from "sweetalert2";
import ShowSpecialityModal from "@/components/speciality/ShowSpecialityModal";

export default function SpecialityPage() {
  const {
    specialities,
    departments,
    loading,
    fetchSpecialities,
    fetchDepartments,
    addSpeciality,
    updateSpeciality,
    deleteSpeciality,
  } = useAcademicStore();

  const [search, setSearch] = useState("");
  const [departmentId, setDepartmentId] = useState<number | "">("");

  // const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [selected, setSelected] = useState<Speciality | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);

  /* ---------------- Fetch ---------------- */
  const fetchData = async () => {
    await fetchSpecialities();
    await fetchDepartments();
  };

  useEffect(() => {
    fetchData();
  }, []);


  /* ---------------- Filters ---------------- */
  const filteredSpecialities = useMemo(() => {
    if (!Array.isArray(specialities)) return [];

    return specialities.filter((s) => {
      const matchSearch =
        s.name?.toLowerCase().includes(search.toLowerCase());

      const matchDepartment =
        !departmentId || s.department_id === departmentId;

      return matchSearch && matchDepartment;
    });
  }, [specialities, search, departmentId]);

  /* ---------------- Actions ---------------- */
  const handleAdd = () => {
    setSelected(null);
    setIsModalOpen(true);
  };

  const handleEdit = (speciality: Speciality) => {
    setSelected(speciality);
    setIsModalOpen(true);
  };



  const handleDelete = async (speciality: Speciality) => {
    const result = await Swal.fire({
      title: "Supprimer la spécialité ?",
      text: `La spécialité "${speciality.name}" sera définitivement supprimée.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteSpeciality(speciality.id!);
      await fetchSpecialities();

      Swal.fire({
        title: "Supprimé",
        text: "La spécialité a été supprimée avec succès.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Erreur",
        text: "Impossible de supprimer la spécialité.",
        icon: "error",
      });
    }
  };

  const handleSave = async (data: {
    name: string;
    description?: string;
    department_id: number;
  }) => {
    try {
      if (selected) {
        await updateSpeciality(selected.id!, data);
        toast.success("Spécialité mise à jour");
      } else {
        await addSpeciality(data);
        toast.success("Spécialité créée");
      }

      await fetchSpecialities();
      setIsModalOpen(false);
    } catch {
      toast.error("Erreur lors de l’enregistrement");
    }
  };

  const handleShow = (speciality: Speciality) => {
    setSelected(speciality);
    setIsShowModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Spécialités</h1>

        <button
          onClick={handleAdd}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          + Ajouter
        </button>
      </div>

      {/* Filtres */}
      <SpecialityFilters
        search={search}
        onSearchChange={setSearch}
        departments={departments}
        departmentId={departmentId!}
        onDepartmentChange={setDepartmentId}
      />

      {/* Table */}
      <Table
        data={filteredSpecialities}
        columns={getSpecialityColumns(departments)}
        actions={getSpecialityActions(handleEdit, handleDelete, handleShow)}
        isLoading={loading.specialities}
        emptyMessage="Aucune spécialité trouvée"
        striped
        hoverable
        bordered
      />

      {/* Modal */}
      {isModalOpen && (
        <SpecialityModal
          speciality={selected}
          departments={departments}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {isShowModalOpen && selected && (
        <ShowSpecialityModal
          departmentId={selected.department_id}
          onClose={() => setIsShowModalOpen(false)}
          specialities={selected} // <-- ici on passe le tableau complet
        />
      )}

    </div>
  );
}

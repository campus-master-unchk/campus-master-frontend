"use client";

import { useMemo, useState, useEffect } from "react";

import Table from "@/components/ui/Table";
import DepartmentFilters from "@/components/departement/DepartmentFilters";
import DepartmentModal from "@/components/departement/DepartmentModal";
import { getDepartmentColumns } from "@/components/departement/DepartmentColumns";
import { getDepartmentActions } from "@/components/departement/DepartmentColumns";
import { Department } from "@/types/academic";
import { useAcademicStore } from "@/store/admin/academic.store";
import { toast } from "sonner";

export default function DepartmentPage() {
    const { departments, loading, fetchDepartments, addDepartment, updateDepartment, deleteDepartment } =
        useAcademicStore();

    const [search, setSearch] = useState("");
    const [modalDepartment, setModalDepartment] = useState<Department | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- Fetch ---
    useEffect(() => {
        fetchDepartments();
    }, [fetchDepartments]);

    const filteredDepartments = Array.isArray(departments)
        ? departments.filter((d) => {
            const name = d?.name?.toLowerCase() ?? "";
            const code = d?.code?.toLowerCase() ?? "";
            const q = search.toLowerCase();

            return name.includes(q) || code.includes(q);
        })
        : [];

    // --- Handlers Table Actions ---
    const handleEdit = (department: Department) => {
        setModalDepartment(department);
        setIsModalOpen(true);
    };

    const handleDelete = async (department: Department) => {
        if (confirm(`Voulez-vous vraiment supprimer le département "${department.name}" ?`)) {
            await deleteDepartment(department.id);
            toast.success("Département supprimé avec succès");
        }
    };

    // --- Handlers Modal ---
    const handleAdd = () => {
        setModalDepartment(null);
        setIsModalOpen(true);
    };


    const handleSave = async (data: { name: string; code: string }) => {
        if (modalDepartment) {
            await updateDepartment(modalDepartment.id, data);
            toast.success("Département modifié avec succès");
        } else {
            await addDepartment(data);
            setIsModalOpen(false);
            toast.success("Département ajouté avec succès");
        }

        // 🔥 RAFRAÎCHIR LA LISTE
        await fetchDepartments();
    };


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-xl font-semibold text-foreground">Départements</h1>
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
                >
                    Ajouter un département
                </button>
            </div>

            {/* Filtres */}
            <DepartmentFilters search={search} onSearchChange={setSearch} />

            {/* Table */}
            <Table
                data={filteredDepartments || []}
                columns={getDepartmentColumns()}
                actions={getDepartmentActions(handleEdit, handleDelete)}
                isLoading={loading.departments}
                emptyMessage="Aucun département trouvé"
                striped
                hoverable
                bordered
            />

            {/* Modal */}
            {isModalOpen && (
                <DepartmentModal
                    department={modalDepartment}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}

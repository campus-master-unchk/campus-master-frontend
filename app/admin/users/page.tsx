"use client";

import { useEffect, useMemo, useState } from "react";
import Table from "@/components/ui/Table";
import UserFilters from "@/components/user/UserFilters";
import { getUserColumns, getUserActions } from "@/components/user/UserColumns";
import UserModal from "@/components/user/UserModal";
import ShowUserModal from "@/components/user/ShowUserModal";
import { useAcademicStore } from "@/store/admin/academic.store";
import { User } from "@/types/userType";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useUserAdminStore } from "@/store/admin/user.store";

export default function UserPage() {
  const {
    departments,
    levels,
    specialities,
    loading,
    fetchDepartments,
    fetchLevels,
    fetchSpecialities,
    
  } = useAcademicStore();

  const { users, fetchUsers ,createUser, updateUser, toggleStatus, loading: loadingUsers} = useUserAdminStore();

  const [search, setSearch] = useState("");
  const [role, setRole] = useState<"teacher" | "student" | null>(null);
  const [status, setStatus] = useState<"active" | "inactive" | null>(null);
  const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [levelId, setLevelId] = useState<number | null>(null);
  const [specialityId, setSpecialityId] = useState<number | null>(null);
  const [selected, setSelected] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchDepartments();
    fetchLevels();
    fetchSpecialities();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];
    return users.filter(u => {
      const matchSearch = u.first_name.toLowerCase().includes(search.toLowerCase())
        || u.last_name.toLowerCase().includes(search.toLowerCase())
        || u.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = !role || u.user_type === role;
      const matchStatus = !status || u.status === status;
      const matchDepartment = !departmentId || (u.student || u.teacher as any).department_id === departmentId;
      const matchLevel = !levelId || (u.student as any).level_id === levelId;
      const matchSpeciality = !specialityId || (u.student as any).speciality_id === specialityId;
      return matchSearch && matchRole && matchStatus && matchDepartment && matchLevel && matchSpeciality;
    });
  }, [users, search, role, status, departmentId, levelId, specialityId]);


  const handleAdd = () => { setSelected(null); setIsModalOpen(true); };
  const handleEdit = (user: User) => { setSelected(user); setIsModalOpen(true); };
  const handleShow = (user: User) => { setSelected(user); setIsShowModalOpen(true); };

  const handleDelete = async (user: User) => {
    const result = await Swal.fire({
      title: `Supprimer ${user.first_name} ${user.last_name} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler"
    });
    if (!result.isConfirmed) return;
    try {
      await toggleStatus(user.id);
      await fetchUsers();
      toast.success("Utilisateur supprimé");
    } catch {
      toast.error("Impossible de supprimer");
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (selected) {
        await updateUser(selected.id, data);
        toast.success("Utilisateur mis à jour");
      } else {
        await createUser(data);
        toast.success("Utilisateur créé");
      }
      await fetchUsers();
      setIsModalOpen(false);
    } catch {
      toast.error("Erreur lors de l’enregistrement");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Utilisateurs</h1>
        <button onClick={handleAdd} className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">+ Ajouter</button>
      </div>

      <UserFilters
        search={search} onSearchChange={setSearch}
        role={role} onRoleChange={setRole}
        status={status} onStatusChange={setStatus}
        departments={departments} departmentId={departmentId} onDepartmentChange={setDepartmentId}
        levels={levels} levelId={levelId} onLevelChange={setLevelId}
        specialities={specialities} specialityId={specialityId} onSpecialityChange={setSpecialityId}
      />

      <Table
        data={filteredUsers}
        columns={getUserColumns(departments, levels, specialities)}
        actions={getUserActions(handleEdit, handleDelete, handleShow)}
        isLoading={loadingUsers}
        emptyMessage="Aucun utilisateur trouvé"
        striped hoverable bordered
      />

      {isModalOpen && (
        <UserModal
          user={selected}
          departments={departments}
          levels={levels}
          specialities={specialities}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {isShowModalOpen && selected && (
        <ShowUserModal
          user={selected}
          onClose={() => setIsShowModalOpen(false)}
        />
      )}
    </div>
  );
}

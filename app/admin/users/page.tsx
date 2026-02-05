// // app/admin/utilisateurs/page.tsx
// "use client";

// import { useState } from 'react';
// import Breadcrumb from "@/components/commun/Breadcrumb";
// import PageHeader from "@/components/commun/PageHeader";
// import UserTable from "@/components/admin/UserTable";
// import UserFilters from "@/components/admin/UserFilters";
// import AcademicFilters from "@/components/admin/AcademicFilters";
// import { Plus } from "lucide-react";
// import AddUserModal from "@/components/admin/modals/AddUserModal";
// import ViewUserModal from "@/components/admin/modals/ViewUserModal";
// import EditUserModal from "@/components/admin/modals/EditUserModal";
// import StatusUserModal from "@/components/admin/modals/StatusUserModal";
// import DeleteUserModal from "@/components/admin/modals/DeleteUserModal";
// import { User as UserType, Filters } from "@/types/userType";
// import { useModalManager } from "@/hooks/useModalManager";



// export default function UtilisateursPage() {
//   const [users, setUsers] = useState<UserType[]>([]);
//   const [filters, setFilters] = useState<Filters>({
//     role: 'all',
//     status: 'all',
//     search: '',
//     department: '',
//     specialty: '',
//     level: ''
//   });

//   const {
//     selectedUser,
//     activeModal,
//     openAddModal,
//     openViewModal,
//     openEditModal,
//     openStatusModal,
//     openDeleteModal,
//     closeModal
//   } = useModalManager();

//   // Fonction wrapper pour setFilters
//   const handleFilterChange = (newFilters: Filters) => {
//     setFilters(newFilters);
//   };

//   // Fonctions de gestion des données
//   const handleEditUser = (userData: Partial<UserType>) => {
//     if (!userData.id) return;
    
//     setUsers(users.map(u => 
//       u.id === userData.id ? { ...u, ...userData } as UserType : u
//     ));
//     closeModal();
//   };

//   const handleStatusChange = (userId: number, newStatus: UserType['status']) => {
//     setUsers(users.map(u => 
//       u.id === userId ? { ...u, status: newStatus } : u
//     ));
//     closeModal();
//   };

//   const handleDeleteUser = (userId: number) => {
//     setUsers(users.filter(u => u.id !== userId));
//     closeModal();
//   };

//   const handleAddUser = (newUser: Partial<UserType>) => {
//     const newId = Math.max(...users.map(u => u.id), 0) + 1;
    
//     setUsers([
//       ...users,
//       {
//         id: newId,
//         first_name: newUser.first_name || '',
//         last_name: newUser.last_name || '',
//         email: newUser.email || '',
//         user_type: newUser.user_type || 'student',
//         status: 'active',
//         created_at: new Date().toLocaleDateString('fr-FR'),
//         ...newUser
//       } as UserType
//     ]);
//     closeModal();
//   };

//   return (
//     <div className="space-y-6">
//       <Breadcrumb items={[
//         { label: "Administration", href: "/admin" },
//         { label: "Utilisateurs" }
//       ]} />
      
//       <PageHeader 
//         title="Gestion des Utilisateurs"
//         subtitle="Gérez les étudiants, enseignants et administrateurs avec leurs affectations académiques"
//         actions={
//           <button 
//             onClick={openAddModal}
//             className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
//           >
//             <Plus className="w-4 h-4" />
//             Ajouter un utilisateur
//           </button>
//         }
//       />

//       {/* Filtres généraux */}
//       <UserFilters 
//         filters={filters}
//         onFilterChange={handleFilterChange}
//       />

//       {/* Filtres académiques */}
//       <AcademicFilters
//         departments={departments}
//         specialties={specialties}
//         levels={levels}
//         filters={filters}
//         onFilterChange={handleFilterChange}
//       />
      
//       {/* Tableau des utilisateurs */}
//       <div className="bg-surface border border-border rounded-lg overflow-hidden">
//         <UserTable 
//           users={users}
//           filters={filters}
//           onView={openViewModal}
//           onEdit={openEditModal}
//           onStatusChange={openStatusModal}
//           onDelete={openDeleteModal}
//         />
//       </div>

//       {/* Modales */}
//       <AddUserModal 
//         isOpen={activeModal === 'add'}
//         onClose={closeModal}
//       />
      
//       {selectedUser && (
//         <>
//           <ViewUserModal
//             isOpen={activeModal === 'view'}
//             onClose={closeModal}
//             user={selectedUser}
//           />
          
//           <EditUserModal
//             isOpen={activeModal === 'edit'}
//             onClose={closeModal}
//             user={selectedUser}
//             onSave={handleEditUser}
//             departments={departments}
//             specialties={specialties}
//             levels={levels}
//           />
          
//           <StatusUserModal
//             isOpen={activeModal === 'status'}
//             onClose={closeModal}
//             user={selectedUser}
//             onStatusChange={handleStatusChange}
//           />
          
//           <DeleteUserModal
//             isOpen={activeModal === 'delete'}
//             onClose={closeModal}
//             user={selectedUser}
//             onDelete={handleDeleteUser}
//           />
//         </>
//       )}
//     </div>
//   );
// }


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
      const matchDepartment = !departmentId || (u as any).department_id === departmentId;
      const matchLevel = !levelId || (u as any).level_id === levelId;
      const matchSpeciality = !specialityId || (u as any).speciality_id === specialityId;
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

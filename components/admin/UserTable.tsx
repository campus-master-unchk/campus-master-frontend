"use client";

import { 
  Eye, Edit2, Trash2, MoreVertical,
  Mail, Calendar, Hash,
  GraduationCap, BookOpen, Shield,
  CheckCircle, XCircle, Clock
} from "lucide-react";
import Table from "@/components/ui/Table";
import { User as UserType, Student, Teacher } from "@/types/userType";

interface UserTableProps {
  users: UserType[];
  filters?: any;
  isLoading?: boolean;
  onView?: (user: UserType) => void;
  onEdit?: (user: UserType) => void;
  onStatusChange?: (user: UserType) => void;
  onDelete?: (user: UserType) => void;
}

export default function UserTable({
  users,
  filters,
  isLoading,
  onView,
  onEdit,
  onStatusChange,
  onDelete,
}: UserTableProps) {
  
  // Configuration des colonnes
  const columns = [
    {
      key: 'user',
      header: 'Utilisateur',
      width: '30%',
      render: (user: UserType) => (
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            user.user_type === 'student' ? 'bg-success-badge-bg' :
            user.user_type === 'teacher' ? 'bg-primary-badge-bg ' :
            'bg-warning-badge-bg'
          }`}>
            {user.user_type === 'student' ? (
              <GraduationCap className="w-5 h-5 text-success-badge" />
            ) : user.user_type === 'teacher' ? (
              <BookOpen className="w-5 h-5 text-primary-badge" />
            ) : (
              <Shield className="w-5 h-5 text-warning-badge" />
            )}
          </div>
          <div>
            <p className="font-medium text-foreground">{user.last_name}{user.first_name}</p>
            <div className="flex items-center gap-1 text-sm text-muted">
              <Mail className="w-3 h-3" />
              <span>{user.email}</span>
            </div>
            {user.user_type === 'student' && (
              <div className="flex items-center gap-1 text-xs text-muted mt-1">
                <Hash className="w-3 h-3" />
                <span>{(user as Student).matricule}</span>
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Rôle ',
      width: '20%',
      render: (user: UserType) => {
        const getRoleText = () => {
          if (user.user_type === 'student') {
            return `Étudiant `;
          }
          if (user.user_type === 'teacher') {
            return `Enseignant`;
          }
          return 'Administrateur';
        };

        const getAcademicDetails = () => {
          if (user.user_type === 'student') {
            const student = user as Student;
            return student.specialty?.name || 'Non assigné';
          }
          if (user.user_type === 'teacher') {
            const teacher = user as Teacher;
            return teacher.department?.name || 'Non assigné';
          }
          return 'Système';
        };

        return (
          <div className="space-y-1">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              user.role === 'student' ? 'bg-success-badge-bg text-success-badge ' :
              user.role === 'teacher' ? 'bg-primary-badge-bg text-primary-badge' :
              'bg-danger-badge-bg text-danger-badge '
            }`}>
              {getRoleText()}
            </div>
            <div className="text-xs text-muted">
              {getAcademicDetails()}
            </div>
          </div>
        );
      }
    },
    {
      key: 'academic',
      header: 'Informations académiques',
      width: '20%',
      render: (user: UserType) => {
        if (user.role === 'student') {
          const student = user as Student;
          return (
            <div className="space-y-1">
              <div className="text-sm text-foreground/80">
                {student.department?.code || ''} - {student.level?.label || ''}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted">
                <Calendar className="w-3 h-3" />
                <span>Année: {student.academicYear}</span>
              </div>
            </div>
          );
        }
        if (user.role === 'teacher') {
          const teacher = user as Teacher;
          return (
            <div className="text-sm text-foreground/80">
              {teacher.specialities.length} spécialité(s)
            </div>
          );
        }
        return <div className="text-sm text-muted">Administration</div>;
      }
    },
    {
      key: 'status',
      header: 'Statut',
      width: '15%',
      render: (user: UserType) => {
        const getStatusIcon = () => {
          switch(user.status) {
            case 'active': return <CheckCircle className="w-3 h-3 text-success-badge" />;
            case 'inactive': return <XCircle className="w-3 h-3 text-danger-badge" />;
            case 'pending': return <div className="w-3 h-3 rounded-full border-2 border-warning-badge border-t-transparent animate-spin" />;
            default: return null;
          }
        };

        return (
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className={`text-sm font-medium ${
              user.status === 'active' ? 'text-success-badge' :
              user.status === 'inactive' ? 'text-danger-badge' :
              'text-warning-badge'
            }`}>
              {user.status === 'active' ? 'Actif' :
               user.status === 'inactive' ? 'Inactif' : 'En attente'}
            </span>
          </div>
        );
      }
    },
  ];

// Configuration des actions
const actions = [
  onView ? {
    label: 'Voir',
    icon: <Eye className="w-4 h-4" />,
    onClick: onView,
    variant: 'primary' as const,
  } : null,
  onEdit ? {
    label: 'Modifier',
    icon: <Edit2 className="w-4 h-4" />,
    onClick: onEdit,
    variant: 'success' as const,
  } : null,
  onStatusChange ? {
    label: 'Changer statut',
    icon: <MoreVertical className="w-4 h-4" />,
    onClick: onStatusChange,
    variant: 'warning' as const,
  } : null,
  onDelete ? {
    label: 'Supprimer',
    icon: <Trash2 className="w-4 h-4" />,
    onClick: onDelete,
    variant: 'danger' as const,
  } : null,
].filter((action): action is NonNullable<typeof action> => action !== null);


// components/admin/UserTable.tsx (ajoute cette fonction)
const filterUsers = (users: UserType[], filters: any): UserType[] => {
  if (!filters) return users;
  
  return users.filter(user => {
    // Filtre par recherche
    if (filters.search && !user.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !user.email.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Filtre par rôle
    if (filters.role !== 'all' && user.user_type !== filters.role) return false;
    
    // Filtre par statut
    if (filters.status !== 'all' && user.status !== filters.status) return false;
    
    // Filtre par département (pour étudiants et enseignants)
    if (filters.department && filters.department !== 'all') {
      if (user.user_type === 'student') {
        const student = user as Student;
        if (student.departmentId !== parseInt(filters.department)) return false;
      } else if (user.user_type === 'teacher') {
        const teacher = user as Teacher;
        if (teacher.departmentId !== parseInt(filters.department)) return false;
      } else {
        // Les admins n'ont pas de département
        return false;
      }
    }
    
    // Filtre par spécialité (pour étudiants)
    if (filters.specialty && filters.specialty !== 'all' && user.user_type === 'student') {
      const student = user as Student;
      if (student.specialtyId !== parseInt(filters.specialty)) return false;
    }
    
    // Filtre par niveau (pour étudiants)
    if (filters.level && filters.level !== 'all' && user.user_type === 'student') {
      const student = user as Student;
      if (student.levelId !== parseInt(filters.level)) return false;
    }
    
    return true;
  });
};

// Puis dans le composant, utilise-la :
const filteredData = filters ? filterUsers(users, filters) : users;
  return (
    <Table
      data={filteredData}
      columns={columns}
      actions={actions}
      isLoading={isLoading}
      emptyMessage="Aucun utilisateur trouvé"
      striped
      hoverable
      bordered
    />
  );
}
"use client";
import { ColumnConfig, ActionConfig } from "@/components/ui/Table/types";

import { User } from "@/types/userType";
import { Department, Level, Speciality } from "@/types/academic";
import { Pencil, Trash2, Eye, GraduationCap, BookOpen, Shield, Mail, Hash, CheckCircle, XCircle } from "lucide-react";

export function getUserColumns(departments: Department[], levels: Level[], specialities: Speciality[]): ColumnConfig<User>[] {
  return [
    {
      key: 'user',
      header: 'Utilisateur',
      width: '30%',
      render: (user: User) => (
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${user.user_type === 'student' ? 'bg-success-badge-bg' :
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
          </div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Rôle ',
      width: '20%',
      render: (user: User) => {
        const getRoleText = () => {
          if (user.user_type === 'student') {
            return `Étudiant `;
          }
          if (user.user_type === 'teacher') {
            return `Enseignant`;
          }
          return 'Administrateur';
        };

        return (
          <div className="space-y-1">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${user.user_type === 'student' ? 'bg-success-badge-bg text-success-badge ' :
                user.user_type === 'teacher' ? 'bg-primary-badge-bg text-primary-badge' :
                  'bg-danger-badge-bg text-danger-badge '
              }`}>
              {getRoleText()}
            </div>
          </div>
        );
      }
    },
    {
      key: "status", header: "Statut", render: (user: User) => {
        const getStatusIcon = (status: string) => {
          switch (status) {
            case 'active': return <CheckCircle className="w-3 h-3 text-green-500" />;
            case 'inactive': return <XCircle className="w-3 h-3 text-red-500" />;
            case 'pending': return <div className="w-3 h-3 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />;
            default: return null;
          }
        };
        return (
          <div className="flex items-center gap-2">
            <div className={`px-2 py-1 rounded-md text-xs font-medium`}>
              <div className="flex items-center gap-1">
                {getStatusIcon(user.status)}
                <span>
                  {user.status === 'active' ? 'Actif' : 'Inactif'}
                </span>
              </div>
            </div>
          </div>
        );
      }
    },
    {
      key: "department_id",
      header: "Département",
      render: (user: User) => {
        const dept = departments.find(d => d.id === (user as any).department_id);
        return dept?.name || "-";
      },
    },
    {
      key: "level_id",
      header: "Niveau",
      render: (user: User) => {
        const level = levels.find(l => l.id === (user as any).level_id);
        return level?.name || "-";
      },
    },
    {
      key: "specialty_id",
      header: "Spécialité",
      render: (user: User) => {
        const spec = specialities.find(s => s.id === (user as any).specialty_id);
        return spec?.name || "-";
      },
    },
  ];
}

export function getUserActions(
  onEdit: (user: User) => void,
  onDelete: (user: User) => void,
  onShow: (user: User) => void
): ActionConfig<User>[] {
  return [
    { label: "Modifier", icon: <Pencil size={16} />, onClick: onEdit },
    { label: "Supprimer", icon: <Trash2 size={16} />, variant: "danger", onClick: onDelete },
    { label: "Voir", icon: <Eye size={16} />, onClick: onShow },
  ];
}

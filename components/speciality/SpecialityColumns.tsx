import { ColumnConfig, ActionConfig } from "@/components/ui/Table/types";
import { Speciality, Department } from "@/types/academic";
import { Pencil, Trash2, Eye } from "lucide-react";

export const getSpecialityColumns = (
    departments: Department[]
): ColumnConfig<Speciality>[] => [
        {
            key: "name",
            header: "Nom",
            render: (s) => s.name,
        },
        {
            key: "department",
            header: "Département",
            render: (s) =>
                departments.find((d) => d.id === s.department_id)?.name || "-",
        },
    ];

export const getSpecialityActions = (
    onEdit: (s: Speciality) => void,
    onDelete: (s: Speciality) => void,
    onShow: (s: Speciality) => void,
): ActionConfig<Speciality>[] => [
        {
            label: "Modifier",
            icon: <Pencil size={16} />,
            onClick: onEdit,
        },
        {
            label: "Supprimer",
            icon: <Trash2 size={16} />,
            variant: "danger",
            onClick: onDelete,
        },
        {
            label: "Voir",
            icon: <Eye size={16} />,
            variant: "success",
            onClick: onShow,
        },
    ];

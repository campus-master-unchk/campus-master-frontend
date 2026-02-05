// components/departement/DepartmentColumns.tsx
import { Department } from "@/types/academic";
import { Pencil, Trash2 } from "lucide-react";
import { ColumnConfig, ActionConfig } from "@/components/ui/Table/types";

export const getDepartmentColumns = (): ColumnConfig<Department>[] => [
  {
    key: "id",
    header: "ID",
    width: "70px",
  },
  {
    key: "code",
    header: "Code",
    render: (d) => (
      <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
        {d.code}
      </span>
    ),
  },
  {
    key: "name",
    header: "Nom du département",
  },
  {
    key: "created_at",
    header: "Créé le",
    render: (d) =>
      new Date(d.created_at).toLocaleDateString("fr-FR"),
  },
];

export const getDepartmentActions = (
  onEdit: (d: Department) => void,
  onDelete: (d: Department) => void
): ActionConfig<Department>[] => [
  {
    label: "Modifier",
    icon: <Pencil className="w-4 h-4" />,
    onClick: onEdit,
  },
  {
    label: "Supprimer",
    icon: <Trash2 className="w-4 h-4" />,
    variant: "danger",
    onClick: onDelete,
  },
];

import { ColumnConfig, ActionConfig } from "@/components/ui/Table/types";
import { Level } from "@/types/academic";
import { Pencil, Trash2 } from "lucide-react";

export const getLevelColumns = (): ColumnConfig<Level>[] => [
  {
    key: "name",
    header: "Nom",
    render: (level) => level.name,
  },
  {
    key: "created_at",
    header: "Créé le",
    render: (level) =>
      new Date(level.created_at).toLocaleDateString("fr-FR"),
  },
];

export const getLevelActions = (
  onEdit: (level: Level) => void,
  onDelete: (level: Level) => void
): ActionConfig<Level>[] => [
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
];

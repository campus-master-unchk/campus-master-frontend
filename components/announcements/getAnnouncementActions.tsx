import { Eye, Pencil, Trash2 } from "lucide-react";
import { Announcement } from "@/types/announcement";
import { ActionConfig } from "@/components/ui/Table/types";

export function getAnnouncementActions(
  onEdit: (announcement: Announcement) => void,
  onDelete: (announcement: Announcement) => void,
  onShow?: (announcement: Announcement) => void
): ActionConfig<Announcement>[] {

  const actions: ActionConfig<Announcement>[] = [];

  // 👁 Voir
  if (onShow) {
    actions.push({
      label: "Voir",
      icon: <Eye className="w-4 h-4" />,
      onClick: onShow,
      variant: "secondary",
    });
  }

  // ✏️ Modifier
  actions.push({
    label: "Modifier",
    icon: <Pencil className="w-4 h-4" />,
    onClick: onEdit,
    variant: "primary",
  });

  // 🗑 Supprimer
  actions.push({
    label: "Supprimer",
    icon: <Trash2 className="w-4 h-4" />,
    onClick: onDelete,
    variant: "danger",
  });

  return actions;
}

import { Bell } from "lucide-react";
import AnnouncementItem from "./AnnouncementItem";
import { Announcement } from "@/types/announcement";
import { ActionConfig } from "../ui/Table/types";

interface Props {
  data: Announcement[];
  actions: ActionConfig<Announcement>[];
}

export default function AnnouncementsSection({ data, actions }: Props) {
  return (
    <div className="bg-surface border rounded-lg p-6">
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Annonces Récentes</h2>
          <p className="text-sm text-muted">
            Dernières informations importantes
          </p>
        </div>
        <Bell />
      </div>

      <div className="space-y-4">
        {data.length === 0 ? (
          <p className="text-sm text-muted">Aucune annonce</p>
        ) : (
          data.map((a) => (
            <AnnouncementItem
              key={a.id}
              announcement={a}
              actions={actions}
            />
          ))
        )}
      </div>
    </div>
  );
}

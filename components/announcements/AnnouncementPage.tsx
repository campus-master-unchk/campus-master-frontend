"use client";

import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "sonner";

import { Announcement } from "@/types/announcement";
import AnnouncementFilters from "./AnnouncementFilters";
import AnnouncementModal from "./AnnouncementModal";
import AnnouncementsSection from "./AnnouncementsSection";
import { useAnnouncementStore } from "@/store/admin/announcement.store";
import { getAnnouncementActions } from "./getAnnouncementActions";

export default function AnnouncementPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);

  const [selected, setSelected] = useState<Announcement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    announcements,
    fetchAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
  } = useAnnouncementStore();

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const filtered = useMemo(() => {
    if (!Array.isArray(announcements)) return [];

    return announcements.filter(a =>
        a.title.toLowerCase().includes(search.toLowerCase()) &&
      (!type || a.type === type) &&
      (!priority || a.priority === priority) &&
      (!state || a.state === state)
    );
  }, [announcements, search, type, priority, state]);

  const handleSave = async (data: any) => {
    try {
      if (selected) {
        await updateAnnouncement(selected.id, data);
        toast.success("Annonce mise à jour");
      } else {
        await createAnnouncement(data);
        toast.success("Annonce créée");
      }
      fetchAnnouncements();
      setIsModalOpen(false);
    } catch {
      toast.error("Erreur lors de l’enregistrement");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Annonces</h1>
        <button
          onClick={() => { setSelected(null); setIsModalOpen(true); }}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          + Ajouter
        </button>
      </div>

      <AnnouncementFilters
        search={search}
        onSearchChange={setSearch}
        type={type}
        onTypeChange={setType}
        priority={priority}
        onPriorityChange={setPriority}
        state={state}
        onStateChange={setState}
      />

      <AnnouncementsSection
        data={filtered}
        actions={getAnnouncementActions(
          (a) => { setSelected(a); setIsModalOpen(true); },
          async (a) => {
            const res = await Swal.fire({
              title: "Supprimer ?",
              text: a.title,
              icon: "warning",
              showCancelButton: true,
            });

            if (res.isConfirmed) {
              await deleteAnnouncement(a.id);
              fetchAnnouncements();
              toast.success("Annonce supprimée");
            }
          }
        )}
      />

      {isModalOpen && (
        <AnnouncementModal
          announcement={selected}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

// src/store/admin/announcement.store.ts

import { create } from 'zustand';
import { Announcement } from '@/types/announcement';
import { announcementService } from '@/services/admin/announcementService';
import { toast } from 'sonner';

interface AnnouncementState {
  announcements: Announcement[];
  loading: boolean;

  fetchAnnouncements: () => Promise<void>;
  createAnnouncement: (data: any) => Promise<void>;
  updateAnnouncement: (id: number, data: any) => Promise<void>;
  deleteAnnouncement: (id: number) => Promise<void>;
  togglePublish: (id: number) => Promise<void>;
}

export const useAnnouncementStore = create<AnnouncementState>((set, get) => ({
  announcements: [],
  loading: false,

  fetchAnnouncements: async () => {
    set({ loading: true });
    try {
      const data = await announcementService.getAll();
      set({ announcements: data });
    } catch {
      toast.error('Erreur lors du chargement des annonces');
    } finally {
      set({ loading: false });
    }
  },

  createAnnouncement: async (data) => {
    try {
      const newAnnouncement = await announcementService.create(data);
      set({ announcements: [...get().announcements, newAnnouncement] });
      toast.success('Annonce créée');
    } catch {
      toast.error('Erreur création annonce');
    }
  },

  updateAnnouncement: async (id, data) => {
    try {
      const updated = await announcementService.update(id, data);
      set({
        announcements: get().announcements.map(a => a.id === id ? updated : a),
      });
      toast.success('Annonce mise à jour');
    } catch {
      toast.error('Erreur mise à jour annonce');
    }
  },

  deleteAnnouncement: async (id) => {
    try {
      await announcementService.delete(id);
      set({
        announcements: get().announcements.filter(a => a.id !== id),
      });
      toast.success('Annonce supprimée');
    } catch {
      toast.error('Erreur suppression annonce');
    }
  },

  togglePublish: async (id) => {
    try {
      const updated = await announcementService.togglePublish(id);
      set({
        announcements: get().announcements.map(a => a.id === id ? updated : a),
      });
      toast.success(
        updated.state === 'published'
          ? 'Annonce publiée'
          : 'Annonce mise en brouillon'
      );
    } catch {
      toast.error('Erreur publication annonce');
    }
  }
}));

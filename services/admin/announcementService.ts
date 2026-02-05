// src/services/admin/announcementService.ts

import api from '@/services/api';
import { Announcement, CreateAnnouncementPayload, UpdateAnnouncementPayload } from '@/types/announcement';

export const announcementService = {
  async getAll(): Promise<Announcement[]> {
    const res = await api.get('/api/announcements');
    return res.data.data;
  },

  async create(data: CreateAnnouncementPayload): Promise<Announcement> {
    const res = await api.post('/api/announcements', data);
    return res.data.data;
  },

  async update(id: number, data: UpdateAnnouncementPayload): Promise<Announcement> {
    const res = await api.put(`/api/announcements/${id}`, data);
    return res.data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/api/announcements/${id}`);
  },

  async togglePublish(id: number): Promise<Announcement> {
    const res = await api.patch(`/api/announcements/${id}/publish`);
    return res.data.data;
  }
};

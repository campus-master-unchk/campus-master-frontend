import api from '@/services/api';
import { Module } from '@/types/academic';

export const moduleService = {
  /* =========================================
     GET ALL MODULES (ADMIN)
  ========================================= */
  async getAll(): Promise<Module[]> {
    const res = await api.get('/api/modules');
    return res.data.data;
  },

  /* =========================================
     CREATE MODULE
  ========================================= */

  create(formData: FormData) {
    return api.post("/api/admin/modules", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  },

  /* =========================================
  UPDATE MODULE
  ========================================= */

  update(id: number, formData: FormData) {
    return api.put(`/api/admin/modules/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  },

  /* =========================================
     DELETE MODULE
  ========================================= */
  async delete(id: number): Promise<void> {
    await api.delete(`/api/admin/modules/${id}`);
  },
};

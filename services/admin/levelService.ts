import api from '@/services/api';
import { Level } from '@/types/academic';

export const levelService = {
  async getAll(): Promise<Level[]> {
    const res = await api.get('/api/levels');
    return res.data.data;
  },

  async create(data: Pick<Level, 'name'>) {
    return api.post('/api/admin/levels', data);
  },

  async update(id: number, data: Partial<Level>) {
    return api.put(`/api/admin/levels/${id}`, data);
  },

  async delete(id: number) {
    return api.delete(`/api/admin/levels/${id}`);
  },
};

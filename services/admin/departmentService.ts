import api from '@/services/api';
import { Department } from '@/types/academic';

export const departmentService = {
  async getAll(): Promise<Department[]> {
    const res = await api.get('/api/departments');
    return res.data.data;
  },

  async create(data: Pick<Department, 'name' | 'code'>) {
    return api.post('/api/admin/departments', data);
  },

  async update(id: number, data: Partial<Department>) {
    return api.put(`/api/admin/departments/${id}`, data);
  },

  async delete(id: number) {
    return api.delete(`/api/admin/departments/${id}`);
  },
};

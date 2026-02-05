import api from '@/services/api';
import { Speciality } from '@/types/academic';

export const specialityService = {
  getAll: async (): Promise<Speciality[]> => {
    const res = await api.get('/api/specialities');
    return res.data.data;
  },

  create: (data: Pick<Speciality, "name" | "description" | "department_id">) =>
    api.post('/api/admin/specialities', data), 

  update: (id: number, data: Partial<Speciality>) =>
    api.put(`/api/admin/specialities/${id}`, data),

  delete: (id: number) =>
    api.delete(`/api/admin/specialities/${id}`),
};

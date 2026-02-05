//services/userService.ts

import api from '@/services/api';
import { User, CreateUserPayload, UpdateUserPayload } from '@/types/userType';

export const userService = {
  async getAll(): Promise<User[]> {
    const res = await api.get('/api/admin/users');
    return res.data.data;
  },

  async create(data: CreateUserPayload): Promise<User> {
    // Le backend doit gérer student_info / teacher_info
    const res = await api.post('/api/admin/users', data);
    return res.data.data;
  },

  async update(id: number, data: UpdateUserPayload): Promise<User> {
    const res = await api.put(`/api/admin/users/${id}`, data);
    return res.data.data;
  },

  async changeStatus(id: number): Promise<User> {
    const res = await api.patch(`/api/admin/users/${id}/status`);
    return res.data.data;
  },
};

// src/store/admin/userAdmin.store.ts

import { create } from 'zustand';
import { User } from '@/types/userType';
import { userService } from '@/services/admin/userService';
import { toast } from 'sonner';

interface UserAdminState {
  users: User[];
  loading: boolean;

  fetchUsers: () => Promise<void>;
  createUser: (data: any) => Promise<void>;
  updateUser: (id: number, data: any) => Promise<void>;
  toggleStatus: (id: number) => Promise<void>;
}

export const useUserAdminStore = create<UserAdminState>((set, get) => ({
  users: [],
  loading: false,

  fetchUsers: async () => {
    set({ loading: true });
    try {
      const users = await userService.getAll();
      set({ users });
    } catch {
      toast.error('Erreur chargement utilisateurs');
    } finally {
      set({ loading: false });
    }
  },

  createUser: async (data) => {
    try {
      const user = await userService.create(data);
      set({ users: [...get().users, user] });
      toast.success('Utilisateur créé');
    } catch {
      toast.error('Erreur création utilisateur');
    }
  },

  updateUser: async (id, data) => {
    try {
      const updated = await userService.update(id, data);
      set({
        users: get().users.map(u => u.id === id ? updated : u),
      });
      toast.success('Utilisateur mis à jour');
    } catch {
      toast.error('Erreur mise à jour utilisateur');
    }
  },

  toggleStatus: async (id) => {
    try {
      const updated = await userService.changeStatus(id);
      set({
        users: get().users.map(u => u.id === id ? updated : u),
      });
      toast.success(
        updated.status === 'active'
          ? 'Utilisateur activé'
          : 'Utilisateur désactivé'
      );
    } catch {
      toast.error('Erreur changement de statut');
    }
  },
}));

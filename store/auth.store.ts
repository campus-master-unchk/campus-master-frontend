import { authService } from '@/services/authService';
import { updateMypassword, updateProfile, User } from '@/types/userType';
import { toast } from 'sonner';
import { create } from 'zustand';

interface AuthState {
  myProfil: User | null;
  loading: boolean;

  getMyProfil: () => Promise<void>;
  updateMyPassword: (data: updateMypassword) => Promise<void>;
  updateMyProfil: (data: updateProfile) => Promise<void>;
}

export const authStore = create<AuthState>((set) => ({
  myProfil: null,
  loading: false,

  getMyProfil: async () => {
    set({ loading: true });
    try {
      const myProfil = await authService.getCurrentUser();
      set({ myProfil });
    } catch (error) {
      toast.error('Erreur lors de la récupération de votre profil');
    } finally {
      set({ loading: false });
    }
  },

  updateMyProfil: async (data) => {
    set({ loading: true });
    try {
      const updatedProfil = await authService.updateProfile(data);
      set({ myProfil: updatedProfil });

      toast.success('Mise à jour de votre profil réussie');
    } catch (error) {
      toast.error('La mise à jour de votre profil a échoué');
    } finally {
      set({ loading: false });
    }
  },

  updateMyPassword: async (data) => {
    set({ loading: true });
    try {
      await authService.updateMypassword(data);

      toast.success('Mise à jour de votre mot de passe réussie');
    } catch (error) {
      toast.error('La mise à jour de votre mot de passe a échoué');
    } finally {
      set({ loading: false });
    }
  },
}));

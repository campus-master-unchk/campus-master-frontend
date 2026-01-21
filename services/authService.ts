// services/authService.ts
import api from '@/services/api';
import { Auth, LoginResponse,resetPassword } from '@/types/userType';
import { toast } from 'sonner';



export const authService = {
  async login(data: Auth): Promise<LoginResponse> {
    try {
      const response = await api.post('/api/login', data);
      const loginData = response.data;
      
      if (loginData.status === 'success' && loginData.authorization?.token) {
        // Stocker le token JWT dans les cookies
        this.setToken(loginData.authorization.token);
        
        // Stocker les infos utilisateur
        if (loginData.user) {
          this.setUser(loginData.user);
        }
        
        return loginData;
      } else {
        throw new Error('Réponse inattendue du serveur');
      }
      
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async forgotPassword(email: string) {
    try {
      const response = await api.post('/api/forget-password', { email });
      
      toast.success("Email envoyé", {
        description: response.data.message || "Vérifiez votre boîte de réception",
        duration: 5000,
      });
      
      return response.data;
    } catch (error: any) {
      toast.error("Erreur d'envoi", {
        description: error.response?.data?.message || "Impossible d'envoyer l'email",
        duration: 5000,
      });
      throw error;
    }
  },

  async resetPassword(data: resetPassword) {
    try {
      const response = await api.post('/api/reset-password', 
        data
      );
      
      toast.success("Mot de passe réinitialisé", {
        description: "Vous pouvez maintenant vous connecter avec votre nouveau mot de passe",
        duration: 5000,
      });
      
      return response.data;
    } catch (error: any) {
      toast.error("Échec de la réinitialisation", {
        description: "Impossible de réinitialiser le mot de passe, veuillez renvoyer un nouveau lien",
        duration: 5000,
      });
      throw error;
    }
  },

  async logout() {
    try {
      await api.post('/api/logout');
      
      toast.info("Déconnexion réussie", {
        description: "À bientôt sur CampusMaster",
        duration: 3000,
      });
      
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.removeToken();
      this.removeUser();
      
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/api/me');
      if (response.data.status === 'success') {
        this.setUser(response.data.user);
        return response.data.user;
      }
      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  async updateProfile(data: {
    first_name: string;
    last_name: string;
    email: string;
  }) {
    try {
      const response = await api.put('/api/update-my-profile', data);
      
      toast.success("Profil mis à jour", {
        description: "Vos informations ont été modifiées avec succès",
        duration: 5000,
      });
      
      if (response.data.user) {
        this.setUser(response.data.user);
      }
      
      return response.data;
    } catch (error: any) {
      toast.error("Erreur de mise à jour", {
        description: error.response?.data?.message || "Impossible de mettre à jour le profil",
        duration: 5000,
      });
      throw error;
    }
  },

  // Gestion du token JWT
  setToken(token: string) {
    this.setCookie('token', token, 1); // 1 jour (ou selon expires_in)
  },

  getToken(): string | null {
    return this.getCookie('token');
  },

  removeToken() {
    this.removeCookie('token');
  },

  // Gestion des données utilisateur
  setUser(user: any) {
    this.setCookie('user', JSON.stringify(user), 1);
  },

  getUser() {
    const userCookie = this.getCookie('user');
    return userCookie ? JSON.parse(userCookie) : null;
  },

  removeUser() {
    this.removeCookie('user');
  },

  // Méthodes utilitaires pour les cookies
  getCookie(name: string): string | null {
    if (typeof window === 'undefined') return null;
    
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift();
      return cookieValue || null;
    }
    return null;
  },

  setCookie(name: string, value: string, days: number = 1) {
    if (typeof window === 'undefined') return;
    
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    
    document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Strict`;
  },

  removeCookie(name: string) {
    if (typeof window === 'undefined') return;
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
};
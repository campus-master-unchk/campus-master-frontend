// lib/api.ts
import axios from 'axios';
import { authService } from '@/services/authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor pour ajouter le token JWT aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Si erreur 401 (non autorisé) et pas déjà en cours de rafraîchissement
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Vous pourriez implémenter un rafraîchissement de token ici
      // si votre Laravel supporte refresh tokens
      
      // Pour l'instant, on déconnecte simplement
      authService.logout();
      
      return Promise.reject(error);
    }
    
    return Promise.reject(error);
  }
);

export default api;
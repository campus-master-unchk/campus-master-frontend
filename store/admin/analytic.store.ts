import { Analytics } from "@/types/analyticsType";
import { create } from "zustand";
import { analyticService } from "@/services/admin/analyticService";
import { toast } from "sonner";

interface AnalyticState {
    analytics: Analytics;
    loading: boolean;
    fetchAnalytics: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticState>((set, get) => ({

    analytics: { total_students: 0, total_teachers: 0, total_modules: 0, total_departments: 0, recent_users: [], recent_announcements: [] },
    loading: false,

    fetchAnalytics: async () => {
    set({ loading: true });
    try {
      const data = await analyticService.getAnalytics();
      set({ analytics: data });
    } catch {
      toast.error('Erreur lors du chargement des analytics');
    } finally {
      set({ loading: false });
    }
  },
}))
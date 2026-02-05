import api from "@/services/api";
import { Analytics } from "@/types/analyticsType";

export const analyticService = {
    async getAnalytics(): Promise<Analytics> {
        const res = await api.get('/api/admin/analytics');
        return res.data;
    }
}
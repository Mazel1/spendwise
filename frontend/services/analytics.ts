import { apiClient } from "./api";
import { AnalyticsData } from "@/types";

export const analyticsService = {
  get: async (): Promise<AnalyticsData> => {
    const { data } = await apiClient.get<AnalyticsData>("/analytics");
    return data;
  },
};

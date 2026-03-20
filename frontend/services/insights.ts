import { apiClient } from "./api";
import { InsightsResponse } from "@/types";

export const insightService = {
  get: async (): Promise<InsightsResponse> => {
    const { data } = await apiClient.get<InsightsResponse>("/insights");
    return data;
  },
};

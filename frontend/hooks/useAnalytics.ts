"use client";

import { useCallback, useEffect, useState } from "react";
import { analyticsService } from "@/services/analytics";
import { AnalyticsData } from "@/types";

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyticsService.get();
      setData(result);
    } catch {
      setError("Failed to load analytics.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, isLoading, error, refetch: fetch };
}

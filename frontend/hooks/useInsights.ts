"use client";

import { useCallback, useEffect, useState } from "react";
import { insightService } from "@/services/insights";
import { Insight } from "@/types";

export function useInsights() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await insightService.get();
      setInsights(res.insights);
    } catch {
      setError("Failed to load insights.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { insights, isLoading, error, refetch: fetch };
}

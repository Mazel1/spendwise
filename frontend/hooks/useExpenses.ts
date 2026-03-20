"use client";

import { useCallback, useEffect, useState } from "react";
import { expenseService, ListExpensesParams } from "@/services/expenses";
import { Expense, ExpenseListResponse } from "@/types";

interface UseExpensesResult {
  data: ExpenseListResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  deleteExpense: (id: string) => Promise<void>;
}

export function useExpenses(params: ListExpensesParams = {}): UseExpensesResult {
  const [data, setData] = useState<ExpenseListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await expenseService.list(params);
      setData(result);
    } catch {
      setError("Failed to load expenses. Please try again.");
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const deleteExpense = useCallback(
    async (id: string) => {
      await expenseService.delete(id);
      // Optimistic removal — refetch to sync with server
      setData((prev) =>
        prev
          ? {
              ...prev,
              items: prev.items.filter((e) => e.id !== id),
              total: prev.total - 1,
            }
          : prev
      );
    },
    []
  );

  return { data, isLoading, error, refetch: fetch, deleteExpense };
}

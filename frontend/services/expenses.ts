import { apiClient } from "./api";
import {
  CreateExpensePayload,
  Expense,
  ExpenseListResponse,
} from "@/types";

export interface ListExpensesParams {
  page?: number;
  page_size?: number;
  category?: string;
  date_from?: string;
  date_to?: string;
}

export const expenseService = {
  list: async (params: ListExpensesParams = {}): Promise<ExpenseListResponse> => {
    const { data } = await apiClient.get<ExpenseListResponse>("/expenses", {
      params,
    });
    return data;
  },

  get: async (id: string): Promise<Expense> => {
    const { data } = await apiClient.get<Expense>(`/expenses/${id}`);
    return data;
  },

  create: async (payload: CreateExpensePayload): Promise<Expense> => {
    const { data } = await apiClient.post<Expense>("/expenses", payload);
    return data;
  },

  update: async (
    id: string,
    payload: Partial<CreateExpensePayload>
  ): Promise<Expense> => {
    const { data } = await apiClient.patch<Expense>(`/expenses/${id}`, payload);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/expenses/${id}`);
  },
};

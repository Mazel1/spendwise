export interface User {
  id: string;
  email: string;
  name: string;
  is_active: boolean;
  created_at: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface Expense {
  id: string;
  user_id: string;
  amount: string;
  description: string;
  category: string | null;
  notes: string | null;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface ExpenseListResponse {
  items: Expense[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface CreateExpensePayload {
  amount: number;
  description: string;
  category?: string;
  notes?: string;
  date: string;
}

export interface MonthlyTotal {
  year: number;
  month: number;
  label: string;
  total: number;
}

export interface CategoryBreakdown {
  category: string;
  total: number;
  percentage: number;
}

export interface AnalyticsData {
  total_expenses: number;
  total_amount: number;
  average_monthly_spend: number;
  monthly_totals: MonthlyTotal[];
  category_breakdown: CategoryBreakdown[];
  trend: "increasing" | "decreasing" | "stable" | "insufficient_data";
}

export interface Insight {
  type: string;
  title: string;
  body: string;
}

export interface InsightsResponse {
  insights: Insight[];
}

export interface ApiError {
  detail: string;
}

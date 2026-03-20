"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useExpenses } from "@/hooks/useExpenses";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useInsights } from "@/hooks/useInsights";
import { useToast } from "@/hooks/useToast";
import { formatCurrency } from "@/lib/utils";

import StatCard from "@/components/dashboard/StatCard";
import StatCardSkeleton from "@/components/dashboard/StatCardSkeleton";
import ExpenseTable from "@/components/dashboard/ExpenseTable";
import TableSkeleton from "@/components/dashboard/TableSkeleton";
import AddExpenseModal from "@/components/dashboard/AddExpenseModal";
import SectionCard from "@/components/dashboard/SectionCard";
import CategoryChart from "@/components/dashboard/CategoryChart";
import MonthlyTrendChart from "@/components/dashboard/MonthlyTrendChart";
import InsightsSection from "@/components/dashboard/InsightsSection";
import ToastContainer from "@/components/ui/Toast";
import { Plus, AlertCircle } from "lucide-react";

function AnalyticsSkeleton() {
  return (
    <div className="border border-zinc-800 bg-zinc-950 p-6 animate-pulse space-y-4">
      <div className="h-2 bg-zinc-800 rounded w-24" />
      <div className="space-y-2.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between">
            <div className="h-2 bg-zinc-800 rounded w-20" />
            <div className="h-2 bg-zinc-800 rounded w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2.5 border border-red-800/50 bg-red-950/20 px-4 py-3">
      <AlertCircle size={13} className="text-red-400 shrink-0" />
      <p className="text-xs font-mono text-red-400">{message}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const { toasts, success, error: toastError } = useToast();

  const {
    data: expenseData,
    isLoading: expensesLoading,
    error: expensesError,
    refetch: refetchExpenses,
    deleteExpense,
  } = useExpenses({ page: 1, page_size: 50 });

  const {
    data: analytics,
    isLoading: analyticsLoading,
    error: analyticsError,
    refetch: refetchAnalytics,
  } = useAnalytics();

  const {
    insights,
    isLoading: insightsLoading,
    error: insightsError,
    refetch: refetchInsights,
  } = useInsights();

  // Refresh all data sources after a successful expense change
  const refreshAll = useCallback(() => {
    refetchExpenses();
    refetchAnalytics();
    refetchInsights();
  }, [refetchExpenses, refetchAnalytics, refetchInsights]);

  const handleExpenseSuccess = useCallback(() => {
    setShowModal(false);
    refreshAll();
    success("Expense added successfully");
  }, [refreshAll, success]);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await deleteExpense(id);
      refreshAll();
      success("Expense deleted");
    } catch {
      toastError("Failed to delete expense");
    }
  }, [deleteExpense, refreshAll, success, toastError]);

  const expenses = expenseData?.items ?? [];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";
  const firstName = user?.name?.split(" ")[0] ?? "";

  return (
    <div className="min-h-screen px-8 py-9 max-w-6xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex items-start justify-between animate-fade-up">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 mb-1">
            {greeting}, {firstName}
          </p>
          <h1
            className="text-3xl text-zinc-100 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Financial Overview
          </h1>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-amber-400 border border-amber-400/30 px-4 py-2.5 hover:bg-amber-400/8 transition-colors"
        >
          <Plus size={11} strokeWidth={2} />
          Add expense
        </button>
      </div>

      {/* Stat cards */}
      <div
        className="grid grid-cols-3 gap-px animate-fade-up animate-fade-up-delay-1"
        style={{ background: "#27272a" }}
      >
        {analyticsLoading ? (
          Array.from({ length: 3 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : analyticsError ? (
          <div className="col-span-3"><ErrorBanner message={analyticsError} /></div>
        ) : (
          <>
            <StatCard
              label="Total spent"
              value={formatCurrency(analytics?.total_amount ?? 0)}
              sub={`${analytics?.total_expenses ?? 0} expenses total`}
              accent
            />
            <StatCard
              label="Monthly average"
              value={formatCurrency(analytics?.average_monthly_spend ?? 0)}
              sub="across all months"
            />
            <StatCard
              label="Trend"
              value={
                analytics?.trend === "increasing" ? "↑ Rising"
                : analytics?.trend === "decreasing" ? "↓ Falling"
                : analytics?.trend === "stable" ? "→ Stable"
                : "—"
              }
              sub="vs last month"
            />
          </>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4 animate-fade-up animate-fade-up-delay-2">
        {analyticsLoading ? (
          <><AnalyticsSkeleton /><AnalyticsSkeleton /></>
        ) : (
          <>
            <SectionCard title="Spending by Category">
              <CategoryChart breakdown={analytics?.category_breakdown ?? []} />
            </SectionCard>
            <SectionCard title="Monthly Trend">
              <MonthlyTrendChart
                months={analytics?.monthly_totals ?? []}
                trend={analytics?.trend ?? "insufficient_data"}
              />
            </SectionCard>
          </>
        )}
      </div>

      {/* AI Insights */}
      <div className="animate-fade-up animate-fade-up-delay-3">
        <InsightsSection
          insights={insights}
          isLoading={insightsLoading}
          error={insightsError}
        />
      </div>

      {/* Expense table */}
      <div className="animate-fade-up animate-fade-up-delay-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-500">
            Recent Expenses
          </h2>
          {expenseData && expenseData.total > expenses.length && (
            <p className="text-[10px] font-mono text-zinc-600">
              Showing {expenses.length} of {expenseData.total}
            </p>
          )}
        </div>

        {expensesError ? (
          <ErrorBanner message={expensesError} />
        ) : expensesLoading ? (
          <TableSkeleton />
        ) : (
          <ExpenseTable expenses={expenses} onDelete={handleDelete} />
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <AddExpenseModal
          onClose={() => setShowModal(false)}
          onSuccess={handleExpenseSuccess}
        />
      )}

      {/* Toasts */}
      <ToastContainer toasts={toasts} />
    </div>
  );
}

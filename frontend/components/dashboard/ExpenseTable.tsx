"use client";

import { useState } from "react";
import { Expense } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Trash2 } from "lucide-react";

const CATEGORY_COLORS: Record<string, string> = {
  Food: "text-amber-400 bg-amber-400/10",
  Transport: "text-blue-400 bg-blue-400/10",
  Shopping: "text-pink-400 bg-pink-400/10",
  Health: "text-green-400 bg-green-400/10",
  Entertainment: "text-purple-400 bg-purple-400/10",
  Utilities: "text-orange-400 bg-orange-400/10",
  Other: "text-zinc-400 bg-zinc-400/10",
};

function getCategoryStyle(category: string | null): string {
  if (!category) return "text-zinc-500 bg-zinc-800";
  return CATEGORY_COLORS[category] ?? "text-zinc-400 bg-zinc-800";
}

interface ExpenseTableProps {
  expenses: Expense[];
  onDelete: (id: string) => Promise<void>;
}

export default function ExpenseTable({ expenses, onDelete }: ExpenseTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="border border-zinc-800 border-dashed py-16 text-center">
        <p className="text-zinc-600 text-sm font-mono">No expenses yet.</p>
        <p className="text-zinc-700 text-xs font-mono mt-1">
          Add your first expense above.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-zinc-800 overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-zinc-800 bg-zinc-950">
        {["Description", "Category", "Date", "Amount"].map((h) => (
          <span
            key={h}
            className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-600"
          >
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      {expenses.map((expense, i) => (
        <div
          key={expense.id}
          className={`grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-5 py-4 group transition-colors hover:bg-zinc-900 ${
            i < expenses.length - 1 ? "border-b border-zinc-800/60" : ""
          }`}
        >
          {/* Description */}
          <div className="min-w-0">
            <p className="text-sm text-zinc-200 truncate">{expense.description}</p>
            {expense.notes && (
              <p className="text-xs text-zinc-600 truncate mt-0.5">{expense.notes}</p>
            )}
          </div>

          {/* Category */}
          <span
            className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 ${getCategoryStyle(
              expense.category
            )}`}
          >
            {expense.category ?? "—"}
          </span>

          {/* Date */}
          <span className="text-xs font-mono text-zinc-500 whitespace-nowrap">
            {formatDate(expense.date)}
          </span>

          {/* Amount + delete */}
          <div className="flex items-center gap-3 justify-end">
            <span
              className="text-sm font-mono text-zinc-100 whitespace-nowrap"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {formatCurrency(expense.amount)}
            </span>

            {confirmId === expense.id ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleDelete(expense.id)}
                  disabled={deletingId === expense.id}
                  className="text-[10px] font-mono uppercase tracking-wider text-red-400 hover:text-red-300 disabled:opacity-50 transition-colors"
                >
                  {deletingId === expense.id ? "…" : "Confirm"}
                </button>
                <span className="text-zinc-700">|</span>
                <button
                  onClick={() => setConfirmId(null)}
                  className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmId(expense.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-600 hover:text-red-400 transition-colors"
                aria-label="Delete expense"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

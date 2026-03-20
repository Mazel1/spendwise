"use client";

import { useEffect, useRef, useState } from "react";
import { expenseService } from "@/services/expenses";
import { useExpenseForm } from "@/hooks/useExpenseForm";
import { useFormError } from "@/hooks/useFormError";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { X, Sparkles } from "lucide-react";

const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Health",
  "Entertainment",
  "Utilities",
  "Other",
];

const MAX_DESCRIPTION = 120;

interface AddExpenseModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddExpenseModal({ onClose, onSuccess }: AddExpenseModalProps) {
  const { values, errors, set, validate, reset } = useExpenseForm();
  const { error: apiError, handleError, clearError } = useFormError();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const descRef = useRef<HTMLInputElement>(null);

  // Focus first field on mount
  useEffect(() => {
    descRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearError();

    if (!validate()) return;

    setIsLoading(true);
    try {
      await expenseService.create({
        description: values.description.trim(),
        amount: parseFloat(values.amount),
        category: values.category || undefined,
        notes: values.notes.trim() || undefined,
        date: values.date,
      });
      reset();
      onSuccess();
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Re-validate on change after first submit attempt
  const handleChange = (field: Parameters<typeof set>[0]) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      set(field)(e);
      if (submitted) validate();
    };

  const charsLeft = MAX_DESCRIPTION - values.description.length;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 z-40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Add expense"
        className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 z-50 flex flex-col animate-slide-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-800 shrink-0">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 mb-0.5">
              New Entry
            </p>
            <h2
              className="text-xl text-zinc-100"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Add Expense
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-200 transition-colors p-1"
            aria-label="Close"
          >
            <X size={17} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-5 flex-1 overflow-y-auto px-8 py-7"
        >
          {/* Description */}
          <div className="space-y-1">
            <Input
              ref={descRef}
              label="Description"
              type="text"
              placeholder="e.g. Supermercado Continente"
              value={values.description}
              onChange={handleChange("description")}
              maxLength={MAX_DESCRIPTION}
              error={errors.description}
              required
            />
            <p className={`text-[10px] font-mono text-right ${
              charsLeft < 20 ? "text-amber-500" : "text-zinc-700"
            }`}>
              {charsLeft} remaining
            </p>
          </div>

          {/* Amount */}
          <Input
            label="Amount (€)"
            type="number"
            placeholder="0,00"
            min="0.01"
            max="99999.99"
            step="0.01"
            value={values.amount}
            onChange={handleChange("amount")}
            error={errors.amount}
            required
          />

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-1.5">
              Category
              <span className="flex items-center gap-1 text-amber-400/70">
                <Sparkles size={9} />
                <span className="text-[9px] normal-case tracking-normal">AI auto-detected if blank</span>
              </span>
            </label>
            <select
              value={values.category}
              onChange={handleChange("category")}
              className="w-full bg-transparent border-b border-zinc-700 py-2.5 text-sm text-zinc-100 outline-none focus:border-amber-400 transition-colors appearance-none cursor-pointer"
            >
              <option value="" className="bg-zinc-900 text-zinc-400">
                — Let AI decide —
              </option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-zinc-900">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <Input
            label="Date"
            type="date"
            value={values.date}
            onChange={handleChange("date")}
            error={errors.date}
            required
          />

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
              Notes{" "}
              <span className="normal-case tracking-normal text-zinc-600">(optional)</span>
            </label>
            <textarea
              value={values.notes}
              onChange={handleChange("notes")}
              placeholder="Any extra details..."
              rows={3}
              maxLength={500}
              className="w-full bg-transparent border-b border-zinc-700 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-amber-400 transition-colors resize-none"
            />
          </div>

          {/* API error */}
          {apiError && (
            <div className="border border-red-800 bg-red-950/30 px-4 py-3 flex items-start gap-2.5">
              <span className="text-red-400 mt-0.5 shrink-0 text-xs">✕</span>
              <p className="text-xs font-mono text-red-400">{apiError}</p>
            </div>
          )}

          {/* Actions — pinned to bottom */}
          <div className="mt-auto pt-6 grid grid-cols-2 gap-3 border-t border-zinc-800/60">
            <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Save
            </Button>
          </div>

          {/* Keyboard hint */}
          <p className="text-center text-[10px] font-mono text-zinc-700 -mt-2">
            Press <kbd className="text-zinc-500">Esc</kbd> to close
          </p>
        </form>
      </div>
    </>
  );
}

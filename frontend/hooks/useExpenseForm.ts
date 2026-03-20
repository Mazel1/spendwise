"use client";

import { useState } from "react";
import { today } from "@/lib/utils";

export interface ExpenseFormValues {
  description: string;
  amount: string;
  category: string;
  date: string;
  notes: string;
}

export interface ExpenseFormErrors {
  description?: string;
  amount?: string;
  date?: string;
}

const INITIAL: ExpenseFormValues = {
  description: "",
  amount: "",
  category: "",
  date: today(),
  notes: "",
};

export function useExpenseForm() {
  const [values, setValues] = useState<ExpenseFormValues>(INITIAL);
  const [errors, setErrors] = useState<ExpenseFormErrors>({});

  const set = (field: keyof ExpenseFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      // Clear the error for this field as user types
      if (errors[field as keyof ExpenseFormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const validate = (): boolean => {
    const next: ExpenseFormErrors = {};

    if (!values.description.trim()) {
      next.description = "Description is required";
    } else if (values.description.trim().length < 2) {
      next.description = "Must be at least 2 characters";
    }

    const parsed = parseFloat(values.amount);
    if (!values.amount) {
      next.amount = "Amount is required";
    } else if (isNaN(parsed) || parsed <= 0) {
      next.amount = "Must be a positive number";
    } else if (parsed > 99_999.99) {
      next.amount = "Amount exceeds maximum (€99,999.99)";
    }

    if (!values.date) {
      next.date = "Date is required";
    } else {
      const d = new Date(values.date);
      const now = new Date();
      now.setFullYear(now.getFullYear() + 1);
      if (d > now) {
        next.date = "Date cannot be more than a year in the future";
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const reset = () => {
    setValues(INITIAL);
    setErrors({});
  };

  return { values, errors, set, validate, reset };
}

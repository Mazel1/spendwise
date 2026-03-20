"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { ApiError } from "@/types";

export function useFormError() {
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown) => {
    if (err instanceof AxiosError) {
      const data = err.response?.data as ApiError | undefined;
      setError(data?.detail ?? "Something went wrong. Please try again.");
    } else {
      setError("An unexpected error occurred.");
    }
  };

  const clearError = () => setError(null);

  return { error, handleError, clearError };
}

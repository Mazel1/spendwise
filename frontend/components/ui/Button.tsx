"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "ghost";
}

export default function Button({
  children,
  isLoading,
  variant = "primary",
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "relative w-full py-3 px-6 text-sm font-mono uppercase tracking-widest",
        "transition-all duration-200 disabled:cursor-not-allowed",
        variant === "primary" && [
          "bg-amber-400 text-zinc-950 hover:bg-amber-300",
          "disabled:bg-zinc-700 disabled:text-zinc-500",
        ],
        variant === "ghost" && [
          "border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100",
          "disabled:opacity-40",
        ],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}

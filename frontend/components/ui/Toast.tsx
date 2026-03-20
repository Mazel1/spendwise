"use client";

import { Toast as ToastType } from "@/hooks/useToast";
import { CheckCircle, XCircle } from "lucide-react";

interface ToastContainerProps {
  toasts: ToastType[];
}

export default function ToastContainer({ toasts }: ToastContainerProps) {
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`
            flex items-center gap-3 px-4 py-3 border text-sm font-mono
            animate-fade-up shadow-lg pointer-events-auto
            ${t.type === "success"
              ? "bg-zinc-950 border-green-700 text-green-400"
              : "bg-zinc-950 border-red-700 text-red-400"
            }
          `}
        >
          {t.type === "success"
            ? <CheckCircle size={14} strokeWidth={1.5} />
            : <XCircle size={14} strokeWidth={1.5} />
          }
          {t.message}
        </div>
      ))}
    </div>
  );
}

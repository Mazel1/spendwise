"use client";

import { MonthlyTotal } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface MonthlyTrendChartProps {
  months: MonthlyTotal[];
  trend: string;
}

const TREND_CONFIG = {
  increasing: { label: "Increasing", color: "text-red-400", bar: "bg-red-400" },
  decreasing: { label: "Decreasing", color: "text-green-400", bar: "bg-green-400" },
  stable:     { label: "Stable",     color: "text-amber-400", bar: "bg-amber-400" },
  insufficient_data: { label: "Not enough data", color: "text-zinc-500", bar: "bg-zinc-600" },
};

export default function MonthlyTrendChart({ months, trend }: MonthlyTrendChartProps) {
  const config = TREND_CONFIG[trend as keyof typeof TREND_CONFIG] ?? TREND_CONFIG.stable;

  if (!months.length) {
    return (
      <div className="flex items-center justify-center h-32 border border-dashed border-zinc-800">
        <p className="text-xs text-zinc-600 font-mono">No monthly data yet</p>
      </div>
    );
  }

  const max = Math.max(...months.map((m) => m.total), 1);
  // Show last 6 months max to keep it tight
  const visible = months.slice(-6);

  return (
    <div className="space-y-4">
      {/* Trend badge */}
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-mono uppercase tracking-widest ${config.color}`}>
          {config.label}
        </span>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-1.5 h-24">
        {visible.map((m, i) => {
          const heightPct = (m.total / max) * 100;
          const isLast = i === visible.length - 1;
          return (
            <div key={m.label} className="flex-1 flex flex-col items-center gap-1 group relative">
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-10 pointer-events-none">
                <div className="bg-zinc-800 border border-zinc-700 px-2 py-1 text-[10px] font-mono text-zinc-200 whitespace-nowrap">
                  {formatCurrency(m.total)}
                </div>
              </div>
              {/* Bar */}
              <div className="w-full flex items-end justify-center" style={{ height: "88px" }}>
                <div
                  className={`w-full transition-all duration-500 ${
                    isLast ? config.bar : "bg-zinc-700"
                  }`}
                  style={{ height: `${Math.max(heightPct, 2)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Month labels */}
      <div className="flex gap-1.5">
        {visible.map((m) => (
          <div key={m.label} className="flex-1 text-center">
            <span className="text-[9px] font-mono text-zinc-600 uppercase">
              {m.label.split(" ")[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

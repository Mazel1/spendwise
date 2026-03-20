"use client";

import { CategoryBreakdown } from "@/types";
import { formatCurrency } from "@/lib/utils";

const COLORS = [
  "#fbbf24", // amber
  "#60a5fa", // blue
  "#f472b6", // pink
  "#34d399", // green
  "#a78bfa", // purple
  "#fb923c", // orange
  "#94a3b8", // slate
];

interface CategoryChartProps {
  breakdown: CategoryBreakdown[];
}

export default function CategoryChart({ breakdown }: CategoryChartProps) {
  if (!breakdown.length) {
    return (
      <div className="flex items-center justify-center h-32 border border-dashed border-zinc-800">
        <p className="text-xs text-zinc-600 font-mono">No category data yet</p>
      </div>
    );
  }

  const total = breakdown.reduce((sum, c) => sum + c.total, 0);

  // Build bar segments as cumulative percentages for the stacked bar
  let cumulative = 0;
  const segments = breakdown.map((cat, i) => {
    const pct = (cat.total / total) * 100;
    const start = cumulative;
    cumulative += pct;
    return { ...cat, pct, start, color: COLORS[i % COLORS.length] };
  });

  return (
    <div className="space-y-5">
      {/* Stacked bar */}
      <div className="relative h-2 w-full bg-zinc-800 overflow-hidden">
        {segments.map((seg) => (
          <div
            key={seg.category}
            className="absolute top-0 h-full transition-all duration-500"
            style={{
              left: `${seg.start}%`,
              width: `${seg.pct}%`,
              backgroundColor: seg.color,
            }}
          />
        ))}
      </div>

      {/* Legend rows */}
      <div className="space-y-2.5">
        {segments.map((seg) => (
          <div key={seg.category} className="flex items-center justify-between group">
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className="shrink-0 w-2 h-2 rounded-full"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-xs text-zinc-400 font-mono truncate">
                {seg.category}
              </span>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-[10px] text-zinc-600 font-mono">
                {seg.pct.toFixed(1)}%
              </span>
              <span className="text-xs text-zinc-200 font-mono w-24 text-right">
                {formatCurrency(seg.total)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { Insight } from "@/types";
import { Lightbulb, TrendingUp, TrendingDown, Minus, Sparkles } from "lucide-react";

const TYPE_CONFIG: Record<string, { icon: React.ElementType; accent: string; bg: string }> = {
  trend:        { icon: TrendingUp,  accent: "text-amber-400",  bg: "border-amber-400/20 bg-amber-400/5"  },
  top_category: { icon: Sparkles,    accent: "text-blue-400",   bg: "border-blue-400/20 bg-blue-400/5"   },
  pattern:      { icon: Minus,       accent: "text-purple-400", bg: "border-purple-400/20 bg-purple-400/5"},
  onboarding:   { icon: Lightbulb,   accent: "text-zinc-400",   bg: "border-zinc-700 bg-zinc-900"         },
};

function InsightCard({ insight }: { insight: Insight }) {
  const config = TYPE_CONFIG[insight.type] ?? TYPE_CONFIG.onboarding;
  const Icon = config.icon;

  return (
    <div className={`border p-5 ${config.bg} transition-colors`}>
      <div className="flex items-start gap-3">
        <Icon size={14} className={`${config.accent} shrink-0 mt-0.5`} strokeWidth={1.5} />
        <div className="min-w-0">
          <p className={`text-[10px] font-mono uppercase tracking-[0.18em] mb-1.5 ${config.accent}`}>
            {insight.title}
          </p>
          <p className="text-sm text-zinc-300 leading-relaxed">{insight.body}</p>
        </div>
      </div>
    </div>
  );
}

function InsightSkeleton() {
  return (
    <div className="border border-zinc-800 p-5 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-3.5 h-3.5 bg-zinc-800 rounded mt-0.5 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-2 bg-zinc-800 rounded w-24" />
          <div className="h-3 bg-zinc-800 rounded w-full" />
          <div className="h-3 bg-zinc-800 rounded w-3/4" />
        </div>
      </div>
    </div>
  );
}

interface InsightsSectionProps {
  insights: Insight[];
  isLoading: boolean;
  error: string | null;
}

export default function InsightsSection({ insights, isLoading, error }: InsightsSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-500">
          AI Insights
        </h2>
        <span className="text-[9px] font-mono text-amber-400/60 border border-amber-400/20 px-1.5 py-0.5">
          Beta
        </span>
      </div>

      {error ? (
        <div className="border border-red-800/50 bg-red-950/20 px-5 py-4">
          <p className="text-xs font-mono text-red-400">{error}</p>
        </div>
      ) : isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <InsightSkeleton key={i} />)}
        </div>
      ) : insights.length === 0 ? (
        <div className="border border-dashed border-zinc-800 py-10 text-center">
          <p className="text-xs text-zinc-600 font-mono">No insights yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {insights.map((insight, i) => (
            <InsightCard key={i} insight={insight} />
          ))}
        </div>
      )}
    </div>
  );
}

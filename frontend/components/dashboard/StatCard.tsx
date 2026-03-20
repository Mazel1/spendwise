interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}

export default function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <div className="relative border border-zinc-800 p-6 bg-zinc-950 overflow-hidden">
      {accent && (
        <span className="absolute top-0 left-0 h-0.5 w-12 bg-amber-400" />
      )}
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-3">
        {label}
      </p>
      <p
        className="text-3xl text-zinc-100"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {value}
      </p>
      {sub && (
        <p className="mt-1.5 text-xs text-zinc-500 font-mono">{sub}</p>
      )}
    </div>
  );
}

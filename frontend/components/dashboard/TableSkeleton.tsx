export default function TableSkeleton() {
  return (
    <div className="border border-zinc-800 overflow-hidden animate-pulse">
      <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-zinc-800 bg-zinc-950">
        {[80, 60, 60, 50].map((w, i) => (
          <div key={i} className="h-2 bg-zinc-800 rounded" style={{ width: w }} />
        ))}
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-5 py-4 border-b border-zinc-800/60 last:border-0"
        >
          <div className="space-y-1.5">
            <div className="h-2.5 bg-zinc-800 rounded w-48" />
            <div className="h-2 bg-zinc-800/60 rounded w-24" />
          </div>
          <div className="h-5 w-16 bg-zinc-800 rounded" />
          <div className="h-2.5 w-20 bg-zinc-800 rounded" />
          <div className="h-3 w-14 bg-zinc-800 rounded" />
        </div>
      ))}
    </div>
  );
}

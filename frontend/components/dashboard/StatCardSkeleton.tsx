export default function StatCardSkeleton() {
  return (
    <div className="border border-zinc-800 p-6 bg-zinc-950 animate-pulse space-y-3">
      <div className="h-2 bg-zinc-800 rounded w-20" />
      <div className="h-8 bg-zinc-800 rounded w-32" />
      <div className="h-2 bg-zinc-800 rounded w-16" />
    </div>
  );
}

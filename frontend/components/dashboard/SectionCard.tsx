interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionCard({ title, children, className = "" }: SectionCardProps) {
  return (
    <div className={`border border-zinc-800 bg-zinc-950 p-6 ${className}`}>
      <h2 className="text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-500 mb-5">
        {title}
      </h2>
      {children}
    </div>
  );
}

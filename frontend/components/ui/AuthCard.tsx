"use client";

interface AuthCardProps {
  children: React.ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="relative w-full max-w-sm">
      {/* Decorative corner marks */}
      <span className="absolute -top-px -left-px h-4 w-4 border-t border-l border-amber-400" />
      <span className="absolute -top-px -right-px h-4 w-4 border-t border-r border-amber-400" />
      <span className="absolute -bottom-px -left-px h-4 w-4 border-b border-l border-amber-400" />
      <span className="absolute -bottom-px -right-px h-4 w-4 border-b border-r border-amber-400" />

      <div className="px-8 py-10">
        {children}
      </div>
    </div>
  );
}

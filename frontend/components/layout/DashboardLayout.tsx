"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, Receipt, Lightbulb, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Expenses",  href: "/expenses",  icon: Receipt },
  { label: "Insights",  href: "/insights",  icon: Lightbulb },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      {/* Sidebar */}
      <aside className="w-56 border-r border-zinc-800 flex flex-col bg-zinc-950 shrink-0">
        {/* Logo */}
        <div className="px-6 py-7 border-b border-zinc-800">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-400">
            SpendWise
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 flex flex-col gap-0.5">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors",
                  active
                    ? "text-amber-400 bg-amber-400/8"
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50"
                )}
              >
                <Icon size={13} strokeWidth={active ? 2 : 1.5} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User + logout */}
        <div className="px-6 py-5 border-t border-zinc-800">
          <p className="text-[10px] font-mono text-zinc-500 truncate mb-0.5">
            {user?.name}
          </p>
          <p className="text-[10px] font-mono text-zinc-700 truncate mb-4">
            {user?.email}
          </p>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-zinc-600 hover:text-zinc-300 transition-colors"
          >
            <LogOut size={11} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Upload, History, Settings, Menu, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/Avatar";
import { Drawer } from "@/components/Drawer";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Upload, label: "New Review", href: "/dashboard/new" },
  { icon: History, label: "My Reviews", href: "/dashboard/reviews" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

function DashboardNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const active =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded text-sm font-body transition-colors duration-fast",
              active
                ? "bg-surface-raised text-ink-primary"
                : "text-ink-secondary hover:text-ink-primary hover:bg-surface-raised"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

interface DashboardShellProps {
  children: React.ReactNode;
  user: {
    name: string;
    email: string;
    initials: string;
  };
}

export function DashboardShell({ children, user }: DashboardShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 border-r border-border h-screen sticky top-0 flex-col py-8 px-4">
        <Link href="/dashboard" className="block mb-8 px-3">
          <p className="text-xs font-body font-medium tracking-widest uppercase text-acid">
            Portfolio Review
          </p>
          <p className="text-sm text-ink-muted mt-1">AI-Powered Feedback</p>
        </Link>

        <DashboardNav />

        <div className="mt-auto pt-6 px-3">
          <div className="flex items-center gap-3 mb-3">
            <Avatar size="sm" initials={user.initials} />
            <div className="min-w-0">
              <p className="text-sm font-body font-medium text-ink-primary truncate">
                {user.name}
              </p>
              <p className="text-xs text-ink-muted truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-ink-muted hover:text-ink-secondary transition-colors duration-fast w-full rounded"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-surface-base border-b border-border px-4 py-3 flex items-center justify-between">
        <p className="text-xs font-body font-medium tracking-widest uppercase text-acid">
          Portfolio Review
        </p>
        <button
          onClick={() => setDrawerOpen(true)}
          className="text-ink-secondary hover:text-ink-primary transition-colors duration-fast"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        side="left"
        title="Navigation"
      >
        <DashboardNav onNavigate={() => setDrawerOpen(false)} />
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <Avatar size="sm" initials={user.initials} />
            <div className="min-w-0">
              <p className="text-sm font-body font-medium text-ink-primary truncate">
                {user.name}
              </p>
              <p className="text-xs text-ink-muted truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-xs text-ink-muted hover:text-ink-secondary transition-colors duration-fast"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      </Drawer>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-10 md:py-10 mt-14 md:mt-0">
          {children}
        </div>
      </main>
    </div>
  );
}

import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, type AppRole } from "@/hooks/use-auth";
import {
  LayoutDashboard,
  User,
  Briefcase,
  FileText,
  ClipboardList,
  CalendarDays,
  Bell,
  BarChart3,
  LogOut,
  Sparkles,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { ThemeToggle } from "@/components/theme-toggle";

type Item = { to: string; label: string; icon: typeof User; roles?: AppRole[] };

const NAV: Item[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/jobs", label: "Jobs & Internships", icon: Briefcase },
  { to: "/resume", label: "Resume & AI", icon: FileText, roles: ["student"] },
  { to: "/applications", label: "Applications", icon: ClipboardList },
  { to: "/interviews", label: "Interviews", icon: CalendarDays },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/analytics", label: "Analytics", icon: BarChart3, roles: ["tpo", "admin", "recruiter"] },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (!user) return;
    let mounted = true;
    const load = async () => {
      const { count } = await supabase
        .from("notifications")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("read", false);
      if (mounted) setUnread(count ?? 0);
    };
    load();
    const ch = supabase
      .channel("notif-" + user.id)
      .on("postgres_changes", { event: "*", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` }, load)
      .subscribe();
    return () => {
      mounted = false;
      supabase.removeChannel(ch);
    };
  }, [user]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const items = NAV.filter((i) => !i.roles || (role && i.roles.includes(role)));

  return (
    <div className="min-h-screen bg-muted/30">
      <Toaster richColors position="top-right" />
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 flex-col border-r bg-card">
        <div className="p-5 border-b">
          <Link to="/dashboard" className="flex items-center gap-2 font-display font-bold">
            <Sparkles className="size-5 text-primary" /> CareerForge
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {items.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || (to !== "/dashboard" && pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  active ? "bg-primary text-primary-foreground" : "hover:bg-accent/10 text-foreground"
                }`}
              >
                <Icon className="size-4" />
                <span className="flex-1">{label}</span>
                {to === "/notifications" && unread > 0 && (
                  <span className="ml-auto text-xs bg-destructive text-destructive-foreground rounded-full px-1.5">
                    {unread}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs text-muted-foreground truncate">
              {user?.email} · <span className="capitalize">{role ?? "—"}</span>
            </div>
            <ThemeToggle />
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={signOut}>
            <LogOut className="size-4" /> Sign out
          </Button>
        </div>
      </aside>

      {/* Mobile topbar */}
      <header className="lg:hidden sticky top-0 z-20 flex items-center justify-between p-3 border-b bg-card">
        <Link to="/dashboard" className="flex items-center gap-2 font-display font-bold">
          <Sparkles className="size-5 text-primary" /> CareerForge
        </Link>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setOpen((v) => !v)}>
            <Menu />
          </Button>
        </div>
      </header>
      {open && (
        <div className="lg:hidden border-b bg-card p-2 space-y-1">
          {items.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-accent/10"
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
          <Button variant="outline" size="sm" className="w-full" onClick={signOut}>
            <LogOut className="size-4" /> Sign out
          </Button>
        </div>
      )}

      <main className="lg:pl-60 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

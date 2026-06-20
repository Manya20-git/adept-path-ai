import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export const Route = createFileRoute("/_authenticated/notifications")({
  component: NotificationsPage,
});

type N = { id: string; title: string; message: string; link: string | null; read: boolean; created_at: string };

function NotificationsPage() {
  const { user } = useAuth();
  const [list, setList] = useState<N[]>([]);

  async function load() {
    if (!user) return;
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setList(data ?? []);
  }
  useEffect(() => { load(); }, [user]);

  async function markAllRead() {
    if (!user) return;
    await supabase.from("notifications").update({ read: true }).eq("user_id", user.id).eq("read", false);
    load();
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold">Notifications</h1>
        <Button variant="outline" size="sm" onClick={markAllRead}>Mark all read</Button>
      </div>
      <div className="space-y-2">
        {list.map((n) => {
          const inner = (
            <Card className={`p-4 flex gap-3 items-start ${!n.read ? "border-primary/40 bg-primary/5" : ""}`}>
              <Bell className="size-5 text-primary mt-0.5" />
              <div className="flex-1">
                <div className="font-medium">{n.title}</div>
                <div className="text-sm text-muted-foreground">{n.message}</div>
                <div className="text-xs text-muted-foreground mt-1">{new Date(n.created_at).toLocaleString()}</div>
              </div>
            </Card>
          );
          return n.link ? <Link key={n.id} to={n.link}>{inner}</Link> : <div key={n.id}>{inner}</div>;
        })}
        {list.length === 0 && <Card className="p-8 text-center text-muted-foreground">You're all caught up.</Card>}
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/applications")({
  component: ApplicationsPage,
});

type Row = {
  id: string;
  status: string;
  applied_at: string;
  student_id: string;
  job_id: string;
  jobs: { id: string; title: string; company: string; recruiter_id: string } | null;
  profiles: { full_name: string | null; email: string } | null;
};

const STATUS = ["applied", "reviewing", "shortlisted", "interview", "offer", "rejected", "withdrawn"];

function ApplicationsPage() {
  const { user, role } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);

  async function load() {
    if (!user || !role) return;
    const sel = "id,status,applied_at,student_id,job_id,jobs(id,title,company,recruiter_id)";
    let qb = supabase.from("applications").select(sel).order("applied_at", { ascending: false });
    if (role === "student") qb = qb.eq("student_id", user.id);
    const { data } = await qb;
    const baseRows = (data as unknown as Omit<Row, "profiles">[]) ?? [];
    // Fetch profiles in a second query
    const ids = Array.from(new Set(baseRows.map((r) => r.student_id)));
    let profMap: Record<string, { full_name: string | null; email: string }> = {};
    if (ids.length && role !== "student") {
      const { data: profs } = await supabase.from("profiles").select("id,full_name,email").in("id", ids);
      profMap = Object.fromEntries((profs ?? []).map((p) => [p.id, { full_name: p.full_name, email: p.email }]));
    }
    setRows(baseRows.map((r) => ({ ...r, profiles: profMap[r.student_id] ?? null })));
  }
  useEffect(() => { load(); }, [user, role]);

  async function updateStatus(r: Row, status: Row["status"]) {
    const { error } = await supabase.from("applications").update({ status: status as never }).eq("id", r.id);

    if (error) return toast.error(error.message);
    await supabase.from("notifications").insert({
      user_id: r.student_id,
      title: "Application update",
      message: `Your application to ${r.jobs?.title} is now ${status}.`,
      link: "/applications",
      type: "info",
    });
    toast.success("Updated");
    load();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-bold">Applications</h1>
      <div className="space-y-3">
        {rows.map((r) => (
          <Card key={r.id} className="p-4 flex items-center justify-between gap-3 flex-wrap">
            <div>
              {r.jobs ? (
                <Link to="/jobs/$jobId" params={{ jobId: r.jobs.id }} className="font-semibold hover:underline">
                  {r.jobs.title}
                </Link>
              ) : <span className="font-semibold">Job</span>}
              <div className="text-sm text-muted-foreground">{r.jobs?.company}</div>
              {role !== "student" && r.profiles && (
                <div className="text-xs text-muted-foreground">Applicant: {r.profiles.full_name ?? r.profiles.email}</div>
              )}
              <div className="text-xs text-muted-foreground">Applied {new Date(r.applied_at).toLocaleDateString()}</div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="capitalize">{r.status}</Badge>
              {role !== "student" && (
                <Select value={r.status} onValueChange={(v) => updateStatus(r, v as Row["status"])}>
                  <SelectTrigger className="w-36 h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {STATUS.map((s) => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              )}
              {role === "student" && r.status !== "withdrawn" && (
                <Button variant="outline" size="sm" onClick={() => updateStatus(r, "withdrawn")}>Withdraw</Button>
              )}
            </div>
          </Card>
        ))}
        {rows.length === 0 && <Card className="p-8 text-center text-muted-foreground">No applications yet.</Card>}
      </div>
    </div>
  );
}

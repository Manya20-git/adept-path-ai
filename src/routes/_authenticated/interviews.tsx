import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CalendarDays, Plus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/interviews")({
  component: InterviewsPage,
});

type Iv = {
  id: string;
  application_id: string;
  scheduled_at: string;
  duration_minutes: number;
  mode: string;
  location_or_link: string | null;
  status: string;
  applications: {
    id: string;
    student_id: string;
    jobs: { title: string; company: string; recruiter_id: string } | null;
  } | null;
  applicant?: { full_name: string | null; email: string } | null;
};


function InterviewsPage() {
  const { user, role } = useAuth();
  const [list, setList] = useState<Iv[]>([]);
  const [apps, setApps] = useState<{ id: string; label: string; student_id: string }[]>([]);

  async function load() {
    if (!user) return;
    const sel =
      "id,application_id,scheduled_at,duration_minutes,mode,location_or_link,status,applications(id,student_id,jobs(title,company,recruiter_id),profiles:student_id(full_name,email))";
    const { data } = await supabase.from("interviews").select(sel).order("scheduled_at", { ascending: true });
    setList((data as unknown as Iv[]) ?? []);
  }
  useEffect(() => { load(); }, [user, role]);

  useEffect(() => {
    if (!user || role === "student") return;
    (async () => {
      const { data } = await supabase
        .from("applications")
        .select("id,student_id,jobs!inner(title,recruiter_id)");
      const filtered = ((data as unknown as Array<{ id: string; student_id: string; jobs: { title: string; recruiter_id: string } | null }>) ?? [])
        .filter((a) => role !== "recruiter" || a.jobs?.recruiter_id === user.id);
      const ids = Array.from(new Set(filtered.map((a) => a.student_id)));
      const { data: profs } = ids.length
        ? await supabase.from("profiles").select("id,full_name,email").in("id", ids)
        : { data: [] as { id: string; full_name: string | null; email: string }[] };
      const pmap = Object.fromEntries((profs ?? []).map((p) => [p.id, p]));
      setApps(filtered.map((a) => ({
        id: a.id,
        student_id: a.student_id,
        label: `${pmap[a.student_id]?.full_name ?? pmap[a.student_id]?.email ?? a.student_id} — ${a.jobs?.title ?? ""}`,
      })));
    })();
  }, [user, role]);


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-3xl font-display font-bold">Interviews</h1>
        {role !== "student" && <ScheduleDialog apps={apps} onCreated={load} />}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {list.map((iv) => (
          <Card key={iv.id} className="p-5">
            <div className="flex items-start gap-3">
              <CalendarDays className="size-5 text-primary mt-1" />
              <div className="flex-1">
                <div className="font-semibold">{iv.applications?.jobs?.title ?? "Interview"}</div>
                <div className="text-sm text-muted-foreground">
                  {iv.applications?.jobs?.company}
                  {role !== "student" && iv.applicant && (
                    <> · {iv.applicant.full_name ?? iv.applicant.email}</>
                  )}

                </div>
                <div className="text-sm mt-2">
                  {new Date(iv.scheduled_at).toLocaleString()} · {iv.duration_minutes} min · {iv.mode}
                </div>
                {iv.location_or_link && (
                  <a href={iv.location_or_link} target="_blank" rel="noreferrer" className="text-sm text-primary underline break-all">
                    {iv.location_or_link}
                  </a>
                )}
              </div>
              <Badge variant="outline" className="capitalize">{iv.status}</Badge>
            </div>
          </Card>
        ))}
        {list.length === 0 && <Card className="p-8 text-center text-muted-foreground md:col-span-2">No interviews scheduled.</Card>}
      </div>
    </div>
  );
}

function ScheduleDialog({ apps, onCreated }: { apps: { id: string; label: string; student_id: string }[]; onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [appId, setAppId] = useState("");
  const [when, setWhen] = useState("");
  const [duration, setDuration] = useState(60);
  const [mode, setMode] = useState("video");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    const app = apps.find((a) => a.id === appId);
    const { error } = await supabase.from("interviews").insert({
      application_id: appId,
      scheduled_at: new Date(when).toISOString(),
      duration_minutes: duration,
      mode,
      location_or_link: link || null,
    });
    if (!error && app) {
      await supabase.from("applications").update({ status: "interview" }).eq("id", appId);
      await supabase.from("notifications").insert({
        user_id: app.student_id,
        title: "Interview scheduled",
        message: `Your interview is set for ${new Date(when).toLocaleString()}`,
        link: "/interviews",
        type: "info",
      });
    }
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Interview scheduled");
    setOpen(false);
    onCreated();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus /> Schedule interview</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Schedule interview</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Application</Label>
            <Select value={appId} onValueChange={setAppId}>
              <SelectTrigger><SelectValue placeholder="Select applicant…" /></SelectTrigger>
              <SelectContent>
                {apps.map((a) => <SelectItem key={a.id} value={a.id}>{a.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Date & time</Label>
            <Input type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Duration (min)</Label>
              <Input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
            </div>
            <div>
              <Label>Mode</Label>
              <Select value={mode} onValueChange={setMode}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="onsite">On-site</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Link or address</Label>
            <Input value={link} onChange={(e) => setLink(e.target.value)} />
          </div>
          <Button onClick={submit} disabled={loading || !appId || !when}>Schedule</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

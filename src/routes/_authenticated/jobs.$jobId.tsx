import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MapPin, Calendar, DollarSign } from "lucide-react";

export const Route = createFileRoute("/_authenticated/jobs/$jobId")({
  component: JobDetail,
});

function JobDetail() {
  const { jobId } = Route.useParams();
  const { user, role } = useAuth();
  const [job, setJob] = useState<Record<string, unknown> | null>(null);
  const [resumes, setResumes] = useState<{ id: string; file_name: string }[]>([]);
  const [resumeId, setResumeId] = useState("");
  const [cover, setCover] = useState("");
  const [existing, setExisting] = useState<{ id: string; status: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.from("jobs").select("*").eq("id", jobId).single().then(({ data }) => setJob(data));
  }, [jobId]);

  useEffect(() => {
    if (!user || role !== "student") return;
    supabase.from("resumes").select("id,file_name").eq("user_id", user.id).then(({ data }) => {
      setResumes(data ?? []);
      if (data?.[0]) setResumeId(data[0].id);
    });
    supabase.from("applications").select("id,status").eq("job_id", jobId).eq("student_id", user.id).maybeSingle()
      .then(({ data }) => setExisting(data));
  }, [user, role, jobId]);

  async function apply() {
    if (!user) return;
    setLoading(true);
    const { error } = await supabase.from("applications").insert({
      job_id: jobId,
      student_id: user.id,
      resume_id: resumeId || null,
      cover_letter: cover || null,
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    await supabase.from("notifications").insert({
      user_id: (job?.recruiter_id as string),
      title: "New applicant",
      message: `Someone applied to ${job?.title}`,
      link: "/applications",
      type: "info",
    });
    toast.success("Application submitted!");
    setExisting({ id: "new", status: "applied" });
  }

  if (!job) return <div>Loading…</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <Link to="/jobs" className="text-sm text-muted-foreground hover:underline">← Back to jobs</Link>
      <Card className="p-6">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-display font-bold">{job.title as string}</h1>
            <p className="text-muted-foreground">{job.company as string}</p>
          </div>
          <Badge variant="secondary" className="capitalize">{(job.job_type as string).replace("_", " ")}</Badge>
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1"><MapPin className="size-4" /> {job.remote ? "Remote" : (job.location as string) ?? "—"}</span>
          {job.application_deadline ? (
            <span className="inline-flex items-center gap-1"><Calendar className="size-4" /> Apply by {new Date(job.application_deadline as string).toLocaleDateString()}</span>
          ) : null}
          {(job.salary_min || job.salary_max) ? (
            <span className="inline-flex items-center gap-1"><DollarSign className="size-4" /> {job.salary_min as number}–{job.salary_max as number} {job.currency as string}</span>
          ) : null}

        </div>
        <div className="mt-5 space-y-4 text-sm">
          <Section title="Description">{String(job.description ?? "")}</Section>
          {job.requirements ? <Section title="Requirements">{String(job.requirements)}</Section> : null}
          {Array.isArray(job.required_skills) && (job.required_skills as string[]).length > 0 && (
            <div>
              <h3 className="font-semibold mb-1">Required skills</h3>
              <div className="flex flex-wrap gap-1">
                {(job.required_skills as string[]).map((s) => <Badge key={s} variant="outline">{s}</Badge>)}
              </div>
            </div>
          )}
        </div>

      </Card>

      {role === "student" && (
        <Card className="p-6 space-y-3">
          <h2 className="font-display text-lg font-semibold">Apply</h2>
          {existing ? (
            <p className="text-sm text-success">You've already applied · status: <span className="capitalize">{existing.status}</span></p>
          ) : (
            <>
              <div>
                <Label>Resume</Label>
                <select
                  className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                  value={resumeId}
                  onChange={(e) => setResumeId(e.target.value)}
                >
                  <option value="">— Select a resume —</option>
                  {resumes.map((r) => <option key={r.id} value={r.id}>{r.file_name}</option>)}
                </select>
                {resumes.length === 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    No resumes yet. <Link to="/resume" className="underline">Upload one</Link>.
                  </p>
                )}
              </div>
              <div>
                <Label>Cover letter (optional)</Label>
                <Textarea rows={4} value={cover} onChange={(e) => setCover(e.target.value)} />
              </div>
              <Button onClick={apply} disabled={loading}>Submit application</Button>
            </>
          )}
        </Card>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="whitespace-pre-wrap text-muted-foreground">{children}</p>
    </div>
  );
}

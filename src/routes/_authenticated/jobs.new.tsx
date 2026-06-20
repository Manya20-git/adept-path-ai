import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/jobs/new")({
  component: PostJob,
});

function PostJob() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    remote: false,
    job_type: "internship" as "internship" | "full_time" | "part_time" | "contract",
    description: "",
    requirements: "",
    required_skills: "",
    min_cgpa: "",
    salary_min: "",
    salary_max: "",
    application_deadline: "",
  });
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("jobs")
      .insert({
        recruiter_id: user.id,
        title: form.title,
        company: form.company,
        location: form.location || null,
        remote: form.remote,
        job_type: form.job_type,
        description: form.description,
        requirements: form.requirements || null,
        required_skills: form.required_skills.split(",").map((s) => s.trim()).filter(Boolean),
        min_cgpa: form.min_cgpa ? Number(form.min_cgpa) : null,
        salary_min: form.salary_min ? Number(form.salary_min) : null,
        salary_max: form.salary_max ? Number(form.salary_max) : null,
        application_deadline: form.application_deadline || null,
      })
      .select()
      .single();
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Job posted!");
    navigate({ to: "/jobs/$jobId", params: { jobId: data.id } });
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-display font-bold">Post a job</h1>
      <Card className="p-6">
        <form onSubmit={submit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <Label>Company</Label>
              <Input required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </div>
            <div>
              <Label>Location</Label>
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div>
              <Label>Type</Label>
              <Select value={form.job_type} onValueChange={(v) => setForm({ ...form, job_type: v as typeof form.job_type })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="full_time">Full-time</SelectItem>
                  <SelectItem value="part_time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={form.remote} onCheckedChange={(v) => setForm({ ...form, remote: !!v })} /> Remote
          </label>
          <div>
            <Label>Description</Label>
            <Textarea required rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div>
            <Label>Requirements</Label>
            <Textarea rows={3} value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} />
          </div>
          <div>
            <Label>Required skills (comma-separated)</Label>
            <Input value={form.required_skills} onChange={(e) => setForm({ ...form, required_skills: e.target.value })} />
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <Label>Min CGPA</Label>
              <Input type="number" step="0.01" value={form.min_cgpa} onChange={(e) => setForm({ ...form, min_cgpa: e.target.value })} />
            </div>
            <div>
              <Label>Salary min</Label>
              <Input type="number" value={form.salary_min} onChange={(e) => setForm({ ...form, salary_min: e.target.value })} />
            </div>
            <div>
              <Label>Salary max</Label>
              <Input type="number" value={form.salary_max} onChange={(e) => setForm({ ...form, salary_max: e.target.value })} />
            </div>
            <div>
              <Label>Deadline</Label>
              <Input type="date" value={form.application_deadline} onChange={(e) => setForm({ ...form, application_deadline: e.target.value })} />
            </div>
          </div>
          <Button type="submit" disabled={loading}>Publish job</Button>
        </form>
      </Card>
    </div>
  );
}

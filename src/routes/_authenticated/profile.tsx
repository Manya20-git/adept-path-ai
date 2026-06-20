import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user, role } = useAuth();
  const [p, setP] = useState<Record<string, unknown>>({});
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => {
      setP(data ?? {});
      setSkills((data?.skills ?? []).join(", "));
    });
  }, [user]);

  function set<K extends string>(k: K, v: unknown) {
    setP((prev) => ({ ...prev, [k]: v }));
  }

  async function save() {
    if (!user || !user.email) return;
    setLoading(true);
    const payload = {
      ...(p as Record<string, unknown>),
      id: user.id,
      email: user.email,
      skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
    };
    const { error } = await supabase.from("profiles").upsert(payload as never);

    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Profile saved");
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-3xl font-display font-bold">Profile</h1>
      <Card className="p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Full name</Label>
            <Input value={(p.full_name as string) ?? ""} onChange={(e) => set("full_name", e.target.value)} />
          </div>
          <div>
            <Label>Phone</Label>
            <Input value={(p.phone as string) ?? ""} onChange={(e) => set("phone", e.target.value)} />
          </div>
        </div>
        <div>
          <Label>Bio</Label>
          <Textarea value={(p.bio as string) ?? ""} onChange={(e) => set("bio", e.target.value)} />
        </div>

        {role === "student" && (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>University</Label>
                <Input value={(p.university as string) ?? ""} onChange={(e) => set("university", e.target.value)} />
              </div>
              <div>
                <Label>Degree</Label>
                <Input value={(p.degree as string) ?? ""} onChange={(e) => set("degree", e.target.value)} />
              </div>
              <div>
                <Label>Major</Label>
                <Input value={(p.major as string) ?? ""} onChange={(e) => set("major", e.target.value)} />
              </div>
              <div>
                <Label>Graduation year</Label>
                <Input
                  type="number"
                  value={(p.graduation_year as number) ?? ""}
                  onChange={(e) => set("graduation_year", Number(e.target.value) || null)}
                />
              </div>
              <div>
                <Label>CGPA</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={(p.cgpa as number) ?? ""}
                  onChange={(e) => set("cgpa", Number(e.target.value) || null)}
                />
              </div>
              <div>
                <Label>LinkedIn</Label>
                <Input value={(p.linkedin_url as string) ?? ""} onChange={(e) => set("linkedin_url", e.target.value)} />
              </div>
              <div>
                <Label>GitHub</Label>
                <Input value={(p.github_url as string) ?? ""} onChange={(e) => set("github_url", e.target.value)} />
              </div>
              <div>
                <Label>Portfolio</Label>
                <Input value={(p.portfolio_url as string) ?? ""} onChange={(e) => set("portfolio_url", e.target.value)} />
              </div>
            </div>
            <div>
              <Label>Skills (comma-separated)</Label>
              <Input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="React, TypeScript, SQL" />
            </div>
          </>
        )}

        {role === "recruiter" && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Company name</Label>
              <Input value={(p.company_name as string) ?? ""} onChange={(e) => set("company_name", e.target.value)} />
            </div>
            <div>
              <Label>Company website</Label>
              <Input value={(p.company_website as string) ?? ""} onChange={(e) => set("company_website", e.target.value)} />
            </div>
            <div>
              <Label>Your title</Label>
              <Input value={(p.job_title as string) ?? ""} onChange={(e) => set("job_title", e.target.value)} />
            </div>
          </div>
        )}

        <Button onClick={save} disabled={loading}>Save profile</Button>
      </Card>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Card } from "@/components/ui/card";
import { Briefcase, ClipboardList, CalendarDays, FileText, Users, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

type Stats = Record<string, number>;

function Dashboard() {
  const { user, role } = useAuth();
  const [stats, setStats] = useState<Stats>({});

  useEffect(() => {
    if (!user || !role) return;
    (async () => {
      const headCount = async (table: "jobs" | "applications" | "resumes", filters: [string, string | boolean][] = []) => {
        let q = supabase.from(table).select("id", { count: "exact", head: true }) as ReturnType<typeof supabase.from>["select"] extends infer _ ? ReturnType<typeof supabase.from> : never;
        // simpler: build inline
        let qb = supabase.from(table).select("id", { count: "exact", head: true });
        for (const [k, v] of filters) qb = (qb as ReturnType<typeof qb.eq>).eq(k, v as never);
        const { count } = await qb;
        void q;
        return count ?? 0;
      };
      if (role === "student") {
        setStats({
          jobs: await headCount("jobs", [["is_active", true]]),
          applications: await headCount("applications", [["student_id", user.id]]),
          interviews: 0,
          resumes: await headCount("resumes", [["user_id", user.id]]),
        });
      } else if (role === "recruiter") {
        setStats({
          jobs: await headCount("jobs", [["recruiter_id", user.id]]),
          applicants: 0,
        });
      } else {
        setStats({
          students: 0,
          jobs: await headCount("jobs"),
          applications: await headCount("applications"),
        });
      }
    })();
  }, [user, role]);


  const tiles =
    role === "student"
      ? [
          { label: "Open Jobs", value: stats.jobs, to: "/jobs", icon: Briefcase },
          { label: "My Applications", value: stats.applications, to: "/applications", icon: ClipboardList },
          { label: "Interviews", value: stats.interviews, to: "/interviews", icon: CalendarDays },
          { label: "Resumes", value: stats.resumes, to: "/resume", icon: FileText },
        ]
      : role === "recruiter"
      ? [
          { label: "Active Listings", value: stats.jobs, to: "/jobs", icon: Briefcase },
          { label: "Applicants", value: stats.applicants, to: "/applications", icon: Users },
          { label: "Interviews", value: stats.interviews ?? 0, to: "/interviews", icon: CalendarDays },
          { label: "Resumes", value: "→", to: "/resume", icon: FileText },
        ]
      : [
          { label: "Total Jobs", value: stats.jobs, to: "/jobs", icon: Briefcase },
          { label: "Applications", value: stats.applications, to: "/applications", icon: ClipboardList },
          { label: "Resumes", value: "→", to: "/resume", icon: FileText },
          { label: "Analytics", value: "→", to: "/analytics", icon: TrendingUp },
        ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold">Welcome back</h1>
        <p className="text-muted-foreground capitalize">{role} dashboard</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tiles.map((t) => (
          <Link key={t.label} to={t.to}>
            <Card className="p-5 hover:shadow-md transition-shadow">
              <t.icon className="size-5 text-primary" />
              <div className="mt-3 text-3xl font-bold">{t.value ?? 0}</div>
              <div className="text-sm text-muted-foreground">{t.label}</div>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="font-display text-lg font-semibold mb-2">Quick actions</h2>
        <div className="flex flex-wrap gap-2">
          {role === "student" && (
            <>
              <Link to="/jobs" className="text-sm px-3 py-1.5 rounded-md border hover:bg-accent/10">Browse jobs</Link>
              <Link to="/resume" className="text-sm px-3 py-1.5 rounded-md border hover:bg-accent/10">Upload resume</Link>
              <Link to="/profile" className="text-sm px-3 py-1.5 rounded-md border hover:bg-accent/10">Edit profile</Link>
            </>
          )}
          {role === "recruiter" && (
            <>
              <Link to="/jobs/new" className="text-sm px-3 py-1.5 rounded-md border hover:bg-accent/10">Post a job</Link>
              <Link to="/applications" className="text-sm px-3 py-1.5 rounded-md border hover:bg-accent/10">Review applicants</Link>
            </>
          )}
          {(role === "tpo" || role === "admin") && (
            <>
              <Link to="/analytics" className="text-sm px-3 py-1.5 rounded-md border hover:bg-accent/10">View analytics</Link>
              <Link to="/jobs" className="text-sm px-3 py-1.5 rounded-md border hover:bg-accent/10">All jobs</Link>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

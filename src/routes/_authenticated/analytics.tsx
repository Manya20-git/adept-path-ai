import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export const Route = createFileRoute("/_authenticated/analytics")({
  component: AnalyticsPage,
});

const COLORS = ["#6366f1", "#0ea5e9", "#22c55e", "#f59e0b", "#ef4444", "#a855f7", "#64748b"];

function AnalyticsPage() {
  const [stats, setStats] = useState<{ totalJobs: number; totalApps: number; totalStudents: number; totalRecruiters: number }>({
    totalJobs: 0,
    totalApps: 0,
    totalStudents: 0,
    totalRecruiters: 0,
  });
  const [byStatus, setByStatus] = useState<{ name: string; value: number }[]>([]);
  const [byType, setByType] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    (async () => {
      const [jobs, apps, students, recruiters, appsRaw, jobsRaw] = await Promise.all([
        supabase.from("jobs").select("id", { count: "exact", head: true }),
        supabase.from("applications").select("id", { count: "exact", head: true }),
        supabase.from("user_roles").select("user_id", { count: "exact", head: true }).eq("role", "student"),
        supabase.from("user_roles").select("user_id", { count: "exact", head: true }).eq("role", "recruiter"),
        supabase.from("applications").select("status"),
        supabase.from("jobs").select("job_type"),
      ]);
      setStats({
        totalJobs: jobs.count ?? 0,
        totalApps: apps.count ?? 0,
        totalStudents: students.count ?? 0,
        totalRecruiters: recruiters.count ?? 0,
      });
      const sc: Record<string, number> = {};
      (appsRaw.data ?? []).forEach((a: { status: string }) => (sc[a.status] = (sc[a.status] ?? 0) + 1));
      setByStatus(Object.entries(sc).map(([name, value]) => ({ name, value })));
      const tc: Record<string, number> = {};
      (jobsRaw.data ?? []).forEach((j: { job_type: string }) => (tc[j.job_type] = (tc[j.job_type] ?? 0) + 1));
      setByType(Object.entries(tc).map(([name, value]) => ({ name: name.replace("_", " "), value })));
    })();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-bold">Placement analytics</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Students" value={stats.totalStudents} />
        <Stat label="Recruiters" value={stats.totalRecruiters} />
        <Stat label="Jobs Posted" value={stats.totalJobs} />
        <Stat label="Applications" value={stats.totalApps} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5">
          <h2 className="font-display font-semibold mb-3">Applications by status</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={byStatus}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="font-display font-semibold mb-3">Jobs by type</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={byType} dataKey="value" nameKey="name" outerRadius={90} label>
                  {byType.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card className="p-5">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </Card>
  );
}

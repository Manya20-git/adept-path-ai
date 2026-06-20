import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase as BriefcaseIcon, Plus, SlidersHorizontal, RotateCcw, Globe, Building } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_authenticated/jobs")({
  component: JobsLayout,
});

function JobsLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/jobs") return <Outlet />;
  return <JobsList />;
}

type Job = {
  id: string;
  title: string;
  company: string;
  location: string | null;
  remote: boolean;
  job_type: string;
  description: string;
  required_skills: string[] | null;
  recruiter_id: string;
  created_at: string;
  is_active: boolean;
};

const categories = [
  { value: "all", label: "All Categories" },
  { value: "engineering", label: "Engineering / Tech" },
  { value: "design", label: "Design / Creative" },
  { value: "product", label: "Product Management" },
  { value: "marketing", label: "Marketing / Sales" },
  { value: "other", label: "Other / Business" },
];

const jobTypes = [
  { value: "all", label: "All Types" },
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
  { value: "internship", label: "Internship" },
  { value: "contract", label: "Contract" },
];

// Helper to dynamically categorize a job based on its text
const getCategory = (job: Job) => {
  const text = `${job.title} ${job.description} ${(job.required_skills ?? []).join(" ")}`.toLowerCase();
  if (text.includes("software") || text.includes("developer") || text.includes("engineer") || text.includes("code") || text.includes("frontend") || text.includes("backend") || text.includes("tech")) return "engineering";
  if (text.includes("design") || text.includes("ui") || text.includes("ux") || text.includes("product designer") || text.includes("creative")) return "design";
  if (text.includes("product manager") || text.includes("pm") || text.includes("product management")) return "product";
  if (text.includes("marketing") || text.includes("sales") || text.includes("seo") || text.includes("social media")) return "marketing";
  return "other";
};

function JobsList() {
  const { user, role } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [q, setQ] = useState("");
  const [jobType, setJobType] = useState<string>("all");
  const [remoteOnly, setRemoteOnly] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  useEffect(() => {
    if (!role) return;
    let qb = supabase.from("jobs").select("*").order("created_at", { ascending: false });
    if (role === "recruiter" && user) qb = qb.eq("recruiter_id", user.id);
    else qb = qb.eq("is_active", true);
    qb.then(({ data }) => setJobs((data as Job[]) ?? []));
  }, [user, role]);

  const resetFilters = () => {
    setQ("");
    setJobType("all");
    setRemoteOnly(false);
    setCategory("all");
    setSortBy("newest");
  };

  const isFiltersActive = q !== "" || jobType !== "all" || remoteOnly || category !== "all" || sortBy !== "newest";

  const filtered = jobs
    .filter((j) => {
      // 1. Text Search query
      if (q) {
        const text = `${j.title} ${j.company} ${j.location ?? ""} ${(j.required_skills ?? []).join(" ")}`.toLowerCase();
        if (!text.includes(q.toLowerCase())) return false;
      }
      
      // 2. Job Type filter
      if (jobType !== "all" && j.job_type !== jobType) return false;
      
      // 3. Remote filter
      if (remoteOnly && !j.remote) return false;
      
      // 4. Category filter
      if (category !== "all" && getCategory(j) !== category) return false;
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sortBy === "oldest") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sortBy === "company") return a.company.localeCompare(b.company);
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Jobs & Internships</h1>
          <p className="text-muted-foreground">{filtered.length} listing{filtered.length === 1 ? "" : "s"} found</p>
        </div>
        {(role === "recruiter" || role === "tpo" || role === "admin") && (
          <Link to="/jobs/new">
            <Button className="cursor-pointer"><Plus /> Post a job</Button>
          </Link>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-3 space-y-5 bg-card border border-border/80 rounded-2xl p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold">
              <SlidersHorizontal className="size-4 text-primary" />
              <span>Filters</span>
            </div>
            {isFiltersActive && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <RotateCcw className="size-3 mr-1" />
                Reset
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {/* Search Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Keyword Search</label>
              <Input
                placeholder="Search jobs, skills..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="h-9.5 text-sm"
              />
            </div>

            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-9.5 text-sm cursor-pointer">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value} className="cursor-pointer">
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Job Type Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Job Type</label>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger className="h-9.5 text-sm cursor-pointer">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value} className="cursor-pointer">
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Remote Only Toggle */}
            <div className="flex items-center justify-between py-2 border-y border-border/50">
              <div className="space-y-0.5">
                <label htmlFor="remote-toggle" className="text-xs font-bold uppercase tracking-wider text-muted-foreground cursor-pointer">Remote Only</label>
                <p className="text-[10px] text-muted-foreground leading-none">Show virtual positions</p>
              </div>
              <Switch
                id="remote-toggle"
                checked={remoteOnly}
                onCheckedChange={setRemoteOnly}
              />
            </div>

            {/* Sorting Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-9.5 text-sm cursor-pointer">
                  <SelectValue placeholder="Newest First" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest" className="cursor-pointer">Newest First</SelectItem>
                  <SelectItem value="oldest" className="cursor-pointer">Oldest First</SelectItem>
                  <SelectItem value="company" className="cursor-pointer">Company Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </aside>

        {/* Listings Content */}
        <div className="lg:col-span-9 space-y-4">
          {/* Active filter badges row */}
          {isFiltersActive && (
            <div className="flex flex-wrap gap-1.5 items-center text-xs">
              <span className="text-muted-foreground mr-1">Active filters:</span>
              {q && (
                <Badge variant="secondary" className="gap-1">
                  Query: {q}
                  <button onClick={() => setQ("")} className="hover:text-destructive cursor-pointer font-bold ml-1">×</button>
                </Badge>
              )}
              {category !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Category: {categories.find((c) => c.value === category)?.label}
                  <button onClick={() => setCategory("all")} className="hover:text-destructive cursor-pointer font-bold ml-1">×</button>
                </Badge>
              )}
              {jobType !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Type: {jobTypes.find((t) => t.value === jobType)?.label}
                  <button onClick={() => setJobType("all")} className="hover:text-destructive cursor-pointer font-bold ml-1">×</button>
                </Badge>
              )}
              {remoteOnly && (
                <Badge variant="secondary" className="gap-1">
                  Remote Only
                  <button onClick={() => setRemoteOnly(false)} className="hover:text-destructive cursor-pointer font-bold ml-1">×</button>
                </Badge>
              )}
              {sortBy !== "newest" && (
                <Badge variant="secondary" className="gap-1">
                  Sort: {sortBy}
                  <button onClick={() => setSortBy("newest")} className="hover:text-destructive cursor-pointer font-bold ml-1">×</button>
                </Badge>
              )}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((j) => (
              <Link key={j.id} to="/jobs/$jobId" params={{ jobId: j.id }}>
                <Card className="p-5 h-full hover:shadow-md transition-shadow bg-card flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold text-foreground">{j.title}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Building className="size-3.5" />
                          {j.company}
                        </div>
                      </div>
                      <Badge variant="secondary" className="capitalize shrink-0">
                        {j.job_type.replace("_", " ")}
                      </Badge>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3" /> {j.remote ? "Remote" : j.location ?? "—"}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <BriefcaseIcon className="size-3" /> {new Date(j.created_at).toLocaleDateString()}
                      </span>
                      {j.remote && (
                        <span className="inline-flex items-center gap-1 text-success">
                          <Globe className="size-3" /> Virtual
                        </span>
                      )}
                    </div>

                    <div className="mt-3 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {j.description}
                    </div>
                  </div>

                  {j.required_skills && j.required_skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1 border-t border-border/50 pt-3">
                      {j.required_skills.slice(0, 4).map((s) => (
                        <Badge key={s} variant="outline" className="text-[10px] py-0 px-1.5">
                          {s}
                        </Badge>
                      ))}
                      {j.required_skills.length > 4 && (
                        <Badge variant="outline" className="text-[10px] py-0 px-1.5 text-muted-foreground">
                          +{j.required_skills.length - 4} more
                        </Badge>
                      )}
                    </div>
                  )}
                </Card>
              </Link>
            ))}
            
            {filtered.length === 0 && (
              <Card className="p-12 text-center text-muted-foreground md:col-span-2 flex flex-col items-center justify-center space-y-3 bg-card border-dashed">
                <SlidersHorizontal className="size-8 text-muted-foreground/60" />
                <div>
                  <h3 className="font-semibold text-foreground">No listings match filters</h3>
                  <p className="text-sm text-muted-foreground mt-1">Try expanding your search query or adjusting your filters.</p>
                </div>
                {isFiltersActive && (
                  <Button variant="outline" size="sm" onClick={resetFilters} className="mt-2 cursor-pointer">
                    Clear all filters
                  </Button>
                )}
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useServerFn } from "@tanstack/react-start";
import { analyzeResume } from "@/lib/ai.functions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Upload, Sparkles, Trash2, FileText, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";

export const Route = createFileRoute("/_authenticated/resume")({
  component: ResumePage,
});

type Resume = {
  id: string;
  file_name: string;
  file_path: string;
  ai_score: number | null;
  ai_strengths: string[] | null;
  ai_weaknesses: string[] | null;
  ai_suggestions: string[] | null;
  extracted_skills: string[] | null;
  analyzed_at: string | null;
  created_at: string;
  user_id: string;
  profiles?: { full_name: string | null; email: string } | null;
};

function ResumePage() {
  const { user, role } = useAuth();
  const [list, setList] = useState<Resume[]>([]);
  const [uploading, setUploading] = useState(false);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [viewUrl, setViewUrl] = useState<string | null>(null);
  const [viewName, setViewName] = useState<string>("");
  const analyze = useServerFn(analyzeResume);

  async function load() {
    if (!user || !role) return;
    
    let qb = supabase.from("resumes").select("*").order("created_at", { ascending: false });
    if (role === "student") {
      qb = qb.eq("user_id", user.id);
    }
    
    const { data } = await qb;
    const baseRows = (data as Resume[]) ?? [];
    
    let profMap: Record<string, { full_name: string | null; email: string }> = {};
    if (baseRows.length && role !== "student") {
      const ids = Array.from(new Set(baseRows.map((r) => r.user_id)));
      const { data: profs } = await supabase.from("profiles").select("id,full_name,email").in("id", ids);
      profMap = Object.fromEntries((profs ?? []).map((p) => [p.id, { full_name: p.full_name, email: p.email }]));
    }
    
    setList(baseRows.map((r) => ({ ...r, profiles: profMap[r.user_id] ?? null })));
  }
  useEffect(() => { load(); }, [user, role]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    const path = `${user.id}/${Date.now()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from("resumes").upload(path, file);
    if (upErr) {
      setUploading(false);
      return toast.error(upErr.message);
    }
    const { error } = await supabase.from("resumes").insert({
      user_id: user.id,
      file_path: path,
      file_name: file.name,
      file_size: file.size,
    });
    setUploading(false);
    if (error) return toast.error(error.message);
    toast.success("Resume uploaded");
    load();
  }

  async function runAnalysis(id: string) {
    setAnalyzingId(id);
    try {
      await analyze({ data: { resumeId: id } });
      toast.success("AI analysis complete");
      load();
    } catch (e) {
      toast.error((e as Error).message || "Analysis failed");
    } finally {
      setAnalyzingId(null);
    }
  }

  async function remove(r: Resume) {
    if (!confirm("Delete this resume?")) return;
    await supabase.storage.from("resumes").remove([r.file_path]);
    await supabase.from("resumes").delete().eq("id", r.id);
    load();
  }

  async function download(r: Resume) {
    const { data } = await supabase.storage.from("resumes").createSignedUrl(r.file_path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  }

  async function view(r: Resume) {
    const { data } = await supabase.storage.from("resumes").createSignedUrl(r.file_path, 3600);
    if (data?.signedUrl) {
      setViewUrl(data.signedUrl);
      setViewName(r.file_name);
    } else {
      toast.error("Could not load resume preview");
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-display font-bold">{role === "student" ? "Resume & AI analysis" : "All Resumes"}</h1>
        <p className="text-muted-foreground">{role === "student" ? "Upload your resume and get AI-powered feedback." : "View resumes uploaded by all users."}</p>
      </div>

      {role === "student" && (
        <Card className="p-6">
          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 cursor-pointer hover:bg-accent/5 text-center">
            <Upload className="size-8 text-muted-foreground mb-2" />
            <span className="font-medium">Click to upload PDF / DOCX</span>
            <span className="text-xs text-muted-foreground mt-1">Stored privately in your account</span>
            <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
          {uploading && <p className="text-sm text-muted-foreground mt-2">Uploading…</p>}
        </Card>
      )}

      <div className="space-y-4">
        {list.map((r) => (
          <Card key={r.id} className="p-5">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-start gap-3">
                <FileText className="size-5 text-primary mt-1" />
                <div>
                  <div className="font-semibold">{r.file_name}</div>
                  {role !== "student" && r.profiles && (
                    <div className="text-sm font-medium mt-0.5">
                      Uploaded by: {r.profiles.full_name ?? r.profiles.email}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Uploaded {new Date(r.created_at).toLocaleDateString()}
                    {r.analyzed_at && ` · Analyzed ${new Date(r.analyzed_at).toLocaleDateString()}`}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => view(r)}>
                  <Eye className="size-4 mr-1" /> View
                </Button>
                <Button variant="outline" size="sm" onClick={() => download(r)}>Download</Button>
                <Button size="sm" onClick={() => runAnalysis(r.id)} disabled={analyzingId === r.id}>
                  {analyzingId === r.id ? <Loader2 className="animate-spin" /> : <Sparkles />}
                  {r.analyzed_at ? "Re-analyze" : "Analyze with AI"}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => remove(r)}><Trash2 /></Button>
              </div>
            </div>

            {r.ai_score != null && (
              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Resume score</span>
                    <span className="font-semibold">{r.ai_score}/100</span>
                  </div>
                  <Progress value={r.ai_score} />
                </div>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  <Block title="Strengths" items={r.ai_strengths} tone="success" />
                  <Block title="Weaknesses" items={r.ai_weaknesses} tone="destructive" />
                  <Block title="Suggestions" items={r.ai_suggestions} tone="muted" />
                </div>
                {r.extracted_skills && r.extracted_skills.length > 0 && (
                  <div>
                    <div className="text-sm font-medium mb-1">Detected skills</div>
                    <div className="flex flex-wrap gap-1">
                      {r.extracted_skills.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
        {list.length === 0 && (
          <Card className="p-8 text-center text-muted-foreground">No resumes yet.</Card>
        )}
      </div>

      <Dialog open={!!viewUrl} onOpenChange={(open) => !open && setViewUrl(null)}>
        <DialogContent className="max-w-4xl w-full h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{viewName}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 w-full bg-muted/30 rounded-md overflow-hidden relative">
            {viewUrl && (
              <iframe 
                src={viewName.toLowerCase().endsWith('.pdf') ? viewUrl : `https://docs.google.com/gview?url=${encodeURIComponent(viewUrl)}&embedded=true`} 
                className="w-full h-full border-0" 
                title="Resume Preview"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Block({ title, items, tone }: { title: string; items: string[] | null; tone: "success" | "destructive" | "muted" }) {
  const cls = tone === "success" ? "text-success" : tone === "destructive" ? "text-destructive" : "text-foreground";
  return (
    <div>
      <div className={`font-medium mb-1 ${cls}`}>{title}</div>
      <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
        {(items ?? []).map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
  );
}

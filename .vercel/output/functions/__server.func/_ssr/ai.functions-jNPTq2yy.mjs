import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Dpn8S0gM.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai.functions-jNPTq2yy.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var AnalyzeInput = objectType({ resumeId: stringType().uuid() });
var analyzeResume_createServerFn_handler = createServerRpc({
	id: "729fe7e1bca7b53fc698f05380199640b983d62d008b2d810b401881366deb9f",
	name: "analyzeResume",
	filename: "src/lib/ai.functions.ts"
}, (opts) => analyzeResume.__executeServer(opts));
var analyzeResume = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => AnalyzeInput.parse(d)).handler(analyzeResume_createServerFn_handler, async ({ data, context }) => {
	const { supabase, userId } = context;
	const { data: resume, error } = await supabase.from("resumes").select("*").eq("id", data.resumeId).eq("user_id", userId).single();
	if (error || !resume) throw new Error("Resume not found");
	const { data: profile } = await supabase.from("profiles").select("full_name, university, degree, major, skills, bio").eq("id", userId).single();
	const apiKey = process.env.OPENAI_API_KEY ?? process.env.LOVABLE_API_KEY;
	if (!apiKey) throw new Error("AI provider not configured");
	const useOpenAI = Boolean(process.env.OPENAI_API_KEY);
	const prompt = `You are an expert career coach analyzing a student's resume profile for internship/placement readiness.

Candidate context:
- Name: ${profile?.full_name ?? "N/A"}
- University: ${profile?.university ?? "N/A"}
- Degree/Major: ${profile?.degree ?? ""} ${profile?.major ?? ""}
- Listed skills: ${(profile?.skills ?? []).join(", ") || "none listed"}
- Bio: ${profile?.bio ?? "N/A"}
- Resume file: ${resume.file_name}

Return STRICT JSON only matching this TypeScript type:
{ "score": number (0-100), "strengths": string[] (3-5), "weaknesses": string[] (3-5), "suggestions": string[] (4-6 actionable), "skills": string[] (10-20 normalized skills) }`;
	const res = await fetch(useOpenAI ? "https://api.openai.com/v1/chat/completions" : "https://ai.gateway.lovable.dev/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: useOpenAI ? "gpt-4o-mini" : "google/gemini-2.5-flash",
			messages: [{
				role: "system",
				content: "You are a JSON-only resume analyzer. Output valid JSON only — no markdown, no prose."
			}, {
				role: "user",
				content: prompt
			}],
			response_format: { type: "json_object" }
		})
	});
	if (res.status === 429) throw new Error("AI rate limit hit. Try again shortly.");
	if (res.status === 402) throw new Error("AI credits exhausted.");
	if (!res.ok) throw new Error(`AI error ${res.status}`);
	const text = (await res.json()).choices?.[0]?.message?.content ?? "{}";
	let parsed;
	try {
		parsed = JSON.parse(text);
	} catch {
		const m = text.match(/\{[\s\S]*\}/);
		parsed = m ? JSON.parse(m[0]) : {
			score: 0,
			strengths: [],
			weaknesses: [],
			suggestions: [],
			skills: []
		};
	}
	await supabase.from("resumes").update({
		ai_score: Math.max(0, Math.min(100, Math.round(parsed.score ?? 0))),
		ai_strengths: parsed.strengths ?? [],
		ai_weaknesses: parsed.weaknesses ?? [],
		ai_suggestions: parsed.suggestions ?? [],
		extracted_skills: parsed.skills ?? [],
		analyzed_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", data.resumeId);
	return parsed;
});
//#endregion
export { analyzeResume_createServerFn_handler };

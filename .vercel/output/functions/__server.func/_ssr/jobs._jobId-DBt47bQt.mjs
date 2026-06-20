import { r as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-b2cvW5Yq.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as useAuth } from "./use-auth-B-IxDn60.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Button } from "./button-C6SIlxGV.mjs";
import { O as DollarSign, R as Calendar, y as MapPin } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Route } from "./jobs._jobId-Bl2VFu77.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jobs._jobId-DBt47bQt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function JobDetail() {
	const { jobId } = Route.useParams();
	const { user, role } = useAuth();
	const [job, setJob] = (0, import_react.useState)(null);
	const [resumes, setResumes] = (0, import_react.useState)([]);
	const [resumeId, setResumeId] = (0, import_react.useState)("");
	const [cover, setCover] = (0, import_react.useState)("");
	const [existing, setExisting] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.from("jobs").select("*").eq("id", jobId).single().then(({ data }) => setJob(data));
	}, [jobId]);
	(0, import_react.useEffect)(() => {
		if (!user || role !== "student") return;
		supabase.from("resumes").select("id,file_name").eq("user_id", user.id).then(({ data }) => {
			setResumes(data ?? []);
			if (data?.[0]) setResumeId(data[0].id);
		});
		supabase.from("applications").select("id,status").eq("job_id", jobId).eq("student_id", user.id).maybeSingle().then(({ data }) => setExisting(data));
	}, [
		user,
		role,
		jobId
	]);
	async function apply() {
		if (!user) return;
		setLoading(true);
		const { error } = await supabase.from("applications").insert({
			job_id: jobId,
			student_id: user.id,
			resume_id: resumeId || null,
			cover_letter: cover || null
		});
		setLoading(false);
		if (error) return toast.error(error.message);
		await supabase.from("notifications").insert({
			user_id: job?.recruiter_id,
			title: "New applicant",
			message: `Someone applied to ${job?.title}`,
			link: "/applications",
			type: "info"
		});
		toast.success("Application submitted!");
		setExisting({
			id: "new",
			status: "applied"
		});
	}
	if (!job) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Loading…" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-4xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/jobs",
				className: "text-sm text-muted-foreground hover:underline",
				children: "← Back to jobs"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-display font-bold",
							children: job.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: job.company
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "capitalize",
							children: job.job_type.replace("_", " ")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }),
									" ",
									job.remote ? "Remote" : job.location ?? "—"
								]
							}),
							job.application_deadline ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-4" }),
									" Apply by ",
									new Date(job.application_deadline).toLocaleDateString()
								]
							}) : null,
							job.salary_min || job.salary_max ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "size-4" }),
									" ",
									job.salary_min,
									"–",
									job.salary_max,
									" ",
									job.currency
								]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
								title: "Description",
								children: String(job.description ?? "")
							}),
							job.requirements ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
								title: "Requirements",
								children: String(job.requirements)
							}) : null,
							Array.isArray(job.required_skills) && job.required_skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold mb-1",
								children: "Required skills"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1",
								children: job.required_skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									children: s
								}, s))
							})] })
						]
					})
				]
			}),
			role === "student" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Apply"
				}), existing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-success",
					children: ["You've already applied · status: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "capitalize",
						children: existing.status
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Resume" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm",
							value: resumeId,
							onChange: (e) => setResumeId(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "— Select a resume —"
							}), resumes.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: r.id,
								children: r.file_name
							}, r.id))]
						}),
						resumes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: [
								"No resumes yet. ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/resume",
									className: "underline",
									children: "Upload one"
								}),
								"."
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Cover letter (optional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 4,
						value: cover,
						onChange: (e) => setCover(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: apply,
						disabled: loading,
						children: "Submit application"
					})
				] })]
			})
		]
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "font-semibold mb-1",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "whitespace-pre-wrap text-muted-foreground",
		children
	})] });
}
//#endregion
export { JobDetail as component };

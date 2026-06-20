import { r as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-b2cvW5Yq.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as useAuth } from "./use-auth-B-IxDn60.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Button } from "./button-C6SIlxGV.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CYB-gyWu.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/applications-7I9-Ofda.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS = [
	"applied",
	"reviewing",
	"shortlisted",
	"interview",
	"offer",
	"rejected",
	"withdrawn"
];
function ApplicationsPage() {
	const { user, role } = useAuth();
	const [rows, setRows] = (0, import_react.useState)([]);
	async function load() {
		if (!user || !role) return;
		let qb = supabase.from("applications").select("id,status,applied_at,student_id,job_id,jobs(id,title,company,recruiter_id)").order("applied_at", { ascending: false });
		if (role === "student") qb = qb.eq("student_id", user.id);
		const { data } = await qb;
		const baseRows = data ?? [];
		const ids = Array.from(new Set(baseRows.map((r) => r.student_id)));
		let profMap = {};
		if (ids.length && role !== "student") {
			const { data: profs } = await supabase.from("profiles").select("id,full_name,email").in("id", ids);
			profMap = Object.fromEntries((profs ?? []).map((p) => [p.id, {
				full_name: p.full_name,
				email: p.email
			}]));
		}
		setRows(baseRows.map((r) => ({
			...r,
			profiles: profMap[r.student_id] ?? null
		})));
	}
	(0, import_react.useEffect)(() => {
		load();
	}, [user, role]);
	async function updateStatus(r, status) {
		const { error } = await supabase.from("applications").update({ status }).eq("id", r.id);
		if (error) return toast.error(error.message);
		await supabase.from("notifications").insert({
			user_id: r.student_id,
			title: "Application update",
			message: `Your application to ${r.jobs?.title} is now ${status}.`,
			link: "/applications",
			type: "info"
		});
		toast.success("Updated");
		load();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-display font-bold",
			children: "Applications"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4 flex items-center justify-between gap-3 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					r.jobs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/jobs/$jobId",
						params: { jobId: r.jobs.id },
						className: "font-semibold hover:underline",
						children: r.jobs.title
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold",
						children: "Job"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-muted-foreground",
						children: r.jobs?.company
					}),
					role !== "student" && r.profiles && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: ["Applicant: ", r.profiles.full_name ?? r.profiles.email]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: ["Applied ", new Date(r.applied_at).toLocaleDateString()]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: "capitalize",
							children: r.status
						}),
						role !== "student" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: r.status,
							onValueChange: (v) => updateStatus(r, v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-36 h-8 text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: STATUS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: s,
								className: "capitalize",
								children: s
							}, s)) })]
						}),
						role === "student" && r.status !== "withdrawn" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => updateStatus(r, "withdrawn"),
							children: "Withdraw"
						})
					]
				})]
			}, r.id)), rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-8 text-center text-muted-foreground",
				children: "No applications yet."
			})]
		})]
	});
}
//#endregion
export { ApplicationsPage as component };

import { r as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-b2cvW5Yq.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as useAuth } from "./use-auth-B-IxDn60.mjs";
import { D as FileText, H as Briefcase, a as TrendingUp, k as ClipboardList, n as Users, z as CalendarDays } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-rBC8n-Pv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const { user, role } = useAuth();
	const [stats, setStats] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		if (!user || !role) return;
		(async () => {
			const headCount = async (table, filters = []) => {
				supabase.from(table).select("id", {
					count: "exact",
					head: true
				});
				let qb = supabase.from(table).select("id", {
					count: "exact",
					head: true
				});
				for (const [k, v] of filters) qb = qb.eq(k, v);
				const { count } = await qb;
				return count ?? 0;
			};
			if (role === "student") setStats({
				jobs: await headCount("jobs", [["is_active", true]]),
				applications: await headCount("applications", [["student_id", user.id]]),
				interviews: 0,
				resumes: await headCount("resumes", [["user_id", user.id]])
			});
			else if (role === "recruiter") setStats({
				jobs: await headCount("jobs", [["recruiter_id", user.id]]),
				applicants: 0
			});
			else setStats({
				students: 0,
				jobs: await headCount("jobs"),
				applications: await headCount("applications")
			});
		})();
	}, [user, role]);
	const tiles = role === "student" ? [
		{
			label: "Open Jobs",
			value: stats.jobs,
			to: "/jobs",
			icon: Briefcase
		},
		{
			label: "My Applications",
			value: stats.applications,
			to: "/applications",
			icon: ClipboardList
		},
		{
			label: "Interviews",
			value: stats.interviews,
			to: "/interviews",
			icon: CalendarDays
		},
		{
			label: "Resumes",
			value: stats.resumes,
			to: "/resume",
			icon: FileText
		}
	] : role === "recruiter" ? [
		{
			label: "Active Listings",
			value: stats.jobs,
			to: "/jobs",
			icon: Briefcase
		},
		{
			label: "Applicants",
			value: stats.applicants,
			to: "/applications",
			icon: Users
		},
		{
			label: "Interviews",
			value: stats.interviews ?? 0,
			to: "/interviews",
			icon: CalendarDays
		}
	] : [
		{
			label: "Total Jobs",
			value: stats.jobs,
			to: "/jobs",
			icon: Briefcase
		},
		{
			label: "Applications",
			value: stats.applications,
			to: "/applications",
			icon: ClipboardList
		},
		{
			label: "Analytics",
			value: "→",
			to: "/analytics",
			icon: TrendingUp
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-display font-bold",
				children: "Welcome back"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted-foreground capitalize",
				children: [role, " dashboard"]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-4 gap-4",
				children: tiles.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: t.to,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5 hover:shadow-md transition-shadow",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { className: "size-5 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 text-3xl font-bold",
								children: t.value ?? 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground",
								children: t.label
							})
						]
					})
				}, t.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold mb-2",
					children: "Quick actions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						role === "student" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/jobs",
								className: "text-sm px-3 py-1.5 rounded-md border hover:bg-accent/10",
								children: "Browse jobs"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/resume",
								className: "text-sm px-3 py-1.5 rounded-md border hover:bg-accent/10",
								children: "Upload resume"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/profile",
								className: "text-sm px-3 py-1.5 rounded-md border hover:bg-accent/10",
								children: "Edit profile"
							})
						] }),
						role === "recruiter" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/jobs/new",
							className: "text-sm px-3 py-1.5 rounded-md border hover:bg-accent/10",
							children: "Post a job"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/applications",
							className: "text-sm px-3 py-1.5 rounded-md border hover:bg-accent/10",
							children: "Review applicants"
						})] }),
						(role === "tpo" || role === "admin") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/analytics",
							className: "text-sm px-3 py-1.5 rounded-md border hover:bg-accent/10",
							children: "View analytics"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/jobs",
							className: "text-sm px-3 py-1.5 rounded-md border hover:bg-accent/10",
							children: "All jobs"
						})] })
					]
				})]
			})
		]
	});
}
//#endregion
export { Dashboard as component };

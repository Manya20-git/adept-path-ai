import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-b2cvW5Yq.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { a as Bar, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as BarChart, o as Pie, r as YAxis, s as Cell, t as PieChart, u as Legend } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-RXyTxmib.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COLORS = [
	"#6366f1",
	"#0ea5e9",
	"#22c55e",
	"#f59e0b",
	"#ef4444",
	"#a855f7",
	"#64748b"
];
function AnalyticsPage() {
	const [stats, setStats] = (0, import_react.useState)({
		totalJobs: 0,
		totalApps: 0,
		totalStudents: 0,
		totalRecruiters: 0
	});
	const [byStatus, setByStatus] = (0, import_react.useState)([]);
	const [byType, setByType] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		(async () => {
			const [jobs, apps, students, recruiters, appsRaw, jobsRaw] = await Promise.all([
				supabase.from("jobs").select("id", {
					count: "exact",
					head: true
				}),
				supabase.from("applications").select("id", {
					count: "exact",
					head: true
				}),
				supabase.from("user_roles").select("user_id", {
					count: "exact",
					head: true
				}).eq("role", "student"),
				supabase.from("user_roles").select("user_id", {
					count: "exact",
					head: true
				}).eq("role", "recruiter"),
				supabase.from("applications").select("status"),
				supabase.from("jobs").select("job_type")
			]);
			setStats({
				totalJobs: jobs.count ?? 0,
				totalApps: apps.count ?? 0,
				totalStudents: students.count ?? 0,
				totalRecruiters: recruiters.count ?? 0
			});
			const sc = {};
			(appsRaw.data ?? []).forEach((a) => sc[a.status] = (sc[a.status] ?? 0) + 1);
			setByStatus(Object.entries(sc).map(([name, value]) => ({
				name,
				value
			})));
			const tc = {};
			(jobsRaw.data ?? []).forEach((j) => tc[j.job_type] = (tc[j.job_type] ?? 0) + 1);
			setByType(Object.entries(tc).map(([name, value]) => ({
				name: name.replace("_", " "),
				value
			})));
		})();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-display font-bold",
				children: "Placement analytics"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 md:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Students",
						value: stats.totalStudents
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Recruiters",
						value: stats.totalRecruiters
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Jobs Posted",
						value: stats.totalJobs
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Applications",
						value: stats.totalApps
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-2 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display font-semibold mb-3",
						children: "Applications by status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-64",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: byStatus,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "name",
									tick: { fontSize: 12 }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									allowDecimals: false,
									tick: { fontSize: 12 }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "value",
									fill: "#6366f1",
									radius: [
										6,
										6,
										0,
										0
									]
								})
							]
						}) })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display font-semibold mb-3",
						children: "Jobs by type"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-64",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
								data: byType,
								dataKey: "value",
								nameKey: "name",
								outerRadius: 90,
								label: true,
								children: byType.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: COLORS[i % COLORS.length] }, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {})
						] }) })
					})]
				})]
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-3xl font-bold",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm text-muted-foreground",
			children: label
		})]
	});
}
//#endregion
export { AnalyticsPage as component };

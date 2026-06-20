import { r as __toESM } from "../_runtime.mjs";
import { f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-b2cvW5Yq.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as useAuth } from "./use-auth-B-IxDn60.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Button } from "./button-C6SIlxGV.mjs";
import { B as Building, E as Globe, H as Briefcase, d as SlidersHorizontal, g as Plus, h as RotateCcw, y as MapPin } from "../_libs/lucide-react.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CYB-gyWu.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jobs-DNGauBZJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
function JobsLayout() {
	if (useRouterState({ select: (s) => s.location.pathname }) !== "/jobs") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobsList, {});
}
var categories = [
	{
		value: "all",
		label: "All Categories"
	},
	{
		value: "engineering",
		label: "Engineering / Tech"
	},
	{
		value: "design",
		label: "Design / Creative"
	},
	{
		value: "product",
		label: "Product Management"
	},
	{
		value: "marketing",
		label: "Marketing / Sales"
	},
	{
		value: "other",
		label: "Other / Business"
	}
];
var jobTypes = [
	{
		value: "all",
		label: "All Types"
	},
	{
		value: "full_time",
		label: "Full Time"
	},
	{
		value: "part_time",
		label: "Part Time"
	},
	{
		value: "internship",
		label: "Internship"
	},
	{
		value: "contract",
		label: "Contract"
	}
];
var getCategory = (job) => {
	const text = `${job.title} ${job.description} ${(job.required_skills ?? []).join(" ")}`.toLowerCase();
	if (text.includes("software") || text.includes("developer") || text.includes("engineer") || text.includes("code") || text.includes("frontend") || text.includes("backend") || text.includes("tech")) return "engineering";
	if (text.includes("design") || text.includes("ui") || text.includes("ux") || text.includes("product designer") || text.includes("creative")) return "design";
	if (text.includes("product manager") || text.includes("pm") || text.includes("product management")) return "product";
	if (text.includes("marketing") || text.includes("sales") || text.includes("seo") || text.includes("social media")) return "marketing";
	return "other";
};
function JobsList() {
	const { user, role } = useAuth();
	const [jobs, setJobs] = (0, import_react.useState)([]);
	const [q, setQ] = (0, import_react.useState)("");
	const [jobType, setJobType] = (0, import_react.useState)("all");
	const [remoteOnly, setRemoteOnly] = (0, import_react.useState)(false);
	const [category, setCategory] = (0, import_react.useState)("all");
	const [sortBy, setSortBy] = (0, import_react.useState)("newest");
	(0, import_react.useEffect)(() => {
		if (!role) return;
		let qb = supabase.from("jobs").select("*").order("created_at", { ascending: false });
		if (role === "recruiter" && user) qb = qb.eq("recruiter_id", user.id);
		else qb = qb.eq("is_active", true);
		qb.then(({ data }) => setJobs(data ?? []));
	}, [user, role]);
	const resetFilters = () => {
		setQ("");
		setJobType("all");
		setRemoteOnly(false);
		setCategory("all");
		setSortBy("newest");
	};
	const isFiltersActive = q !== "" || jobType !== "all" || remoteOnly || category !== "all" || sortBy !== "newest";
	const filtered = jobs.filter((j) => {
		if (q) {
			if (!`${j.title} ${j.company} ${j.location ?? ""} ${(j.required_skills ?? []).join(" ")}`.toLowerCase().includes(q.toLowerCase())) return false;
		}
		if (jobType !== "all" && j.job_type !== jobType) return false;
		if (remoteOnly && !j.remote) return false;
		if (category !== "all" && getCategory(j) !== category) return false;
		return true;
	}).sort((a, b) => {
		if (sortBy === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
		if (sortBy === "oldest") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
		if (sortBy === "company") return a.company.localeCompare(b.company);
		return 0;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-3 justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-display font-bold",
				children: "Jobs & Internships"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted-foreground",
				children: [
					filtered.length,
					" listing",
					filtered.length === 1 ? "" : "s",
					" found"
				]
			})] }), (role === "recruiter" || role === "tpo" || role === "admin") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/jobs/new",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " Post a job"]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-12 gap-8 items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "lg:col-span-3 space-y-5 bg-card border border-border/80 rounded-2xl p-5 shadow-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Filters" })]
					}), isFiltersActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: resetFilters,
						className: "h-8 px-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3 mr-1" }), "Reset"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
								children: "Keyword Search"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Search jobs, skills...",
								value: q,
								onChange: (e) => setQ(e.target.value),
								className: "h-9.5 text-sm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
								children: "Category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: category,
								onValueChange: setCategory,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "h-9.5 text-sm cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "All Categories" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: cat.value,
									className: "cursor-pointer",
									children: cat.label
								}, cat.value)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
								children: "Job Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: jobType,
								onValueChange: setJobType,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "h-9.5 text-sm cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "All Types" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: jobTypes.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: type.value,
									className: "cursor-pointer",
									children: type.label
								}, type.value)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-2 border-y border-border/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "remote-toggle",
									className: "text-xs font-bold uppercase tracking-wider text-muted-foreground cursor-pointer",
									children: "Remote Only"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground leading-none",
									children: "Show virtual positions"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								id: "remote-toggle",
								checked: remoteOnly,
								onCheckedChange: setRemoteOnly
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
								children: "Sort By"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: sortBy,
								onValueChange: setSortBy,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "h-9.5 text-sm cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Newest First" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "newest",
										className: "cursor-pointer",
										children: "Newest First"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "oldest",
										className: "cursor-pointer",
										children: "Oldest First"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "company",
										className: "cursor-pointer",
										children: "Company Name"
									})
								] })]
							})]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-9 space-y-4",
				children: [isFiltersActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-1.5 items-center text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground mr-1",
							children: "Active filters:"
						}),
						q && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "secondary",
							className: "gap-1",
							children: [
								"Query: ",
								q,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setQ(""),
									className: "hover:text-destructive cursor-pointer font-bold ml-1",
									children: "×"
								})
							]
						}),
						category !== "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "secondary",
							className: "gap-1",
							children: [
								"Category: ",
								categories.find((c) => c.value === category)?.label,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setCategory("all"),
									className: "hover:text-destructive cursor-pointer font-bold ml-1",
									children: "×"
								})
							]
						}),
						jobType !== "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "secondary",
							className: "gap-1",
							children: [
								"Type: ",
								jobTypes.find((t) => t.value === jobType)?.label,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setJobType("all"),
									className: "hover:text-destructive cursor-pointer font-bold ml-1",
									children: "×"
								})
							]
						}),
						remoteOnly && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "secondary",
							className: "gap-1",
							children: ["Remote Only", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setRemoteOnly(false),
								className: "hover:text-destructive cursor-pointer font-bold ml-1",
								children: "×"
							})]
						}),
						sortBy !== "newest" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "secondary",
							className: "gap-1",
							children: [
								"Sort: ",
								sortBy,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSortBy("newest"),
									className: "hover:text-destructive cursor-pointer font-bold ml-1",
									children: "×"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [filtered.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/jobs/$jobId",
						params: { jobId: j.id },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-5 h-full hover:shadow-md transition-shadow bg-card flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-foreground",
										children: j.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-sm text-muted-foreground flex items-center gap-1 mt-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "size-3.5" }), j.company]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: "capitalize shrink-0",
										children: j.job_type.replace("_", " ")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }),
												" ",
												j.remote ? "Remote" : j.location ?? "—"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-3" }),
												" ",
												new Date(j.created_at).toLocaleDateString()
											]
										}),
										j.remote && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 text-success",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-3" }), " Virtual"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 text-sm text-muted-foreground line-clamp-2 leading-relaxed",
									children: j.description
								})
							] }), j.required_skills && j.required_skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap gap-1 border-t border-border/50 pt-3",
								children: [j.required_skills.slice(0, 4).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: "text-[10px] py-0 px-1.5",
									children: s
								}, s)), j.required_skills.length > 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "outline",
									className: "text-[10px] py-0 px-1.5 text-muted-foreground",
									children: [
										"+",
										j.required_skills.length - 4,
										" more"
									]
								})]
							})]
						})
					}, j.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-12 text-center text-muted-foreground md:col-span-2 flex flex-col items-center justify-center space-y-3 bg-card border-dashed",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-8 text-muted-foreground/60" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-foreground",
								children: "No listings match filters"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mt-1",
								children: "Try expanding your search query or adjusting your filters."
							})] }),
							isFiltersActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: resetFilters,
								className: "mt-2 cursor-pointer",
								children: "Clear all filters"
							})
						]
					})]
				})]
			})]
		})]
	});
}
//#endregion
export { JobsLayout as component };

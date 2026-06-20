import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-b2cvW5Yq.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as useAuth } from "./use-auth-B-IxDn60.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Button } from "./button-C6SIlxGV.mjs";
import { a as Portal, c as Trigger, i as Overlay, n as Content, o as Root, r as Description, s as Title, t as Close } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { g as Plus, t as X, z as CalendarDays } from "../_libs/lucide-react.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CYB-gyWu.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/interviews-DSMxg24K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Root;
var DialogTrigger = Trigger;
var DialogPortal = Portal;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = Overlay.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = Title.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = Description.displayName;
function InterviewsPage() {
	const { user, role } = useAuth();
	const [list, setList] = (0, import_react.useState)([]);
	const [apps, setApps] = (0, import_react.useState)([]);
	async function load() {
		if (!user) return;
		const { data } = await supabase.from("interviews").select("id,application_id,scheduled_at,duration_minutes,mode,location_or_link,status,applications(id,student_id,jobs(title,company,recruiter_id),profiles:student_id(full_name,email))").order("scheduled_at", { ascending: true });
		setList(data ?? []);
	}
	(0, import_react.useEffect)(() => {
		load();
	}, [user, role]);
	(0, import_react.useEffect)(() => {
		if (!user || role === "student") return;
		(async () => {
			const { data } = await supabase.from("applications").select("id,student_id,jobs!inner(title,recruiter_id)");
			const filtered = (data ?? []).filter((a) => role !== "recruiter" || a.jobs?.recruiter_id === user.id);
			const ids = Array.from(new Set(filtered.map((a) => a.student_id)));
			const { data: profs } = ids.length ? await supabase.from("profiles").select("id,full_name,email").in("id", ids) : { data: [] };
			const pmap = Object.fromEntries((profs ?? []).map((p) => [p.id, p]));
			setApps(filtered.map((a) => ({
				id: a.id,
				student_id: a.student_id,
				label: `${pmap[a.student_id]?.full_name ?? pmap[a.student_id]?.email ?? a.student_id} — ${a.jobs?.title ?? ""}`
			})));
		})();
	}, [user, role]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between flex-wrap gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-display font-bold",
				children: "Interviews"
			}), role !== "student" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScheduleDialog, {
				apps,
				onCreated: load
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: [list.map((iv) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-5 text-primary mt-1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold",
									children: iv.applications?.jobs?.title ?? "Interview"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm text-muted-foreground",
									children: [iv.applications?.jobs?.company, role !== "student" && iv.applicant && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", iv.applicant.full_name ?? iv.applicant.email] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm mt-2",
									children: [
										new Date(iv.scheduled_at).toLocaleString(),
										" · ",
										iv.duration_minutes,
										" min · ",
										iv.mode
									]
								}),
								iv.location_or_link && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: iv.location_or_link,
									target: "_blank",
									rel: "noreferrer",
									className: "text-sm text-primary underline break-all",
									children: iv.location_or_link
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: "capitalize",
							children: iv.status
						})
					]
				})
			}, iv.id)), list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-8 text-center text-muted-foreground md:col-span-2",
				children: "No interviews scheduled."
			})]
		})]
	});
}
function ScheduleDialog({ apps, onCreated }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [appId, setAppId] = (0, import_react.useState)("");
	const [when, setWhen] = (0, import_react.useState)("");
	const [duration, setDuration] = (0, import_react.useState)(60);
	const [mode, setMode] = (0, import_react.useState)("video");
	const [link, setLink] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function submit() {
		setLoading(true);
		const app = apps.find((a) => a.id === appId);
		const { error } = await supabase.from("interviews").insert({
			application_id: appId,
			scheduled_at: new Date(when).toISOString(),
			duration_minutes: duration,
			mode,
			location_or_link: link || null
		});
		if (!error && app) {
			await supabase.from("applications").update({ status: "interview" }).eq("id", appId);
			await supabase.from("notifications").insert({
				user_id: app.student_id,
				title: "Interview scheduled",
				message: `Your interview is set for ${new Date(when).toLocaleString()}`,
				link: "/interviews",
				type: "info"
			});
		}
		setLoading(false);
		if (error) return toast.error(error.message);
		toast.success("Interview scheduled");
		setOpen(false);
		onCreated();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " Schedule interview"] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Schedule interview" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Application" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: appId,
					onValueChange: setAppId,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select applicant…" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: apps.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: a.id,
						children: a.label
					}, a.id)) })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Date & time" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "datetime-local",
					value: when,
					onChange: (e) => setWhen(e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Duration (min)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						value: duration,
						onChange: (e) => setDuration(Number(e.target.value))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Mode" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: mode,
						onValueChange: setMode,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "video",
								children: "Video"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "phone",
								children: "Phone"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "onsite",
								children: "On-site"
							})
						] })]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Link or address" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: link,
					onChange: (e) => setLink(e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: submit,
					disabled: loading || !appId || !when,
					children: "Schedule"
				})
			]
		})] })]
	});
}
//#endregion
export { InterviewsPage as component };

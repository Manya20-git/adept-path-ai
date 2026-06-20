import { r as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-b2cvW5Yq.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useAuth } from "./use-auth-B-IxDn60.mjs";
import { t as Button } from "./button-C6SIlxGV.mjs";
import { C as LayoutDashboard, D as FileText, H as Briefcase, L as ChartColumn, W as Bell, k as ClipboardList, r as User, u as Sparkles, v as Menu, x as LogOut, z as CalendarDays } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as ThemeToggle } from "./theme-toggle-DWyaLnkP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-sXNukoV6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var NAV = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/profile",
		label: "Profile",
		icon: User
	},
	{
		to: "/jobs",
		label: "Jobs & Internships",
		icon: Briefcase
	},
	{
		to: "/resume",
		label: "Resume & AI",
		icon: FileText,
		roles: ["student"]
	},
	{
		to: "/applications",
		label: "Applications",
		icon: ClipboardList
	},
	{
		to: "/interviews",
		label: "Interviews",
		icon: CalendarDays
	},
	{
		to: "/notifications",
		label: "Notifications",
		icon: Bell
	},
	{
		to: "/analytics",
		label: "Analytics",
		icon: ChartColumn,
		roles: [
			"tpo",
			"admin",
			"recruiter"
		]
	}
];
function AppShell({ children }) {
	const { user, role } = useAuth();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const [unread, setUnread] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		let mounted = true;
		const load = async () => {
			const { count } = await supabase.from("notifications").select("id", {
				count: "exact",
				head: true
			}).eq("user_id", user.id).eq("read", false);
			if (mounted) setUnread(count ?? 0);
		};
		load();
		const ch = supabase.channel("notif-" + user.id).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "notifications",
			filter: `user_id=eq.${user.id}`
		}, load).subscribe();
		return () => {
			mounted = false;
			supabase.removeChannel(ch);
		};
	}, [user]);
	async function signOut() {
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	}
	const items = NAV.filter((i) => !i.roles || role && i.roles.includes(role));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-muted/30",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				richColors: true,
				position: "top-right"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden lg:flex fixed inset-y-0 left-0 w-60 flex-col border-r bg-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-5 border-b",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/dashboard",
							className: "flex items-center gap-2 font-display font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5 text-primary" }), " CareerForge"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex-1 p-3 space-y-1",
						children: items.map(({ to, label, icon: Icon }) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to,
								className: `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${pathname === to || to !== "/dashboard" && pathname.startsWith(to) ? "bg-primary text-primary-foreground" : "hover:bg-accent/10 text-foreground"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1",
										children: label
									}),
									to === "/notifications" && unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-auto text-xs bg-destructive text-destructive-foreground rounded-full px-1.5",
										children: unread
									})
								]
							}, to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3 border-t space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground truncate",
								children: [
									user?.email,
									" · ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "capitalize",
										children: role ?? "—"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							className: "w-full",
							onClick: signOut,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Sign out"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "lg:hidden sticky top-0 z-20 flex items-center justify-between p-3 border-b bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/dashboard",
					className: "flex items-center gap-2 font-display font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5 text-primary" }), " CareerForge"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => setOpen((v) => !v),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
					})]
				})]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:hidden border-b bg-card p-2 space-y-1",
				children: [items.map(({ to, label, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to,
					onClick: () => setOpen(false),
					className: "flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-accent/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), label]
				}, to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					className: "w-full",
					onClick: signOut,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Sign out"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "lg:pl-60 p-4 md:p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-7xl mx-auto",
					children
				})
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
//#endregion
export { SplitComponent as component };

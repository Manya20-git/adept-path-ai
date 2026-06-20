import { r as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-b2cvW5Yq.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as useAuth } from "./use-auth-B-IxDn60.mjs";
import { t as Button } from "./button-C6SIlxGV.mjs";
import { W as Bell } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-_ylM3oKw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NotificationsPage() {
	const { user } = useAuth();
	const [list, setList] = (0, import_react.useState)([]);
	async function load() {
		if (!user) return;
		const { data } = await supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
		setList(data ?? []);
	}
	(0, import_react.useEffect)(() => {
		load();
	}, [user]);
	async function markAllRead() {
		if (!user) return;
		await supabase.from("notifications").update({ read: true }).eq("user_id", user.id).eq("read", false);
		load();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-3xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-display font-bold",
				children: "Notifications"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				size: "sm",
				onClick: markAllRead,
				children: "Mark all read"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2",
			children: [list.map((n) => {
				const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: `p-4 flex gap-3 items-start ${!n.read ? "border-primary/40 bg-primary/5" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5 text-primary mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: n.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground",
								children: n.message
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground mt-1",
								children: new Date(n.created_at).toLocaleString()
							})
						]
					})]
				});
				return n.link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: n.link,
					children: inner
				}, n.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: inner }, n.id);
			}), list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-8 text-center text-muted-foreground",
				children: "You're all caught up."
			})]
		})]
	});
}
//#endregion
export { NotificationsPage as component };

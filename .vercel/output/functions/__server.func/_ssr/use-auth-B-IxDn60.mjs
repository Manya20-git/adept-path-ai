import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-b2cvW5Yq.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-auth-B-IxDn60.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useAuth() {
	const [session, setSession] = (0, import_react.useState)(null);
	const [user, setUser] = (0, import_react.useState)(null);
	const [role, setRole] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
			setSession(s);
			setUser(s?.user ?? null);
			if (!s) setRole(null);
		});
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setUser(data.session?.user ?? null);
			setLoading(false);
		});
		return () => sub.subscription.unsubscribe();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		(async () => {
			const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).order("role", { ascending: true });
			const roles = (data ?? []).map((r) => r.role);
			setRole([
				"admin",
				"tpo",
				"recruiter",
				"student"
			].find((r) => roles.includes(r)) ?? null);
		})();
	}, [user]);
	return {
		session,
		user,
		role,
		loading
	};
}
//#endregion
export { useAuth as t };

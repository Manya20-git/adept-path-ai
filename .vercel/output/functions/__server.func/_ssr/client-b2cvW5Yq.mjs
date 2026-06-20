import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-b2cvW5Yq.js
function createSupabaseClient() {
	return createClient("https://anfpcgkglbmvvxawluad.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuZnBjZ2tnbGJtdnZ4YXdsdWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MzUzMDUsImV4cCI6MjA5NzExMTMwNX0.t8js519K5703L34pTpzYFBuL28hAiCHMlgD5bnxiFqM", { auth: {
		storage: typeof window !== "undefined" ? localStorage : void 0,
		persistSession: true,
		autoRefreshToken: true
	} });
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as t };

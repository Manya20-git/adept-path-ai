import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-b2cvW5Yq.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as useAuth } from "./use-auth-B-IxDn60.mjs";
import { t as Button } from "./button-C6SIlxGV.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-dFRy4pcc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { user, role } = useAuth();
	const [p, setP] = (0, import_react.useState)({});
	const [skills, setSkills] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => {
			setP(data ?? {});
			setSkills((data?.skills ?? []).join(", "));
		});
	}, [user]);
	function set(k, v) {
		setP((prev) => ({
			...prev,
			[k]: v
		}));
	}
	async function save() {
		if (!user || !user.email) return;
		setLoading(true);
		const payload = {
			...p,
			id: user.id,
			email: user.email,
			skills: skills.split(",").map((s) => s.trim()).filter(Boolean)
		};
		const { error } = await supabase.from("profiles").upsert(payload);
		setLoading(false);
		if (error) return toast.error(error.message);
		toast.success("Profile saved");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-3xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-display font-bold",
			children: "Profile"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-6 space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid md:grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Full name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: p.full_name ?? "",
						onChange: (e) => set("full_name", e.target.value)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: p.phone ?? "",
						onChange: (e) => set("phone", e.target.value)
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Bio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: p.bio ?? "",
					onChange: (e) => set("bio", e.target.value)
				})] }),
				role === "student" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid md:grid-cols-2 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "University" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: p.university ?? "",
							onChange: (e) => set("university", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Degree" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: p.degree ?? "",
							onChange: (e) => set("degree", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Major" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: p.major ?? "",
							onChange: (e) => set("major", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Graduation year" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: p.graduation_year ?? "",
							onChange: (e) => set("graduation_year", Number(e.target.value) || null)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "CGPA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							step: "0.01",
							value: p.cgpa ?? "",
							onChange: (e) => set("cgpa", Number(e.target.value) || null)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "LinkedIn" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: p.linkedin_url ?? "",
							onChange: (e) => set("linkedin_url", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "GitHub" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: p.github_url ?? "",
							onChange: (e) => set("github_url", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Portfolio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: p.portfolio_url ?? "",
							onChange: (e) => set("portfolio_url", e.target.value)
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Skills (comma-separated)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: skills,
					onChange: (e) => setSkills(e.target.value),
					placeholder: "React, TypeScript, SQL"
				})] })] }),
				role === "recruiter" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid md:grid-cols-2 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Company name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: p.company_name ?? "",
							onChange: (e) => set("company_name", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Company website" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: p.company_website ?? "",
							onChange: (e) => set("company_website", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Your title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: p.job_title ?? "",
							onChange: (e) => set("job_title", e.target.value)
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: save,
					disabled: loading,
					children: "Save profile"
				})
			]
		})]
	});
}
//#endregion
export { ProfilePage as component };

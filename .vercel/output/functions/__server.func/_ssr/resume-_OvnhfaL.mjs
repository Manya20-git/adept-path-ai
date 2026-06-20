import { r as __toESM } from "../_runtime.mjs";
import { O as isRedirect, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Dpn8S0gM.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { t as supabase } from "./client-b2cvW5Yq.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as useAuth } from "./use-auth-B-IxDn60.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Button } from "./button-C6SIlxGV.mjs";
import { D as FileText, S as LoaderCircle, i as Upload, o as Trash2, u as Sparkles } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-glRuyvHQ.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resume-_OvnhfaL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var AnalyzeInput = objectType({ resumeId: stringType().uuid() });
var analyzeResume = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => AnalyzeInput.parse(d)).handler(createSsrRpc("729fe7e1bca7b53fc698f05380199640b983d62d008b2d810b401881366deb9f"));
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root.displayName;
function ResumePage() {
	const { user } = useAuth();
	const [list, setList] = (0, import_react.useState)([]);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [analyzingId, setAnalyzingId] = (0, import_react.useState)(null);
	const analyze = useServerFn(analyzeResume);
	async function load() {
		if (!user) return;
		const { data } = await supabase.from("resumes").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
		setList(data ?? []);
	}
	(0, import_react.useEffect)(() => {
		load();
	}, [user]);
	async function handleUpload(e) {
		const file = e.target.files?.[0];
		if (!file || !user) return;
		setUploading(true);
		const path = `${user.id}/${Date.now()}-${file.name}`;
		const { error: upErr } = await supabase.storage.from("resumes").upload(path, file);
		if (upErr) {
			setUploading(false);
			return toast.error(upErr.message);
		}
		const { error } = await supabase.from("resumes").insert({
			user_id: user.id,
			file_path: path,
			file_name: file.name,
			file_size: file.size
		});
		setUploading(false);
		if (error) return toast.error(error.message);
		toast.success("Resume uploaded");
		load();
	}
	async function runAnalysis(id) {
		setAnalyzingId(id);
		try {
			await analyze({ data: { resumeId: id } });
			toast.success("AI analysis complete");
			load();
		} catch (e) {
			toast.error(e.message || "Analysis failed");
		} finally {
			setAnalyzingId(null);
		}
	}
	async function remove(r) {
		if (!confirm("Delete this resume?")) return;
		await supabase.storage.from("resumes").remove([r.file_path]);
		await supabase.from("resumes").delete().eq("id", r.id);
		load();
	}
	async function download(r) {
		const { data } = await supabase.storage.from("resumes").createSignedUrl(r.file_path, 60);
		if (data?.signedUrl) window.open(data.signedUrl, "_blank");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 max-w-4xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-display font-bold",
				children: "Resume & AI analysis"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Upload your resume and get AI-powered feedback."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 cursor-pointer hover:bg-accent/5 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-8 text-muted-foreground mb-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: "Click to upload PDF / DOCX"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground mt-1",
							children: "Stored privately in your account"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: ".pdf,.doc,.docx",
							className: "hidden",
							onChange: handleUpload,
							disabled: uploading
						})
					]
				}), uploading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-2",
					children: "Uploading…"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [list.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-5 text-primary mt-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold",
								children: r.file_name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground",
								children: [
									"Uploaded ",
									new Date(r.created_at).toLocaleDateString(),
									r.analyzed_at && ` · Analyzed ${new Date(r.analyzed_at).toLocaleDateString()}`
								]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => download(r),
									children: "Download"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: () => runAnalysis(r.id),
									disabled: analyzingId === r.id,
									children: [analyzingId === r.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}), r.analyzed_at ? "Re-analyze" : "Analyze with AI"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => remove(r),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
								})
							]
						})]
					}), r.ai_score != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-sm mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Resume score" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold",
									children: [r.ai_score, "/100"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: r.ai_score })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid md:grid-cols-3 gap-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
										title: "Strengths",
										items: r.ai_strengths,
										tone: "success"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
										title: "Weaknesses",
										items: r.ai_weaknesses,
										tone: "destructive"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
										title: "Suggestions",
										items: r.ai_suggestions,
										tone: "muted"
									})
								]
							}),
							r.extracted_skills && r.extracted_skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium mb-1",
								children: "Detected skills"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1",
								children: r.extracted_skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									children: s
								}, s))
							})] })
						]
					})]
				}, r.id)), list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "p-8 text-center text-muted-foreground",
					children: "No resumes yet."
				})]
			})
		]
	});
}
function Block({ title, items, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `font-medium mb-1 ${tone === "success" ? "text-success" : tone === "destructive" ? "text-destructive" : "text-foreground"}`,
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "list-disc pl-4 space-y-1 text-muted-foreground",
		children: (items ?? []).map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, i))
	})] });
}
//#endregion
export { ResumePage as component };

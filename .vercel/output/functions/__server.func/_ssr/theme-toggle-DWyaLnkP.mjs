import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-C6SIlxGV.mjs";
import { _ as Moon, c as Sun } from "../_libs/lucide-react.mjs";
import { n as useTheme } from "./theme-provider-BAKfitBF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-toggle-DWyaLnkP.js
var import_jsx_runtime = require_jsx_runtime();
function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "ghost",
		size: "icon",
		onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
		className: "relative size-9 rounded-lg hover:bg-accent/15 cursor-pointer active:scale-95 transition-all overflow-hidden",
		title: "Toggle theme",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Toggle theme"
			})
		]
	});
}
//#endregion
export { ThemeToggle as t };

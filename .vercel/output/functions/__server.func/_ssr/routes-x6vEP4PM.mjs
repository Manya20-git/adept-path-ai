import { r as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as Trigger2, i as Root2, n as Header, r as Item, t as Content2, y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-C6SIlxGV.mjs";
import { D as FileText, F as ChevronDown, G as ArrowRight, H as Briefcase, L as ChartColumn, N as ChevronRight, P as ChevronLeft, R as Calendar, S as LoaderCircle, T as GraduationCap, U as Brain, V as Building2, W as Bell, b as Mail, f as Shield, j as CircleCheck, l as Star, m as Send, p as ShieldCheck, r as User, s as Target, u as Sparkles, w as Info } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as ThemeToggle } from "./theme-toggle-DWyaLnkP.mjs";
import { t as useForm } from "../_libs/react-hook-form.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-x6vEP4PM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_default = "/assets/hero-BtWuA-ph.jpg";
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
function Nav() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-6 h-16 flex items-center justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-8 rounded-lg bg-gradient-primary grid place-items-center shadow-glow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-primary-foreground" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display font-bold text-lg",
						children: ["CareerForge", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gradient",
							children: " AI"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden md:flex items-center gap-8 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#features",
							className: "hover:text-foreground transition-colors",
							children: "Features"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#roles",
							className: "hover:text-foreground transition-colors",
							children: "For You"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#how",
							className: "hover:text-foreground transition-colors",
							children: "How it works"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#stats",
							className: "hover:text-foreground transition-colors",
							children: "Impact"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								children: "Sign in"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "hero",
								size: "sm",
								children: "Get started"
							})
						})
					]
				})
			]
		})
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative pt-32 pb-24 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-mesh opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container relative mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 rounded-full border border-border bg-card/50 backdrop-blur px-4 py-1.5 text-xs font-medium text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-success animate-pulse" }), "Powered by AI · Built for placement cells"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]",
						children: ["Forge your career with ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gradient",
							children: "intelligent matching"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg text-muted-foreground max-w-xl leading-relaxed",
						children: "CareerForge AI connects students, recruiters, and placement officers in one platform. AI-powered resume analysis, personalized job recommendations, and real-time analytics — all in a single intelligent ecosystem."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "hero",
							size: "xl",
							children: ["Start placing smarter ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "xl",
							children: "Watch demo"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-6 pt-4 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-success" }), " No credit card"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-success" }), " Free for students"]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-6 bg-gradient-primary opacity-30 blur-3xl rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_default,
					alt: "AI-powered career platform connecting students with opportunities",
					width: 1600,
					height: 1100,
					className: "relative rounded-2xl shadow-elegant border border-border/50"
				})]
			})]
		})]
	});
}
var features = [
	{
		icon: Brain,
		title: "AI Resume Analyzer",
		desc: "Upload your resume and get an instant ATS score, skill extraction, and improvement suggestions."
	},
	{
		icon: Target,
		title: "Smart Job Matching",
		desc: "Personalized internship recommendations based on your skills, interests, and career goals."
	},
	{
		icon: Briefcase,
		title: "Application Tracking",
		desc: "Track every application from Applied to Selected — never lose sight of an opportunity."
	},
	{
		icon: Calendar,
		title: "Interview Management",
		desc: "Schedule, reschedule, and prepare for interviews with built-in calendar integration."
	},
	{
		icon: ChartColumn,
		title: "Placement Analytics",
		desc: "Real-time dashboards for TPOs with company-wise reports and student insights."
	},
	{
		icon: Bell,
		title: "Real-Time Notifications",
		desc: "Application updates, interview reminders, and new internship alerts — instantly."
	}
];
function Features() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "features",
		className: "py-24 container mx-auto px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl mx-auto text-center mb-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-accent uppercase tracking-wider mb-3",
					children: "Platform"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-4xl md:text-5xl font-bold mb-4",
					children: "Everything your placement cell needs"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-lg",
					children: "From resume to offer letter — one intelligent platform powering the entire journey."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
			children: features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group relative p-7 rounded-2xl border border-border bg-card hover:shadow-elegant hover:-translate-y-1 transition-all",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-12 rounded-xl bg-gradient-primary grid place-items-center mb-5 shadow-glow group-hover:scale-110 transition-transform",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "size-6 text-primary-foreground" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl font-semibold mb-2",
						children: f.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-sm leading-relaxed",
						children: f.desc
					})
				]
			}, f.title))
		})]
	});
}
var roles = [
	{
		icon: GraduationCap,
		title: "For Students",
		color: "from-primary to-primary-glow",
		points: [
			"Upload resume & get AI score",
			"Discover matched internships",
			"Track every application",
			"Prepare for interviews"
		]
	},
	{
		icon: Building2,
		title: "For Recruiters",
		color: "from-accent to-primary-glow",
		points: [
			"Post jobs in seconds",
			"AI-shortlisted candidates",
			"Schedule interviews easily",
			"Manage talent pipeline"
		]
	},
	{
		icon: ShieldCheck,
		title: "For TPO & Admin",
		color: "from-primary to-accent",
		points: [
			"Live placement dashboards",
			"Company-wise reports",
			"Manage recruiter relations",
			"Export insights instantly"
		]
	}
];
function Roles() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "roles",
		className: "py-24 bg-secondary/40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl mx-auto text-center mb-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-accent uppercase tracking-wider mb-3",
					children: "Built for everyone"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-4xl md:text-5xl font-bold mb-4",
					children: "One platform, three powerful experiences"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid md:grid-cols-3 gap-6",
				children: roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative p-8 rounded-2xl bg-card border border-border shadow-soft hover:shadow-elegant transition-all",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `size-14 rounded-2xl bg-gradient-to-br ${r.color} grid place-items-center mb-6 shadow-glow`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r.icon, { className: "size-7 text-primary-foreground" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-2xl font-bold mb-4",
							children: r.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3",
							children: r.points.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-success shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p })]
							}, p))
						})
					]
				}, r.title))
			})]
		})
	});
}
var steps = [
	{
		icon: FileText,
		title: "Create profile",
		desc: "Sign up and upload your resume — AI analyzes it instantly."
	},
	{
		icon: Target,
		title: "Get matched",
		desc: "Receive personalized internship recommendations daily."
	},
	{
		icon: Briefcase,
		title: "Apply & track",
		desc: "One-click apply and follow every status update."
	},
	{
		icon: Sparkles,
		title: "Get hired",
		desc: "Schedule interviews, get feedback, land the offer."
	}
];
function HowItWorks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "how",
		className: "py-24 container mx-auto px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl mx-auto text-center mb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold text-accent uppercase tracking-wider mb-3",
				children: "How it works"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-4xl md:text-5xl font-bold mb-4",
				children: "From signup to offer in 4 steps"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid md:grid-cols-4 gap-6",
			children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 rounded-2xl border border-border bg-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "size-11 rounded-lg bg-primary/10 text-primary grid place-items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-3xl font-display font-bold text-muted-foreground/30",
							children: ["0", i + 1]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-lg mb-2",
						children: s.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: s.desc
					})
				]
			}, s.title))
		})]
	});
}
function Stats() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "stats",
		className: "py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container mx-auto px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-3xl bg-gradient-hero p-12 md:p-16 shadow-elegant",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-mesh opacity-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative grid md:grid-cols-4 gap-8 text-center",
					children: [
						{
							value: "10k+",
							label: "Students placed"
						},
						{
							value: "500+",
							label: "Partner companies"
						},
						{
							value: "94%",
							label: "Placement rate"
						},
						{
							value: "3.2x",
							label: "Faster hiring"
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-5xl md:text-6xl font-display font-bold text-white mb-2",
						children: s.value
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-white/70 text-sm uppercase tracking-wider",
						children: s.label
					})] }, s.label))
				})]
			})
		})
	});
}
function CTA() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-24 container mx-auto px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-3xl mx-auto text-center space-y-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-4xl md:text-6xl font-bold",
					children: [
						"Ready to ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gradient",
							children: "forge your future"
						}),
						"?"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg text-muted-foreground",
					children: "Join thousands of students, recruiters, and institutions transforming the placement experience."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3 justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "hero",
						size: "xl",
						children: ["Get started free ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "xl",
						children: "Talk to sales"
					})]
				})
			]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-6 rounded bg-gradient-primary grid place-items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3 text-primary-foreground" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display font-semibold text-foreground",
						children: "CareerForge AI"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "· © 2026" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "hover:text-foreground",
						children: "Privacy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "hover:text-foreground",
						children: "Terms"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "hover:text-foreground",
						children: "Contact"
					})
				]
			})]
		})
	});
}
var testimonials = [
	{
		name: "Aarav Mehta",
		role: "Student, IIT Bombay",
		quote: "CareerForge AI completely changed my internship hunt! The AI resume feedback helped me fix my formatting, and the matched jobs were spot on. I landed a software engineering internship in under 2 weeks!",
		avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120&h=120",
		rating: 5
	},
	{
		name: "Sarah Jenkins",
		role: "Recruiter, TechCorp",
		quote: "We were flooded with hundreds of unqualified applications. CareerForge's AI screening pre-sorted the top candidates matching our tech stack perfectly. It saved our recruiting team over 20 hours a week.",
		avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120",
		rating: 5
	},
	{
		name: "Dr. Ramesh Prasad",
		role: "TPO Head, RV College of Engineering",
		quote: "Managing campus placements for 1,200 students is a massive logistical challenge. With the real-time analytics dashboard, our training and placement office tracks every candidate and placement status live.",
		avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120",
		rating: 5
	}
];
function Testimonials() {
	const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const timer = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % testimonials.length);
		}, 6e3);
		return () => clearInterval(timer);
	}, []);
	const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
	const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "testimonials",
		className: "py-24 bg-secondary/30 border-y border-border/50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl mx-auto text-center mb-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-accent uppercase tracking-wider mb-3",
						children: "Testimonials"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-4xl font-bold mb-4",
						children: "What our community says"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "Hear from students, recruiters, and academic institutions who use our platform."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative max-w-4xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-2xl border border-border/60 bg-card p-8 md:p-12 shadow-soft transition-all duration-500",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col md:flex-row items-center gap-8 md:gap-12 min-h-[220px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "size-24 md:size-32 rounded-full overflow-hidden border-2 border-primary/20 shrink-0 shadow-md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: testimonials[activeIndex].avatar,
								alt: testimonials[activeIndex].name,
								className: "w-full h-full object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-1",
									children: [...Array(testimonials[activeIndex].rating)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 fill-accent text-accent" }, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
									className: "text-lg md:text-xl font-medium leading-relaxed italic text-foreground/90",
									children: [
										"\"",
										testimonials[activeIndex].quote,
										"\""
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cite", {
									className: "not-italic font-bold text-foreground block",
									children: testimonials[activeIndex].name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted-foreground",
									children: testimonials[activeIndex].role
								})] })
							]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1.5",
						children: testimonials.map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveIndex(idx),
							className: `size-2.5 rounded-full transition-all duration-300 ${idx === activeIndex ? "bg-primary w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`,
							"aria-label": `Go to slide ${idx + 1}`
						}, idx))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							onClick: prev,
							className: "size-10 rounded-full border border-border cursor-pointer",
							"aria-label": "Previous testimonial",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							onClick: next,
							className: "size-10 rounded-full border border-border cursor-pointer",
							"aria-label": "Next testimonial",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
						})]
					})]
				})]
			})]
		})
	});
}
var faqs = [
	{
		id: "faq-1",
		question: "How does the AI Resume Analyzer grade my resume?",
		answer: "Our AI model parses your resume against industry-standard ATS algorithms, checking structural formatting, keyword density, and action verbs. It then scores your resume out of 100 and suggests actionable improvements to boost your interview response rate."
	},
	{
		id: "faq-2",
		question: "Is CareerForge AI free for college students?",
		answer: "Yes, CareerForge AI is completely free for individual students. You can upload resumes, get job recommendations, track your applications, and prepare for interviews at no cost."
	},
	{
		id: "faq-3",
		question: "How can placement offices (TPOs) sign up and onboard?",
		answer: "Placement officers can request dashboard access via our contact form. Once verified, our team sets up your institution, allowing you to bulk-invite students, add partner recruiters, and monitor campus placement status live."
	},
	{
		id: "faq-4",
		question: "Can recruiters source candidates directly from the platform?",
		answer: "Absolutely. Recruiters can post job listings and leverage AI shortlists, which filter the best-matching student profiles based on skill tags, GPA, and graduation year, eliminating the manual sorting of hundreds of resumes."
	}
];
function FAQ() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "faq",
		className: "py-24 container mx-auto px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl mx-auto text-center mb-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-accent uppercase tracking-wider mb-3",
					children: "FAQ"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-4xl font-bold mb-4",
					children: "Frequently Asked Questions"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-lg",
					children: "Quick answers to common questions about our internship and placement cell platform."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-3xl mx-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
				type: "single",
				collapsible: true,
				className: "w-full space-y-4",
				children: faqs.map((faq) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
					value: faq.id,
					className: "border border-border/60 bg-card rounded-xl px-6 transition-all hover:shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
						className: "text-base font-semibold py-5 hover:no-underline text-left",
						children: faq.question
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
						className: "text-muted-foreground leading-relaxed pb-5 pt-1",
						children: faq.answer
					})]
				}, faq.id))
			})
		})]
	});
}
function ContactForm() {
	const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ defaultValues: {
		name: "",
		email: "",
		role: "student",
		message: "",
		newsletter: true
	} });
	const onSubmit = async (data) => {
		await new Promise((resolve) => setTimeout(resolve, 1500));
		console.log("Contact form submitted data:", data);
		toast.success("Thank you! Your message was received. We will get back to you shortly.");
		reset();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contact",
		className: "py-24 bg-secondary/40 border-t border-border/50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container mx-auto px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-5xl mx-auto grid lg:grid-cols-12 gap-12 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-5 space-y-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-accent uppercase tracking-wider",
								children: "Contact Us"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-4xl font-bold",
								children: "Let's talk about building your path"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground leading-relaxed",
								children: "Have questions about onboarding your university, setting up recruiting pipelines, or using our AI analyzer? Reach out and we'll reply within 24 hours."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "size-11 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-semibold text-sm text-foreground",
									children: "Email us"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground text-sm",
									children: "support@careerforge.ai"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "size-11 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-semibold text-sm text-foreground",
									children: "Enterprise Security"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground text-sm",
									children: "ISO 27001 Certified & GDPR Compliant"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "size-11 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-semibold text-sm text-foreground",
									children: "Headquarters"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground text-sm",
									children: "Mumbai, Maharashtra, India"
								})] })]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-7 bg-card border border-border/80 rounded-2xl p-8 shadow-soft",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit(onSubmit),
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid sm:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "name",
											className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
											children: "Full Name"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "absolute left-3 top-3.5 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "name",
												type: "text",
												placeholder: "Jane Doe",
												className: `w-full bg-background border rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/20 ${errors.name ? "border-destructive focus:border-destructive focus:ring-destructive/15" : "border-border"}`,
												...register("name", {
													required: "Name is required",
													minLength: {
														value: 2,
														message: "Name must be at least 2 characters"
													}
												})
											})]
										}),
										errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-destructive text-xs",
											children: errors.name.message
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "email",
											className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
											children: "Email Address"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3 top-3.5 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "email",
												type: "email",
												placeholder: "jane@example.com",
												className: `w-full bg-background border rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/20 ${errors.email ? "border-destructive focus:border-destructive focus:ring-destructive/15" : "border-border"}`,
												...register("email", {
													required: "Email is required",
													pattern: {
														value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
														message: "Invalid email address"
													}
												})
											})]
										}),
										errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-destructive text-xs",
											children: errors.email.message
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "role",
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Who are you?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "role",
									className: "w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/20",
									...register("role"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "student",
											children: "I am a Student looking for opportunities"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "recruiter",
											children: "I am a Recruiter looking for talent"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "tpo",
											children: "I am a Training & Placement Officer (TPO)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "other",
											children: "Other / General inquiry"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "message",
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
										children: "Your Message"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										id: "message",
										rows: 4,
										placeholder: "How can we help you?",
										className: `w-full bg-background border rounded-lg px-4 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/20 ${errors.message ? "border-destructive focus:border-destructive focus:ring-destructive/15" : "border-border"}`,
										...register("message", {
											required: "Message is required",
											minLength: {
												value: 10,
												message: "Message must be at least 10 characters"
											}
										})
									}),
									errors.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-destructive text-xs",
										children: errors.message.message
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2.5 py-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "newsletter",
									type: "checkbox",
									className: "size-4 rounded border-border text-primary focus:ring-primary mt-0.5",
									...register("newsletter")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "newsletter",
									className: "text-xs text-muted-foreground cursor-pointer select-none",
									children: "Receive product updates, placement success guides, and recruiter reports (unsubscribe anytime)."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: isSubmitting,
								className: "w-full h-11 cursor-pointer",
								children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin mr-2" }), "Sending message..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4 mr-2" }), "Send Message"] })
							})
						]
					})
				})]
			})
		})
	});
}
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground transition-colors duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Features, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Roles, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorks, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stats, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQ, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTA, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { Landing as component };

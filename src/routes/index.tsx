import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Brain, Briefcase, Sparkles, Target, BarChart3, Bell, ArrowRight,
  GraduationCap, Building2, ShieldCheck, FileText, Calendar, CheckCircle2,
  ChevronLeft, ChevronRight, Star, Send, Mail, User, Shield, Info, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.jpg";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CareerForge AI — Internships, Placements & AI Resume Analysis" },
      { name: "description", content: "CareerForge AI helps students land internships, recruiters hire faster, and placement cells track everything — powered by AI." },
      { property: "og:title", content: "CareerForge AI" },
      { property: "og:description", content: "AI-powered placement and internship management platform." },
    ],
  }),
  component: Landing,
});

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
            <Sparkles className="size-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg">CareerForge<span className="text-gradient"> AI</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#roles" className="hover:text-foreground transition-colors">For You</a>
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#stats" className="hover:text-foreground transition-colors">Impact</a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/auth">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link to="/auth">
            <Button variant="hero" size="sm">Get started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
      <div className="container relative mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 backdrop-blur px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-success animate-pulse" />
            Powered by AI · Built for placement cells
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
            Forge your career with <span className="text-gradient">intelligent matching</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            CareerForge AI connects students, recruiters, and placement officers in one platform.
            AI-powered resume analysis, personalized job recommendations, and real-time analytics —
            all in a single intelligent ecosystem.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="hero" size="xl">
              Start placing smarter <ArrowRight />
            </Button>
            <Button variant="outline" size="xl">Watch demo</Button>
          </div>
          <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><CheckCircle2 className="size-4 text-success" /> No credit card</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="size-4 text-success" /> Free for students</div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-primary opacity-30 blur-3xl rounded-full" />
          <img
            src={heroImg}
            alt="AI-powered career platform connecting students with opportunities"
            width={1600}
            height={1100}
            className="relative rounded-2xl shadow-elegant border border-border/50"
          />
        </div>
      </div>
    </section>
  );
}

const features = [
  { icon: Brain, title: "AI Resume Analyzer", desc: "Upload your resume and get an instant ATS score, skill extraction, and improvement suggestions." },
  { icon: Target, title: "Smart Job Matching", desc: "Personalized internship recommendations based on your skills, interests, and career goals." },
  { icon: Briefcase, title: "Application Tracking", desc: "Track every application from Applied to Selected — never lose sight of an opportunity." },
  { icon: Calendar, title: "Interview Management", desc: "Schedule, reschedule, and prepare for interviews with built-in calendar integration." },
  { icon: BarChart3, title: "Placement Analytics", desc: "Real-time dashboards for TPOs with company-wise reports and student insights." },
  { icon: Bell, title: "Real-Time Notifications", desc: "Application updates, interview reminders, and new internship alerts — instantly." },
];

function Features() {
  return (
    <section id="features" className="py-24 container mx-auto px-6">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Platform</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything your placement cell needs</h2>
        <p className="text-muted-foreground text-lg">From resume to offer letter — one intelligent platform powering the entire journey.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <div key={f.title} className="group relative p-7 rounded-2xl border border-border bg-card hover:shadow-elegant hover:-translate-y-1 transition-all">
            <div className="size-12 rounded-xl bg-gradient-primary grid place-items-center mb-5 shadow-glow group-hover:scale-110 transition-transform">
              <f.icon className="size-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const roles = [
  {
    icon: GraduationCap, title: "For Students", color: "from-primary to-primary-glow",
    points: ["Upload resume & get AI score", "Discover matched internships", "Track every application", "Prepare for interviews"],
  },
  {
    icon: Building2, title: "For Recruiters", color: "from-accent to-primary-glow",
    points: ["Post jobs in seconds", "AI-shortlisted candidates", "Schedule interviews easily", "Manage talent pipeline"],
  },
  {
    icon: ShieldCheck, title: "For TPO & Admin", color: "from-primary to-accent",
    points: ["Live placement dashboards", "Company-wise reports", "Manage recruiter relations", "Export insights instantly"],
  },
];

function Roles() {
  return (
    <section id="roles" className="py-24 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Built for everyone</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">One platform, three powerful experiences</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((r) => (
            <div key={r.title} className="relative p-8 rounded-2xl bg-card border border-border shadow-soft hover:shadow-elegant transition-all">
              <div className={`size-14 rounded-2xl bg-gradient-to-br ${r.color} grid place-items-center mb-6 shadow-glow`}>
                <r.icon className="size-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{r.title}</h3>
              <ul className="space-y-3">
                {r.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="size-5 text-success shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { icon: FileText, title: "Create profile", desc: "Sign up and upload your resume — AI analyzes it instantly." },
  { icon: Target, title: "Get matched", desc: "Receive personalized internship recommendations daily." },
  { icon: Briefcase, title: "Apply & track", desc: "One-click apply and follow every status update." },
  { icon: Sparkles, title: "Get hired", desc: "Schedule interviews, get feedback, land the offer." },
];

function HowItWorks() {
  return (
    <section id="how" className="py-24 container mx-auto px-6">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">How it works</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">From signup to offer in 4 steps</h2>
      </div>
      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <div key={s.title} className="p-6 rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between mb-5">
              <div className="size-11 rounded-lg bg-primary/10 text-primary grid place-items-center">
                <s.icon className="size-5" />
              </div>
              <span className="text-3xl font-display font-bold text-muted-foreground/30">0{i + 1}</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "10k+", label: "Students placed" },
    { value: "500+", label: "Partner companies" },
    { value: "94%", label: "Placement rate" },
    { value: "3.2x", label: "Faster hiring" },
  ];
  return (
    <section id="stats" className="py-20">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-12 md:p-16 shadow-elegant">
          <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
          <div className="relative grid md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-5xl md:text-6xl font-display font-bold text-white mb-2">{s.value}</div>
                <div className="text-white/70 text-sm uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 container mx-auto px-6">
      <div className="max-w-3xl mx-auto text-center space-y-7">
        <h2 className="text-4xl md:text-6xl font-bold">Ready to <span className="text-gradient">forge your future</span>?</h2>
        <p className="text-lg text-muted-foreground">Join thousands of students, recruiters, and institutions transforming the placement experience.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button variant="hero" size="xl">Get started free <ArrowRight /></Button>
          <Button variant="outline" size="xl">Talk to sales</Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded bg-gradient-primary grid place-items-center">
            <Sparkles className="size-3 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold text-foreground">CareerForge AI</span>
          <span>· © 2026</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Student, IIT Bombay",
    quote: "CareerForge AI completely changed my internship hunt! The AI resume feedback helped me fix my formatting, and the matched jobs were spot on. I landed a software engineering internship in under 2 weeks!",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120&h=120",
    rating: 5,
  },
  {
    name: "Sarah Jenkins",
    role: "Recruiter, TechCorp",
    quote: "We were flooded with hundreds of unqualified applications. CareerForge's AI screening pre-sorted the top candidates matching our tech stack perfectly. It saved our recruiting team over 20 hours a week.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120",
    rating: 5,
  },
  {
    name: "Dr. Ramesh Prasad",
    role: "TPO Head, RV College of Engineering",
    quote: "Managing campus placements for 1,200 students is a massive logistical challenge. With the real-time analytics dashboard, our training and placement office tracks every candidate and placement status live.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120",
    rating: 5,
  }
];

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 bg-secondary/30 border-y border-border/50">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Testimonials</p>
          <h2 className="text-4xl font-bold mb-4">What our community says</h2>
          <p className="text-muted-foreground">Hear from students, recruiters, and academic institutions who use our platform.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Card slider wrapper */}
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card p-8 md:p-12 shadow-soft transition-all duration-500">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 min-h-[220px]">
              <div className="size-24 md:size-32 rounded-full overflow-hidden border-2 border-primary/20 shrink-0 shadow-md">
                <img
                  src={testimonials[activeIndex].avatar}
                  alt={testimonials[activeIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4 flex-1">
                <div className="flex gap-1">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="size-4 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-lg md:text-xl font-medium leading-relaxed italic text-foreground/90">
                  "{testimonials[activeIndex].quote}"
                </blockquote>
                <div>
                  <cite className="not-italic font-bold text-foreground block">{testimonials[activeIndex].name}</cite>
                  <span className="text-sm text-muted-foreground">{testimonials[activeIndex].role}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`size-2.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? "bg-primary w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="size-10 rounded-full border border-border cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="size-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="size-10 rounded-full border border-border cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
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
  return (
    <section id="faq" className="py-24 container mx-auto px-6">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">FAQ</p>
        <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground text-lg">Quick answers to common questions about our internship and placement cell platform.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border border-border/60 bg-card rounded-xl px-6 transition-all hover:shadow-soft"
            >
              <AccordionTrigger className="text-base font-semibold py-5 hover:no-underline text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5 pt-1">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

type ContactFormData = {
  name: string;
  email: string;
  role: "student" | "recruiter" | "tpo" | "other";
  message: string;
  newsletter: boolean;
};

function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      role: "student",
      message: "",
      newsletter: true,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Contact form submitted data:", data);
    toast.success("Thank you! Your message was received. We will get back to you shortly.");
    reset();
  };

  return (
    <section id="contact" className="py-24 bg-secondary/40 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-accent uppercase tracking-wider">Contact Us</p>
              <h2 className="text-4xl font-bold">Let's talk about building your path</h2>
              <p className="text-muted-foreground leading-relaxed">
                Have questions about onboarding your university, setting up recruiting pipelines, or using our AI analyzer? Reach out and we'll reply within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-center">
                <div className="size-11 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0">
                  <Mail className="size-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">Email us</h4>
                  <p className="text-muted-foreground text-sm">support@careerforge.ai</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="size-11 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0">
                  <Shield className="size-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">Enterprise Security</h4>
                  <p className="text-muted-foreground text-sm">ISO 27001 Certified & GDPR Compliant</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="size-11 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0">
                  <Info className="size-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">Headquarters</h4>
                  <p className="text-muted-foreground text-sm">Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-card border border-border/80 rounded-2xl p-8 shadow-soft">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
                    <input
                      id="name"
                      type="text"
                      placeholder="Jane Doe"
                      className={`w-full bg-background border rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/20 ${
                        errors.name ? "border-destructive focus:border-destructive focus:ring-destructive/15" : "border-border"
                      }`}
                      {...register("name", {
                        required: "Name is required",
                        minLength: { value: 2, message: "Name must be at least 2 characters" },
                      })}
                    />
                  </div>
                  {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      className={`w-full bg-background border rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/20 ${
                        errors.email ? "border-destructive focus:border-destructive focus:ring-destructive/15" : "border-border"
                      }`}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </div>
                  {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="role" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Who are you?</label>
                <select
                  id="role"
                  className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/20"
                  {...register("role")}
                >
                  <option value="student">I am a Student looking for opportunities</option>
                  <option value="recruiter">I am a Recruiter looking for talent</option>
                  <option value="tpo">I am a Training & Placement Officer (TPO)</option>
                  <option value="other">Other / General inquiry</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your Message</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="How can we help you?"
                  className={`w-full bg-background border rounded-lg px-4 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/20 ${
                    errors.message ? "border-destructive focus:border-destructive focus:ring-destructive/15" : "border-border"
                  }`}
                  {...register("message", {
                    required: "Message is required",
                    minLength: { value: 10, message: "Message must be at least 10 characters" },
                  })}
                />
                {errors.message && <p className="text-destructive text-xs">{errors.message.message}</p>}
              </div>

              <div className="flex items-start gap-2.5 py-1">
                <input
                  id="newsletter"
                  type="checkbox"
                  className="size-4 rounded border-border text-primary focus:ring-primary mt-0.5"
                  {...register("newsletter")}
                />
                <label htmlFor="newsletter" className="text-xs text-muted-foreground cursor-pointer select-none">
                  Receive product updates, placement success guides, and recruiter reports (unsubscribe anytime).
                </label>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full h-11 cursor-pointer">
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" />
                    Sending message...
                  </>
                ) : (
                  <>
                    <Send className="size-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Nav />
      <main>
        <Hero />
        <Features />
        <Roles />
        <HowItWorks />
        <Stats />
        <Testimonials />
        <FAQ />
        <ContactForm />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

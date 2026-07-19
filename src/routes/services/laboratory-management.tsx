import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowUpRight, Check, FlaskConical, AlertTriangle, ShieldCheck,
  HelpCircle, ChevronRight, Sparkles, TrendingUp, Plus, Minus,
  BarChart3, Layers, ClipboardList, Timer, Cog, FileCheck
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { Reveal } from "@/components/site/Reveal";
import { submitToGoogleSheets } from "@/lib/sheets";
import heroImg from "@/assets/laboratory-management-hero.jpg";

export const Route = createFileRoute("/services/laboratory-management")({
  head: () => ({
    meta: [
      { title: "Laboratory Management Solutions | Amretri Healthcare" },
      {
        name: "description",
        content:
          "Amretri Healthcare provides end-to-end laboratory management solutions for diagnostic labs, pathology centers, and hospital labs — covering inventory control, TAT management, profit optimization, report authenticity, and compliance.",
      },
      {
        name: "keywords",
        content:
          "laboratory management solutions, hospital lab management, diagnostic lab management, pathology lab operations, lab inventory control, TAT management lab, lab profit optimization, lab compliance audit, NABL readiness lab, reagent expiry control, lab workflow automation India",
      },
      {
        property: "og:title",
        content: "Laboratory Management Solutions | Amretri Healthcare",
      },
      {
        property: "og:description",
        content:
          "Smart systems for accurate, profitable & efficient laboratories. Reduce expiry losses, improve TAT, and boost margins with Amretri's lab management services.",
      },
      { property: "og:image", content: heroImg },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://amretrihealthcare.com/services/laboratory-management",
      },
    ],
  }),
  component: LaboratoryManagementPage,
});

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  hospitalName: z.string().trim().min(1, "Lab / Hospital name is required").max(200),
  city: z.string().trim().min(1, "City is required").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  email: z.string().trim().email("Invalid email").max(255),
  labType: z.string().min(1, "Lab type is required"),
  mainChallenge: z.string().min(1, "Primary challenge is required"),
  message: z.string().trim().max(1000).optional(),
});

const faqs = [
  {
    q: "What is laboratory management, and why does it matter?",
    a: "Laboratory management involves the systematic oversight of all lab operations — including sample tracking, reagent inventory, billing, turnaround time, compliance, and reporting. It matters because poorly managed labs lose money to expired reagents, delayed reports, and billing errors that erode profitability and clinician trust.",
  },
  {
    q: "How does Amretri improve lab turnaround time (TAT)?",
    a: "We implement sample tracking systems from collection to final report, identify workflow bottlenecks, set up automated test prioritization, and provide real-time TAT dashboards — enabling labs to consistently deliver faster, predictable results.",
  },
  {
    q: "Can Amretri help reduce reagent expiry losses?",
    a: "Yes. Our inventory management systems use real-time stock visibility, batch-wise expiry tracking, FIFO dispensing logic, and low-stock/near-expiry alerts to minimize reagent waste and reduce expiry-related financial losses.",
  },
  {
    q: "What does Amretri's lab compliance support cover?",
    a: "Our compliance management includes audit documentation support, QC & calibration records, SOP integration, and data retention & traceability systems — keeping your lab perpetually audit-ready for NABL and regulatory inspections.",
  },
  {
    q: "How does Amretri help optimize lab profit and revenue?",
    a: "We conduct test-wise cost analysis and margin tracking, set up automated billing with accurate pricing, reduce reagent wastage and re-tests, and provide MIS reports by day, month, and test category — giving you complete financial visibility.",
  },
  {
    q: "Which types of labs does Amretri serve?",
    a: "Amretri serves diagnostic labs, pathology centers, hospital-embedded laboratories, multi-specialty lab chains, and radiology-combined facilities across India.",
  },
];

const problemsAndSolutions = [
  {
    prob: "Poor pricing and billing control leads to significant revenue leakage.",
    sol: "Automated billing with test-wise cost analysis and transparent margin tracking to recover lost revenue.",
  },
  {
    prob: "Lack of reagent tracking causes frequent expiry of high-value consumables.",
    sol: "Real-time inventory control with FIFO dispensing and near-expiry alerts minimizes wastage.",
  },
  {
    prob: "Workflow inefficiencies increase turnaround time and affect clinician trust.",
    sol: "Systematic TAT management with bottleneck identification and automated test prioritization.",
  },
  {
    prob: "Manual processes and human errors compromise report accuracy and compliance.",
    sol: "Digital automation with role-based access, audit trails, and tamper-proof reporting systems.",
  },
  {
    prob: "Poor manpower and equipment utilization affects lab productivity and capacity.",
    sol: "Barcode-based workflows, analyzer integrations, and QC logging to maximize throughput efficiently.",
  },
  {
    prob: "Absence of compliant systems creates vulnerability during NABL and regulatory audits.",
    sol: "Built-in compliance documentation, SOP integration, and data traceability ensure perpetual audit readiness.",
  },
];

const keyFeatures = [
  {
    icon: TrendingUp,
    title: "Profit & Revenue Optimization",
    intro: "Sustainable laboratory growth requires complete financial visibility and control.",
    points: [
      "Test-wise cost analysis & margin tracking",
      "Automated billing with accurate pricing",
      "Reduced reagent wastage & re-tests",
      "Higher sample throughput without extra manpower",
      "MIS reports by day, month & test category",
    ],
    impact: "Higher margins · Clear profitability insights · Better pricing decisions",
  },
  {
    icon: Layers,
    title: "Inventory & Expiry Management",
    intro: "Short shelf-life reagents demand precise inventory and expiry control.",
    points: [
      "Real-time stock visibility",
      "Batch-wise & expiry-date tracking",
      "FIFO dispensing logic",
      "Low-stock & near-expiry alerts",
      "Vendor & purchase trend analysis",
    ],
    impact: "Reduced expiry loss · Zero stock-outs · Optimized procurement",
  },
  {
    icon: FileCheck,
    title: "Report Authenticity & Data Security",
    intro: "Trusted reports are essential for clinical confidence and legal safety.",
    points: [
      "Role-based secure data access",
      "Audit trails for every report action",
      "Standardized auto-generated reports",
      "Digital signatures & validation controls",
      "Tamper-proof backups & data storage",
    ],
    impact: "Legally defensible reports · Doctor trust · Accreditation readiness",
  },
  {
    icon: Timer,
    title: "Turnaround Time (TAT) Management",
    intro: "Faster and predictable TAT is a major competitive advantage for labs.",
    points: [
      "Sample tracking from collection to report",
      "Bottleneck identification & resolution",
      "Automated test prioritization",
      "Delay & critical sample alerts",
      "Real-time TAT dashboards",
    ],
    impact: "Faster delivery · Clinician satisfaction · Market competitiveness",
  },
  {
    icon: Cog,
    title: "Workflow Automation & Efficiency",
    intro: "Manual processes increase delays, errors, and operational costs.",
    points: [
      "Barcode-based sample registration",
      "Automated analyzer integration",
      "Quality control logging",
      "Reduced paperwork & manual data entry",
    ],
    impact: "Fewer errors · Higher productivity · Scalable growth",
  },
  {
    icon: ClipboardList,
    title: "Compliance & Quality Management",
    intro: "Built-in compliance ensures audit readiness at all times.",
    points: [
      "Audit documentation support",
      "QC & calibration records",
      "SOP integration across workflows",
      "Data retention & traceability",
    ],
    impact: "Regulatory confidence · Quality consistency · Audit readiness",
  },
];

function LaboratoryManagementPage() {
  const [form, setForm] = useState({
    name: "",
    hospitalName: "",
    city: "",
    phone: "",
    email: "",
    labType: "",
    mainChallenge: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);

  const update =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = formSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        fieldErrors[i.path[0] as string] = i.message;
      });
      setErrors(fieldErrors);
      toast.error("Please fill all required fields correctly.");
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await submitToGoogleSheets("inquiry", {
        formSource: "Laboratory Management Page",
        ...form,
      });
      toast.success("Lab audit request received!", {
        description: "Our laboratory team will contact you within 24 hours.",
      });
      setForm({
        name: "",
        hospitalName: "",
        city: "",
        phone: "",
        email: "",
        labType: "",
        mainChallenge: "",
        message: "",
      });
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("lab-audit-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const inputCls =
    "w-full border-0 border-b border-white/30 bg-transparent pb-2 pt-4 text-white placeholder:text-white/50 outline-none transition focus:border-white focus:ring-0";
  const selectCls =
    "w-full border-0 border-b border-white/30 bg-transparent pb-2 pt-4 text-white outline-none transition focus:border-white focus:ring-0 [color-scheme:dark]";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Laboratory Management Solutions",
            provider: { "@type": "Organization", name: "Amretri Healthcare" },
            areaServed: { "@type": "Country", name: "India" },
            serviceType: [
              "Laboratory Management",
              "Diagnostic Lab Operations",
              "Lab Inventory Control",
              "TAT Management",
              "Lab Compliance",
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand/15 via-white to-orange/20 pt-32 pb-24 text-ink md:pt-40 md:pb-32">
        <div className="hex-grid absolute inset-0 opacity-[0.12]" aria-hidden />
        <div className="relative mx-auto max-w-[1500px] px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6 xl:col-span-7">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft text-brand border border-brand/20 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase">
                  <FlaskConical className="h-3.5 w-3.5" /> Laboratory Operations
                </span>
                <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl xl:text-6xl text-ink">
                  Laboratory Management Solutions
                </h1>
                <p className="mt-2 text-xs text-ink-soft/60 font-medium">
                  Last updated: July 2026
                </p>
                <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                  <strong className="text-brand">Smart Systems for Accurate, Profitable & Efficient Laboratories.</strong>{" "}
                  In today's competitive healthcare environment, labs are judged not only by test accuracy
                  but also by turnaround time, cost efficiency, inventory control, compliance, and report
                  credibility. Amretri's Laboratory Management Solutions help diagnostic labs, pathology
                  centers, and hospital labs streamline operations and increase profitability.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-8 text-xs font-semibold text-ink-soft md:grid-cols-4">
                  {["TAT Management", "Expiry Alerts", "Profit Optimization", "Compliance Ready"].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 text-brand" />
                        {item}
                      </div>
                    )
                  )}
                </div>
                <div className="mt-10 flex flex-wrap gap-4">
                  <button
                    onClick={scrollToForm}
                    className="group flex items-center gap-3 rounded-full bg-orange px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange/20 hover:bg-orange/95 hover:scale-105 transition"
                  >
                    Request Lab Audit{" "}
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                  <Link
                    to="/contact"
                    className="flex items-center gap-2 rounded-full border border-brand bg-transparent text-brand px-6 py-3.5 text-sm font-semibold hover:bg-orange/10 hover:border-orange hover:text-orange transition"
                  >
                    Talk to Our Team
                  </Link>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-6 xl:col-span-5">
              <Reveal variant="right" className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-brand-soft via-brand-deep to-brand opacity-30 blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl border border-border shadow-2xl aspect-[3/2]">
                  <img
                    src={heroImg}
                    alt="Laboratory management solutions for hospital and diagnostic labs"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-6 text-white">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Lab Excellence
                    </p>
                    <h3 className="mt-1 text-lg font-bold">
                      Smart Management for Modern Labs
                    </h3>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW CARDS */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange">
              Our Solutions
            </p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
              End-to-End Laboratory Management
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm text-ink-soft md:text-base">
              <strong className="text-brand">
                Laboratories today face pressure on accuracy, speed, cost, and compliance.
              </strong>{" "}
              Amretri's solutions deliver structured systems to address every operational dimension of modern lab management.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: FlaskConical,
                title: "End-to-End Workflow",
                desc: "Seamless integration from sample collection to final report delivery, eliminating handoff gaps.",
              },
              {
                icon: Layers,
                title: "Inventory & Expiry Control",
                desc: "Real-time reagent tracking to minimize expiry losses and ensure zero stock-outs.",
              },
              {
                icon: TrendingUp,
                title: "Profit Optimization",
                desc: "Transparent financial insights and test-wise margin tracking to control costs and boost revenue.",
              },
              {
                icon: FileCheck,
                title: "Report Authenticity",
                desc: "Secure, tamper-proof reporting with audit trails, digital signatures, and validation controls.",
              },
              {
                icon: Timer,
                title: "TAT Management",
                desc: "Track and improve turnaround time across all testing stages with automated prioritization.",
              },
              {
                icon: Cog,
                title: "Operational Efficiency",
                desc: "Automation-driven workflows that reduce manual errors, paperwork, and workload on lab staff.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={i}
                  delay={(i % 3) * 80}
                  variant={i % 3 === 0 ? "left" : i % 3 === 1 ? "scale" : "right"}
                  className="rounded-2xl border border-border bg-card p-6 hover:shadow-md hover:border-brand/30 transition"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{item.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROBLEMS & SOLUTIONS */}
      <section className="bg-ink py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange">
              Why Lab Management Matters
            </p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
              What Laboratory Challenges Does Amretri Solve?
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm text-white/70 md:text-base">
              Laboratories handle high test volumes, sensitive reagents, strict timelines, and regulatory
              scrutiny. Without structured management, serious operational and financial challenges accumulate.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {problemsAndSolutions.map((item, idx) => (
              <Reveal
                key={idx}
                delay={(idx % 3) * 80}
                variant={idx % 3 === 0 ? "left" : idx % 3 === 1 ? "scale" : "right"}
                className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-500/20 text-rose-400">
                      <AlertTriangle className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-bold text-white">The Challenge</span>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-rose-200/80 bg-rose-500/10 p-3 rounded-2xl border border-rose-500/20">
                    {item.prob}
                  </p>
                </div>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-wider">
                    <ShieldCheck className="h-4 w-4" />
                    Amretri Solution
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-white/70">{item.sol}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-8">
          <Reveal className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange">Key Features</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
              Key Features of Our Laboratory Management Solutions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-ink-soft md:text-base">
              Our solutions are built to deliver measurable operational efficiency, financial transparency,
              and regulatory confidence across modern laboratories.
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {keyFeatures.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={i}
                  delay={(i % 3) * 80}
                  variant={i % 3 === 0 ? "left" : i % 3 === 1 ? "scale" : "right"}
                  className="group rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:border-brand/30 transition-all"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-orange">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 text-xs text-ink-soft">{item.intro}</p>
                  <ul className="mt-4 space-y-1.5">
                    {item.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-xs text-ink">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 border-t border-border pt-3">
                    <p className="text-[11px] text-ink-soft">
                      <span className="font-bold text-brand">Impact: </span>
                      {item.impact}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="bg-secondary/20 py-20 border-t border-border md:py-28">
        <div className="mx-auto max-w-7xl px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange">Our Approach</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
              How Does Amretri Transform Laboratory Operations?
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Assessment & Audit",
                desc: "We conduct a comprehensive lab operations audit — evaluating revenue leakage, reagent wastage, TAT gaps, billing accuracy, and compliance status.",
              },
              {
                title: "System Design & Implementation",
                desc: "We design and implement tailored lab management systems including inventory controls, billing automation, TAT tracking, and compliance documentation.",
              },
              {
                title: "Continuous Monitoring",
                desc: "Real-time MIS dashboards, monthly performance reviews, and ongoing compliance checks ensure the lab maintains operational excellence perpetually.",
              },
            ].map((item, i) => (
              <Reveal
                key={i}
                delay={i * 100}
                variant={i === 0 ? "left" : i === 1 ? "scale" : "right"}
                className="rounded-2xl border border-border bg-card p-6 hover:shadow-md transition"
              >
                <span className="inline-block rounded-lg bg-brand px-2.5 py-1 text-xs font-bold tracking-wider uppercase text-white">
                  Step 0{i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="lab-audit-form" className="relative overflow-hidden bg-ink py-24 text-white">
        <div className="hex-grid absolute inset-0 opacity-20" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-soft">
              Lab Audit Desk
            </p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
              Request a Laboratory Management Audit
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xs text-white/70">
              Identify revenue leakage, reduce expiry losses, improve turnaround time, and strengthen
              compliance with a comprehensive laboratory management audit tailored to your operations.
            </p>
          </Reveal>
          <Reveal variant="up" className="mt-12 rounded-3xl bg-brand p-8 shadow-2xl md:p-12">
            <form onSubmit={submit} className="grid gap-6 md:grid-cols-2" noValidate>
              <div>
                <label className="text-xs font-semibold text-white/80">Your Name</label>
                <input
                  value={form.name}
                  onChange={update("name")}
                  maxLength={100}
                  className={inputCls}
                  placeholder="e.g. Dr. Priya Sharma"
                />
                {errors.name && <p className="mt-1 text-xs text-amber-200">{errors.name}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-white/80">Lab / Hospital Name</label>
                <input
                  value={form.hospitalName}
                  onChange={update("hospitalName")}
                  maxLength={200}
                  className={inputCls}
                  placeholder="e.g. City Diagnostics Lab"
                />
                {errors.hospitalName && (
                  <p className="mt-1 text-xs text-amber-200">{errors.hospitalName}</p>
                )}
              </div>
              <div>
                <label className="text-xs font-semibold text-white/80">City</label>
                <input
                  value={form.city}
                  onChange={update("city")}
                  maxLength={100}
                  className={inputCls}
                  placeholder="e.g. Delhi"
                />
                {errors.city && <p className="mt-1 text-xs text-amber-200">{errors.city}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-white/80">Lab Type</label>
                <select value={form.labType} onChange={update("labType")} className={selectCls}>
                  <option value="" disabled className="text-ink">
                    Select lab type
                  </option>
                  <option value="Diagnostic Lab" className="text-ink">
                    Diagnostic Lab
                  </option>
                  <option value="Pathology Center" className="text-ink">
                    Pathology Center
                  </option>
                  <option value="Hospital Lab" className="text-ink">
                    Hospital-Embedded Lab
                  </option>
                  <option value="Radiology + Lab" className="text-ink">
                    Radiology + Lab Combined
                  </option>
                  <option value="Lab Chain" className="text-ink">
                    Multi-Location Lab Chain
                  </option>
                </select>
                {errors.labType && <p className="mt-1 text-xs text-amber-200">{errors.labType}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-white/80">Phone Number</label>
                <input
                  value={form.phone}
                  onChange={update("phone")}
                  maxLength={20}
                  className={inputCls}
                  placeholder="+91"
                />
                {errors.phone && <p className="mt-1 text-xs text-amber-200">{errors.phone}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-white/80">Email ID</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  maxLength={255}
                  className={inputCls}
                  placeholder="contact@lab.com"
                />
                {errors.email && <p className="mt-1 text-xs text-amber-200">{errors.email}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-white/80">Primary Challenge</label>
                <select
                  value={form.mainChallenge}
                  onChange={update("mainChallenge")}
                  className={selectCls}
                >
                  <option value="" disabled className="text-ink">
                    Select primary issue
                  </option>
                  <option value="Revenue Leakage" className="text-ink">
                    Revenue / Billing Leakage
                  </option>
                  <option value="Reagent Expiry" className="text-ink">
                    High Reagent Expiry Losses
                  </option>
                  <option value="High TAT" className="text-ink">
                    High Turnaround Time (TAT)
                  </option>
                  <option value="Compliance" className="text-ink">
                    Compliance & Audit Readiness
                  </option>
                  <option value="No System" className="text-ink">
                    No Management System
                  </option>
                  <option value="Overall Audit" className="text-ink">
                    Complete Lab Audit
                  </option>
                </select>
                {errors.mainChallenge && (
                  <p className="mt-1 text-xs text-amber-200">{errors.mainChallenge}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-white/80">
                  Additional Details (Optional)
                </label>
                <textarea
                  value={form.message}
                  onChange={update("message")}
                  maxLength={1000}
                  rows={2}
                  className={`${inputCls} resize-none`}
                  placeholder="Tell us more about your lab's specific needs..."
                />
              </div>
              <div className="mt-4 md:col-span-2 flex justify-end border-t border-white/10 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex items-center gap-3 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-brand shadow-lg hover:bg-white/90 transition"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
                  ) : (
                    <>
                      Submit Audit Request{" "}
                      <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="bg-secondary/20 py-16 border-t border-border">
        <div className="mx-auto max-w-7xl px-8">
          <Reveal className="text-center mb-10">
            <h2 className="text-2xl font-bold md:text-3xl">Explore Related Services</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-center text-xs font-semibold">
            {[
              {
                label: "Pharmacy Acquisition & Management",
                slug: "hospital-pharmacy-acquisition-management",
              },
              { label: "Pharmacist Supply & Staffing", slug: "pharmacist-supply-staffing" },
              { label: "Inventory & Stock Control", slug: "inventory-stock-control" },
              { label: "Pharmacy Compliance & Audit", slug: "compliance-audit" },
            ].map((link, idx) => (
              <Link
                key={idx}
                to={`/services/${link.slug}` as any}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md hover:border-brand/35 hover:scale-[1.02]"
              >
                <span className="text-ink leading-snug">{link.label}</span>
                <span className="mt-4 inline-flex items-center justify-center gap-1 text-[11px] text-brand font-bold uppercase tracking-wider">
                  Learn More <ArrowUpRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange">FAQs</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
              Frequently Asked Questions
            </h2>
          </Reveal>
          <Reveal
            variant="up"
            className="mt-12 divide-y divide-border rounded-3xl border border-border bg-card overflow-hidden"
          >
            {faqs.map((f, i) => {
              const isOpen = faqOpen === i;
              return (
                <button
                  key={i}
                  onClick={() => setFaqOpen(isOpen ? null : i)}
                  className="group block w-full px-6 py-5 text-left transition hover:bg-secondary/30"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-ink transition-colors group-hover:text-orange md:text-base">
                      {f.q}
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "bg-brand text-white rotate-180"
                          : "bg-secondary text-brand group-hover:bg-orange/10 group-hover:text-orange"
                      }`}
                    >
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </div>
                  <div
                    className={`grid overflow-hidden transition-all duration-500 ease-out ${
                      isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <p className="overflow-hidden text-xs leading-relaxed text-ink-soft md:text-sm">
                      {f.a}
                    </p>
                  </div>
                </button>
              );
            })}
          </Reveal>
        </div>
      </section>

      <section className="bg-brand py-12 text-center text-white border-t border-white/10">
        <div className="mx-auto max-w-4xl px-8">
          <p className="text-sm md:text-base font-semibold leading-relaxed">
            "Your laboratory should be a profit centre, not a problem centre. With Amretri's lab management
            systems, every test, reagent, and report is tracked, optimized, and accountable."
          </p>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}

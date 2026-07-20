import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowUpRight, Check, ScanLine, AlertTriangle, ShieldCheck,
  HelpCircle, ChevronRight, Sparkles, TrendingUp, Plus, Minus,
  BarChart3, Layers, ClipboardList, Timer, Cog, FileCheck, Zap
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { Reveal } from "@/components/site/Reveal";
import { submitToGoogleSheets } from "@/lib/sheets";
import heroImg from "@/assets/radiology-management-hero.jpg";

export const Route = createFileRoute("/services/radiology-management")({
  head: () => ({
    meta: [
      { title: "Radiology Management Solutions | Amretri Healthcare" },
      {
        name: "description",
        content:
          "Amretri Healthcare provides end-to-end radiology management solutions for hospital radiology departments and imaging centers — covering workflow automation, equipment utilization, billing accuracy, TAT optimization, compliance, and profit improvement.",
      },
      {
        name: "keywords",
        content:
          "radiology management solutions, hospital radiology department management, imaging center operations, radiology workflow automation, radiology billing audit, CT MRI utilization management, radiology compliance India, AERB compliance radiology, radiology profit optimization",
      },
      {
        property: "og:title",
        content: "Radiology Management Solutions | Amretri Healthcare",
      },
      {
        property: "og:description",
        content:
          "Smart systems for profitable, efficient & compliant radiology departments. Improve equipment utilization, reduce TAT, and maximize imaging revenue with Amretri.",
      },
      { property: "og:image", content: heroImg },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://amretrihealthcare.com/services/radiology-management",
      },
    ],
  }),
  component: RadiologyManagementPage,
});

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  hospitalName: z.string().trim().min(1, "Hospital / Center name is required").max(200),
  city: z.string().trim().min(1, "City is required").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  email: z.string().trim().email("Invalid email").max(255),
  centerType: z.string().min(1, "Center type is required"),
  mainChallenge: z.string().min(1, "Primary challenge is required"),
  message: z.string().trim().max(1000).optional(),
});

const faqs = [
  {
    q: "What does radiology management cover?",
    a: "Radiology management covers end-to-end operations of imaging departments — from scheduling and patient flow management to equipment utilization tracking, billing accuracy, report TAT, consumable inventory (contrast media, films, etc.), AERB compliance, and financial reporting.",
  },
  {
    q: "How does Amretri improve radiology department revenue?",
    a: "We conduct a comprehensive billing audit to identify under-billed procedures, unbilled studies, and pricing gaps. We then implement automated billing linked to modality worklists, ensuring every scan performed is accurately captured and charged.",
  },
  {
    q: "Can Amretri help manage equipment utilization for MRI and CT scanners?",
    a: "Yes. We track equipment uptime, scan volumes per modality, peak vs off-peak utilization, and preventive maintenance schedules — helping hospitals maximize ROI on high-capital imaging equipment.",
  },
  {
    q: "What compliance areas does Amretri cover for radiology?",
    a: "Our compliance support covers AERB (Atomic Energy Regulatory Board) licensing documentation, radiation dose records, patient exposure logs, lead shielding verification, staff dose monitoring records, and periodic inspection support.",
  },
  {
    q: "How does Amretri reduce TAT for radiology reports?",
    a: "We implement RIS/PACS workflow audits, identify reporting bottlenecks, create priority queuing for emergency studies, and set up TAT dashboards so department heads can monitor report delivery in real time.",
  },
  {
    q: "What is the typical engagement model?",
    a: "We typically start with a free preliminary radiology management audit of your department. Based on findings, we propose an engagement model — fixed management fee or revenue-sharing — tailored to your hospital's size and complexity.",
  },
];

const challenges = [
  {
    prob: "Revenue leakage due to unbilled scans and under-priced procedures.",
    sol: "Automated billing linked to modality worklists eliminates missed charges and ensures accurate pricing for every study.",
  },
  {
    prob: "Poor equipment utilization leads to low ROI on high-capital MRI/CT investments.",
    sol: "Equipment utilization dashboards track scan volumes, downtime, and peak hours to maximize throughput.",
  },
  {
    prob: "Slow report turnaround time (TAT) affects clinician confidence and referral volumes.",
    sol: "Workflow automation with priority queuing and real-time TAT dashboards deliver faster, predictable reports.",
  },
  {
    prob: "Consumable waste (contrast media, films) from poor inventory tracking.",
    sol: "Expiry-aware inventory control with low-stock alerts prevents waste and eliminates emergency procurement.",
  },
  {
    prob: "AERB compliance gaps create regulatory risk and potential license issues.",
    sol: "Structured compliance documentation, dose records, and periodic inspection support ensure perpetual audit readiness.",
  },
];

const keyFeatures = [
  {
    icon: TrendingUp,
    title: "Revenue & Billing Optimization",
    intro: "Capture every rupee from every scan performed in your department.",
    points: [
      "Billing audit to identify unbilled & under-billed studies",
      "Modality worklist integration for auto-billing",
      "Procedure-wise cost and margin analysis",
      "Contrast & consumable cost tracking",
      "MIS reports by modality, day & month",
    ],
    impact: "Higher revenue · Zero missed charges · Better pricing decisions",
  },
  {
    icon: Zap,
    title: "Equipment Utilization Management",
    intro: "Maximize ROI on your MRI, CT, X-Ray, and Ultrasound machines.",
    points: [
      "Scan volume tracking per modality",
      "Equipment uptime & downtime monitoring",
      "Peak vs off-peak utilization analysis",
      "Preventive maintenance scheduling",
      "Capacity planning & throughput optimization",
    ],
    impact: "Higher machine ROI · Reduced downtime · Scalable growth",
  },
  {
    icon: FileCheck,
    title: "AERB Compliance & Safety Management",
    intro: "Stay perpetually compliant with radiation safety regulations.",
    points: [
      "AERB licensing documentation support",
      "Radiation dose & exposure log maintenance",
      "Lead shielding & safety equipment records",
      "Staff dose monitoring (TLD badge) management",
      "Periodic inspection preparation & support",
    ],
    impact: "Zero regulatory risk · Audit-ready always · Safe operations",
  },
  {
    icon: Timer,
    title: "Report TAT Management",
    intro: "Faster reports mean more satisfied clinicians and higher referrals.",
    points: [
      "RIS/PACS workflow audit & optimization",
      "Priority queuing for emergency studies",
      "Bottleneck identification & resolution",
      "Real-time TAT dashboards",
      "Automated delay & critical case alerts",
    ],
    impact: "Faster delivery · Clinician trust · Competitive advantage",
  },
  {
    icon: Layers,
    title: "Consumable Inventory Control",
    intro: "Eliminate waste, stockouts, and emergency procurement in radiology.",
    points: [
      "Contrast media & film stock tracking",
      "Batch-wise expiry date management",
      "Low-stock & near-expiry alerts",
      "Vendor performance & purchase analysis",
      "FIFO dispensing to minimize waste",
    ],
    impact: "Reduced waste · Zero stockouts · Optimized procurement",
  },
  {
    icon: Cog,
    title: "Workflow & Operations Efficiency",
    intro: "Streamline patient flow and reduce operational friction in imaging.",
    points: [
      "Appointment scheduling system setup",
      "Patient waiting time reduction",
      "Staff duty roster & workload management",
      "Reporting room workflow optimization",
      "Digital record-keeping & audit trails",
    ],
    impact: "Smoother operations · Better patient experience · Higher capacity",
  },
];

const impactStats = [
  { value: "15–25%", label: "Revenue Leakage Recovered", sub: "Via billing audits" },
  { value: "40%", label: "Faster Report TAT", sub: "Workflow optimization" },
  { value: "Zero", label: "AERB Compliance Gaps", sub: "Perpetual audit readiness" },
  { value: "5–30%", label: "Margin Improvement", sub: "Across radiology operations" },
];

function RadiologyManagementPage() {
  const [form, setForm] = useState({
    name: "",
    hospitalName: "",
    city: "",
    phone: "",
    email: "",
    centerType: "",
    mainChallenge: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
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
        formSource: "Radiology Management Page",
        ...form,
      });
      toast.success("Radiology audit request received!", {
        description: "Our radiology management team will contact you within 24 hours.",
      });
      setForm({
        name: "",
        hospitalName: "",
        city: "",
        phone: "",
        email: "",
        centerType: "",
        mainChallenge: "",
        message: "",
      });
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("radiology-audit-form")?.scrollIntoView({ behavior: "smooth" });
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
            name: "Radiology Management Solutions",
            provider: { "@type": "Organization", name: "Amretri Healthcare" },
            areaServed: { "@type": "Country", name: "India" },
            serviceType: [
              "Radiology Management",
              "Imaging Center Operations",
              "Radiology Billing Optimization",
              "AERB Compliance",
              "Equipment Utilization Management",
            ],
          }),
        }}
      />
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-24 md:pt-32">
        <div className="mx-auto max-w-7xl px-6 pb-0">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand">
                <ScanLine className="h-3.5 w-3.5" /> Radiology Management
              </div>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl lg:text-6xl">
                End-to-End{" "}
                <span className="text-brand">Radiology Department</span>{" "}
                Management
              </h1>
              <p className="text-base leading-relaxed text-ink-soft md:text-lg">
                Maximize equipment ROI, eliminate billing leakage, improve report TAT, and achieve AERB compliance with Amretri Healthcare's expert radiology operations management.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={scrollToForm}
                  className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/20 transition hover:bg-brand-deep"
                >
                  Request a Free Audit <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3.5 text-sm font-bold text-ink transition hover:border-brand hover:text-brand"
                >
                  Talk to Our Team
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 pt-2">
                {["Billing Audit", "AERB Compliance", "Equipment Utilization", "TAT Optimization"].map((tag) => (
                  <span key={tag} className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
                    <Check className="h-3.5 w-3.5 text-brand" /> {tag}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal variant="right" className="relative">
              <div className="overflow-hidden rounded-3xl shadow-2xl aspect-[4/3]">
                <img
                  src={heroImg}
                  alt="Hospital radiology department with MRI and CT scanners"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white p-4 shadow-xl border border-border">
                <p className="text-xs font-bold text-ink-soft uppercase tracking-wider">Revenue Recovery</p>
                <p className="text-2xl font-extrabold text-brand">15–25%</p>
                <p className="text-xs text-ink-soft">Via billing audits</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── IMPACT STATS ── */}
      <section className="bg-ink py-16 mt-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {impactStats.map((s) => (
              <Reveal key={s.label} className="text-center">
                <p className="text-3xl font-extrabold text-brand md:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm font-bold text-white">{s.label}</p>
                <p className="text-xs text-white/60">{s.sub}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHALLENGES ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange">Common Gaps</span>
            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">Why Radiology Departments Underperform</h2>
            <p className="mt-4 text-ink-soft">Most imaging departments lose significant revenue and face compliance risk due to preventable operational gaps.</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {challenges.map((c, i) => (
              <Reveal key={i} variant={i % 3 === 0 ? "left" : i % 3 === 1 ? "up" : "right"}>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-brand hover:shadow-md transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-red-50 text-red-500">
                      <AlertTriangle className="h-4 w-4" />
                    </span>
                    <p className="text-sm font-semibold text-ink leading-snug">{c.prob}</p>
                  </div>
                  <div className="flex items-start gap-3 pl-11">
                    <p className="text-xs text-ink-soft leading-relaxed border-l-2 border-brand/30 pl-3">{c.sol}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY FEATURES ── */}
      <section className="bg-secondary/30 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange">Our Solutions</span>
            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">What We Manage for You</h2>
            <p className="mt-4 text-ink-soft">A complete operational system covering every aspect of your radiology department's performance.</p>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {keyFeatures.map((f, i) => (
              <Reveal key={i} variant={i % 2 === 0 ? "left" : "right"}>
                <div className="group rounded-3xl border border-border bg-card p-6 shadow-sm hover:border-brand hover:shadow-xl transition-all duration-300">
                  <span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand mb-4 group-hover:bg-brand group-hover:text-white transition-colors">
                    <f.icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg font-bold text-ink group-hover:text-brand transition-colors">{f.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">{f.intro}</p>
                  <ul className="mt-4 space-y-2">
                    {f.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-xs text-ink-soft">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" /> {p}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs font-semibold text-brand border-t border-border pt-4">{f.impact}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY AMRETRI ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange">Why Amretri</span>
              <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">
                A Dedicated Radiology Operations Partner
              </h2>
              <p className="mt-4 text-ink-soft leading-relaxed">
                Unlike generic consultants, Amretri Healthcare specializes exclusively in healthcare ancillary department operations — pharmacy, laboratory, and radiology. We bring systems, expertise, and accountability to transform your imaging department from a cost center into a revenue driver.
              </p>
              <ul className="mt-8 space-y-3.5 text-sm text-ink">
                {[
                  { title: "Dedicated Radiology Audit Team", desc: "Specialists with deep experience in imaging department operations and compliance." },
                  { title: "Revenue-First Approach", desc: "Every system we implement is designed to recover revenue and improve margins." },
                  { title: "Compliance Guaranteed", desc: "Full AERB and regulatory compliance as part of our standard engagement." },
                  { title: "Transparent Reporting", desc: "Monthly MIS reports covering revenue, equipment utilization, and TAT metrics." },
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 bg-card p-4 rounded-xl border border-border shadow-sm">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange/10 text-orange">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="font-bold text-ink">{item.title}</p>
                      <p className="mt-1 text-xs text-ink-soft leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal variant="right" className="bg-gradient-to-br from-brand/5 to-brand/10 rounded-3xl p-8 border border-brand/20">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="h-6 w-6 text-brand" />
                <h3 className="text-xl font-extrabold text-ink">Our Radiology Audit Process</h3>
              </div>
              <div className="space-y-4">
                {[
                  { step: "01", title: "Preliminary Assessment", desc: "Free remote review of your current radiology billing, TAT, and compliance status." },
                  { step: "02", title: "On-Site Department Audit", desc: "Detailed on-site assessment of workflows, equipment, inventory, and documentation." },
                  { step: "03", title: "Findings & Proposal", desc: "Custom report with identified gaps, revenue recovery potential, and an action plan." },
                  { step: "04", title: "Implementation", desc: "Structured rollout of systems, dashboards, and compliance frameworks." },
                  { step: "05", title: "Ongoing Monitoring", desc: "Monthly reviews, reports, and continuous optimization for sustained improvement." },
                ].map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <span className="text-2xl font-extrabold text-brand/20 leading-none w-8 shrink-0">{s.step}</span>
                    <div>
                      <p className="font-bold text-ink text-sm">{s.title}</p>
                      <p className="text-xs text-ink-soft mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── AUDIT FORM ── */}
      <section id="radiology-audit-form" className="relative overflow-hidden bg-ink py-24 text-white">
        <div className="hex-grid absolute inset-0 opacity-20" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-soft">Audit Desk</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Request a Radiology Management Audit</h2>
            <p className="mx-auto mt-4 max-w-2xl text-xs text-white/70">
              Identify revenue leakage, reduce expiry losses, improve turnaround time, and achieve full AERB compliance with a comprehensive radiology management audit tailored to your operations.
            </p>
          </Reveal>
          <Reveal variant="up" className="mt-12 rounded-3xl bg-brand p-8 shadow-2xl md:p-12">
            <form onSubmit={submit} className="grid gap-6 md:grid-cols-2" noValidate>
              <div>
                <label className="text-xs font-semibold text-white/80">Your Name</label>
                <input value={form.name} onChange={update("name")} maxLength={100} className={inputCls} placeholder="e.g. Dr. Rajesh Kumar" />
                {errors.name && <p className="mt-1 text-xs text-amber-200">{errors.name}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-white/80">Hospital / Imaging Center Name</label>
                <input value={form.hospitalName} onChange={update("hospitalName")} maxLength={200} className={inputCls} placeholder="e.g. Sunrise Imaging & Diagnostics" />
                {errors.hospitalName && <p className="mt-1 text-xs text-amber-200">{errors.hospitalName}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-white/80">City</label>
                <input value={form.city} onChange={update("city")} maxLength={100} className={inputCls} placeholder="e.g. Lucknow, Uttar Pradesh" />
                {errors.city && <p className="mt-1 text-xs text-amber-200">{errors.city}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-white/80">Contact Number</label>
                <input value={form.phone} onChange={update("phone")} maxLength={20} className={inputCls} placeholder="e.g. +91 98862 00349" />
                {errors.phone && <p className="mt-1 text-xs text-amber-200">{errors.phone}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-white/80">Email ID</label>
                <input type="email" value={form.email} onChange={update("email")} maxLength={255} className={inputCls} placeholder="e.g. contact@hospital.com" />
                {errors.email && <p className="mt-1 text-xs text-amber-200">{errors.email}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-white/80">Center Type</label>
                <select value={form.centerType} onChange={update("centerType")} className={selectCls}>
                  <option value="" disabled className="text-ink">Select center type</option>
                  <option value="Hospital Radiology Dept" className="text-ink">Hospital Radiology Department</option>
                  <option value="Standalone Imaging Center" className="text-ink">Standalone Imaging Center</option>
                  <option value="Diagnostic Chain" className="text-ink">Diagnostic Chain / Multi-location</option>
                  <option value="Upcoming Center" className="text-ink">Upcoming New Center</option>
                  <option value="Other" className="text-ink">Other</option>
                </select>
                {errors.centerType && <p className="mt-1 text-xs text-amber-200">{errors.centerType}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-white/80">Primary Challenge</label>
                <select value={form.mainChallenge} onChange={update("mainChallenge")} className={selectCls}>
                  <option value="" disabled className="text-ink">Select main challenge</option>
                  <option value="Revenue Leakage / Billing Gaps" className="text-ink">Revenue Leakage / Billing Gaps</option>
                  <option value="Poor Equipment Utilization" className="text-ink">Poor Equipment Utilization</option>
                  <option value="Slow Report TAT" className="text-ink">Slow Report TAT</option>
                  <option value="Consumable / Contrast Waste" className="text-ink">Consumable / Contrast Waste</option>
                  <option value="AERB Compliance" className="text-ink">AERB Compliance Issues</option>
                  <option value="Overall Operations" className="text-ink">Overall Operations Improvement</option>
                </select>
                {errors.mainChallenge && <p className="mt-1 text-xs text-amber-200">{errors.mainChallenge}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-white/80">Additional Details (Optional)</label>
                <textarea
                  value={form.message}
                  onChange={update("message")}
                  rows={3}
                  maxLength={1000}
                  className={`${inputCls} resize-none`}
                  placeholder="Share any specific challenges, equipment details, or questions for our radiology team..."
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-brand transition hover:bg-orange hover:text-white disabled:opacity-60"
                >
                  {loading ? "Submitting…" : (
                    <>Request Radiology Audit <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></>
                  )}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange">FAQs</span>
            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">Common Questions</h2>
          </Reveal>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={i}>
                <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
                  <button
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <span className="flex items-center gap-3 font-semibold text-sm text-ink">
                      <HelpCircle className="h-4 w-4 shrink-0 text-brand" /> {f.q}
                    </span>
                    {faqOpen === i ? <Minus className="h-4 w-4 shrink-0 text-brand" /> : <Plus className="h-4 w-4 shrink-0 text-ink-soft" />}
                  </button>
                  {faqOpen === i && (
                    <p className="px-5 pb-5 text-sm text-ink-soft leading-relaxed border-t border-border pt-4">{f.a}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-brand py-20 text-center text-white">
        <Reveal>
          <ShieldCheck className="mx-auto h-10 w-10 text-white/60 mb-4" />
          <h2 className="text-3xl font-extrabold md:text-4xl">
            Start with a Free Radiology Audit
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/80">
            No commitment required. Share your details and receive a preliminary assessment identifying your department's key revenue and compliance gaps.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={scrollToForm}
              className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-brand transition hover:bg-orange hover:text-white"
            >
              Request Free Audit
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Contact Us <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <CtaFooter />
    </main>
  );
}

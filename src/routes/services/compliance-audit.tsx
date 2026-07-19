import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowUpRight, Check, ShieldCheck, FileCheck, HelpCircle,
  ChevronRight, Sparkles, AlertTriangle, Plus, Minus, ClipboardCheck,
  FileText, Scale, BookOpen, Bell
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { Reveal } from "@/components/site/Reveal";
import { submitToGoogleSheets } from "@/lib/sheets";
import heroImg from "@/assets/compliance-audit-hero.jpg";

export const Route = createFileRoute("/services/compliance-audit")({
  head: () => ({
    meta: [
      { title: "Hospital Pharmacy Compliance & Audit Services | Amretri Healthcare" },
      { name: "description", content: "Ensure your hospital pharmacy is 100% compliant with drug license regulations, NABH standards, and audit readiness. Amretri provides SOPs, cold chain monitoring, narcotic registers, and compliance audits." },
      { name: "keywords", content: "hospital pharmacy audit, pharmacy compliance services, NABH pharmacy compliance, drug license compliance, pharmacy SOPs, cold chain monitoring pharmacy, narcotic drug register, LASA storage, high alert medication protocol, pharmacy audit checklist India" },
      { property: "og:title", content: "Hospital Pharmacy Compliance & Audit Services | Amretri Healthcare" },
      { property: "og:description", content: "Stay audit-ready with comprehensive pharmacy compliance services: SOPs, cold chain logs, narcotic registers, and NABH readiness support." },
      { property: "og:image", content: heroImg },
    ],
    links: [
      { rel: "canonical", href: "https://amretrihealthcare.com/services/compliance-audit" },
    ],
  }),
  component: CompliancePage,
});

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  hospitalName: z.string().trim().min(1, "Hospital name is required").max(200),
  city: z.string().trim().min(1, "City is required").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  email: z.string().trim().email("Invalid email").max(255),
  complianceNeed: z.string().min(1, "Compliance need is required"),
  message: z.string().trim().max(1000).optional(),
});

const faqs = [
  {
    q: "What pharmacy compliance does NABH require?",
    a: "NABH requires hospitals to maintain documented SOPs, cold chain temperature logs, LASA (Look-Alike Sound-Alike) drug management, high-alert medication protocols, narcotic drug registers, and regular internal audit records."
  },
  {
    q: "How does Amretri help with drug license compliance?",
    a: "Amretri provides guidance on drug license renewal, premises compliance, storage condition requirements, register maintenance, and documentation needed for drug license inspections."
  },
  {
    q: "What is a pharmacy audit?",
    a: "A pharmacy audit is a systematic review of pharmacy operations covering stock accuracy, expiry management, billing processes, compliance with regulations, SOP adherence, and staff performance."
  },
  {
    q: "How often should a pharmacy audit be conducted?",
    a: "We recommend a comprehensive pharmacy audit at least once a quarter, with monthly internal checks on expiry, stock accuracy, and compliance documentation."
  },
  {
    q: "Can Amretri help prepare my pharmacy for NABH accreditation?",
    a: "Yes. Amretri provides complete NABH readiness support including SOP creation, documentation setup, staff training, internal audits, and corrective action planning."
  }
];

const auditTypes = [
  { title: "Drug License Compliance", desc: "Verify that your pharmacy premises, storage, registers, and documentation meet drug license requirements." },
  { title: "NABH Readiness Audit", desc: "Comprehensive review of pharmacy SOPs, cold chain logs, LASA storage, narcotic records, and audit trails." },
  { title: "Stock & Inventory Audit", desc: "Physical stock verification, expiry checks, slow-moving analysis, and system-stock reconciliation." },
  { title: "Billing & Revenue Audit", desc: "Check for billing leakages, discount controls, cash handling processes, and revenue reconciliation." },
  { title: "SOP & Documentation Audit", desc: "Review all pharmacy SOPs, registers, logs, and forms for completeness and compliance." },
  { title: "Cold Chain & Storage Audit", desc: "Temperature mapping, refrigerator logs, cold chain protocol adherence, and storage condition assessment." },
];

function CompliancePage() {
  const [form, setForm] = useState({
    name: "", hospitalName: "", city: "", phone: "", email: "", complianceNeed: "", message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = formSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { fieldErrors[i.path[0] as string] = i.message; });
      setErrors(fieldErrors);
      toast.error("Please fill all required fields correctly.");
      return;
    }
    setErrors({});
    
    // Submit to Google Sheets (proposal inquiry)
    await submitToGoogleSheets("inquiry", {
      formSource: "Compliance & Audit Page",
      ...form
    });
    
    toast.success("Audit request received!", {
      description: "Our compliance team will contact you within 24 hours."
    });
    setForm({ name: "", hospitalName: "", city: "", phone: "", email: "", complianceNeed: "", message: "" });
  };

  const scrollToForm = () => {
    document.getElementById("compliance-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const inputCls = "w-full border-0 border-b border-white/30 bg-transparent pb-2 pt-4 text-white placeholder:text-white/50 outline-none transition focus:border-white focus:ring-0";
  const selectCls = "w-full border-0 border-b border-white/30 bg-transparent pb-2 pt-4 text-white outline-none transition focus:border-white focus:ring-0 [color-scheme:dark]";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", "name": "Hospital Pharmacy Compliance & Audit Services", "provider": { "@type": "Organization", "name": "Amretri Healthcare" }, "areaServed": { "@type": "Country", "name": "India" } })
      }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) })
      }} />

      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand/15 via-white to-orange/20 pt-32 pb-24 text-ink md:pt-40 md:pb-32">
        <div className="hex-grid absolute inset-0 opacity-[0.12]" aria-hidden />
        <div className="relative mx-auto max-w-[1500px] px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6 xl:col-span-7">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft text-brand border border-brand/20 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase">
                  <ShieldCheck className="h-3.5 w-3.5" /> Compliance Assurance
                </span>
                <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl xl:text-6xl text-ink">
                  Hospital Pharmacy Compliance &amp; Audit Services
                </h1>
                <p className="mt-2 text-xs text-ink-soft/60 font-medium">Last updated: July 2026</p>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                  Stay 100% compliant with drug license regulations, NABH standards, and internal audit readiness. Amretri Healthcare provides comprehensive pharmacy compliance and audit services for hospitals across India.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-8 text-xs font-semibold text-ink-soft md:grid-cols-4">
                  {["NABH Readiness", "SOP Setup", "Audit Reports", "License Compliance"].map((item) => (
                    <div key={item} className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-brand" />{item}</div>
                  ))}
                </div>
                <div className="mt-10 flex flex-wrap gap-4">
                  <button onClick={scrollToForm} className="group flex items-center gap-3 rounded-full bg-orange px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange/20 hover:bg-orange/95 hover:scale-105 transition">
                    Book a Pharmacy Audit <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                  <Link to="/contact" className="flex items-center gap-2 rounded-full border border-brand bg-transparent text-brand px-6 py-3.5 text-sm font-semibold hover:bg-orange/10 hover:border-orange hover:text-orange transition">
                    Talk to Compliance Team
                  </Link>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-6 xl:col-span-5">
              <Reveal variant="right" className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-brand-soft via-brand-deep to-brand opacity-30 blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl border border-border shadow-2xl aspect-[3/2]">
                  <img src={heroImg} alt="Pharmacy compliance and audit services" className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-6 text-white">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Audit Ready</p>
                    <h3 className="mt-1 text-lg font-bold">Complete Compliance Assurance</h3>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIT TYPES */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-8">
          <Reveal className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange">Audit Services</p>                <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">What Types of Pharmacy Audits Does Amretri Offer?</h2>
                <p className="mx-auto mt-4 max-w-3xl text-sm text-ink-soft"><strong className="text-brand">We cover every aspect of pharmacy compliance and operational auditing</strong> — from drug license compliance and NABH readiness to stock audits and cold chain verification.</p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {auditTypes.map((item, i) => {
              const icons = [ShieldCheck, FileCheck, ClipboardCheck, FileText, BookOpen, Bell];
              const Icon = icons[i];
              return (
                <Reveal key={i} delay={(i % 3) * 80} variant={i % 3 === 0 ? "left" : i % 3 === 1 ? "scale" : "right"}
                  className="rounded-2xl border border-border bg-card p-6 hover:shadow-md transition">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand"><Icon className="h-6 w-6" /></div>
                  <h3 className="mt-4 text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{item.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPLIANCE FRAMEWORK */}
      <section className="bg-ink py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange">Framework</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">How Does Amretri's Compliance Framework Ensure Audit Readiness?</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {[
              { title: "Documentation Setup", desc: "Create and maintain all required pharmacy registers, logs, and SOPs." },
              { title: "Staff Training", desc: "Train pharmacy staff on compliance protocols, documentation, and audit procedures." },
              { title: "Monitoring & Audits", desc: "Regular internal audits to identify gaps and take corrective actions." },
              { title: "Continuous Readiness", desc: "Ongoing support to ensure the pharmacy is always audit-ready." }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80} variant={i === 0 ? "left" : i === 3 ? "right" : "scale"}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center hover:bg-white/10 transition">
                <span className="inline-block rounded-lg bg-brand px-2.5 py-1 text-xs font-bold tracking-wider uppercase">Step 0{i + 1}</span>
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-white/70">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* KEY DOCUMENTS */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-8">
          <Reveal className="text-center mb-14">
            <h2 className="text-3xl font-extrabold md:text-5xl">What Essential Pharmacy Documents Does Amretri Maintain?</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Drug License Display & Renewal Records", "Narcotic Drug Register", "Cold Chain Temperature Logs",
              "LASA & High-Alert Drug List", "Standard Operating Procedures (SOPs)", "Purchase & Sales Registers",
              "Expiry & Damage Return Records", "Internal Audit Checklists", "Staff Training Records"
            ].map((item, i) => (
              <Reveal key={i} delay={(i % 3) * 60} variant={i % 3 === 0 ? "left" : i % 3 === 1 ? "scale" : "right"}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm font-medium text-ink">
                <Check className="h-5 w-5 shrink-0 text-brand" />{item}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="compliance-form" className="relative overflow-hidden bg-ink py-24 text-white">
        <div className="hex-grid absolute inset-0 opacity-20" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-soft">Audit Desk</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Schedule a Compliance Audit</h2>
            <p className="mx-auto mt-4 max-w-2xl text-xs text-white/70">Share your details and our compliance team will conduct a preliminary audit readiness assessment.</p>
          </Reveal>
          <Reveal variant="up" className="mt-12 rounded-3xl bg-brand p-8 shadow-2xl md:p-12">
            <form onSubmit={submit} className="grid gap-6 md:grid-cols-2" noValidate>
              <div>
                <label className="text-xs font-semibold text-white/80">Your Name</label>
                <input value={form.name} onChange={update("name")} maxLength={100} className={inputCls} placeholder="Dr. Rajesh Kumar" />
                {errors.name && <p className="mt-1 text-xs text-amber-200">{errors.name}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-white/80">Hospital Name</label>
                <input value={form.hospitalName} onChange={update("hospitalName")} maxLength={200} className={inputCls} placeholder="City Hospital" />
                {errors.hospitalName && <p className="mt-1 text-xs text-amber-200">{errors.hospitalName}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-white/80">City</label>
                <input value={form.city} onChange={update("city")} maxLength={100} className={inputCls} placeholder="Lucknow" />
                {errors.city && <p className="mt-1 text-xs text-amber-200">{errors.city}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-white/80">Phone Number</label>
                <input value={form.phone} onChange={update("phone")} maxLength={20} className={inputCls} placeholder="+91" />
                {errors.phone && <p className="mt-1 text-xs text-amber-200">{errors.phone}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-white/80">Email ID</label>
                <input type="email" value={form.email} onChange={update("email")} maxLength={255} className={inputCls} placeholder="contact@hospital.com" />
                {errors.email && <p className="mt-1 text-xs text-amber-200">{errors.email}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-white/80">Compliance Need</label>
                <select value={form.complianceNeed} onChange={update("complianceNeed")} className={selectCls}>
                  <option value="" disabled className="text-ink">Select need</option>
                  <option value="NABH Readiness" className="text-ink">NABH Readiness</option>
                  <option value="Drug License" className="text-ink">Drug License Compliance</option>
                  <option value="Full Audit" className="text-ink">Full Pharmacy Audit</option>
                  <option value="SOP Setup" className="text-ink">SOP Documentation</option>
                  <option value="Training" className="text-ink">Staff Compliance Training</option>
                </select>
                {errors.complianceNeed && <p className="mt-1 text-xs text-amber-200">{errors.complianceNeed}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-white/80">Additional Details (Optional)</label>
                <textarea value={form.message} onChange={update("message")} maxLength={1000} rows={2} className={`${inputCls} resize-none`} />
              </div>
              <div className="mt-4 md:col-span-2 flex justify-end border-t border-white/10 pt-6">
                <button type="submit" className="group flex items-center gap-3 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-brand shadow-lg hover:bg-white/90 transition">
                  Submit Audit Request <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
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
              { label: "Pharmacy Acquisition & Management", slug: "hospital-pharmacy-acquisition-management" },
              { label: "Inventory & Stock Control", slug: "inventory-stock-control" },
              { label: "Consulting & Profit Improvement", slug: "consulting-profit-improvement" },
              { label: "Bulk Medicine Procurement", slug: "bulk-medicine-procurement" },
            ].map((link, idx) => (
              <Link key={idx} to={`/services/${link.slug}` as any} className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md hover:border-brand/35 hover:scale-[1.02]">
                <span className="text-ink leading-snug">{link.label}</span>
                <span className="mt-4 inline-flex items-center justify-center gap-1 text-[11px] text-brand font-bold uppercase tracking-wider">Learn More <ArrowUpRight className="h-3 w-3" /></span>
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
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Frequently Asked Questions</h2>
          </Reveal>
          <Reveal variant="up" className="mt-12 divide-y divide-border rounded-3xl border border-border bg-card overflow-hidden">
            {faqs.map((f, i) => {
              const isOpen = faqOpen === i;
              return (
                <button key={i} onClick={() => setFaqOpen(isOpen ? null : i)} className="group block w-full px-6 py-5 text-left transition hover:bg-secondary/30">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-ink transition-colors group-hover:text-orange md:text-base">{f.q}</span>
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${isOpen ? "bg-brand text-white rotate-180" : "bg-secondary text-brand group-hover:bg-orange/10 group-hover:text-orange"}`}>
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </div>
                  <div className={`grid overflow-hidden transition-all duration-500 ease-out ${isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <p className="overflow-hidden text-xs leading-relaxed text-ink-soft md:text-sm">{f.a}</p>
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
            "Compliance is not a one-time checklist — it is a continuous culture. Let Amretri make your pharmacy audit-ready, every single day."
          </p>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}

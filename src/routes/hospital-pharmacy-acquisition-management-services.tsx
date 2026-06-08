import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { 
  ArrowUpRight, Check, ShieldCheck, FileCheck, Users, 
  HelpCircle, RefreshCw, BarChart3, TrendingUp, AlertTriangle, 
  Settings, Layers, Plus, Minus, Stethoscope, ChevronRight,
  Sparkles, Mail, Phone, MapPin, Building
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { Reveal } from "@/components/site/Reveal";
import heroImg from "@/assets/pharmacy-services-hero.png";

export const Route = createFileRoute("/hospital-pharmacy-acquisition-management-services")({
  head: () => ({
    meta: [
      { title: "Hospital Pharmacy Acquisition & Management Services | Amretri Healthcare" },
      { name: "description", content: "Amretri Healthcare helps hospitals outsource, acquire, manage and operate their pharmacy professionally with better procurement, inventory control, trained pharmacists, compliance, expiry management and improved pharmacy profitability." },
      { name: "keywords", content: "hospital pharmacy management services, hospital pharmacy outsourcing, hospital pharmacy acquisition, hospital pharmacy operator, outsourced hospital pharmacy, hospital pharmacy management company, hospital pharmacy takeover services, hospital pharmacy operations management, pharmacy outsourcing for hospitals, hospital pharmacy profit improvement, pharmacy acquisition for hospitals, pharmacy management services in India, hospital pharmacy vendor, hospital pharmacy contract management, hospital pharmacy inventory management, hospital medicine procurement services, hospital pharmacy management services in India, hospital pharmacy outsourcing in India, hospital pharmacy management company in India, hospital pharmacy acquisition services in India, hospital pharmacy operator in Uttar Pradesh, hospital pharmacy services in Lucknow, hospital pharmacy outsourcing in Lucknow, hospital pharmacy management for Indian hospitals" },
      { property: "og:title", content: "Hospital Pharmacy Acquisition & Management Services | Amretri Healthcare" },
      { property: "og:description", content: "Professional Pharmacy Takeover, Operations and Management for Hospitals. Boost margins by 5-30% with better procurement, inventory control, and trained pharmacists." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: PharmacyServicesPage,
});

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  designation: z.string().trim().min(1, "Designation is required").max(100),
  hospitalName: z.string().trim().min(1, "Hospital name is required").max(200),
  city: z.string().trim().min(1, "City is required").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  email: z.string().trim().email("Invalid email").max(255),
  beds: z.string().trim().min(1, "Number of beds is required"),
  sales: z.string().trim().min(1, "Monthly sales is required"),
  model: z.string().min(1, "Current model is required"),
  concern: z.string().min(1, "Main concern is required"),
  service: z.string().min(1, "Preferred service is required"),
  message: z.string().trim().max(1000).optional(),
});

const faqs = [
  {
    q: "What is hospital pharmacy acquisition?",
    a: "Hospital pharmacy acquisition means Amretri Healthcare takes over or manages the hospital pharmacy under a mutually agreed commercial model. This may include stock takeover, operations management, procurement, staffing, compliance and reporting."
  },
  {
    q: "Why should a hospital outsource its pharmacy?",
    a: "A hospital may outsource its pharmacy to reduce daily operational burden, improve medicine availability, control expiry, get better procurement rates, manage pharmacists better and improve pharmacy profitability."
  },
  {
    q: "Does Amretri only acquire pharmacies or also manage them?",
    a: "Amretri can support hospitals through different models including full pharmacy acquisition, pharmacy management, revenue sharing, procurement support, pharmacist supply and pharmacy audit."
  },
  {
    q: "Can Amretri help a hospital that does not want full pharmacy outsourcing?",
    a: "Yes. If a hospital does not want full outsourcing, Amretri can still help with procurement support, pharmacist staffing, inventory control, compliance audit and pharmacy profitability improvement."
  },
  {
    q: "Can Amretri provide pharmacists?",
    a: "Yes. Amretri provides pharmacist supply and staffing support for hospitals, clinics, pharmacies and healthcare institutions."
  },
  {
    q: "How does Amretri help improve pharmacy profitability?",
    a: "Amretri helps by improving procurement rates, reducing expiry loss, controlling inventory, monitoring fast-moving and slow-moving stock, improving billing discipline and bringing better operational accountability."
  },
  {
    q: "Does Amretri support small and mid-sized hospitals?",
    a: "Yes. Amretri can support small, mid-sized and large hospitals depending on their pharmacy volume, location and service requirement."
  },
  {
    q: "Can Amretri help with pharmacy compliance?",
    a: "Yes. Amretri supports pharmacy compliance through documentation, SOPs, cold chain monitoring, expiry control, high-alert drug control, narcotic medicine records and audit readiness."
  },
  {
    q: "What information is required for a pharmacy takeover discussion?",
    a: "The hospital should share basic information such as number of beds, monthly pharmacy sales, inventory value, staffing pattern, current purchase process, expiry status and current pharmacy issues."
  },
  {
    q: "How can a hospital contact Amretri?",
    a: "Hospitals can contact Amretri Healthcare through the enquiry form, phone call or email to request a pharmacy acquisition, management or profitability review discussion."
  }
];

const problemsAndSolutions = [
  {
    prob: "Stock is available, but not the right stock. Fast-moving medicines go out of stock while slow-moving medicines pile up.",
    sol: "AI-based inventory control that flags slow-moving stock and auto-replenishes critical, high-demand medications instantly."
  },
  {
    prob: "Expiry loss increases silently behind the counter without active tracking or near-expiry returns.",
    sol: "Real-time near-expiry warning triggers and return tracking processes to minimize write-offs and optimize shelf space."
  },
  {
    prob: "Purchase rates are high due to lower buying volume, local vendors, and lack of group bargaining power.",
    sol: "Leverage Amretri's bulk-procurement network to secure maximum distributor margins and direct manufacturer rates."
  },
  {
    prob: "Stable registered pharmacists are extremely difficult to hire, train, schedule, and retain long term.",
    sol: "Full deployment of certified pharmacists and supervisors with active shift management and continuous training handled by us."
  },
  {
    prob: "Billing leakages, missing inventory records, and lack of daily performance reporting for hospital owners.",
    sol: "Integrated POS software with live cloud MIS reporting to give the management 100% daily financial and stock transparency."
  },
  {
    prob: "Drug license issues, improper storage, missing registers, or compliance gaps that risk audit failures.",
    sol: "Strict compliance protocols (LASA storage, high-alert drug controls, cold chain logs) ensuring constant audit-readiness."
  }
];

const services = [
  { title: "Hospital Pharmacy Takeover", desc: "Complete structural takeover of existing stock, retail space, and billing systems under a smooth, no-interruption transition plan." },
  { title: "Pharmacy Operations Management", desc: "Day-to-day operations handling, audit-readiness checklists, billing verification, and patient experience oversight." },
  { title: "Pharmacist Staffing & Supervision", desc: "Deployment of qualified, licensed pharmacists with shift management, replacement support, and continuous professional training." },
  { title: "Procurement & Purchase Control", desc: "Strategic bulk purchasing, negotiation with direct manufacturers, and reduction of expensive local emergency purchases." },
  { title: "Inventory & Stock Optimization", desc: "Setting minimum stock and reorder thresholds to ensure critical medicines are always available without tying up excess capital." },
  { title: "Expiry & Near-Expiry Monitoring", desc: "Rigorous stock rotation protocols and proactive coordination with distributors for return values on near-expiry medicines." },
  { title: "Billing & Leakage Control", desc: "Implementation of secure billing checkpoints and digital audit trails to eliminate internal inventory losses." },
  { title: "NABH Compliance Support", desc: "Ensuring cold chain logs, temperature monitoring, high-alert drug categorization, and LASA labeling align with NABH guidelines." }
];

const steps = [
  { title: "1. Pharmacy Assessment", desc: "We study existing sales, purchase value/rates, gross margins, stock value, expiry risk, staffing patterns, and compliance gaps." },
  { title: "2. Commercial Discussion", desc: "We align on the best commercial model: full acquisition, revenue-sharing, fixed monthly payouts, or procurement support." },
  { title: "3. Takeover & Transition", desc: "We carry out joint physical stock verification, inventory valuation, system setup, and vendor transitions without halting operations." },
  { title: "4. Procurement Control", desc: "We hook the pharmacy into Amretri's bulk purchase network, immediately reducing purchase costs and improving margins." },
  { title: "5. Inventory Management", desc: "We implement reorder levels, min-max thresholds, and expiry tracking to clear dead stock and maintain healthy inventory." },
  { title: "6. Staffing & Supervision", desc: "We deploy trained pharmacists and shift supervisors, taking over the complete recruitment and management liability." },
  { title: "7. Compliance & Audits", desc: "We apply cold chain logs, high-alert drug registers, and SOPs to guarantee the pharmacy is always audit-ready." }
];

function PharmacyServicesPage() {
  const [form, setForm] = useState({
    name: "",
    designation: "",
    hospitalName: "",
    city: "",
    phone: "",
    email: "",
    beds: "",
    sales: "",
    model: "",
    concern: "",
    service: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = formSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { fieldErrors[i.path[0] as string] = i.message; });
      setErrors(fieldErrors);
      toast.error("Please fill in all required fields correctly.");
      return;
    }
    setErrors({});
    toast.success("Takeover proposal request received!", {
      description: "Our healthcare operations team will contact you within 24 hours."
    });
    setForm({
      name: "",
      designation: "",
      hospitalName: "",
      city: "",
      phone: "",
      email: "",
      beds: "",
      sales: "",
      model: "",
      concern: "",
      service: "",
      message: ""
    });
  };

  const scrollToContact = () => {
    const contact = document.getElementById("proposal-form");
    contact?.scrollIntoView({ behavior: "smooth" });
  };

  // Structured schemas
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hospital Pharmacy Acquisition & Management Services",
    "provider": {
      "@type": "Organization",
      "name": "Amretri Healthcare",
      "url": "https://amretrihealthcare.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "serviceType": [
      "Hospital Pharmacy Management",
      "Pharmacy Outsourcing",
      "Pharmacy Acquisition"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Hospital Owners, Hospital CEOs, Trustees, Administrators, Healthcare Institutions"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  const inputCls =
    "w-full border-0 border-b border-white/30 bg-transparent pb-2 pt-4 text-white placeholder:text-white/50 outline-none transition focus:border-white focus:ring-0";
  const selectCls = 
    "w-full border-0 border-b border-white/30 bg-transparent pb-2 pt-4 text-white outline-none transition focus:border-white focus:ring-0 [color-scheme:dark]";

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-brand pt-32 pb-24 text-white md:pt-40 md:pb-32">
        <div className="hex-grid absolute inset-0 opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-[1500px] px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            
            {/* Left Hero */}
            <div className="lg:col-span-6 xl:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-amber-300 uppercase">
                  <Sparkles className="h-3.5 w-3.5" />
                  Premium Hospital Operations
                </div>
                <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl xl:text-6xl">
                  Hospital Pharmacy Acquisition &amp; Management Services
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-white/90">
                  Amretri Healthcare helps hospitals outsource, manage and improve their pharmacy operations with better procurement, trained pharmacists, inventory control, compliance support and transparent commercial models.
                </p>
                
                {/* Horizontal Banner Badges */}
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 text-xs font-semibold text-white/90 md:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                    Better Procurement
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                    Better Stock Control
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                    Better Pharmacist Support
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                    Better Profitability
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <button
                    onClick={scrollToContact}
                    className="group flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-deep shadow-lg hover:bg-white/90 transition"
                  >
                    Request Takeover Proposal
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                  <button
                    onClick={scrollToContact}
                    className="flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold hover:bg-white/20 transition"
                  >
                    Book a Pharmacy Review
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Right Hero - Image Frame */}
            <div className="lg:col-span-6 xl:col-span-5">
              <Reveal variant="right" className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-brand-soft via-brand-deep to-brand opacity-30 blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl border border-white/20 shadow-2xl bg-brand-deep">
                  <img 
                    src={heroImg} 
                    alt="Hospital pharmacy acquisition and management services by Amretri Healthcare for hospital pharmacy outsourcing, pharmacy operations, inventory control, procurement and compliance in India." 
                    width={1024}
                    height={1024}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105" 
                  />
                  {/* Overlay Banner Text */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-6 text-white">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Operational Excellence</p>
                    <h3 className="mt-1 text-lg font-bold">Professional Pharmacy Management for Hospitals</h3>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* CORE PROBLEM SECTION */}
      <section className="bg-secondary/30 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">The Operational Challenge</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Why Hospitals Choose Pharmacy Management</h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm text-ink-soft md:text-base">
              Running a hospital pharmacy looks simple from the outside, but it often becomes one of the most difficult departments to control. Amretri Healthcare takes over this operational burden entirely.
            </p>
          </Reveal>

          {/* Problems Bento Grid */}
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {problemsAndSolutions.map((item, idx) => (
              <Reveal key={idx} variant="up" className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-50 text-rose-500">
                      <AlertTriangle className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-bold text-ink">Operational Paintpoint</span>
                  </div>
                  <p className="mt-4 text-[13px] leading-relaxed text-rose-950/80 bg-rose-50/50 p-3 rounded-2xl border border-rose-100">
                    {item.prob}
                  </p>
                </div>
                <div className="mt-6 border-t border-border pt-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider">
                    <ShieldCheck className="h-4 w-4" />
                    Amretri Solution
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                    {item.sol}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO SECTION */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            
            {/* Left Description */}
            <div className="lg:col-span-5">
              <Reveal variant="left">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">Comprehensive Support</p>
                <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">What Amretri Healthcare Does</h2>
                <p className="mt-6 text-sm leading-relaxed text-ink-soft md:text-base">
                  Amretri Healthcare provides end-to-end hospital pharmacy acquisition and management services. Depending on your needs, we take over, operate, manage or support your setup under a mutually accountable model.
                </p>
                <div className="mt-8 border-l-2 border-brand pl-6">
                  <p className="text-sm italic text-ink font-medium">
                    "Our objective is simple: the hospital gets better pharmacy performance and patient convenience without getting involved in daily pharmacy firefighting."
                  </p>
                </div>
                <button
                  onClick={scrollToContact}
                  className="group mt-10 inline-flex items-center gap-3 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-brand-deep transition"
                >
                  Request Commercial Proposal
                  <ChevronRight className="h-4 w-4" />
                </button>
              </Reveal>
            </div>

            {/* Right Services Grid */}
            <div className="lg:col-span-7">
              <Reveal variant="right" className="grid gap-6 sm:grid-cols-2">
                {services.map((s, idx) => (
                  <div key={idx} className="rounded-2xl border border-border bg-secondary/20 p-5 hover:bg-secondary/40 transition">
                    <h3 className="text-sm font-bold text-ink">{s.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink-soft">{s.desc}</p>
                  </div>
                ))}
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* SYSTEM MODEL SECTION (WORKFLOW) */}
      <section className="bg-ink py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-soft">Operations Protocol</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Our Hospital Pharmacy Management Model</h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm text-white/70 md:text-base">
              A structured transition, procurement, and management system designed for hospitals, nursing homes, and healthcare institutions across India.
            </p>
          </Reveal>

          {/* Timeline steps */}
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {steps.map((st, idx) => (
              <Reveal key={idx} variant="up" className="relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
                <div>
                  <span className="inline-block rounded-lg bg-brand px-2.5 py-1 text-xs font-bold tracking-wider text-white uppercase">
                    Phase 0{idx + 1}
                  </span>
                  <h3 className="mt-4 text-base font-bold text-white">{st.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-white/70">{st.desc}</p>
                </div>
                <div className="mt-6 flex items-center justify-end text-white/30">
                  <Settings className="h-5 w-5 animate-spin-slow" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TARGET AUDIENCE & BENEFITS (SPLIT INTERACTIVE DETAILS) */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            
            {/* Left: Who Can Benefit */}
            <Reveal variant="left" className="rounded-3xl border border-border bg-secondary/10 p-8 md:p-12">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white">
                  <Building className="h-5 w-5" />
                </span>
                <h3 className="text-xl font-extrabold text-ink md:text-2xl">Who Can Benefit from This Service</h3>
              </div>
              <p className="mt-4 text-xs text-ink-soft">
                Amretri’s hospital pharmacy acquisition and management model is optimized for healthcare institutions facing operational issues or looking for stable revenue models:
              </p>
              
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 text-xs font-semibold text-ink">
                {[
                  "Multispeciality Hospitals",
                  "Nursing Homes",
                  "Charitable & Trust Hospitals",
                  "Single-speciality Centers",
                  "Upcoming Hospitals",
                  "Mother & Child Hospitals",
                  "ICU & Critical Care Centers",
                  "Hospitals Facing Expiry Loss"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 bg-card p-3 rounded-xl border border-border shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Right: Benefits for Hospitals */}
            <Reveal variant="right" className="rounded-3xl border border-border bg-secondary/10 p-8 md:p-12">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white">
                  <TrendingUp className="h-5 w-5" />
                </span>
                <h3 className="text-xl font-extrabold text-ink md:text-2xl">Benefits for Partner Hospitals</h3>
              </div>
              <p className="mt-4 text-xs text-ink-soft">
                By outsourcing your pharmacy management to Amretri Healthcare, you convert a daily operational headache into a professionally managed, high-performance department:
              </p>

              <ul className="mt-8 space-y-3.5 text-xs text-ink">
                {[
                  { title: "Reduced Daily Firefighting", desc: "No more managing purchases, vendor coordination, returns, and pharmacist scheduling." },
                  { title: "Maximum Medicine Availability", desc: "AI procurement planning guarantees that fast-moving and critical care stock is always available." },
                  { title: "Compliance Safeguards", desc: "Drug licensing, cold chain temperature monitoring, and LASA labeling are managed under strict SOPs." },
                  { title: "Financial Predictability", desc: "Transparent MIS reporting with flexible commercial models (payouts or revenue sharing)." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 bg-card p-4 rounded-xl border border-border shadow-sm">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">
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

          </div>
        </div>
      </section>

      {/* LEAD CAPTURE FORM SECTION */}
      <section id="proposal-form" className="relative overflow-hidden bg-ink py-24 text-white">
        <div className="hex-grid absolute inset-0 opacity-20" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-8">
          
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-soft">Proposal Desk</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Request Takeover &amp; Management Proposal</h2>
            <p className="mx-auto mt-4 max-w-2xl text-xs text-white/70">
              Share details about your hospital setup and current model to receive a custom assessment and partnership proposal from Amretri Healthcare.
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
                <label className="text-xs font-semibold text-white/80">Designation</label>
                <input value={form.designation} onChange={update("designation")} maxLength={100} className={inputCls} placeholder="e.g. Managing Director / CEO" />
                {errors.designation && <p className="mt-1 text-xs text-amber-200">{errors.designation}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-white/80">Hospital / Clinic Name</label>
                <input value={form.hospitalName} onChange={update("hospitalName")} maxLength={200} className={inputCls} placeholder="e.g. Care Multispeciality Hospital" />
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
                <label className="text-xs font-semibold text-white/80">Number of Beds</label>
                <input value={form.beds} onChange={update("beds")} className={inputCls} placeholder="e.g. 50 Beds / 100 Beds" />
                {errors.beds && <p className="mt-1 text-xs text-amber-200">{errors.beds}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-white/80">Current Monthly Pharmacy Sales</label>
                <input value={form.sales} onChange={update("sales")} className={inputCls} placeholder="e.g. ₹5 Lakhs / ₹15 Lakhs" />
                {errors.sales && <p className="mt-1 text-xs text-amber-200">{errors.sales}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-white/80">Current Pharmacy Model</label>
                <select value={form.model} onChange={update("model")} className={selectCls}>
                  <option value="" disabled className="text-ink">Select current model</option>
                  <option value="In-house" className="text-ink">In-house Operated</option>
                  <option value="Outsourced" className="text-ink">Outsourced to Local Vendor</option>
                  <option value="Partially Managed" className="text-ink">Partially Managed / Hybrid</option>
                  <option value="Upcoming" className="text-ink">Upcoming New Pharmacy</option>
                </select>
                {errors.model && <p className="mt-1 text-xs text-amber-200">{errors.model}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-white/80">Preferred Service Model</label>
                <select value={form.service} onChange={update("service")} className={selectCls}>
                  <option value="" disabled className="text-ink">Select service model</option>
                  <option value="Acquisition" className="text-ink">Full Pharmacy Acquisition</option>
                  <option value="Management" className="text-ink">Operations Management &amp; Staffing</option>
                  <option value="Procurement Support" className="text-ink">Medicine Procurement Support</option>
                  <option value="Pharmacist Supply" className="text-ink">Pharmacist Supply &amp; Staffing</option>
                  <option value="Audit & Advisory" className="text-ink">Pharmacy Audit &amp; Consulting</option>
                </select>
                {errors.service && <p className="mt-1 text-xs text-amber-200">{errors.service}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-white/80">Main Operational Concern</label>
                <select value={form.concern} onChange={update("concern")} className={selectCls}>
                  <option value="" disabled className="text-ink">Select primary concern</option>
                  <option value="Manpower" className="text-ink">Manpower &amp; Pharmacist Stability</option>
                  <option value="Purchase Rates" className="text-ink">High Purchase Rates / Low Margins</option>
                  <option value="Expiry" className="text-ink">Expiry Loss &amp; Dead Stock Accumulation</option>
                  <option value="Profitability" className="text-ink">Overall Profitability &amp; Billing Leakage</option>
                  <option value="Compliance" className="text-ink">NABH / License Compliance Issues</option>
                  <option value="Full Takeover" className="text-ink">Want to Outsourced Fully (Full Takeover)</option>
                </select>
                {errors.concern && <p className="mt-1 text-xs text-amber-200">{errors.concern}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-white/80">Message / Additional Details (Optional)</label>
                <textarea value={form.message} onChange={update("message")} maxLength={1000} rows={3} className={`${inputCls} resize-none`} placeholder="Tell us more about your requirements..." />
              </div>

              <div className="mt-4 md:col-span-2 flex flex-col sm:flex-row gap-4 justify-between items-center border-t border-white/10 pt-6">
                <p className="text-[11px] text-white/70 text-center sm:text-left max-w-md">
                  By submitting, you agree to share these details with Amretri Healthcare for an initial operational review and takeover assessment.
                </p>
                <button
                  type="submit"
                  className="group flex items-center gap-3 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-brand shadow-lg hover:bg-white/90 transition"
                >
                  Submit Proposal Request
                  <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
                </button>
              </div>

            </form>
          </Reveal>

        </div>
      </section>

      {/* RELATED SOLUTIONS & INTERNAL LINKS */}
      <section className="bg-secondary/20 py-16 border-t border-border">
        <div className="mx-auto max-w-7xl px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">Explore More</p>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">Related Hospital Services</h2>
          </Reveal>
          
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 text-center text-xs font-semibold">
            {[
              { label: "Pharmacist Supply & Staffing Services", href: "#proposal-form" },
              { label: "Bulk Medicine Procurement Support", href: "#proposal-form" },
              { label: "Hospital Pharmacy Inventory & Stock Control", href: "#proposal-form" },
              { label: "Hospital Pharmacy Compliance & Audit Services", href: "#proposal-form" },
              { label: "Hospital Pharmacy Consulting & Profit Improvement Services", href: "#proposal-form" }
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md hover:border-brand/35 hover:scale-[1.02]"
              >
                <span className="text-ink leading-snug">{link.label}</span>
                <span className="mt-4 inline-flex items-center justify-center gap-1 text-[11px] text-brand font-bold uppercase tracking-wider">
                  Learn More
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">FAQs</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Frequently Asked Questions</h2>
          </Reveal>

          <Reveal variant="up" className="mt-12 divide-y divide-border rounded-3xl border border-border bg-card overflow-hidden">
            {faqs.map((f, i) => {
              const isOpen = faqOpen === i;
              return (
                <button
                  key={i}
                  onClick={() => setFaqOpen(isOpen ? null : i)}
                  className="group block w-full px-6 py-5 text-left transition hover:bg-secondary/30"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-ink transition-colors group-hover:text-brand md:text-base">{f.q}</span>
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${isOpen ? "bg-brand text-white rotate-180" : "bg-secondary text-brand group-hover:bg-brand group-hover:text-white"}`}>
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </div>
                  <div
                    className={`grid overflow-hidden transition-all duration-500 ease-out ${isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <p className="overflow-hidden text-xs leading-relaxed text-ink-soft md:text-sm">{f.a}</p>
                  </div>
                </button>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* BOTTOM BANNER STATEMENT */}
      <section className="bg-brand py-12 text-center text-white border-t border-white/10">
        <div className="mx-auto max-w-4xl px-8">
          <p className="text-sm md:text-base font-semibold leading-relaxed">
            "Your hospital pharmacy should not remain a daily headache. With Amretri Healthcare, it can become a professionally managed, accountable and profitable hospital service department."
          </p>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}

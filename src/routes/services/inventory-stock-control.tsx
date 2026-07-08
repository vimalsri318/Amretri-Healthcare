import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowUpRight, Check, BarChart3, AlertTriangle, ShieldCheck,
  HelpCircle, ChevronRight, Sparkles, FileCheck, RefreshCw,
  TrendingUp, Plus, Minus, Settings, Layers, Package
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { Reveal } from "@/components/site/Reveal";
import heroImg from "@/assets/serve-lab.jpg";

export const Route = createFileRoute("/services/inventory-stock-control")({
  head: () => ({
    meta: [
      { title: "Hospital Pharmacy Inventory & Stock Control Services | Amretri Healthcare" },
      { name: "description", content: "Stop losing money to expired medicines, dead stock, and stock-outs. Amretri provides FEFO tracking, ABC/VED analysis, expiry monitoring, and inventory optimization for hospitals across India." },
      { name: "keywords", content: "hospital pharmacy inventory management, pharmacy stock control, FEFO tracking system, ABC VED analysis pharmacy, medicine expiry management, dead stock reduction, pharmacy inventory optimization, hospital stock audit, pharmacy inventory software, inventory control for hospitals" },
      { property: "og:title", content: "Hospital Pharmacy Inventory & Stock Control Services | Amretri Healthcare" },
      { property: "og:description", content: "Optimize your hospital pharmacy inventory with AI-driven stock control, expiry tracking, and dead stock reduction. Save 20% on inventory costs." },
      { property: "og:image", content: heroImg },
    ],
    links: [
      { rel: "canonical", href: "https://amretrihealthcare.com/services/inventory-stock-control" },
    ],
  }),
  component: InventoryPage,
});

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  hospitalName: z.string().trim().min(1, "Hospital name is required").max(200),
  city: z.string().trim().min(1, "City is required").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  email: z.string().trim().email("Invalid email").max(255),
  beds: z.string().min(1, "Number of beds is required"),
  mainIssue: z.string().min(1, "Main inventory issue is required"),
  message: z.string().trim().max(1000).optional(),
});

const faqs = [
  {
    q: "What is hospital pharmacy inventory management?",
    a: "Hospital pharmacy inventory management involves tracking medicine stock levels, monitoring expiry dates, managing purchase orders, and ensuring critical medicines are always available without overstocking or accumulating dead stock."
  },
  {
    q: "How does FEFO help reduce expiry loss?",
    a: "FEFO (First Expiry, First Out) ensures that medicines closest to their expiry date are dispensed first, significantly reducing the amount of expired stock that has to be written off."
  },
  {
    q: "What is ABC analysis in pharmacy?",
    a: "ABC analysis categorizes pharmacy stock into three groups: A (high-value, low-quantity items that need tight control), B (moderate value and quantity), and C (low-value, high-quantity items). This helps prioritize inventory management efforts."
  },
  {
    q: "Can Amretri help reduce dead stock in my pharmacy?",
    a: "Yes. Amretri can audit your current inventory, identify slow-moving and non-moving items, analyze purchase history, and implement corrective procurement planning to prevent dead stock accumulation."
  },
  {
    q: "What is VED analysis in pharmacy?",
    a: "VED analysis classifies medicines as Vital (life-saving), Essential (necessary for patient care), and Desirable (comfort or convenience items). This ensures that vital medicines are never out of stock."
  },
  {
    q: "How can Amretri help prevent stock-outs of critical medicines?",
    a: "Amretri implements reorder level systems, min-max thresholds, and automated alerts for fast-moving and critical care medicines, ensuring they are replenished before stock runs out."
  }
];

const problemsAndSolutions = [
  {
    prob: "Expired medicines accumulate silently, leading to significant financial losses every month.",
    sol: "Real-time near-expiry tracking with automated alerts and proactive vendor return coordination."
  },
  {
    prob: "Fast-moving medicines frequently go out of stock, causing patient dissatisfaction and emergency purchases at higher rates.",
    sol: "AI-driven demand forecasting and automated reorder points ensure critical stock is always available."
  },
  {
    prob: "Dead stock and slow-moving inventory tie up working capital that could be used elsewhere.",
    sol: "Regular ABC and VED analysis to identify non-moving items and corrective action planning."
  },
  {
    prob: "Manual stock-taking is time-consuming, error-prone, and rarely provides real-time visibility.",
    sol: "Digitized inventory systems with barcode scanning and live MIS reporting for instant visibility."
  },
  {
    prob: "Lack of temperature monitoring for cold chain medicines leads to potency loss and compliance violations.",
    sol: "Automated temperature logging with alerts for cold chain deviations, ensuring medicine efficacy."
  },
  {
    prob: "No systematic stock rotation leads to uneven expiry distribution across batches.",
    sol: "Strict FEFO (First Expiry, First Out) protocols implemented across all storage areas."
  }
];

function InventoryPage() {
  const [form, setForm] = useState({
    name: "", hospitalName: "", city: "", phone: "", email: "", beds: "", mainIssue: "", message: ""
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
      toast.error("Please fill all required fields correctly.");
      return;
    }
    setErrors({});
    toast.success("Stock audit request received!", {
      description: "Our inventory team will contact you within 24 hours."
    });
    setForm({ name: "", hospitalName: "", city: "", phone: "", email: "", beds: "", mainIssue: "", message: "" });
  };

  const scrollToForm = () => {
    document.getElementById("stock-audit-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const inputCls = "w-full border-0 border-b border-white/30 bg-transparent pb-2 pt-4 text-white placeholder:text-white/50 outline-none transition focus:border-white focus:ring-0";
  const selectCls = "w-full border-0 border-b border-white/30 bg-transparent pb-2 pt-4 text-white outline-none transition focus:border-white focus:ring-0 [color-scheme:dark]";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "Service",
          "name": "Hospital Pharmacy Inventory & Stock Control Services",
          "provider": { "@type": "Organization", "name": "Amretri Healthcare" },
          "areaServed": { "@type": "Country", "name": "India" },
          "serviceType": ["Pharmacy Inventory Management", "Stock Control", "Expiry Management"]
        })
      }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
        })
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
                  <BarChart3 className="h-3.5 w-3.5" /> Inventory Optimization
                </span>
                <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl xl:text-6xl text-ink">
                  Hospital Pharmacy Inventory &amp; Stock Control
                </h1>
                <p className="mt-2 text-xs text-ink-soft/60 font-medium">Last updated: July 2026</p>
                <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                  Stop losing money to expired medicines, dead stock accumulation, and frequent stock-outs. Amretri Healthcare provides AI-driven inventory management, FEFO tracking, and real-time stock visibility for hospitals across India.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-8 text-xs font-semibold text-ink-soft md:grid-cols-4">
                  {["FEFO Tracking", "Expiry Alerts", "ABC & VED Analysis", "Stock-out Prevention"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Check className="h-4 w-4 shrink-0 text-brand" />{item}
                    </div>
                  ))}
                </div>
                <div className="mt-10 flex flex-wrap gap-4">
                  <button onClick={scrollToForm} className="group flex items-center gap-3 rounded-full bg-orange px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange/20 hover:bg-orange/95 hover:scale-105 transition">
                    Request Stock Audit <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                  <Link to="/contact" className="flex items-center gap-2 rounded-full border border-brand bg-transparent text-brand px-6 py-3.5 text-sm font-semibold hover:bg-orange/10 hover:border-orange hover:text-orange transition">
                    Talk to Our Team
                  </Link>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-6 xl:col-span-5">
              <Reveal variant="right" className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-brand-soft via-brand-deep to-brand opacity-30 blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl border border-border shadow-2xl">
                  <img src={heroImg} alt="Hospital pharmacy inventory and stock control services" width={1024} height={1024} className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-6 text-white">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Inventory Excellence</p>
                    <h3 className="mt-1 text-lg font-bold">Smart Stock Control for Hospitals</h3>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMS & SOLUTIONS */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange">Inventory Challenges</p>                <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">What Pharmacy Inventory Problems Does Amretri Solve?</h2>
                <p className="mx-auto mt-4 max-w-3xl text-sm text-ink-soft md:text-base">
                  <strong className="text-brand">Poor inventory management costs hospitals lakhs every month through expired medicines, dead stock, and stock-outs.</strong> Here is how Amretri transforms pharmacy stock control with AI-driven systems.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {problemsAndSolutions.map((item, idx) => (
              <Reveal key={idx} delay={(idx % 3) * 80} variant={idx % 3 === 0 ? "left" : idx % 3 === 1 ? "scale" : "right"}
                className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-50 text-rose-500"><AlertTriangle className="h-5 w-5" /></span>
                    <span className="text-sm font-bold text-ink">Pain Point</span>
                  </div>
                  <p className="mt-4 text-[13px] leading-relaxed text-rose-950/80 bg-rose-50/50 p-3 rounded-2xl border border-rose-100">{item.prob}</p>
                </div>
                <div className="mt-6 border-t border-border pt-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-wider"><ShieldCheck className="h-4 w-4" />Amretri Solution</div>
                  <p className="mt-2 text-xs leading-relaxed text-ink-soft">{item.sol}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="bg-ink py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange">Our Approach</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">How Does Amretri Optimize Hospital Pharmacy Inventory?</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { title: "Audit & Analysis", desc: "We conduct a complete stock audit, analyzing expiry profiles, slow-moving items, fast-moving trends, and dead stock value." },
              { title: "System Implementation", desc: "We set up reorder levels, min-max thresholds, FEFO protocols, and barcode-based tracking systems." },
              { title: "Continuous Monitoring", desc: "Real-time MIS dashboards, weekly expiry alerts, and monthly inventory review meetings ensure ongoing control." }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100} variant={i === 0 ? "left" : i === 1 ? "scale" : "right"}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
                <span className="inline-block rounded-lg bg-brand px-2.5 py-1 text-xs font-bold tracking-wider uppercase">Step 0{i + 1}</span>
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-white/70">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-8">
          <Reveal className="text-center mb-14">
            <h2 className="text-3xl font-extrabold md:text-5xl">What Are the Key Features of Amretri's Inventory Control System?</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: RefreshCw, title: "FEFO Stock Rotation", desc: "First Expiry, First Out protocol ensures minimal expiry loss through systematic stock rotation." },
              { icon: AlertTriangle, title: "Near-Expiry Alerts", desc: "Automated notifications for medicines approaching expiry, with vendor return coordination." },
              { icon: BarChart3, title: "ABC & VED Analysis", desc: "Categorize inventory by value and criticality to focus management effort where it matters." },
              { icon: FileCheck, title: "Stock Audit Reports", desc: "Detailed monthly reports on stock value, expiry status, and movement patterns." },
              { icon: TrendingUp, title: "Demand Forecasting", desc: "AI-driven predictions for fast-moving items based on historical consumption patterns." },
              { icon: Settings, title: "Reorder Level Systems", desc: "Automated minimum stock thresholds that trigger purchase orders before stock runs out." }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={i} delay={i * 80} variant={i % 3 === 0 ? "left" : i % 3 === 1 ? "scale" : "right"}
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

      {/* FORM */}
      <section id="stock-audit-form" className="relative overflow-hidden bg-ink py-24 text-white">
        <div className="hex-grid absolute inset-0 opacity-20" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-soft">Stock Audit Desk</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Request Inventory Audit & Review</h2>
            <p className="mx-auto mt-4 max-w-2xl text-xs text-white/70">Share your pharmacy details and we will conduct a preliminary inventory health assessment.</p>
          </Reveal>
          <Reveal variant="up" className="mt-12 rounded-3xl bg-brand p-8 shadow-2xl md:p-12">
            <form onSubmit={submit} className="grid gap-6 md:grid-cols-2" noValidate>
              <div>
                <label className="text-xs font-semibold text-white/80">Your Name</label>
                <input value={form.name} onChange={update("name")} maxLength={100} className={inputCls} placeholder="e.g. Dr. Rajesh Kumar" />
                {errors.name && <p className="mt-1 text-xs text-amber-200">{errors.name}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-white/80">Hospital Name</label>
                <input value={form.hospitalName} onChange={update("hospitalName")} maxLength={200} className={inputCls} placeholder="e.g. City Hospital" />
                {errors.hospitalName && <p className="mt-1 text-xs text-amber-200">{errors.hospitalName}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-white/80">City</label>
                <input value={form.city} onChange={update("city")} maxLength={100} className={inputCls} placeholder="e.g. Lucknow" />
                {errors.city && <p className="mt-1 text-xs text-amber-200">{errors.city}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-white/80">Number of Beds</label>
                <select value={form.beds} onChange={update("beds")} className={selectCls}>
                  <option value="" disabled className="text-ink">Select range</option>
                  <option value="Upto 50" className="text-ink">Up to 50 Beds</option>
                  <option value="51-100" className="text-ink">51-100 Beds</option>
                  <option value="101-200" className="text-ink">101-200 Beds</option>
                  <option value="200+" className="text-ink">200+ Beds</option>
                </select>
                {errors.beds && <p className="mt-1 text-xs text-amber-200">{errors.beds}</p>}
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
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-white/80">Main Inventory Issue</label>
                <select value={form.mainIssue} onChange={update("mainIssue")} className={selectCls}>
                  <option value="" disabled className="text-ink">Select primary issue</option>
                  <option value="Expiry Loss" className="text-ink">High Expiry Loss</option>
                  <option value="Dead Stock" className="text-ink">Dead Stock Accumulation</option>
                  <option value="Stock-outs" className="text-ink">Frequent Stock-outs</option>
                  <option value="No System" className="text-ink">No Inventory System</option>
                  <option value="Audit" className="text-ink">Routine Stock Audit</option>
                </select>
                {errors.mainIssue && <p className="mt-1 text-xs text-amber-200">{errors.mainIssue}</p>}
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
              { label: "Pharmacist Supply & Staffing", slug: "pharmacist-supply-staffing" },
              { label: "Bulk Medicine Procurement", slug: "bulk-medicine-procurement" },
              { label: "Pharmacy Compliance & Audit", slug: "compliance-audit" },
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
            "Your pharmacy inventory should not be a black hole. With Amretri's stock control systems, every rupee of inventory is tracked, optimized, and accounted for."
          </p>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}

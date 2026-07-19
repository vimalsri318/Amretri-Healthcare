import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowUpRight, Check, TrendingUp, BarChart3, HelpCircle,
  ChevronRight, Sparkles, AlertTriangle, Plus, Minus, Target,
  Lightbulb, Search, DollarSign, PieChart
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { Reveal } from "@/components/site/Reveal";
import { submitToGoogleSheets } from "@/lib/sheets";
import heroImg from "@/assets/consulting-profit-improvement-hero.jpg";

export const Route = createFileRoute("/services/consulting-profit-improvement")({
  head: () => ({
    meta: [
      { title: "Hospital Pharmacy Consulting & Profit Improvement | Amretri Healthcare" },
      { name: "description", content: "Improve your hospital pharmacy margins by 5-30% without outsourcing. Amretri provides margin leakage analysis, procurement review, inventory optimization, and profit improvement consulting." },
      { name: "keywords", content: "hospital pharmacy consulting, pharmacy profit improvement, pharmacy margin improvement, pharmacy revenue leakages, pharmacy procurement review, pharmacy profitability analysis, pharmacy operations consulting, hospital pharmacy margin enhancement, pharmacy billing leakage control, pharmacy consulting India" },
      { property: "og:title", content: "Hospital Pharmacy Consulting & Profit Improvement | Amretri Healthcare" },
      { property: "og:description", content: "Boost your hospital pharmacy profits by 5-30% with expert consulting, margin analysis, procurement optimization, and operational improvements." },
      { property: "og:image", content: heroImg },
    ],
    links: [
      { rel: "canonical", href: "https://amretrihealthcare.com/services/consulting-profit-improvement" },
    ],
  }),
  component: ConsultingPage,
});

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  hospitalName: z.string().trim().min(1, "Hospital name is required").max(200),
  city: z.string().trim().min(1, "City is required").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  email: z.string().trim().email("Invalid email").max(255),
  focusArea: z.string().min(1, "Focus area is required"),
  message: z.string().trim().max(1000).optional(),
});

const faqs = [
  {
    q: "What is pharmacy profit improvement consulting?",
    a: "Pharmacy profit improvement consulting involves analyzing every aspect of pharmacy operations — procurement rates, inventory management, billing processes, staffing efficiency, and compliance — to identify opportunities for margin improvement and cost reduction."
  },
  {
    q: "How much margin improvement can Amretri deliver?",
    a: "Based on our experience working with hospitals across India, we typically help improve pharmacy margins by 5-30%, depending on the current operational baseline and the identified improvement areas."
  },
  {
    q: "Do I need to outsource my pharmacy to benefit from consulting?",
    a: "No. Our consulting services are specifically designed for hospital owners who want to improve their in-house pharmacy operations without outsourcing. We provide recommendations, tools, and implementation support."
  },
  {
    q: "What does a procurement review involve?",
    a: "A procurement review compares your current medicine purchase rates with market benchmarks, analyzes vendor performance, identifies opportunities for bulk buying, and recommends actionable changes to reduce procurement costs."
  },
  {
    q: "How long does a consulting engagement typically last?",
    a: "Typical consulting engagements range from 2 weeks for a focused audit to 3-6 months for comprehensive operational transformation, depending on the scope and complexity."
  }
];

const consultingServices = [
  { icon: Search, title: "Margin Leakage Analysis", desc: "Identify where money is being lost through billing leakages, procurement gaps, expiry waste, and operational inefficiencies." },
  { icon: DollarSign, title: "Procurement Rate Review", desc: "Compare your current purchase rates with market benchmarks to uncover savings opportunities of 10-20% on medicine procurement." },
  { icon: PieChart, title: "Profitability Assessment", desc: "Comprehensive analysis of pharmacy P&L, including gross margins, operating costs, and net profitability by department." },
  { icon: Target, title: "Operational Efficiency Audit", desc: "Review staffing patterns, workflow processes, inventory turnover, and billing cycles for optimization opportunities." },
  { icon: Lightbulb, title: "Revenue Enhancement Plan", desc: "Strategic recommendations for new revenue streams, service expansion, and pricing optimization." },
  { icon: BarChart3, title: "Implementation Support", desc: "Hands-on support to implement recommendations, train staff, and track performance improvements over time." },
];

const improvementAreas = [
  { metric: "5-15%", label: "Procurement Savings", desc: "Through rate negotiation and bulk buying" },
  { metric: "3-8%", label: "Expiry Loss Reduction", desc: "Through better inventory management" },
  { metric: "2-5%", label: "Billing Leakage Control", desc: "Through system checks and audits" },
  { metric: "10-30%", label: "Margin Uplift", desc: "Combined impact across all areas" },
];

function ConsultingPage() {
  const [form, setForm] = useState({
    name: "", hospitalName: "", city: "", phone: "", email: "", focusArea: "", message: ""
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
      formSource: "Consulting & Profit Improvement Page",
      ...form
    });
    
    toast.success("Consulting inquiry received!", {
      description: "Our consulting team will contact you within 24 hours."
    });
    setForm({ name: "", hospitalName: "", city: "", phone: "", email: "", focusArea: "", message: "" });
  };

  const scrollToForm = () => {
    document.getElementById("consulting-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const inputCls = "w-full border-0 border-b border-white/30 bg-transparent pb-2 pt-4 text-white placeholder:text-white/50 outline-none transition focus:border-white focus:ring-0";
  const selectCls = "w-full border-0 border-b border-white/30 bg-transparent pb-2 pt-4 text-white outline-none transition focus:border-white focus:ring-0 [color-scheme:dark]";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", "name": "Hospital Pharmacy Consulting & Profit Improvement", "provider": { "@type": "Organization", "name": "Amretri Healthcare" }, "areaServed": { "@type": "Country", "name": "India" } })
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
                  <TrendingUp className="h-3.5 w-3.5" /> Profit Optimization
                </span>
                <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl xl:text-6xl text-ink">
                  Hospital Pharmacy Consulting &amp; Profit Improvement
                </h1>
                <p className="mt-2 text-xs text-ink-soft/60 font-medium">Last updated: July 2026</p>
                <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                  Improve your hospital pharmacy margins by 5-30% without outsourcing. Amretri Healthcare provides expert consulting, margin analysis, procurement optimization, and operational improvement roadmaps for hospitals across India.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-8 text-xs font-semibold text-ink-soft md:grid-cols-4">
                  {["Margin Analysis", "Procurement Review", "Leakage Control", "Profit Roadmap"].map((item) => (
                    <div key={item} className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-brand" />{item}</div>
                  ))}
                </div>
                <div className="mt-10 flex flex-wrap gap-4">
                  <button onClick={scrollToForm} className="group flex items-center gap-3 rounded-full bg-orange px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange/20 hover:bg-orange/95 hover:scale-105 transition">
                    Book a Consulting Session <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                  <Link to="/contact" className="flex items-center gap-2 rounded-full border border-brand bg-transparent text-brand px-6 py-3.5 text-sm font-semibold hover:bg-orange/10 hover:border-orange hover:text-orange transition">
                    Talk to Our Consultants
                  </Link>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-6 xl:col-span-5">
              <Reveal variant="right" className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-brand-soft via-brand-deep to-brand opacity-30 blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl border border-border shadow-2xl aspect-[3/2]">
                  <img src={heroImg} alt="Pharmacy consulting and profit improvement services" className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-6 text-white">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Profit First</p>
                    <h3 className="mt-1 text-lg font-bold">Maximize Your Pharmacy Margins</h3>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* IMPROVEMENT METRICS */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-7xl px-8">
          <Reveal className="text-center">            <h2 className="text-3xl font-extrabold md:text-5xl">What Measurable Impact Can Amretri's Consulting Deliver?</h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70"><strong className="text-brand-soft">Real, quantified improvements delivered to hospital pharmacies across India</strong> through structured consulting engagements — including 5-30% margin uplifts and 10-20% procurement savings.</p>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
            {improvementAreas.map((item, i) => (
              <Reveal key={i} delay={i * 80} variant={i === 0 ? "left" : i === 3 ? "right" : "scale"}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center hover:bg-white/10 transition">
                <div className="text-4xl font-extrabold text-brand md:text-5xl">{item.metric}</div>
                <div className="mt-2 text-sm font-bold">{item.label}</div>
                <div className="mt-1 text-xs text-white/60">{item.desc}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULTING SERVICES */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-8">
          <Reveal className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange">Consulting Services</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">What Does Amretri's Pharmacy Consulting Cover?</h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm text-ink-soft">A comprehensive approach to identify and capture hidden profit opportunities in your pharmacy operations.</p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {consultingServices.map((item, i) => {
              const Icon = item.icon;
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

      {/* APPROACH */}
      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-8">
          <Reveal className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange">Methodology</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">How Does Amretri's Consulting Approach Work?</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { step: "01", title: "Discovery & Audit", desc: "We analyze your pharmacy's current financials, operations, procurement, and compliance status." },
              { step: "02", title: "Opportunity Identification", desc: "We identify specific areas of margin leakage and operational inefficiency with quantified impact." },
              { step: "03", title: "Roadmap Creation", desc: "We develop a prioritized action plan with timelines, responsibilities, and expected outcomes." },
              { step: "04", title: "Implementation Support", desc: "We provide hands-on support and monitoring to ensure improvements are actually delivered." }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80} variant={i === 0 ? "left" : i === 3 ? "right" : "scale"}
                className="rounded-2xl border border-border bg-card p-6">
                <span className="text-5xl font-extrabold text-brand/20">{item.step}</span>
                <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMMON ISSUES */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-8">
          <Reveal className="text-center mb-14">
            <h2 className="text-3xl font-extrabold md:text-5xl">What Common Profit Leakages Does Amretri Find in Hospital Pharmacies?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-ink-soft">Issues we discover in most hospital pharmacy operations during our consulting audits.</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Higher purchase rates due to low buying volume", "Expiry losses not tracked or reported monthly",
              "Billing leakages through discounts and write-offs", "Dead stock tying up working capital",
              "Slow-moving inventory not identified or cleared", "Emergency purchases at premium rates",
              "No margin analysis by product category", "Inconsistent vendor terms and credit periods",
              "Underutilized generic substitution opportunities", "Lack of daily MIS and performance tracking"
            ].map((item, i) => (
              <Reveal key={i} delay={(i % 5) * 60} variant={i % 2 === 0 ? "left" : "right"}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm font-medium text-ink">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-500 text-xs font-bold">{i + 1}</span>
                {item}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="consulting-form" className="relative overflow-hidden bg-ink py-24 text-white">
        <div className="hex-grid absolute inset-0 opacity-20" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-soft">Consulting Desk</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Book a Profit Improvement Consultation</h2>
            <p className="mx-auto mt-4 max-w-2xl text-xs text-white/70">Share your details and we will schedule a preliminary assessment call with our consulting team.</p>
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
                <label className="text-xs font-semibold text-white/80">Primary Focus Area</label>
                <select value={form.focusArea} onChange={update("focusArea")} className={selectCls}>
                  <option value="" disabled className="text-ink">Select focus area</option>
                  <option value="Full Profitability" className="text-ink">Full Profitability Assessment</option>
                  <option value="Procurement" className="text-ink">Procurement Rate Review</option>
                  <option value="Inventory" className="text-ink">Inventory Optimization</option>
                  <option value="Billing" className="text-ink">Billing Leakage Control</option>
                  <option value="Operations" className="text-ink">Operational Efficiency</option>
                </select>
                {errors.focusArea && <p className="mt-1 text-xs text-amber-200">{errors.focusArea}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-white/80">Additional Details (Optional)</label>
                <textarea value={form.message} onChange={update("message")} maxLength={1000} rows={2} className={`${inputCls} resize-none`} />
              </div>
              <div className="mt-4 md:col-span-2 flex justify-end border-t border-white/10 pt-6">
                <button type="submit" className="group flex items-center gap-3 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-brand shadow-lg hover:bg-white/90 transition">
                  Submit Consulting Request <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
                </button>
              </div>
            </form>
          </Reveal>
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
            "Your hospital pharmacy may be running, but is it truly profitable? Let Amretri's consulting team help you uncover hidden margins and build a sustainable profit improvement plan."
          </p>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}

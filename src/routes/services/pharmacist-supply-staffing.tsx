import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowUpRight, Check, Users, ShieldCheck, HelpCircle, AlertTriangle, ChevronRight, UserPlus } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { Reveal } from "@/components/site/Reveal";
import { submitToGoogleSheets } from "@/lib/sheets";
import heroImg from "@/assets/pharmacist-supply-staffing-hero.jpg";

export const Route = createFileRoute("/services/pharmacist-supply-staffing")({
  head: () => ({
    meta: [
      { title: "Pharmacist Supply & Staffing Services | Amretri Healthcare" },
      { name: "description", content: "Hire trained, verified, and reliable pharmacists for your hospital or clinic. Amretri provides pre-screened professionals, shift management, and emergency replacements." },
      { name: "keywords", content: "pharmacist supply services, hire pharmacists, hospital pharmacist staffing, temporary pharmacist staffing, permanent pharmacist recruitment, pharmacy staffing agency India, certified pharmacists for hire, pharmacist shift management, clinical pharmacist staffing" },
      { property: "og:title", content: "Pharmacist Supply & Staffing Services | Amretri Healthcare" },
      { property: "og:description", content: "Get reliable pharmacist staffing for your hospital. We handle recruitment, verification, training, and shift management." },
      { property: "og:image", content: heroImg },
    ],
    links: [
      { rel: "canonical", href: "https://amretrihealthcare.com/services/pharmacist-supply-staffing" },
    ],
  }),
  component: PharmacistStaffingPage,
});

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  organization: z.string().trim().min(1, "Organization is required").max(200),
  city: z.string().trim().min(1, "City is required").max(100),
  numberOfPharmacists: z.string().trim().min(1, "Number of pharmacists is required"),
  shift: z.string().min(1, "Shift preference is required"),
  experienceRequired: z.string().min(1, "Experience is required"),
  timeline: z.string().min(1, "Timeline is required"),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
});

const faqs = [
  { q: "Why is it difficult to hire reliable pharmacists?", a: "Hiring registered pharmacists is challenging due to high turnover rates, lack of verification, and the administrative burden of managing shifts, leaves, and replacements." },
  { q: "Does Amretri verify the pharmacists before deployment?", a: "Yes. Every pharmacist undergoes a strict verification process, including background checks, license verification, and clinical competency assessments before they are deployed to your facility." },
  { q: "Can Amretri provide pharmacists for night shifts and emergencies?", a: "Absolutely. We manage 24/7 shift rosters and provide emergency replacement support to ensure your pharmacy never operates without a qualified professional." },
  { q: "Do you supply pharmacists for clinics and retail pharmacies as well?", a: "Yes. While we specialize in hospital pharmacy staffing, we also provide trained professionals for large clinics, retail chains, and government healthcare facilities." },
  { q: "How does the staffing process work?", a: "Once you share your requirements, we shortlist pre-screened candidates from our national database, align them with your shift and experience needs, and manage their deployment and payroll." }
];

const problemsAndSolutions = [
  { prob: "High turnover and constant recruitment cycles exhaust HR resources.", sol: "We manage the entire recruitment lifecycle, providing a stable pipeline of trained professionals." },
  { prob: "Unplanned leaves and absenteeism leave the pharmacy understaffed.", sol: "Our active shift management includes standby replacements so operations are never disrupted." },
  { prob: "Verifying credentials and drug licenses is tedious and risky if done incorrectly.", sol: "We handle 100% of compliance, background checks, and license verification before deployment." },
  { prob: "Lack of clinical training leads to dispensing errors and poor patient experience.", sol: "Amretri pharmacists receive ongoing training in standard operating procedures and patient interaction." }
];

function PharmacistStaffingPage() {
  const [form, setForm] = useState({ name: "", organization: "", city: "", numberOfPharmacists: "", shift: "", experienceRequired: "", timeline: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      formSchema.parse(form);
      setLoading(true);
      
      // Submit to Google Sheets (proposal inquiry)
      await submitToGoogleSheets("inquiry", {
        formSource: "Pharmacist Supply & Staffing Page",
        ...form
      });
      
      toast.success("Requirement submitted successfully. Our team will contact you shortly.");
      setForm({ name: "", organization: "", city: "", numberOfPharmacists: "", shift: "", experienceRequired: "", timeline: "", phone: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => { if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message; });
        setErrors(fieldErrors);
        toast.error("Please fill all required fields correctly.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", "name": "Pharmacist Supply & Staffing Services", "provider": { "@type": "Organization", "name": "Amretri Healthcare" }, "areaServed": { "@type": "Country", "name": "India" }, "serviceType": ["Pharmacist Staffing", "Pharmacy Recruitment", "Healthcare Staffing"] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) }) }} />
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-white to-orange/5 -z-10" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <Reveal variant="left" className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-semibold mb-6"><Users className="w-4 h-4" /> Professional Staffing Solutions</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink mb-6">Reliable Pharmacist Supply & Staffing for Hospitals.</h1>
              <p className="text-xs text-ink-soft/60 font-medium mb-1">Last updated: July 2026</p>
              <p className="text-lg text-ink-soft mb-8 leading-relaxed"><strong className="text-brand">Finding and retaining registered pharmacists is a constant challenge for hospitals.</strong> Amretri Healthcare solves this by providing pre-screened, trained professionals with full shift management and emergency replacement support — so your pharmacy never operates without qualified staff.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#requirement-form" className="inline-flex justify-center items-center gap-2 bg-brand text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-deep transition-all hover-lift">Hire Pharmacists Now <ArrowUpRight className="w-5 h-5" /></a>
              </div>
            </Reveal>
            <Reveal variant="right" className="relative w-full aspect-[3/2] lg:aspect-auto lg:h-[600px] rounded-3xl overflow-hidden border border-border/50 shadow-2xl bg-white">
              <img src={heroImg} alt="Pharmacist Staffing Solutions" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange rounded-full flex items-center justify-center"><ShieldCheck className="w-6 h-6 text-white" /></div>
                    <div><h3 className="font-bold text-lg">100% Verified Professionals</h3><p className="text-white/80 text-sm">Strict license and background checks.</p></div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">Why Do Hospitals Struggle to Find Reliable Pharmacists?</h2>
            <p className="text-ink-soft">The operational headache of running a hospital pharmacy isn't just about medicine—it's about people. Here is how we solve staffing challenges.</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            {problemsAndSolutions.map((item, i) => (
              <Reveal key={i} delay={i * 100} className="bg-secondary/30 rounded-2xl p-8 border border-border/50 hover:border-brand/30 transition-colors">
                <div className="flex gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0"><AlertTriangle className="w-5 h-5 text-red-600" /></div>
                  <div><h4 className="font-semibold text-ink text-lg mb-2">The Problem</h4><p className="text-ink-soft text-sm leading-relaxed">{item.prob}</p></div>
                </div>
                <div className="flex gap-4 pt-6 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0"><Check className="w-5 h-5 text-emerald-600" /></div>
                  <div><h4 className="font-semibold text-ink text-lg mb-2">Amretri's Solution</h4><p className="text-ink-soft text-sm leading-relaxed">{item.sol}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="requirement-form" className="py-24 bg-ink text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal variant="left">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Request Pharmacist Staffing</h2>
              <p className="text-white/70 text-lg mb-8 max-w-lg">Fill out the requirement form below. Our staffing team will analyze your needs and provide matched, verified profiles within 48 hours.</p>
              <ul className="space-y-6">
                {["No upfront recruitment fees.", "Guaranteed replacement for drop-outs.", "Full verification and compliance managed by us.", "Flexible shift structures."].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/90"><div className="w-8 h-8 rounded-full bg-orange/20 flex items-center justify-center shrink-0"><Check className="w-4 h-4 text-orange" /></div>{item}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal variant="right" className="bg-white rounded-3xl p-8 md:p-10 text-ink shadow-2xl relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange rounded-full flex items-center justify-center text-white shadow-lg shadow-orange/30 animate-float"><UserPlus className="w-10 h-10" /></div>
              <h3 className="text-2xl font-bold mb-8">Share Your Requirement</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div><label className="block text-sm font-semibold mb-2">Your Name *</label><input type="text" className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand`} placeholder="Dr. Sharma" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                  <div><label className="block text-sm font-semibold mb-2">Organization *</label><input type="text" className={`w-full px-4 py-3 rounded-xl border ${errors.organization ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand`} placeholder="City Care Hospital" value={form.organization} onChange={e => setForm({...form, organization: e.target.value})} /></div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div><label className="block text-sm font-semibold mb-2">City *</label><input type="text" className={`w-full px-4 py-3 rounded-xl border ${errors.city ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand`} placeholder="Lucknow" value={form.city} onChange={e => setForm({...form, city: e.target.value})} /></div>
                  <div><label className="block text-sm font-semibold mb-2">Phone Number *</label><input type="tel" className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand`} placeholder="+91" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div><label className="block text-sm font-semibold mb-2">No. of Pharmacists *</label><select className={`w-full px-4 py-3 rounded-xl border ${errors.numberOfPharmacists ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand bg-white`} value={form.numberOfPharmacists} onChange={e => setForm({...form, numberOfPharmacists: e.target.value})}><option value="">Select count</option><option value="1-2">1-2</option><option value="3-5">3-5</option><option value="6-10">6-10</option></select></div>
                  <div><label className="block text-sm font-semibold mb-2">Shift Requirement *</label><select className={`w-full px-4 py-3 rounded-xl border ${errors.shift ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand bg-white`} value={form.shift} onChange={e => setForm({...form, shift: e.target.value})}><option value="">Select shift</option><option value="Day Shift">Day Shift</option><option value="Night Shift">Night Shift</option><option value="24/7 Rotation">24/7 Rotation</option></select></div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div><label className="block text-sm font-semibold mb-2">Experience Required *</label><select className={`w-full px-4 py-3 rounded-xl border ${errors.experienceRequired ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand bg-white`} value={form.experienceRequired} onChange={e => setForm({...form, experienceRequired: e.target.value})}><option value="">Select experience</option><option value="Fresher (0-1 yr)">Fresher (0-1 yr)</option><option value="Junior (1-3 yrs)">Junior (1-3 yrs)</option><option value="Senior (3-5+ yrs)">Senior (3-5+ yrs)</option></select></div>
                  <div><label className="block text-sm font-semibold mb-2">Timeline to Hire *</label><select className={`w-full px-4 py-3 rounded-xl border ${errors.timeline ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand bg-white`} value={form.timeline} onChange={e => setForm({...form, timeline: e.target.value})}><option value="">Select timeline</option><option value="Immediate">Immediate</option><option value="Within 15 days">Within 15 days</option><option value="Within a month">Within a month</option></select></div>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-brand text-white font-bold py-4 rounded-xl mt-4 hover:bg-brand-deep flex items-center justify-center gap-2">{loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Submit Requirement <ChevronRight className="w-5 h-5" /></>}</button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal className="text-center mb-16">              <h2 className="text-3xl font-bold text-ink mb-4">Frequently Asked Questions About Pharmacist Staffing</h2></Reveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 50} className="bg-secondary/20 p-6 rounded-2xl">
                <h4 className="font-bold text-ink mb-2 flex gap-3"><HelpCircle className="w-5 h-5 text-brand shrink-0 mt-0.5" />{faq.q}</h4>
                <p className="text-ink-soft pl-8 text-sm leading-relaxed">{faq.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaFooter />
    </div>
  );
}

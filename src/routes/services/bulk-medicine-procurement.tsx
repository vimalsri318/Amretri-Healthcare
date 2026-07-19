import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowUpRight, Check, Package, TrendingUp, BarChart3, HelpCircle, AlertTriangle, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { Reveal } from "@/components/site/Reveal";
import { submitToGoogleSheets } from "@/lib/sheets";
import heroImg from "@/assets/bulk-medicine-procurement-hero.jpg";

export const Route = createFileRoute("/services/bulk-medicine-procurement")({
  head: () => ({
    meta: [
      { title: "Bulk Medicine Procurement for Hospitals | Amretri Healthcare" },
      { name: "description", content: "Optimize your hospital's medicine purchase rates. Amretri provides direct manufacturer pricing, generic and ethical medicine procurement, and bulk supply chain solutions." },
      { name: "keywords", content: "bulk medicine procurement for hospitals, hospital medicine supplier, pharmacy procurement services, bulk pharma distributors, wholesale medicine supply for hospitals, direct manufacturer medicine supply, generic medicine supplier for hospitals, surgical items procurement, hospital pharmacy purchase rates" },
      { property: "og:title", content: "Bulk Medicine Procurement for Hospitals | Amretri Healthcare" },
      { property: "og:description", content: "Get better purchase rates and reduce your hospital's procurement costs with our bulk medicine supply network." },
      { property: "og:image", content: heroImg },
    ],
    links: [
      { rel: "canonical", href: "https://amretrihealthcare.com/services/bulk-medicine-procurement" },
    ],
  }),
  component: BulkProcurementPage,
});

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  hospitalName: z.string().trim().min(1, "Hospital name is required").max(200),
  city: z.string().trim().min(1, "City is required").max(100),
  beds: z.string().min(1, "Number of beds is required"),
  monthlyPurchase: z.string().min(1, "Monthly purchase volume is required"),
  categories: z.string().min(1, "Product category interest is required"),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
});

const faqs = [
  { q: "How does Amretri offer better pricing than local distributors?", a: "We aggregate the demand of multiple hospitals and purchase directly from manufacturers or primary carrying & forwarding (C&F) agents, passing the bulk discount margin to your hospital." },
  { q: "Do you supply both ethical (branded) and generic medicines?", a: "Yes. Our procurement network covers ethical branded medicines, high-quality branded generics, surgical consumables, and critical care injections." },
  { q: "Is there a minimum order value for bulk procurement?", a: "Yes, our bulk procurement model works best for hospitals with a minimum monthly purchase volume of ₹5 Lakhs and above to ensure viable logistics and maximum discounting." },
  { q: "Can you help identify which medicines to replace with better margin generics?", a: "Yes. Our pharmacy analysts can review your current purchase and consumption patterns to recommend high-quality alternatives that offer better margins without compromising clinical efficacy." },
  { q: "How is the delivery and logistics managed?", a: "We handle end-to-end logistics, ensuring timely and compliant delivery (including cold chain maintenance for temperature-sensitive drugs) directly to your hospital store." }
];

const problemsAndSolutions = [
  { prob: "High purchase rates from local vendors reduce overall pharmacy profitability.", sol: "Direct manufacturer connections and aggregated buying power significantly lower procurement costs." },
  { prob: "Frequent stock-outs of critical care medicines and surgical items.", sol: "Predictive supply chain management ensures critical items are always stocked and available." },
  { prob: "Dealing with multiple distributors, invoices, and payments is an administrative nightmare.", sol: "A single, consolidated vendor system simplifies ordering, invoicing, and account reconciliation." },
  { prob: "Lack of transparency in market schemes and bonus offers.", sol: "100% transparent pricing models where bulk schemes and bonuses are fully passed on to the hospital." }
];

function BulkProcurementPage() {
  const [form, setForm] = useState({ name: "", hospitalName: "", city: "", beds: "", monthlyPurchase: "", categories: "", phone: "" });
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
        formSource: "Bulk Medicine Procurement Page",
        ...form
      });
      
      toast.success("Procurement inquiry submitted. Our supply chain team will connect with you soon.");
      setForm({ name: "", hospitalName: "", city: "", beds: "", monthlyPurchase: "", categories: "", phone: "" });
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", "name": "Bulk Medicine Procurement for Hospitals", "provider": { "@type": "Organization", "name": "Amretri Healthcare" }, "areaServed": { "@type": "Country", "name": "India" }, "serviceType": ["Pharmacy Procurement", "Medicine Supply Chain", "Bulk Pharmaceutical Distribution"] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) }) }} />
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-white to-orange/5 -z-10" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <Reveal variant="left" className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-semibold mb-6"><Package className="w-4 h-4" /> B2B Healthcare Supply Chain</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink mb-6">Bulk Medicine Procurement for Hospitals.</h1>
              <p className="text-xs text-ink-soft/60 font-medium mb-1">Last updated: July 2026</p>
              <p className="text-lg text-ink-soft mb-8 leading-relaxed"><strong className="text-brand">Stop losing your pharmacy margins to middlemen.</strong> Connect with Amretri's bulk supply network to get direct manufacturer rates, transparent schemes, and consolidated logistics — and reduce procurement costs by up to 15%.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#procurement-form" className="inline-flex justify-center items-center gap-2 bg-brand text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-deep transition-all hover-lift">Get Pricing Quote <ArrowUpRight className="w-5 h-5" /></a>
              </div>
            </Reveal>
            <Reveal variant="right" className="relative w-full aspect-[3/2] lg:aspect-auto lg:h-[600px] rounded-3xl overflow-hidden border border-border/50 shadow-2xl bg-white">
              <img src={heroImg} alt="Bulk Procurement Solutions" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center"><TrendingUp className="w-6 h-6 text-white" /></div>
                    <div><h3 className="font-bold text-lg">Maximize Your Margins</h3><p className="text-white/80 text-sm">Direct sourcing eliminates up to 15% of middleman costs.</p></div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">Why Should Hospitals Shift to Aggregated Medicine Procurement?</h2>
            <p className="text-ink-soft">Relying on fragmented local vendors limits your purchasing power and hides true market schemes.</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            {problemsAndSolutions.map((item, i) => (
              <Reveal key={i} delay={i * 100} className="bg-secondary/30 rounded-2xl p-8 border border-border/50 hover:border-brand/30 transition-colors">
                <div className="flex gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0"><AlertTriangle className="w-5 h-5 text-red-600" /></div>
                  <div><h4 className="font-semibold text-ink text-lg mb-2">The Challenge</h4><p className="text-ink-soft text-sm leading-relaxed">{item.prob}</p></div>
                </div>
                <div className="flex gap-4 pt-6 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0"><Check className="w-5 h-5 text-emerald-600" /></div>
                  <div><h4 className="font-semibold text-ink text-lg mb-2">The Solution</h4><p className="text-ink-soft text-sm leading-relaxed">{item.sol}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="procurement-form" className="py-24 bg-ink text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/3" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal variant="left">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Compare Our Rates</h2>
              <p className="text-white/70 text-lg mb-8 max-w-lg">Share your monthly purchase volume and product categories. We will provide a competitive procurement proposal demonstrating your potential savings.</p>
              <ul className="space-y-6">
                {["100% Genuine, Batch-verified medicines.", "Transparent passing of bonus schemes.", "Cold chain maintained delivery.", "Consolidated billing to reduce admin work."].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/90"><div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0"><Check className="w-4 h-4 text-emerald-400" /></div>{item}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal variant="right" className="bg-white rounded-3xl p-8 md:p-10 text-ink shadow-2xl relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 animate-float"><BarChart3 className="w-10 h-10" /></div>
              <h3 className="text-2xl font-bold mb-8">Request Procurement Quote</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div><label className="block text-sm font-semibold mb-2">Your Name *</label><input type="text" className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand`} placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                  <div><label className="block text-sm font-semibold mb-2">Hospital Name *</label><input type="text" className={`w-full px-4 py-3 rounded-xl border ${errors.hospitalName ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand`} placeholder="City Care Hospital" value={form.hospitalName} onChange={e => setForm({...form, hospitalName: e.target.value})} /></div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div><label className="block text-sm font-semibold mb-2">City *</label><input type="text" className={`w-full px-4 py-3 rounded-xl border ${errors.city ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand`} placeholder="Lucknow" value={form.city} onChange={e => setForm({...form, city: e.target.value})} /></div>
                  <div><label className="block text-sm font-semibold mb-2">Phone Number *</label><input type="tel" className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand`} placeholder="+91" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div><label className="block text-sm font-semibold mb-2">Number of Beds *</label><select className={`w-full px-4 py-3 rounded-xl border ${errors.beds ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand bg-white`} value={form.beds} onChange={e => setForm({...form, beds: e.target.value})}><option value="">Select beds</option><option value="10-50">10-50 Beds</option><option value="51-100">51-100 Beds</option><option value="101-200">101-200 Beds</option><option value="200+">200+ Beds</option></select></div>
                  <div><label className="block text-sm font-semibold mb-2">Avg. Monthly Purchase *</label><select className={`w-full px-4 py-3 rounded-xl border ${errors.monthlyPurchase ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand bg-white`} value={form.monthlyPurchase} onChange={e => setForm({...form, monthlyPurchase: e.target.value})}><option value="">Select volume</option><option value="Under 5 Lakhs">Under ₹5 Lakhs</option><option value="5-10 Lakhs">₹5 - ₹10 Lakhs</option><option value="10-25 Lakhs">₹10 - ₹25 Lakhs</option><option value="25+ Lakhs">Above ₹25 Lakhs</option></select></div>
                </div>
                <div><label className="block text-sm font-semibold mb-2">Primary Interest Categories *</label><select className={`w-full px-4 py-3 rounded-xl border ${errors.categories ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand bg-white`} value={form.categories} onChange={e => setForm({...form, categories: e.target.value})}><option value="">Select category</option><option value="Ethical / Branded Medicines">Ethical / Branded Medicines</option><option value="Generic Medicines">Generic Medicines</option><option value="Surgical Consumables">Surgical Consumables</option><option value="All of the above">All of the above</option></select></div>
                <button type="submit" disabled={loading} className="w-full bg-brand text-white font-bold py-4 rounded-xl mt-4 hover:bg-brand-deep flex items-center justify-center gap-2">{loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Request Pricing <ChevronRight className="w-5 h-5" /></>}</button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal className="text-center mb-16">              <h2 className="text-3xl font-bold text-ink mb-4">Frequently Asked Questions About Bulk Medicine Procurement</h2></Reveal>
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

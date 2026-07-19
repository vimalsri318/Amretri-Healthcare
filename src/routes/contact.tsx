import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { 
  MapPin, Phone, Mail, Clock, ArrowRight, Building, Check, Send
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Reveal } from "@/components/site/Reveal";
import { submitToGoogleSheets } from "@/lib/sheets";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Amretri Healthcare" },
      { name: "description", content: "Contact Amretri Healthcare for hospital pharmacy management, pharmacist staffing, and bulk medicine procurement inquiries." },
      { name: "keywords", content: "contact amretri healthcare, healthcare consulting contact, hospital pharmacy operations contact, lucknow healthcare company" },
      { property: "og:title", content: "Contact Amretri Healthcare" },
      { property: "og:description", content: "Get in touch with our team for pharmacy management and procurement services." },
    ],
    links: [
      { rel: "canonical", href: "https://amretrihealthcare.com/contact" },
    ],
  }),
  component: ContactPage,
});

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().trim().min(10, "Message is too short").max(1000),
});

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    detail: "+91 98862 00349",
    subtext: "Mon-Sat, 9:00 AM - 7:00 PM",
    href: "tel:+919886200349"
  },
  {
    icon: Mail,
    title: "Email Us",
    detail: "contact@amretri.com",
    subtext: "We respond within 24 hours",
    href: "mailto:contact@amretri.com"
  },
  {
    icon: Building,
    title: "Visit Our Office",
    detail: "Lucknow, Uttar Pradesh",
    subtext: "Headquarters",
    href: "#"
  }
];

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      formSchema.parse(form);
      setLoading(true);
      
      // Submit to Google Sheets (general contact inquiry)
      await submitToGoogleSheets("inquiry", {
        formSource: "Contact Page",
        ...form
      });
      
      toast.success("Message sent successfully. Our team will get back to you shortly.");
      setForm({
        name: "", email: "", phone: "", subject: "", message: ""
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
        });
        setErrors(fieldErrors);
        toast.error("Please fill all required fields correctly.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": "https://amretrihealthcare.com/contact",
        "name": "Contact Amretri Healthcare",
        "description": "Contact Amretri Healthcare for hospital pharmacy management, pharmacist staffing, and bulk medicine procurement inquiries.",
        "url": "https://amretrihealthcare.com/contact",
        "mainEntity": {
          "@type": "Organization",
          "name": "Amretri Healthcare",
          "telephone": "+91-8585002020",
          "email": "info@amretrihealthcare.com",
          "address": { "@type": "PostalAddress", "streetAddress": "Khasra No. 43/2, Gali No-10, Indraprastha Colony, Burari", "addressLocality": "New Delhi", "addressCountry": "IN" },
          "contactPoint": [
            { "@type": "ContactPoint", "telephone": "+91-9886200349", "contactType": "sales", "availableLanguage": ["English", "Hindi"] },
            { "@type": "ContactPoint", "telephone": "+91-8585002020", "contactType": "customer service", "availableLanguage": ["English", "Hindi"] }
          ]
        }
      }) }} />
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-ink mb-6">Contact Our Team</h1>
            <p className="text-lg text-ink-soft">
              Whether you need to outsource your hospital pharmacy, hire pharmacists, or procure medicines in bulk, we're here to help.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-8 mb-20">
            {contactMethods.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={i} delay={i * 100} className="bg-white p-8 rounded-2xl border border-border/50 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-2">{item.title}</h3>
                  <a href={item.href} className="text-brand font-semibold hover:underline block mb-2">{item.detail}</a>
                  <p className="text-sm text-ink-soft">{item.subtext}</p>
                </Reveal>
              );
            })}
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-border/50">
            <div className="grid lg:grid-cols-2">
              <Reveal variant="left" className="p-8 md:p-12 bg-ink text-white">
                <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                <p className="text-white/80 mb-10 leading-relaxed">
                  Fill out the form with your inquiry. Be sure to select the correct subject so we can route your message to the appropriate department (Operations, HR, or Supply Chain).
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5 text-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold">Fast Response</h4>
                      <p className="text-white/60 text-sm">We aim to respond to all business inquiries within 24 hours.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5 text-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold">Expert Consultation</h4>
                      <p className="text-white/60 text-sm">Speak directly with our pharmacy operations experts.</p>
                    </div>
                  </div>
                </div>
              </Reveal>
              
              <Reveal variant="right" className="p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-ink">Full Name *</label>
                      <input type="text" className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand`} placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-ink">Phone Number *</label>
                      <input type="tel" className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand`} placeholder="+91" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-ink">Email Address *</label>
                    <input type="email" className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand`} placeholder="john@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-ink">Subject *</label>
                    <select className={`w-full px-4 py-3 rounded-xl border ${errors.subject ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand bg-white`} value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}>
                      <option value="">Select a subject</option>
                      <option value="Pharmacy Management & Operations">Pharmacy Management & Operations</option>
                      <option value="Pharmacist Supply & Staffing">Pharmacist Supply & Staffing</option>
                      <option value="Bulk Medicine Procurement">Bulk Medicine Procurement</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-ink">Message *</label>
                    <textarea 
                      className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand min-h-[120px]`} 
                      placeholder="How can we help you?" 
                      value={form.message} 
                      onChange={e => setForm({...form, message: e.target.value})} 
                    />
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-brand text-white font-bold py-4 rounded-xl hover:bg-brand-deep transition-colors flex items-center justify-center gap-2">
                    {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Send Message <Send className="w-5 h-5" /></>}
                  </button>
                </form>
              </Reveal>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { 
  ArrowUpRight, Check, UserPlus, Briefcase, Award, 
  MapPin, HelpCircle, ChevronRight, FileText
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { Reveal } from "@/components/site/Reveal";
import heroImg from "@/assets/pharmacy-services-hero.png";

export const Route = createFileRoute("/register-as-pharmacist")({
  head: () => ({
    meta: [
      { title: "Pharmacist Jobs & Registration | Amretri Healthcare" },
      { name: "description", content: "Apply for hospital pharmacist jobs with Amretri Healthcare. We are hiring D.Pharma, B.Pharma, and M.Pharma candidates across India." },
      { name: "keywords", content: "pharmacist jobs, hospital pharmacist vacancy, D.Pharma jobs, B.Pharma jobs, pharmacy careers India, register as pharmacist, clinical pharmacist jobs, pharmacy jobs near me" },
      { property: "og:title", content: "Register as Pharmacist - Jobs at Amretri Healthcare" },
      { property: "og:description", content: "Looking for a secure career in hospital pharmacy? Register with Amretri for placement in top hospitals." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: RegisterPharmacistPage,
});

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  qualification: z.string().min(1, "Qualification is required"),
  registrationNumber: z.string().min(1, "Registration Number is required"),
  stateCouncil: z.string().min(1, "State Pharmacy Council is required"),
  experience: z.string().min(1, "Experience is required"),
  currentCity: z.string().min(1, "Current City is required"),
});

const benefits = [
  {
    icon: Briefcase,
    title: "Top Hospital Placements",
    desc: "Get placed in reputed hospitals and multi-specialty clinics with excellent working environments."
  },
  {
    icon: Award,
    title: "Continuous Training",
    desc: "Receive ongoing clinical and operational training to keep your skills sharp and up-to-date."
  },
  {
    icon: MapPin,
    title: "Location Flexibility",
    desc: "Opportunities available across multiple cities and states in our rapidly growing network."
  },
  {
    icon: Check,
    title: "Timely Payouts & Benefits",
    desc: "Enjoy job security, on-time salaries, and standard employee benefits with a professional organization."
  }
];

function RegisterPharmacistPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    registrationNumber: "",
    stateCouncil: "",
    experience: "",
    currentCity: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      formSchema.parse(form);
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Registration successful. Our HR team will review your profile and contact you.");
      setForm({
        name: "", email: "", phone: "", qualification: "", registrationNumber: "", stateCouncil: "", experience: "", currentCity: ""
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
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-white to-orange/5 -z-10" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <Reveal variant="left" className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-semibold mb-6">
                <FileText className="w-4 h-4" /> Career Opportunities
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink mb-6">
                Build Your Career with Top Hospital Pharmacies.
              </h1>
              <p className="text-lg text-ink-soft mb-8 leading-relaxed">
                We are actively hiring qualified D.Pharma, B.Pharma, and M.Pharma professionals. Register with Amretri Healthcare for stable, well-paying roles in premium healthcare facilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#registration-form" className="inline-flex justify-center items-center gap-2 bg-brand text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-deep transition-all hover-lift">
                  Apply Now <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </Reveal>
            <Reveal variant="right" className="relative lg:h-[600px] rounded-3xl overflow-hidden border border-border/50 shadow-2xl bg-white">
              <img src={heroImg} alt="Pharmacist Jobs" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange rounded-full flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Multiple Vacancies Open</h3>
                      <p className="text-white/80 text-sm">Join our growing network of hospital pharmacies.</p>
                    </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">Why Work With Amretri?</h2>
            <p className="text-ink-soft">We prioritize our pharmacists because you are the frontline of patient care.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={i} delay={i * 100} className="bg-secondary/30 rounded-2xl p-8 border border-border/50 text-center">
                  <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-6 h-6 text-brand" />
                  </div>
                  <h4 className="font-bold text-ink mb-3">{item.title}</h4>
                  <p className="text-ink-soft text-sm leading-relaxed">{item.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="registration-form" className="py-24 bg-ink text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal variant="left">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Pharmacist Registration</h2>
              <p className="text-white/70 text-lg mb-8 max-w-lg">
                Submit your professional details. Ensure your state pharmacy council registration is active before applying.
              </p>
              <ul className="space-y-6">
                {["Only registered pharmacists may apply.", "Keep your license number ready.", "Freshers with valid licenses are welcome.", "Background verification is mandatory."].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/90">
                    <div className="w-8 h-8 rounded-full bg-orange/20 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-orange" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal variant="right" className="bg-white rounded-3xl p-8 md:p-10 text-ink shadow-2xl relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange rounded-full flex items-center justify-center text-white shadow-lg shadow-orange/30 animate-float">
                <UserPlus className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-8">Candidate Profile</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name *</label>
                    <input type="text" className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand`} placeholder="Rahul Verma" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email Address *</label>
                    <input type="email" className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand`} placeholder="rahul@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                    <input type="tel" className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand`} placeholder="+91" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Current City *</label>
                    <input type="text" className={`w-full px-4 py-3 rounded-xl border ${errors.currentCity ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand`} placeholder="Lucknow" value={form.currentCity} onChange={e => setForm({...form, currentCity: e.target.value})} />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Qualification *</label>
                    <select className={`w-full px-4 py-3 rounded-xl border ${errors.qualification ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand bg-white`} value={form.qualification} onChange={e => setForm({...form, qualification: e.target.value})}>
                      <option value="">Select qualification</option>
                      <option value="D.Pharma">D.Pharma</option>
                      <option value="B.Pharma">B.Pharma</option>
                      <option value="M.Pharma">M.Pharma</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Experience *</label>
                    <select className={`w-full px-4 py-3 rounded-xl border ${errors.experience ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand bg-white`} value={form.experience} onChange={e => setForm({...form, experience: e.target.value})}>
                      <option value="">Select experience</option>
                      <option value="Fresher (0-1 yr)">Fresher (0-1 yr)</option>
                      <option value="1-3 Years">1-3 Years</option>
                      <option value="3-5 Years">3-5 Years</option>
                      <option value="5+ Years">5+ Years</option>
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Registration Number *</label>
                    <input type="text" className={`w-full px-4 py-3 rounded-xl border ${errors.registrationNumber ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand`} placeholder="Reg No." value={form.registrationNumber} onChange={e => setForm({...form, registrationNumber: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">State Pharmacy Council *</label>
                    <input type="text" className={`w-full px-4 py-3 rounded-xl border ${errors.stateCouncil ? 'border-red-500 bg-red-50' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand`} placeholder="UP Pharmacy Council" value={form.stateCouncil} onChange={e => setForm({...form, stateCouncil: e.target.value})} />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-brand text-white font-bold py-4 rounded-xl mt-4 hover:bg-brand-deep flex items-center justify-center gap-2">
                  {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Submit Application <ChevronRight className="w-5 h-5" /></>}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
      
      <CtaFooter />
    </div>
  );
}

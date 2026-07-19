import { Reveal } from "./Reveal";
import { Star, Quote, Building2 } from "lucide-react";

const testimonials = [
  {
    quote: "Outsourcing our inpatient pharmacy operations to Amretri Healthcare was a turning point. Billing leakages dropped to zero within 45 days, and procurement margins improved by 22%. Exceptional execution.",
    author: "Dr. Rajesh Sharma",
    role: "Managing Director",
    institution: "Niramaya Multi-Specialty Hospital",
    rating: 5,
    location: "Lucknow, UP"
  },
  {
    quote: "Amretri's pharmacist supply and staffing service is exceptionally reliable. We no longer struggle with sudden vacancy management or weekend shift coverage. Every professional provided is verified and highly competent.",
    author: "Sunita Rao",
    role: "Chief Operating Officer",
    institution: "Meditrust Diagnostics & Clinics",
    rating: 5,
    location: "New Delhi"
  },
  {
    quote: "Their stock audit and compliance system saved us from major inventory risks. The team identified dead stock and billing discrepancies worth lakhs. They operate with absolute transparency.",
    author: "Dr. Amit Verma",
    role: "Director of Operations",
    institution: "Sahara Medical Research Center",
    rating: 5,
    location: "Lucknow, UP"
  }
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 md:py-28 border-t border-border/50">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal variant="scale">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider mb-4">
              Client Reviews
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-ink">
              Trusted by Leading Healthcare Organizations
            </h2>
            <p className="mt-4 text-lg text-ink-soft leading-relaxed">
              Discover how hospital administrators and directors are partnering with Amretri Healthcare to optimize operations, improve patient satisfaction, and increase margins.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <Reveal key={idx} variant="left" className="flex">
              <div className="flex flex-col justify-between w-full bg-white rounded-3xl p-8 border border-border/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 group">
                <div className="space-y-6">
                  {/* Rating and Quote Icon */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="w-10 h-10 bg-brand/5 rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                      <Quote className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-ink-soft leading-relaxed italic text-sm md:text-base">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Details */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-ink-soft shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ink leading-tight">{item.author}</h4>
                    <p className="text-xs font-semibold text-brand mt-0.5">{item.role}</p>
                    <p className="text-xs text-ink-soft/80 mt-1">{item.institution}</p>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-ink-soft/50 mt-1.5">{item.location}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import clinic from "@/assets/serve-clinic.jpg";
import lab from "@/assets/serve-lab.jpg";
import radiology from "@/assets/serve-radiology.jpg";
import hospital from "@/assets/serve-hospital.jpg";
import rural from "@/assets/serve-rural.jpg";
import government from "@/assets/serve-government.jpg";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

const partners = [
  { img: clinic, title: "Polyclinics & Clinics", body: "Optimized pharmacy, lab and radiology operations for clinics seeking efficiency, compliance, and patient trust." },
  { img: hospital, title: "Private Nursing Homes", body: "Structured pharmacy, pathology and radiology management to control costs and eliminate operational losses." },
  { img: rural, title: "Semi-Urban & Rural Healthcare", body: "Reliable pharmacy, lab and radiology systems designed for low-resource, high-impact healthcare delivery." },
  { img: lab, title: "Single-Specialty Hospitals", body: "Precision-driven pharmacy and diagnostic workflows aligned with specialty treatment protocols." },
  { img: government, title: "Government Hospitals (PPP)", body: "Transparent, auditable pharmacy, pathology and radiology operations under PPP healthcare models." },
  { img: radiology, title: "Super Specialty Centers", body: "Advanced inventory, diagnostics, and reporting systems for tertiary and quaternary care centers." },
  { img: hospital, title: "Multispecialty Hospitals", body: "End-to-end pharmacy, pathology lab and radiology solutions eliminating pilferage, expiry, and compliance gaps." },
];

export function WhoWeServe() {
  return (
    <section id="serve" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">Who We Serve</p>
            <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">Healthcare Partners</h2>
            <p className="mt-4 text-base text-ink-soft">
              At Amretri Healthcare Pvt. Ltd., we partner with providers across India to deliver
              seamless, compliant, profitable pharmacy, pathology lab and radiology operations.
            </p>
          </div>
          <a href="/#contact" className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand hover-glow">
            Partner With Us <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {partners.map((p, i) => (
            <Reveal
              key={p.title}
              as="article"
              delay={(i % 3) * 80}
              variant={i % 3 === 0 ? "left" : i % 3 === 1 ? "up" : "right"}
              className="group overflow-hidden rounded-3xl border border-border bg-card hover-lift hover:border-brand/40"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.title} width={800} height={600} loading="lazy" className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold transition-colors group-hover:text-brand">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
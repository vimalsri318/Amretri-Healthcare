import { Building2, MapPin, Hospital, Eye, Target } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  {
    icon: Building2,
    title: "Operational Excellence",
    body: "Operational since 2009, Amretri brings over a decade of hands-on experience managing pharmacy and laboratory operations across diverse healthcare settings.",
  },
  {
    icon: MapPin,
    title: "Rapid Pan-India Expansion",
    body: "Expanding rapidly across Bihar, Chhattisgarh, Maharashtra, and multiple other states — building a strong nationwide healthcare operations network.",
  },
  {
    icon: Hospital,
    title: "Diverse Healthcare Reach",
    body: "Serving hospitals, nursing homes, clinics, and single-specialty hospitals across urban, semi-urban, and rural India.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    body: "To revolutionize healthcare delivery by making pharmacy and lab operations seamless, transparent, and profit-driven for every hospital and clinic across India.",
  },
  {
    icon: Target,
    title: "Our Mission",
    body: "Empower healthcare institutions with AI-powered management services that reduce stress, ensure compliance, and increase profitability by 5–30% — so providers focus on patient care.",
  },
];

const stats = [
  { value: "30%", label: "Margin Improvement", sub: "Profit uplift achieved within 3–6 months of engagement" },
  { value: "90%", label: "Leakage Reduction", sub: "Billing and revenue leakages eliminated through controls" },
  { value: "70%", label: "Automation Impact", sub: "Manual work reduced using tech-first workflows" },
  { value: "60%", label: "Error Reduction", sub: "Prescription, billing & reporting errors minimized" },
  { value: "20%", label: "Cost Optimization", sub: "Procurement and inventory costs optimized" },
  { value: "100%", label: "Operational Visibility", sub: "Real-time visibility across inventory, billing & utilization" },
];

export function WhyUs() {
  return (
    <section id="why" className="relative bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal variant="left" className="md:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">Why Amretri</p>
            <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">
              Experience. Expansion. <span className="text-brand">Excellence.</span>
            </h2>
            <p className="mt-4 text-base text-ink-soft">
              Your trusted partner in pharmacy, lab and radiology operations — operational since 2009.
            </p>
          </Reveal>

          <div className="grid gap-4 md:col-span-7 md:grid-cols-2">
            {items.map((it, i) => {
              const Icon = it.icon;
              return (
                <Reveal
                  key={it.title}
                  delay={(i % 2) * 80}
                  variant={i % 2 === 0 ? "left" : "right"}
                  className="group rounded-2xl border border-border bg-card p-6 hover-lift hover:border-brand/40"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{it.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{it.body}</p>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal variant="scale" className="mt-20 rounded-3xl bg-brand p-8 text-white md:p-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">By the numbers</p>
              <h3 className="mt-2 text-3xl font-extrabold md:text-4xl">Outcomes our partners see</h3>
            </div>
            <p className="max-w-sm text-sm text-white/80">
              Real impact measured across hospitals and clinics partnering with Amretri.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/15 md:grid-cols-3">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={(i % 3) * 80}
                variant={i % 3 === 0 ? "left" : i % 3 === 1 ? "scale" : "right"}
                className="bg-brand p-6 transition hover:bg-brand-deep"
              >
                <div className="text-4xl font-extrabold md:text-5xl transition-transform duration-300 hover:scale-105 origin-left">{s.value}</div>
                <div className="mt-2 text-sm font-semibold">{s.label}</div>
                <div className="mt-1 text-xs text-white/70">{s.sub}</div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
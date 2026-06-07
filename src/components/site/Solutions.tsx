import { Pill, FlaskConical, ScanLine, ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "./Reveal";

const solutions = [
  {
    icon: Pill,
    title: "Pharmacy Management",
    tagline: "We fix broken pharmacy systems and unlock hidden profits.",
    margin: "5–30%",
    points: [
      "AI-powered inventory & expiry control",
      "Leak-proof billing & theft prevention",
      "GST-ready audit compliance",
      "Smart procurement & vendor control",
      "Live MIS dashboards",
    ],
  },
  {
    icon: FlaskConical,
    title: "Laboratory Management",
    tagline: "We eliminate revenue leakage and operational blind spots.",
    margin: "Predictable",
    points: [
      "End-to-end sample tracking",
      "Zero-leakage billing",
      "Audit-ready documentation",
      "Optimized reagent buying",
      "Real-time dashboards",
    ],
  },
  {
    icon: ScanLine,
    title: "Radiology Management",
    tagline: "We turn idle machines into ROI-generating assets.",
    margin: "Peak ROI",
    points: [
      "Optimized scheduling",
      "Revenue-secure billing",
      "Compliance & audits ready",
      "AMC & vendor optimization",
      "Leadership MIS visibility",
    ],
  },
];

export function Solutions() {
  return (
    <section id="solutions" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">What We Provide</p>
          <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">Our Solutions</h2>
          <p className="mt-4 text-base text-ink-soft">
            We don't run departments. We rebuild them into high-performance,
            profit-driven systems built for scale, control, and compliance.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {solutions.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal
                key={s.title}
                as="article"
                delay={i * 120}
                variant="up"
                className="group relative flex flex-col rounded-3xl border border-border bg-card p-8 hover-lift hover:border-brand"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-brand-deep">
                    {s.margin}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{s.tagline}</p>

                <ul className="mt-6 space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/#contact"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand transition group-hover:gap-3"
                >
                  Know More <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
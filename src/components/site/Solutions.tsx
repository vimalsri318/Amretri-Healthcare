import { Pill, FlaskConical, ScanLine, ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "./Reveal";

const solutions = [
  {
    icon: Pill,
    title: "Pharmacy Acquisition & Management",
    tagline: "Outsource or hand over your hospital pharmacy operations.",
    margin: "High ROI",
    link: "/hospital-pharmacy-acquisition-management-services",
    points: [
      "Zero operational headache",
      "Guaranteed compliance & audits",
      "Profitability improvement",
    ],
  },
  {
    icon: FlaskConical, // can use Users icon later
    title: "Pharmacist Supply & Staffing",
    tagline: "Get trained, verified, and reliable pharmacists for your hospital.",
    margin: "Reliable",
    link: "/pharmacist-supply-staffing-services",
    points: [
      "Pre-screened professionals",
      "Emergency replacements",
      "Shift management",
    ],
  },
  {
    icon: ScanLine, // can use Package icon later
    title: "Bulk Medicine Procurement",
    tagline: "Get better purchase rates and reduce procurement costs.",
    margin: "Savings",
    link: "/bulk-medicine-procurement-for-hospitals",
    points: [
      "Direct manufacturer rates",
      "Optimized vendor negotiation",
      "Consistent supply chain",
    ],
  },
  {
    icon: Pill, // reuse or import others
    title: "Inventory & Stock Control",
    tagline: "Stop losing money to expired medicines and dead stock.",
    margin: "Control",
    link: "/#contact", // Phase 2
    points: [
      "FEFO tracking",
      "ABC & VED analysis",
      "Stock-out prevention",
    ],
  },
  {
    icon: ScanLine,
    title: "Pharmacy Compliance & Audit",
    tagline: "Stay 100% compliant with drug licenses and NABH readiness.",
    margin: "Secure",
    link: "/#contact", // Phase 2
    points: [
      "Narcotic registers",
      "Cold chain maintenance",
      "Standard SOPs",
    ],
  },
  {
    icon: FlaskConical,
    title: "Consulting & Profit Improvement",
    tagline: "Improve your in-house margins without outsourcing.",
    margin: "Growth",
    link: "/#contact", // Phase 2
    points: [
      "Margin leakage reduction",
      "Profitability analysis",
      "Procurement review",
    ],
  },
];

export function Solutions() {
  return (
    <section id="solutions" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange">What We Provide</p>
          <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">Our Solutions</h2>
          <p className="mt-4 text-base text-ink-soft">
            We don't run departments. We rebuild them into high-performance,
            profit-driven systems built for scale, control, and compliance.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {solutions.map((s, i) => {
            const Icon = s.icon;
            const href = "link" in s ? s.link : "/#contact";
            return (
              <Reveal
                key={s.title}
                as="article"
                delay={i * 120}
                variant={i === 0 ? "left" : i === 1 ? "scale" : "right"}
                className="group relative flex flex-col rounded-3xl border border-border bg-card p-8 hover-lift hover:border-brand"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-orange">
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="rounded-full bg-orange/10 px-3 py-1 text-xs font-bold text-orange">
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
                  href={href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-all duration-300 group-hover:text-orange group-hover:gap-3"
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
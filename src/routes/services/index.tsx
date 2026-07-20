import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Pill, FlaskConical, ScanLine, TrendingUp, ShieldCheck, BarChart3, Sparkles, Building, Users, Package, Microscope, Radio } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { Reveal } from "@/components/site/Reveal";
import heroImg from "@/assets/kbi.png";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Hospital Pharmacy & Healthcare Operations Services | Amretri Healthcare" },
      { name: "description", content: "Amretri Healthcare provides end-to-end hospital pharmacy management, pharmacist staffing, bulk medicine procurement, inventory control, compliance audit, and consulting services across India." },
      { name: "keywords", content: "hospital pharmacy services, pharmacy management company, pharmacist staffing agency, bulk medicine procurement, pharmacy compliance audit, inventory management, pharmacy consulting India, healthcare operations partner" },
      { property: "og:title", content: "Hospital Pharmacy & Healthcare Operations Services | Amretri Healthcare" },
      { property: "og:description", content: "Complete hospital pharmacy operations services: acquisition, staffing, procurement, inventory, compliance, and consulting. Boost margins by 5-30%." },
      { property: "og:image", content: heroImg },
    ],
    links: [
      { rel: "canonical", href: "https://amretrihealthcare.com/services" },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Pill,
    title: "Hospital Pharmacy Acquisition & Management",
    tagline: "Outsource or hand over your hospital pharmacy operations for zero operational headache.",
    margin: "High ROI",
    slug: "hospital-pharmacy-acquisition-management",
    points: [
      "Full pharmacy takeover or management contract",
      "Guaranteed compliance & audit readiness",
      "Profitability improvement with transparent MIS",
    ],
  },
  {
    icon: Users,
    title: "Pharmacist Supply & Staffing",
    tagline: "Get trained, verified, and reliable pharmacists for your hospital or clinic.",
    margin: "Reliable",
    slug: "pharmacist-supply-staffing",
    points: [
      "Pre-screened registered professionals",
      "Emergency replacements & shift management",
      "Continuous clinical training",
    ],
  },
  {
    icon: Package,
    title: "Bulk Medicine Procurement",
    tagline: "Get better purchase rates and reduce procurement costs with bulk buying power.",
    margin: "Savings",
    slug: "bulk-medicine-procurement",
    points: [
      "Direct manufacturer & C&F rates",
      "Optimized vendor negotiation",
      "Consolidated billing & logistics",
    ],
  },
  {
    icon: BarChart3,
    title: "Inventory & Stock Control",
    tagline: "Stop losing money to expired medicines, dead stock, and stock-outs.",
    margin: "Control",
    slug: "inventory-stock-control",
    points: [
      "FEFO tracking & expiry monitoring",
      "ABC & VED analysis",
      "Stock-out prevention with reorder alerts",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Pharmacy Compliance & Audit",
    tagline: "Stay 100% compliant with drug licenses, NABH readiness, and SOPs.",
    margin: "Secure",
    slug: "compliance-audit",
    points: [
      "Narcotic registers & cold chain logs",
      "LASA & high-alert drug protocols",
      "Standard operating procedures (SOPs)",
    ],
  },
  {
    icon: TrendingUp,
    title: "Consulting & Profit Improvement",
    tagline: "Improve your in-house margins and operational efficiency without outsourcing.",
    margin: "Growth",
    slug: "consulting-profit-improvement",
    points: [
      "Margin leakage reduction analysis",
      "Procurement & billing audit",
      "Profitability optimization roadmap",
    ],
  },
  {
    icon: Microscope,
    title: "Laboratory Management",
    tagline: "Smart systems for accurate, profitable & efficient diagnostic and hospital labs.",
    margin: "Precision",
    slug: "laboratory-management",
    points: [
      "TAT management & workflow automation",
      "Reagent inventory & expiry control",
      "Compliance & report authenticity",
    ],
  },
  {
    icon: Radio,
    title: "Radiology Management",
    tagline: "Maximize equipment ROI, eliminate billing leakage, and achieve AERB compliance.",
    margin: "Efficiency",
    slug: "radiology-management",
    points: [
      "Billing audit & revenue recovery",
      "Equipment utilization management",
      "AERB compliance & TAT optimization",
    ],
  },
];

const whyChooseUs = [
  {
    stat: "2009",
    label: "Operational Since",
    desc: "Over 15 years of healthcare operations expertise",
  },
  {
    stat: "5–30%",
    label: "Margin Uplift",
    desc: "Proven profitability improvement for partners",
  },
  {
    stat: "Pan-India",
    label: "Coverage",
    desc: "Operations across multiple states",
  },
  {
    stat: "100%",
    label: "Compliance Ready",
    desc: "Audit-ready SOPs and protocols",
  },
];

function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Service",
                name: s.title,
                provider: { "@type": "Organization", name: "Amretri Healthcare" },
                areaServed: { "@type": "Country", name: "India" },
              },
            })),
          }),
        }}
      />

      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand/15 via-white to-orange/20 pt-32 pb-20 text-ink md:pt-40 md:pb-28">
        <div className="hex-grid absolute inset-0 opacity-[0.12]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft text-brand border border-brand/20 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase">
                  <Sparkles className="h-3.5 w-3.5" />
                  Complete Healthcare Operations
                </span>
                <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl xl:text-6xl text-ink">
                  India's Trusted Hospital Pharmacy Operations Partner
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-ink-soft max-w-2xl">
                  From pharmacy acquisition and pharmacist staffing to bulk procurement, inventory control,
                  compliance audits, and profit improvement — Amretri Healthcare delivers end-to-end operational solutions for hospitals across India.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="group flex items-center gap-3 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/20 hover:bg-brand-deep hover:scale-105 transition"
                  >
                    Request a Consultation
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal variant="right" className="relative">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-brand-soft via-brand-deep to-brand opacity-30 blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl border border-border shadow-2xl">
                  <img
                    src={heroImg}
                    alt="Amretri Healthcare services for hospital pharmacy management"
                    width={1024}
                    height={1024}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-6 text-white">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Trusted Since 2009</p>
                    <h3 className="mt-1 text-lg font-bold">Transforming Healthcare Operations</h3>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange">Our Services</p>
            <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">Comprehensive Hospital Pharmacy Solutions</h2>
            <p className="mt-4 text-base text-ink-soft">
              We don't run departments — we rebuild them into high-performance, profit-driven systems
              built for scale, control, and compliance.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <Link
                to={`/services/${s.slug}` as any}
                className="block"
              >
                <Reveal
                  key={s.slug}
                  as="article"
                  delay={i * 120}
                  variant={i === 0 ? "left" : i === 1 ? "scale" : "right"}
                  className="group flex flex-col rounded-3xl border border-border bg-card p-8 hover-lift hover:border-brand transition-all h-full cursor-pointer"
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

                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-all duration-300 group-hover:text-orange group-hover:gap-3">
                    Know More <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </Reveal>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-ink py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange">Why Amretri</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Trusted by Hospitals Across India</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 md:text-base">
              Over a decade of experience rebuilding hospital pharmacy, lab, and radiology operations into high-performance systems.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
            {whyChooseUs.map((item, i) => (
              <Reveal
                key={item.label}
                delay={i * 80}
                variant={i === 0 ? "left" : i === 3 ? "right" : "scale"}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center hover:bg-white/10 transition"
              >
                <div className="text-4xl font-extrabold text-brand md:text-5xl">{item.stat}</div>
                <div className="mt-2 text-sm font-bold text-white">{item.label}</div>
                <div className="mt-1 text-xs text-white/60">{item.desc}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-brand to-brand-deep py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal variant="scale">
            <h2 className="text-3xl font-extrabold md:text-5xl">Ready to Transform Your Pharmacy Operations?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/85">
              Whether you need pharmacy takeover, staffing, procurement, or consulting — our team is ready to help.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-brand shadow-lg hover:bg-white/90 hover:scale-105 transition"
            >
              Get in Touch
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}

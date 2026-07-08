import { createFileRoute } from "@tanstack/react-router";
import { Building2, MapPin, Hospital, Eye, Target, GraduationCap, ArrowUpRight, Award, Heart, Shield, TrendingUp, Star, Check } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { Reveal } from "@/components/site/Reveal";
import heroImg from "@/assets/pharmacy-services-hero.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Amretri Healthcare | Hospital Pharmacy Operations Partner" },
      { name: "description", content: "Learn about Amretri Healthcare — India's trusted hospital pharmacy operations partner. Operational since 2009, serving hospitals across India with pharmacy acquisition, staffing, procurement, and compliance services." },
      { name: "keywords", content: "about amretri healthcare, hospital pharmacy management company, healthcare operations India, pharmacy outsourcing company, hospital operations partner, amretri healthcare founder, amretri healthcare leadership, healthcare consulting firm India, pharmacy management since 2009" },
      { property: "og:title", content: "About Amretri Healthcare | India's Trusted Pharmacy Operations Partner" },
      { property: "og:description", content: "Amretri Healthcare has been transforming hospital pharmacy operations across India since 2009. Meet our leadership team and learn about our mission." },
      { property: "og:image", content: heroImg },
    ],
    links: [
      { rel: "canonical", href: "https://amretrihealthcare.com/about" },
    ],
  }),
  component: AboutPage,
});

const team = [
  {
    name: "Amrendra Nath Sinha",
    role: "Chief Mentor",
    creds: "Graduate in Science | Leadership Certifications",
    bio: "A visionary mentor passionate about transforming healthcare operations, he empowers people and organisations to unlock their true potential through values-driven leadership.",
  },
  {
    name: "Dr. Abhishek Kumar",
    role: "Director",
    creds: "M.B.B.S., D.Ortho",
    bio: "A qualified orthopaedic surgeon and strategic brain behind Amretri Healthcare, he blends medical, technical, and business expertise to build scalable, profitable healthcare operations.",
  },
  {
    name: "Dr. Monika Divya",
    role: "Director",
    creds: "M.B.B.S.",
    bio: "With a strong medical foundation and sharp operational insight, she leads business development, compliance, financial oversight, and team leadership initiatives.",
  },
  {
    name: "Sankha S Mukherjee",
    role: "Vice President – Alliance",
    creds: "",
    bio: "With over two decades of experience in healthcare business development and strategic alliances, Sankha brings a proven track record of building high-value institutional partnerships and B2B ecosystems across India.",
  },
];

const milestones = [
  { year: "2009", title: "Founded", desc: "Amretri Healthcare established with a vision to transform healthcare operations in India." },
  { year: "2015", title: "Expansion Phase", desc: "Expanded pharmacy management services across multiple states and healthcare institutions." },
  { year: "2020", title: "Technology Integration", desc: "Integrated AI-driven inventory systems, cloud MIS, and digital compliance tools." },
  { year: "2024+", title: "Pan-India Presence", desc: "Rapidly expanding across Bihar, Chhattisgarh, Maharashtra, and multiple other states." },
];

function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://amretrihealthcare.com#organization",
            name: "Amretri Healthcare",
            description: "India's trusted hospital pharmacy operations partner, providing pharmacy acquisition, staffing, procurement, and compliance services since 2009.",
            url: "https://amretrihealthcare.com",
            foundingDate: "2009",
            founder: [
              { "@type": "Person", name: "Dr. Abhishek Kumar", jobTitle: "Director", description: "M.B.B.S., D.Ortho - Orthopaedic surgeon and strategic brain behind Amretri Healthcare" },
              { "@type": "Person", name: "Dr. Monika Divya", jobTitle: "Director", description: "M.B.B.S. - Leads business development, compliance, and financial oversight" },
              { "@type": "Person", name: "Amrendra Nath Sinha", jobTitle: "Chief Mentor", description: "Visionary mentor passionate about transforming healthcare operations" },
              { "@type": "Person", name: "Sankha S Mukherjee", jobTitle: "Vice President – Alliance", description: "Over two decades of experience in healthcare business development" }
            ],
          }),
        }}
      />
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand/15 via-white to-orange/20 pt-32 pb-20 text-ink md:pt-40 md:pb-28">
        <div className="hex-grid absolute inset-0 opacity-[0.12]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft text-brand border border-brand/20 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase">
                <Award className="h-3.5 w-3.5" /> About Us
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl xl:text-6xl">
                India's Trusted Hospital Pharmacy Operations Partner
              </h1>
              <p className="mt-2 text-xs text-ink-soft/60 font-medium">Last updated: July 2026</p>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                Amretri Healthcare Pvt. Ltd. is committed to delivering quality healthcare solutions with trust, innovation, and excellence. Operational since 2009, we partner with hospitals across India to transform pharmacy, lab, and radiology operations into high-performance, profit-driven systems.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/contact"
                  className="group flex items-center gap-3 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/20 hover:bg-brand-deep hover:scale-105 transition"
                >
                  Partner With Us <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>
            <Reveal variant="right" className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-brand-soft via-brand-deep to-brand opacity-30 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-border shadow-2xl">
                <img src={heroImg} alt="About Amretri Healthcare" width={1024} height={1024} className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Since 2009</p>
                  <h3 className="mt-1 text-lg font-bold">Transforming Healthcare Operations</h3>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal variant="left" className="rounded-3xl border border-border bg-secondary/30 p-8 md:p-12">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand">
                <Eye className="h-7 w-7" />
              </div>
              <h2 className="mt-6 text-3xl font-extrabold md:text-4xl">What Is Our Vision for Healthcare?</h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                To revolutionize healthcare delivery by making pharmacy and lab operations seamless, transparent, and profit-driven for every hospital and clinic across India.
              </p>
            </Reveal>
            <Reveal variant="right" className="rounded-3xl border border-border bg-secondary/30 p-8 md:p-12">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand">
                <Target className="h-7 w-7" />
              </div>
              <h2 className="mt-6 text-3xl font-extrabold md:text-4xl">What Is Our Mission in Healthcare Operations?</h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                Empower healthcare institutions with AI-powered management services that reduce stress, ensure compliance, and increase profitability by 5–30% — so providers focus on patient care.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="bg-ink py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange">Our Values</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">What Core Values Drive Amretri Healthcare?</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { icon: Heart, title: "Patient-Centric Care", desc: "Every decision we make is ultimately about improving patient outcomes and experience." },
              { icon: Shield, title: "Uncompromising Compliance", desc: "We maintain the highest standards of regulatory compliance and operational integrity." },
              { icon: TrendingUp, title: "Profit with Purpose", desc: "We believe profitability and patient care go hand in hand when operations are optimized." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={i} delay={i * 100} variant={i === 0 ? "left" : i === 1 ? "scale" : "right"}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center hover:bg-white/10 transition">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand/20 text-brand"><Icon className="h-7 w-7" /></div>
                  <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{item.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* MILESTONES */}
      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange">Journey</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">What Are Amretri's Key Milestones Since 2009?</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {milestones.map((m, i) => (
              <Reveal key={i} delay={i * 100} variant={i === 0 ? "left" : i === 3 ? "right" : "scale"}
                className="relative rounded-2xl border border-border bg-card p-6 text-center">
                <div className="text-4xl font-extrabold text-brand">{m.year}</div>
                <div className="mt-2 text-lg font-bold text-ink">{m.title}</div>
                <p className="mt-2 text-sm text-ink-soft">{m.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="leadership" className="bg-secondary py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-extrabold text-brand md:text-5xl">Our Leadership Team</h2>
            <p className="mt-4 text-base font-semibold text-ink">
              Visionary leaders driving innovation, excellence, and sustainable healthcare transformation
            </p>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 120} variant={i % 2 === 0 ? "left" : "right"}
                className="group rounded-3xl bg-card p-8 text-center shadow-sm hover-lift">
                <div className="mx-auto grid h-36 w-36 place-items-center rounded-full border-4 border-brand bg-accent transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 group-hover:border-orange">
                  <span className="text-3xl font-extrabold text-brand">
                    {m.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-extrabold text-ink">{m.name}</h3>
                <p className="mt-2 text-base font-bold text-orange">{m.role}</p>
                {m.creds && (
                  <p className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-ink">
                    <GraduationCap className="h-4 w-4 text-ink" />
                    {m.creds}
                  </p>
                )}
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{m.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="bg-gradient-to-r from-brand to-brand-deep py-16 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {[
              { stat: "30%", label: "Margin Improvement" },
              { stat: "90%", label: "Leakage Reduction" },
              { stat: "2009", label: "Operational Since" },
              { stat: "60%", label: "Error Reduction" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="text-4xl font-extrabold md:text-5xl">{item.stat}</div>
                <div className="mt-2 text-sm font-semibold text-white/80">{item.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background py-20 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal variant="scale">
            <h2 className="text-3xl font-extrabold md:text-5xl">Ready to Work with India's Trusted Pharmacy Operations Partner?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-ink-soft">
              Since 2009, hospitals across India have trusted Amretri to transform their pharmacy operations. Let's discuss how we can help you.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-brand px-8 py-4 text-sm font-bold text-white shadow-lg hover:bg-brand-deep hover:scale-105 transition"
            >
              Get in Touch <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>

      <CtaFooter />
    </main>
  );
}

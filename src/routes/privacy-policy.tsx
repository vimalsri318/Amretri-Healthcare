import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { Reveal } from "@/components/site/Reveal";
import { Shield, Eye, Lock, Database, UserCheck, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Amretri Healthcare" },
      { name: "description", content: "Privacy Policy for Amretri Healthcare. Learn how we collect, protect, and use your data when registering or booking healthcare operations services." },
      { name: "keywords", content: "privacy policy, data privacy, data security, healthcare compliance, privacy statement" },
      { property: "og:title", content: "Privacy Policy | Amretri Healthcare" },
      { property: "og:description", content: "Read the Privacy Policy for Amretri Healthcare regarding client data protection." },
    ],
    links: [
      { rel: "canonical", href: "https://amretrihealthcare.com/privacy-policy" },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  const lastUpdated = "July 14, 2026";

  const sections = [
    {
      icon: Eye,
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us when filling out forms on our website. This includes contact details (such as your name, email address, phone number, current city), hospital details (hospital name, number of beds, monthly purchase ranges), and career credentials (qualifications, council registration numbers, experience details) when applying as a pharmacist."
    },
    {
      icon: Database,
      title: "2. How We Use Your Information",
      content: "We use the collected information to respond to your strategy call requests, evaluate pharmacy takeover proposals, match pharmacists with appropriate staffing opportunities, coordinate bulk medicine pricing with our supply chain partners, and send transactional communications or operational updates."
    },
    {
      icon: Lock,
      title: "3. Data Security & Storage",
      content: "We implement advanced administrative, technical, and physical safeguards to protect all user and business information against unauthorized access, loss, alteration, or misuse. Access to critical hospital proposal metrics and personal pharmacist details is strictly restricted to authorized managers who require the data for operational purposes."
    },
    {
      icon: UserCheck,
      title: "4. Data Sharing & Third Parties",
      content: "Amretri Healthcare does not sell, lease, or rent your personal or business data to third parties. We share data only with trusted partners and service providers (such as supply chain platforms or secure cloud infrastructure providers) who assist in executing our services under strict confidentiality agreements."
    },
    {
      icon: AlertTriangle,
      title: "5. Your Rights & Choice",
      content: "You have the right to request access to the personal data we hold about you, request corrections to any inaccuracies, or request the deletion of your registration details. If you wish to exercise these rights, please contact our privacy officer at the contact details provided below."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-white to-orange/5 -z-10" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal variant="scale">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-semibold mb-6">
              <Shield className="w-4 h-4" /> Data Protection
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-ink-soft leading-relaxed max-w-2xl mx-auto">
              Your privacy and the security of your business data are of paramount importance to us.
            </p>
            <p className="mt-4 text-sm text-ink-soft/75 font-semibold">
              Last Updated: {lastUpdated}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="pb-24 bg-white/50 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-6">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-border/50 shadow-2xl space-y-12">
            
            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <Reveal key={idx} variant="left" className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-brand/10 text-brand rounded-2xl">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-ink">{section.title}</h3>
                  </div>
                  <p className="text-ink-soft leading-relaxed pl-1 md:pl-16">
                    {section.content}
                  </p>
                </Reveal>
              );
            })}

            {/* Cookies & Tracking */}
            <Reveal variant="left" className="border-t border-border pt-10 space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-ink">6. Cookies & Site Analytics</h3>
              <p className="text-ink-soft leading-relaxed pl-1 md:pl-16">
                Our website uses basic cookies and secure tracking technologies to analyze visitor traffic patterns, improve interface usability, and optimize user experience. These tools do not gather personally identifiable information unless voluntarily provided.
              </p>
            </Reveal>

            {/* Contact Info */}
            <Reveal variant="left" className="bg-brand/5 border border-brand/10 p-6 rounded-2xl space-y-3">
              <h4 className="font-bold text-ink">Contact Our Privacy Officer</h4>
              <p className="text-sm text-ink-soft leading-relaxed">
                For questions, concerns, or requests regarding this Privacy Policy and data management practices, please contact:
              </p>
              <div className="text-sm font-semibold text-brand space-y-1">
                <p>Email: privacy@amretrihealthcare.com</p>
                <p>Address: Khasra No. 43/2, Gali No-10, Indraprastha Colony, Burari, New Delhi – 110084</p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <CtaFooter />
    </div>
  );
}

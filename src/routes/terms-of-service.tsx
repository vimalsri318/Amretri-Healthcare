import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { Reveal } from "@/components/site/Reveal";
import { FileText, ShieldAlert, CheckCircle, Scale, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Amretri Healthcare" },
      { name: "description", content: "Terms of Service for Amretri Healthcare. Read our terms regarding hospital pharmacy operations, pharmacist staffing, and bulk medicine procurement services." },
      { name: "keywords", content: "terms of service, amretri terms, pharmacy management terms, user agreement, contract terms healthcare" },
      { property: "og:title", content: "Terms of Service | Amretri Healthcare" },
      { property: "og:description", content: "Read the Terms of Service for Amretri Healthcare services and solutions." },
    ],
    links: [
      { rel: "canonical", href: "https://amretrihealthcare.com/terms-of-service" },
    ],
  }),
  component: TermsOfServicePage,
});

function TermsOfServicePage() {
  const lastUpdated = "July 14, 2026";

  const sections = [
    {
      icon: Scale,
      title: "1. Acceptance of Terms",
      content: "By accessing or using the website and services provided by Amretri Healthcare Pvt. Ltd. ('Amretri', 'we', 'us', or 'our'), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services. These terms apply to all visitors, users, hospital partners, pharmacists, and clients who access or use our solutions."
    },
    {
      icon: FileText,
      title: "2. Services Offered",
      content: "Amretri Healthcare provides operational management services, including but not limited to Hospital Pharmacy Acquisition & Management, Pharmacist Supply & Staffing, Bulk Medicine Procurement, Inventory & Stock Control, and Pharmacy Compliance Auditing. Specific service level agreements (SLAs) and partnership terms are governed by separate, signed master service agreements with hospital partners."
    },
    {
      icon: ShieldAlert,
      title: "3. User Conduct & Accounts",
      content: "When registering on our website (e.g., registering as a pharmacist or booking a consultation), you must provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree not to engage in any fraudulent, illegal, or unauthorized use of our systems."
    },
    {
      icon: CheckCircle,
      title: "4. Intellectual Property Rights",
      content: "The content, structure, logos, design elements, graphics, and proprietary software/algorithms used on this website and in our service dashboards are the intellectual property of Amretri Healthcare Pvt. Ltd. and are protected by copyright, trademark, and other laws. You may not reproduce, distribute, modify, or create derivative works without our express written consent."
    },
    {
      icon: RefreshCw,
      title: "5. Limitation of Liability",
      content: "To the maximum extent permitted by applicable law, Amretri Healthcare shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, our website or services. While we strive to maintain 100% accuracy, operational uptime, and stock compliance, all digital tools and guidance are provided on an 'as-is' and 'as-available' basis."
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
              <Scale className="w-4 h-4" /> Legal Policy
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink mb-6">
              Terms of Service
            </h1>
            <p className="text-lg text-ink-soft leading-relaxed max-w-2xl mx-auto">
              Please read these terms carefully before using our website or engaging with Amretri Healthcare's services.
            </p>
            <p className="mt-4 text-sm text-ink-soft/75 font-semibold">
              Last Updated: {lastUpdated}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Terms Content */}
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

            {/* General Provisions */}
            <Reveal variant="left" className="border-t border-border pt-10 space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-ink">6. Governing Law & Jurisdiction</h3>
              <p className="text-ink-soft leading-relaxed pl-1 md:pl-16">
                These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts in New Delhi, India.
              </p>
            </Reveal>

            {/* Contact Info */}
            <Reveal variant="left" className="bg-brand/5 border border-brand/10 p-6 rounded-2xl space-y-3">
              <h4 className="font-bold text-ink">Questions about our Terms?</h4>
              <p className="text-sm text-ink-soft leading-relaxed">
                If you have any questions or require clarification regarding these Terms of Service, please reach out to our compliance department:
              </p>
              <div className="text-sm font-semibold text-brand space-y-1">
                <p>Email: info@amretrihealthcare.com</p>
                <p>Phone: +91 85850 02020</p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <CtaFooter />
    </div>
  );
}

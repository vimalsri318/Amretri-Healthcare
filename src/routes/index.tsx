import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Solutions } from "@/components/site/Solutions";
import { WhyUs } from "@/components/site/WhyUs";
import { WhoWeServe } from "@/components/site/WhoWeServe";
import { Leadership } from "@/components/site/Leadership";
import { Faq } from "@/components/site/Faq";
import { CtaFooter } from "@/components/site/CtaFooter";
import { Appointment } from "@/components/site/Appointment";
import { Toaster } from "@/components/ui/sonner";
import { ChatBot } from "@/components/site/ChatBot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amretri Healthcare — Pharmacy, Lab & Radiology Management in India" },
      { name: "description", content: "Amretri Healthcare provides AI-powered pharmacy, laboratory and radiology management for hospitals across India — boosting margins 5–30%." },
      { property: "og:title", content: "Amretri Healthcare — Pharmacy, Lab & Radiology Management" },
      { property: "og:description", content: "We rebuild hospital departments into high-performance, profit-driven systems. Pan-India operations since 2009." },
    ],
    links: [
      { rel: "canonical", href: "https://amretrihealthcare.com" },
    ],
  }),
  component: Index,
});

const homepageSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": "https://amretrihealthcare.com#organization",
    "name": "Amretri Healthcare",
    "description": "India's trusted hospital pharmacy operations partner providing pharmacy acquisition, staffing, procurement, inventory, compliance, and consulting services since 2009.",
    "url": "https://amretrihealthcare.com",
    "telephone": "+91-8585002020",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Khasra No. 43/2, Gali No-10, Indraprastha Colony, Burari",
      "addressLocality": "New Delhi",
      "addressCountry": "IN"
    },
    "areaServed": { "@type": "Country", "name": "India" },
    "foundingDate": "2009",
    "sameAs": []
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://amretrihealthcare.com#website",
    "url": "https://amretrihealthcare.com",
    "name": "Amretri Healthcare",
    "publisher": { "@id": "https://amretrihealthcare.com#organization" }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://amretrihealthcare.com#faq",
    "mainEntity": [
      { "@type": "Question", "name": "What is Pharmacy Management?", "acceptedAnswer": { "@type": "Answer", "text": "Ensuring the right medicines are available, compliant, cost-effective, and dispensed safely at all times." } },
      { "@type": "Question", "name": "What is the role of Amretri in Pharmacy Management?", "acceptedAnswer": { "@type": "Answer", "text": "Amretri manages hospital pharmacies end-to-end improving efficiency, compliance, and profitability." } },
      { "@type": "Question", "name": "Is outsourced pharmacy and lab management profitable?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. It improves margins, reduces leakages, and ensures consistent quality — typically a 5-30% margin uplift." } },
      { "@type": "Question", "name": "Do I lose control if I outsource?", "acceptedAnswer": { "@type": "Answer", "text": "No. You retain full ownership, visibility, and decision-making control. Amretri operates inside your governance." } },
      { "@type": "Question", "name": "How long until we go live?", "acceptedAnswer": { "@type": "Answer", "text": "Typically 15-30 days from onboarding, depending on scope and readiness." } }
    ]
  }
];

function Index() {
  useEffect(() => {
    // Prevent browser from restoring previous scroll on reload
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // On full reload (no real navigation), clear any hash and start at top
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (nav?.type === "reload" || nav?.type === "navigate") {
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {homepageSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <Navbar />
      <Hero />
      <Solutions />
      <WhyUs />
      <WhoWeServe />
      <Leadership />
      <Faq />
      <Appointment />
      <CtaFooter />
      <Toaster />
      <ChatBot />
    </main>
  );
}

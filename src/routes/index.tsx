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
  }),
  component: Index,
});

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

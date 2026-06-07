import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "./Reveal";

const faqs = [
  { q: "What is Pharmacy Management?", a: "Ensuring the right medicines are available, compliant, cost-effective, and dispensed safely at all times." },
  { q: "What is the role of Amretri in Pharmacy Management?", a: "Amretri manages hospital pharmacies end-to-end — improving efficiency, compliance, and profitability." },
  { q: "What is Pathology Lab Management?", a: "Managing lab operations, equipment, staff, quality control, and report accuracy under one accountable system." },
  { q: "Is outsourced pharmacy & lab management profitable?", a: "Yes. It improves margins, reduces leakages, and ensures consistent quality — typically a 5–30% margin uplift." },
  { q: "Do I lose control if I outsource?", a: "No. You retain full ownership, visibility, and decision-making control. Amretri operates inside your governance." },
  { q: "How long until we go live?", a: "Typically 15–30 days from onboarding, depending on scope and readiness." },
  { q: "Do you help with NABL/NABH compliance?", a: "Yes. Amretri provides complete NABL & NABH compliance support for labs." },
  { q: "Will my hospital branding be impacted?", a: "No. Your branding remains intact and fully protected." },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand">FAQs</p>
          <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">Frequently Asked Questions</h2>
        </Reveal>

        <Reveal variant="up" className="mt-12 divide-y divide-border rounded-3xl border border-border bg-card overflow-hidden">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <button
                key={f.q}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group block w-full px-6 py-5 text-left transition hover:bg-secondary/60"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-semibold text-ink transition-colors group-hover:text-brand md:text-lg">{f.q}</span>
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${isOpen ? "bg-brand text-white rotate-180" : "bg-secondary text-brand group-hover:bg-brand group-hover:text-white"}`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </div>
                <div
                  className={`grid overflow-hidden transition-all duration-500 ease-out ${isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <p className="overflow-hidden text-sm text-ink-soft md:text-base">{f.a}</p>
                </div>
              </button>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
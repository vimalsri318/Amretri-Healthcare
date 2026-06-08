import { useEffect, useRef, useState } from "react";
import { X, Send, Stethoscope, Sparkles } from "lucide-react";

type Msg = { role: "bot" | "user"; text: string; options?: string[] };

const FLOWS: Record<string, { reply: string; options?: string[] }> = {
  __start: {
    reply: "Hi! I'm Amri, your Amretri Healthcare assistant. How can I help you today?",
    options: [
      "Tell me about your solutions",
      "How does outsourcing work?",
      "Pricing & engagement",
      "Talk to a human",
    ],
  },
  "Tell me about your solutions": {
    reply:
      "We offer three core solutions:\n\n• **Pharmacy Management** — AI inventory, leak-proof billing, GST compliance.\n• **Laboratory Management** — Zero-leakage billing, audit-ready, optimized reagents.\n• **Radiology Management** — Optimized scheduling, AMC & vendor optimization.\n\nWhich one would you like to explore?",
    options: ["Pharmacy", "Laboratory", "Radiology", "Back to menu"],
  },
  Pharmacy: {
    reply:
      "Pharmacy Management boosts margins by **5–30%** through AI inventory, expiry control, theft prevention, and live MIS dashboards.",
    options: ["How does outsourcing work?", "Talk to a human", "Back to menu"],
  },
  Laboratory: {
    reply:
      "Laboratory Management gives you end-to-end sample tracking, zero-leakage billing, audit-ready documentation, and real-time dashboards. We also support NABL/NABH compliance.",
    options: ["How does outsourcing work?", "Talk to a human", "Back to menu"],
  },
  Radiology: {
    reply:
      "Radiology Management turns idle machines into ROI assets — optimized scheduling, revenue-secure billing, AMC & vendor optimization, and leadership MIS visibility.",
    options: ["How does outsourcing work?", "Talk to a human", "Back to menu"],
  },
  "How does outsourcing work?": {
    reply:
      "We take over operations end-to-end while you retain full ownership and visibility. Typical go-live is **15–30 days** from onboarding. Your branding and existing staff stay intact.",
    options: ["Pricing & engagement", "Talk to a human", "Back to menu"],
  },
  "Pricing & engagement": {
    reply:
      "Engagements are tailored to scope and scale (clinics, nursing homes, multispecialty, PPP). Most partners see margin uplift within **3–6 months**. Share your details and our team will send a custom proposal.",
    options: ["Talk to a human", "Back to menu"],
  },
  "Talk to a human": {
    reply:
      "Sure! You can reach us at **contact@amretrihealthcare.com** or scroll to the consultation form below to book a strategy call.",
    options: ["Back to menu"],
  },
  "Back to menu": {
    reply: "What else can I help you with?",
    options: [
      "Tell me about your solutions",
      "How does outsourcing work?",
      "Pricing & engagement",
      "Talk to a human",
    ],
  },
};

function matchFallback(input: string): keyof typeof FLOWS {
  const t = input.toLowerCase();
  if (/(pharma|medic|drug)/.test(t)) return "Pharmacy";
  if (/(lab|patho|sample|test)/.test(t)) return "Laboratory";
  if (/(radio|mri|ct|scan|x-?ray)/.test(t)) return "Radiology";
  if (/(price|cost|fee|pricing|engagement)/.test(t)) return "Pricing & engagement";
  if (/(outsource|how|process|onboard|go.?live)/.test(t)) return "How does outsourcing work?";
  if (/(human|contact|email|call|phone|talk|support)/.test(t)) return "Talk to a human";
  if (/(solution|service|what.*do)/.test(t)) return "Tell me about your solutions";
  return "Back to menu";
}

function renderText(text: string) {
  // Lightweight **bold** rendering
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i}>{p.slice(2, -2)}</strong>
    ) : (
      <span key={i} style={{ whiteSpace: "pre-wrap" }}>{p}</span>
    ),
  );
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: FLOWS.__start.reply, options: FLOWS.__start.options },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleChoice = (choice: string) => {
    const flow = FLOWS[choice] ?? FLOWS[matchFallback(choice)];
    setMessages((m) => [
      ...m,
      { role: "user", text: choice },
      { role: "bot", text: flow.reply, options: flow.options },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim().slice(0, 300);
    if (!trimmed) return;
    setInput("");
    handleChoice(trimmed);
  };

  return (
    <>
      {/* Floating Buttons Column */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919886200349?text=Hello%20Amretri%20Healthcare%2C%20I%20would%20like%20to%20know%20more%20about%20your%20hospital%20operations%20solutions%20(Pharmacy%2C%20Laboratory%2C%20and%20Radiology)."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
          className="group relative grid h-14 w-14 place-items-center rounded-full text-white shadow-2xl transition-transform duration-300 hover:scale-110"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/30" aria-hidden />
          <span className="absolute -inset-1 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 opacity-90 blur-sm" aria-hidden />
          <span className="relative grid h-14 w-14 place-items-center rounded-full bg-emerald-500 ring-2 ring-white/60">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.904-6.99C16.246 3.75 13.775 2.717 11.14 2.717 5.708 2.717 1.284 7.14 1.28 12.582c-.001 1.776.467 3.51 1.358 5.053l-.832 3.036 3.123-.817zm11.911-7.228c-.302-.15-1.785-.882-2.062-.982-.277-.1-.478-.15-.679.15-.2.3-.777.982-.953 1.185-.175.2-.351.224-.653.075-.302-.15-1.274-.469-2.427-1.496-.897-.8-1.502-1.787-1.678-2.088-.176-.3-.019-.462.132-.612.135-.135.302-.35.453-.525.15-.175.2-.3.302-.5.101-.2.05-.375-.025-.526-.075-.15-.679-1.635-.93-2.24-.244-.589-.493-.51-.679-.519-.176-.009-.377-.01-.578-.01-.201 0-.528.075-.804.375-.276.3-1.055 1.031-1.055 2.516s1.08 2.982 1.23 3.182c.15.2 2.126 3.246 5.15 4.553.719.311 1.28.498 1.718.638.723.23 1.381.198 1.902.12.58-.087 1.785-.73 2.036-1.433.252-.702.252-1.303.176-1.43-.076-.127-.277-.202-.578-.352z"/>
            </svg>
          </span>
        </a>

        {/* Chatbot Button */}
        <button
          aria-label={open ? "Close chat" : "Open chat"}
          onClick={() => setOpen((v) => !v)}
          className="group relative grid h-14 w-14 place-items-center"
        >
          {!open && (
            <>
              <span className="absolute inset-0 animate-ping rounded-full bg-brand/30" aria-hidden />
              <span className="absolute -inset-1 rounded-full bg-gradient-to-br from-brand via-brand-deep to-brand-soft opacity-90 blur-sm" aria-hidden />
            </>
          )}
          <span
            className={`relative grid h-14 w-14 place-items-center rounded-full text-white shadow-2xl shadow-brand/40 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${
              open ? "bg-ink" : "bg-gradient-to-br from-brand to-brand-deep ring-2 ring-white/60"
            }`}
          >
            {open ? (
              <X className="h-6 w-6" />
            ) : (
              <>
                <Stethoscope className="h-7 w-7" />
                <Sparkles className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 text-amber-300" />
                <span className="absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-emerald-400 ring-2 ring-white">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                </span>
              </>
            )}
          </span>
        </button>
      </div>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-40 right-6 z-50 flex h-[32rem] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-brand to-brand-deep p-4 text-white">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/20 ring-2 ring-white/30">
              <Stethoscope className="h-5 w-5" />
            </span>
            <div>
              <div className="text-sm font-bold">Amri · Amretri Assistant</div>
              <div className="text-xs text-white/80">Typically replies instantly</div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-secondary/40 p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "rounded-br-sm bg-brand text-white"
                      : "rounded-bl-sm bg-card text-ink shadow-sm"
                  }`}
                >
                  {renderText(m.text)}
                  {m.role === "bot" && m.options && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.options.map((o) => (
                        <button
                          key={o}
                          onClick={() => handleChoice(o)}
                          className="rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-xs font-medium text-brand transition hover:bg-brand hover:text-white"
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Composer */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border bg-card p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={300}
              placeholder="Type a message…"
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-brand"
            />
            <button
              type="submit"
              aria-label="Send"
              className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white transition hover:bg-brand-deep"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
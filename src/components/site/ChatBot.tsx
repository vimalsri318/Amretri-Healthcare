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
      {/* Floating button — unique medical assistant badge */}
      <button
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((v) => !v)}
        className="group fixed bottom-6 right-6 z-50 grid h-16 w-16 place-items-center"
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

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[32rem] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
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
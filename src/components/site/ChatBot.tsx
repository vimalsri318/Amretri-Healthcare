import { useEffect, useRef, useState } from "react";
import { X, Send, Stethoscope, Sparkles } from "lucide-react";
import whatsappLogo from "@/assets/whatsapp-logo.png";
import chatbotData from "@/data/chatbot-data.json";

type Msg = {
  role: "bot" | "user";
  text: string;
  options?: string[];
  waLink?: string;
};

type FlowState = {
  flowKey: string;
  stepIndex: number;
  data: Record<string, string>;
};

const WELCOME_MSG = "Hello, I am AMRI, your Amretri Healthcare Assistant. How can I help you today?";

const PRIMARY_OPTIONS = [
  "I want Amretri to manage my hospital pharmacy",
  "I need pharmacists or pharmacy staff",
  "I want better medicine purchase rates",
  "More options..."
];

const MORE_OPTIONS = [
  "I want to set up a new pharmacy",
  "I want to set up a diagnostic center",
  "I need help with licenses and compliance",
  "I need pharmacy audit or stock audit",
  "I have expiry, dead stock or inventory problems",
  "I want to discuss a hospital, PPP or institutional project",
  "I want Amretri team to call me",
  "Back to main menu"
];

const STOP_WORDS = new Set([
  "how", "what", "is", "a", "an", "the", "to", "for", "in", "my", "your", 
  "can", "reach", "have", "do", "you", "we", "i", "need", "want", "of", 
  "about", "with", "me", "are", "does", "please", "help"
]);

const customFlows: Record<string, { steps: string[]; successMessage: string }> = {
  ...chatbotData.leadCaptureFlows,
  "Amretri team call": {
    steps: ["Your Name", "Your Contact Number", "Best time to call"],
    successMessage: "Thank you. Your request for a call back has been captured. The Amretri team will contact you shortly."
  }
};

const CONVERSATIONAL_VERBS = [
  "give", "gave", "given", "have", "had", "has", "want", "need", "go", "went", "gone",
  "tell", "told", "ask", "asked", "say", "said", "know", "knew", "known", "think", "thought",
  "what", "how", "why", "who", "which", "where", "when", "does", "do", "did", "is", "am", "are", "was", "were",
  "hav", "havent", "dont", "cant", "wont", "should", "could", "would", "please", "call"
];

function getQueryTokens(text: string): string[] {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(t => t && !STOP_WORDS.has(t));
}

function findBestFaqMatch(query: string) {
  const queryTokens = getQueryTokens(query);
  if (queryTokens.length === 0) return null;

  let bestFaq = null;
  let maxScore = 0;
  let matchedSectionTitle = "";

  for (const s of chatbotData.sections) {
    for (const faq of s.faqs) {
      const qTokens = getQueryTokens(faq.question);
      
      let matchCount = 0;
      for (const qt of queryTokens) {
        if (qTokens.includes(qt)) {
          matchCount += 1.0;
        } else {
          const hasPartial = qTokens.some(t => t.includes(qt) || qt.includes(t));
          if (hasPartial) matchCount += 0.7;
        }
      }

      const score = matchCount / Math.max(queryTokens.length, 1);
      if (score > maxScore) {
        maxScore = score;
        bestFaq = faq;
        matchedSectionTitle = s.title;
      }
    }
  }

  return maxScore >= 0.35 ? { ...bestFaq, sectionTitle: matchedSectionTitle } : null;
}

function detectFlowTrigger(query: string): string | null {
  const text = query.toLowerCase();
  if (/(takeover|take over|manage.*pharmacy|acquire.*pharmacy|buy.*pharmacy|outsourc)/.test(text)) {
    return "pharmacy takeover";
  }
  if (/(pharmacist|staff|manpower|recruitment|hire|employee)/.test(text)) {
    return "pharmacist requirement";
  }
  if (/(rates|procure|purchase|bulk|discount|margin|vendor)/.test(text)) {
    return "bulk procurement";
  }
  if (/(setup|set up|start.*pharmacy|start.*diagnostic|open.*pharmacy|open.*lab|planning)/.test(text)) {
    return "pharmacy or diagnostic setup";
  }
  if (/(license|comply|compliance|aerb|nabh|legal|regulation|record)/.test(text)) {
    return "license, compliance or medico-legal support";
  }
  if (/(call|callback|phone|contact.*me|talk.*team|representative)/.test(text)) {
    return "Amretri team call";
  }
  return null;
}

function getMenuOptionFlowKey(option: string): string | null {
  const opt = option.toLowerCase();
  if (opt.includes("take over") || opt.includes("manage my hospital pharmacy") || opt.includes("manage my pharmacy")) {
    return "pharmacy takeover";
  }
  if (opt.includes("pharmacists") || opt.includes("pharmacy staff")) {
    return "pharmacist requirement";
  }
  if (opt.includes("medicine purchase rates") || opt.includes("better medicine")) {
    return "bulk procurement";
  }
  if (opt.includes("set up a new pharmacy") || opt.includes("set up a diagnostic center")) {
    return "pharmacy or diagnostic setup";
  }
  if (opt.includes("licenses") || opt.includes("compliance") || opt.includes("medico-legal")) {
    return "license, compliance or medico-legal support";
  }
  if (opt.includes("team to call me") || opt.includes("call me")) {
    return "Amretri team call";
  }
  return null;
}

function getStepQuestion(flowKey: string, field: string): string {
  const f = field.toLowerCase();
  if (f.includes("hospital name") || f.includes("organization name") || f.includes("pharmacy name")) {
    return `Could you please share your **Hospital / Organization name**?`;
  }
  if (f.includes("city")) {
    return `Which **City and State** is this located in?`;
  }
  if (f.includes("beds")) {
    return `What is the total **Number of beds** in your hospital?`;
  }
  if (f.includes("sales")) {
    return `What are your approximate **Monthly pharmacy sales**?`;
  }
  if (f.includes("model")) {
    return `What is your **Current pharmacy / vendor model** (e.g. self-managed, outsourced)?`;
  }
  if (f.includes("problem") || f.includes("concern")) {
    return `What is the **Main problem / concern** you want us to address?`;
  }
  if (f.includes("number of pharmacists")) {
    return `How many **Pharmacists or staff members** do you need?`;
  }
  if (f.includes("shift")) {
    return `What are the **Shift timings** (e.g., day, night, rotational)?`;
  }
  if (f.includes("full-time")) {
    return `Is the position **Full-time, part-time, or temporary**?`;
  }
  if (f.includes("joining")) {
    return `What is the **Expected joining timeline** (e.g. immediately, within 2 weeks)?`;
  }
  if (f.includes("purchase")) {
    return `What is your average **Monthly medicine purchase value**?`;
  }
  if (f.includes("type of setup")) {
    return `What **Type of setup** are you planning (e.g. pharmacy, lab, diagnostic center)?`;
  }
  if (f.includes("budget")) {
    return `What is your approximate **Investment budget**?`;
  }
  if (f.includes("launch")) {
    return `What is the **Expected launch timeline**?`;
  }
  if (f.includes("services")) {
    return `What **Services** are you planning to offer (e.g., ultrasound, blood tests, X-ray)?`;
  }
  if (f.includes("license")) {
    return `What **Type of license or compliance issue** do you need support with?`;
  }
  if (f.includes("setup or new")) {
    return `Is this for an **Existing setup or a brand-new facility**?`;
  }
  if (f.includes("urgency")) {
    return `What is the **Urgency level** (e.g., immediate, standard, informational)?`;
  }
  if (f.includes("name and contact") || f.includes("contact number")) {
    return `Finally, please share your **Name and contact number (mobile/email)** so our team can reach out:`;
  }
  return `Please share details for: **${field}**`;
}

function formatLeadForWhatsApp(flowKey: string, data: Record<string, string>): string {
  const header = `Hi Amretri Healthcare, I would like to submit a request for: *${flowKey.toUpperCase()}*\n\n`;
  const body = Object.entries(data)
    .map(([k, v]) => `*${k}*: ${v}`)
    .join("\n");
  return `${header}${body}\n\nSubmitted via Amretri Web Assistant.`;
}

function isLikelyConversationalPhrase(text: string): boolean {
  const cleanText = text.toLowerCase().replace(/[^a-z0-9\s]/g, "");
  const words = cleanText.split(/\s+/);
  
  if (words.length > 3) {
    const hasPronoun = words.some(w => ["i", "you", "me", "my", "we", "us", "he", "she", "they"].includes(w));
    const hasVerb = words.some(w => 
      CONVERSATIONAL_VERBS.some(v => w.startsWith(v) || w.endsWith(v))
    );
    return hasPronoun || hasVerb;
  }
  
  if (cleanText.includes("?") || words.some(w => ["what", "how", "why", "who", "which"].includes(w))) {
    return true;
  }
  
  return false;
}

function validateStepInput(field: string, input: string): string | null {
  const clean = input.trim();
  const f = field.toLowerCase();
  
  if (clean.length < 2) {
    return "Please enter a valid detail (it is too short).";
  }
  
  const lowercaseInput = clean.toLowerCase();
  const invalidSingleWords = new Set([
    "yes", "no", "ok", "okay", "sure", "fine", "yep", "nope", 
    "please", "thanks", "thank you", "good", "bad", "nothing", "none", "na"
  ]);
  
  if (invalidSingleWords.has(lowercaseInput)) {
    return `"${clean}" is too generic. Could you please provide specific details?`;
  }

  if (f.includes("city") || f.includes("beds") || f.includes("sales") || f.includes("setup") || f.includes("timeline") || f.includes("name")) {
    if (isLikelyConversationalPhrase(clean)) {
      return "It looks like you are asking a question or typing a message. Please specify the requested information directly (e.g. just the name of your City/Hospital).";
    }
  }

  if (f.includes("beds") || f.includes("pharmacists") || f.includes("budget") || f.includes("sales") || f.includes("value")) {
    if (lowercaseInput.length < 2) {
      return "Please specify a descriptive value or numeric figure.";
    }
  }

  if (f.includes("contact") || f.includes("number") || f.includes("phone") || f.includes("email")) {
    const hasPhoneDigits = (clean.match(/\d/g) || []).length >= 8;
    const hasEmailSign = clean.includes("@");
    if (!hasPhoneDigits && !hasEmailSign) {
      return "Please provide a valid phone number (at least 8 digits) or email address so we can reach you.";
    }
  }

  return null;
}

function shouldCancelFlow(choice: string): boolean {
  const clean = choice.trim().toLowerCase();
  
  if (PRIMARY_OPTIONS.some((opt) => opt.toLowerCase() === clean)) return true;
  if (MORE_OPTIONS.some((opt) => opt.toLowerCase() === clean)) return true;
  
  if (["exit", "cancel", "stop", "menu", "back to main menu", "talk to a human", "more options...", "more"].includes(clean)) {
    return true;
  }
  
  if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|welcome)/i.test(clean)) {
    return true;
  }
  
  return false;
}

const renderText = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i}>{p.slice(2, -2)}</strong>
    ) : (
      <span key={i} style={{ whiteSpace: "pre-wrap" }}>{p}</span>
    ),
  );
};

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: WELCOME_MSG, options: PRIMARY_OPTIONS },
  ]);
  const [flow, setFlow] = useState<FlowState | null>(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, isTyping]);

  const handleChoice = (choice: string) => {
    const cleanChoice = choice.trim();

    if (flow && shouldCancelFlow(cleanChoice)) {
      setFlow(null);
      setMessages((m) => [...m, { role: "user", text: cleanChoice }]);
      setIsTyping(true);
      processUserText(cleanChoice);
      return;
    }

    setMessages((m) => [...m, { role: "user", text: cleanChoice }]);
    setIsTyping(true);

    if (flow) {
      const activeFlow = customFlows[flow.flowKey];
      const currentStepField = activeFlow.steps[flow.stepIndex];

      const matchedFaq = findBestFaqMatch(cleanChoice);
      if (matchedFaq && !shouldCancelFlow(cleanChoice)) {
        let reply = matchedFaq.answer;
        if (
          matchedFaq.sectionTitle.includes("LICENSES") || 
          matchedFaq.sectionTitle.includes("MEDICO-LEGAL")
        ) {
          reply += `\n\n_${chatbotData.safetyNote}_`;
        }

        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              role: "bot",
              text: `${reply}\n\n---\n\n*Continuing your request for **${flow.flowKey}**:*\n\n${getStepQuestion(flow.flowKey, currentStepField)}`,
            },
          ]);
        }, 800);
        return;
      }

      const validationError = validateStepInput(currentStepField, cleanChoice);
      if (validationError) {
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              role: "bot",
              text: `⚠️ **Invalid Input:** ${validationError}\n\n${getStepQuestion(flow.flowKey, currentStepField)}`,
            },
          ]);
        }, 800);
        return;
      }

      const nextData = { ...flow.data, [currentStepField]: cleanChoice };

      if (flow.stepIndex + 1 < activeFlow.steps.length) {
        const nextStepField = activeFlow.steps[flow.stepIndex + 1];
        setFlow({
          flowKey: flow.flowKey,
          stepIndex: flow.stepIndex + 1,
          data: nextData,
        });

        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              role: "bot",
              text: getStepQuestion(flow.flowKey, nextStepField),
            },
          ]);
        }, 800);
      } else {
        setFlow(null);
        const waText = formatLeadForWhatsApp(flow.flowKey, nextData);
        const encodedText = encodeURIComponent(waText);
        const waLink = `https://wa.me/919886200349?text=${encodedText}`;

        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              role: "bot",
              text: `${activeFlow.successMessage}\n\n**Captured Details:**\n${Object.entries(nextData)
                .map(([k, v]) => `• ${k}: ${v}`)
                .join("\n")}`,
              options: ["Back to main menu", "Talk to a human"],
              waLink,
            },
          ]);
        }, 800);
      }
      return;
    }

    processUserText(cleanChoice);
  };

  const processUserText = (text: string) => {
    const cleanText = text.trim();

    if (cleanText.toLowerCase() === "talk to a human") {
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: `Sure! You can reach us directly at **contact@amretrihealthcare.com** or call us at **+91 98862 00349**.\n\nYou can also request a call back by typing "call me" here.`,
            options: ["Back to main menu"],
          },
        ]);
      }, 800);
      return;
    }

    if (cleanText.toLowerCase() === "back to main menu" || cleanText.toLowerCase() === "back") {
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: `How else can I help you today? Please choose one of our core options:`,
            options: PRIMARY_OPTIONS,
          },
        ]);
      }, 800);
      return;
    }

    if (cleanText.toLowerCase() === "more options...") {
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: "Please select from these additional services, or ask me a custom question directly:",
            options: MORE_OPTIONS,
          },
        ]);
      }, 800);
      return;
    }

    const exactMenuOption = [...PRIMARY_OPTIONS, ...MORE_OPTIONS].find(
      (opt) => opt.toLowerCase() === cleanText.toLowerCase()
    );

    const flowKey = exactMenuOption ? getMenuOptionFlowKey(exactMenuOption) : detectFlowTrigger(cleanText);

    if (flowKey && customFlows[flowKey]) {
      const firstStepField = customFlows[flowKey].steps[0];
      setFlow({
        flowKey,
        stepIndex: 0,
        data: {},
      });

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: `Sure! I will guide you through setting up your request for **${flowKey}**.\n\n${getStepQuestion(
              flowKey,
              firstStepField
            )}`,
          },
        ]);
      }, 800);
      return;
    }

    if (exactMenuOption) {
      handleMenuOptionRedirect(exactMenuOption);
      return;
    }

    if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|welcome)/i.test(cleanText)) {
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: WELCOME_MSG,
            options: PRIMARY_OPTIONS,
          },
        ]);
      }, 800);
      return;
    }

    const matchedFaq = findBestFaqMatch(cleanText);
    if (matchedFaq) {
      let reply = matchedFaq.answer;
      
      if (
        matchedFaq.sectionTitle.includes("LICENSES") || 
        matchedFaq.sectionTitle.includes("MEDICO-LEGAL")
      ) {
        reply += `\n\n_${chatbotData.safetyNote}_`;
      }

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: reply,
            options: ["Back to main menu", "Talk to a human"],
          },
        ]);
      }, 800);
    } else {
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: `I couldn't find an exact match for that. \n\nPlease select one of the core options below, or choose "Talk to a human" to contact our operations team directly.`,
            options: PRIMARY_OPTIONS,
          },
        ]);
      }, 800);
    }
  };

  const handleMenuOptionRedirect = (option: string) => {
    let targetQuestion = "";
    if (option.includes("audit")) {
      targetQuestion = "Can Amretri audit my hospital pharmacy?";
    } else if (option.includes("expiry") || option.includes("dead stock")) {
      targetQuestion = "My pharmacy has too much dead stock. Can Amretri help?";
    } else if (option.includes("equipment planning")) {
      targetQuestion = "What equipment is needed for a hospital pharmacy?";
    } else if (option.includes("PPP") || option.includes("institutional")) {
      targetQuestion = "Can Amretri support government or PPP healthcare projects?";
    }

    if (targetQuestion) {
      const match = findBestFaqMatch(targetQuestion);
      if (match) {
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              role: "bot",
              text: match.answer,
              options: ["Back to main menu", "Talk to a human"],
            },
          ]);
        }, 800);
        return;
      }
    }

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: `I can help you with that. Can you please share more details or questions about this?`,
          options: ["Back to main menu", "Talk to a human"],
        },
      ]);
    }, 800);
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
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919886200349?text=Hello%20Amretri%20Healthcare%2C%20I%20would%20like%20to%2520know%2520more%2520about%2520your%2520hospital%2520operations%2520solutions%2520(Pharmacy%2C%20Laboratory%2C%20and%20Radiology)."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
          className="group relative grid h-14 w-14 place-items-center rounded-full shadow-2xl transition-transform duration-300 hover:scale-110"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/30" aria-hidden />
          <span className="absolute -inset-1 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 opacity-90 blur-sm" aria-hidden />
          <img src={whatsappLogo} alt="WhatsApp" className="relative h-14 w-14 object-contain" />
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

      {open && (
        <div 
          data-lenis-prevent 
          className="fixed bottom-40 right-6 z-50 flex h-[35rem] w-[24rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl animate-fade-in"
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-brand to-brand-deep p-4 text-white">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/20 ring-2 ring-white/30">
              <Stethoscope className="h-5 w-5" />
            </span>
            <div>
              <div className="text-sm font-bold">AMRI · Healthcare Assistant</div>
              <div className="text-xs text-white/85">Typically replies instantly</div>
            </div>
          </div>

          {/* Messages */}
          <div 
            data-lenis-prevent 
            className="flex-1 space-y-3 overflow-y-auto bg-secondary/40 p-4"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "rounded-br-sm bg-brand text-white"
                      : "rounded-bl-sm bg-card text-ink shadow-sm animate-slide-in"
                  }`}
                >
                  {renderText(m.text)}
                  
                  {m.role === "bot" && m.waLink && (
                    <div className="mt-3">
                      <a
                        href={m.waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-orange px-4 py-2 text-xs font-bold text-white transition hover:bg-orange/95 hover:scale-105 shadow-md shadow-orange/15"
                      >
                        Send Details on WhatsApp 💬
                      </a>
                    </div>
                  )}

                  {m.role === "bot" && m.options && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.options.map((o) => (
                        <button
                          key={o}
                          onClick={() => handleChoice(o)}
                          className="rounded-full border border-brand/35 bg-brand/5 px-3 py-1.5 text-xs font-bold text-brand transition hover:bg-brand hover:text-white"
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-card px-4 py-3.5 text-sm text-ink shadow-sm">
                  <div className="flex gap-1.5 items-center h-2">
                    <span className="w-1.5 h-1.5 bg-ink/60 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-ink/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-ink/60 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={endRef} />
          </div>

          {/* Composer */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border bg-card p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={300}
              placeholder="Type a message…"
              className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-brand"
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
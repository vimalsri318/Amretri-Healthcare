import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { Reveal } from "@/components/site/Reveal";
import { Search, Calendar, Clock, ArrowRight, X, BookOpen, Share2, Award, Heart, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Insights & Articles | Amretri Healthcare Blog" },
      { name: "description", content: "Stay updated with latest insights, best practices, and expert advice on hospital pharmacy management, pharmacist staffing, and bulk medicine procurement." },
      { name: "keywords", content: "healthcare blog, pharmacy operations insights, pharmacist staffing tips, bulk procurement articles, amretri healthcare blog" },
      { property: "og:title", content: "Insights & Articles | Amretri Healthcare Blog" },
      { property: "og:description", content: "Read articles and insights from our operational experts on optimizing hospital pharmacies and labs." },
    ],
    links: [
      { rel: "canonical", href: "https://amretrihealthcare.com/blog" },
    ],
  }),
  component: BlogPage,
});

const articles = [
  {
    id: 1,
    title: "5 Ways to Prevent Billing Leakage in Hospital Pharmacies",
    desc: "Billing leakages are a silent drain on hospital revenue, often accounting for 5% to 15% of pharmacy losses. Discover key operational guards to stop it.",
    category: "Operations",
    date: "July 12, 2026",
    readTime: "5 min read",
    author: "Amrendra Nath Sinha",
    avatar: "AS",
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed text-ink-soft">
          Billing leakages are a silent drain on hospital revenue. In a typical 100-bed hospital setup, unbilled medicines, manual entry errors, and inventory discrepancies can easily account for substantial pharmacy losses. Here are five actionable ways to secure your operations:
        </p>
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-ink">1. Real-time Inventory-to-Billing Sync</h4>
          <p className="text-ink-soft">
            Ensure your pharmacy management software is directly synced with the hospital's EHR and billing module. When a medicine is scanned for dispensing, it must instantly log in the patient's active bill to eliminate human omissions.
          </p>
          <h4 className="text-xl font-bold text-ink">2. Implement Barcode Scanning</h4>
          <p className="text-ink-soft">
            Manual entry is the single largest source of errors. Barcode scanning at the point of dispensing ensures that the exact medicine, batch, and dosage are recorded and billed accurately.
          </p>
          <h4 className="text-xl font-bold text-ink">3. Daily Reconciliation Audits</h4>
          <p className="text-ink-soft">
            Cross-reference daily stock reports against billing receipts. Daily micro-audits are highly effective for catching discrepancies immediately, rather than waiting for monthly reviews.
          </p>
          <h4 className="text-xl font-bold text-ink">4. Double-Verification Protocol</h4>
          <p className="text-ink-soft">
            For high-value medicines and injections, enforce a double-verification protocol where a second pharmacist confirms the item, dosage, and billing record before release.
          </p>
          <h4 className="text-xl font-bold text-ink">5. Digital Return Logs</h4>
          <p className="text-ink-soft">
            When unused medicines are returned from the wards, they must be checked back into inventory digitally and the patient's bill refunded instantly. Loose manual credit notes are a prime leakage point.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Outsourcing vs. In-house Management: The Healthcare Operations Debate",
    desc: "Should hospitals manage their pharmacies, laboratories, and radiology centers in-house, or outsource to experts? Let's weigh the costs, compliance, and margins.",
    category: "Strategy",
    date: "July 05, 2026",
    readTime: "8 min read",
    author: "Operations Team",
    avatar: "OT",
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed text-ink-soft">
          As healthcare demands scale, hospital administrators face a critical question: should ancillary departments like the pharmacy, laboratory, and radiology center remain managed in-house, or outsourced to specialized operators?
        </p>
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-ink">The In-House Challenge</h4>
          <p className="text-ink-soft">
            Managing a pharmacy requires procurement expertise, regulatory compliance checks, constant staffing, and dead-stock management. Often, hospital administrators spend more time resolving operational headaches than focusing on primary patient care.
          </p>
          <h4 className="text-xl font-bold text-ink">Benefits of Outsourcing</h4>
          <ul className="list-disc pl-5 space-y-2 text-ink-soft">
            <li><strong>Expert Procurement:</strong> Specialized operators leverage massive volume purchases to lower procurement costs, passing savings to the hospital.</li>
            <li><strong>Risk Mitigation:</strong> Compliance, licensing, and liability are handled by the partner.</li>
            <li><strong>Staffing Reliability:</strong> Continuous duty rosters and replacement handling are taken off the hospital's shoulders.</li>
          </ul>
          <h4 className="text-xl font-bold text-ink">The Amretri Advantage</h4>
          <p className="text-ink-soft">
            Amretri Healthcare provides an outsourced management model that guarantees a 5% to 30% margin improvement, handles staffing, audits inventory, and takes over operations under a transparent revenue-sharing framework.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Managing Expiry & Dead Stock: Best Practices for Procurement Officers",
    desc: "Near-expiry and dead stock represent a major sinkhole for capital. Learn standard FEFO implementation and vendor return rules to optimize stock control.",
    category: "Inventory",
    date: "June 25, 2026",
    readTime: "6 min read",
    author: "Supply Chain Desk",
    avatar: "SC",
    content: (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed text-ink-soft">
          Near-expiry and dead stock represent a major sinkhole for capital. In inefficient systems, up to 8% of the inventory value is written off due to expiry. Implementing standard protocols can reduce this to less than 1%.
        </p>
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-ink">1. Enforce FEFO (First Expired, First Out)</h4>
          <p className="text-ink-soft">
            Unlike FIFO (First In, First Out), FEFO ensures that medicines with the closest expiry dates are pushed to the front of the dispensing shelves, regardless of when they arrived in the store.
          </p>
          <h4 className="text-xl font-bold text-ink">2. Define a Expiry Alert Matrix</h4>
          <p className="text-ink-soft">
            Configure your inventory system to highlight items that are:
            <ul className="list-disc pl-5 mt-2 space-y-1 text-ink-soft">
              <li><strong>Within 6 Months:</strong> Flag in system and prioritize dispensing.</li>
              <li><strong>Within 3 Months:</strong> Initiate return processes or transfer to high-demand departments.</li>
              <li><strong>Within 1 Month:</strong> Remove from shelves immediately.</li>
            </ul>
          </p>
          <h4 className="text-xl font-bold text-ink">3. Structured Vendor Return Agreements</h4>
          <p className="text-ink-soft">
            Ensure your procurement contracts clearly define a return policy for slow-moving stock. Many vendors accept returns for full credit or replacement if returned within 90 days prior to expiry.
          </p>
          <h4 className="text-xl font-bold text-ink">4. Centralized Distribution Channels</h4>
          <p className="text-ink-soft">
            If you run multiple clinics or departments, set up a central hub that can dynamically transfer slow-moving stock from a low-demand area to a high-demand clinic.
          </p>
        </div>
      </div>
    )
  }
];

function BlogPage() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [activeArticle, setActiveArticle] = useState<typeof articles[0] | null>(null);
  const [dbArticles, setDbArticles] = useState<typeof articles>(articles);
  const [loading, setLoading] = useState(false);

  const categories = ["All", "Operations", "Strategy", "Inventory"];

  useEffect(() => {
    const fetchArticles = async () => {
      const url = import.meta.env.VITE_GOOGLE_SHEETS_URL;
      if (!url) return;
      
      try {
        setLoading(true);
        const res = await fetch(`${url}?action=getBlogs`);
        const data = await res.json();
        
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item: any, idx: number) => ({
            id: item.id ? Number(item.id) : idx + 4,
            title: item.title || "",
            desc: item.desc || "",
            category: item.category || "Operations",
            date: item.date || new Date().toLocaleDateString("en-IN"),
            readTime: item.readTime || "5 min read",
            author: item.author || "Amretri Team",
            avatar: item.author ? item.author.split(" ").map((n: string) => n[0]).join("") : "AT",
            content: (
              <div 
                className="space-y-4 text-ink-soft leading-relaxed" 
                dangerouslySetInnerHTML={{ __html: item.content || "" }} 
              />
            )
          }));
          setDbArticles(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch blogs from Google Sheet:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, []);

  const filtered = dbArticles.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === "All" || a.category === selectedCat;
    return matchSearch && matchCat;
  });

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({ title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-white to-orange/5 -z-10" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal variant="scale">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-semibold mb-6">
              <BookOpen className="w-4 h-4" /> Amretri Knowledge Hub
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink mb-6">
              Insights & Articles
            </h1>
            <p className="text-lg text-ink-soft leading-relaxed max-w-2xl mx-auto">
              Read the latest industry research, optimization guides, and operational strategies written by our healthcare management specialists.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="pb-10 bg-white/30 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white border border-border/40 p-4 rounded-3xl shadow-xl">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedCat === cat
                      ? "bg-brand text-white shadow-md shadow-brand/15"
                      : "text-ink-soft hover:bg-slate-100 hover:text-ink"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft/75" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 text-ink placeholder:text-ink-soft/70 pl-10 pr-4 py-2.5 rounded-full border border-border/50 outline-none focus:border-brand focus:bg-white transition"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="pb-24 flex-grow bg-white/30">
        <div className="mx-auto max-w-6xl px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-border/40 shadow-xl">
              <p className="text-lg text-ink-soft">No articles found matching your query.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {filtered.map((article) => (
                <Reveal key={article.id} variant="left" className="flex">
                  <div className="flex flex-col justify-between bg-white rounded-3xl p-6 border border-border/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 group">
                    <div className="space-y-4">
                      {/* Meta */}
                      <div className="flex items-center gap-2 text-xs font-semibold text-brand uppercase tracking-wider">
                        <span>{article.category}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-brand/35" />
                        <span className="text-ink-soft/80">{article.readTime}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-ink group-hover:text-brand transition-colors duration-200 line-clamp-2">
                        {article.title}
                      </h3>

                      {/* Desc */}
                      <p className="text-ink-soft text-sm leading-relaxed line-clamp-3">
                        {article.desc}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-xs">
                          {article.avatar}
                        </div>
                        <span className="text-xs font-semibold text-ink-soft">{article.author}</span>
                      </div>
                      <button
                        onClick={() => setActiveArticle(article)}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:gap-2.5 transition-all"
                      >
                        Read Post <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Reader Modal / Overlay */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-border overflow-hidden">
            {/* Header */}
            <div className="bg-brand text-white p-6 md:p-8 relative">
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute right-6 top-6 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition"
                aria-label="Close reader"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/80">
                <span>{activeArticle.category}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {activeArticle.date}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {activeArticle.readTime}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-3 pr-8">
                {activeArticle.title}
              </h2>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs">
                  {activeArticle.avatar}
                </div>
                <span className="text-sm font-semibold text-white/90">By {activeArticle.author}</span>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto">
              {activeArticle.content}
            </div>

            {/* Footer controls */}
            <div className="bg-slate-50 border-t border-border/50 px-6 py-4 flex items-center justify-between">
              <button
                onClick={() => handleShare(activeArticle.title)}
                className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-brand transition"
              >
                <Share2 className="w-4 h-4" /> Share Article
              </button>
              <button
                onClick={() => setActiveArticle(null)}
                className="bg-brand text-white px-6 py-2 rounded-full font-bold hover:bg-brand-deep transition shadow-md shadow-brand/10 text-sm"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}

      <CtaFooter />
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import logoAsset from "@/assets/amretri-logo.png";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#why" },
  { label: "Services", href: "/#solutions" },
  { label: "For Pharmacists", href: "/register-as-pharmacist" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleHashChange = () => {
      setActiveHash(window.location.hash || "/");
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6 text-ink md:px-12">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logoAsset} alt="Amretri Healthcare" className="h-16 w-auto md:h-24" />
        </Link>

        {/* Nav Links */}
        <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
          {links.map((l) => {
            const isActive = activeHash === l.href || (l.href === "/" && (activeHash === "" || activeHash === "/"));
            return (
              <a
                key={l.href}
                href={l.href}
                className={`whitespace-nowrap text-base font-bold transition-all duration-200 ${isActive ? "text-brand" : "text-ink-soft hover:text-brand"}`}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        {/* CTA Column */}
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden rounded-full bg-orange px-6 py-3 text-base font-bold text-white transition hover:bg-orange/90 md:inline-flex shadow-sm shadow-orange/10"
          >
            Contact Us
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-full bg-ink/5 hover:bg-ink/10 text-ink md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      {open && (
        <div className="mx-6 mb-4 rounded-2xl bg-white p-4 shadow-xl border border-border md:hidden">
          {links.map((l) => {
            const isActive = activeHash === l.href || (l.href === "/" && (activeHash === "" || activeHash === "/"));
            return (
              <a
                key={l.href}
                href={l.href}
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? "text-brand bg-brand-soft/50" : "text-ink hover:bg-secondary"}`}
              >
                {l.label}
              </a>
            );
          })}
          <Link to="/contact" className="mt-2 block rounded-full bg-orange px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-orange/90">
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
}
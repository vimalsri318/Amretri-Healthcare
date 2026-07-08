import { Link } from "@tanstack/react-router";
import { Menu, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import logoAsset from "@/assets/amretri-logo.png";

const services = [
  { label: "Hospital Pharmacy Acquisition & Management", slug: "hospital-pharmacy-acquisition-management" },
  { label: "Pharmacist Supply & Staffing", slug: "pharmacist-supply-staffing" },
  { label: "Bulk Medicine Procurement", slug: "bulk-medicine-procurement" },
  { label: "Inventory & Stock Control", slug: "inventory-stock-control" },
  { label: "Pharmacy Compliance & Audit", slug: "compliance-audit" },
  { label: "Consulting & Profit Improvement", slug: "consulting-profit-improvement" },
];

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "For Pharmacists", href: "/register-as-pharmacist" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activePath, setActivePath] = useState("/");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleRouteChange = () => {
      setActivePath(window.location.pathname);
    };
    handleRouteChange();
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
            const isActive = activePath.startsWith(l.href) && l.href !== "/" ? true : activePath === l.href;
            const isHomeActive = l.href === "/" && activePath === "/";
            
            if (l.hasDropdown) {
              return (
                <div
                  key={l.href}
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link
                    to={l.href}
                    className={`flex items-center gap-1 whitespace-nowrap text-base font-bold transition-all duration-200 ${(isActive && !isHomeActive) || dropdownOpen ? "text-brand" : "text-ink-soft hover:text-brand"}`}
                  >
                    {l.label}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                  </Link>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[320px] rounded-2xl border border-border bg-white p-2 shadow-xl transition-all duration-200 ${dropdownOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-2"}`}
                  >
                    <div className="mb-2 border-b border-border px-3 pb-2 text-xs font-bold uppercase tracking-wider text-ink-soft">
                      Our Services
                    </div>
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}` as any}
                        className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition hover:bg-brand-soft/70 hover:text-brand ${activePath.includes(s.slug) ? "text-brand bg-brand-soft/50" : "text-ink"}`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        {s.label}
                      </Link>
                    ))}
                    <div className="mt-2 border-t border-border pt-2 px-3">
                      <Link
                        to="/services"
                        className="flex items-center justify-center gap-1 rounded-xl bg-brand/10 px-3 py-2 text-xs font-bold text-brand transition hover:bg-brand hover:text-white"
                        onClick={() => setDropdownOpen(false)}
                      >
                        View All Services
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={l.href}
                to={l.href}
                className={`whitespace-nowrap text-base font-bold transition-all duration-200 ${isHomeActive ? "text-brand" : "text-ink-soft hover:text-brand"}`}
              >
                {l.label}
              </Link>
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
            const isActive = activePath === l.href || (l.href !== "/" && activePath.startsWith(l.href));
            return (
              <div key={l.href}>
                <Link
                  to={l.href}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? "text-brand bg-brand-soft/50" : "text-ink hover:bg-secondary"}`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
                {l.hasDropdown && (
                  <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-brand/20 pl-3">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}` as any}
                        className={`block rounded-lg px-3 py-1.5 text-xs font-medium transition ${activePath.includes(s.slug) ? "text-brand bg-brand-soft/30" : "text-ink-soft hover:text-brand hover:bg-secondary/50"}`}
                        onClick={() => setOpen(false)}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <Link to="/contact" onClick={() => setOpen(false)} className="mt-2 block rounded-full bg-orange px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-orange/90">
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
}
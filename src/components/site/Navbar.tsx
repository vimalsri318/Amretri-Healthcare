import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import logoAsset from "@/assets/amretri-logo.png";

const links = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Why Us", href: "/#why" },
  { label: "Who We Serve", href: "/#serve" },
  { label: "Leadership", href: "/#leadership" },
  { label: "FAQ", href: "/#faq" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute top-0 left-0 right-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-white">
        <Link to="/" className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-sm">
          <img src={logoAsset} alt="Amretri Healthcare" className="h-16 w-auto md:h-20" />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-white/85 transition hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="/#contact"
          className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-deep transition hover:bg-white/90 md:inline-flex"
        >
          Contact Us
        </a>
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-full bg-white/15 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open && (
        <div className="mx-6 mb-4 rounded-2xl bg-white p-4 shadow-xl md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="block rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-secondary">
              {l.label}
            </a>
          ))}
          <a href="/#contact" className="mt-2 block rounded-full bg-brand px-5 py-2.5 text-center text-sm font-semibold text-white">
            Contact Us
          </a>
        </div>
      )}
    </header>
  );
}
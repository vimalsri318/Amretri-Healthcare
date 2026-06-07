import { Mail, Phone, ArrowUpRight, Facebook, Linkedin, Instagram, Twitter } from "lucide-react";
import logoAsset from "@/assets/amretri-logo.png";

export function CtaFooter() {
  return (
    <>
      <section id="contact" className="relative overflow-hidden bg-brand-deep py-24 text-white md:py-28">
        <div className="hex-grid absolute inset-0 opacity-50" aria-hidden />
        <div className="pointer-events-none absolute right-10 top-10 hidden h-32 w-32 md:block" aria-hidden>
          <div className="absolute right-0 top-0 h-10 w-10 bg-white/90" />
          <div className="absolute right-16 top-4 h-4 w-4 bg-white/70" />
          <div className="absolute right-6 top-20 h-6 w-6 bg-white/80" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Your trusted healthcare operations partner.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/85 md:text-lg">
            Improve compliance, transparency, and profitability — without managing pharmacy or lab operations in-house.
            Let Amretri handle operations while you focus on delivering care.
          </p>
          <a
            href="mailto:contact@amretrihealthcare.com"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-white py-3 pl-6 pr-3 text-sm font-semibold text-brand-deep transition hover:bg-white/90"
          >
            Start a Conversation
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </section>

      <footer className="bg-brand-soft text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2">
              <img src={logoAsset} alt="Amretri Healthcare" className="h-8 w-auto" />
            </div>
            <p className="mt-5 max-w-sm text-sm text-white/90">
              Amretri Healthcare Pvt. Ltd. is committed to delivering quality healthcare solutions with trust, innovation, and excellence.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Twitter, href: "#", label: "Twitter" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-accent text-white transition hover:opacity-90"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-lg font-extrabold text-accent">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-sm text-white">
              <li><a href="/#why" className="hover:underline">About Us</a></li>
              <li><a href="/#leadership" className="hover:underline">Chairman's Message</a></li>
              <li><a href="/#contact" className="hover:underline">Contact Us</a></li>
              <li><a href="/#disclaimer" className="hover:underline">Disclaimer</a></li>
              <li><a href="/#terms" className="hover:underline">Terms &amp; Conditions</a></li>
            </ul>
          </div>

          <div className="md:col-span-5">
            <h4 className="text-lg font-extrabold text-accent">Contact Us</h4>
            <div className="mt-5 text-sm text-white">
              <p className="font-bold">Amretri Healthcare Pvt. Ltd.</p>
              <p className="mt-1 leading-relaxed">
                Khasra No. 43/2, Gali No-10,<br />
                Indraprastha Colony, Burari,<br />
                New Delhi – 110084
              </p>
              <div className="mt-5 space-y-2">
                <a href="mailto:info@amretrihealthcare.com" className="flex items-center gap-2 hover:underline">
                  <Mail className="h-4 w-4" />
                  <span>info@amretrihealthcare.com</span>
                </a>
                <a href="tel:+918585002020" className="flex items-center gap-2 hover:underline">
                  <Phone className="h-4 w-4" />
                  <span>+91-85 85 00 20 20</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-brand-deep py-5 text-center text-xs text-white/90">
          © {new Date().getFullYear()} Amretri Healthcare Pvt. Ltd. All Rights Reserved.
        </div>
      </footer>
    </>
  );
}
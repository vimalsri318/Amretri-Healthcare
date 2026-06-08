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
            <div className="inline-flex items-center gap-2 rounded-xl bg-white p-2">
              <img src={logoAsset} alt="Amretri Healthcare" className="h-16 w-auto md:h-18" />
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
                <a
                  href="https://wa.me/919886200349?text=Hello%20Amretri%20Healthcare%2C%20I%20would%20like%20to%20know%20more%20about%20your%20hospital%20operations%20solutions%20(Pharmacy%2C%20Laboratory%2C%20and%20Radiology)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline text-emerald-300 font-semibold"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.904-6.99C16.246 3.75 13.775 2.717 11.14 2.717 5.708 2.717 1.284 7.14 1.28 12.582c-.001 1.776.467 3.51 1.358 5.053l-.832 3.036 3.123-.817zm11.911-7.228c-.302-.15-1.785-.882-2.062-.982-.277-.1-.478-.15-.679.15-.2.3-.777.982-.953 1.185-.175.2-.351.224-.653.075-.302-.15-1.274-.469-2.427-1.496-.897-.8-1.502-1.787-1.678-2.088-.176-.3-.019-.462.132-.612.135-.135.302-.35.453-.525.15-.175.2-.3.302-.5.101-.2.05-.375-.025-.526-.075-.15-.679-1.635-.93-2.24-.244-.589-.493-.51-.679-.519-.176-.009-.377-.01-.578-.01-.201 0-.528.075-.804.375-.276.3-1.055 1.031-1.055 2.516s1.08 2.982 1.23 3.182c.15.2 2.126 3.246 5.15 4.553.719.311 1.28.498 1.718.638.723.23 1.381.198 1.902.12.58-.087 1.785-.73 2.036-1.433.252-.702.252-1.303.176-1.43-.076-.127-.277-.202-.578-.352z"/>
                  </svg>
                  <span>+91 98862 00349</span>
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
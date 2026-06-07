import doctorImg from "@/assets/doctor-hero.png";
import { ArrowUpRight, Stethoscope, ThumbsUp, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-brand text-white">
      <div className="hex-grid absolute inset-0 opacity-60" aria-hidden />

      {/* Decorative pixels bottom-left */}
      <div className="pointer-events-none absolute bottom-8 left-0 hidden h-40 w-48 md:block" aria-hidden>
        <div className="absolute left-2 bottom-20 h-5 w-5 bg-white" />
        <div className="absolute left-10 bottom-10 h-8 w-8 bg-white" />
        <div className="absolute left-24 bottom-16 h-4 w-4 bg-white" />
        <div className="absolute left-20 bottom-2 h-10 w-10 bg-white" />
        <div className="absolute left-36 bottom-8 h-3 w-3 bg-white/80" />
      </div>

      {/* CENTER — Doctor fills full hero height */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden items-end justify-center md:flex">
        <img
          src={doctorImg}
          alt="Amretri Healthcare medical operations expert"
          width={1024}
          height={1024}
          className="h-[92%] w-auto max-w-none drop-shadow-2xl animate-float"
        />
      </div>

      {/* Mobile doctor */}
      <div className="pointer-events-none relative z-0 mt-24 flex justify-center md:hidden">
        <img src={doctorImg} alt="" className="w-[80%] max-w-md drop-shadow-2xl" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1500px] items-center gap-6 px-8 pb-16 pt-28 md:grid-cols-12 md:pb-20 md:pt-32">
        {/* LEFT — Headline */}
        <div className="md:col-span-4 md:pr-4">
          <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight md:text-[1.85rem] lg:text-[2.15rem] xl:text-[2.35rem] animate-fade-up [text-shadow:0_2px_12px_rgba(0,0,0,0.15)]">
            Empowering Hospitals with Seamless Pharmacy, Laboratory &amp; Radiology Solutions.
          </h1>
          <p className="mt-5 max-w-sm text-sm text-white/90 md:text-[15px] animate-fade-up">
            Amretri Healthcare partners with hospitals to operate Pharmacy, Laboratory
            and Radiology services — improving patient experience, compliance and margins.
          </p>

          <a
            href="/#solutions"
            className="group mt-8 inline-flex items-center gap-4 text-base font-semibold text-white animate-fade-up"
          >
            <span className="border-b border-white/70 pb-1">Explore Our Solutions</span>
            <span className="grid h-12 w-12 place-items-center rounded-full border border-white/60 transition group-hover:bg-white group-hover:text-brand-deep">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </a>
        </div>

        {/* CENTER spacer + rating pill */}
        <div className="relative md:col-span-5">
          <div className="hidden md:block md:h-[60vh]" />
          {/* Rating pill */}
          <div className="absolute -bottom-2 left-1/2 z-20 hidden -translate-x-1/2 rounded-full bg-white px-5 py-2 text-ink shadow-xl md:block">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-[10px] font-bold text-white ring-2 ring-white">A</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-deep text-[10px] font-bold text-white ring-2 ring-white">B</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-soft text-[10px] font-bold text-white ring-2 ring-white">C</span>
              </div>
              <div>
                <div className="flex items-center gap-1 text-base font-extrabold text-amber-500">
                  4.9
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                </div>
                <div className="text-[11px] font-semibold text-ink-soft">32k Total Reviews</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Description + stats */}
        <div className="md:col-span-3 md:pl-2">
          <div className="border-l-2 border-white/60 pl-5 animate-fade-up">
            <p className="text-sm leading-relaxed text-white/90 md:text-[15px]">
              We don't run departments — we rebuild them into high-performance,
              profit-driven systems built for scale, control, and compliance across India.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-4 animate-fade-up">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-white/10 text-white">
              <ThumbsUp className="h-6 w-6" />
            </div>
            <div>
              <div className="text-4xl font-extrabold leading-none">5–30%</div>
              <div className="mt-1 text-sm font-semibold">Margin Uplift</div>
              <div className="text-xs text-white/70">For Hospital Partners</div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4 animate-fade-up">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-white/10 text-white">
              <Stethoscope className="h-6 w-6" />
            </div>
            <div>
              <div className="text-4xl font-extrabold leading-none">2009</div>
              <div className="mt-1 text-sm font-semibold">Operational Since</div>
              <div className="text-xs text-white/70">Pan-India Presence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
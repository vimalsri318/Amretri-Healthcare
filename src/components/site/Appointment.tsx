import { useState } from "react";
import { z } from "zod";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import consultImg from "@/assets/consult-team.jpg";
import { Reveal } from "./Reveal";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  email: z.string().trim().email("Invalid email").max(255),
  date: z.string().min(1, "Pick a date"),
  message: z.string().trim().max(1000).optional(),
});

export function Appointment() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { fieldErrors[i.path[0] as string] = i.message; });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    toast.success("Consultation request received", { description: "Our team will reach out within 24 hours." });
    setForm({ name: "", phone: "", email: "", date: "", message: "" });
  };

  const inputCls =
    "w-full border-0 border-b border-white/40 bg-transparent pb-2 pt-5 text-white placeholder:text-white/70 outline-none transition focus:border-white";

  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-20 md:py-28">
      {/* background image right side */}
      <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
        <img src={consultImg} alt="" aria-hidden width={1024} height={1024} className="h-full w-full object-cover" loading="lazy" />
      </div>
      {/* dark left overlay for caduceus feel */}
      <div className="absolute inset-y-0 left-0 hidden w-1/2 bg-ink md:block" aria-hidden />

      {/* decorative pixels */}
      <div className="pointer-events-none absolute left-0 top-0 hidden md:block" aria-hidden>
        <div className="h-8 w-8 bg-white" />
        <div className="ml-8 h-5 w-5 bg-white" />
        <div className="mt-2 h-3 w-3 bg-white/70" />
      </div>
      <div className="pointer-events-none absolute bottom-6 right-6 hidden md:block" aria-hidden>
        <div className="flex gap-2">
          <div className="h-10 w-10 bg-white" />
          <div className="h-6 w-6 self-end bg-white/80" />
        </div>
        <div className="ml-12 mt-2 h-4 w-4 bg-white/60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-12">
          <Reveal variant="left" className="md:col-span-7">
            <div className="rounded-3xl bg-brand p-8 text-white shadow-2xl md:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/80">
                Request a Consultation
              </p>
              <h2 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
                Book a Strategy Call
              </h2>

              <form onSubmit={submit} className="mt-10 grid gap-6 md:grid-cols-2" noValidate>
                <div>
                  <label className="text-xs text-white/80">Your Name</label>
                  <input value={form.name} onChange={update("name")} maxLength={100} className={inputCls} placeholder=" " />
                  {errors.name && <p className="mt-1 text-xs text-amber-200">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-xs text-white/80">Phone No.</label>
                  <input value={form.phone} onChange={update("phone")} maxLength={20} className={inputCls} placeholder=" " />
                  {errors.phone && <p className="mt-1 text-xs text-amber-200">{errors.phone}</p>}
                </div>
                <div>
                  <label className="text-xs text-white/80">Your Email</label>
                  <input type="email" value={form.email} onChange={update("email")} maxLength={255} className={inputCls} placeholder=" " />
                  {errors.email && <p className="mt-1 text-xs text-amber-200">{errors.email}</p>}
                </div>
                <div>
                  <label className="text-xs text-white/80">Preferred Date</label>
                  <input type="date" value={form.date} onChange={update("date")} className={`${inputCls} [color-scheme:dark]`} />
                  {errors.date && <p className="mt-1 text-xs text-amber-200">{errors.date}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-white/80">Message</label>
                  <textarea value={form.message} onChange={update("message")} maxLength={1000} rows={2} className={`${inputCls} resize-none`} placeholder=" " />
                </div>

                <button
                  type="submit"
                  className="group mt-4 inline-flex items-center gap-3 self-start text-lg font-semibold text-white md:col-span-2 hover:gap-4 transition-all"
                >
                  Book a Consultation
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/70 transition group-hover:rotate-45 group-hover:bg-white group-hover:text-brand">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </button>
              </form>
            </div>
          </Reveal>
          <div className="md:col-span-5" />
        </div>
      </div>
    </section>
  );
}
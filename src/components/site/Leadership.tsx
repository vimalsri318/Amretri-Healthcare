import { GraduationCap } from "lucide-react";
import { Reveal } from "./Reveal";

const team = [
  {
    name: "Amrendra Nath Sinha",
    role: "Chief Mentor",
    creds: "Graduate in Science | Leadership Certifications",
    bio: "A visionary mentor passionate about transforming healthcare operations, he empowers people and organisations to unlock their true potential through values-driven leadership.",
  },
  {
    name: "Dr. Abhishek Kumar",
    role: "Director",
    creds: "M.B.B.S., D.Ortho",
    bio: "A qualified orthopaedic surgeon and strategic brain behind Amretri Healthcare, he blends medical, technical, and business expertise to build scalable, profitable healthcare operations.",
  },
  {
    name: "Dr. Monika Divya",
    role: "Director",
    creds: "M.B.B.S.",
    bio: "With a strong medical foundation and sharp operational insight, she leads business development, compliance, financial oversight, and team leadership initiatives.",
  },
  {
    name: "Sankha S Mukherjee",
    role: "Vice President – Alliance",
    creds: "",
    bio: "With over two decades of experience in healthcare business development and strategic alliances, Sankha brings a proven track record of building high-value institutional partnerships and B2B ecosystems across India.",
  },
];

export function Leadership() {
  return (
    <section id="leadership" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold text-brand md:text-5xl">Our Leadership Team</h2>
          <p className="mt-4 text-base font-semibold text-ink">
            Visionary leaders driving innovation, excellence, and sustainable healthcare transformation
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {team.map((m, i) => (
            <Reveal
              key={m.name}
              delay={i * 120}
              variant={i % 2 === 0 ? "left" : "right"}
              className="group rounded-3xl bg-card p-8 text-center shadow-sm hover-lift"
            >
              <div className="mx-auto grid h-36 w-36 place-items-center rounded-full border-4 border-brand bg-secondary transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                <span className="text-3xl font-extrabold text-brand">
                  {m.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-extrabold text-ink">{m.name}</h3>
              <p className="mt-2 text-base font-bold text-brand">{m.role}</p>
              {m.creds && (
                <p className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-ink">
                  <GraduationCap className="h-4 w-4 text-ink" />
                  {m.creds}
                </p>
              )}
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{m.bio}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
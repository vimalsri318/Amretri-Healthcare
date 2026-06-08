import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
  variant?: "up" | "left" | "right" | "scale";
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  variant = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const base = "transition-all duration-[1000ms] will-change-transform";
  const hidden = {
    up: "opacity-0 translate-y-16",
    left: "opacity-0 -translate-x-24",
    right: "opacity-0 translate-x-24",
    scale: "opacity-0 scale-90",
  }[variant];
  const visible = "opacity-100 translate-x-0 translate-y-0 scale-100";

  return (
    <Tag
      ref={ref as never}
      style={{
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`${base} ${shown ? visible : hidden} ${className}`}
    >
      {children}
    </Tag>
  );
}
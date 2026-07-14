import React, { useEffect, useRef, useState } from "react";

export function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
}

export const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .8s cubic-bezier(.22,1,.36,1) ${delay}s, transform .8s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export const SectionHead = ({ eyebrow, title, sub }) => (
  <div className="mb-8">
    <div className="font-mono text-[15px] tracking-[0.3em] uppercase text-[#D4AF37] mb-4">{eyebrow}</div>
    <h2 className="font-display text-[32px] md:text-[40px] lg:text-[56px] leading-[1.1] font-medium text-[#F5F5F5] tracking-tight">{title}</h2>
    {sub && <p className="font-body text-[16px] md:text-[18px] leading-[1.7] text-[#A1A1A1] mt-5 max-w-xs md:max-w-sm lg:max-w-md">{sub}</p>}
  </div>
);

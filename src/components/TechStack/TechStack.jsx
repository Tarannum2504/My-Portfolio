import React from "react";
import { Reveal } from "../Reveal";
import { techStack } from "../../data/techstack";

export const Stack = () => {
  return (
    <>
      <Reveal>
        <div className="mb-6">
          <div className="font-mono text-[19px] tracking-[0.35em] uppercase text-[#D4AF37]">
            STACK
          </div>
        </div>
      </Reveal>

      <div className="w-full max-w-4xl">
        {techStack.map((cat, i) => (
          <Reveal key={cat.category} delay={i * 0.06}>
            <div className={i < techStack.length - 1 ? "mb-16" : ""}>
              <h3 className="font-display text-[22px] text-[#F5F5F5] font-semibold mb-6">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[15px] md:text-[16px] px-5 py-2.5 rounded-full border border-[#262626] text-[#A1A1A1] bg-[#111111]/30 hover:border-[#D4AF37]/50 hover:text-[#F5F5F5] transition-all duration-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
};

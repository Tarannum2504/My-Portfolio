import React from "react";
import { Reveal } from "../Reveal";
import { profile } from "../../data/portfolio";

export const About = () => {
  return (
    <>
      <Reveal>
        <div className="mb-6">
          <div className="font-mono text-[19px] tracking-[0.35em] uppercase text-[#D4AF37]">
            ABOUT
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="w-full max-w-4xl space-y-5">
          {profile.bio.map((paragraph, i) => (
            <p
              key={i}
              className="font-body text-[18px] md:text-[20px] leading-[1.8] text-[#A1A1A1]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>
    </>
  );
};

import React from "react";
import { Github } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";
import { Reveal } from "./Reveal";
import { socialLinks } from "../data/portfolio";

// Custom dark theme matching the portfolio's gold accent palette
const darkTheme = {
  light: ["#1a1a1a", "#2a2a2a", "#3a3a3a", "#D4AF37", "#e6c358"],
  dark: ["#1a1a1a", "#2a2a2a", "#3a3a3a", "#D4AF37", "#e6c358"],
};

const labels = {
  totalCount: "{{count}} contributions in the last year",
};

export const GitHubActivity = () => {
  return (
    <>
      <Reveal>
        <div className="mb-6">
          <div className="font-mono text-[19px] tracking-[0.35em] uppercase text-[#D4AF37]">
            GITHUB
          </div>
        </div>
      </Reveal>

      {/* Profile Header */}
      <Reveal delay={0.06}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full border border-[#262626] flex items-center justify-center bg-[#111]">
            <Github size={22} className="text-[#D4AF37]" strokeWidth={1.5} />
          </div>
          <div>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-lg text-[#F5F5F5] font-semibold hover:text-[#D4AF37] transition-colors"
            >
              @Tarannum2504
            </a>
            <p className="font-mono text-[13px] text-[#A1A1A1]">Contribution Activity</p>
          </div>
        </div>
      </Reveal>

      {/* Contribution Calendar */}
      <Reveal delay={0.1}>          <div className="border border-[#262626] rounded-2xl p-8 md:p-10 bg-[#111111]/30 gold-glow transition-all duration-300 overflow-x-auto scrollbar-none">
          <div className="min-w-[640px] md:min-w-0">
            <GitHubCalendar
              username="Tarannum2504"
              year="last"
              colorScheme="dark"
              theme={darkTheme}
              labels={labels}
              blockSize={12}
              blockMargin={4}
              fontSize={13}
              showTotalCount
            />
          </div>
        </div>
      </Reveal>

      {/* View GitHub Profile Button */}
      <div className="flex justify-center mt-10">
        <Reveal delay={0.14}>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#262626] rounded-full font-mono text-[16px] uppercase tracking-widest text-[#F5F5F5] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors duration-300 gold-glow lift cursor-pointer"
          >
            View GitHub Profile &rarr;
          </a>
        </Reveal>
      </div>
    </>
  );
};

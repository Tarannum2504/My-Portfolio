import React from "react";
import { Link } from "react-router-dom";
import { Github, ArrowUpRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { projects } from "../../data/projects";

export const ProjectPreview = () => {
  const featured = projects.slice(0, 3);

  return (
    <>
      <Reveal>
        <div className="mb-6">
          <div className="font-mono text-[19px] tracking-[0.35em] uppercase text-[#D4AF37]">
            PROJECTS
          </div>
        </div>
      </Reveal>

      {/* 3-Column Equal Height Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <div className="group border border-[#262626] hover:border-[#D4AF37]/35 rounded-2xl overflow-hidden bg-[#111111]/20 hover:bg-[#111111]/40 gold-glow transition-all duration-300 flex flex-col h-full justify-between">
              {/* Card Top: Graphic Block */}
              <div>
                <div className="bg-[#111111]/80 aspect-[16/10] flex items-center justify-center relative overflow-hidden border-b border-[#262626]/40">
                  <span className="font-display text-5xl text-[#262626] group-hover:text-[#D4AF37]/25 transition-colors duration-500 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/40 to-transparent" />
                </div>

                {/* Card Mid: Info */}
                <div className="p-6">
                  <p className="font-mono text-[13px] uppercase tracking-widest text-[#D4AF37] mb-2">{p.tag}</p>
                  <h3 className="font-display text-xl md:text-2xl text-[#F5F5F5] font-semibold mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {p.name}
                  </h3>
                  <p className="font-body text-[16px] md:text-[17px] leading-[1.6] text-[#A1A1A1]">
                    {p.desc}
                  </p>
                </div>
              </div>

              {/* Card Bottom: Tech + Links */}
              <div className="p-6 pt-0">
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {p.stack.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[14px] px-3.5 py-1.5 rounded-full border border-[#262626]/80 text-[#A1A1A1]/95 bg-[#111111]/10"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 border-t border-[#222]/30 pt-4">
                  {p.githubUrl && p.githubUrl !== "#" ? (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full border border-[#262626] font-mono text-[12px] uppercase tracking-widest text-[#F5F5F5] hover:text-[#D4AF37] hover:border-[#D4AF37]/45 transition-all duration-300 cursor-pointer"
                    >
                      <Github size={13} strokeWidth={1.5} /> Code
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full border border-[#262626]/30 font-mono text-[12px] uppercase tracking-widest text-[#444] cursor-not-allowed select-none">
                      <Github size={13} strokeWidth={1.5} /> Code
                    </span>
                  )}
                  {p.demoUrl && p.demoUrl !== "#" ? (
                    <a
                      href={p.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full border border-[#D4AF37]/30 font-mono text-[12px] uppercase tracking-widest text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 cursor-pointer"
                    >
                      Demo <ArrowUpRight size={13} strokeWidth={1.5} />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full border border-[#262626]/30 font-mono text-[12px] uppercase tracking-widest text-[#444] cursor-not-allowed select-none">
                      Demo <ArrowUpRight size={13} strokeWidth={1.5} />
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* View All CTA */}
      <div className="flex justify-center mt-14">
        <Reveal delay={0.2}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#262626] rounded-full font-mono text-[16px] uppercase tracking-widest text-[#F5F5F5] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors duration-300 gold-glow lift cursor-pointer"
          >
            View All Projects &rarr;
          </Link>
        </Reveal>
      </div>
    </>
  );
};

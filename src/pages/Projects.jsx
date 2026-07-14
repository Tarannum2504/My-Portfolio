import React from "react";
import { Github, ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { projects } from "../data/projects";
import { useSearch } from "../hooks/useSearch";
import { PageLayout } from "../components/PageLayout";

export const Projects = () => {
  const [query] = useSearch();

  const filteredProjects = projects.filter((p) => {
    if (!query) return true;
    const term = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(term) ||
      p.tag.toLowerCase().includes(term) ||
      p.desc.toLowerCase().includes(term) ||
      p.stack.some((s) => s.toLowerCase().includes(term))
    );
  });

  return (
    <PageLayout>
      {/* Heading */}
      <Reveal>
        <div className="mb-6">
          <div className="font-mono text-[19px] tracking-[0.35em] uppercase text-[#D4AF37] mb-6">
            PORTFOLIO
          </div>
          <p className="font-body text-[18px] text-[#A1A1A1] max-w-xl">
            A collection of projects in machine learning, data engineering, and interactive analytics.
          </p>
        </div>
      </Reveal>

      {query && (
        <Reveal delay={0.06}>
          <p className="font-mono text-[14px] text-[#666] mb-6">
            Showing results for &ldquo;{query}&rdquo;
          </p>
        </Reveal>
      )}

      {filteredProjects.length === 0 ? (
        <Reveal>
          <div className="text-center py-20 border border-[#262626] rounded-3xl bg-[#111111]/30">
            <p className="font-mono text-[#A1A1A1] text-lg">
              No projects found matching your search.
            </p>
          </div>
        </Reveal>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <div className="group border border-[#262626] hover:border-[#D4AF37]/30 rounded-2xl gold-glow transition-all duration-300 bg-[#111111]/30 flex flex-col h-full overflow-hidden">
                {/* Thumbnail Area */}
                <div className="aspect-[16/9] bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden border-b border-[#262626]/40">
                  {p.thumbnail ? (
                    <img
                      src={p.thumbnail}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="font-display text-6xl md:text-7xl font-bold text-[#1a1a1a] group-hover:text-[#D4AF37]/20 transition-colors duration-500 select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  {/* Top Section */}
                  <div>
                    {/* Category + Status Badge */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className="font-mono text-[12px] uppercase tracking-widest text-[#D4AF37] leading-relaxed">
                        {p.tag}
                      </span>
                      {p.status && (
                        <span className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-[#D4AF37]/80 bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-2.5 py-0.5 rounded-full">
                          {p.status}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl md:text-2xl text-[#F5F5F5] font-semibold mb-3 group-hover:text-[#D4AF37] transition-colors">
                      {p.name}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-[16px] leading-relaxed text-[#A1A1A1] mb-6">
                      {p.desc}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2.5 mb-6">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[13px] px-3 py-1.5 rounded-full border border-[#262626]/80 text-[#A1A1A1]/95 bg-[#111111]/10"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Buttons — pushed to bottom */}
                  <div className="flex items-center gap-4 mt-auto pt-2">
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#262626] font-mono text-[13px] uppercase tracking-widest text-[#F5F5F5] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all duration-300"
                    >
                      <Github size={14} strokeWidth={1.5} />
                      GitHub
                    </a>
                    {p.demoUrl && (
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D4AF37]/30 font-mono text-[13px] uppercase tracking-widest text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300"
                      >
                        <ArrowUpRight size={14} strokeWidth={1.5} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </PageLayout>
  );
};

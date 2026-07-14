import React, { useState } from "react";
import { Briefcase, Calendar, Code, Eye, FolderGit2 } from "lucide-react";
import { Reveal } from "../Reveal";
import { experience } from "../../data/portfolio";
import { CertificateModal } from "../CertificateModal/CertificateModal";

export const ExperienceSection = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <>
      <Reveal>
        <div className="mb-6">
          <div className="font-mono text-[19px] tracking-[0.35em] uppercase text-[#D4AF37]">
            EXPERIENCE
          </div>
        </div>
      </Reveal>

      <div className="w-full max-w-3xl space-y-8">
        {experience.map((exp, i) => (
          <Reveal key={exp.id} delay={i * 0.08}>
            <div className="group border border-[#262626] hover:border-[#D4AF37]/30 rounded-2xl overflow-hidden gold-glow transition-all duration-300">
              {/* Header */}
              <div className="p-8 md:p-12 bg-[#111111]/30">
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-14 h-14 rounded-full border border-[#262626] flex items-center justify-center shrink-0 bg-[#111] group-hover:border-[#D4AF37]/40 transition-colors">
                    <Briefcase size={24} className="text-[#D4AF37]" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    {/* Company & Duration */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-[#D4AF37]/60" strokeWidth={1.5} />
                        <p className="font-mono text-[14px] uppercase tracking-widest text-[#D4AF37]/80">
                          {exp.org}
                        </p>
                      </div>
                      <span className="font-mono text-[12px] text-[#666]">
                        {exp.period === "Present" ? "Current" : "Past"}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl text-[#F5F5F5] font-semibold mb-4 group-hover:text-[#D4AF37] transition-colors">
                      {exp.role}
                    </h2>
                    <p className="font-body text-[18px] leading-[1.7] text-[#A1A1A1]">
                      {exp.desc}
                    </p>
                  </div>
                </div>

                {/* Projects Worked On */}
                {exp.projects_worked && exp.projects_worked.length > 0 && (
                  <div className="mb-7">
                    <div className="flex items-center gap-2 mb-4">
                      <FolderGit2 size={14} className="text-[#D4AF37]" strokeWidth={1.5} />
                      <span className="font-mono text-[13px] uppercase tracking-widest text-[#666]">
                        Projects Worked On
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-5">
                      {exp.projects_worked.map((p) => (
                        <span
                          key={p}
                          className="font-mono text-[14px] px-4 py-2 rounded-full border border-[#262626]/80 text-[#A1A1A1]/95 bg-[#111111]/10"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies Used */}
                {exp.tech && exp.tech.length > 0 && (
                  <div className="mb-7">
                    <div className="flex items-center gap-2 mb-4">
                      <Code size={14} className="text-[#D4AF37]" strokeWidth={1.5} />
                      <span className="font-mono text-[13px] uppercase tracking-widest text-[#666]">
                        Technologies Used
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-5">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[14px] px-4 py-2 rounded-full border border-[#262626]/80 text-[#A1A1A1]/95 bg-[#111111]/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Contributions */}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div className="mb-7">
                    <span className="font-mono text-[13px] uppercase tracking-widest text-[#666] mb-4 block">
                      Key Contributions
                    </span>
                    <ul className="space-y-3">
                      {exp.responsibilities.map((r, idx) => (
                        <li key={idx} className="font-body text-[16px] text-[#A1A1A1] flex items-start gap-3">
                          <span className="text-[#D4AF37] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* View Credentials */}
              {exp.documents && exp.documents.length > 0 && (
                <div className="border-t border-[#262626]/40 px-8 md:px-12 py-6 bg-[#0a0a0a]/50">
                  <span className="font-mono text-[13px] uppercase tracking-widest text-[#666] mb-4 block">
                    View Credentials
                  </span>
                  <div className="flex flex-wrap gap-4">
                    {exp.documents.map((doc, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedDoc({ ...doc, title: doc.label, org: exp.org, year: "2025" })}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#262626] text-[#A1A1A1] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all cursor-pointer bg-[#111]/30"
                      >
                        <Eye size={14} strokeWidth={1.5} />
                        {doc.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      {selectedDoc && (
        <CertificateModal
          achievement={selectedDoc}
          onClose={() => setSelectedDoc(null)}
        />
      )}
    </>
  );
};

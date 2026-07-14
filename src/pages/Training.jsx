import React, { useState } from "react";
import { Download, Eye, BookOpen, Clock } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { trainings } from "../data/portfolio";
import { CertificateModal } from "../components/CertificateModal/CertificateModal";
import { PageLayout } from "../components/PageLayout";

export const Training = () => {
  const [selected, setSelected] = useState(null);

  const handleOpenPdf = (t) => {
    if (t.pdf) {
      window.open(t.pdf, "_blank");
    }
  };

  return (
    <PageLayout>
      {/* Heading */}
      <Reveal>
        <div className="mb-6">
          <div className="font-mono text-[19px] tracking-[0.35em] uppercase text-[#D4AF37] mb-6">
            TRAINING
          </div>
          <p className="font-body text-[18px] text-[#A1A1A1] max-w-xl">
            Instructor-led trainings, bootcamps, and workshops.
          </p>
        </div>
      </Reveal>

      {trainings.length === 0 ? (
        <Reveal>
          <div className="text-center py-20 border border-[#262626] rounded-3xl bg-[#111111]/30">
            <p className="font-mono text-[#A1A1A1] text-lg">No trainings yet.</p>
          </div>
        </Reveal>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainings.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.06}>
              <div className="group border border-[#262626] hover:border-[#D4AF37]/30 rounded-2xl overflow-hidden bg-[#111111]/30 gold-glow transition-all duration-300 flex flex-col h-full">
                {/* Preview Area — fixed height for consistent certificate rendering */}
                <div className="h-[240px] sm:h-[260px] bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden border-b border-[#262626]/40">
                  {t.thumbnail || t.image ? (
                    <img
                      src={t.thumbnail || t.image}
                      alt={t.title}
                      loading="lazy"
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <BookOpen size={48} className="text-[#333] group-hover:text-[#D4AF37]/30 transition-colors" strokeWidth={1} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t.status === "pursuing" && (
                    <div className="absolute top-3 right-3">
                      <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                        In Progress
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[12px] uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-2.5 py-0.5 rounded-full">
                        {t.org}
                      </span>
                      <span className="font-mono text-[13px] text-[#666]">{t.year}</span>
                    </div>
                    <h3 className="font-display text-lg text-[#F5F5F5] font-semibold mb-2 group-hover:text-[#D4AF37] transition-colors">
                      {t.title}
                    </h3>

                    {/* Duration */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <Clock size={13} className="text-[#D4AF37]/60" strokeWidth={1.5} />
                      <span className="font-mono text-[12px] text-[#888]">{t.duration}</span>
                    </div>

                    {t.description && (
                      <p className="font-body text-[14px] leading-relaxed text-[#888] mb-4">{t.description}</p>
                    )}

                    {/* Skills */}
                    {t.skills && t.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {t.skills.slice(0, 4).map((s) => (
                          <span
                            key={s}
                            className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-[#262626]/60 text-[#A1A1A1]/80"
                          >
                            {s}
                          </span>
                        ))}
                        {t.skills.length > 4 && (
                          <span className="font-mono text-[11px] text-[#666]">+{t.skills.length - 4}</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 border-t border-[#222]/30 pt-4">
                    {t.status === "pursuing" ? (
                      <span className="font-mono text-[14px] uppercase tracking-widest text-[#555]">
                        Certificate pending
                      </span>
                    ) : t.pdf ? (
                      <button
                        onClick={() => handleOpenPdf(t)}
                        className="inline-flex items-center gap-1.5 font-mono text-[14px] uppercase tracking-widest text-[#F5F5F5] hover:text-[#D4AF37] transition-colors cursor-pointer"
                      >
                        <Eye size={13} strokeWidth={1.5} /> View Certificate
                      </button>
                    ) : t.image ? (
                      <button
                        onClick={() => setSelected(t)}
                        className="inline-flex items-center gap-1.5 font-mono text-[14px] uppercase tracking-widest text-[#F5F5F5] hover:text-[#D4AF37] transition-colors cursor-pointer"
                      >
                        <Eye size={13} strokeWidth={1.5} /> View Certificate
                      </button>
                    ) : (
                      <span className="font-mono text-[14px] uppercase tracking-widest text-[#555]">
                        No certificate
                      </span>
                    )}
                    {t.image && !t.pdf && t.status !== "pursuing" && (
                      <a
                        href={t.image}
                        download
                        className="inline-flex items-center gap-1.5 font-mono text-[14px] uppercase tracking-widest text-[#F5F5F5] hover:text-[#D4AF37] transition-colors"
                      >
                        <Download size={13} strokeWidth={1.5} /> Download
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {selected && (
        <CertificateModal
          achievement={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </PageLayout>
  );
};

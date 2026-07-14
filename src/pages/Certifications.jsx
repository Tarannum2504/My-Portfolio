import React, { useState } from "react";
import { Download, Eye, FileText } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { certifications } from "../data/portfolio";
import { CertificateModal } from "../components/CertificateModal/CertificateModal";
import { PageLayout } from "../components/PageLayout";

const CATEGORIES = ["All", ...new Set(certifications.map((c) => c.subcategory))];

export const Certifications = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCert, setSelectedCert] = useState(null);

  const filtered =
    activeCategory === "All"
      ? certifications
      : certifications.filter((c) => c.subcategory === activeCategory);

  const handleOpenPdf = (cert) => {
    if (cert.pdf) {
      window.open(cert.pdf, "_blank");
    }
  };

  const pillClass = (cat) =>
    `px-4 py-2 rounded-full text-[13px] font-mono tracking-wider uppercase border transition-all cursor-pointer ${
      activeCategory === cat
        ? "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10"
        : "border-[#222] text-[#666] hover:border-[#444] hover:text-[#999]"
    }`;

  return (
    <PageLayout>
      {/* Heading */}
      <Reveal>
        <div className="mb-6">
          <div className="font-mono text-[19px] tracking-[0.35em] uppercase text-[#D4AF37] mb-6">
            CERTIFICATIONS
          </div>
          <p className="font-body text-[18px] text-[#A1A1A1] max-w-xl">
            Professional course certifications from NPTEL, Infosys Springboard, and Forage.
          </p>
        </div>
      </Reveal>

      {/* Category Filters */}
      <Reveal delay={0.05}>
        <div className="flex flex-wrap gap-3 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={pillClass(cat)}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Grid */}
      {filtered.length === 0 ? (
        <Reveal>
          <div className="text-center py-20 border border-[#262626] rounded-3xl bg-[#111111]/30">
            <p className="font-mono text-[#A1A1A1] text-lg">No certifications found in this category.</p>
          </div>
        </Reveal>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.06}>
              <div className="group border border-[#262626] hover:border-[#D4AF37]/30 rounded-2xl overflow-hidden bg-[#111111]/30 gold-glow transition-all duration-300 flex flex-col h-full">
                {/* Preview Area — fixed height for consistent certificate rendering */}
                <div className="h-[240px] sm:h-[260px] bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden border-b border-[#262626]/40">
                  {cert.thumbnail || cert.image ? (
                    <img
                      src={cert.thumbnail || cert.image}
                      alt={cert.title}
                      loading="lazy"
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <FileText size={48} className="text-[#333] group-hover:text-[#D4AF37]/30 transition-colors" strokeWidth={1} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[12px] uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-2.5 py-0.5 rounded-full">
                        {cert.subcategory}
                      </span>
                      <span className="font-mono text-[13px] text-[#666]">{cert.year}</span>
                    </div>
                    <h3 className="font-display text-lg text-[#F5F5F5] font-semibold mb-1 group-hover:text-[#D4AF37] transition-colors">
                      {cert.title}
                    </h3>
                    <p className="font-body text-[15px] text-[#A1A1A1] mb-4">{cert.org}</p>
                    {cert.description && (
                      <p className="font-body text-[14px] leading-relaxed text-[#888] mb-4">{cert.description}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 border-t border-[#222]/30 pt-4">
                    {cert.pdf ? (
                      <button
                        onClick={() => handleOpenPdf(cert)}
                        className="inline-flex items-center gap-1.5 font-mono text-[14px] uppercase tracking-widest text-[#F5F5F5] hover:text-[#D4AF37] transition-colors cursor-pointer"
                      >
                        <Eye size={13} strokeWidth={1.5} /> View Certificate
                      </button>
                    ) : cert.image ? (
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="inline-flex items-center gap-1.5 font-mono text-[14px] uppercase tracking-widest text-[#F5F5F5] hover:text-[#D4AF37] transition-colors cursor-pointer"
                      >
                        <Eye size={13} strokeWidth={1.5} /> Preview
                      </button>
                    ) : (
                      <span className="font-mono text-[14px] uppercase tracking-widest text-[#555]">
                        No certificate
                      </span>
                    )}
                    {cert.image && !cert.pdf && (
                      <a
                        href={cert.image}
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

      {selectedCert && (
        <CertificateModal
          achievement={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </PageLayout>
  );
};

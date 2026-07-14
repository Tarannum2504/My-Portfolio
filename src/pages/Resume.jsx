import React, { useState } from "react";
import { Download, FileText, Eye } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { PageLayout } from "../components/PageLayout";

export const Resume = () => {
  const [loadError, setLoadError] = useState(false);

  return (
    <PageLayout>
      <Reveal>
        <div className="mb-6">
          <div className="font-mono text-[19px] tracking-[0.35em] uppercase text-[#D4AF37] mb-6">
            RESUME
          </div>
          <p className="font-body text-[18px] text-[#A1A1A1] max-w-xl">
            Download my resume or preview it directly in your browser.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="flex flex-wrap gap-4 mb-10">
          <a
            href="/RESUME.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D4AF37]/50 text-[#080808] font-mono text-[16px] uppercase tracking-widest font-medium hover:bg-[#D4AF37]/75 transition-colors cursor-pointer"
          >
            <Download size={16} strokeWidth={1.5} />
            Download Resume
          </a>
          <a
            href="/RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#262626] text-[#F5F5F5] font-mono text-[16px] uppercase tracking-widest hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            <Eye size={16} strokeWidth={1.5} />
            Open in Browser
          </a>
        </div>
      </Reveal>

      {/* PDF Preview */}
      <Reveal delay={0.12}>
        <div className="border border-[#262626] rounded-2xl overflow-hidden bg-[#111111]/20">
          {loadError ? (
            <div className="flex flex-col items-center justify-center py-20 px-6">
              <FileText size={64} className="text-[#333] mb-6" strokeWidth={1} />
              <p className="font-body text-[#A1A1A1] text-lg mb-2">Resume preview unavailable</p>
              <p className="font-mono text-[14px] text-[#666] mb-6">
                Your browser may not support inline PDF preview.
              </p>
              <a
                href="/RESUME.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D4AF37] text-[#080808] font-mono text-[16px] uppercase tracking-widest font-medium hover:bg-[#e6c358] transition-colors cursor-pointer"
              >
                <Download size={16} strokeWidth={1.5} />
                Download Instead
              </a>
            </div>
          ) : (
            <iframe
              src="/RESUME.pdf"
              className="w-full h-[85vh] md:h-[80vh]"
              title="Resume Preview"
              onError={() => setLoadError(true)}
            />
          )}
        </div>
      </Reveal>
    </PageLayout>
  );
};

import React from "react";
import { Mail, MapPin, Download, Github, Linkedin } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { PageLayout } from "../components/PageLayout";
import { socialLinks } from "../data/portfolio";

export const Contact = () => {
  return (
    <PageLayout>
      <Reveal>
        <div className="mb-6">
          <div className="font-mono text-[19px] tracking-[0.35em] uppercase text-[#D4AF37] mb-6">
            CONTACT
          </div>
          <p className="font-body text-[18px] text-[#A1A1A1] max-w-xl">
            Let&apos;s connect. Reach out via email, LinkedIn, or GitHub.
          </p>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Reveal delay={0.06}>
          <a
            href={`mailto:${socialLinks.email}`}
            className="group block border border-[#262626] hover:border-[#D4AF37]/30 rounded-2xl p-6 bg-[#111111]/30 gold-glow transition-all duration-300 h-full"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
              <Mail size={22} strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-lg text-[#F5F5F5] font-semibold mb-1 group-hover:text-[#D4AF37] transition-colors">
              Email
            </h3>
            <p className="font-body text-[16px] text-[#A1A1A1] break-all">{socialLinks.email}</p>
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border border-[#262626] hover:border-[#D4AF37]/30 rounded-2xl p-6 bg-[#111111]/30 gold-glow transition-all duration-300 h-full"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
              <Linkedin size={22} strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-lg text-[#F5F5F5] font-semibold mb-1 group-hover:text-[#D4AF37] transition-colors">
              LinkedIn
            </h3>
            <p className="font-body text-[16px] text-[#A1A1A1]">/in/tarannum2504</p>
          </a>
        </Reveal>

        <Reveal delay={0.14}>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border border-[#262626] hover:border-[#D4AF37]/30 rounded-2xl p-6 bg-[#111111]/30 gold-glow transition-all duration-300 h-full"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
              <Github size={22} strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-lg text-[#F5F5F5] font-semibold mb-1 group-hover:text-[#D4AF37] transition-colors">
              GitHub
            </h3>
            <p className="font-body text-[16px] text-[#A1A1A1]">@Tarannum2504</p>
          </a>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="group block border border-[#262626] rounded-2xl p-6 bg-[#111111]/30 transition-all duration-300 h-full">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-4">
              <MapPin size={22} strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-lg text-[#F5F5F5] font-semibold mb-1">Location</h3>
            <p className="font-body text-[16px] text-[#A1A1A1]">{socialLinks.location}</p>
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <a
            href={socialLinks.resume}
            download
            className="group block border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-2xl p-6 bg-[#D4AF37]/5 gold-glow transition-all duration-300 h-full"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
              <Download size={22} strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-lg text-[#F5F5F5] font-semibold mb-1 group-hover:text-[#D4AF37] transition-colors">
              Download Resume
            </h3>
            <p className="font-body text-[16px] text-[#A1A1A1]">PDF &middot; {socialLinks.location}</p>
          </a>
        </Reveal>
      </div>
    </PageLayout>
  );
};

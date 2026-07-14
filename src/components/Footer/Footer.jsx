import React from "react";
import { Mail, Github, Linkedin, MapPin, Download } from "lucide-react";
import { socialLinks } from "../../data/portfolio";

export const Footer = () => (
  <footer className="w-full border-t border-[#262626]">
    <div className="site-container py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left - Name */}
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-bold text-[#F5F5F5]">Tarannum Khan</p>
          <p className="font-mono text-[11px] text-[#A1A1A1] tracking-widest mt-1">
            Data &amp; AI, deliberately.
          </p>
        </div>

        {/* Center - Links */}
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${socialLinks.email}`}
            className="group flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-[#888] hover:text-[#D4AF37] transition-colors"
          >
            <Mail size={14} className="group-hover:text-[#D4AF37]" strokeWidth={1.5} />
            <span className="hidden sm:inline">Email</span>
          </a>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-[#888] hover:text-[#D4AF37] transition-colors"
          >
            <Github size={14} className="group-hover:text-[#D4AF37]" strokeWidth={1.5} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-[#888] hover:text-[#D4AF37] transition-colors"
          >
            <Linkedin size={14} className="group-hover:text-[#D4AF37]" strokeWidth={1.5} />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <span className="hidden md:flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-[#666]">
            <MapPin size={14} strokeWidth={1.5} />
            {socialLinks.location}
          </span>
        </div>

        {/* Right - Resume */}
        <a
          href={socialLinks.resume}
          download
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D4AF37]/30 text-[12px] font-mono uppercase tracking-widest text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
        >
          <Download size={13} strokeWidth={1.5} />
          Resume
        </a>
      </div>

      {/* Bottom */}
      <div className="mt-8 pt-6 border-t border-[#262626]/40 text-center">
        <p className="font-mono text-[10px] text-[#555] tracking-widest">
          &copy; {new Date().getFullYear()} Tarannum Khan
        </p>
      </div>
    </div>
  </footer>
);

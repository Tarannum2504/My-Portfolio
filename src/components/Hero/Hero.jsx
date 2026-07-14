import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, FileText } from "lucide-react";
import { ROLES } from "../../utils/constants";

const heroFadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

const TypewriterRotator = () => {
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = ROLES[idx];
    let timeout;

    if (!isDeleting && charIdx < currentText.length) {
      // Typing forward
      timeout = setTimeout(() => setCharIdx((c) => c + 1), 60);
    } else if (!isDeleting && charIdx === currentText.length) {
      // Pause at end before deleting
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIdx > 0) {
      // Deleting backward
      timeout = setTimeout(() => setCharIdx((c) => c - 1), 30);
    } else if (isDeleting && charIdx === 0) {
      // Move to next role
      setIsDeleting(false);
      setIdx((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [idx, charIdx, isDeleting]);

  return (
    <div className="h-8 md:h-10 relative">
      <span className="font-mono text-base md:text-lg text-[#D4AF37]">
        {ROLES[idx].substring(0, charIdx)}
        <span className="inline-block w-[2px] h-[1em] bg-[#D4AF37] ml-0.5 animate-pulse align-middle" />
      </span>
    </div>
  );
};

export const Hero = () => {
  return (
    <section className="pt-[100px] pb-20" style={{ background: "#080808" }}>
      <div className="site-container grid md:grid-cols-[40%_60%] gap-12 lg:gap-[80px] items-center">
        {/* Portrait */}
        <motion.div {...heroFadeUp(0.2)} className="flex justify-center md:justify-center">
          <div className="hero-float">
            <img
              src="/portrait.png"
              alt="Tarannum Khan"
              loading="lazy"
              className="w-64 md:w-[350px] md:h-[480px] object-cover object-top rounded-[1.6rem]"
              style={{
                boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 60px -10px rgba(212,175,55,0.08)",
              }}
            />
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          {/* Label */}
          <motion.p
            {...heroFadeUp(0.3)}
            className="font-mono text-[15px] tracking-[0.3em] uppercase text-[#D4AF37] mb-8"
          >
            DATA &bull; AI &bull; ANALYTICS
          </motion.p>

          {/* Name */}
          <motion.h1
            {...heroFadeUp(0.35)}
            className="font-display text-6xl md:text-[85px] font-bold text-[#F5F5F5] tracking-tight mb-6"
            style={{ lineHeight: 0.9 }}
          >
            Tarannum
            <br />
            Khan
          </motion.h1>

          {/* Typewriter Roles */}
          <motion.div {...heroFadeUp(0.4)} className="mb-10">
            <TypewriterRotator />
          </motion.div>

          {/* Description */}
          <motion.p
            {...heroFadeUp(0.5)}
            className="font-body text-[18px] leading-relaxed text-[#9A9A9A] mb-12 max-w-xl"
          >
            Building AI-powered analytics and data solutions that transform complex datasets into meaningful
            insights. Passionate about machine learning, data visualization, and creating intelligent tools that solve
            real-world problems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div {...heroFadeUp(0.6)} className="flex flex-wrap gap-4 mb-12 relative">
            <a
              href="/RESUME.pdf"
              download
              className="group relative font-mono text-[16px] tracking-widest uppercase px-7 py-3.5 rounded-full bg-[#D4AF37]/50 text-[#080808] font-medium transition-colors lift cursor-pointer inline-flex items-center gap-2"
            >
              Download Resume
            </a>
            <Link
              to="/projects"
              className="group relative font-mono text-[16px] tracking-widest uppercase px-7 py-3.5 rounded-full border border-[#262626] text-[#F5F5F5] gold-glow lift"
            >
              Featured Work
            </Link>
            <Link
              to="/contact"
              className="group relative font-mono text-[16px] tracking-widest uppercase px-7 py-3.5 rounded-full border border-[#262626] text-[#F5F5F5] gold-glow lift"
            >
              Let&rsquo;s Connect
            </Link>
          </motion.div>

          {/* Social Icons */}
          <motion.div {...heroFadeUp(0.7)} className="flex items-center gap-5">
            {[
              { Icon: Github, href: "https://github.com/Tarannum2504" },
              { Icon: Linkedin, href: "https://linkedin.com/in/tarannum2504" },
              { Icon: Instagram, href: "https://instagram.com/infera.labs" },
              { Icon: Mail, href: "mailto:tarannum.k2504@gmail.com" },
              { Icon: FileText, href: "/RESUME.pdf", download: true },
            ].map(({ Icon, href, download: isDownload }, i) => (
              <a
                key={i}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                download={isDownload ? true : undefined}
                className="w-11 h-11 rounded-full border border-[#262626] flex items-center justify-center text-[#9A9A9A] hover:text-[#D4AF37] hover:-translate-y-1 gold-glow transition-all duration-300 cursor-pointer"
              >
                <Icon size={18} strokeWidth={1.5} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

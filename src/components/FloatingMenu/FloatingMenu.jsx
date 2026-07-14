import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export const FloatingMenu = ({ isOpen, onClose }) => {
  const [moreOpen, setMoreOpen] = useState(false);

  if (!isOpen) return null;

  const itemClass = ({ isActive }) =>
    `block w-full text-left px-5 py-3 rounded-lg font-mono text-[16px] uppercase tracking-wider transition-all duration-300 ${
      isActive
        ? "text-[#D4AF37] bg-[#D4AF37]/5 border-l-2 border-[#D4AF37]"
        : "text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-[#1a1a1a]/55"
    }`;

  const subItemClass = ({ isActive }) =>
    `block w-full text-left pl-8 pr-4 py-2.5 rounded-lg font-mono text-[16px] uppercase tracking-wider transition-all duration-300 ${
      isActive
        ? "text-[#D4AF37] bg-[#D4AF37]/5 border-l border-[#D4AF37]"
        : "text-[#888] hover:text-[#F5F5F5] hover:bg-[#1a1a1a]/40"
    }`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-20 right-5 md:right-10 w-64 bg-[#0B0B0B]/95 border border-[#222] backdrop-blur-md rounded-2xl p-3 shadow-2xl z-50 flex flex-col gap-1.5"
        style={{ transformOrigin: "top right" }}
      >
        {/* Main Links */}
        <NavLink to="/" onClick={onClose} className={itemClass}>
          Home
        </NavLink>
        <NavLink to="/projects" onClick={onClose} className={itemClass}>
          Projects
        </NavLink>

        {/* More Accordion */}
        <div>
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className="w-full flex items-center justify-between px-5 py-3 rounded-lg font-mono text-[16px] uppercase tracking-wider text-[#A1A1A1] hover:text-[#F5F5F5] hover:bg-[#1a1a1a]/55 transition-all duration-300 cursor-pointer"
          >
            <span>More</span>
            {moreOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          <AnimatePresence>
            {moreOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden flex flex-col gap-1 mt-1"
              >
                <NavLink to="/training" onClick={onClose} className={subItemClass}>
                  Training
                </NavLink>
                <NavLink to="/certifications" onClick={onClose} className={subItemClass}>
                  Certifications
                </NavLink>
                <NavLink to="/achievements" onClick={onClose} className={subItemClass}>
                  Achievements
                </NavLink>
                <NavLink to="/infera-ai" onClick={onClose} className={subItemClass}>
                  Infera AI
                </NavLink>
                <NavLink to="/resume" onClick={onClose} className={subItemClass}>
                  Resume
                </NavLink>
                <NavLink to="/contact" onClick={onClose} className={subItemClass}>
                  Contact
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
};

export const Quote = () => (
  <div className="site-container py-[88px]">
    <motion.div {...fadeUp}>
      <div className="h-px bg-[#1a1a1a] w-full mb-8" />
      <p className="text-center font-display italic text-sm md:text-base text-[#9A9A9A]/70 tracking-wide mb-2">
        &ldquo;Turning Data into Meaningful Insights.&rdquo;
      </p>
      <p className="text-center font-mono text-sm text-[#D4AF37]/80 tracking-wider">
        &mdash; Tarannum Khan
      </p>
    </motion.div>
  </div>
);

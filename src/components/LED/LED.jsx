import React from "react";
import { motion } from "framer-motion";
import { LEDDisplay } from "./LEDDisplay";
import { LED_DEFAULTS } from "../../utils/constants";
import "./led.css";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export const LED = () => {
  return (
    <div className="w-full bg-[#080808]">
      <motion.div {...fadeUp} className="pt-[120px] pb-[80px]">
        <div className="site-container">
          {/* LED Signboard Panel */}
          <div className="relative rounded-2xl border border-[#1a1a1a] bg-[#050505] p-1.5 shadow-2xl">
            {/* Height: responsive with no overflow clipping */}
            <div className="relative w-full h-[100px] sm:h-[120px] md:h-[140px] rounded-xl">
              {/* Subtle scanline overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.035] led-scanlines z-10" />

              <LEDDisplay
                message={LED_DEFAULTS.message}
                color={LED_DEFAULTS.color}
                brightness={LED_DEFAULTS.brightness}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

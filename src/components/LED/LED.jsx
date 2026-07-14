import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings } from "lucide-react";
import { LEDDisplay } from "./LEDDisplay";
import { LEDConfig } from "./LEDConfig";
import { LED_DEFAULTS } from "../../utils/constants";
import "./led.css";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export const LED = () => {
  const [ledCfg, setLedCfg] = useState({ ...LED_DEFAULTS });
  const [ledDraft, setLedDraft] = useState({ ...LED_DEFAULTS });
  const [panelOpen, setPanelOpen] = useState(false);

  const applyLed = () => setLedCfg({ ...ledDraft });
  const resetLed = () => {
    setLedDraft({ ...LED_DEFAULTS });
    setLedCfg({ ...LED_DEFAULTS });
  };
  const updateDraft = (patch) => {
    const next = { ...ledDraft, ...patch };
    setLedDraft(next);
    setLedCfg(next);
  };

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
                message={ledCfg.message}
                color={ledCfg.color}
                brightness={ledCfg.brightness}
              />

              {/* Personalize Button */}
              <button
                onClick={() => setPanelOpen((o) => !o)}
                className="absolute top-2 right-2 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#222]/80 bg-[#0B0B0B]/90 text-[9px] font-mono uppercase tracking-widest text-[#666] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:bg-[#0B0B0B] transition-all cursor-pointer shadow-lg"
              >
                <Settings size={10} strokeWidth={1.5} />
                Personalize
              </button>
            </div>
          </div>

          {/* Personalize Setup Control Drawer */}
          <AnimatePresence>
            {panelOpen && (
              <LEDConfig
                cfg={ledDraft}
                onChange={updateDraft}
                onReset={resetLed}
                onApply={() => {
                  applyLed();
                  setPanelOpen(false);
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

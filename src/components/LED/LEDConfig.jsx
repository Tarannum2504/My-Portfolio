import React from "react";
import { motion } from "framer-motion";
import { LED_PALETTES, LED_QUOTES } from "../../utils/constants";

export const LEDConfig = ({ cfg, onChange, onReset, onApply }) => {
  const colors = Object.keys(LED_PALETTES);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden bg-[#0a0a0a] border-t border-[#1a1a1a] mt-2 rounded-b-2xl"
    >
      <div className="max-w-4xl mx-auto px-6 py-6 grid sm:grid-cols-2 gap-6 text-[#999]">
        {/* Color */}
        <div>
          <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-[#666] mb-3">Color</p>
          <div className="flex flex-wrap gap-2 items-center">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => onChange({ color: c })}
                className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                  cfg.color === c ? "border-[#F5F5F5] scale-110" : "border-[#333] hover:border-[#555]"
                }`}
                style={{ background: LED_PALETTES[c].on }}
                aria-label={c}
              />
            ))}
          </div>
        </div>

        {/* Brightness */}
        <div>
          <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-[#666] mb-3">
            Brightness ({cfg.brightness ?? 1.0})
          </p>
          <div className="flex items-center gap-3 mt-2">
            <input
              type="range"
              min="0.2"
              max="1.5"
              step="0.1"
              value={cfg.brightness ?? 1.0}
              onChange={(e) => onChange({ brightness: parseFloat(e.target.value) })}
              className="w-full h-1 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
          </div>
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-[#666] mb-3">Message</p>
          <select
            value={LED_QUOTES.includes(cfg.message) ? cfg.message : "__custom"}
            onChange={(e) => {
              if (e.target.value !== "__custom") onChange({ message: e.target.value });
            }}
            className="w-full bg-[#0e0e0e] border border-[#222] rounded-lg px-4 py-2.5 text-[14px] font-mono text-[#999] outline-none focus:border-[#D4AF37]/40 transition-colors mb-3 appearance-none cursor-pointer"
          >
            {LED_QUOTES.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
            <option value="__custom">Custom...</option>
          </select>
          <input
            type="text"
            maxLength={40}
            value={cfg.message}
            onChange={(e) => onChange({ message: e.target.value.toUpperCase() })}
            placeholder="CUSTOM MESSAGE (40 CHARS MAX)"
            className="w-full bg-[#0e0e0e] border border-[#222] rounded-lg px-4 py-2.5 text-[14px] font-mono text-[#999] placeholder-[#444] outline-none focus:border-[#D4AF37]/40 transition-colors"
          />
        </div>

        {/* Actions */}
        <div className="flex items-end gap-3 justify-end sm:col-span-2 border-t border-[#1a1a1a] pt-4 mt-2">
          <button
            onClick={onReset}
            className="px-6 py-2.5 rounded-full border border-[#222] text-[13px] font-mono uppercase tracking-widest text-[#666] hover:border-[#444] hover:text-[#999] transition-colors cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={onApply}
            className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#080808] text-[13px] font-mono uppercase tracking-widest font-medium hover:bg-[#e6c358] transition-colors cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>
    </motion.div>
  );
};

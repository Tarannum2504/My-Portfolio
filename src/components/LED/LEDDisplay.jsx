import React, { useEffect, useRef } from "react";
import { LED_PALETTES } from "../../utils/constants";

export const LEDDisplay = React.memo(function LEDDisplay({ message, color, brightness = 1.0 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pal = LED_PALETTES[color] || LED_PALETTES.Amber;

    function render() {
      const rect = canvas.getBoundingClientRect();
      const cw = rect.width;
      const ch = rect.height;
      if (cw === 0 || ch === 0) return;

      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.ceil(cw * dpr);
      canvas.height = Math.ceil(ch * dpr);
      canvas.style.width = cw + "px";
      canvas.style.height = ch + "px";

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      ctx.save();
      ctx.scale(dpr, dpr);

      // Deep matte black background
      ctx.fillStyle = "#010101";
      ctx.fillRect(0, 0, cw, ch);

      // --- Step 1: Render text to offscreen canvas at optimal size ---
      const temp = document.createElement("canvas");
      const tc = temp.getContext("2d");
      if (!tc) { ctx.restore(); return; }

      // Calculate best font size: start at 72% of height, scale down if too wide
      const maxTextWidth = cw * 0.88;
      let fontSize = ch * 0.72;

      tc.font = "900 " + fontSize + 'px "Courier New", monospace';
      let measure = tc.measureText(message);

      if (measure.width > maxTextWidth) {
        fontSize *= maxTextWidth / measure.width;
        tc.font = "900 " + fontSize + 'px "Courier New", monospace';
        measure = tc.measureText(message);
      }

      // Render text to temp canvas
      const textW = Math.ceil(measure.width);
      const textH = Math.ceil(fontSize * 1.15);
      temp.width = Math.max(1, textW);
      temp.height = Math.max(1, textH);

      tc.fillStyle = "#000000";
      tc.fillRect(0, 0, temp.width, temp.height);
      tc.font = "900 " + fontSize + 'px "Courier New", monospace';
      tc.fillStyle = "#FFFFFF";
      tc.textBaseline = "top";
      tc.textAlign = "left";
      tc.fillText(message, 0, 0);

      // Get pixel data for dot sampling
      const imgData = tc.getImageData(0, 0, temp.width, temp.height);
      const pixels = imgData.data;

      // --- Step 2: Calculate dot grid ---
      const charsInMessage = message.length || 1;
      const targetDotsPerChar = 7;
      const totalDotCols = Math.min(
        Math.floor(cw / 3),
        charsInMessage * targetDotsPerChar + 8
      );
      const dotSpacing = cw / totalDotCols;
      const dotRows = Math.min(Math.floor(ch / dotSpacing), Math.floor(ch / 2.5));

      // Center the dot grid in the canvas
      const gridPixelW = totalDotCols * dotSpacing;
      const gridPixelH = dotRows * dotSpacing;
      const offsetX = (cw - gridPixelW) / 2 + dotSpacing / 2;
      const offsetY = (ch - gridPixelH) / 2 + dotSpacing / 2;

      const dotRadius = dotSpacing * 0.38;

      // --- Step 3: Render dots ---
      for (let r = 0; r < dotRows; r++) {
        for (let c = 0; c < totalDotCols; c++) {
          // Map grid position to temp canvas pixel
          const tx = Math.floor((c / totalDotCols) * temp.width);
          const ty = Math.floor((r / dotRows) * temp.height);

          const clampedTx = Math.min(tx, temp.width - 1);
          const clampedTy = Math.min(ty, temp.height - 1);
          const idx = (clampedTy * temp.width + clampedTx) * 4;
          const isLit = pixels[idx] > 128;

          const x = offsetX + c * dotSpacing;
          const y = offsetY + r * dotSpacing;

          // 1. Background LED dot (always drawn)
          ctx.fillStyle = "#0c0c0c";
          ctx.beginPath();
          ctx.arc(x, y, dotRadius * 1.1, 0, Math.PI * 2);
          ctx.fill();

          if (isLit) {
            // 2. Subtle glow
            ctx.fillStyle = pal.glow;
            ctx.globalAlpha = 0.1 * brightness;
            ctx.beginPath();
            ctx.arc(x, y, dotRadius * 1.5, 0, Math.PI * 2);
            ctx.fill();

            // 3. Main colored LED dot
            ctx.fillStyle = pal.on;
            ctx.globalAlpha = brightness;
            ctx.beginPath();
            ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
            ctx.fill();

            // 4. White core highlight
            ctx.fillStyle = "#FFFFFF";
            ctx.globalAlpha = brightness * 0.85;
            ctx.beginPath();
            ctx.arc(x, y, dotRadius * 0.38, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Dim off-state dot
            ctx.fillStyle = "#151515";
            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.arc(x, y, dotRadius * 0.42, 0, Math.PI * 2);
            ctx.fill();

            // Faint color tint
            ctx.fillStyle = color === "Amber" ? "rgba(255,159,0,0.055)" : "rgba(100,100,100,0.03)";
            ctx.beginPath();
            ctx.arc(x, y, dotRadius * 0.42, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.restore();
    }

    // Initial render
    render();

    // Re-render on resize
    const ro = new ResizeObserver(() => render());
    ro.observe(canvas);

    return () => {
      ro.disconnect();
    };
  }, [message, color, brightness]);

  return <canvas ref={canvasRef} className="block w-full h-full rounded-xl bg-black" />;
});

import React from "react";

export const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

    .font-display { font-family: 'Space Grotesk', sans-serif; }
    .font-body { font-family: 'Inter', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }

    @keyframes floatY { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
    .float-anim { animation: floatY 6s ease-in-out infinite; }

    @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
    .blink-cursor { animation: blink 1s step-end infinite; }

    @keyframes ledPulse { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
    .led-pulse { animation: ledPulse 2.4s ease-in-out infinite; }

    @keyframes fadeUp { from { opacity:0; transform: translateY(24px); } to { opacity:1; transform: translateY(0); } }
    .reveal { animation: fadeUp .8s cubic-bezier(.22,1,.36,1) both; }

    @media (prefers-reduced-motion: reduce) {
      .float-anim, .blink-cursor, .led-pulse, .reveal { animation: none !important; }
    }

    ::selection { background: #D4AF37; color: #0B0B0B; }
    .gold-glow { transition: box-shadow .4s ease, border-color .4s ease, transform .3s ease; }
    .gold-glow:hover { box-shadow: 0 0 0 1px rgba(212,175,55,0.35), 0 8px 30px rgba(212,175,55,0.12); border-color: #D4AF37; }
    .lift:hover { transform: translateY(-4px); }
    .scrollbar-none::-webkit-scrollbar { display: none; }

    @keyframes heroFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    .hero-float { animation: heroFloat 6s ease-in-out infinite; }

    @keyframes roleReveal { 0% { opacity:0; transform:translateY(12px); } 100% { opacity:1; transform:translateY(0); } }
    .role-reveal { animation: roleReveal .5s cubic-bezier(.22,1,.36,1) both; }
  `}</style>
);

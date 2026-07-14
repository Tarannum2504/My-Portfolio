import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  Github, Linkedin, Instagram, Mail, Phone, FileText, Menu, X,
  ArrowUpRight, Star, GitFork, BookOpen, Send, Sparkles, ChevronRight,
  Search, Settings, Sun, Moon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ----------------------------------------------------------------
   Fonts — Space Grotesk (display), Inter (body), JetBrains Mono (mono)
------------------------------------------------------------------- */
const FontLoader = () => (
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

/* ----------------------------------------------------------------
   Reveal-on-scroll hook
------------------------------------------------------------------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .8s cubic-bezier(.22,1,.36,1) ${delay}s, transform .8s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

/* ----------------------------------------------------------------
   Section label — eyebrow + heading
------------------------------------------------------------------- */
const SectionHead = ({ eyebrow, title, sub }) => (
  <div className="mb-14">
    <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] mb-4">{eyebrow}</div>
    <h2 className="font-display text-3xl md:text-5xl font-medium text-[#F5F5F5] tracking-tight">{title}</h2>
    {sub && <p className="font-body text-[#A1A1A1] mt-4 max-w-xl text-[15px] leading-relaxed">{sub}</p>}
  </div>
);

/* ================================================================
   TOP BAR — transparent fixed navigation
================================================================= */
const TopBar = ({ onOpenNav }) => {
  const [themeIcon, setThemeIcon] = useState("dark");
  return (
    <div className="fixed top-0 left-0 right-0 z-40 px-5 md:px-10 py-4 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="font-display text-xl font-bold text-[#F5F5F5] tracking-tight hover:text-[#D4AF37] transition-colors"
        >
          TK
        </a>

        {/* Search */}
        <div className="hidden md:flex items-center flex-1 max-w-[240px] mx-8">
          <div className="relative w-full">
            <Search
              size={13}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#666]"
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder="Search Projects..."
              className="w-full bg-[#111]/70 border border-[#222] rounded-full pl-9 pr-4 py-[7px] text-[11px] font-mono text-[#999] placeholder-[#555] outline-none focus:border-[#D4AF37]/40 transition-colors"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setThemeIcon((t) => (t === "dark" ? "light" : "dark"))
            }
            className="w-8 h-8 rounded-full border border-[#222] flex items-center justify-center text-[#666] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors"
            aria-label="Toggle theme"
          >
            {themeIcon === "dark" ? (
              <Sun size={13} strokeWidth={1.5} />
            ) : (
              <Moon size={13} strokeWidth={1.5} />
            )}
          </button>
          <button
            onClick={onOpenNav}
            aria-label="Open menu"
            className="w-8 h-8 rounded-full border border-[#222] flex items-center justify-center text-[#666] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors"
          >
            <Menu size={15} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================================================================
   FULLSCREEN NAV OVERLAY
================================================================= */
const NavOverlay = ({ open, onClose }) => {
  const links = [
    { label: "Home", href: "#home" },
    { label: "Featured Work", href: "#work" },
    { label: "Achievements", href: "#achievements" },
    { label: "Infera AI", href: "#infera" },
    { label: "Let's Connect", href: "#connect" },
  ];
  return (
    <div
      className="fixed inset-0 z-50 bg-[#0B0B0B]"
      style={{
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity .5s ease",
      }}
    >
      <div className="flex justify-end px-6 md:px-12 py-6">
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="text-[#F5F5F5] hover:text-[#D4AF37] transition-colors w-9 h-9 flex items-center justify-center"
        >
          <X size={22} strokeWidth={1.5} />
        </button>
      </div>
      <nav className="flex flex-col items-start px-8 md:px-24 mt-10 md:mt-20 gap-2">
        {links.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            onClick={onClose}
            className="group font-display text-[12vw] md:text-[5vw] leading-[1.15] text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors duration-500"
            style={{
              transform: open ? "translateY(0)" : "translateY(40px)",
              opacity: open ? 1 : 0,
              transition: `transform .6s cubic-bezier(.22,1,.36,1) ${i * 0.07 + 0.1}s, opacity .6s ease ${i * 0.07 + 0.1}s, color .3s ease`,
            }}
          >
            <span className="font-mono text-[11px] md:text-sm text-[#D4AF37] mr-4 align-top">0{i + 1}</span>
            {l.label}
            <ArrowUpRight className="inline-block ml-3 mb-2 opacity-0 group-hover:opacity-100 group-hover:text-[#D4AF37] transition-opacity" size={28} strokeWidth={1.2} />
          </a>
        ))}
      </nav>
      <div className="absolute bottom-8 left-8 md:left-24 font-mono text-[11px] text-[#A1A1A1] tracking-widest uppercase">
        Tarannum Khan — Data &amp; AI
      </div>
    </div>
  );
};

/* ================================================================
   LED DOT MATRIX DISPLAY
================================================================= */
const LED_PALETTES = {
  Amber:  { on: "#FFBF00", glow: "rgba(255,191,0,0.35)",  dim: "rgba(255,191,0,0.04)" },
  Green:  { on: "#39FF14", glow: "rgba(57,255,20,0.35)",   dim: "rgba(57,255,20,0.04)" },
  Blue:   { on: "#00D4FF", glow: "rgba(0,212,255,0.35)",   dim: "rgba(0,212,255,0.04)" },
  Pink:   { on: "#FF6EC7", glow: "rgba(255,110,199,0.35)", dim: "rgba(255,110,199,0.04)" },
  Red:    { on: "#FF3333", glow: "rgba(255,51,51,0.35)",   dim: "rgba(255,51,51,0.04)" },
};

const LED_QUOTES = [
  "FOCUS ON YOUR GOALS.",
  "TURNING DATA INTO INSIGHTS.",
  "ALWAYS LEARNING.",
  "BUILD. LEARN. IMPROVE.",
  "AI FOR REAL PROBLEMS.",
  "DATA TELLS STORIES.",
  "DREAM. BUILD. REPEAT.",
];

const LEDDisplay = React.memo(function LEDDisplay({ message, color, animation, speed }) {
  const canvasRef = useRef(null);
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;

    const PITCH = 4;
    const DOT_R = 1.35;
    const FONT = 'bold 18px "JetBrains Mono", monospace';
    const pal = LED_PALETTES[color] || LED_PALETTES.Amber;
    const sf = speed === "Slow" ? 0.5 : speed === "Fast" ? 2.5 : 1;

    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();

    fontsReady.then(() => {
      if (cancelled) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      /* measure text on scratch canvas */
      const off = document.createElement("canvas");
      const oCtx = off.getContext("2d");
      if (!oCtx) return;
      oCtx.font = FONT;
      const tw = Math.ceil(oCtx.measureText(message).width) + PITCH * 6;
      const th = 26;
      off.width = tw;
      off.height = th;
      oCtx.font = FONT;
      oCtx.fillStyle = "#fff";
      oCtx.textBaseline = "middle";
      oCtx.fillText(message, PITCH * 3, th / 2);
      const img = oCtx.getImageData(0, 0, tw, th);

      const cols = Math.ceil(tw / PITCH);
      const rows = Math.ceil(th / PITCH);
      const dots = [];
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) {
          const px = Math.min(Math.floor(c * PITCH), tw - 1);
          const py = Math.min(Math.floor(r * PITCH), th - 1);
          dots.push({ x: c, y: r, on: img.data[(py * tw + px) * 4 + 3] > 55 });
        }

      const dpr = window.devicePixelRatio || 1;
      const cw = cols * PITCH;
      const ch = rows * PITCH;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      canvas.style.width = cw + "px";
      canvas.style.height = ch + "px";
      ctx.scale(dpr, dpr);

      function render(ts) {
        if (cancelled) return;
        ctx.clearRect(0, 0, cw, ch);
        for (const d of dots) {
          const cx = d.x * PITCH + PITCH / 2;
          const cy = d.y * PITCH + PITCH / 2;
          if (d.on) {
            let a = 1;
            if (animation === "Pulse")
              a = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(ts * 0.002 * sf));
            else if (animation === "Wave")
              a = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(ts * 0.003 * sf - d.x * 0.35));
            else if (animation === "Flicker")
              a = 0.55 + Math.random() * 0.45;
            else if (animation === "Scroll")
              a = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(ts * 0.004 * sf - d.x * 0.2 + d.y * 0.1));
            ctx.globalAlpha = a * 0.22;
            ctx.fillStyle = pal.glow;
            ctx.beginPath();
            ctx.arc(cx, cy, DOT_R + 2.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = a;
            ctx.fillStyle = pal.on;
            ctx.beginPath();
            ctx.arc(cx, cy, DOT_R, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.globalAlpha = 1;
            ctx.fillStyle = pal.dim;
            ctx.beginPath();
            ctx.arc(cx, cy, DOT_R * 0.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
        if (animation !== "Static" && !cancelled)
          animRef.current = requestAnimationFrame(render);
      }

      render(0);
      if (animation !== "Static")
        animRef.current = requestAnimationFrame(render);
    });

    return () => {
      cancelled = true;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [message, color, animation, speed]);

  return <canvas ref={canvasRef} className="block mx-auto" />;
});

/* ================================================================
   PERSONALIZE PANEL
================================================================= */
const PersonalizePanel = ({ cfg, onChange, onReset, onApply }) => {
  const animations = ["Static", "Scroll", "Pulse", "Wave", "Flicker"];
  const colors = Object.keys(LED_PALETTES);
  const speeds = ["Slow", "Medium", "Fast"];

  const pill = (active) =>
    `px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase border transition-all cursor-pointer ${
      active
        ? "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10"
        : "border-[#222] text-[#666] hover:border-[#444] hover:text-[#999]"
    }`;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 py-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-[#999]">
        {/* Animation */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#666] mb-3">Animation</p>
          <div className="flex flex-wrap gap-2">
            {animations.map((a) => (
              <button key={a} className={pill(cfg.animation === a)} onClick={() => onChange({ animation: a })}>{a}</button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#666] mb-3">Color</p>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => onChange({ color: c })}
                className={`w-7 h-7 rounded-full border-2 transition-all ${cfg.color === c ? "border-[#F5F5F5] scale-110" : "border-[#333] hover:border-[#555]"}`}
                style={{ background: LED_PALETTES[c].on }}
                aria-label={c}
              />
            ))}
          </div>
        </div>

        {/* Speed */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#666] mb-3">Speed</p>
          <div className="flex flex-wrap gap-2">
            {speeds.map((s) => (
              <button key={s} className={pill(cfg.speed === s)} onClick={() => onChange({ speed: s })}>{s}</button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="sm:col-span-2 lg:col-span-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#666] mb-3">Message</p>
          <select
            value={LED_QUOTES.includes(cfg.message) ? cfg.message : "__custom"}
            onChange={(e) => {
              if (e.target.value !== "__custom") onChange({ message: e.target.value });
            }}
            className="w-full bg-[#0e0e0e] border border-[#222] rounded-lg px-3 py-2 text-[11px] font-mono text-[#999] outline-none focus:border-[#D4AF37]/40 transition-colors mb-3 appearance-none cursor-pointer"
          >
            {LED_QUOTES.map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
            <option value="__custom">Custom...</option>
          </select>
          <input
            type="text"
            maxLength={40}
            value={cfg.message}
            onChange={(e) => onChange({ message: e.target.value.toUpperCase() })}
            placeholder="CUSTOM MESSAGE (40 CHARS MAX)"
            className="w-full bg-[#0e0e0e] border border-[#222] rounded-lg px-3 py-2 text-[11px] font-mono text-[#999] placeholder-[#444] outline-none focus:border-[#D4AF37]/40 transition-colors"
          />
        </div>

        {/* Actions */}
        <div className="flex items-end gap-3">
          <button
            onClick={onReset}
            className="px-5 py-2 rounded-full border border-[#222] text-[10px] font-mono uppercase tracking-widest text-[#666] hover:border-[#444] hover:text-[#999] transition-colors"
          >
            Reset
          </button>
          <button
            onClick={onApply}
            className="px-5 py-2 rounded-full bg-[#D4AF37] text-[#080808] text-[10px] font-mono uppercase tracking-widest font-medium hover:bg-[#e6c358] transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ================================================================
   DYNAMIC ROLE ROTATOR
================================================================= */
const ROLES = [
  "Always Learning.",
  "Aspiring Data Analyst.",
  "AI & ML Student.",
  "Power BI Developer.",
  "Building AI Applications.",
  "Machine Learning Enthusiast.",
  "Future ML Engineer.",
  "Turning Data into Insights.",
];

const RoleRotator = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="h-8 md:h-9 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[idx]}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 font-mono text-sm md:text-base text-[#D4AF37]"
        >
          {ROLES[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

/* ================================================================
   HERO — premium cinematic section
================================================================= */
const heroFadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

const LED_DEFAULTS = {
  message: "FOCUS ON YOUR GOALS.",
  color: "Amber",
  animation: "Static",
  speed: "Medium",
};

const Hero = () => {
  /* LED state */
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
    setLedCfg(next); /* instant preview */
  };

  return (
    <section id="home" style={{ background: "#080808" }}>
      {/* ════════ LED BOARD ════════ */}
      <motion.div {...heroFadeUp(0.1)} className="pt-20 md:pt-24 pb-0">
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="relative rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] px-6 py-8 md:py-10 overflow-hidden">
            {/* subtle scanline overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)",
              }}
            />
            <LEDDisplay
              message={ledCfg.message}
              color={ledCfg.color}
              animation={ledCfg.animation}
              speed={ledCfg.speed}
            />
            {/* Personalize button */}
            <button
              onClick={() => setPanelOpen((o) => !o)}
              className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#222] text-[10px] font-mono uppercase tracking-widest text-[#555] hover:text-[#999] hover:bg-[#ffffff06] transition-colors"
            >
              <Settings size={11} strokeWidth={1.5} />
              Personalize
            </button>
          </div>

          {/* Personalize Panel */}
          <AnimatePresence>
            {panelOpen && (
              <PersonalizePanel
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

      {/* ════════ HERO CONTENT ════════ */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-16 md:pt-24 pb-8">
        <div className="grid md:grid-cols-[42%_58%] gap-12 md:gap-[120px] items-center">
          {/* ──── Portrait ──── */}
          <motion.div
            {...heroFadeUp(0.2)}
            className="flex justify-center md:justify-center"
          >
            <div className="hero-float">
              <img
                src="/portrait.png"
                alt="Tarannum Khan"
                className="w-64 md:w-[340px] md:h-[460px] object-cover object-top rounded-[1.6rem]"
                style={{
                  boxShadow:
                    "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 60px -10px rgba(212,175,55,0.08)",
                }}
              />
            </div>
          </motion.div>

          {/* ──── Content ──── */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            {/* Label */}
            <motion.p
              {...heroFadeUp(0.3)}
              className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] mb-6"
            >
              Data &bull; AI &bull; Analytics
            </motion.p>

            {/* Name */}
            <motion.h1
              {...heroFadeUp(0.35)}
              className="font-display text-6xl md:text-[80px] font-bold text-[#F5F5F5] tracking-tight mb-5"
              style={{ lineHeight: 0.9 }}
            >
              Tarannum
              <br />
              Khan
            </motion.h1>

            {/* Dynamic Role */}
            <motion.div {...heroFadeUp(0.4)} className="mb-8">
              <RoleRotator />
            </motion.div>

            {/* Description */}
            <motion.p
              {...heroFadeUp(0.5)}
              className="font-body text-[15px] leading-relaxed text-[#9A9A9A] mb-10 max-w-md"
            >
              I build AI-powered applications and analytics solutions that
              transform complex datasets into meaningful insights. Passionate
              about machine learning, data visualization, and creating
              intelligent tools that solve real-world problems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              {...heroFadeUp(0.6)}
              className="flex flex-wrap gap-3 mb-10"
            >
              <a
                href="#resume"
                className="group relative font-mono text-xs tracking-widest uppercase px-6 py-3 rounded-full bg-[#D4AF37] text-[#080808] font-medium hover:bg-[#e6c358] transition-colors lift"
              >
                Resume
              </a>
              <a
                href="#work"
                className="group relative font-mono text-xs tracking-widest uppercase px-6 py-3 rounded-full border border-[#262626] text-[#F5F5F5] gold-glow lift"
              >
                Featured Work
              </a>
              <a
                href="#connect"
                className="group relative font-mono text-xs tracking-widest uppercase px-6 py-3 rounded-full border border-[#262626] text-[#F5F5F5] gold-glow lift"
              >
                Let&rsquo;s Connect
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              {...heroFadeUp(0.7)}
              className="flex items-center gap-4"
            >
              {[
                { Icon: Github, href: "https://github.com/Tarannum2504" },
                { Icon: Linkedin, href: "https://linkedin.com/in/tarannum2504" },
                { Icon: Instagram, href: "https://instagram.com/infera.labs" },
                { Icon: Mail, href: "mailto:tarannum.k2504@gmail.com" },
                { Icon: Phone, href: "tel:+917073232578" },
                { Icon: FileText, href: "#resume" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="w-10 h-10 rounded-full border border-[#262626] flex items-center justify-center text-[#9A9A9A] hover:text-[#D4AF37] hover:-translate-y-1 gold-glow transition-all duration-300"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ──── Bottom Quote ──── */}
        <motion.div
          {...heroFadeUp(0.85)}
          className="max-w-7xl mx-auto w-full mt-20 md:mt-28 pb-4"
        >
          <div className="h-px bg-[#1a1a1a] w-full mb-8" />
          <p className="text-center font-display italic text-sm md:text-base text-[#9A9A9A]/70 tracking-wide">
            &ldquo;Turning Data into Meaningful Insights.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/* ================================================================
   ABOUT — minimal timeline
================================================================= */
const About = () => {
  const items = [
    { year: "2023", text: "Began B.Tech in AI & Machine Learning — first serious contact with Python and statistics." },
    { year: "2024", text: "Shifted focus toward data analytics — dashboards, SQL, and storytelling with numbers." },
    { year: "2025", text: "Started building end-to-end ML projects, from data cleaning to deployed models." },
    { year: "Now", text: "Exploring how AI assistants and analytics can work together — see Infera AI below." },
  ];
  return (
    <section id="about" className="px-6 md:px-12 py-28 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto">
        <Reveal><SectionHead eyebrow="About" title="A short introduction" /></Reveal>
        <div className="max-w-2xl">
          {items.map((it, i) => (
            <Reveal key={it.year} delay={i * 0.06}>
              <div className="flex gap-8 py-6 border-b border-[#262626] last:border-b-0 group">
                <span className="font-mono text-xs text-[#D4AF37] w-14 shrink-0 pt-1">{it.year}</span>
                <p className="font-body text-[#A1A1A1] text-[15px] leading-relaxed group-hover:text-[#F5F5F5] transition-colors">
                  {it.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ================================================================
   GITHUB
================================================================= */
const GitHubSection = () => {
  const weeks = 30;
  const days = 7;
  const grid = Array.from({ length: weeks }, () =>
    Array.from({ length: days }, () => Math.floor(Math.random() * 5))
  );
  const shade = (v) => ["#111111", "#2a2210", "#4d3d15", "#8a6d1e", "#D4AF37"][v];

  const stats = [
    { label: "Public Repos", value: "24" },
    { label: "Total Commits", value: "1,214" },
    { label: "Stars Earned", value: "58" },
    { label: "Contributions", value: "612" },
  ];

  return (
    <section id="github" className="px-6 md:px-12 py-28 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto">
        <Reveal><SectionHead eyebrow="GitHub" title="Shipping, quietly and often" /></Reveal>

        <Reveal delay={0.05}>
          <div className="border border-[#262626] rounded-2xl p-6 md:p-8 bg-[#111111] overflow-x-auto scrollbar-none mb-8">
            <div className="flex gap-[3px] w-max">
              {grid.map((col, i) => (
                <div key={i} className="flex flex-col gap-[3px]">
                  {col.map((v, j) => (
                    <div key={j} className="w-[11px] h-[11px] rounded-[2px]" style={{ background: shade(v) }} />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 font-mono text-[10px] text-[#A1A1A1]">
              <span>Less</span>
              {[0,1,2,3,4].map((v) => <div key={v} className="w-[10px] h-[10px] rounded-[2px]" style={{ background: shade(v) }} />)}
              <span>More</span>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.1 + i * 0.05}>
              <div className="border border-[#262626] rounded-2xl p-6 gold-glow lift transition-transform">
                <p className="font-display text-3xl text-[#F5F5F5]">{s.value}</p>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#A1A1A1] mt-2">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ================================================================
   TECH STACK
================================================================= */
const TechStack = () => {
  const categories = [
    { title: "Languages", items: ["Python", "SQL", "R", "JavaScript"] },
    { title: "Analytics", items: ["Excel", "Power BI", "Tableau", "Pandas"] },
    { title: "Machine Learning", items: ["scikit-learn", "TensorFlow", "Keras", "NumPy"] },
    { title: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
    { title: "Backend", items: ["FastAPI", "Flask", "Node.js"] },
    { title: "Databases", items: ["MySQL", "PostgreSQL", "MongoDB"] },
    { title: "Developer Tools", items: ["Git", "VS Code", "Jupyter", "Docker"] },
  ];
  return (
    <section id="stack" className="px-6 md:px-12 py-28 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto">
        <Reveal><SectionHead eyebrow="Toolkit" title="Tech stack" /></Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.05}>
              <div className="border border-[#262626] rounded-2xl p-7 h-full gold-glow lift transition-transform bg-[#111111]/40">
                <h3 className="font-display text-lg text-[#F5F5F5] mb-5">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((it) => (
                    <span key={it} className="font-mono text-[11px] px-3 py-1.5 rounded-full border border-[#262626] text-[#A1A1A1]">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ================================================================
   EXPERIENCE + EDUCATION TIMELINES
================================================================= */
const TimelineBlock = ({ id, eyebrow, title, entries }) => (
  <section id={id} className="px-6 md:px-12 py-28 border-t border-[#262626]">
    <div className="max-w-7xl mx-auto">
      <Reveal><SectionHead eyebrow={eyebrow} title={title} /></Reveal>
      <div className="relative max-w-2xl pl-8">
        <div className="absolute left-0 top-2 bottom-2 w-px bg-[#262626]" />
        {entries.map((e, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="relative pb-12 last:pb-0">
              <div className="absolute -left-[33px] top-1.5 w-2 h-2 rounded-full bg-[#D4AF37]" />
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#D4AF37] mb-2">{e.period}</p>
              <h3 className="font-display text-xl text-[#F5F5F5] mb-1">{e.role}</h3>
              <p className="font-body text-sm text-[#A1A1A1] mb-3">{e.org}</p>
              <p className="font-body text-[14px] leading-relaxed text-[#A1A1A1]">{e.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ================================================================
   FEATURED WORK
================================================================= */
const FeaturedWork = () => {
  const projects = [
    {
      name: "InsightBoard",
      tag: "Sales Analytics Dashboard",
      desc: "An interactive dashboard turning raw retail data into weekly sales insight — built for a fictional mid-size retailer to track revenue, churn and inventory health.",
      stack: ["Python", "Power BI", "SQL"],
    },
    {
      name: "ChurnSense",
      tag: "Customer Churn Predictor",
      desc: "A machine learning pipeline that predicts customer churn with 89% accuracy, with an explainability layer so business teams understand why, not just what.",
      stack: ["scikit-learn", "Pandas", "FastAPI"],
    },
    {
      name: "Infera AI",
      tag: "Personal AI Assistant",
      desc: "A conversational assistant trained on my own work — ask it about my projects, skills, or experience, and it answers like I would.",
      stack: ["Next.js", "OpenAI API", "Vector DB"],
    },
  ];
  return (
    <section id="work" className="px-6 md:px-12 py-28 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto">
        <Reveal><SectionHead eyebrow="Selected Work" title="Featured projects" sub="A few projects that reflect how I work with data and models — end to end, from question to interface." /></Reveal>
        <div className="space-y-6">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div className="group border border-[#262626] rounded-3xl overflow-hidden grid md:grid-cols-[45%_55%] gold-glow transition-all">
                <div className="bg-[#111111] aspect-[16/10] md:aspect-auto flex items-center justify-center relative overflow-hidden">
                  <span className="font-display text-6xl text-[#262626] group-hover:text-[#D4AF37]/30 transition-colors duration-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/60 to-transparent" />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[#D4AF37] mb-3">{p.tag}</p>
                  <h3 className="font-display text-2xl md:text-3xl text-[#F5F5F5] mb-4">{p.name}</h3>
                  <p className="font-body text-[14px] leading-relaxed text-[#A1A1A1] mb-6 max-w-md">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-7">
                    {p.stack.map((s) => (
                      <span key={s} className="font-mono text-[10px] px-2.5 py-1 rounded-full border border-[#262626] text-[#A1A1A1]">{s}</span>
                    ))}
                  </div>
                  <div className="flex gap-5">
                    <a href="#" className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#F5F5F5] hover:text-[#D4AF37] transition-colors">
                      <Github size={14} strokeWidth={1.5} /> Code
                    </a>
                    <a href="#" className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#F5F5F5] hover:text-[#D4AF37] transition-colors">
                      Live Demo <ArrowUpRight size={14} strokeWidth={1.5} />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ================================================================
   ACHIEVEMENTS
================================================================= */
const Achievements = () => {
  const items = [
    { title: "Dean's List Scholarship", org: "Institute of Technology", year: "2025", type: "Scholarship" },
    { title: "1st Place — Campus Data Hackathon", org: "AI & Analytics Club", year: "2025", type: "Competition" },
    { title: "Google Data Analytics Certificate", org: "Google / Coursera", year: "2024", type: "Certificate" },
    { title: "Published Kaggle Notebook, Top 5%", org: "Kaggle", year: "2024", type: "Award" },
  ];
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section id="achievements" className="px-6 md:px-12 py-28 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto">
        <Reveal><SectionHead eyebrow="Recognition" title="Achievements" /></Reveal>
        <div className="grid sm:grid-cols-2 gap-5">
          {items.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <div
                onMouseEnter={() => setOpenIndex(i)}
                onMouseLeave={() => setOpenIndex(null)}
                className="relative border border-[#262626] rounded-2xl p-7 gold-glow lift transition-transform overflow-hidden bg-[#111111]/40"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] mb-3">{a.type} · {a.year}</p>
                <h3 className="font-display text-lg text-[#F5F5F5] mb-1">{a.title}</h3>
                <p className="font-body text-sm text-[#A1A1A1]">{a.org}</p>
                <div
                  className="mt-4 h-24 rounded-xl border border-dashed border-[#262626] flex items-center justify-center font-mono text-[10px] text-[#A1A1A1] uppercase tracking-widest"
                  style={{
                    opacity: openIndex === i ? 1 : 0,
                    maxHeight: openIndex === i ? 96 : 0,
                    marginTop: openIndex === i ? 16 : 0,
                    transition: "all .4s ease",
                  }}
                >
                  Preview
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ================================================================
   INFERA AI — chat interface
================================================================= */
const InferaAI = () => {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi, I'm Infera — ask me anything about Tarannum's work, skills, or experience." },
    { role: "user", text: "What kind of projects has she built?" },
    { role: "ai", text: "Mostly analytics dashboards and ML models — things like churn prediction and sales forecasting, always with a focus on turning numbers into clear decisions." },
  ]);
  const [input, setInput] = useState("");
  const prompts = ["Summarize her experience", "What's her strongest skill?", "Show me her latest project"];
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = useCallback((text) => {
    const t = text ?? input;
    if (!t.trim()) return;
    setMessages((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: "That's a great question — this is a preview interface, so my answers here are illustrative." }]);
    }, 700);
  }, [input]);

  return (
    <section id="infera" className="px-6 md:px-12 py-28 border-t border-[#262626]">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={14} className="text-[#D4AF37]" strokeWidth={1.5} />
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#D4AF37]">Signature</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-[#F5F5F5] tracking-tight mb-4">Infera AI</h2>
          <p className="font-body text-[#A1A1A1] max-w-xl text-[15px] leading-relaxed mb-12">
            A small AI assistant trained on my work. Ask it about my projects, skills or experience.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border border-[#262626] rounded-3xl bg-[#111111] overflow-hidden">
            <div className="h-96 overflow-y-auto px-6 py-6 space-y-5 scrollbar-none">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl font-body text-[14px] leading-relaxed ${
                      m.role === "user"
                        ? "bg-[#D4AF37] text-[#0B0B0B]"
                        : "bg-[#0B0B0B] border border-[#262626] text-[#F5F5F5]"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="border-t border-[#262626] p-4 flex flex-wrap gap-2">
              {prompts.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="font-mono text-[11px] px-3 py-1.5 rounded-full border border-[#262626] text-[#A1A1A1] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="border-t border-[#262626] p-4 flex items-center gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask Infera something..."
                className="flex-1 bg-transparent font-body text-sm text-[#F5F5F5] placeholder-[#A1A1A1] outline-none px-2"
              />
              <span className="w-px h-4 bg-[#D4AF37] blink-cursor" />
              <button
                onClick={() => send()}
                className="w-9 h-9 rounded-full bg-[#D4AF37] text-[#0B0B0B] flex items-center justify-center hover:bg-[#e6c358] transition-colors shrink-0"
                aria-label="Send"
              >
                <Send size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ================================================================
   LET'S CONNECT
================================================================= */
const Connect = () => {
  const cards = [
    { label: "LinkedIn", value: "/in/tarannumkhan", Icon: Linkedin, href: "https://linkedin.com" },
    { label: "GitHub", value: "@tarannumkhan", Icon: Github, href: "https://github.com" },
    { label: "Instagram", value: "@tarannum.codes", Icon: Instagram, href: "https://instagram.com" },
    { label: "Email", value: "tarannum@example.com", Icon: Mail, href: "mailto:tarannum@example.com" },
    { label: "Phone", value: "+91 00000 00000", Icon: Phone, href: "tel:+910000000000" },
    { label: "Resume", value: "Download PDF", Icon: FileText, href: "#resume" },
  ];
  return (
    <section id="connect" className="px-6 md:px-12 py-28 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto">
        <Reveal><SectionHead eyebrow="Get in touch" title="Let's connect" sub="Open to internships, analyst roles, and interesting data problems." /></Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.05}>
              <a href={c.href} className="group flex items-center justify-between border border-[#262626] rounded-2xl p-6 gold-glow lift transition-transform bg-[#111111]/40">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#A1A1A1] mb-1">{c.label}</p>
                  <p className="font-display text-[15px] text-[#F5F5F5]">{c.value}</p>
                </div>
                <ArrowUpRight size={16} className="text-[#A1A1A1] group-hover:text-[#D4AF37] transition-colors" strokeWidth={1.5} />
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="border border-[#262626] rounded-3xl p-8 md:p-12 bg-[#111111]/40">
            <h3 className="font-display text-2xl text-[#F5F5F5] mb-8">Send a message</h3>
            <form className="grid md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
              <input placeholder="Your name" className="bg-transparent border-b border-[#262626] py-3 font-body text-sm text-[#F5F5F5] placeholder-[#A1A1A1] outline-none focus:border-[#D4AF37] transition-colors" />
              <input placeholder="Your email" className="bg-transparent border-b border-[#262626] py-3 font-body text-sm text-[#F5F5F5] placeholder-[#A1A1A1] outline-none focus:border-[#D4AF37] transition-colors" />
              <textarea placeholder="Message" rows={3} className="md:col-span-2 bg-transparent border-b border-[#262626] py-3 font-body text-sm text-[#F5F5F5] placeholder-[#A1A1A1] outline-none focus:border-[#D4AF37] transition-colors resize-none" />
              <button className="md:col-span-2 justify-self-start font-mono text-xs tracking-widest uppercase px-8 py-3 rounded-full bg-[#D4AF37] text-[#0B0B0B] font-medium hover:bg-[#e6c358] transition-colors inline-flex items-center gap-2">
                Send message <ChevronRight size={14} strokeWidth={2} />
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ================================================================
   FOOTER
================================================================= */
const Footer = () => (
  <footer className="px-6 md:px-12 py-10 border-t border-[#262626] flex flex-col md:flex-row items-center justify-between gap-4">
    <p className="font-mono text-[11px] text-[#A1A1A1] tracking-widest">© 2026 Tarannum Khan</p>
    <p className="font-mono text-[11px] text-[#A1A1A1] tracking-widest">Data &amp; AI, deliberately.</p>
  </footer>
);

/* ================================================================
   ROOT
================================================================= */
export default function Portfolio() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div className="bg-[#0B0B0B] min-h-screen text-[#F5F5F5] font-body selection:bg-[#D4AF37]">
      <FontLoader />
      <TopBar onOpenNav={() => setNavOpen(true)} />
      <NavOverlay open={navOpen} onClose={() => setNavOpen(false)} />

      <Hero />
      <About />
      <GitHubSection />
      <TechStack />
      <TimelineBlock
        id="experience"
        eyebrow="Experience"
        title="Where I've worked"
        entries={[
          { period: "Jun 2025 — Aug 2025", role: "Data Analytics Intern", org: "Fictional Analytics Co.", desc: "Built weekly reporting dashboards and automated a manual Excel process, cutting reporting time by 60%." },
          { period: "Jan 2025 — Present", role: "ML Research Assistant", org: "University AI Lab", desc: "Assisting on a research project applying classification models to public health datasets." },
        ]}
      />
      <TimelineBlock
        id="education"
        eyebrow="Education"
        title="Academic background"
        entries={[
          { period: "2023 — 2027", role: "B.Tech, AI & Machine Learning", org: "Institute of Technology", desc: "Coursework in statistics, deep learning, data structures, and applied analytics." },
        ]}
      />
      <FeaturedWork />
      <Achievements />
      <InferaAI />
      <Connect />
      <Footer />
    </div>
  );
}

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  Sparkles,
  ChevronRight,
  Briefcase,
  Code,
  GraduationCap,
  Trophy,
  ScrollText,
  MessageSquare,
  ExternalLink,
  FolderKanban,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PageLayout } from "../components/PageLayout";
import { Reveal } from "../components/Reveal";
import { socialLinks } from "../data/portfolio";

// ═══════════════════════════════════════════════════
//  QUICK QUESTIONS
// ═══════════════════════════════════════════════════

const QUICK_QUESTIONS = [
  { icon: FolderKanban, label: "Show My Projects", question: "Tell me about your projects" },
  { icon: Briefcase, label: "Internship Experience", question: "Tell me about your internships" },
  { icon: Code, label: "Technical Skills", question: "What technologies do you know?" },
  { icon: GraduationCap, label: "Education", question: "Tell me about your education" },
  { icon: Trophy, label: "Achievements", question: "What are your achievements?" },
  { icon: ScrollText, label: "Certifications", question: "What certifications do you have?" },
  { icon: Download, label: "Download Resume", question: "Download your resume" },
  { icon: MessageSquare, label: "Contact Info", question: "How can I contact Tarannum?" },
];

// ═══════════════════════════════════════════════════
//  SPECIAL ACTIONS & EXECUTOR
// ═══════════════════════════════════════════════════

// Actions that are safe to auto-execute (external links / downloads)
const SAFE_EXTERNAL_ACTIONS = new Set([
  "DOWNLOAD_RESUME",
  "OPEN_GITHUB",
  "OPEN_LINKEDIN",
  "OPEN_EMAIL",
]);

// Navigation actions — displayed as inline buttons, NOT auto-navigated
const NAVIGATION_ACTIONS = {
  NAVIGATE_PROJECTS: { path: "/projects", label: "View Projects" },
  NAVIGATE_CERTIFICATIONS: { path: "/certifications", label: "View Certifications" },
  NAVIGATE_CONTACT: { path: "/contact", label: "Go to Contact" },
  NAVIGATE_TRAINING: { path: "/training", label: "View Training" },
  NAVIGATE_ACHIEVEMENTS: { path: "/achievements", label: "View Achievements" },
  NAVIGATE_RESUME: { path: "/resume", label: "View Resume" },
};

const SPECIAL_ACTIONS = {
  DOWNLOAD_RESUME: "/RESUME.pdf",
  OPEN_GITHUB: "https://github.com/Tarannum2504",
  OPEN_LINKEDIN: "https://linkedin.com/in/tarannum2504",
  NAVIGATE_PROJECTS: "/projects",
  NAVIGATE_CERTIFICATIONS: "/certifications",
  NAVIGATE_CONTACT: "/contact",
  NAVIGATE_TRAINING: "/training",
  NAVIGATE_ACHIEVEMENTS: "/achievements",
  NAVIGATE_RESUME: "/resume",
  OPEN_EMAIL: "mailto:tarannum.k2504@gmail.com",
};

/**
 * Execute only safe external actions (download, open external links).
 * Navigation actions are NEVER auto-executed — they're rendered as inline buttons.
 * Returns the action if it's a navigation action that should be shown as a button.
 */
function executeSafeAction(action) {
  if (!SAFE_EXTERNAL_ACTIONS.has(action)) return false;

  const target = SPECIAL_ACTIONS[action];
  if (!target) return false;

  if (action === "DOWNLOAD_RESUME") {
    const link = document.createElement("a");
    link.href = target;
    link.download = "Tarannum_Khan_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  }

  // OPEN_GITHUB, OPEN_LINKEDIN, OPEN_EMAIL
  window.open(target, "_blank", "noopener,noreferrer");
  return true;
}

/**
 * Build a markdown list of clickable action buttons for navigation actions.
 */
function buildActionButtons(navActions) {
  if (!navActions || navActions.length === 0) return "";
  const unique = [...new Set(navActions)];
  return unique
    .map((action) => {
      const info = NAVIGATION_ACTIONS[action];
      if (!info) return "";
      return `🔗 **[${info.label}](@navigate:${encodeURIComponent(info.path)})`;
    })
    .filter(Boolean)
    .join("\n");
}

// ═══════════════════════════════════════════════════
//  MARKDOWN RENDERER
// ═══════════════════════════════════════════════════

function MarkdownContent({ content, onNavigate }) {
  return (
    <div className="text-[15px] leading-relaxed font-body prose prose-invert prose-sm max-w-none">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => (
          <p className="mb-3 last:mb-0 text-[#D4D4D4] leading-relaxed">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-[#F5F5F5]">{children}</strong>
        ),
        ul: ({ children }) => (
          <ul className="space-y-1.5 mb-3 last:mb-0 pl-5">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="space-y-1.5 mb-3 last:mb-0 pl-5 list-decimal">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-[#D4D4D4] marker:text-[#D4AF37] leading-relaxed">{children}</li>
        ),
        code: ({ children, className, ...props }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code
                className="bg-[#1a1a2e] text-[#D4AF37] px-1.5 py-0.5 rounded text-[13px] font-mono"
                {...props}
              >
                {children}
              </code>
            );
          }
          return (
            <div className="relative group my-4">
              <div className="absolute top-0 right-0 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#555] bg-[#1a1a2e]/80 rounded-bl-lg rounded-tr-lg border-l border-b border-[#262626] z-10">
                {className?.replace("language-", "") || "code"}
              </div>
              <pre className="bg-[#0D0D1A] border border-[#1a1a2e] rounded-xl p-5 pt-9 overflow-x-auto scrollbar-none">
                <code className={`${className || ""} text-[13px] font-mono leading-relaxed text-[#D4D4D4]`} {...props}>
                  {children}
                </code>
              </pre>
            </div>
          );
        },
        a: ({ children, href }) => {
          // Handle @navigate: protocol for internal page navigation
          if (href && href.startsWith("@navigate:")) {
            const path = decodeURIComponent(href.slice("@navigate:".length));
            return (
              <button
                onClick={() => onNavigate(path)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#D4AF37]/30 text-[13px] font-mono text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50 transition-all duration-200 cursor-pointer"
              >
                {children}
              </button>
            );
          }
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#D4AF37] underline decoration-[#D4AF37]/30 hover:decoration-[#D4AF37] transition-all"
            >
              {children}
              <ExternalLink size={12} strokeWidth={1.5} className="shrink-0" />
            </a>
          );
        },
        h1: ({ children }) => (
          <h1 className="text-[17px] font-bold text-[#F5F5F5] mt-4 mb-3">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-[16px] font-semibold text-[#F5F5F5] mt-4 mb-2">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-[15px] font-semibold text-[#F5F5F5] mt-3 mb-2">{children}</h3>
        ),
        hr: () => <hr className="border-[#262626] my-4" />,
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-[#D4AF37]/40 pl-4 italic text-[#999] my-3">
            {children}
          </blockquote>
        ),
      }}
    >
      {String(content ?? "")}
    </ReactMarkdown>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  TYPING INDICATOR
// ═══════════════════════════════════════════════════

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="flex justify-start"
    >
      <div className="flex items-start gap-3 max-w-[85%]">
        {/* AI Avatar */}
        <div className="relative shrink-0 mt-1">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37]/25 to-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
            <Bot size={16} strokeWidth={1.5} className="text-[#D4AF37]" />
          </div>
        </div>
        <div className="bg-[#161616] border border-[#222]/60 rounded-2xl rounded-bl-md px-5 py-4">
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-mono text-[#666] tracking-wide">
              Infera AI is thinking
            </span>
            <div className="flex items-center gap-1.5">
              <motion.span
                className="w-2 h-2 rounded-full bg-[#D4AF37]"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
              />
              <motion.span
                className="w-2 h-2 rounded-full bg-[#D4AF37]"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
              />
              <motion.span
                className="w-2 h-2 rounded-full bg-[#D4AF37]"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════

export const InferaAI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState("");

  const inputRef = useRef(null);
  const chatEndRef = useRef(null);
  const typeIntervalRef = useRef(null);
  const navigate = useNavigate();

  // Cleanup typewriter interval on unmount
  useEffect(() => {
    return () => {
      if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    };
  }, []);

  // ─── Auto-scroll ────────────────────────────────
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, streamingText]);

  // ─── Focus input ────────────────────────────────
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // ─── Handle sending a message ────────────────────
  const handleSend = useCallback(
    async (text) => {
      if (!text.trim() || isLoading) return;

      const userMsg = text.trim();
      setInput("");

      // Add user message immediately
      setMessages((prev) => [...prev, { role: "user", content: userMsg }]);

      // Show loading
      setIsLoading(true);
      setStreamingText("");

      try {
        const history = messages
          .filter((m) => m.role !== "system")
          .slice(-10)
          .map((m) => ({ role: m.role, content: m.content }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMsg, history }),
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();

        // Separate safe external actions from navigation actions
        const navActions = [];
        if (data.actions && data.actions.length > 0) {
          for (const action of data.actions) {
            const executed = executeSafeAction(action);
            if (!executed && NAVIGATION_ACTIONS[action]) {
              navActions.push(action);
            }
          }
        }

        let reply = data.reply || "I'm not sure how to respond to that. Could you rephrase?";

        // Append navigation action buttons to the reply
        const actionBtns = buildActionButtons(navActions);
        if (actionBtns) {
          reply += "\n\n---\n" + actionBtns;
        }

        // Stream with typewriter effect
        if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
        setIsLoading(false);
        setStreamingText(reply);

        const typeSpeed = Math.min(20, Math.max(8, Math.floor(4000 / reply.length)));
        let index = 0;
        let displayed = "";

        typeIntervalRef.current = setInterval(() => {
          if (index < reply.length) {
            displayed += reply[index];
            setStreamingText(displayed);
            index++;
          } else {
            if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
            typeIntervalRef.current = null;
            setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
            setStreamingText("");
          }
        }, typeSpeed);
      } catch (error) {
        console.error("Chat error:", error);          // Fallback to local engine
        try {
          const { generateResponse } = await import("../components/Chatbot/fallbackEngine.js");
          const fallback = generateResponse(userMsg);

          // Separate safe external actions from navigation actions
          const fbNavActions = [];
          if (fallback.actions && fallback.actions.length > 0) {
            for (const act of fallback.actions) {
              const actionName = typeof act === "string" ? act : act.action;
              if (actionName) {
                const executed = executeSafeAction(actionName);
                if (!executed && NAVIGATION_ACTIONS[actionName]) {
                  fbNavActions.push(actionName);
                }
              }
            }
          }

          let reply = fallback.reply || "I'm temporarily unavailable. Please try again shortly.";

          // Append navigation action buttons
          const fbActionBtns = buildActionButtons(fbNavActions);
          if (fbActionBtns) {
            reply += "\n\n---\n" + fbActionBtns;
          }
          if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
          setIsLoading(false);
          setStreamingText(reply);

          const typeSpeed = Math.min(20, Math.max(8, Math.floor(4000 / reply.length)));
          let index = 0;
          let displayed = "";

          typeIntervalRef.current = setInterval(() => {
            if (index < reply.length) {
              displayed += reply[index];
              setStreamingText(displayed);
              index++;
            } else {
              if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
              typeIntervalRef.current = null;
              setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
              setStreamingText("");
            }
          }, typeSpeed);
        } catch {
          setIsLoading(false);
          setStreamingText("");
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "I'm temporarily unavailable. Please try again shortly." },
          ]);
        }
      }
    },
    [messages, isLoading, navigate]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const handleQuickQuestion = (question) => {
    handleSend(question);
  };

  return (
    <PageLayout>
      <div className="max-w-[1100px] mx-auto">
        {/* Heading */}
        <Reveal>
          <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="font-mono text-[19px] tracking-[0.35em] uppercase text-[#D4AF37] mb-6">
                AI CHAT
              </div>
              <p className="font-body text-[18px] text-[#A1A1A1] max-w-xl">
                Your AI guide to Tarannum Khan&apos;s portfolio. Ask anything about projects, skills, education, and achievements.
              </p>
            </div>
            {/* Status Badge */}
            <div className="shrink-0 flex sm:self-start">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#262626] bg-[#111]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#666]">
                  Online &middot; Mistral AI
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ════ WELCOME CARD ════ */}
        <Reveal delay={0.15}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border border-[#262626] hover:border-[#D4AF37]/20 rounded-2xl bg-gradient-to-br from-[#111] to-[#0D0D0D] p-10 md:p-12 mb-10 transition-all duration-300 group"
          >
            <div className="flex items-start gap-5">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border-2 border-[#D4AF37]/30 flex items-center justify-center group-hover:border-[#D4AF37]/50 transition-all duration-300">
                  <Sparkles size={28} strokeWidth={1.5} className="text-[#D4AF37]" />
                </div>
                <motion.span
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#0B0B0B]"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#F5F5F5] mb-2 group-hover:text-[#D4AF37] transition-colors">
                  👋 Hello!
                </h2>
                <p className="font-body text-[16px] text-[#A1A1A1] mb-5 leading-relaxed">
                  I'm <strong className="text-[#D4AF37] font-semibold">Infera AI</strong>, your portfolio assistant.
                  I can answer questions about:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    "Projects", "Experience", "Skills", "Education",
                    "Certifications", "Training", "Achievements", "Resume", "Contact",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-[#1a1a1a]"
                    >
                      <ChevronRight size={12} strokeWidth={2} className="text-[#D4AF37] shrink-0" />
                      <span className="font-mono text-[12px] text-[#999]">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="font-body text-[14px] text-[#666] mt-5 italic">
                  Or ask me anything else about Tarannum's portfolio!
                </p>
              </div>
            </div>
          </motion.div>
        </Reveal>

        {/* ════ QUICK QUESTIONS ════ */}
        <Reveal delay={0.2}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mb-10"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#555] mb-4">
              Quick Questions
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {QUICK_QUESTIONS.map((q, idx) => (
                <motion.button
                  key={q.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + idx * 0.05 }}
                  onClick={() => handleQuickQuestion(q.question)}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex flex-col items-center gap-3 p-5 rounded-xl border border-[#262626] bg-[#111]/50 hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/[0.02] transition-all duration-300 cursor-pointer text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/10 group-hover:border-[#D4AF37]/30 group-hover:bg-[#D4AF37]/10 flex items-center justify-center transition-all duration-300">
                    <q.icon size={16} strokeWidth={1.5} className="text-[#D4AF37]" />
                  </div>
                  <span className="font-mono text-[12px] text-[#888] group-hover:text-[#D4AF37] transition-colors leading-tight">
                    {q.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </Reveal>

        {/* ════ CHAT CONTAINER (always visible) ════ */}
        <Reveal delay={0.25}>
          <div className="border border-[#262626]/60 rounded-2xl bg-[#0D0D0D]/50 overflow-hidden mb-6">
            {/* Chat Header */}
            <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-[#262626]/40 bg-[#111]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30 flex items-center justify-center">
                    <Bot size={14} strokeWidth={1.5} className="text-[#D4AF37]" />
                  </div>
                  <motion.span
                    className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500 border-2 border-[#111]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <span className="text-[14px] font-semibold text-[#F5F5F5]">Infera AI</span>
                  <span className="text-[11px] text-[#555] ml-2 font-mono">· Portfolio Assistant</span>
                </div>
              </div>

              {/* New Conversation button always visible in header */}
              {messages.length > 0 && (
                <button
                  onClick={() => {
                    setMessages([]);
                    setStreamingText("");
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#262626] font-mono text-[11px] uppercase tracking-wider text-[#666] hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300 cursor-pointer bg-[#0D0D0D]"
                >
                  <Sparkles size={12} strokeWidth={1.5} />
                  New
                </button>
              )}
            </div>

            {/* Messages Area */}
            <div className="h-[400px] md:h-[460px] overflow-y-auto p-5 md:p-6 space-y-6 scrollbar-none">
              {/* Empty state when no messages */}
              {messages.length === 0 && !isLoading && !streamingText && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center h-full min-h-[300px] text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 flex items-center justify-center mb-5">
                    <MessageSquare size={28} strokeWidth={1.5} className="text-[#D4AF37]" />
                  </div>
                  <p className="font-mono text-[15px] text-[#555] mb-2">
                    Start a conversation with Infera AI
                  </p>
                  <p className="font-mono text-[12px] text-[#333] max-w-sm">
                    Type a question below or click one of the quick questions above
                  </p>
                </motion.div>
              )}

              {/* Messages */}
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="relative shrink-0 mt-1 mr-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37]/25 to-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
                        <Bot size={16} strokeWidth={1.5} className="text-[#D4AF37]" />
                      </div>
                    </div>
                  )}
                  <div
                    className={`${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-[#D4AF37]/12 to-[#D4AF37]/5 border border-[#D4AF37]/20 text-[#F5F5F5] rounded-2xl rounded-br-md"
                        : "bg-[#161616]/80 border border-[#222]/60 text-[#D4D4D4] rounded-2xl rounded-bl-md"
                    } px-5 py-3.5 max-w-[85%] md:max-w-[75%]`}
                  >
                    {msg.role === "assistant" ? (
                      <MarkdownContent content={msg.content} onNavigate={navigate} />
                    ) : (
                      <p className="text-[15px] leading-relaxed font-body">{msg.content}</p>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="shrink-0 mt-1 ml-3">
                      <div className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-[#262626] flex items-center justify-center">
                        <span className="text-[13px] font-semibold text-[#888]">TK</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Streaming / Typewriter message — rendered through ReactMarkdown */}
              <AnimatePresence>
                {streamingText && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="flex justify-start"
                  >
                    <div className="relative shrink-0 mt-1 mr-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37]/25 to-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
                        <Bot size={16} strokeWidth={1.5} className="text-[#D4AF37]" />
                      </div>
                    </div>
                    <div className="bg-[#161616]/80 border border-[#222]/60 rounded-2xl rounded-bl-md px-5 py-3.5 max-w-[85%] md:max-w-[75%]">
                      <div className="inline">
                        <MarkdownContent content={streamingText} onNavigate={navigate} />
                      </div>
                      <motion.span
                        className="inline-block w-[2px] h-[16px] bg-[#D4AF37] align-text-bottom ml-0.5"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Typing indicator */}
              <AnimatePresence>
                {isLoading && !streamingText && <TypingIndicator />}
              </AnimatePresence>

              <div ref={chatEndRef} />
            </div>

            {/* ════ INPUT AREA (always visible) ════ */}
            <div className="border-t border-[#262626]/40 bg-gradient-to-b from-transparent to-[#0B0B0B] p-4 md:p-5">
              <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about Tarannum's portfolio..."
                  disabled={isLoading}
                  rows={1}
                  className="w-full bg-[#0B0B0B] border border-[#262626] rounded-xl pl-5 pr-16 py-[20px] text-[15px] font-body text-[#F5F5F5] placeholder-[#444] outline-none focus:border-[#D4AF37]/30 focus:bg-[#0D0D0D] transition-all disabled:opacity-50 resize-none overflow-hidden min-h-[60px] max-h-[160px]"
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#c4a030] text-[#080808] hover:from-[#e6c358] hover:to-[#D4AF37] transition-all disabled:opacity-25 disabled:hover:from-[#D4AF37] disabled:hover:to-[#c4a030] cursor-pointer flex items-center justify-center shadow-lg shadow-[#D4AF37]/10"
                >
                  {isLoading ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Send size={16} strokeWidth={1.5} />
                    </motion.span>
                  ) : (
                    <Send size={16} strokeWidth={1.5} />
                  )}
                </button>
              </form>

              {/* Footer hint */}
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="font-mono text-[11px] text-[#333]">
                  Press <kbd className="px-1.5 py-0.5 rounded border border-[#262626] text-[10px] text-[#555] bg-[#0D0D0D]">Enter</kbd> to send ·
                  <kbd className="px-1.5 py-0.5 rounded border border-[#262626] text-[10px] text-[#555] bg-[#0D0D0D] ml-1">Shift</kbd> +
                  <kbd className="px-1.5 py-0.5 rounded border border-[#262626] text-[10px] text-[#555] bg-[#0D0D0D] ml-1">Enter</kbd> for new line
                </span>
              </div>

              {/* Branding */}
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <span className="text-[9px] font-mono text-[#333] uppercase tracking-[0.2em]">Powered by</span>
                <span className="text-[9px] font-mono text-[#444] uppercase tracking-[0.2em]">Infera AI</span>
                <span className="text-[7px] text-[#2a2a2a] mx-1">·</span>
                <span className="text-[9px] font-mono text-[#2a2a2a] uppercase tracking-[0.2em]">Mistral 7B</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </PageLayout>
  );
};

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Bot,
  Send,
  Sparkles,
  ChevronDown,
  FileText,
  Github,
  Linkedin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ─── SUGGESTED QUESTIONS ─────────────────────────────
const SUGGESTED_QUESTIONS = [
  "Tell me about Tarannum",
  "Show your projects",
  "Tell me about your internships",
  "What technologies do you know?",
  "What certifications do you have?",
  "Tell me about your education",
  "Download your resume",
  "Open GitHub",
  "Open LinkedIn",
];

// Actions that are safe to auto-execute (external links / downloads)
const SAFE_EXTERNAL_ACTIONS = new Set([
  "DOWNLOAD_RESUME",
  "OPEN_GITHUB",
  "OPEN_LINKEDIN",
  "OPEN_EMAIL",
]);

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

  window.open(target, "_blank", "noopener,noreferrer");
  return true;
}

/**
 * Build markdown clickable action buttons for navigation actions.
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

// ─── TYPING INDICATOR ────────────────────────────────
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex items-start gap-2.5 justify-start"
    >
      <div className="relative shrink-0 mt-0.5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37]/25 to-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
          <Bot size={14} strokeWidth={1.5} className="text-[#D4AF37]" />
        </div>
      </div>
      <div className="bg-[#161616] border border-[#222]/60 rounded-2xl rounded-bl-md px-4 py-3 max-w-[78%] flex items-center">
        <div className="flex items-center gap-1.5 py-1">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
          />
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── MARKDOWN RENDERERS ──────────────────────────────
function MarkdownContent({ content, onNavigate }) {
  return (
    <div className="text-[14px] leading-relaxed font-body prose prose-invert prose-sm max-w-none">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => (
          <p className="mb-2 last:mb-0 text-[#D4D4D4]">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-[#F5F5F5]">{children}</strong>
        ),
        ul: ({ children }) => (
          <ul className="space-y-1 mb-2 last:mb-0 pl-4">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="space-y-1 mb-2 last:mb-0 pl-4 list-decimal">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="text-[#D4D4D4] marker:text-[#D4AF37]">{children}</li>
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
            <div className="relative group my-3">
              <div className="absolute top-0 right-0 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#666] bg-[#1a1a2e]/80 rounded-bl-lg rounded-tr-lg border-l border-b border-[#262626]">
                {className?.replace("language-", "") || "code"}
              </div>
              <pre className="bg-[#0D0D1A] border border-[#1a1a2e] rounded-xl p-4 pt-8 overflow-x-auto scrollbar-none">
                <code className={`${className || ""} text-[13px] font-mono leading-relaxed text-[#D4D4D4]`} {...props}>
                  {children}
                </code>
              </pre>
            </div>
          );
        },
        a: ({ children, href }) => {
          if (href && href.startsWith("@navigate:")) {
            const path = decodeURIComponent(href.slice("@navigate:".length));
            return (
              <button
                onClick={() => onNavigate && onNavigate(path)}
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
              className="text-[#D4AF37] underline decoration-[#D4AF37]/30 hover:decoration-[#D4AF37] transition-colors"
            >
              {children}
            </a>
          );
        },
        h1: ({ children }) => (
          <h1 className="text-[16px] font-bold text-[#F5F5F5] mt-3 mb-2">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-[15px] font-semibold text-[#F5F5F5] mt-3 mb-2">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-[14px] font-semibold text-[#F5F5F5] mt-2 mb-1">
            {children}
          </h3>
        ),
        hr: () => (
          <hr className="border-[#262626] my-3" />
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-[#D4AF37]/40 pl-3 italic text-[#999] my-2">
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

// ─── COMPONENT ──────────────────────────────────────
export const PortfolioChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `👋 Hi! I'm **Infera AI**, your portfolio assistant for **Tarannum Khan**.

Ask me anything about her projects, experience, skills, education, certifications, or achievements. I'm here to help!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  const handleSend = useCallback(
    async (text) => {
      if (!text.trim() || isLoading) return;

      const userMsg = text.trim();
      setInput("");

      // Add user message
      setMessages((prev) => [...prev, { role: "user", content: userMsg }]);

      // Show loading
      setIsLoading(true);

      try {
        // Build conversation history for context
        const history = messages
          .filter((m) => m.role !== "system")
          .slice(-10) // Keep last 10 messages for context
          .map((m) => ({
            role: m.role,
            content: m.content,
          }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMsg, history }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

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
        const actionBtns = buildActionButtons(navActions);
        if (actionBtns) {
          reply += "\n\n---\n" + actionBtns;
        }

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: reply },
        ]);
      } catch (error) {
        console.error("Chat error:", error);

        // Fallback: try the local rule-based engine if API fails
        try {
          const { generateResponse } = await import("./fallbackEngine.js");
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
          const fbActionBtns = buildActionButtons(fbNavActions);
          if (fbActionBtns) {
            reply += "\n\n---\n" + fbActionBtns;
          }

          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: reply },
          ]);
        } catch {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "I'm temporarily unavailable. Please try again shortly.",
            },
          ]);
        }
      } finally {
        setIsLoading(false);
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

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-[#D4AF37] hover:bg-[#e6c358] text-[#080808] shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        aria-label={isOpen ? "Close Infera AI" : "Open Infera AI assistant"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} strokeWidth={2} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles size={22} strokeWidth={1.5} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Notification dot when closed */}
      {!isOpen && messages.length <= 1 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-[90px] right-8 z-40 w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/50"
        />
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 sm:right-8 z-40 w-[calc(100%-2rem)] sm:w-[400px] max-w-[420px] h-[560px] max-h-[75vh] rounded-2xl border border-[#262626]/80 bg-[#0B0B0B]/95 backdrop-blur-xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
            style={{ backdropFilter: "blur(20px)" }}
          >
            {/* Glass shine effect */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-white/[0.02] to-transparent" />

            {/* Header */}
            <div className="relative shrink-0 flex items-center gap-3 px-5 py-4 border-b border-[#262626]/50 bg-gradient-to-r from-[#111111] to-[#0D0D0D]">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30 flex items-center justify-center">
                  <Bot size={18} strokeWidth={1.5} className="text-[#D4AF37]" />
                </div>
                <motion.span
                  className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[#111]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] text-[#F5F5F5] font-semibold tracking-tight">
                  Infera AI
                </p>
                <p className="font-mono text-[10px] text-[#666] tracking-wider uppercase">
                  Ask anything about Tarannum Khan
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full border border-[#262626] flex items-center justify-center text-[#555] hover:text-[#F5F5F5] hover:border-[#444] hover:bg-white/[0.03] transition-all cursor-pointer shrink-0"
              >
                <ChevronDown size={14} strokeWidth={1.5} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="relative flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: idx === messages.length - 1 ? 0.1 : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`flex items-start gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="relative shrink-0 mt-0.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37]/25 to-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
                        <Bot size={14} strokeWidth={1.5} className="text-[#D4AF37]" />
                      </div>
                    </div>
                  )}
                  <div
                    className={`${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-[#D4AF37]/15 to-[#D4AF37]/5 border border-[#D4AF37]/20 text-[#F5F5F5] rounded-2xl rounded-br-md"
                        : "bg-[#161616]/80 border border-[#222]/60 text-[#D4D4D4] rounded-2xl rounded-bl-md"
                    } px-4 py-2.5 max-w-[78%]`}
                  >
                    {msg.role === "assistant" ? (
                      <MarkdownContent content={msg.content} onNavigate={navigate} />
                    ) : (
                      <p className="text-[14px] leading-relaxed font-body">
                        {msg.content}
                      </p>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="shrink-0 mt-0.5">
                      <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#262626] flex items-center justify-center">
                        <span className="text-[11px] font-semibold text-[#888]">TK</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isLoading && <TypingIndicator />}
              </AnimatePresence>

              {/* Suggested questions (only before first user message) */}
              {messages.length === 1 && !isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="pt-2 pl-[38px]"
                >
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[#555] mb-2.5">
                    Suggested questions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map((prompt) => {
                      const isAction =
                        prompt.startsWith("Download") ||
                        prompt.startsWith("Open");
                      return (
                        <button
                          key={prompt}
                          onClick={() => handleSend(prompt)}
                          className="group text-[12px] font-mono text-[#888] hover:text-[#D4AF37] border border-[#262626] hover:border-[#D4AF37]/30 px-3 py-1.5 rounded-full transition-all cursor-pointer bg-[#111]/30 hover:bg-[#D4AF37]/5 flex items-center gap-1.5"
                        >
                          {isAction ? (
                            <>
                              {prompt.includes("GitHub") && (
                                <Github size={10} strokeWidth={1.5} />
                              )}
                              {prompt.includes("LinkedIn") && (
                                <Linkedin size={10} strokeWidth={1.5} />
                              )}
                              {prompt.includes("resume") && (
                                <FileText size={10} strokeWidth={1.5} />
                              )}
                              {prompt}
                            </>
                          ) : (
                            prompt
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              <div ref={scrollRef} />
            </div>

            {/* Input Area */}
            <div className="relative shrink-0 p-4 bg-gradient-to-b from-transparent to-[#0B0B0B] border-t border-[#262626]/40">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about Tarannum..."
                  disabled={isLoading}
                  className="w-full bg-[#0B0B0B] border border-[#262626] rounded-xl pl-4 pr-14 py-3 text-[14px] font-body text-[#F5F5F5] placeholder-[#444] outline-none focus:border-[#D4AF37]/30 focus:bg-[#0D0D0D] transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4AF37]/15 to-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/30 transition-all disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:border-[#D4AF37]/20 cursor-pointer"
                >
                  {isLoading ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Send size={13} strokeWidth={1.5} />
                    </motion.span>
                  ) : (
                    <Send size={13} strokeWidth={1.5} />
                  )}
                </button>
              </form>

              {/* Footer branding */}
              <div className="flex items-center justify-center mt-2 gap-1">
                <span className="text-[9px] font-mono text-[#333] uppercase tracking-widest">
                  Powered by
                </span>
                <span className="text-[9px] font-mono text-[#555] uppercase tracking-widest">
                  Infera AI
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

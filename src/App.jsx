import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { FontLoader } from "./components/FontLoader";
import { Navbar } from "./components/Navbar/Navbar";
import { FloatingMenu } from "./components/FloatingMenu/FloatingMenu";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Lazy load chatbot — only loads when user opens it
const PortfolioChatbot = lazy(() =>
  import("./components/Chatbot/PortfolioChatbot").then((m) => ({
    default: m.PortfolioChatbot,
  }))
);

// Pages
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { Achievements } from "./pages/Achievements";
import { Training } from "./pages/Training";
import { Certifications } from "./pages/Certifications";
import { Resume } from "./pages/Resume";
import { InferaAI } from "./pages/InferaAI";
import { Contact } from "./pages/Contact";

// Scroll restoration component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="bg-[#0B0B0B] min-h-screen text-[#F5F5F5] font-body selection:bg-[#D4AF37] relative">
      <FontLoader />
      <Navbar onOpenNav={() => setNavOpen((prev) => !prev)} isNavOpen={navOpen} />
      <FloatingMenu isOpen={navOpen} onClose={() => setNavOpen(false)} />
      <ErrorBoundary>
        <Suspense fallback={null}>
          <PortfolioChatbot />
        </Suspense>
      </ErrorBoundary>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/training" element={<Training />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/infera-ai" element={<ErrorBoundary><InferaAI /></ErrorBoundary>} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

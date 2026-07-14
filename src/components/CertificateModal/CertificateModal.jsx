import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ZoomIn, ZoomOut, RotateCcw, FileText } from "lucide-react";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } },
};

function isPdf(path) {
  if (!path) return false;
  return path.toLowerCase().endsWith(".pdf");
}

function isImage(path) {
  if (!path) return false;
  const ext = path.split(".").pop().toLowerCase();
  return ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"].includes(ext);
}

export const CertificateModal = ({ achievement, onClose }) => {
  const [loadError, setLoadError] = useState(false);
  const [scale, setScale] = useState(1);
  const [imgLoaded, setImgLoaded] = useState(false);

  const fileSrc = achievement?.credentialFile || achievement?.image || achievement?.thumbnail || achievement?.file || achievement?.pdf;
  const isPdfFile = isPdf(fileSrc);
  const isImgFile = isImage(fileSrc);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        if (!isPdfFile && scale > 1) { setScale(1); return; }
        onClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, scale, isPdfFile]);

  // Scroll to zoom (images only)
  const handleWheel = useCallback((e) => {
    if (isPdfFile) return;
    if (e.deltaY < 0) {
      setScale((s) => Math.min(s + 0.25, 4));
    } else {
      setScale((s) => Math.max(s - 0.25, 0.5));
    }
  }, [isPdfFile]);

  if (!achievement) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {/* Backdrop with blur */}
        <motion.div
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
          variants={overlayVariants}
          onClick={() => {
            if (!isPdfFile && scale > 1) { setScale(1); return; }
            onClose();
          }}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-[#0B0B0B] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl flex flex-col w-full max-w-4xl max-h-[90vh]"
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#262626] shrink-0 z-10 bg-[#0B0B0B]">
            <div className="min-w-0 flex-1 pr-4">
              <h3 className="font-display text-lg text-[#F5F5F5] font-semibold truncate">
                {achievement.title}
              </h3>
              <p className="font-mono text-[13px] text-[#A1A1A1] mt-0.5">
                {achievement.org || achievement.organization} &middot; {achievement.year}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {/* Zoom controls - only for images */}
              {isImgFile && !isPdfFile && (
                <>
                  <button
                    onClick={() => setScale((s) => Math.max(s - 0.25, 0.5))}
                    className="w-8 h-8 rounded-full border border-[#262626] flex items-center justify-center text-[#666] hover:text-[#F5F5F5] hover:border-[#444] transition-colors cursor-pointer"
                    title="Zoom out"
                  >
                    <ZoomOut size={14} strokeWidth={1.5} />
                  </button>
                  <span className="font-mono text-[12px] text-[#666] w-10 text-center">
                    {Math.round(scale * 100)}%
                  </span>
                  <button
                    onClick={() => setScale((s) => Math.min(s + 0.25, 4))}
                    className="w-8 h-8 rounded-full border border-[#262626] flex items-center justify-center text-[#666] hover:text-[#F5F5F5] hover:border-[#444] transition-colors cursor-pointer"
                    title="Zoom in"
                  >
                    <ZoomIn size={14} strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => setScale(1)}
                    className="w-8 h-8 rounded-full border border-[#262626] flex items-center justify-center text-[#666] hover:text-[#F5F5F5] hover:border-[#444] transition-colors cursor-pointer"
                    title="Reset zoom"
                  >
                    <RotateCcw size={13} strokeWidth={1.5} />
                  </button>
                  <div className="w-px h-6 bg-[#262626] mx-1" />
                </>
              )}
              {fileSrc && (
                <a
                  href={fileSrc}
                  download
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#D4AF37]/40 text-[13px] font-mono uppercase tracking-widest text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors cursor-pointer"
                >
                  <Download size={14} strokeWidth={1.5} />
                  Download
                </a>
              )}
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full border border-[#262626] flex items-center justify-center text-[#666] hover:text-[#F5F5F5] hover:border-[#444] transition-colors cursor-pointer"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div
            className={`flex-1 overflow-auto bg-[#050505] flex items-center justify-center min-h-[300px] ${
              isImgFile && !isPdfFile ? "p-4 cursor-grab active:cursor-grabbing" : ""
            }`}
            onWheel={handleWheel}
          >
            {!fileSrc ? (
              <div className="text-center py-10">
                <FileText size={48} className="text-[#333] mx-auto mb-4" strokeWidth={1} />
                <p className="font-body text-[#A1A1A1]">No preview available.</p>
              </div>
            ) : loadError ? (
              <div className="text-center py-10">
                <FileText size={48} className="text-[#333] mx-auto mb-4" strokeWidth={1} />
                <p className="font-body text-[#A1A1A1] mb-4">Preview unavailable.</p>
                <a
                  href={fileSrc}
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4AF37] text-[#080808] text-[13px] font-mono uppercase tracking-widest font-medium hover:bg-[#e6c358] transition-colors cursor-pointer"
                >
                  <Download size={14} strokeWidth={1.5} />
                  Download File
                </a>
              </div>
            ) : isPdfFile ? (
              /* PDF: Use iframe */
              <iframe
                src={fileSrc}
                className="w-full h-[75vh] rounded-lg"
                title={achievement.title}
              />
            ) : isImgFile ? (
              /* Image: Lightbox with zoom */
              <div className="flex items-center justify-center w-full h-full">
                {!imgLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={fileSrc}
                  alt={achievement.title}
                  loading="lazy"
                  className="max-w-full max-h-[65vh] object-contain rounded-lg transition-transform duration-200 ease-out"
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: "center center",
                    opacity: imgLoaded ? 1 : 0,
                  }}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setLoadError(true)}
                  draggable={false}
                />
              </div>
            ) : (
              /* Fallback */
              <div className="text-center py-10">
                <FileText size={48} className="text-[#333] mx-auto mb-4" strokeWidth={1} />
                <p className="font-body text-[#A1A1A1] mb-4">Preview unavailable for this file type.</p>
                <a
                  href={fileSrc}
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4AF37] text-[#080808] text-[13px] font-mono uppercase tracking-widest font-medium hover:bg-[#e6c358] transition-colors cursor-pointer"
                >
                  <Download size={14} strokeWidth={1.5} />
                  Download File
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

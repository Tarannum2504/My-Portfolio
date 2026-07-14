import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Award, Trophy, Medal } from "lucide-react";
import { Reveal } from "./Reveal";
import { getFeaturedAchievements } from "../data/credentials";
import { CertificateModal } from "./CertificateModal/CertificateModal";

const typeIcons = {
  Academic: Medal,
  Competition: Trophy,
  Scholarship: Award,
};

function AchievementCard({ a, Icon, onView, delay }) {
  return (
    <Reveal key={a.id} delay={delay}>
      <div className="group border border-[#262626] hover:border-[#D4AF37]/30 rounded-2xl overflow-hidden bg-[#111111]/30 gold-glow transition-all duration-300 flex flex-col h-full">
        {/* Preview Area */}
        <div className="aspect-[4/3] bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden border-b border-[#262626]/40">
          {a.thumbnail || a.image ? (
            <img
              src={a.thumbnail || a.image}
              alt={a.title}
              loading="lazy"
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <Icon size={48} className="text-[#333] group-hover:text-[#D4AF37]/30 transition-colors" strokeWidth={1} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Info */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[12px] uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-2.5 py-0.5 rounded-full">
                {a.type}
              </span>
              <span className="font-mono text-[13px] text-[#666]">{a.year}</span>
            </div>
            <h3 className="font-display text-lg text-[#F5F5F5] font-semibold mb-1 group-hover:text-[#D4AF37] transition-colors">
              {a.title}
            </h3>
            <p className="font-body text-[15px] text-[#A1A1A1]">{a.org}</p>
            {a.description && (
              <p className="font-body text-[14px] leading-relaxed text-[#888] mt-3">{a.description}</p>
            )}
          </div>

          <div className="flex items-center gap-3 border-t border-[#222]/30 pt-4 mt-4">
            {a.pdf ? (
              <a
                href={a.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[14px] uppercase tracking-widest text-[#F5F5F5] hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                <Eye size={13} strokeWidth={1.5} /> View Credential
              </a>
            ) : a.image ? (
              <button
                onClick={() => onView(a)}
                className="inline-flex items-center gap-1.5 font-mono text-[14px] uppercase tracking-widest text-[#F5F5F5] hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                <Eye size={13} strokeWidth={1.5} /> View
              </button>
            ) : (
              <span className="font-mono text-[14px] uppercase tracking-widest text-[#555]">
                No credential
              </span>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export const FeaturedAchievements = () => {
  const featured = getFeaturedAchievements();
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Reveal>
        <div className="mb-6">
          <div className="font-mono text-[19px] tracking-[0.35em] uppercase text-[#D4AF37]">
            ACHIEVEMENTS
          </div>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((a, i) => (
          <AchievementCard
            key={a.id}
            a={a}
            Icon={typeIcons[a.type] || Award}
            onView={setSelected}
            delay={i * 0.06}
          />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Reveal delay={0.2}>
          <Link
            to="/achievements"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#262626] rounded-full font-mono text-[16px] uppercase tracking-widest text-[#F5F5F5] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors duration-300 gold-glow lift cursor-pointer"
          >
            View All Achievements &rarr;
          </Link>
        </Reveal>
      </div>

      {selected && (
        <CertificateModal
          achievement={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
};

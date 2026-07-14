import React from "react";
import { GraduationCap, BookOpen, Award } from "lucide-react";
import { Reveal } from "./Reveal";
import { education } from "../data/portfolio";

export const EducationSection = () => {
  return (
    <>
      <Reveal>
        <div className="mb-6">
          <div className="font-mono text-[19px] tracking-[0.35em] uppercase text-[#D4AF37]">
            EDUCATION
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="w-full max-w-3xl">
          <div className="group border border-[#262626] hover:border-[#D4AF37]/30 rounded-2xl p-8 md:p-12 bg-[#111111]/30 gold-glow transition-all duration-300">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-full border border-[#262626] flex items-center justify-center shrink-0 bg-[#111] group-hover:border-[#D4AF37]/40 transition-colors">
                <GraduationCap size={24} className="text-[#D4AF37]" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                {/* Institution & Degree */}
                <p className="font-mono text-[13px] uppercase tracking-widest text-[#D4AF37]/80 mb-2">
                  {education.institution}
                </p>
                <h3 className="font-display text-2xl text-[#F5F5F5] font-semibold mb-1 group-hover:text-[#D4AF37] transition-colors">
                  {education.degree}
                </h3>
                <p className="font-body text-[17px] text-[#A1A1A1] mb-5">
                  {education.field}
                </p>

                {/* Period & CGPA Row */}
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <span className="font-mono text-[13px] text-[#888]">
                    {education.period}
                  </span>
                  <span className="text-[#262626] hidden sm:inline">|</span>
                  <span className="font-mono text-[13px] text-[#888]">
                    {education.year}
                  </span>
                  <span className="text-[#262626] hidden sm:inline">|</span>
                  <span className="font-mono text-[13px] text-[#D4AF37]">
                    CGPA: {education.cgpa}
                  </span>
                </div>

                {/* Relevant Coursework */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <BookOpen size={14} className="text-[#D4AF37]" strokeWidth={1.5} />
                    <span className="font-mono text-[13px] uppercase tracking-widest text-[#666]">
                      Relevant Coursework
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-5">
                    {education.coursework.map((course) => (
                      <span
                        key={course}
                        className="font-mono text-[14px] px-3.5 py-1.5 rounded-full border border-[#262626]/80 text-[#A1A1A1]/95 bg-[#111111]/10"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </>
  );
};

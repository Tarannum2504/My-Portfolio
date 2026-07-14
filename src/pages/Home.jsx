import React from "react";
import { LED } from "../components/LED/LED";
import { Hero } from "../components/Hero/Hero";
import { About } from "../components/About/About";
import { GitHubActivity } from "../components/GitHubActivity";
import { Stack } from "../components/TechStack/TechStack";
import { ExperienceSection } from "../components/PreviewCards/ExperienceSection";
import { EducationSection } from "../components/EducationSection";
import { Footer } from "../components/Footer/Footer";

export const Home = () => {
  return (
    <div className="bg-[#080808] min-h-screen text-[#F5F5F5]">
      <LED />
      <Hero />

      {/* About */}
      <section className="border-t border-[#262626]/50 py-10" id="about">
        <div className="site-container">
          <About />
        </div>
      </section>

      {/* GitHub Activity */}
      <section className="border-t border-[#262626]/50 py-10" id="github">
        <div className="site-container">
          <GitHubActivity />
        </div>
      </section>

      {/* Tech Stack */}
      <section className="border-t border-[#262626]/50 py-10" id="stack">
        <div className="site-container">
          <Stack />
        </div>
      </section>

      {/* Experience */}
      <section className="border-t border-[#262626]/50 py-10" id="experience">
        <div className="site-container">
          <ExperienceSection />
        </div>
      </section>

      {/* Education */}
      <section className="border-t border-[#262626]/50 py-10" id="education">
        <div className="site-container">
          <EducationSection />
        </div>
      </section>

      <Footer />
    </div>
  );
};

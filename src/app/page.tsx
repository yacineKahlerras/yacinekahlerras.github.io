"use client";
import AboutSection from "@/componnents/aboutSection";
import ContactSection from "@/componnents/contactSection";
import HeaderSection from "@/componnents/headerSection";
import Navbar from "@/componnents/navbar";
import ProjectsSection from "@/componnents/projectsSection";
import SkillsSection from "@/componnents/skillsSection";

export default function PortfolioApp() {
  return (
    <div>
      <Navbar />

      <main>
        <HeaderSection />
        <SkillsSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>

      <div className="note">Thanks for contacting i'll respond soon !</div>
    </div>
  );
}

"use client";
import AboutSection from "@/componnents/aboutSection";
import ContactSection from "@/componnents/contactSection";
import HeaderSection from "@/componnents/headerSection";
import Navbar from "@/componnents/navbar";
import ProjectsSection from "@/componnents/projectsSection";
import SkillsSection from "@/componnents/skillsSection";
import { IsSocialsContext } from "@/utils/isSocialsContext";
import { useSearchParams } from "next/navigation";

export default function PortfolioApp() {
  const searchParams = useSearchParams();
  const isSocials = searchParams.get("socials");

  return (
    <IsSocialsContext.Provider value={{ isSocials: isSocials !== null }}>
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
    </IsSocialsContext.Provider>
  );
}

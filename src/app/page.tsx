import AboutSection from "@/componnents/aboutSection";
import BackToTop from "@/componnents/backToTop";
import ContactSection from "@/componnents/contactSection";
import HeaderSection from "@/componnents/headerSection";
import Navbar from "@/componnents/navbar";
import ProjectsSection from "@/componnents/projectsSection";
import SkillsSection from "@/componnents/skillsSection";
import WarpField from "@/componnents/warpField";

export default function Home() {
  return (
    <>
      <WarpField />
      <div className="tunnel-glow" aria-hidden="true" />
      <div className="content" id="top">
        <Navbar />
        <HeaderSection />
        <div className="hull">
          <ProjectsSection />
          <SkillsSection />
          <AboutSection />
          <ContactSection />
        </div>
      </div>
      <BackToTop />
    </>
  );
}

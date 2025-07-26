import { projectsInfos } from "@/data/projectsInfo";
import { useState } from "react";
import ProjectModal from "./projectModal";
import { useIsSocialsContext } from "@/utils/isSocialsContext";

export default function ProjectsSection() {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const isSocials = useIsSocialsContext();
  const projectsList = isSocials ? projectsInfos.pro : projectsInfos.personal;

  return (
    <>
      <section id="projects" className="projects">
        <div className="projects-center">
          <h3>Projects</h3>
          <ul className="projects-list">
            {projectsList.map((project, index) => (
              <li key={index} onClick={() => setActiveModal(index)}>
                <div className="individual-project">
                  <img src={project.img} alt={project.title} />
                </div>
              </li>
            ))}
          </ul>
          <div className="loading-projects hide-loading"></div>
        </div>
      </section>

      <ProjectModal activeModal={activeModal} setActiveModal={setActiveModal} />
    </>
  );
}

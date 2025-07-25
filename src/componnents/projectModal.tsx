import { projectsInfos } from "@/data/projectsInfo";

export default function ProjectModal({
  activeModal,
  setActiveModal,
}: {
  activeModal: number | undefined;
  setActiveModal: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  return (
    <aside
      className="project-modal"
      onClick={(e: any) =>
        e.target.classList.contains("project-modal") &&
        setActiveModal(undefined)
      }
    >
      <div className="modal-center">
        <div className="close-btn-container">
          <button
            className="close-btn"
            onClick={() => setActiveModal(undefined)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15">
              <path
                fill="#FFF"
                d="M8 5.379L13.303.075l2.122 2.122L10.12 7.5l5.304 5.303-2.122 2.122L8 9.62l-5.303 5.304-2.122-2.122L5.88 7.5.575 2.197 2.697.075 8 5.38z"
              />
            </svg>
          </button>
        </div>

        <div className="project-modal-img-container">
          {activeModal && (
            <img
              className="project-modal-img"
              src={projectsInfos[activeModal].img}
              alt="project screenshot"
            />
          )}
        </div>

        <div className="modal-btn-container">
          {activeModal && projectsInfos[activeModal].source && (
            <a
              className="source-btn"
              href={projectsInfos[activeModal].source}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>
          )}
          {activeModal && (
            <a
              className="live-btn"
              href={projectsInfos[activeModal].live}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live
            </a>
          )}
        </div>

        <h3 className="modal-project-title">
          {activeModal && projectsInfos[activeModal].title}
        </h3>
        <p className="project-text">
          {activeModal && projectsInfos[activeModal].description}
        </p>
      </div>
    </aside>
  );
}

import { projectsInfos } from "@/data/projectsInfo";
import { useIsSocialsContext } from "@/utils/isSocialsContext";

export default function ProjectModal({
  activeModal,
  setActiveModal,
}: {
  activeModal: number | null;
  setActiveModal: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const isSocials = useIsSocialsContext();
  const projectsList = isSocials ? projectsInfos.personal : projectsInfos.pro;
  return (
    <aside
      className={`project-modal ${activeModal !== null ? "show-modal" : ""}`}
      onClick={() => setActiveModal(null)}
    >
      <div className="modal-center">
        <div className="close-btn-container">
          <button className="close-btn" onClick={() => setActiveModal(null)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15">
              <path
                fill="#FFF"
                d="M8 5.379L13.303.075l2.122 2.122L10.12 7.5l5.304 5.303-2.122 2.122L8 9.62l-5.303 5.304-2.122-2.122L5.88 7.5.575 2.197 2.697.075 8 5.38z"
              />
            </svg>
          </button>
        </div>

        <div className="project-modal-img-container">
          {activeModal !== null && (
            <img
              className="project-modal-img"
              src={projectsList[activeModal].img}
              alt="project screenshot"
            />
          )}
        </div>

        <div className="modal-btn-container">
          {activeModal !== null && projectsList[activeModal].source && (
            <a
              className="source-btn"
              href={projectsList[activeModal].source}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#647BFF"
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>
          )}
          {activeModal !== null && (
            <a
              className="live-btn"
              href={projectsList[activeModal].live}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-box-arrow-up-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                />
                <path
                  fillRule="evenodd"
                  d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                />
              </svg>
            </a>
          )}
        </div>

        <h3 className="modal-project-title">
          {activeModal !== null && projectsList[activeModal].title}
        </h3>
        <p className="project-text">
          {activeModal !== null && projectsList[activeModal].description}
        </p>
      </div>
    </aside>
  );
}

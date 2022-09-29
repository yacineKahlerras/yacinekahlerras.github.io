/**
 * ==========================
 * ==========================
 *          sidemenu
 * ==========================
 * ==========================
 * */
const hamburger = document.querySelector(".hamburger");
const sidemenu = document.querySelector(".sidemenu");
const sidemenuLinks = [...document.querySelector(".sidemenu-links").children];
const bodySections = [
  document.querySelector(".hero"),
  document.querySelector(".skills"),
  document.querySelector(".projects"),
  document.querySelector(".about"),
  document.querySelector(".contact"),
];

/** handles sidemenu visibility on/off */
const sidemenuVisibility = () => {
  sidemenu.classList.toggle("sidemenu-active");
  hamburger.firstElementChild.classList.toggle("open");
};

/** event listeners */
hamburger.addEventListener("click", sidemenuVisibility);
sidemenuLinks.forEach((link, index) => {
  link.addEventListener("click", () => {
    sidemenuVisibility();
    setTimeout(() => {
      let elementAling = index == 2 ? "start" : "center";
      bodySections[index].scrollIntoView({
        behavior: "smooth",
        block: `${elementAling}`,
        inline: "center",
      });
    }, 500);
  });
});

/**
 * ==========================
 * ==========================
 *        project modals
 * ==========================
 * ==========================
 * */
const projectList = [...document.querySelector(".projects-list").children];
const projectModal = document.querySelector(".project-modal");
const closeModalBtn = document.querySelector(".close-btn");

const projectImg = document.querySelector(".project-modal-img");
const sourceBtn = document.querySelector(".source-btn");
const liveBtn = document.querySelector(".live-btn");
const projectText = document.querySelector(".project-text");

const projectsInfos = [
  {
    img: "./images/projects/project-1.png",
    source: "https://github.com/yacineKahlerras/bookmark-landing-page",
    live: "https://yacinekahlerras.github.io/bookmark-landing-page/",
    description: `Suspendisse viverra, nunc sed convallis cursus, mi erat scelerisque
                  dui, id pretium orci mi porttitor ipsum. Maecenas in auctor ligula,
                  sit amet vulputate sapien. Morbi congue dignissim consequat. Nunc at
                  maximus nunc. <br />

                  Nullam vehicula quis tellus nec tempor. Aliquam pretium, quam quis
                  porttitor vulputate, orci nulla viverra massa, nec condimentum ante
                  nulla sed ligula. Duis semper cursus semper. Vivamus dictum maximus
                  turpis non accumsan.`,
  },
  {
    img: "./images/projects/project-2.png",
    source: "https://github.com/yacineKahlerras/ip-address-tracker",
    live: "https://yacinekahlerras.github.io/ip-address-tracker/",
    description: `Suspendisse viverra, nunc sed convallis cursus, mi erat scelerisque
                  dui, id pretium orci mi porttitor ipsum. Maecenas in auctor ligula,
                  sit amet vulputate sapien. Morbi congue dignissim consequat. Nunc at
                  maximus nunc. <br />

                  Nullam vehicula quis tellus nec tempor. Aliquam pretium, quam quis
                  porttitor vulputate, orci nulla viverra massa, nec condimentum ante
                  nulla sed ligula. Duis semper cursus semper. Vivamus dictum maximus
                  turpis non accumsan.`,
  },
  {
    img: "./images/projects/project-3.png",
    source: "https://github.com/yacineKahlerras/url-shortening-api",
    live: "https://yacinekahlerras.github.io/url-shortening-api/",
    description: `Suspendisse viverra, nunc sed convallis cursus, mi erat scelerisque
                  dui, id pretium orci mi porttitor ipsum. Maecenas in auctor ligula,
                  sit amet vulputate sapien. Morbi congue dignissim consequat. Nunc at
                  maximus nunc. <br />

                  Nullam vehicula quis tellus nec tempor. Aliquam pretium, quam quis
                  porttitor vulputate, orci nulla viverra massa, nec condimentum ante
                  nulla sed ligula. Duis semper cursus semper. Vivamus dictum maximus
                  turpis non accumsan.`,
  },
  {
    img: "./images/projects/project-4.png",
    source: "https://github.com/yacineKahlerras/loopstudios-landing-page",
    live: "https://yacinekahlerras.github.io/loopstudios-landing-page/",
    description: `Suspendisse viverra, nunc sed convallis cursus, mi erat scelerisque
                  dui, id pretium orci mi porttitor ipsum. Maecenas in auctor ligula,
                  sit amet vulputate sapien. Morbi congue dignissim consequat. Nunc at
                  maximus nunc. <br />

                  Nullam vehicula quis tellus nec tempor. Aliquam pretium, quam quis
                  porttitor vulputate, orci nulla viverra massa, nec condimentum ante
                  nulla sed ligula. Duis semper cursus semper. Vivamus dictum maximus
                  turpis non accumsan.`,
  },
];

/** hides/shows modal */
const modalVisibility = (isVisible, index) => {
  if (isVisible) {
    projectModal.classList.add("show-modal");
    document.body.style.overflowY = "hidden";
    updateModalInfo(index);
  } else {
    projectModal.classList.remove("show-modal");
    document.body.style.overflowY = "scroll";
  }
};

/** updates modal info */
const updateModalInfo = (index) => {
  const project = projectsInfos[index];
  projectImg.src = project.img;
  sourceBtn.href = project.source;
  liveBtn.href = project.live;
  projectText.textContent = project.description;
};

/** listeners */
projectList.forEach((p, index) => {
  p.addEventListener("click", () => {
    modalVisibility(true, index);
  });
});

closeModalBtn.addEventListener("click", () => {
  modalVisibility(false);
});

projectModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("project-modal")) {
    modalVisibility(false);
  }
});

/**
 * ==========================
 * ==========================
 *       contact form
 * ==========================
 * ==========================
 * */

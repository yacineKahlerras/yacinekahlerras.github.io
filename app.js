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
const modalBg = document.querySelector(".modal-bg");

/** hides/shows modal */
const modalVisibility = (isVisible) => {
  if (isVisible) {
    projectModal.classList.add("show-modal");
    document.body.style.overflowY = "hidden";
  } else {
    projectModal.classList.remove("show-modal");
    document.body.style.overflowY = "scroll";
  }
};

/** listeners */
projectList.forEach((p) => {
  p.addEventListener("click", () => {
    modalVisibility(true);
  });
});

closeModalBtn.addEventListener("click", () => {
  modalVisibility(false);
});

modalBg.addEventListener("click", () => {
  modalVisibility(false);
});

projectModal.addEventListener("click", (e) => {
  if (e.target != projectModal.children[0]) {
    modalVisibility(false);
  }
});

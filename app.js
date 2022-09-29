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
const form = document.querySelector(".form");
const nameErrorMsg = document.querySelector(".name-error-msg");
const emailErrorMsg = document.querySelector(".email-error-msg");

const NAME_NEEDED_ERROR = "name is needed.";
const EMAIL_NEEDED_ERROR = "email is needed.";
const EMAIL_FORMAT_ERROR = "wrong email format.";

/** checks if field has a value */
const hasValue = (input, FIELD_NEEDED_ERROR) => {
  const inputValue = input.value.trim();
  if (inputValue == "") {
    return showError(input, FIELD_NEEDED_ERROR);
  }
  return showSuccess(input);
};

/** shows a message or effect */
const showMessage = (input, message, type) => {
  const errorMessage = input.nextElementSibling;
  errorMessage.textContent = message;

  input.classList = type ? "input-success" : "input-error";
  return type;
};

/** shows success effect */
const showSuccess = (input) => {
  return showMessage(input, "", true);
};

/** shows error effect */
const showError = (input, errorMsg) => {
  return showMessage(input, errorMsg, false);
};

/** checks email value and its format */
const validateEmail = (input, EMAIL_NEEDED_ERROR, EMAIL_FORMAT_ERROR) => {
  if (!hasValue(input, EMAIL_NEEDED_ERROR)) return false;

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailInputValue = input.value.trim();
  if (!emailRegex.test(emailInputValue)) {
    return showError(input, EMAIL_FORMAT_ERROR);
  }
  return true;
};

/** when submitting */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameValid = hasValue(form.elements["name"], NAME_NEEDED_ERROR);

  const emailValid = validateEmail(
    form.elements["email"],
    EMAIL_NEEDED_ERROR,
    EMAIL_FORMAT_ERROR
  );

  if (nameValid && emailValid) {
    alert("nigga we swoooooopiiiiiiin");
  }
});

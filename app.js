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
sidemenu.addEventListener("click", (e) => {
  if (e.target.classList.contains("sidemenu")) {
    sidemenuVisibility();
  }
});

/**
 * ==========================
 * ==========================
 *      navigation links
 * ==========================
 * ==========================
 * */
const navLinks = [...document.querySelector(".nav-links").children];

navLinks.forEach((link, index) => {
  link.addEventListener("click", () => {
    document.querySelector(".active-link").classList.remove("active-link");
    link.firstElementChild.classList.add("active-link");

    // scrolls down to the section
    setTimeout(() => {
      let elementAling = index == 2 ? "start" : "center";
      bodySections[index].scrollIntoView({
        behavior: "smooth",
        block: `${elementAling}`,
        inline: "center",
      });
    }, 400);
  });
});

/**
 * ==========================
 * ==========================
 *        project modals
 * ==========================
 * ==========================
 * */
let projectList = [...document.querySelector(".projects-list").children];
const projectModal = document.querySelector(".project-modal");
const closeModalBtn = document.querySelector(".close-btn");
const loadingAnimation = document.querySelector(".loading-projects");

const projectImgContainer = document.querySelector(
  ".project-modal-img-container"
);
const sourceBtn = document.querySelector(".source-btn");
const liveBtn = document.querySelector(".live-btn");
const projectTitle = document.querySelector(".modal-project-title");
const projectText = document.querySelector(".project-text");

const projectsInfos = [
  {
    img: "./images/projects/quiz-app.jpg",
    source: "https://github.com/yacineKahlerras/Quiz-React-App",
    live: "https://yacinekahlerras.github.io/Quiz-React-App/",
    title: "Quiz app",
    description: `an app that shortens links using an api. when app sends the inputed link
                  to the api and it sends back the shortened link that is displayed, 
                  you can copy then the shortened link by pressing the copy button.`,
  },
  {
    img: "./images/projects/todolist.jpg",
    source: "https://github.com/yacineKahlerras/todolist/",
    live: "https://yacinekahlerras.github.io/todolist/",
    title: "Todo list",
    description: `an app that shortens links using an api. when app sends the inputed link
                  to the api and it sends back the shortened link that is displayed, 
                  you can copy then the shortened link by pressing the copy button.`,
  },
  {
    img: "./images/projects/project-3.png",
    source: "https://github.com/yacineKahlerras/url-shortening-api",
    live: "https://yacinekahlerras.github.io/url-shortening-api/",
    title: "url shortener",
    description: `an app that shortens links using an api. when app sends the inputed link
                  to the api and it sends back the shortened link that is displayed, 
                  you can copy then the shortened link by pressing the copy button.`,
  },
  {
    img: "./images/projects/project-2.png",
    source: "https://github.com/yacineKahlerras/ip-address-tracker",
    live: "https://yacinekahlerras.github.io/ip-address-tracker/",
    title: "ip address tracker",
    description: `This one was a fun one to make it uses two different api's, the first gets your IP address and finds
                  its location and sends back approximate coordinates of that location.
                  
                  The second one uses those coordinates to display the location on a map.
                  You can click on the dice button to go random locations and explore them.`,
  },
  {
    img: "./images/projects/project-1.png",
    source: "https://github.com/yacineKahlerras/bookmark-landing-page",
    live: "https://yacinekahlerras.github.io/bookmark-landing-page/",
    title: "bookmark landing page",
    description: `Landing page with sliding animations and uses the EmailJS api to send emails to my gmail 
                  address, also a regex for email validation.`,
  },
  {
    img: "./images/projects/project-4.png",
    source: "https://github.com/yacineKahlerras/loopstudios-landing-page",
    live: "https://yacinekahlerras.github.io/loopstudios-landing-page/",
    title: "loopstudios landing page",
    description: `a simple landing page that is made using html, css and javascript for 
                  accessibility.`,
  },
];

/** init projects list */
const initProjectsList = () => {
  const projectsListContainer = document.querySelector(".projects-list");
  projectsListContainer.innerHTML = projectsInfos
    .map((project, index) => {
      return `
      <!-- project ${index + 1} -->
      <li>
              <div class="individual-project">
                <img src="${project.img}" alt="${project.title}">
              </div>
            </li>
      `;
    })
    .join("");

  // hides the loading animation
  loadingAnimation.classList.add("hide-loading");

  // adding listeners to the projects
  projectList = [...document.querySelector(".projects-list").children];
  /** listeners */
  projectList.forEach((p, index) => {
    p.addEventListener("click", () => {
      modalVisibility(true, index);
      doAnimation(index);
    });
  });
};
initProjectsList();

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
  projectImgContainer.firstElementChild.src = project.img;
  sourceBtn.href = project.source;
  liveBtn.href = project.live;
  projectTitle.textContent = project.title;
  projectText.textContent = project.description;
};

closeModalBtn.addEventListener("click", () => {
  modalVisibility(false);
});

projectModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("project-modal")) {
    modalVisibility(false);
  }
});

/** animates the project pic */
const doAnimation = (index) => {
  projectImgContainer.style = "none";
  const elemRect = projectList[index].getBoundingClientRect();
  const imgRect = projectImgContainer.getBoundingClientRect();
  projectImgContainer.style.width = `${elemRect.right - elemRect.left}px`;
  projectImgContainer.style.height = `${elemRect.bottom - elemRect.top}px`;
  projectImgContainer.style.top = `${elemRect.top - imgRect.top}px`;
  projectImgContainer.style.left = `${elemRect.left - imgRect.left}px`;

  setTimeout(() => {
    projectImgContainer.style.top = `0px`;
    projectImgContainer.style.left = `0px`;
  }, 500);
};
// weird bug fix
doAnimation(0);

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

const NAME_NEEDED_ERROR = "dont forget to give your name !";
const EMAIL_NEEDED_ERROR = "email is needed for contacting !";
const EMAIL_FORMAT_ERROR = "Whoops, wrong email format";

const notification = document.querySelector(".note");

emailjs.init("_2e0ipBCFq4DOUHiE");

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

/** sends an email using emailJS */
const sendToMyEmail = () => {
  const name = form.elements["name"].value.trim();
  const email = form.elements["email"].value.trim();
  const message = form.elements["message"].value.trim();

  emailjs.send("service_8fjnxfi", "template_xgm7lnu", {
    name_id: name,
    email_id: email,
    message: message,
  });
};

/** shows notification */
const showNotification = () => {
  notification.classList.add("note-active");

  setTimeout(() => {
    notification.classList.remove("note-active");
  }, 3000);
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
    showNotification();
    sendToMyEmail();
  }
});

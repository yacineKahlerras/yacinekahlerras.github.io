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
 *       skills section
 * ==========================
 * ==========================
 * */
const skillsElmList = document.getElementById("tools-list");
const skillsList = [
  {
    name: "nextjs",
    img: "nexJs.webp",
  },
  {
    name: "firebase",
    img: "firebase.svg",
  },
  {
    name: "tailwind",
    img: "tailwind.svg",
  },
  {
    name: "figma",
    img: "figma.svg",
  },
  {
    name: "expressjs",
    img: "expressjs.svg",
  },
  {
    name: "mongodb",
    img: "mongo.svg",
  },
];
skillsElmList.innerHTML = skillsList
  .map((skill) => {
    return `
        <li id="${skill.name}">
          <img src="./images/skills/${skill.img}" alt="${skill.name}" />
        </li>`;
  })
  .join("");

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
    img: "./images/projects/yazona-ecommerce.png",
    source: "https://github.com/yacineKahlerras/yazona-ecommerce",
    live: "https://yazona.vercel.app/",
    title: "Yazona ecommerce",
    description: `This is an e-commerce website equipped with search filters and admin functionality. 
    It is developed using Next.js, MongoDB and Tailwind CSS. The website provides features such as user login, 
    purchasing clothing items, and displaying product information. Furthermore, it incorporates 
    MongoDB and NextAuth for seamless authentication and data storage capabilities.`,
  },
  {
    img: "./images/projects/entertainement-app.png",
    source: "https://github.com/yacineKahlerras/entertainement-app",
    live: "https://entertainement-app.vercel.app/",
    title: "Entertainement App",
    description: `using the TMDB API to get the list of different movies and shows, the app organize them into 
    different category sections where you can hit "see more" to go to the category page where you can select 
    the movie/show category that you like and also search for the movie/show that you want to find. also in 
    the navigation there is a movies only and tv shows only page.`,
  },
  {
    img: "./images/projects/cinecom.png",
    source: "https://github.com/yacineKahlerras/cinema-ticket-booking-app",
    live: "https://yacinekahlerras.github.io/cinema-ticket-booking-app/",
    title: "Cinecom Ticketing",
    description: `this is a cinema ticket booking prototype that i made for a client, he wanted to test out a 
    few ideas and see how they look as an interactable app, the app gets the available movies lists from the 
    firestore database and then displays them as items links, each link takes you to a movie info page that 
    uses TMDB API to get the movie infos, you can then reserve the seatings and register and "pay" for the 
    ticket, and finally download the tickets which contain the address and the movie QR code`,
  },
  {
    img: "./images/projects/rest-countries.jpg",
    source: "https://github.com/yacineKahlerras/rest-countries-app",
    live: "https://rest-countries-app-alpha.vercel.app/",
    title: "Rest Countries",
    description: `using the Rest Countries API to get list of all the 250 countries and islands and all the 
    necessary information about them , the app displays the country components so you can filter through 
    them by continent and by searching the name of the country, also you can go to the country's page to 
    get additional information on it like location and its neighbouring countries...ect`,
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
const contactElmsList = document.querySelector(".contact-links");
const contactLinksData = [
  {
    name: "Linkedin",
    img: "linkedin.svg",
    link: "https://www.linkedin.com/in/yacine-kahlerras-30248a1b2",
  },
  {
    name: "Upwork",
    img: "upwork.svg",
    link: "https://www.upwork.com/freelancers/yacinek8?mp_source=share",
  },
  {
    name: "Gmail",
    img: "gmail.svg",
    link: "mailto:kahlerasse@gmail.com",
  },
];
contactElmsList.innerHTML = contactLinksData
  .map(({ name, img, link }) => {
    return `
        <li>
          <a class="contact-item" target="_blank" href="${link}">
            <img src="./images/contact/${img}" alt="${name}" />
            <span>${name}</span>
          </a>
        </li>`;
  })
  .join("");

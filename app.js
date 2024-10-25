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
    img: "./images/projects/trending-content.png",
    source: null,
    live: "https://trendingcontent.com/",
    title: "Trending Content",
    description:
      "A dynamic news aggregator website that fetches the latest headlines from Google News, categorizes them, and allows users to customize their feed by region and article count. Integrated with Stripe for payment options and Firebase Authentication for secure user access.",
  },
  {
    img: "./images/projects/radiostation.png",
    source: null,
    live: "https://radiostation.ai/news",
    title: "Radio Stations AI",
    description:
      "An AI-powered application built with Next.js and Tailwind CSS that generates text using GPT, converts it to speech, and compiles the audio into playlists. The playlists are then stored securely in Firebase for easy access and playback.",
  },
  {
    img: "./images/projects/aitop40.png",
    source: null,
    live: "https://aitop40.com/",
    title: "AI Top 40",
    description:
      "An AI-driven radio station offering the latest music and news, featuring an AI-generated news anchor with text-to-speech technology. Enjoy a unique listening experience with up-to-date music and news, all powered by artificial intelligence.",
  },
  {
    img: "./images/projects/entertainement-app.png",
    source: "https://github.com/yacineKahlerras/entertainement-app",
    live: "https://entertainement-app.vercel.app/",
    title: "Entertainement App",
    description:
      'Using the TMDB API, the app fetches a variety of movies and TV shows, organizing them into distinct category sections. Each section features a "See More" option that takes you to a dedicated category page, where you can browse and select your preferred movie or show category, or use the search function to quickly find specific titles. Additionally, the navigation menu includes separate pages for movies and TV shows, allowing you to easily explore each type individually.',
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
  sourceBtn.style.display = !project.source ? "none" : "block";
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

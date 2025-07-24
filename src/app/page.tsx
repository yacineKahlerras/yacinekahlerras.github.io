"use client";
import Navbar from "@/componnents/navbar";
import { useEffect, useRef, useState } from "react";

const skillsList = [
  { name: "nextjs", img: "nexJs.webp" },
  { name: "firebase", img: "firebase.svg" },
  { name: "tailwind", img: "tailwind.svg" },
  { name: "figma", img: "figma.svg" },
  { name: "expressjs", img: "expressjs.svg" },
  { name: "mongodb", img: "mongo.svg" },
];

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
  { name: "Gmail", img: "gmail.svg", link: "mailto:kahlerasse@gmail.com" },
];

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

export default function PortfolioApp() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const sidemenuRef = useRef<HTMLDivElement | null>(null);
  const navIconRef = useRef<HTMLDivElement | null>(null);
  const [activeModal, setActiveModal] = useState<number | undefined>(undefined);

  useEffect(() => {
    const sections = [heroRef, skillsRef, projectsRef, aboutRef, contactRef];

    const handleNavClick = (index: number) => {
      document.querySelector(".active-link")?.classList.remove("active-link");
      document
        .querySelectorAll(".nav-links li")
        [index].firstElementChild?.classList.add("active-link");
      sections[index].current?.scrollIntoView({
        behavior: "smooth",
        block: index === 2 ? "start" : "center",
      });
    };

    const handleSidemenuClick = (index: number) => {
      toggleSidemenu();
      setTimeout(() => {
        sections[index].current?.scrollIntoView({
          behavior: "smooth",
          block: index === 2 ? "start" : "center",
        });
      }, 500);
    };

    const toggleSidemenu = () => {
      sidemenuRef.current?.classList.toggle("sidemenu-active");
      navIconRef.current?.classList.toggle("open");
    };

    document
      .querySelector(".hamburger")
      ?.addEventListener("click", toggleSidemenu);
    sidemenuRef.current?.addEventListener("click", (e: any) => {
      if (e.target?.classList.contains("sidemenu")) toggleSidemenu();
    });

    document.querySelectorAll(".sidemenu-links li").forEach((link, index) => {
      link.addEventListener("click", () => handleSidemenuClick(index));
    });

    document.querySelectorAll(".nav-links li").forEach((link, index) => {
      link.addEventListener("click", () => handleNavClick(index));
    });
  }, []);

  return (
    <div>
      <Navbar />

      <main>
        <section id="hero" className="hero" ref={heroRef}>
          <div className="hero-center">
            <div className="hero-text">
              <h1>Hello</h1>
              <h2>I’m Yacine Kahlerras</h2>
              <p>
                front-end dev with a love for building cool, interactive web
                experiences
              </p>
            </div>
            <div className="hero-image">
              <img
                src="./images/illustrations/astronaut-1.svg"
                alt="character illustration"
              />
            </div>
          </div>
        </section>

        <section id="skills" className="skills" ref={skillsRef}>
          <div className="skills-center">
            <h3>Skills</h3>
            <ul className="tools-list">
              {skillsList.map((s) => (
                <li key={s.name} id={s.name}>
                  <img src={`./images/skills/${s.img}`} alt={s.name} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="projects" className="projects" ref={projectsRef}>
          <div className="projects-center">
            <h3>Projects</h3>
            <ul className="projects-list">
              {projectsInfos.map((project, index) => (
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

        <section id="about" className="about" ref={aboutRef}>
          <div className="about-center">
            <h3>About</h3>
            <p>
              My name is Yacine Kahlerras I’ve been into programming since my
              early teens and have been working hard to sharpen my skills. I’m
              all about HTML, CSS, JavaScript, and the latest frameworks like
              Next.js, Express.js, MongoDB, Firebase, and Tailwind.
            </p>
            <p>
              I love making awesome, responsive websites that run smoothly and
              look great on any browser. I keep up with the latest trends in web
              dev and always look for ways to level up my workflow and tackle
              new challenges.
            </p>
          </div>
        </section>

        <section id="contact" className="contact" ref={contactRef}>
          <div className="contact-center">
            <h3>Contact</h3>
            <ul className="contact-links">
              {contactLinksData.map((c) => (
                <li key={c.name}>
                  <a
                    className="contact-item"
                    target="_blank"
                    rel="noreferrer"
                    href={c.link}
                  >
                    <img src={`./images/contact/${c.img}`} alt={c.name} />
                    <span>{c.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {activeModal !== null && (
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
      )}

      <div className="note">Thanks for contacting i'll respond soon !</div>
    </div>
  );
}

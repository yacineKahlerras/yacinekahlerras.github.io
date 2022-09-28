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

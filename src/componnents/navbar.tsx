import React, { useRef, useState } from "react";

const navLinks = [
  {
    name: "Home",
    id: "home",
    targetElementId: "hero",
  },
  {
    name: "Skills",
    id: "skills",
    targetElementId: "skills",
  },
  {
    name: "Projects",
    id: "projects",
    targetElementId: "projects",
  },
  {
    name: "About",
    id: "about",
    targetElementId: "about",
  },
  {
    name: "Contact",
    id: "contact",
    targetElementId: "contact",
  },
];

export default function Navbar() {
  const [activeNavLink, setActiveNavLink] = useState("home");
  const sidemenuRef = useRef<HTMLDivElement | null>(null);
  const navIconRef = useRef<HTMLDivElement | null>(null);

  const handleNavClick = (index: number) => {
    setActiveNavLink(navLinks[index].id);
    const targetElement = document.getElementById(
      navLinks[index].targetElementId
    );
    targetElement?.scrollIntoView({
      behavior: "smooth",
      block: index === 2 ? "start" : "center",
    });
  };
  const toggleSidemenu = () => {
    sidemenuRef.current?.classList.toggle("sidemenu-active");
    navIconRef.current?.classList.toggle("open");
  };

  return (
    <>
      <nav>
        <div className="nav-center">
          <ul className="nav-links">
            {navLinks.map((link, index) => (
              <li key={link.id}>
                <a
                  className={activeNavLink === link.id ? "active-link" : ""}
                  onClick={() => {
                    handleNavClick(index);
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <button className="hamburger" onClick={toggleSidemenu}>
            <div id="nav-icon2" ref={navIconRef}>
              {[...Array(6)].map((_, i) => (
                <span key={i}></span>
              ))}
            </div>
          </button>
        </div>
      </nav>

      <aside className="sidemenu" ref={sidemenuRef} onClick={toggleSidemenu}>
        <div className="sidemenu-center">
          <ul className="sidemenu-links">
            {navLinks.map((link, index) => (
              <li
                key={link.id}
                onClick={() => {
                  handleNavClick(index);
                }}
              >
                {link.name}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}

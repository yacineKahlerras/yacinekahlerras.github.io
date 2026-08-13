"use client";

import { navLinks } from "@/data/siteData";
import { useActiveSection } from "@/utils/useActiveSection";

// module-level constant: a fresh array each render would re-run the effect
const SECTION_IDS = ["work", "stack", "about", "contact"] as const;

export default function Navbar() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <div className="bar">
      <nav className="bar-in">
        {navLinks.map((l) => (
          <a
            key={l.href}
            className={`lnk${active === l.href.slice(1) ? " active" : ""}`}
            href={l.href}
          >
            {l.label}
          </a>
        ))}
        <a
          className={`go${active === "contact" ? " active" : ""}`}
          href="#contact"
        >
          Contact
        </a>
      </nav>
    </div>
  );
}

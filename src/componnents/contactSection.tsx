"use client";

import { useState } from "react";
import { EMAIL, GITHUB, LINKEDIN } from "@/data/siteData";

export default function ContactSection() {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(EMAIL);
      ok = true;
    } catch {
      // clipboard API can be blocked; fall back to a hidden textarea
      try {
        const ta = document.createElement("textarea");
        ta.value = EMAIL;
        ta.setAttribute("readonly", "");
        ta.style.cssText = "position:absolute;left:-9999px";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    setState(ok ? "copied" : "failed");
    setTimeout(() => setState("idle"), 2000);
  };

  const label =
    state === "copied"
      ? "Copied to clipboard"
      : state === "failed"
      ? "Press Ctrl+C to copy"
      : "Click to copy ↗";

  return (
    <section id="contact" className="wrap">
      <div className="ct2-head">
        <h2>Three ways to reach me</h2>
        <p>
          Tell me what you&apos;re building and roughly when you need it. If
          I&apos;m not the right fit I&apos;ll say so quickly.
        </p>
      </div>
      <div className="doors">
        <button
          type="button"
          className={`door primary${state === "copied" ? " copied" : ""}`}
          onClick={copy}
        >
          <span className="num">01 · Fastest</span>
          <h3>Email</h3>
          <p>
            Best for actual projects. Include a sentence about the deadline if
            you have one.
          </p>
          <span className="val">{EMAIL}</span>
          <span className="act">{label}</span>
        </button>

        <a
          className="door"
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="num">02 · Formal</span>
          <h3>LinkedIn</h3>
          <p>
            If you&apos;d rather see the work history first, or your company
            needs a paper trail.
          </p>
          <span className="val">/in/yacine-kahlerras</span>
          <span className="act">Open profile ↗</span>
        </a>

        <a
          className="door"
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="num">03 · Technical</span>
          <h3>GitHub</h3>
          <p>
            For the developers doing due diligence. The code is the interview.
          </p>
          <span className="val">/yacineKahlerras</span>
          <span className="act">Browse repos ↗</span>
        </a>
      </div>
    </section>
  );
}

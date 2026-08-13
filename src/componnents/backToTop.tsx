"use client";

import { useEffect, useRef, useState } from "react";

const R = 22;
const CIRC = 2 * Math.PI * R;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, window.scrollY / max);
      setVisible(window.scrollY > window.innerHeight * 0.9);
      ringRef.current?.setAttribute(
        "stroke-dashoffset",
        (CIRC * (1 - p)).toFixed(1)
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`totop${visible ? " on" : ""}`}
      aria-label="Back to top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
    >
      <svg className="ring" viewBox="0 0 46 46" aria-hidden="true">
        <circle
          ref={ringRef}
          cx="23"
          cy="23"
          r={R}
          transform="rotate(-90 23 23)"
          strokeDasharray={CIRC.toFixed(1)}
          strokeDashoffset={CIRC.toFixed(1)}
        />
      </svg>
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 13V3M8 3L3.5 7.5M8 3l4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

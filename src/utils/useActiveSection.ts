"use client";

import { useEffect, useState } from "react";

/**
 * Reports which section is currently in view.
 *
 * Deliberately "last section whose top crossed the line" rather than
 * "nearest to the line": the nearest-distance rule ties when two sections sit
 * equidistant, which made jumping to a section report the previous one. The
 * final section gets a special case because the page usually runs out of
 * scroll before its top can reach the line.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const LINE = 140;
    let ticking = false;

    const check = () => {
      const secs = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el));
      if (!secs.length) return;

      let best: string | null = null;
      secs.forEach((s) => {
        if (s.getBoundingClientRect().top <= LINE) best = s.id;
      });

      // The final section usually cannot reach the line — the page runs out of
      // scroll first — so treat it as active once it is meaningfully in view.
      const last = secs[secs.length - 1];
      const lastTop = last.getBoundingClientRect().top;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (lastTop < window.innerHeight * 0.72 || atBottom) best = last.id;
      if (window.scrollY < 120) best = null;

      setActive((prev) => (prev === best ? prev : best));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        check();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return active;
}

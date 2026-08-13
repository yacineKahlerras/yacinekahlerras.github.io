"use client";

import { useEffect, useRef } from "react";
import { aboutNotes } from "@/data/siteData";

/**
 * Starting arrangement. Spread across the FULL board width — the earlier
 * values topped out at x:.52, which piled every note into the left half and
 * left an obvious empty right side. A note is ~.27 of the board wide, so the
 * usable x range is 0 → ~.72.
 */
const SPOTS = [
  { x: 0.08, y: 0.05, r: -2.2 },
  { x: 0.6, y: 0.04, r: 1.8 },
  { x: 0.34, y: 0.33, r: -1.1 },
  { x: 0.06, y: 0.58, r: 1.4 },
  { x: 0.63, y: 0.56, r: -1.6 },
];

export default function AboutSection() {
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    if (window.innerWidth <= 860) return; // stacked layout on small screens

    const notes = Array.from(
      board.querySelectorAll<HTMLDivElement>(".dnote")
    );
    let z = 5;
    const rot = new WeakMap<HTMLDivElement, number>();

    const place = () => {
      const W = board.clientWidth;
      const H = board.clientHeight;
      notes.forEach((n, i) => {
        const s = SPOTS[i % SPOTS.length];
        n.style.left = `${Math.max(
          10,
          Math.min(W - n.offsetWidth - 12, s.x * W)
        )}px`;
        n.style.top = `${Math.max(
          10,
          Math.min(H - n.offsetHeight - 12, s.y * H)
        )}px`;
        n.style.transform = `rotate(${s.r}deg)`;
        n.style.zIndex = String(i + 1);
        rot.set(n, s.r);
      });
    };
    const raf = requestAnimationFrame(place);
    window.addEventListener("resize", place);

    const cleanups: (() => void)[] = [];
    notes.forEach((n) => {
      let dx = 0;
      let dy = 0;
      let dragging = false;

      const down = (e: PointerEvent) => {
        dragging = true;
        n.setPointerCapture(e.pointerId);
        n.classList.add("grabbing");
        n.style.zIndex = String(++z + 10);
        const r = n.getBoundingClientRect();
        dx = e.clientX - r.left;
        dy = e.clientY - r.top;
        n.style.transform = `rotate(${((rot.get(n) ?? 0) * 0.35).toFixed(
          2
        )}deg) scale(1.03)`;
      };
      const move = (e: PointerEvent) => {
        if (!dragging) return;
        const b = board.getBoundingClientRect();
        const x = Math.max(
          6,
          Math.min(board.clientWidth - n.offsetWidth - 6, e.clientX - b.left - dx)
        );
        const y = Math.max(
          6,
          Math.min(board.clientHeight - n.offsetHeight - 6, e.clientY - b.top - dy)
        );
        n.style.left = `${x}px`;
        n.style.top = `${y}px`;
      };
      const drop = () => {
        if (!dragging) return;
        dragging = false;
        n.classList.remove("grabbing");
        // settle at a small tilt derived from position, so it stays deterministic
        const wobble = ((parseFloat(n.style.left) % 7) - 3) * 0.5;
        rot.set(n, wobble);
        n.style.transform = `rotate(${wobble.toFixed(2)}deg)`;
      };

      n.addEventListener("pointerdown", down);
      n.addEventListener("pointermove", move);
      n.addEventListener("pointerup", drop);
      n.addEventListener("pointercancel", drop);
      cleanups.push(() => {
        n.removeEventListener("pointerdown", down);
        n.removeEventListener("pointermove", move);
        n.removeEventListener("pointerup", drop);
        n.removeEventListener("pointercancel", drop);
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", place);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section id="about" className="wrap">
      <div className="shead">
        <div>
          <div className="kick">About</div>
          <h2>
            I build the thing you keep <b>almost</b> shipping.
          </h2>
        </div>
        <span className="r">Move them around</span>
      </div>
      <div className="dn-sub">Five things worth knowing</div>
      <div className="dn-board" ref={boardRef}>
        {aboutNotes.map((note) => (
          <div
            key={note.tag}
            className={`dnote${note.big ? " big" : ""}`}
          >
            <span className="pin" />
            <div className="tagline">{note.tag}</div>
            <p>{note.body}</p>
          </div>
        ))}
        <span className="dn-hint">Grab a note and move it</span>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import {
  GROUP_COLORS,
  projects,
  toolEdges,
  tools,
  type ToolGroup,
} from "@/data/siteData";

type Node = {
  n: string;
  kind: "tool" | "proj";
  group?: ToolGroup;
  note: string;
  tools?: string[];
  img?: string;
  url?: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export default function SkillsSection() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cv = cvRef.current;
    const card = cardRef.current;
    if (!cv || !card) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0;
    let H = 0;
    let nodes: Node[] = [];
    let links: [number, number][] = [];
    let neigh: Set<number>[] = [];
    let hot = -1;
    let held = -1;
    let dragged = false;
    let cardFor = -1;
    let raf = 0;

    const colOf = (n: Node) =>
      n.kind === "proj" ? "#ffffff" : GROUP_COLORS[n.group ?? "Frontend"];
    const massOf = (n: Node) => (n.kind === "proj" ? 2.4 : 1);

    /** force-directed pass so the graph fills the canvas instead of clustering */
    const layout = (iterations: number) => {
      const idx: Record<string, number> = {};
      nodes.forEach((n, i) => (idx[n.n] = i));

      const edges: [string, string][] = [...toolEdges];
      projects.forEach((p) =>
        p.tools.forEach((t) => edges.push([p.title, t]))
      );
      links = edges
        .map(([a, b]) => [idx[a], idx[b]] as [number, number])
        .filter(([a, b]) => a != null && b != null);

      nodes.forEach((n, i) => {
        const a = (i / nodes.length) * Math.PI * 2;
        n.x = W / 2 + Math.cos(a) * W * 0.26;
        n.y = H / 2 + Math.sin(a) * H * 0.3;
        n.vx = 0;
        n.vy = 0;
      });

      for (let it = 0; it < iterations; it++) {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];
            let dx = b.x - a.x;
            let dy = b.y - a.y;
            const d = Math.hypot(dx, dy) || 1;
            const f = 5600 / (d * d);
            dx /= d;
            dy /= d;
            a.vx -= dx * f;
            a.vy -= dy * f;
            b.vx += dx * f;
            b.vy += dy * f;
          }
        }
        links.forEach(([i, j]) => {
          const a = nodes[i];
          const b = nodes[j];
          let dx = b.x - a.x;
          let dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 1;
          const f = (d - 140) * 0.012;
          dx /= d;
          dy /= d;
          a.vx += dx * f;
          a.vy += dy * f;
          b.vx -= dx * f;
          b.vy -= dy * f;
        });
        nodes.forEach((n) => {
          n.vx += (W / 2 - n.x) * 0.0016;
          n.vy += (H / 2 - n.y) * 0.0016;
          n.x += n.vx * 0.55;
          n.y += n.vy * 0.55;
          n.vx *= 0.82;
          n.vy *= 0.82;
          n.x = Math.max(78, Math.min(W - 78, n.x));
          n.y = Math.max(48, Math.min(H - 48, n.y));
        });
      }
      neigh = nodes.map(
        (_, i) =>
          new Set(
            links
              .filter(([a, b]) => a === i || b === i)
              .map(([a, b]) => (a === i ? b : a))
          )
      );
    };

    const build = () => {
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes = [
        ...tools.map((t) => ({
          n: t.name,
          kind: "tool" as const,
          group: t.group,
          note: t.note,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
        })),
        ...projects.map((p) => ({
          n: p.title,
          kind: "proj" as const,
          note: p.blurb,
          tools: p.tools,
          img: p.image,
          url: p.url,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
        })),
      ];
      layout(300);
      nodes.forEach((n) => {
        n.vx = 0;
        n.vy = 0;
      });
    };
    build();
    window.addEventListener("resize", build);

    const physics = () => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          let dx = b.x - a.x;
          let dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 1;
          const f = 4800 / (d * d);
          dx /= d;
          dy /= d;
          a.vx -= (dx * f) / massOf(a);
          a.vy -= (dy * f) / massOf(a);
          b.vx += (dx * f) / massOf(b);
          b.vy += (dy * f) / massOf(b);
        }
      }
      links.forEach(([i, j]) => {
        const a = nodes[i];
        const b = nodes[j];
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 1;
        const f = (d - 142) * 0.011;
        dx /= d;
        dy /= d;
        a.vx += (dx * f) / massOf(a);
        a.vy += (dy * f) / massOf(a);
        b.vx -= (dx * f) / massOf(b);
        b.vy -= (dy * f) / massOf(b);
      });
      nodes.forEach((n, i) => {
        if (i === held) {
          n.vx = 0;
          n.vy = 0;
          return;
        }
        n.vx += (W / 2 - n.x) * 0.0013;
        n.vy += (H / 2 - n.y) * 0.0013;
        n.x += n.vx * 0.5;
        n.y += n.vy * 0.5;
        n.vx *= 0.87;
        n.vy *= 0.87;
        const pad = n.kind === "proj" ? 74 : 62;
        n.x = Math.max(pad, Math.min(W - pad, n.x));
        n.y = Math.max(44, Math.min(H - 40, n.y));
      });
    };

    const placeCard = (nx: number, ny: number) => {
      const pad = 18;
      const cw = card.offsetWidth || 290;
      const ch = card.offsetHeight || 250;
      let x = nx + pad;
      let y = ny + pad;
      if (x + cw > W - 8) x = nx - cw - pad;
      if (y + ch > H - 8) y = Math.max(8, ny - ch - pad);
      card.style.left = `${Math.max(8, x)}px`;
      card.style.top = `${y}px`;
    };

    // no hover preview on touch / narrow screens: it covers the canvas and
    // there is no real hover to trigger it
    const narrow = () =>
      window.innerWidth < 760 ||
      window.matchMedia("(pointer: coarse)").matches;

    const showCard = (i: number) => {
      if (narrow()) {
        cardFor = -1;
        card.classList.remove("on");
        return;
      }
      const n = i >= 0 ? nodes[i] : null;
      if (n && n.kind === "proj") {
        cardFor = i;
        card.innerHTML = `<img src="${n.img}" alt="">
          <div class="cb"><div class="ct">${n.n}</div><div class="cs">Built with</div>
          <div class="cchips">${(n.tools ?? [])
            .map((tn) => {
              const t = tools.find((x) => x.name === tn);
              const c = GROUP_COLORS[t ? t.group : "Frontend"];
              return `<span style="color:${c};border-color:${c}55">${tn}</span>`;
            })
            .join("")}</div></div>`;
        card.classList.add("on");
        placeCard(n.x, n.y);
      } else {
        cardFor = -1;
        card.classList.remove("on");
      }
    };

    const draw = () => {
      if (!reduce) physics();
      ctx.clearRect(0, 0, W, H);
      const act = held >= 0 ? held : hot;
      const near = act >= 0 ? neigh[act] : null;

      links.forEach(([i, j]) => {
        const a = nodes[i];
        const b = nodes[j];
        const on = act === i || act === j;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = on
          ? "rgba(124,255,232,.62)"
          : act >= 0
          ? "rgba(150,175,255,.07)"
          : "rgba(150,175,255,.14)";
        ctx.lineWidth = on ? 1.9 : 1;
        ctx.stroke();
      });

      nodes.forEach((n, i) => {
        const col = colOf(n);
        const isProj = n.kind === "proj";
        const activeNode = act < 0 || act === i || (near && near.has(i));
        const isAct = act === i;
        const r = (isProj ? 10 : 6.5) * (isAct ? 1.4 : 1);
        ctx.globalAlpha = activeNode ? 1 : 0.2;

        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3.2);
        g.addColorStop(0, `${col}55`);
        g.addColorStop(1, `${col}00`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 3.2, 0, 6.283);
        ctx.fill();

        if (isProj) {
          ctx.save();
          ctx.translate(n.x, n.y);
          ctx.rotate(Math.PI / 4);
          ctx.fillStyle = col;
          ctx.fillRect(-r, -r, r * 2, r * 2);
          if (isAct) {
            ctx.strokeStyle = "rgba(255,255,255,.85)";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(-r - 5, -r - 5, (r + 5) * 2, (r + 5) * 2);
          }
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, 6.283);
          ctx.fillStyle = col;
          ctx.fill();
        }

        ctx.font = isAct
          ? "600 12px ui-monospace, monospace"
          : isProj
          ? "600 11px ui-monospace, monospace"
          : "10px ui-monospace, monospace";
        ctx.fillStyle = activeNode
          ? isProj
            ? "rgba(240,245,255,.95)"
            : col
          : "rgba(140,150,180,.45)";
        ctx.textAlign = "center";
        ctx.fillText(n.n, n.x, n.y - r - 11);
        ctx.globalAlpha = 1;
      });

      if (card.classList.contains("on") && cardFor >= 0) {
        placeCard(nodes[cardFor].x, nodes[cardFor].y);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const at = (e: PointerEvent): [number, number, number] => {
      const r = cv.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      let best = -1;
      let bd = 34;
      nodes.forEach((n, i) => {
        const d = Math.hypot(n.x - mx, n.y - my);
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      return [best, mx, my];
    };

    const onDown = (e: PointerEvent) => {
      const [i] = at(e);
      if (i >= 0) {
        held = i;
        dragged = false;
        cv.classList.add("grabbing");
        cv.setPointerCapture(e.pointerId);
        showCard(i);
      }
    };
    const onMove = (e: PointerEvent) => {
      const [i, mx, my] = at(e);
      if (held >= 0) {
        dragged = true;
        nodes[held].x = mx;
        nodes[held].y = my;
        nodes[held].vx = 0;
        nodes[held].vy = 0;
        return;
      }
      if (i !== hot) {
        hot = i;
        showCard(i);
      }
    };
    const release = () => {
      held = -1;
      cv.classList.remove("grabbing");
    };
    const onUp = () => {
      const wasHeld = held;
      const moved = dragged;
      release();
      // a tap (no drag) on a project still opens the site
      if (wasHeld >= 0 && !moved && nodes[wasHeld].url) {
        window.open(nodes[wasHeld].url, "_blank", "noopener");
      }
    };
    const onLeave = () => {
      if (held < 0) {
        hot = -1;
        showCard(-1);
      }
    };

    cv.addEventListener("pointerdown", onDown);
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerup", onUp);
    cv.addEventListener("pointercancel", release);
    cv.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      cv.removeEventListener("pointerdown", onDown);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerup", onUp);
      cv.removeEventListener("pointercancel", release);
      cv.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section id="stack" className="wrap">
      <div className="shead">
        <div>
          <div className="kick">Drive systems</div>
          <h2>Built with</h2>
        </div>
        <span className="r">Drag anything</span>
      </div>
      <div className="mc-shell">
        <canvas
          id="mcgraph"
          ref={cvRef}
          aria-label="Draggable graph of tools linked to projects"
        />
        <div className="mc-card" ref={cardRef} />
        <span className="mc-hint">
          Diamonds are projects. Grab one and throw it
        </span>
      </div>
    </section>
  );
}

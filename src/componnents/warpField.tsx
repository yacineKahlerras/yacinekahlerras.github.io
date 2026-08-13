"use client";

import { useEffect, useRef } from "react";

/**
 * Perspective starfield. Density and trail length are tuned for a wide canvas —
 * on a narrow screen the same streaks overlap into a solid mat, so both scale
 * down noticeably below 760px.
 */
export default function WarpField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const small = window.innerWidth < 760;

    let W = 0;
    let H = 0;
    let stars: { x: number; y: number; z: number }[] = [];
    const N = small ? 150 : 620;

    const seed = () => {
      W = cv.width = window.innerWidth * dpr;
      H = cv.height = window.innerHeight * dpr;
      cv.style.width = `${window.innerWidth}px`;
      cv.style.height = `${window.innerHeight}px`;
      stars = Array.from({ length: N }, () => ({
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: Math.random(),
      }));
    };
    seed();
    window.addEventListener("resize", seed);

    let raf = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(3,4,10,.20)";
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const F = W * 0.62;
      const speed = reduce ? 0.0016 : small ? 0.008 : 0.011;
      const TRAIL = reduce ? 1 : small ? 2.2 : 4.2;

      for (const s of stars) {
        const pz = s.z;
        s.z -= speed;
        if (s.z <= 0.02) {
          s.z = 1;
          s.x = (Math.random() - 0.5) * 2;
          s.y = (Math.random() - 0.5) * 2;
          continue;
        }
        const x1 = cx + (s.x / s.z) * F;
        const y1 = cy + (s.y / s.z) * F;
        const tz = Math.min(1.6, pz + speed * (TRAIL - 1));
        const x0 = cx + (s.x / tz) * F;
        const y0 = cy + (s.y / tz) * F;
        if (x1 < -80 || x1 > W + 80 || y1 < -80 || y1 > H + 80) continue;

        const near = 1 - s.z;
        const a = Math.min(1, (small ? 0.12 : 0.22) + near * (small ? 0.9 : 1.35));
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle =
          near > 0.72
            ? `rgba(124,255,232,${a})`
            : `rgba(200,220,255,${a * 0.82})`;
        ctx.lineWidth = Math.max(small ? 0.5 : 0.7, near * (small ? 1.6 : 2.6)) * dpr;
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", seed);
    };
  }, []);

  return <canvas id="warp" ref={ref} aria-hidden="true" />;
}

"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";

/* ─── palette ─── */
const ORANGE = "#FF7D00";
const DARK_BLUE = "#003149";
const TURQUOISE = "#00A1C0";
const LIGHT_BLUE = "#7BCCEA";

const LINE_COLORS = [ORANGE, TURQUOISE, LIGHT_BLUE, "#ffffff"];

/* ─── types ─── */
interface Line {
  y: number;
  freq1: number;
  freq2: number;
  speed1: number;
  speed2: number;
  amp1: number;
  amp2: number;
  phase: number;
  color: string;
  alpha: number;
  width: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  color: string;
  life: number;
  maxLife: number;
}

/* ─── helpers ─── */
function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createLine(i: number, total: number, h: number): Line {
  const spread = h * 0.7;
  const offset = h * 0.15;
  return {
    y: offset + (spread / total) * i + rand(-20, 20),
    freq1: rand(0.001, 0.004),
    freq2: rand(0.002, 0.006),
    speed1: rand(0.3, 1.2),
    speed2: rand(0.2, 0.8),
    amp1: rand(20, 60),
    amp2: rand(10, 35),
    phase: rand(0, Math.PI * 2),
    color: LINE_COLORS[i % LINE_COLORS.length],
    alpha: rand(0.06, 0.18),
    width: rand(0.5, 2.3),
  };
}

function createParticle(w: number, h: number): Particle {
  return {
    x: rand(0, w),
    y: rand(0, h),
    vx: rand(-0.3, 0.3),
    vy: rand(-0.3, 0.3),
    size: rand(1, 3),
    alpha: 0,
    maxAlpha: rand(0.1, 0.3),
    color: LINE_COLORS[Math.floor(rand(0, LINE_COLORS.length))],
    life: 0,
    maxLife: Math.floor(rand(300, 700)),
  };
}

/* ─── component ─── */
export default function HomeHero() {
  const t = useTranslations("pages.home");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, smoothX: -9999, smoothY: -9999 });
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);

  const practiceAreas = t("heroSubtitle").split("|").map((s: string) => s.trim());

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let lines: Line[] = [];
    let particles: Particle[] = [];
    const isMobile = window.innerWidth < 768;
    const LINE_COUNT = isMobile ? 10 : 18;
    const PARTICLE_COUNT = isMobile ? 15 : 30;
    const SEGMENTS = 80;

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas!.width = w;
      canvas!.height = h;
      lines = Array.from({ length: LINE_COUNT }, (_, i) => createLine(i, LINE_COUNT, h));
      particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle(w, h));
    }

    resize();
    window.addEventListener("resize", resize);

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      frameRef.current++;
      const t = frameRef.current;

      // smooth mouse
      const m = mouseRef.current;
      if (!isMobile) {
        m.smoothX += (m.x - m.smoothX) * 0.04;
        m.smoothY += (m.y - m.smoothY) * 0.04;
      }

      // draw lines
      for (const line of lines) {
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.globalAlpha = line.alpha;
        ctx.lineWidth = line.width;

        for (let seg = 0; seg <= SEGMENTS; seg++) {
          const x = (w / SEGMENTS) * seg;
          const normalX = x / w;

          // dual sine wave
          let y =
            line.y +
            Math.sin(x * line.freq1 + t * line.speed1 * 0.016 + line.phase) * line.amp1 +
            Math.sin(x * line.freq2 + t * line.speed2 * 0.016) * line.amp2;

          // centre convergence
          y += Math.sin(normalX * Math.PI) * 15;

          // mouse influence
          if (!isMobile && m.smoothX > 0) {
            const dx = x - m.smoothX;
            const dy = y - m.smoothY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const influence = rand(30, 90);
            const pull = Math.exp(-dist / 200) * influence;
            y += (m.smoothY - y) * (pull / 200);
          }

          if (seg === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // draw particles
      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;

        // lifecycle fade
        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio < 0.1) p.alpha = p.maxAlpha * (lifeRatio / 0.1);
        else if (lifeRatio > 0.8) p.alpha = p.maxAlpha * ((1 - lifeRatio) / 0.2);
        else p.alpha = p.maxAlpha;

        // move
        p.x += p.vx;
        p.y += p.vy;

        // mouse drift
        if (!isMobile && m.smoothX > 0) {
          const dx = m.smoothX - p.x;
          const dy = m.smoothY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 300) {
            p.x += (dx / dist) * 0.15;
            p.y += (dy / dist) * 0.15;
          }
        }

        // draw
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // respawn
        if (p.life >= p.maxLife || p.x < -10 || p.x > w + 10 || p.y < -10 || p.y > h + 10) {
          particles[i] = createParticle(w, h);
        }
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      data-hero-dark
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 30% 20%, #004466 0%, #003149 40%, #001e2d 100%)",
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[5%] right-[10%] w-[400px] h-[400px] rounded-full animate-[glowDrift_12s_ease-in-out_infinite]"
          style={{ background: TURQUOISE, opacity: 0.07, filter: "blur(100px)" }}
        />
        <div
          className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] rounded-full animate-[glowDrift_12s_ease-in-out_infinite_4s]"
          style={{ background: ORANGE, opacity: 0.05, filter: "blur(100px)" }}
        />
        <div
          className="absolute top-[40%] left-[30%] w-[600px] h-[300px] rounded-full animate-[glowDrift_12s_ease-in-out_infinite_8s]"
          style={{ background: LIGHT_BLUE, opacity: 0.04, filter: "blur(120px)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        {/* Name — clip reveal */}
        <div className="overflow-hidden mb-6">
          <h1
            className="text-white font-bold opacity-0 animate-[slideUp_1.2s_cubic-bezier(0.16,1,0.3,1)_0.6s_forwards]"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
              transform: "translateY(100%)",
            }}
          >
            {t("heroTitle")}
          </h1>
        </div>

        {/* Orange accent line */}
        <div
          className="h-[2px] w-0 mb-8 animate-[lineGrow_0.8s_cubic-bezier(0.4,0,0.2,1)_1.6s_forwards]"
          style={{
            background: `linear-gradient(90deg, transparent, ${ORANGE}, transparent)`,
          }}
        />

        {/* Practice areas */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-8">
          {practiceAreas.map((area: string, i: number) => (
            <span
              key={i}
              className="relative text-white/50 font-light tracking-[1.5px] opacity-0 animate-[fadeUp_0.6s_ease-out_forwards] first:before:hidden before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-start-4 before:w-1 before:h-1 before:rounded-full before:bg-[#FF7D00]"
              style={{
                fontSize: "clamp(0.8125rem, 1.4vw, 1rem)",
                animationDelay: `${1.8 + i * 0.15}s`,
                transform: "translateY(12px)",
              }}
            >
              {area}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p
          className="text-white/70 font-light leading-[1.8] max-w-[580px] opacity-0 animate-[fadeUp_0.8s_ease-out_2.4s_forwards]"
          style={{
            fontSize: "clamp(1.0625rem, 2vw, 1.375rem)",
            transform: "translateY(12px)",
          }}
        >
          {t("heroDescription")}
        </p>
      </div>

      {/* Geometric corner accents */}
      <div className="absolute top-8 end-8 opacity-0 animate-[fadeIn_0.6s_ease_2.8s_forwards] pointer-events-none">
        <div className="w-2 h-2 border border-[rgba(255,125,0,0.25)]" />
        <div className="w-2 h-2 bg-[rgba(255,125,0,0.15)] mt-1 ms-2" />
      </div>
      <div className="absolute bottom-8 start-8 opacity-0 animate-[fadeIn_0.6s_ease_2.8s_forwards] pointer-events-none">
        <div className="w-2 h-2 bg-[rgba(255,125,0,0.15)]" />
        <div className="w-2 h-2 border border-[rgba(255,125,0,0.25)] mt-1 ms-2" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0 animate-[fadeIn_0.6s_ease_3s_forwards]">
        <div
          className="w-1.5 h-1.5 rounded-full mb-2 animate-[scrollPulse_2s_ease-in-out_infinite]"
          style={{ background: ORANGE }}
        />
        <div
          className="w-px h-9"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
          }}
        />
      </div>
    </section>
  );
}

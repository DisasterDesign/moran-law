"use client";

import { useEffect, useRef } from "react";

export default function HeroCanvas({ paused = false }: { paused?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W: number, H: number;
    let mouseX = 0.5,
      mouseY = 0.5;
    let targetMouseX = 0.5,
      targetMouseY = 0.5;
    let animationId: number;

    const isMobile = window.innerWidth < 768;

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX / W;
      targetMouseY = e.clientY / H;
    };
    if (!isMobile) {
      document.addEventListener("mousemove", handleMouseMove);
    }

    // === LINES — calibrated parameters ===
    const LINES = isMobile ? 10 : 18;
    const lines: WaveLine[] = [];

    class WaveLine {
      i: number;
      baseY: number;
      segments: number;
      color: { r: number; g: number; b: number };
      alpha: number;
      lineWidth: number;
      freq1: number;
      freq2: number;
      amp1: number;
      amp2: number;
      speed1: number;
      speed2: number;
      phase1: number;
      phase2: number;
      mouseInfluence: number;

      constructor(i: number) {
        this.i = i;
        const t = i / LINES;
        this.baseY = H * (0.1 + t * 0.8);
        this.segments = 80;

        const palettes = [
          { r: 255, g: 125, b: 0 }, // orange
          { r: 0, g: 161, b: 192 }, // turquoise
          { r: 123, g: 204, b: 234 }, // light blue
          { r: 255, g: 255, b: 255 }, // white
        ];
        this.color = palettes[i % palettes.length];
        this.alpha = 0.06 + Math.random() * 0.12;
        this.lineWidth = 0.5 + Math.random() * 1.8;

        this.freq1 = 0.002 + Math.random() * 0.004;
        this.freq2 = 0.001 + Math.random() * 0.002;
        this.amp1 = 30 + Math.random() * 50;
        this.amp2 = 15 + Math.random() * 30;
        this.speed1 = 0.008 + Math.random() * 0.015;
        this.speed2 = 0.004 + Math.random() * 0.008;
        this.phase1 = Math.random() * Math.PI * 2;
        this.phase2 = Math.random() * Math.PI * 2;
        this.mouseInfluence = 30 + Math.random() * 60;
      }

      update() {
        this.phase1 += this.speed1;
        this.phase2 += this.speed2;
      }

      draw() {
        const { r, g, b } = this.color;
        ctx!.beginPath();
        ctx!.strokeStyle = `rgba(${r},${g},${b},${this.alpha})`;
        ctx!.lineWidth = this.lineWidth;

        for (let j = 0; j <= this.segments; j++) {
          const t = j / this.segments;
          const x = t * W;
          let y = this.baseY;
          y += Math.sin(this.phase1 + x * this.freq1) * this.amp1;
          y += Math.sin(this.phase2 + x * this.freq2) * this.amp2;

          // Mouse attraction
          if (!isMobile) {
            const dx = t - mouseX;
            const dy = y / H - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const influence = Math.exp(-dist * 4) * this.mouseInfluence;
            y += (mouseY * H - y) * influence * 0.15;
          }

          const centerPull = Math.sin(t * Math.PI);
          y += (H * 0.5 - y) * centerPull * 0.03;

          if (j === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        ctx!.stroke();
      }
    }

    for (let i = 0; i < LINES; i++) lines.push(new WaveLine(i));

    // === PARTICLES ===
    const PARTICLES = isMobile ? 15 : 30;
    const particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      alpha: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;

      constructor() {
        this.x = 0;
        this.y = 0;
        this.size = 0;
        this.alpha = 0;
        this.vx = 0;
        this.vy = 0;
        this.life = 0;
        this.maxLife = 0;
        this.color = "";
        this.reset();
      }

      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.size = 1 + Math.random() * 2;
        this.alpha = 0.1 + Math.random() * 0.2;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.life = 0;
        this.maxLife = 300 + Math.random() * 400;
        const colors = [
          "255,125,0",
          "0,161,192",
          "123,204,234",
          "255,255,255",
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        if (!isMobile) {
          const dx = mouseX * W - this.x;
          const dy = mouseY * H - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            this.vx += dx * 0.00003;
            this.vy += dy * 0.00003;
          }
        }
        if (
          this.life > this.maxLife ||
          this.x < -10 ||
          this.x > W + 10 ||
          this.y < -10 ||
          this.y > H + 10
        ) {
          this.reset();
        }
      }

      draw() {
        const fadeIn = Math.min(this.life / 60, 1);
        const fadeOut = Math.max(
          0,
          1 - (this.life - this.maxLife + 60) / 60
        );
        const a = this.alpha * fadeIn * fadeOut;
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${this.color},${a})`;
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    for (let i = 0; i < PARTICLES; i++) particles.push(new Particle());

    // === ANIMATION LOOP ===
    function animate() {
      if (pausedRef.current) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      ctx!.clearRect(0, 0, W, H);

      // Smooth mouse follow — lerp 0.04
      if (!isMobile) {
        mouseX += (targetMouseX - mouseX) * 0.04;
        mouseY += (targetMouseY - mouseY) * 0.04;
      }

      lines.forEach((line) => {
        line.update();
        line.draw();
      });
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationId = requestAnimationFrame(animate);
    }
    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      if (!isMobile) {
        document.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

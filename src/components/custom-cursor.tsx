"use client";

import * as React from "react";

// ── Helpers ───────────────────────────────────────────────────────────────────

function getLuminance(r: number, g: number, b: number): number {
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function parseRgb(color: string): { r: number; g: number; b: number } | null {
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return null;
  return { r: +m[1], g: +m[2], b: +m[3] };
}

function isDarkAt(x: number, y: number): boolean {
  const el = document.elementFromPoint(x, y) as HTMLElement | null;
  if (!el) return false;
  let node: HTMLElement | null = el;
  while (node && node !== document.body) {
    const bg = window.getComputedStyle(node).backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
      const rgb = parseRgb(bg);
      if (rgb) return getLuminance(rgb.r, rgb.g, rgb.b) < 0.3;
    }
    node = node.parentElement;
  }
  return false;
}

// ── Particle burst on click ───────────────────────────────────────────────────

const PARTICLE_COLORS = ["#B5521A", "#f0ece4", "#e07b3a", "#fff8f0", "#d4421a"];

function spawnParticles(x: number, y: number) {
  const count = 14;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const speed = 60 + Math.random() * 80;
    const size  = 3 + Math.random() * 4;
    const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
    const dur   = 500 + Math.random() * 300;
    const tx = Math.cos(angle) * speed;
    const ty = Math.sin(angle) * speed;

    Object.assign(p.style, {
      position:      "fixed",
      top:           `${y}px`,
      left:          `${x}px`,
      width:         `${size}px`,
      height:        `${size}px`,
      borderRadius:  "50%",
      background:    color,
      pointerEvents: "none",
      zIndex:        "999999",
      transform:     "translate(-50%, -50%) scale(1)",
      transition:    `transform ${dur}ms cubic-bezier(0.22,1,0.36,1), opacity ${dur}ms ease`,
      opacity:       "1",
      willChange:    "transform, opacity",
    });
    document.body.appendChild(p);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        p.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`;
        p.style.opacity   = "0";
      });
    });
    setTimeout(() => p.remove(), dur + 50);
  }
}

function spawnRingPulse(x: number, y: number) {
  const ring = document.createElement("div");
  Object.assign(ring.style, {
    position:      "fixed",
    top:           `${y}px`,
    left:          `${x}px`,
    width:         "10px",
    height:        "10px",
    borderRadius:  "50%",
    border:        "1px solid #B5521A",
    pointerEvents: "none",
    zIndex:        "999998",
    transform:     "translate(-50%, -50%) scale(1)",
    opacity:       "0.9",
    transition:    "transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.55s ease",
    willChange:    "transform, opacity",
  });
  document.body.appendChild(ring);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ring.style.transform = "translate(-50%, -50%) scale(5)";
      ring.style.opacity   = "0";
    });
  });
  setTimeout(() => ring.remove(), 650);
}

// ── Component ─────────────────────────────────────────────────────────────────

export function CustomCursor() {
  const dotRef  = React.useRef<HTMLDivElement>(null);
  const hLineRef = React.useRef<HTMLDivElement>(null);
  const vLineRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    // Hide system cursor
    const styleTag = document.createElement("style");
    styleTag.textContent = `
      @media (hover: hover) and (pointer: fine) {
        *, *::before, *::after { cursor: none !important; }
      }
    `;
    document.head.appendChild(styleTag);

    const dot   = dotRef.current!;
    const hLine = hLineRef.current!;
    const vLine = vLineRef.current!;

    let mouseX = -200, mouseY = -200;
    let crossX = -200, crossY = -200;
    let raf: number;

    let isDark    = false;
    let isLink    = false;
    let isDown    = false;

    // ── Apply positions ────────────────────────────────────────────────────
    const applyDot = () => {
      const s = isDown ? 0.5 : isLink ? 0 : 1;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(${s})`;
    };

    const applyCross = () => {
      // Crosshair center lerps toward mouse
      hLine.style.transform = `translate(${crossX}px, ${crossY}px) translate(-50%, -50%)`;
      vLine.style.transform = `translate(${crossX}px, ${crossY}px) translate(-50%, -50%)`;
    };

    // ── Crosshair size ────────────────────────────────────────────────────
    const setCrossSize = (expanded: boolean, clicked: boolean) => {
      const hW = clicked ? "10px" : expanded ? "28px" : "16px";
      const vH = clicked ? "10px" : expanded ? "28px" : "16px";
      const opacity = clicked ? "0.5" : "1";
      hLine.style.width   = hW;
      vLine.style.height  = vH;
      hLine.style.opacity = opacity;
      vLine.style.opacity = opacity;
    };

    // ── Color ─────────────────────────────────────────────────────────────
    const applyColors = (dark: boolean) => {
      const color = dark ? "#f0ece4" : "#B5521A";
      dot.style.background   = color;
      hLine.style.background = color;
      vLine.style.background = color;
    };

    // ── rAF loop ──────────────────────────────────────────────────────────
    const animate = () => {
      crossX += (mouseX - crossX) * 0.12;
      crossY += (mouseY - crossY) * 0.12;
      applyDot();
      applyCross();
      raf = requestAnimationFrame(animate);
    };

    // ── Events ────────────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const dark = isDarkAt(mouseX, mouseY);
      if (dark !== isDark) {
        isDark = dark;
        applyColors(isDark);
      }
    };

    const onDown = (e: MouseEvent) => {
      isDown = true;
      setCrossSize(isLink, true);
      spawnParticles(e.clientX, e.clientY);
      spawnRingPulse(e.clientX, e.clientY);
    };
    const onUp = () => {
      isDown = false;
      setCrossSize(isLink, false);
    };

    const onLinkEnter = () => {
      isLink = true;
      setCrossSize(true, false);
    };
    const onLinkLeave = () => {
      isLink = false;
      setCrossSize(false, false);
    };

    const attachListeners = () => {
      document.querySelectorAll("a, button, [role='button'], .project-row").forEach(el => {
        el.addEventListener("mouseenter", onLinkEnter);
        el.addEventListener("mouseleave", onLinkLeave);
      });
    };
    const attachTimer = setTimeout(attachListeners, 400);

    // ── Startup ───────────────────────────────────────────────────────────
    [dot, hLine, vLine].forEach(el => { el.style.opacity = "0"; });

    const fadeTimer = setTimeout(() => {
      [dot, hLine, vLine].forEach(el => { el.style.opacity = "1"; });
      applyColors(false);
    }, 300);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      cancelAnimationFrame(raf);
      clearTimeout(fadeTimer);
      clearTimeout(attachTimer);
      styleTag.remove();
      document.querySelectorAll("a, button, [role='button'], .project-row").forEach(el => {
        el.removeEventListener("mouseenter", onLinkEnter);
        el.removeEventListener("mouseleave", onLinkLeave);
      });
    };
  }, []);

  const lineBase: React.CSSProperties = {
    position:      "fixed",
    top:           0,
    left:          0,
    background:    "#B5521A",
    pointerEvents: "none",
    zIndex:        99998,
    willChange:    "transform, width, height, opacity",
    opacity:       0,
    transition:    "width 0.2s cubic-bezier(0.34,1.56,0.64,1), height 0.2s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease, background 0.2s ease",
  };

  return (
    <>
      {/* Center dot — snaps instantly */}
      <div
        id="cur-dot"
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         3,
          height:        3,
          borderRadius:  "50%",
          background:    "#B5521A",
          pointerEvents: "none",
          zIndex:        99999,
          willChange:    "transform",
          opacity:       0,
          transition:    "transform 0.08s ease, background 0.2s ease, opacity 0.3s ease",
        }}
      />

      {/* Horizontal arm */}
      <div
        id="cur-h"
        ref={hLineRef}
        aria-hidden="true"
        style={{
          ...lineBase,
          width:  "16px",
          height: "1px",
        }}
      />

      {/* Vertical arm */}
      <div
        id="cur-v"
        ref={vLineRef}
        aria-hidden="true"
        style={{
          ...lineBase,
          width:  "1px",
          height: "16px",
        }}
      />
    </>
  );
}

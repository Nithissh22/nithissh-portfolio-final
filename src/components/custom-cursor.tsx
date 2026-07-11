"use client";

import * as React from "react";

// ── Helpers ──────────────────────────────────────────────────────────────────

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
      if (rgb) {
        return getLuminance(rgb.r, rgb.g, rgb.b) < 0.3;
      }
    }
    node = node.parentElement;
  }
  return false;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function CustomCursor() {
  const dotRef  = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Touch / stylus guard — don't run on mobile
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    // Hide system cursor on pointer-fine devices (applied via <style> so it
    // covers dynamically-created elements too)
    const styleTag = document.createElement("style");
    styleTag.textContent = `
      @media (hover: hover) and (pointer: fine) {
        *, *::before, *::after { cursor: none !important; }
      }
    `;
    document.head.appendChild(styleTag);

    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    // ── State ──────────────────────────────────────────────────────────────
    let mouseX = -200, mouseY = -200;
    let ringX  = -200, ringY  = -200;
    let rotDeg = 0;
    let raf: number;

    // Scale multipliers (animated via CSS transition)
    let dotScale  = 1;
    let ringScale = 1;

    let isDark    = false;
    let isLink    = false;
    let isHeading = false;
    let isDown    = false;

    // ── Helpers to apply combined transform ────────────────────────────────
    const applyDot = () => {
      const s = isDown ? 0.7 : isLink ? 1.5 : isHeading ? 0 : dotScale;
      dot.style.transform  = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(${s})`;
    };
    const applyRing = () => {
      const s = isDown ? 0.7 : isHeading ? 2 : isLink ? 1.6 : ringScale;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) rotate(${rotDeg}deg) scale(${s})`;
    };

    // ── Color switching ────────────────────────────────────────────────────
    const applyColors = (dark: boolean) => {
      if (isLink) {
        dot.style.background   = "#f0ece4";
        dot.style.borderColor  = "#B5521A";
        ring.style.borderColor = "#B5521A";
        // restore solid ring
        ring.style.borderRightColor = "#B5521A";
        ring.style.animationDuration = "0.8s";
      } else if (isHeading) {
        dot.style.background   = "#B5521A";
        dot.style.borderColor  = dark ? "#0a0a0a" : "#f0ece4";
        ring.style.borderColor = "#B5521A";
        ring.style.borderRightColor = "#B5521A";
        ring.style.animationDuration = "9999s"; // effectively stopped
      } else {
        dot.style.background   = "#B5521A";
        dot.style.borderColor  = dark ? "#0a0a0a" : "#f0ece4";
        ring.style.borderColor = dark ? "#f0ece4" : "#B5521A";
        ring.style.borderRightColor = "transparent"; // C-arc gap
        ring.style.animationDuration = "3s";
      }
    };

    // ── rAF loop ───────────────────────────────────────────────────────────
    const animate = () => {
      // Lerp ring toward mouse
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      rotDeg += 2; // ~120 deg/s at 60fps

      applyDot();
      applyRing();

      raf = requestAnimationFrame(animate);
    };

    // ── Event: mousemove ───────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const dark = isDarkAt(mouseX, mouseY);
      if (dark !== isDark) {
        isDark = dark;
        applyColors(isDark);
      }
    };

    // ── Event: mousedown / mouseup ─────────────────────────────────────────
    const onDown = () => {
      isDown = true;
      dot.style.transition  = "transform 0.08s ease";
      ring.style.transition = "transform 0.08s ease, border-color 0.2s ease, border-right-color 0.2s ease";
    };
    const onUp = () => {
      isDown = false;
      dot.style.transition  = "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.2s ease, border-color 0.2s ease, opacity 0.4s ease";
      ring.style.transition = "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), border-color 0.2s ease, border-right-color 0.2s ease, animation-duration 0.2s";
    };

    // ── Event: link/button hover ───────────────────────────────────────────
    const onLinkEnter = () => { isLink = true;  applyColors(isDark); };
    const onLinkLeave = () => { isLink = false; applyColors(isDark); };

    // ── Event: heading hover ───────────────────────────────────────────────
    const onHeadEnter = () => { isHeading = true;  applyColors(isDark); };
    const onHeadLeave = () => { isHeading = false; applyColors(isDark); };

    // Attach link listeners (also re-run after short delay to catch hydrated elements)
    const attachListeners = () => {
      document.querySelectorAll("a, button, [role='button'], .project-row").forEach(el => {
        el.addEventListener("mouseenter", onLinkEnter);
        el.addEventListener("mouseleave", onLinkLeave);
      });

      document.querySelectorAll("h1, h2, h3").forEach(el => {
        const ff = window.getComputedStyle(el).fontFamily;
        if (ff.includes("Anton") || ff.includes("Bebas")) {
          el.addEventListener("mouseenter", onHeadEnter);
          el.addEventListener("mouseleave", onHeadLeave);
        }
      });
    };

    // Small delay to allow Next.js hydration to finish
    const attachTimer = setTimeout(attachListeners, 400);

    // ── Startup fade-in ────────────────────────────────────────────────────
    dot.style.opacity  = "0";
    ring.style.opacity = "0";
    dot.style.transform  = "translate(-200px, -200px) translate(-50%,-50%) scale(0)";
    ring.style.transform = "translate(-200px, -200px) translate(-50%,-50%) rotate(0deg) scale(0)";

    const fadeTimer = setTimeout(() => {
      dot.style.opacity  = "1";
      ring.style.opacity = "1";
      dot.style.transition  =
        "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.2s ease, border-color 0.2s ease, opacity 0.4s ease";
      ring.style.transition =
        "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), border-color 0.2s ease, border-right-color 0.2s ease, animation-duration 0.2s";
      dotScale  = 1;
      ringScale = 1;
      applyColors(false);
    }, 300);

    // ── Bootstrap ─────────────────────────────────────────────────────────
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
      document.querySelectorAll("h1, h2, h3").forEach(el => {
        el.removeEventListener("mouseenter", onHeadEnter);
        el.removeEventListener("mouseleave", onHeadLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Dot — instant follow */}
      <div
        id="cur-dot"
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#B5521A",
          border: "1.5px solid #f0ece4",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
          opacity: 0,
        }}
      />

      {/* Ring — lerp lag + rotation */}
      <div
        id="cur-ring"
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid #B5521A",
          borderRightColor: "transparent",
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform",
          opacity: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* VIEW label — shown on heading hover via scale */}
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 8,
            color: "#B5521A",
            letterSpacing: "0.1em",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          VIEW
        </span>
      </div>
    </>
  );
}

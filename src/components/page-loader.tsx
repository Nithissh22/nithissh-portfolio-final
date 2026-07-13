"use client";

import gsap from "gsap";
import * as React from "react";

const STATUS_MESSAGES = [
  "( COMPILING ASSETS )",
  "( LOADING PORTFOLIO )",
  "( ALMOST READY )"
];

export function PageLoader() {
  const [visible, setVisible] = React.useState(true);
  const bgRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);
  const percentRef = React.useRef<HTMLDivElement>(null);
  const crosshairRef = React.useRef<HTMLDivElement>(null);
  const statusRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }

    // Status text cycler
    let statusIndex = 0;
    const interval = setInterval(() => {
      statusIndex = (statusIndex + 1) % STATUS_MESSAGES.length;
      if (statusRef.current) {
        statusRef.current.innerText = STATUS_MESSAGES[statusIndex];
      }
    }, 600);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          clearInterval(interval);
          setVisible(false);
        }
      });

      // 1. Reveal letters (stagger up)
      tl.to(".letter", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.04,
        ease: "power3.out"
      });

      // 2. Fade in UI (status, percentage, line)
      tl.to(".ui-element", {
        opacity: 1,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.6");

      // 3. Progress bar fills
      tl.to(progressRef.current, {
        scaleX: 1,
        duration: 1.8,
        ease: "power2.inOut"
      }, "-=0.2");

      // Animate percentage text
      const counter = { val: 0 };
      gsap.to(counter, {
        val: 100,
        duration: 1.8,
        ease: "power2.inOut",
        onUpdate: () => {
          if (percentRef.current) {
            percentRef.current.innerText = `LOADING — ${Math.round(counter.val)}%`;
          }
        }
      });

      // Crosshair infinite spin
      gsap.to(crosshairRef.current, {
        rotation: 180,
        duration: 2,
        ease: "none",
        repeat: -1
      });

      // 4. Outro: Scale down content & fade
      tl.to(contentRef.current, {
        scale: 0.98,
        opacity: 0,
        duration: 0.6,
        ease: "power3.inOut",
        delay: 0.2 // Brief pause at 100%
      });

      // 5. Mask-wipe background top-to-bottom
      tl.to(bgRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.8,
        ease: "power4.inOut"
      }, "-=0.4");

    }, bgRef);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "#f0ede4", clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden="true"
    >
      <div ref={contentRef} className="w-[85vw] max-w-4xl flex flex-col items-center">
        
        {/* Wordmark */}
        <div className="flex font-['Anton'] text-[clamp(2.5rem,8vw,7rem)] leading-none text-[#111111] overflow-hidden py-2 uppercase tracking-tight">
          {Array.from("NITHISSH — SG").map((char, i) => (
            <span
              key={i}
              className="letter inline-block"
              style={{ transform: "translateY(100%)", opacity: 0 }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

        {/* UI Container */}
        <div className="w-full mt-8 md:mt-12 flex flex-col gap-2">
          
          {/* Top labels */}
          <div className="flex justify-between items-end w-full">
            <div
              ref={percentRef}
              className="ui-element font-mono text-[10px] md:text-xs text-[#111111] tracking-widest uppercase opacity-0"
            >
              LOADING — 0%
            </div>
            
            <div
              ref={crosshairRef}
              className="ui-element text-[#c65d3b] text-lg leading-none opacity-0 flex items-center justify-center font-light h-4 w-4"
            >
              +
            </div>
          </div>
          
          {/* Progress Rule */}
          <div className="ui-element w-full h-[1px] bg-[#111111]/10 relative overflow-hidden opacity-0">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 h-full w-full bg-[#c65d3b] origin-left scale-x-0"
            />
          </div>

          {/* Status labels */}
          <div className="ui-element flex justify-between items-start w-full opacity-0">
            <div
              ref={statusRef}
              className="font-mono text-[10px] md:text-xs tracking-widest text-[#111111]"
            >
              ( COMPILING ASSETS )
            </div>
            <div className="font-mono text-[10px] md:text-xs tracking-widest text-[#111111]/40">
              AI ENGINEER
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

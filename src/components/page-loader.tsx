"use client";

import gsap from "gsap";
import * as React from "react";

export function PageLoader() {
  const [visible, setVisible] = React.useState(true);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => setVisible(false)
        })
        .fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.62 })
        .to(overlayRef.current, { yPercent: -100, duration: 0.56 }, "-=0.1");
    }, overlayRef);

    return () => ctx.revert();
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      aria-hidden="true"
    >
      <div className="w-52">
        <div className="mb-4 h-px w-full overflow-hidden bg-border">
          <div ref={barRef} className="h-full origin-left bg-accent" />
        </div>
        <p className="text-center text-xs font-medium uppercase text-muted">
          Nithissh Sampath Kumar
        </p>
      </div>
    </div>
  );
}

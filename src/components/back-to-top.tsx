"use client";

import { ArrowUp } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";

export function BackToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Button
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 z-40 shadow-soft transition duration-300 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      size="icon"
      variant="secondary"
    >
      <ArrowUp size={18} aria-hidden="true" />
    </Button>
  );
}

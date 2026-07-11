"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { navItems, profile } from "@/lib/data";
import { NSGMark } from "./nsg-mark";

export function Navigation() {
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkHref = (href: string) => (pathname === "/" ? href : `/${href}`);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md"
          : ""
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-10"
      >
        <Link className="flex items-center gap-3 transition-opacity hover:opacity-80" href="/">
          <NSGMark className="w-[28px] h-[28px]" />
          <span className="font-['Bebas_Neue'] text-2xl tracking-wide text-[#0a0a0a] pt-1">
            NITHISSH S G
          </span>
        </Link>

        <div className="flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              className="group relative font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)] transition hover:text-[#0a0a0a]"
              href={item.external ? item.href : linkHref(item.href)}
              key={item.label}
              target={item.external ? "_blank" : undefined}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--accent)] transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

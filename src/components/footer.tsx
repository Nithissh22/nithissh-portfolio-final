"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Mail } from "lucide-react";

import { profile } from "@/lib/data";

import { NSGMark } from "./nsg-mark";

const socials = [
  { label: "GitHub", href: profile.githubUrl, icon: FaGithub },
  { label: "LinkedIn", href: profile.linkedInUrl, icon: FaLinkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail }
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-8 md:px-8">
        <div className="flex items-center gap-2">
          <NSGMark className="w-[16px] h-[16px]" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            © {new Date().getFullYear()} {profile.displayName}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                aria-label={social.label}
                className="text-[var(--muted)] transition hover:text-[var(--fg)]"
                href={social.href}
                key={social.label}
                rel="noreferrer"
                target="_blank"
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

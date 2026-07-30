"use client";

import { motion, animate, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight, Gamepad2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { ContactForm } from "@/components/contact-form";
import { NSGMark } from "@/components/nsg-mark";
import { SectionHeading } from "@/components/section-heading";
import {
  allSkills,
  certifications,
  education,
  experiences,
  favoriteGames,
  music,
  profile,
  projectCategories,
  projects,
  stats,
  type Project
} from "@/lib/data";
import { cn } from "@/lib/utils";

/* ── Framer Motion Variants ─────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

/* ── Marquee ───────────────────────────────────── */

function SkillsMarquee() {
  const skills = [
    "MACHINE LEARNING", "✦", "NLP", "✦", "COMPUTER VISION", "✦", 
    "PYTORCH", "✦", "FASTAPI", "✦", "LANGCHAIN", "✦", "MEDIAPIPE", "✦", 
    "RAG", "✦", "BERT", "✦", "WHISPER", "✦"
  ];
  const doubled = [...skills, ...skills, ...skills, ...skills];
  
  return (
    <div className="w-full border-y border-[var(--border)] bg-[#f5f2ec] py-[6px] overflow-hidden group hover:[&_div]:[animation-play-state:paused]">
      <div className="flex whitespace-nowrap" style={{ animation: "marquee 30s linear infinite" }}>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}} />
        <div className="flex px-4 font-['Barlow'] font-light text-[11px] tracking-[0.2em] text-[var(--muted)]">
          {doubled.map((skill, i) => (
            <span key={`${skill}-${i}`} className="mx-4">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Components ────────────────────────────────── */

function MotionSection({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.section
      className={className}
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={stagger}
    >
      {children}
    </motion.section>
  );
}


function GamesShowcase() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <div className="w-full flex flex-col border-y border-[var(--border)]">
      {favoriteGames.map((game, i) => {
        const isHovered = hoveredIndex === i;
        const isAnyHovered = hoveredIndex !== null;

        return (
          <div
            key={i}
            className="group relative w-full h-[280px] border-b border-[var(--border)] last:border-b-0 overflow-hidden bg-[var(--bg)] transition-colors"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Background Image Reveal */}
            <div 
              className={cn(
                "absolute inset-0 w-full h-full transform transition-transform duration-500 ease-out",
                isHovered ? "translate-x-0" : "translate-x-full"
              )}
            >
              <Image
                src={game.image}
                alt={game.title}
                fill
                className="object-cover object-center"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/85" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full flex px-10">
              
              {/* Number Index (Rotated) */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center flex items-center justify-center w-10">
                <span className="font-['Anton'] text-[18px] text-[var(--muted)] tracking-widest">
                  0{i + 1}
                </span>
              </div>

              {/* Default Large Title */}
              <div 
                className={cn(
                  "absolute left-[100px] top-1/2 -translate-y-1/2 transition-all duration-500 ease-out",
                  isHovered ? "opacity-0 -translate-x-10 pointer-events-none" : "opacity-100 translate-x-0",
                  !isHovered && isAnyHovered ? "opacity-40" : ""
                )}
              >
                <h3 className="font-['Anton'] text-[80px] md:text-[100px] leading-none uppercase text-[#0a0a0a] drop-shadow-sm tracking-tight">
                  {game.title}
                </h3>
              </div>

              {/* Hover Details */}
              <div 
                className={cn(
                  "absolute inset-0 px-[100px] py-10 flex w-full h-full justify-between items-start transition-all duration-500 ease-out",
                  isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
                )}
              >
                {/* Left Side: Repositioned Title & Details */}
                <div className="flex flex-col h-full justify-between">
                  <div className="overflow-hidden pb-2">
                    <h3 className="font-['Anton'] text-[40px] leading-none uppercase text-[#f5f2ec] tracking-tight transform transition-transform duration-500 delay-75 group-hover:translate-y-0 translate-y-full">
                      {game.title}
                    </h3>
                  </div>
                  
                  <div className="flex flex-col gap-2 overflow-hidden">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--accent)] transform transition-transform duration-500 delay-100 translate-y-[200%] group-hover:translate-y-0 inline-block">
                      {game.genre}
                    </span>
                    <p className="font-['Barlow'] font-light italic text-[16px] text-[#f5f2ec] transform transition-transform duration-500 delay-150 translate-y-[200%] group-hover:translate-y-0">
                      &quot;{game.note}&quot;
                    </p>
                    <div className="mt-2 transform transition-transform duration-500 delay-[200ms] translate-y-[200%] group-hover:translate-y-0 inline-block">
                      <span className="border border-[#f5f2ec]/30 bg-[#f5f2ec]/10 backdrop-blur-md px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#f5f2ec]">
                        {game.platform}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Arrow */}
                <div className="flex flex-col h-full justify-center">
                  <div className="overflow-hidden">
                    <span className="text-[#f5f2ec] text-[48px] font-light leading-none transform transition-transform duration-500 delay-[250ms] -translate-x-full group-hover:translate-x-0 inline-block">
                      &rarr;
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}

function MusicSection() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number>(0);

  return (
    <MotionSection className="w-full max-w-[1440px] mx-auto pt-24 border-t border-[var(--border)]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between px-10 mb-4 border-b border-[var(--border)] pb-6">
        <h2 className="font-['Anton'] uppercase text-5xl md:text-7xl leading-[0.85] tracking-tight">
          CURRENTLY SPINNING
        </h2>
        <span className="font-['Anton'] text-5xl md:text-7xl leading-[0.85] tracking-tight text-transparent [-webkit-text-stroke:1px_#0a0a0a] opacity-30 mt-4 md:mt-0">
          ( MUSIC )
        </span>
      </div>
      <div className="px-10 mb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
          WHAT&apos;S IN MY EARS WHILE THE MODEL TRAINS
        </span>
      </div>

      {/* NOW PLAYING BAR */}
      <div className="w-full border-y border-[var(--border)] bg-[#111] text-[#f5f2ec] px-10 py-3 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
        <div className="flex items-center gap-4">
          <div className="flex items-end gap-[2px] h-3">
            <div className="w-1 bg-[var(--accent)] animate-[pulse_1s_ease-in-out_infinite_alternate] h-full" />
            <div className="w-1 bg-[var(--accent)] animate-[pulse_1.2s_ease-in-out_infinite_alternate-reverse] h-2/3" />
            <div className="w-1 bg-[var(--accent)] animate-[pulse_0.8s_ease-in-out_infinite_alternate] h-full" />
          </div>
          <span>NOW PLAYING — {music[hoveredIndex].title} · {music[hoveredIndex].artist.split(' · ')[0]}</span>
        </div>
        <span className="text-[#1DB954] flex items-center gap-2">
          ● SPOTIFY
        </span>
      </div>

      <div className="px-10 mt-16 mb-16 grid grid-cols-2 gap-x-8 gap-y-16 md:grid-cols-4">
        {music.map((track, i) => (
          <a
            key={i}
            href={track.url}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col items-center text-center"
            onMouseEnter={() => setHoveredIndex(i)}
          >
            <div className="relative mb-6 w-full max-w-[240px] aspect-square rounded-full overflow-hidden border border-[var(--border)] bg-[var(--surface)] p-1 shadow-sm transition-all duration-300 group-hover:-translate-y-3 group-hover:shadow-xl">
              <Image
                src={track.image}
                alt={track.title}
                fill
                className="rounded-full object-cover animate-[spin_8s_linear_infinite] group-hover:animate-[spin_1.5s_linear_infinite]"
              />
              <div className="absolute inset-0 m-auto h-8 w-8 rounded-full border border-[var(--border)] bg-[var(--bg)]" />
            </div>
            
            <h3 className="font-['Anton'] text-xl uppercase tracking-widest text-[#0a0a0a]">
              {track.title}
            </h3>
            
            <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-[var(--muted)] opacity-80">
              {track.artist}
            </span>
            
            <span className="mt-3 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
              {track.mood}
            </span>

            <p className="mt-4 font-mono text-[9px] uppercase tracking-widest text-[var(--muted)] opacity-70 transition-opacity group-hover:opacity-100 group-hover:text-[#0a0a0a] border-b border-transparent group-hover:border-[#0a0a0a] pb-0.5">
              PLAY ON SPOTIFY ↗
            </p>
          </a>
        ))}
      </div>

      {/* MY SOUND TASTE SUMMARY */}
      <div className="px-10 border-b border-[var(--border)]">
        <div className="border-t border-[var(--border)] py-6 flex flex-col md:flex-row items-center gap-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] shrink-0">
            MY SOUND:
          </span>
          <div className="flex flex-wrap gap-2">
            {["TAMIL", "AR RAHMAN", "YUVAN", "CINEMATIC", "LATE NIGHT FOCUS"].map((chip) => (
              <span 
                key={chip} 
                className="border border-[var(--border)] px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors hover:bg-[#0a0a0a] hover:text-[#f5f2ec]"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

function AnimatedNumber({ value }: { value: string | number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const numValue = parseFloat(value as string);
  const isDecimal = String(value).includes(".");

  React.useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(0, numValue, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => {
          if (ref.current) {
            ref.current.textContent = isDecimal ? v.toFixed(2) : Math.floor(v).toString().padStart(2, '0');
          }
        },
      });
      return controls.stop;
    }
  }, [inView, numValue, isDecimal]);

  return <span ref={ref}>00</span>;
}

function RotatingBadge() {
  const words = ["AI ENGINEER", "RESEARCHER", "BUILDER"];
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-[var(--border)] px-4 py-2 w-[160px] flex items-center justify-center overflow-hidden relative h-[36px]">
      <motion.span
        key={index}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] absolute"
      >
        {words[index]}
      </motion.span>
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project, index: number }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  return (
    <a 
      href={project.githubUrl} 
      target="_blank" 
      rel="noreferrer"
      className="group relative flex flex-col md:flex-row md:items-center justify-between border-t border-[var(--border)] last:border-b py-10 px-10 transition-colors duration-300 hover:bg-[#0a0a0a] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <NSGMark className="absolute right-0 top-1/2 -translate-y-1/2 w-[320px] h-[320px] opacity-[0.04] pointer-events-none translate-x-1/4 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-[0.06]" />
      <div className="flex items-center gap-10 md:w-5/12">
        <span className="font-['Anton'] text-5xl md:text-6xl text-[var(--muted)] group-hover:text-[#f5f2ec] transition-colors">
          0{index + 1}
        </span>
        <div className="flex flex-col">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-2">
            {project.category}
          </span>
          <h3 className="font-heading text-3xl md:text-4xl font-bold group-hover:text-[#f5f2ec] transition-colors">
            {project.title}
          </h3>
        </div>
      </div>

      <div className="mt-8 md:mt-0 flex flex-wrap gap-2 md:w-4/12 px-4 md:px-0">
        {project.stack?.map((tech: string) => (
          <span key={tech} className="border border-[var(--border)] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-black group-hover:text-[#f5f2ec] group-hover:border-[#f5f2ec]/30 transition-colors bg-transparent">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-8 md:mt-0 flex items-center justify-between md:justify-end gap-6 md:w-3/12">
        {project.outcomeStat && (
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--muted)] group-hover:text-[#f5f2ec] transition-colors text-right">
            {project.outcomeStat}
          </span>
        )}
        <ArrowRight size={28} className="text-[#0a0a0a] group-hover:text-[var(--accent)] transition-colors shrink-0" />
      </div>

      {/* Floating Preview (Only visible on large screens to avoid mobile jank) */}
      <motion.div 
        className="pointer-events-none absolute z-50 overflow-hidden bg-[var(--accent)] items-center justify-center shadow-2xl hidden lg:flex"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
          x: mousePos.x, 
          y: mousePos.y 
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        style={{ width: 260, height: 160, left: -130, top: -80 }}
      >
        <span className="font-['Anton'] text-3xl text-[#f5f2ec] tracking-wider uppercase text-center px-4 leading-none">
          {project.title}
        </span>
      </motion.div>
    </a>
  );
}

/* ── Main Page ──────────────────────────────────── */

export function PortfolioHome() {
  const [category, setCategory] = React.useState<(typeof projectCategories)[number]>("ALL");
  const [showGames, setShowGames] = React.useState(false);

  const filteredProjects = React.useMemo(() => {
    if (category === "ALL") return projects;
    return projects.filter((p) => p.category === category);
  }, [category]);

  return (
    <main>
      {/* ── Hero ─────────────────────────────────── */}
      <MotionSection className="relative min-h-[90vh] flex flex-col justify-end pb-12 pt-32 px-10 mx-auto max-w-[1440px]">
        <div className="mb-12 flex items-center justify-between border-b border-[var(--border)] pb-6">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            (AI Engineer)
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            CHENNAI, INDIA
          </span>
        </div>

        <div className="relative z-10 flex flex-col pt-4 md:pt-12">
          <h1 className="font-['Anton'] uppercase text-[17vw] xl:text-[14vw] leading-[0.8] tracking-tight text-[#0a0a0a]">
            {profile.firstName}
          </h1>
          <h1 className="font-['Anton'] uppercase text-[8vw] xl:text-[6.5vw] leading-[0.8] tracking-tight text-[var(--accent)] mt-2">
            &mdash; {profile.lastName}
          </h1>
        </div>

        <div className="mt-8 w-full max-w-[480px] border-l-[3px] border-[var(--accent)] pl-6 py-1">
          <p className="font-['Barlow'] font-light text-[17px] md:text-[18px] leading-[1.8] text-[#0a0a0a]/80">
            {profile.intro}
          </p>
        </div>

        {/* ── CTA Buttons Row ──────────────── */}
        <div className="mt-10 flex items-center gap-4 relative z-20">
          <a
            href="#work"
            className="flex items-center gap-2 bg-[#0a0a0a] px-7 py-3 font-mono text-[12px] font-bold uppercase tracking-widest text-[#f5f2ec] transition-colors hover:bg-[var(--accent)]"
          >
            VIEW WORK &rarr;
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 border border-[#0a0a0a] bg-transparent px-7 py-3 font-mono text-[12px] font-bold uppercase tracking-widest text-[#0a0a0a] transition-colors hover:bg-[#0a0a0a] hover:text-[#f5f2ec]"
          >
            GET IN TOUCH
          </a>
        </div>

        {/* ── Scroll Indicator ──────────────── */}
        <div className="absolute bottom-10 left-10 z-20 hidden md:flex flex-col items-center gap-2 opacity-60">
          <div className="h-[60px] w-[1px] bg-black/20 overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 w-full h-full bg-[#0a0a0a]"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#0a0a0a]/70">
            SCROLL
          </span>
        </div>

        {/* ── Cutout Image ────────────────────────────── */}
        <div className="pointer-events-none absolute bottom-0 right-0 z-0 w-[85%] max-w-[500px] md:right-[5%] xl:max-w-[700px]">
          <div className="relative aspect-[3/4] w-full drop-shadow-2xl grayscale transition-all duration-700 hover:grayscale-0 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
            <Image
              src="/images/cutout.png"
              alt="Nithissh Cutout"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
        </div>
      </MotionSection>

      {/* ── Marquee ──────────────────────────────── */}
      <SkillsMarquee />

      {/* ── About & Stats ────────────────────────── */}
      <MotionSection id="about" className="w-full max-w-[1440px] mx-auto pt-24 pb-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-t border-[var(--border)] px-10 py-6 mb-16">
          <h2 className="font-['Anton'] uppercase text-5xl md:text-7xl leading-[0.85] tracking-tight">
            ABOUT
          </h2>
          <div className="mt-4 md:mt-0">
            <RotatingBadge />
          </div>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_25%_35%] border-t border-[var(--border)]">
          {/* Column 1 - Text */}
          <div className="flex flex-col px-10 py-12 md:border-r border-[var(--border)] border-b md:border-b-0">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-8">
              (ABOUT)
            </span>
            <h3 className="font-['Anton'] uppercase text-4xl md:text-[52px] leading-[0.9] tracking-tight mb-8">
              Bridging the gap<br />between research<br />and reality.
            </h3>
            <p className="font-['Barlow'] font-light text-[16px] leading-[1.8] text-[#0a0a0a]/80 max-w-[380px] mb-8">
              I am motivated by building intelligent systems that work in the real world — not just in jupyter notebooks. If a model can&apos;t be deployed and used, it doesn&apos;t count. My work spans data engineering, backend architecture, and frontend interfaces to ensure AI is usable outside the lab.
            </p>
            <div className="flex flex-wrap gap-2 mb-12">
              {["PYTORCH", "FASTAPI", "LANGCHAIN"].map((skill) => (
                <span key={skill} className="border border-[var(--border)] px-3 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors hover:bg-[#0a0a0a] hover:text-[#f5f2ec]">
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-auto">
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 border border-[#0a0a0a] bg-transparent px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-[#0a0a0a] transition-colors hover:bg-[#0a0a0a] hover:text-[#f5f2ec]"
              >
                DOWNLOAD RÉSUMÉ ↓
              </a>
            </div>
          </div>

          {/* Column 2 - Glitch Art Block */}
          <div className="flex flex-col px-10 py-12 md:border-r border-[var(--border)] border-b md:border-b-0">
            <div className="group relative aspect-[3/4] w-full mb-8 bg-[#0a0a0a] overflow-hidden border border-[#f5f2ec] flex flex-col items-center justify-center">
              
              {/* Scanline overlay (CRT effect) */}
              <div 
                className="pointer-events-none absolute inset-0 z-10 opacity-30" 
                style={{ 
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 0, 0, 0.4) 1px, rgba(0, 0, 0, 0.4) 2px)' 
                }} 
              />
              
              {/* RGB Noise SVG Filter */}
              <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full opacity-30 mix-blend-overlay">
                <filter id="noise">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
              </svg>

              {/* Glitch Text */}
              <div className="relative z-0">
                <style dangerouslySetInnerHTML={{__html: `
                  .glitch-wrapper {
                    position: relative;
                    font-family: 'Anton', sans-serif;
                    font-size: 140px;
                    line-height: 0.85;
                    color: #f0ece4;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                  }
                  .glitch-text {
                    position: relative;
                  }
                  .glitch-text::before,
                  .glitch-text::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #0a0a0a;
                    color: #f0ece4;
                  }
                  .glitch-text::before {
                    left: 4px;
                    text-shadow: -2px 0 #B5521A;
                    clip-path: inset(0 0 100% 0);
                    animation: glitch-anim-1 3s infinite linear alternate-reverse;
                  }
                  .glitch-text::after {
                    left: -4px;
                    text-shadow: -2px 0 #00f0ff;
                    clip-path: inset(0 0 100% 0);
                    animation: glitch-anim-2 3s infinite linear alternate-reverse;
                  }
                  .group:hover .glitch-text::before {
                    left: 8px;
                    animation-duration: 1.5s;
                  }
                  .group:hover .glitch-text::after {
                    left: -8px;
                    animation-duration: 1.5s;
                  }
                  @keyframes glitch-anim-1 {
                    0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
                    2% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
                    4% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); }
                    6% { clip-path: inset(40% 0 40% 0); transform: translate(2px, -2px); }
                    8% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); }
                    10%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); }
                  }
                  @keyframes glitch-anim-2 {
                    0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
                    2% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); }
                    4% { clip-path: inset(20% 0 80% 0); transform: translate(2px, 1px); }
                    6% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); }
                    8% { clip-path: inset(40% 0 40% 0); transform: translate(-2px, -2px); }
                    10%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0, 0); }
                  }
                  @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                  }
                  .blink-cursor {
                    animation: blink 1s step-end infinite;
                  }
                `}} />
                
                <div className="glitch-wrapper">
                  <div className="glitch-text" data-text="N">N</div>
                  <div className="glitch-text" data-text="S">S</div>
                  <div className="glitch-text" data-text="G">G</div>
                </div>
              </div>

              {/* Status Line */}
              <div className="absolute bottom-4 left-4 z-20">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#f0ece4]">
                  {"> SYSTEM: NITHISSH_SG.AI // STATUS: ONLINE"}<span className="blink-cursor bg-[#f0ece4] ml-1 inline-block w-[6px] h-[10px]"></span>
                </span>
              </div>
            </div>

            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0a0a0a] mb-1">
              NITHISSH S G
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-6">
              AI ENGINEER · SRMIST 2027
            </span>
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
              </span>
              OPEN TO WORK
            </div>
          </div>

          {/* Column 3 - Stats */}
          <div className="flex flex-col">
            {stats.map((stat, i) => (
              <div 
                key={stat.label} 
                className={cn(
                  "group flex items-center justify-between px-10 py-8 transition-colors",
                  i !== stats.length - 1 ? "border-b border-[var(--border)]" : ""
                )}
              >
                <span className="font-['Anton'] text-[72px] leading-[0.8] text-[var(--accent)] transition-colors group-hover:text-[#0a0a0a]">
                  <AnimatedNumber value={stat.value} />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] transition-colors group-hover:text-[var(--accent)] text-right max-w-[100px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Full-width Border & Muted Text */}
        <div className="border-t border-[var(--border)] py-6 px-10 flex flex-col md:flex-row items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] text-center md:text-left">
            CHENNAI, INDIA &nbsp;·&nbsp; AVAILABLE FOR REMOTE & ON-SITE ROLES &nbsp;·&nbsp; GRADUATING 2027
          </span>
          <NSGMark className="w-[48px] h-[48px] mt-4 md:mt-0 opacity-40 mark-light" />
        </div>
      </MotionSection>

      {/* ── Experience ────────────────────────────── */}
      <MotionSection id="experience" className="w-full max-w-[1440px] mx-auto pt-24 pb-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-t border-[var(--border)] px-10 py-6">
          <h2 className="font-['Anton'] uppercase text-5xl md:text-7xl leading-[0.85] tracking-tight">
            APPLIED ENGINEERING
          </h2>
          <span className="font-['Anton'] text-5xl md:text-7xl leading-[0.85] tracking-tight text-transparent [-webkit-text-stroke:1px_#0a0a0a] opacity-30 mt-4 md:mt-0">
            ( 02 INTERNSHIPS )
          </span>
        </div>

        {/* Experience Rows */}
        <div className="flex flex-col border-t border-[var(--border)]">
          {experiences.map((exp, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp} 
              className="group relative flex flex-col lg:flex-row lg:items-start justify-between border-b border-[var(--border)] py-12 px-10 transition-colors duration-300 hover:bg-[#0a0a0a]"
            >
              {/* Duration (Rotated) */}
              <div className="hidden lg:flex w-[80px] shrink-0 items-center justify-center pt-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] group-hover:text-[#f5f2ec] transition-colors -rotate-90 whitespace-nowrap origin-center">
                  {exp.period}
                </span>
              </div>

              {/* Mobile Duration */}
              <div className="lg:hidden font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] group-hover:text-[#f5f2ec] transition-colors mb-4">
                {exp.period}
              </div>

              {/* Company & Role */}
              <div className="flex flex-col lg:w-4/12 pr-8 mb-8 lg:mb-0">
                <h3 className="font-['Anton'] text-4xl md:text-[56px] leading-[0.9] text-[#0a0a0a] group-hover:text-[#f5f2ec] transition-colors">
                  {exp.company}
                </h3>
                <h4 className="mt-4 font-mono text-xs uppercase tracking-widest text-[var(--muted)] group-hover:text-[#f5f2ec] transition-colors">
                  {exp.role}
                </h4>
              </div>

              {/* Center: Bullets & Tech Tags */}
              <div className="flex flex-col lg:w-6/12 mb-8 lg:mb-0">
                <ul className="flex flex-col gap-4">
                  {exp.responsibilities.map((resp, j) => (
                    <li key={j} className="border-l-[2px] border-[var(--accent)] pl-4 text-[14px] font-light leading-[1.7] text-black/65 group-hover:text-[#f5f2ec] transition-colors">
                      {resp}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {exp.stack?.map((tech: string) => (
                    <span key={tech} className="border border-[var(--accent)] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors bg-transparent">
                      {tech}
                    </span>
                  ))}
                </div>
                {exp.outcome && (
                  <p className="mt-8 text-sm italic text-[var(--muted)] group-hover:text-[#f5f2ec]/70 transition-colors">
                    {exp.outcome}
                  </p>
                )}
              </div>

              {/* Far Right: Index Number */}
              <div className="hidden lg:flex lg:w-1/12 justify-end items-start">
                <span className="font-['Anton'] text-[80px] leading-[0.8] text-[var(--muted)] group-hover:text-[#f5f2ec] transition-colors">
                  0{i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Row */}
        <div className="flex px-10 pt-12 pb-8 border-b border-[var(--border)]">
          <a href="#contact" className="group flex items-center gap-3">
            <span className="font-heading text-2xl font-bold tracking-tight transition-colors group-hover:text-[var(--accent)]">
              OPEN TO INTERNSHIPS & FULL-TIME ROLES FROM 2027
            </span>
            <ArrowRight size={24} className="transition-transform group-hover:translate-x-2 group-hover:text-[var(--accent)]" />
          </a>
        </div>
      </MotionSection>

      {/* ── Projects ─────────────────────────────── */}
      <MotionSection id="work" className="w-full max-w-[1440px] mx-auto pt-24 pb-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-t border-[var(--border)] px-10 py-6">
          <h2 className="font-['Anton'] uppercase text-5xl md:text-7xl leading-[0.85] tracking-tight">
            SELECTED WORK
          </h2>
          <span className="font-['Anton'] text-5xl md:text-7xl leading-[0.85] tracking-tight text-transparent [-webkit-text-stroke:1px_#0a0a0a] opacity-30 mt-4 md:mt-0">
            ( 04 )
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="px-10 mb-12">
          <div className="flex flex-wrap gap-8 font-mono text-xs uppercase tracking-widest border-b border-[var(--border)]">
            {projectCategories.map((item) => {
              const isActive = category === item;
              return (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={cn(
                    "pb-3 transition-colors relative",
                    isActive ? "text-[#0a0a0a] font-bold" : "text-[var(--muted)] hover:text-[#0a0a0a]"
                  )}
                >
                  {item}
                  {isActive && (
                    <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[var(--accent)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Rows */}
        <div className="flex flex-col">
          {filteredProjects.map((project, i) => (
            <motion.div key={project.slug} variants={fadeUp}>
              <ProjectRow project={project} index={i} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Row */}
        <div className="flex flex-col md:flex-row items-center justify-between px-10 pt-16 pb-8 border-b border-[var(--border)]">
          <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-3">
            <span className="font-heading text-2xl font-bold tracking-tight transition-colors group-hover:text-[var(--accent)]">
              MORE PROJECTS ON GITHUB
            </span>
            <ArrowRight size={24} className="transition-transform group-hover:translate-x-2 group-hover:text-[var(--accent)]" />
          </a>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--muted)] mt-6 md:mt-0">
            (ALL WORK IS OPEN SOURCE)
          </span>
        </div>
      </MotionSection>

      {/* ── Education & Credentials ───────────── */}
      <MotionSection id="credentials" className="w-full max-w-[1440px] mx-auto pt-24 pb-32">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-y border-[var(--border)] px-10 py-6 mb-16">
          <h2 className="font-['Anton'] uppercase text-5xl md:text-7xl leading-[0.85] tracking-tight">
            EDUCATION & CREDENTIALS
          </h2>
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mt-4 md:mt-0 pb-2">
            (SRMIST &middot; 2023&ndash;2027)
          </span>
        </div>

        <div className="px-10 flex flex-col gap-16">
          {/* Top block — Education */}
          <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-[var(--border)] pb-8 mb-8 gap-6">
              <span className="font-mono text-sm tracking-[0.2em] text-[var(--muted)] shrink-0">
                2023 &rarr; 2027
              </span>
              <div className="flex items-center gap-4 flex-wrap lg:flex-nowrap lg:flex-1 lg:justify-center">
                <h3 className="font-['Bebas_Neue'] text-[36px] tracking-wide text-[#0a0a0a] leading-none text-center">
                  SRM INSTITUTE OF SCIENCE & TECHNOLOGY
                </h3>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-1 rounded-sm shrink-0">
                  &bull; ONGOING
                </span>
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0a0a0a] shrink-0">
                B.TECH CSE &middot; AI & ML
              </span>
            </div>

            {/* Stat strip */}
            <div className="flex flex-wrap items-center gap-8 md:gap-12">
              <div className="flex flex-col">
                <span className="font-['Bebas_Neue'] text-[56px] text-[var(--accent)] leading-[0.85]">
                  8.29
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mt-2">
                  CGPA
                </span>
              </div>
              <div className="hidden md:block h-12 w-[1px] bg-[var(--border)]" />
              <div className="flex flex-col">
                <span className="font-['Bebas_Neue'] text-[32px] text-[#0a0a0a] leading-[0.85] mt-auto">
                  4TH YR
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mt-2">
                  CURRENT YEAR
                </span>
              </div>
              <div className="hidden md:block h-12 w-[1px] bg-[var(--border)]" />
              <div className="flex flex-col">
                <span className="font-['Bebas_Neue'] text-[32px] text-[#0a0a0a] leading-[0.85] mt-auto">
                  2027
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mt-2">
                  GRADUATING
                </span>
              </div>
            </div>
          </div>

          {/* Bento Grid for Certs */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[
              { id: "ai-deep", name: "Artificial Intelligence & Deep Learning", provider: "Professional Certification", type: "wide-completed", url: "/certificates/ai-deep-learning.pdf" },
              { id: "aws", name: "AWS Machine Learning Terminology & Process", provider: "AWS", type: "standard-completed", url: "/certificates/aws-machine-learning.pdf" },
              { id: "sql", name: "SQL Advanced", provider: "HackerRank", type: "standard-completed", url: "/certificates/sql-advanced.pdf" },
              { id: "google", name: "Google Analytics Certification", provider: "Google Skillshop", type: "standard-completed", url: "/certificates/google-analytics.html" },
              { id: "csharp", name: "C# Programming", provider: "Professional Certification", type: "standard-completed", url: "/certificates/csharp.pdf" },
              { id: "genai", name: "GenAI Powered Data Analytics Simulation", provider: "Tata via Forage", type: "standard-completed", url: "/certificates/tata-gen-ai.pdf" },
              { id: "nlp", name: "NLP Course", provider: "HuggingFace", type: "wide-inprogress", url: "#" },
              { id: "nvidia", name: "Getting Started with Deep Learning", provider: "NVIDIA", type: "standard-inprogress", url: "#" },
              { id: "azure", name: "Azure AI Fundamentals", provider: "Microsoft", type: "standard-inprogress", url: "#" }
            ].map((cert) => {
              const isCompleted = cert.type.includes("completed");
              const isWide = cert.type.includes("wide");
              return (
                <a
                  key={cert.id}
                  href={cert.url !== "#" ? cert.url : undefined}
                  target={cert.url !== "#" ? "_blank" : undefined}
                  rel={cert.url !== "#" ? "noreferrer" : undefined}
                  className={cn(
                    "group relative flex flex-col justify-between p-6 transition-all duration-300 overflow-hidden",
                    isWide ? "md:col-span-2" : "col-span-1",
                    isCompleted 
                      ? "bg-[#111] text-[#f0ece4] hover:-translate-y-1 hover:shadow-xl hover:border-l-[3px] hover:border-l-[var(--accent)] border-transparent"
                      : "bg-[#f5f2ec] text-[#0a0a0a] border border-dashed border-[var(--accent)] hover:bg-[rgba(181,82,26,0.06)] hover:-translate-y-1"
                  )}
                >
                  <div className="flex justify-between items-start mb-10">
                    <span className={cn(
                      "font-mono text-[10px] font-bold uppercase tracking-widest",
                      isCompleted ? "text-[var(--accent)]" : "text-[var(--muted)]"
                    )}>
                      {cert.provider}
                    </span>
                    <ArrowUpRight 
                      size={18} 
                      className={cn(
                        "transition-transform group-hover:translate-x-1 group-hover:-translate-y-1",
                        isCompleted ? "text-[#f0ece4]" : "text-[var(--accent)]"
                      )} 
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-[18px] font-bold leading-snug transition-transform duration-200 group-hover:translate-x-1">
                      {cert.name}
                    </h3>
                    <span className={cn(
                      "mt-5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest font-bold",
                      isCompleted ? "text-[#22c55e]" : "text-[var(--accent)]"
                    )}>
                      {isCompleted ? "✓ VERIFIED" : "◌ IN PROGRESS"}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Section footer row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-[var(--border)] pt-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#0a0a0a]">
              9 CERTIFICATIONS &middot; 3 IN PROGRESS
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--muted)] mt-4 md:mt-0">
              ALL CREDENTIALS VERIFIED &check;
            </span>
          </div>
        </div>
      </MotionSection>

      <MusicSection />

      {/* ── Favorite Games ──────────────────────────── */}
      <MotionSection className="w-full max-w-[1440px] mx-auto pt-24 pb-32 overflow-hidden">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-y border-[var(--border)] px-10 py-6 mb-4">
          <h2 className="font-['Anton'] uppercase text-5xl md:text-7xl leading-[0.85] tracking-tight">
            PLAYER ONE
          </h2>
          <span className="font-['Anton'] text-5xl md:text-7xl leading-[0.85] tracking-tight text-transparent [-webkit-text-stroke:1px_#0a0a0a] opacity-30 mt-4 md:mt-0">
            ( GAMES )
          </span>
        </div>
        <div className="px-10 mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
            WHAT I PLAY WHEN I&apos;M NOT SHIPPING MODELS
          </span>
        </div>

        <GamesShowcase />

        {/* GAMES TAUGHT ME */}
        <div className="px-10 mt-8">
          <div className="border border-[var(--border)] p-6 flex flex-col md:flex-row items-center gap-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] shrink-0">
              GAMES TAUGHT ME:
            </span>
            <div className="flex flex-wrap gap-2">
              {["SYSTEMS THINKING", "UX INTUITION", "PUSHING TO SHIP"].map((chip) => (
                <span 
                  key={chip} 
                  className="border border-[var(--border)] px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors hover:bg-[#0a0a0a] hover:text-[#f5f2ec]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>


      {/* Full-width Marquee at the bottom of QnA */}
      <div className="border-y border-[var(--border)] py-4 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee-scroll flex font-['Anton'] text-[40px] tracking-widest text-[var(--accent)] uppercase w-max">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="mx-4 flex-shrink-0">
              OPEN TO WORK &middot; AI ENGINEERING &middot; NLP &middot; COMPUTER VISION &middot; FULL STACK &middot; RESEARCH &middot; OPEN TO WORK &middot;
            </span>
          ))}
        </div>
      </div>

      {/* ── Contact ──────────────────────────────── */}
      <MotionSection id="contact" className="border-t border-[var(--border)] py-32 px-10 max-w-[1440px] mx-auto">
        <div className="grid gap-24 md:grid-cols-2 items-start">
          <div className="flex flex-col">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-8">
              (CONTACT)
            </span>
            <h2 className="font-['Anton'] uppercase text-[15vw] md:text-[8vw] leading-[0.85] tracking-tight mb-2">
              LET&apos;S BUILD
            </h2>
            <h2 className="font-['Anton'] uppercase text-[15vw] md:text-[8vw] leading-[0.85] tracking-tight text-transparent [-webkit-text-stroke:2px_#0a0a0a]">
              SOMETHING.
            </h2>
            
            <div className="mt-12 h-px w-full bg-[var(--border)]" />
            
            <div className="mt-8 mb-12 flex items-center gap-3 rounded-full border border-[var(--border)] px-4 py-2 w-fit">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--accent)]"></span>
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                AVAILABLE FOR WORK
              </span>
            </div>

            <div className="flex flex-col w-full border-t border-[var(--border)]">
              <a href={`mailto:nithisshcodemeshflow@gmail.com`} className="group relative flex w-full items-center justify-between border-b border-[var(--border)] py-6 transition-colors px-4 overflow-hidden">
                <div className="absolute inset-0 -translate-x-full bg-[#0a0a0a] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <div className="relative z-10 flex flex-col justify-center">
                  <span className="font-mono text-sm font-bold uppercase tracking-widest transition-colors group-hover:text-[#f5f2ec]">
                    PROFESSIONAL
                  </span>
                  <span className="absolute top-[80%] left-0 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 font-mono text-[10px] tracking-widest text-[#f5f2ec]/60 whitespace-nowrap">
                    nithisshcodemeshflow@gmail.com
                  </span>
                </div>
                <ArrowRight size={20} className="relative z-10 transition-transform group-hover:text-[#f5f2ec]" />
              </a>
              <a href={`mailto:24nithissh@gmail.com`} className="group relative flex w-full items-center justify-between border-b border-[var(--border)] py-6 transition-colors px-4 overflow-hidden">
                <div className="absolute inset-0 -translate-x-full bg-[#0a0a0a] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <div className="relative z-10 flex flex-col justify-center">
                  <span className="font-mono text-sm font-bold uppercase tracking-widest transition-colors group-hover:text-[#f5f2ec]">
                    PERSONAL
                  </span>
                  <span className="absolute top-[80%] left-0 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 font-mono text-[10px] tracking-widest text-[#f5f2ec]/60 whitespace-nowrap">
                    24nithissh@gmail.com
                  </span>
                </div>
                <ArrowRight size={20} className="relative z-10 transition-transform group-hover:text-[#f5f2ec]" />
              </a>
              <a href={profile.linkedInUrl} target="_blank" rel="noreferrer" className="group relative flex w-full items-center justify-between border-b border-[var(--border)] py-6 transition-colors px-4 overflow-hidden">
                <div className="absolute inset-0 -translate-x-full bg-[#0a0a0a] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 font-mono text-sm font-bold uppercase tracking-widest transition-colors group-hover:text-[#f5f2ec]">LINKEDIN</span>
                <span className="relative z-10 font-mono text-xs hidden sm:block opacity-0 transition-all group-hover:opacity-100 group-hover:text-[#f5f2ec]">Connect</span>
                <ArrowRight size={20} className="relative z-10 transition-transform group-hover:text-[#f5f2ec]" />
              </a>
              <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="group relative flex w-full items-center justify-between border-b border-[var(--border)] py-6 transition-colors px-4 overflow-hidden">
                <div className="absolute inset-0 -translate-x-full bg-[#0a0a0a] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 font-mono text-sm font-bold uppercase tracking-widest transition-colors group-hover:text-[#f5f2ec]">GITHUB</span>
                <span className="relative z-10 font-mono text-xs hidden sm:block opacity-0 transition-all group-hover:opacity-100 group-hover:text-[#f5f2ec]">Explore</span>
                <ArrowRight size={20} className="relative z-10 transition-transform group-hover:text-[#f5f2ec]" />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
              <span>CHENNAI, INDIA</span>
              <span>&middot;</span>
              <span>OPEN TO REMOTE & RELOCATION</span>
            </div>
          </div>
          <div className="mt-8 md:mt-0 pt-16">
            <ContactForm />
          </div>
        </div>
      </MotionSection>
    </main>
  );
}

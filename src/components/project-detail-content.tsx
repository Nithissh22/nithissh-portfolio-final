"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Layers3
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/data";

const reveal = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 }
};

const toneByCategory: Record<Project["category"], "blue" | "green" | "amber"> = {
  "AI Systems": "blue",
  "Computer Vision": "green",
  "Product Design": "amber"
};

export function ProjectDetailContent({ project }: { project: Project }) {
  const demoHref = project.demoUrl?.startsWith("#") ? `/${project.demoUrl}` : project.demoUrl;

  return (
    <main className="pt-24">
      <section className="section-shell">
        <Button asChild size="sm" variant="secondary">
          <Link href="/#projects">
            <ArrowLeft size={15} aria-hidden="true" />
            Projects
          </Link>
        </Button>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            animate="visible"
            initial="hidden"
            variants={reveal}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge tone={toneByCategory[project.category]}>{project.category}</Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="mt-4 text-xl font-medium text-accent">{project.subtitle}</p>
            <p className="mt-6 text-lg leading-9 text-muted">{project.overview}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a href={project.githubUrl} rel="noreferrer" target="_blank">
                  <Github size={16} aria-hidden="true" />
                  GitHub
                </a>
              </Button>
              <Button asChild variant="secondary">
                <a href={demoHref}>
                  <ExternalLink size={16} aria-hidden="true" />
                  Live Demo
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-card shadow-lift"
            initial={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.82, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              alt={`${project.title} case study preview`}
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              src={project.image}
            />
          </motion.div>
        </div>
      </section>

      <section className="bg-card/55">
        <div className="section-shell">
          <div className="grid gap-5 md:grid-cols-2">
            <motion.article
              className="rounded-lg border border-border bg-background p-6 shadow-sm"
              initial="hidden"
              variants={reveal}
              viewport={{ once: true, margin: "-120px" }}
              whileInView="visible"
              transition={{ duration: 0.65 }}
            >
              <p className="text-sm font-semibold uppercase text-accent">Problem</p>
              <p className="mt-4 text-base leading-8 text-muted">{project.problem}</p>
            </motion.article>
            <motion.article
              className="rounded-lg border border-border bg-background p-6 shadow-sm"
              initial="hidden"
              variants={reveal}
              viewport={{ once: true, margin: "-120px" }}
              whileInView="visible"
              transition={{ duration: 0.65, delay: 0.06 }}
            >
              <p className="text-sm font-semibold uppercase text-accent">Solution</p>
              <p className="mt-4 text-base leading-8 text-muted">{project.solution}</p>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            label="Technical Approach"
            title="A case study built around product value and implementation clarity."
            description="The layout keeps the work scannable for recruiters and engineering teams while preserving technical depth."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <article className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-soft text-accent">
                <Layers3 size={18} aria-hidden="true" />
              </div>
              <h2 className="mt-5 text-lg font-semibold text-foreground">Technology Stack</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
            <article className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-soft text-accent">
                <CheckCircle2 size={18} aria-hidden="true" />
              </div>
              <h2 className="mt-5 text-lg font-semibold text-foreground">Key Features</h2>
              <ul className="mt-4 space-y-3">
                {project.features?.map((feature) => (
                  <li className="flex gap-3 text-sm leading-6 text-muted" key={feature}>
                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-accent"
                      size={15}
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">Outcome</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {project.impact?.map((item) => (
              <div className="rounded-lg border border-border bg-background p-4" key={item}>
                <p className="text-sm leading-6 text-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-lg border border-border bg-foreground p-6 text-background sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium opacity-80">Interested in the build?</p>
            <p className="mt-1 text-xl font-semibold">Discuss the architecture or request a walkthrough.</p>
          </div>
          <Button asChild variant="primary">
            <Link href="/#contact">
              Contact Me
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

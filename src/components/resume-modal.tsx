"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Download, FileText, X } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { profile, projects, skillGroups } from "@/lib/data";

type ResumeModalProps = {
  compact?: boolean;
};

export function ResumeModal({ compact = false }: ResumeModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="secondary" size={compact ? "sm" : "md"}>
          <FileText size={16} aria-hidden="true" />
          Resume
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[86vh] w-[calc(100vw-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-border bg-background p-5 shadow-lift focus:outline-none sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-2xl font-semibold text-foreground">
                {profile.fullName}
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-6 text-muted">
                {profile.role}. B.Tech CSE (AI & ML), SRM Institute of Science and Technology.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <Button aria-label="Close resume preview" size="icon" variant="ghost">
                <X size={18} aria-hidden="true" />
              </Button>
            </Dialog.Close>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <section>
              <h3 className="text-sm font-semibold uppercase text-foreground">Highlights</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                <li>CGPA 8.38 with AI and ML specialization.</li>
                <li>2 internships across data science and software engineering.</li>
                <li>4 major projects spanning NLP, CV, full stack, and product engineering.</li>
                <li>9 certifications across AI, cloud, analytics, security, and programming.</li>
              </ul>
            </section>
            <section>
              <h3 className="text-sm font-semibold uppercase text-foreground">Core Stack</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {skillGroups
                  .flatMap((group) => group.skills)
                  .slice(0, 18)
                  .join(", ")}
              </p>
            </section>
          </div>

          <section className="mt-8">
            <h3 className="text-sm font-semibold uppercase text-foreground">Selected Work</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="rounded-lg border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-soft"
                >
                  <p className="text-sm font-semibold text-foreground">{project.title}</p>
                  <p className="mt-1 text-xs leading-5 text-muted">{project.subtitle}</p>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href={profile.resumeUrl} download>
                <Download size={16} aria-hidden="true" />
                Download Resume
              </a>
            </Button>
            <Dialog.Close asChild>
              <Button variant="secondary">Close Preview</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

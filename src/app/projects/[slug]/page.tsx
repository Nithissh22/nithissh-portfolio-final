import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailContent } from "@/components/project-detail-content";
import { profile, projects } from "@/lib/data";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project"
    };
  }

  return {
    title: `${project.title} | ${profile.displayName}`,
    description: project.overview,
    openGraph: {
      title: `${project.title} | ${profile.displayName}`,
      description: project.overview,
      images: [
        {
          url: project.image,
          width: 1536,
          height: 960,
          alt: `${project.title} preview`
        }
      ]
    }
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailContent project={project} />;
}

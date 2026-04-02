"use client";

import { QueryProjects } from "@/lib/get-projects";
import { Reveal } from "@/components/mdx/Reveal";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const ProjectsView = ({
  initialProjects,
}: {
  initialProjects: QueryProjects["projects"];
  totalPages: number;
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-40">
      <div className="flex flex-col gap-20">
        <header className="max-w-3xl">
          <Reveal>
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter italic mb-8">
              Selected <span className="text-primary/80">Works</span>
            </h1>
          </Reveal>
          <Reveal transition={{ delay: 0.2 }}>
            <p className="text-xl text-foreground/60 leading-relaxed font-sans">
              A curated collection of digital experiences where strategy meets
              cinema. From local culinary mastery to global SaaS innovation.
            </p>
          </Reveal>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {initialProjects.map((project, i) => (
            <Reveal key={project.slug} transition={{ delay: 0.1 * i }}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block relative overflow-hidden rounded-3xl border border-white/5 bg-white/2 backdrop-blur-md transition-all duration-500 hover:border-primary/30"
              >
                {/* Thumbnail */}
                <div className="aspect-16/10 relative overflow-hidden">
                  {project.thumbnail && (
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>

                {/* Content Overlay */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/80">
                      {project.category || "Case Study"}
                    </span>
                    <ArrowRight className="w-5 h-5 text-white/20 -translate-x-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold font-display italic text-white mb-2 decoration-primary/0 group-hover:decoration-primary/50 underline transition-all">
                    {project.title}
                  </h3>
                  <p className="text-sm text-foreground/50 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

ProjectsView.displayName = "ProjectsView";

export default ProjectsView;

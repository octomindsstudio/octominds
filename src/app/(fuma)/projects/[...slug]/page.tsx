import { projectSource } from "@/lib/source";
import { notFound } from "next/navigation";
import { DocsBody, DocsPage } from "fumadocs-ui/page";
import { getMDXComponents } from "@/components/mdx";
import { formatDate } from "@/lib/format-date";
import Image from "next/image";
import * as motion from "framer-motion/client";
import { BackgroundMesh } from "@/components/home/background-mesh";
import { withUtm } from "@/lib/with-utm";
import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";
import Link from "next/link";

type Props = Promise<{ slug: string[] }>;

const ProjectDetailPage = async ({ params }: { params: Props }) => {
  const { slug } = await params;
  const page = projectSource.getPage(slug);

  if (!page) notFound();

  const MDX = page.data.body;
  const thumbnail = page.data.banner || page.data.thumbnail;

  return (
    <div className="relative min-h-screen bg-background selection:bg-primary selection:text-white overflow-x-clip">
      <BackgroundMesh />

      <div className="pt-24 md:pt-40">
        <section className="max-w-6xl mx-auto px-6 mb-14">
          <div className="flex flex-col gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-10"
            >
              <div className="flex items-center gap-6">
                <span className="px-5 py-2 bg-primary/10 border border-primary/20 text-primary rounded-full text-[10px] tracking-[0.5em] uppercase font-bold backdrop-blur-md">
                  {page.data.category || "Project Case Study"}
                </span>
                <div className="flex-1 h-px bg-linear-to-r from-primary/40 via-primary/10 to-transparent" />
              </div>

              <div className="relative group max-w-5xl">
                <h1
                  className={`font-bold bg-linear-to-br from-white via-white to-white/40 bg-clip-text text-transparent transform-gpu transition-all duration-1000 ${
                    page.data.title.length > 30
                      ? "text-3xl md:text-5xl lg:text-6xl"
                      : "text-5xl md:text-7xl lg:text-8xl"
                  }`}
                >
                  {page.data.title}
                </h1>
                <div className="absolute -left-12 top-0 bottom-0 w-1 bg-linear-to-b from-primary/40 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden lg:block" />
              </div>

              {page.data.description && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="font-sans md:text-2xl text-white/60 leading-relaxed max-w-2xl font-light"
                >
                  {page.data.description}
                </motion.p>
              )}

              {page.data.links && Object.keys(page.data.links).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex flex-wrap gap-3 mt-2"
                >
                  {Object.entries(page.data.links).map(([label, href]) => {
                    const trackedHref = withUtm(href, slug.join("/"));
                    return (
                      <Link
                        key={label}
                        href={trackedHref}
                        target="_blank"
                        className="group/link inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.25em] border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300"
                      >
                        {label}
                        <svg
                          className="w-3 h-3 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 17L17 7M17 7H7M17 7v10"
                          />
                        </svg>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </motion.div>

            {/* Metadata Section */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.9 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1.2 }}
              className="flex flex-wrap items-center gap-16 border-y border-white/10 py-10"
            >
              <div className="flex flex-col gap-3 group">
                <span className="text-[10px] text-muted uppercase tracking-[0.4em]">
                  Timeline
                </span>
                <span
                  className="text-2xl font-display font-semibold text-white tracking-tight"
                  suppressHydrationWarning
                >
                  {formatDate(page.data.createdAt, page.data.updatedAt)}
                </span>
              </div>
              {/* ... other metadata components ... */}
            </motion.div>
          </div>
        </section>

        {/* Thumbnail Reveal */}
        <div className="max-w-380 mx-auto px-4 md:px-12 mb-10 lg:mb-20">
          {thumbnail && (
            <motion.div
              initial={{ scale: 0.98, opacity: 0, y: 40 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full aspect-21/9 rounded-xl md:rounded-[2rem] overflow-hidden group shadow-2xl border border-white/5"
            >
              <Image
                src={thumbnail}
                alt={page.data.title}
                fill
                priority
                className="object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
            </motion.div>
          )}
        </div>

        <main className="max-w-6xl mx-auto px-0 md:px-6 pb-10">
          <DocsPage footer={{ enabled: false }}>
            <DocsBody className="prose-editorial text-lg! leading-relaxed! text-muted-foreground/85">
              <Suspense fallback={<Loader />}>
                <MDX components={getMDXComponents()} />
              </Suspense>
            </DocsBody>
          </DocsPage>
        </main>
      </div>
    </div>
  );
};

export default ProjectDetailPage;

export async function generateStaticParams() {
  return projectSource
    .generateParams()
    .filter((p) => p.slug && p.slug.length > 0);
}

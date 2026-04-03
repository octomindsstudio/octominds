"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Octominds transformed our archaic platform into a sleek, high-conversion engine. Their attention to detail in motion and UX is unparalleled.",
    author: "Sarah Chen",
    role: "Product Lead at Arise",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    quote:
      "Working with them felt like adding a high-octane engineering team to our startup overnight. The speed and quality of their Next.js implementation is world-class.",
    author: "Marc Veras",
    role: "CEO of Teppan",
    avatar: "https://i.pravatar.cc/150?u=marc",
  },
  {
    quote:
      "The editorial design they brought to our brand story has significantly increased our time-on-site metrics. They truly understand the art of digital storytelling.",
    author: "Elena Rossi",
    role: "Creative Director at Arom Studio",
    avatar: "https://i.pravatar.cc/150?u=elena",
  },
  {
    quote:
      "From discovery to deployment, the process was transparent and efficient. They didn't just build a site; they built a brand experience.",
    author: "David Park",
    role: "Founder of Flux",
    avatar: "https://i.pravatar.cc/150?u=david",
  },
  {
    quote:
      "Their ability to translate complex business needs into elegant technical solutions is what sets them apart. A truly elite studio.",
    author: "James Wilson",
    role: "CTO at Nexus",
    avatar: "https://i.pravatar.cc/150?u=james",
  },
  {
    quote:
      "Motion design that feels meaningful, not just decorative. Octominds knows how to guide user attention with precision.",
    author: "Lila Vance",
    role: "Experience Lead at Zenith",
    avatar: "https://i.pravatar.cc/150?u=lila",
  },
];

const TestimonialCard = ({
  quote,
  author,
  role,
  avatar,
}: (typeof testimonials)[0]) => (
  <div className="shrink-0 w-87.5 md:w-112.5 h-full p-8 rounded-3xl border border-white/5 bg-white/2 md:backdrop-blur-sm group hover:border-primary/20 transition-all duration-500 transform-gpu will-change-transform">
    <div className="flex flex-col justify-between h-full space-y-6">
      <div className="space-y-4">
        <div className="flex gap-1 text-primary">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="font-sans text-lg md:text-xl text-foreground/80 italic leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12 rounded-full overflow-hidden border border-white/10">
          <img src={avatar} alt={author} className="object-cover" />
        </div>
        <div>
          <h4 className="font-display text-base font-bold text-foreground">
            {author}
          </h4>
          <p className="font-sans text-sm text-foreground/40">{role}</p>
        </div>
      </div>
    </div>
  </div>
);

export function TestimonialsMarquee() {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden bg-linear-to-b from-transparent to-background">
      <div className="container mx-auto px-6 mb-16 space-y-4 text-center">
        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-foreground">
          Trusted by <span className="text-primary italic">Innovators</span>
        </h2>
        <p className="font-sans text-lg text-foreground/40 max-w-2xl mx-auto">
          We partner with ambitious teams to build products that define
          categories.
        </p>
      </div>

      <div className="flex flex-col gap-8 md:gap-12">
        {/* Top Marquee (Forward) */}
        <div className="flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 px-4"
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </motion.div>
        </div>

        {/* Bottom Marquee (Backward) */}
        <div className="flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <motion.div
            initial={{ x: "-50%" }}
            animate={{ x: 0 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 px-4"
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-primary/5 blur-[120px] rounded-full -z-10" />
    </section>
  );
}

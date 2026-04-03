"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { clsx } from "clsx";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";

const SERVICES = [
  "Branding",
  "UI/UX Design",
  "Development",
  "Strategy",
  "Motion",
];

export function ContactFormBlocks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    services: [] as string[],
    message: "",
  });

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name || !formData.message) {
      alert("Please fill in the required fields.");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", services: [], message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".bento-card");

    gsap.fromTo(
      cards,
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-7xl mx-auto px-6 pb-40 relative z-10"
    >
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {/* Card 1: The Mission (Large) */}
        <div className="bento-card lg:col-span-2 group relative p-10 md:p-12 rounded-[2.5rem] border border-border bg-foreground/2 backdrop-blur-md transition-all duration-700 hover:border-primary/30 hover:bg-foreground/4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-px bg-primary/50" />
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary">
              01. The Mission
            </span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-black uppercase mb-6 group-hover:text-primary transition-colors">
            What are we engineering?
          </h3>
          <textarea
            required
            rows={4}
            placeholder="Tell us about the project objectives..."
            className="w-full bg-transparent border-none outline-none text-lg md:text-xl font-sans placeholder:text-muted-foreground/30 resize-none"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
        </div>

        {/* Card 2: Identity (Square) */}
        <div className="bento-card group relative p-10 rounded-[2.5rem] border border-border bg-foreground/2 backdrop-blur-md transition-all duration-700 hover:border-primary/30 hover:bg-foreground/4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-primary/40" />
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary">
              02. Identity
            </span>
          </div>
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">
                Your Name
              </label>
              <input
                required
                type="text"
                placeholder="John Doe"
                className="w-full bg-transparent border-b border-border/50 focus:border-primary py-2 outline-none transition-all font-bold"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">
                Email Address
              </label>
              <input
                required
                type="email"
                placeholder="hello@example.com"
                className="w-full bg-transparent border-b border-border/50 focus:border-primary py-2 outline-none transition-all font-bold"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Card 3: Scope (Horizontal) */}
        <div className="bento-card lg:col-span-2 group relative p-10 md:p-12 rounded-[2.5rem] border border-border bg-foreground/2 backdrop-blur-md transition-all duration-700 hover:border-primary/30 hover:bg-foreground/4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-px bg-primary/50" />
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary">
              03. The Scope
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {SERVICES.map((service) => (
              <button
                type="button"
                key={service}
                onClick={() => toggleService(service)}
                className={clsx(
                  "px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-500",
                  formData.services.includes(service)
                    ? "bg-primary border-primary text-black"
                    : "border-border/50 bg-foreground/3 text-muted-foreground hover:border-primary/20",
                )}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        {/* Card 4: Action (Magnetic/Launch) */}
        <motion.button
          disabled={status === "sending"}
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={clsx(
            "bento-card group relative p-1 rounded-[2.5rem] flex items-center justify-center overflow-hidden h-full min-h-[200px] transition-all duration-500",
            status === "success"
              ? "bg-green-500"
              : status === "error"
                ? "bg-red-500"
                : "bg-primary",
          )}
        >
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-30 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000" />
          <AnimatePresence mode="wait">
            <motion.span
              key={status}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="font-display text-3xl font-black uppercase tracking-tighter text-black"
            >
              {status === "idle" && "Launch Inquiry"}
              {status === "sending" && "Sending..."}
              {status === "success" && "Success!"}
              {status === "error" && "Try Again"}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        {/* Card 5: Connect (Socials) */}
        <div className="bento-card lg:col-span-3 group relative p-8 rounded-[2.5rem] border border-border bg-foreground/2 backdrop-blur-md flex flex-wrap items-center justify-between gap-6 opacity-60 hover:opacity-100 transition-opacity">
          <div className="flex gap-8">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              hello@octominds.studio
            </span>
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Twitter / X
            </span>
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              LinkedIn
            </span>
          </div>
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            © 2026 Octominds Studio
          </span>
        </div>
      </form>
    </div>
  );
}

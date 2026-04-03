"use client";

import { ContactHero } from "@/components/contact/contact-hero";
import { ContactFormBlocks } from "@/components/contact/contact-form-blocks";
import { BackgroundMesh } from "@/components/home/background-mesh";

export function ContactView() {
  return (
    <main className="relative min-h-screen bg-bg-1 text-foreground overflow-x-hidden">
      <BackgroundMesh />

      {/* Content Layer */}
      <div className="relative z-10 w-full">
        <ContactHero />

        <ContactFormBlocks />
      </div>

      {/* Decorative elements */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-linear-to-t from-bg-1 to-transparent pointer-events-none z-20" />
    </main>
  );
}

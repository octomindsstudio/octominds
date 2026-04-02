"use client";
import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      sidebar={{ enabled: false }}
      nav={{
        enabled: false,
      }}
      tree={source.pageTree}
    >
      {children}
    </DocsLayout>
  );
}

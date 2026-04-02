"use client";

import { SmoothScrollProvider } from "./smooth-scroll-provider";

import { RootProvider } from "fumadocs-ui/provider/next";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <RootProvider>{children}</RootProvider>
    </SmoothScrollProvider>
  );
}

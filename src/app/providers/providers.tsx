"use client";

import { SmoothScrollProvider } from "./smooth-scroll-provider";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
import { RootProvider } from "fumadocs-ui/provider/next";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProgressProvider
      color="var(--primary)"
      height="2px"
      options={{ showSpinner: false }}
      shallowRouting
    >
      <SmoothScrollProvider>
        <RootProvider>{children}</RootProvider>
      </SmoothScrollProvider>
    </ProgressProvider>
  );
}

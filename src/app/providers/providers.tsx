"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SmoothScrollProvider } from "./smooth-scroll-provider";
import { useRouter } from "next/navigation";
import { RootProvider } from "fumadocs-ui/provider/next";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <RootProvider>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </RootProvider>
  );
}

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SmoothScrollProvider } from "./smooth-scroll-provider";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextThemesProvider attribute="class" defaultTheme="system">
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </NextThemesProvider>
  );
}

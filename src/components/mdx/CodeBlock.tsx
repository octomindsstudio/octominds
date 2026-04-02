"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@heroui/react";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode;
  "data-language"?: string;
  "data-title"?: string;
}

export function CodeBlock({
  children,
  className,
  "data-language": lang,
  "data-title": title,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    // Extract text content from children
    // In actual implementation with Fumadocs, children is often a structured object.
    // We'll try to find the actual code text or let the user handle complex cases.

    // For now, we'll assume the code is accessible or use a more robust extraction.
    const codeText = document.getElementById(props.id || "")?.textContent || "";

    if (codeText) {
      navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group relative my-8 overflow-hidden rounded-2xl border border-border/40 dark:border-white/5 bg-black/5 dark:bg-black/40 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 dark:border-white/5 bg-foreground/2 dark:bg-white/2">
        <div className="flex items-center gap-2">
          {lang && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 dark:text-primary/40 px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10">
              {lang}
            </span>
          )}
          {title && (
            <span className="text-xs text-foreground/40 font-medium">
              {title}
            </span>
          )}
        </div>
        <button
          onClick={onCopy}
          className="p-1.5 rounded-lg hover:bg-foreground/5 dark:hover:bg-white/5 text-foreground/40 hover:text-foreground/80 transition-all active:scale-95"
          title="Copy code"
        >
          {copied ? (
            <Check size={14} className="text-green-500" />
          ) : (
            <Copy size={14} />
          )}
        </button>
      </div>

      {/* Content */}
      <pre
        className={cn(
          "p-4 overflow-x-auto text-sm leading-relaxed scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10",
          className,
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}

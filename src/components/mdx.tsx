import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import defaultMdxComponents from "fumadocs-ui/mdx";

import { Callout } from "@/components/mdx/Callout";
import { Card, Cards } from "@/components/mdx/Cards";
import { Step, Steps } from "@/components/mdx/Steps";
import { Tab, Tabs } from "@/components/mdx/Tabs";
import { Reveal } from "@/components/mdx/Reveal";
import { FeatureGrid, FeatureCard } from "@/components/mdx/FeatureGrid";
import { CodeBlock } from "@/components/mdx/CodeBlock";
import { PullQuote } from "@/components/mdx/PullQuote";

import { cn } from "@heroui/react";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import * as Lucide from "lucide-react";
import Image from "next/image";

// =============================================================================
// TYPOGRAPHY — Kinetic Editorial
// =============================================================================

const H1 = ({
  children,
  id,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    id={id}
    className="scroll-mt-24 font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 mt-2"
    {...props}
  >
    {children}
  </h1>
);

const H2 = ({
  children,
  id,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <Reveal delay={0.1}>
    <h2
      id={id}
      className="scroll-mt-24 font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-16 mb-5"
      {...props}
    >
      {children}
    </h2>
  </Reveal>
);

const H3 = ({
  children,
  id,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <Reveal delay={0.1}>
    <h3
      id={id}
      className="scroll-mt-24 font-display text-xl md:text-2xl font-semibold tracking-tight text-foreground mt-12 mb-4"
      {...props}
    >
      {children}
    </h3>
  </Reveal>
);

const H4 = ({
  children,
  id,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h4
    id={id}
    className="scroll-mt-24 text-lg font-semibold text-foreground mt-8 mb-3"
    {...props}
  >
    {children}
  </h4>
);

const Paragraph = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className="text-foreground/60 dark:text-foreground/50 leading-[1.85] mb-5 not-first:mt-0"
    {...props}
  >
    {children}
  </p>
);

// =============================================================================
// LINKS
// =============================================================================

export const Anchor = ({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isExternal = href?.startsWith("http");
  const isAnchor = href?.startsWith("#");

  if (isAnchor) {
    return (
      <a
        href={href}
        className="text-primary font-medium border-b border-primary/30 hover:border-primary transition duration-300"
        {...props}
      >
        {children}
      </a>
    );
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-primary font-medium border-b border-primary/30 hover:border-primary transition duration-300"
        {...props}
      >
        {children}
        <ExternalLink size={12} className="opacity-50" />
      </a>
    );
  }

  return (
    <Link
      href={href || ""}
      className="text-primary font-medium border-b border-primary/30 hover:border-primary transition duration-300"
      {...props}
    >
      {children}
    </Link>
  );
};

// =============================================================================
// LISTS — scoped to direct children only via ul/ol
// =============================================================================

const UnorderedList = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) => (
  <ul
    className="my-5 list-disc pl-6 space-y-2 text-foreground/60 dark:text-foreground/50 marker:text-primary/40"
    {...props}
  >
    {children}
  </ul>
);

const OrderedList = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLOListElement>) => (
  <ol
    className="my-5 list-decimal pl-6 space-y-2 text-foreground/60 dark:text-foreground/50 marker:text-primary/50 marker:font-bold"
    {...props}
  >
    {children}
  </ol>
);

const ListItem = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) => (
  <li className="leading-[1.85]" {...props}>
    {children}
  </li>
);

// =============================================================================
// BLOCKQUOTE (Simple version, PulQuote is the premium one)
// =============================================================================

const Blockquote = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLQuoteElement>) => (
  <blockquote
    className="my-8 border-l-2 border-primary/40 pl-6 py-1 text-foreground/50 italic [&>p]:mb-0 [&>p]:text-foreground/50"
    {...props}
  >
    {children}
  </blockquote>
);

// =============================================================================
// TABLE
// =============================================================================

const Table = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="my-8 overflow-x-auto rounded-2xl border border-border/40 dark:border-white/6">
    <table className="w-full text-sm" {...props}>
      {children}
    </table>
  </div>
);

const TableHead = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead
    className="border-b border-border/40 dark:border-white/6 bg-foreground/2"
    {...props}
  >
    {children}
  </thead>
);

const TableBody = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className="divide-y divide-border/30 dark:divide-white/4" {...props}>
    {children}
  </tbody>
);

const TableRow = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className="transition-colors hover:bg-foreground/2" {...props}>
    {children}
  </tr>
);

const TableHeader = ({
  children,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-foreground/40"
    {...props}
  >
    {children}
  </th>
);

const TableCell = ({
  children,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className="px-5 py-3.5 text-foreground/60" {...props}>
    {children}
  </td>
);

// =============================================================================
// HORIZONTAL RULE — editorial diamond divider
// =============================================================================

const HorizontalRule = () => (
  <div className="my-14 flex items-center justify-center gap-4">
    <div className="h-px flex-1 bg-linear-to-r from-transparent via-foreground/20 to-transparent" />
    <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
    <div className="h-px flex-1 bg-linear-to-r from-transparent via-foreground/20 to-transparent" />
  </div>
);

// =============================================================================
// INLINE CODE
// =============================================================================

const InlineCode = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => (
  <code
    className={cn(
      "px-1.5 py-0.5 rounded-md text-[0.88em] font-mono bg-foreground/6 dark:bg-white/8 text-foreground/80 border border-foreground/6 dark:border-white/6",
      className,
    )}
    {...props}
  />
);

// =============================================================================
// CUSTOM COMPONENTS
// =============================================================================

const Check = ({
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLSpanElement>, "children">) => (
  <span className={cn("text-green-500", className)} {...props}>
    ✔
  </span>
);

const Cross = ({
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLSpanElement>, "children">) => (
  <span className={cn("text-red-500", className)} {...props}>
    ✘
  </span>
);

// =============================================================================
// EXPORT
// =============================================================================

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...Lucide,

    // Typography
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    p: Paragraph,

    // Links
    a: Anchor,

    // Lists
    ul: UnorderedList,
    ol: OrderedList,
    li: ListItem,

    // Code
    code: InlineCode,
    pre: CodeBlock as any,

    // Blockquote
    blockquote: Blockquote,
    PullQuote,

    // Table
    table: Table,
    thead: TableHead,
    tbody: TableBody,
    tr: TableRow,
    th: TableHeader,
    td: TableCell,

    // Layout
    Reveal,
    FeatureGrid,
    FeatureCard,

    // Other
    hr: HorizontalRule,
    img: ({
      className,
      ...props
    }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <ImageZoom className={cn(className, "rounded-xl")} {...(props as any)} />
    ),

    Image,

    Callout,
    Card,
    Cards,
    Steps,
    Step,
    Check,
    Cross,

    Tabs,
    Tab,

    ...components,
  } as unknown as MDXComponents;
}

export const metadata = {
  title: "Blog | Octominds Studio",
  description: "Read our thoughts on design, tech, and AI.",
};

export default function BlogPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground pt-40 px-6 md:px-12 flex flex-col items-center">
      <h1 className="font-display font-black text-6xl md:text-9xl tracking-tight text-center uppercase text-primary">
        Blog
      </h1>
      <p className="mt-8 text-xl font-sans text-muted-foreground max-w-2xl text-center">
        Insights and discoveries from the Octominds team. Stay tuned.
      </p>
    </main>
  );
}

export const metadata = {
  title: "Projects | Octominds Studio",
  description: "Explore our recent work and case studies.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground pt-40 px-6 md:px-12 flex flex-col items-center">
      <h1 className="font-display font-black text-6xl md:text-9xl tracking-tight text-center uppercase mix-blend-difference">
        Projects
      </h1>
      <p className="mt-8 text-xl font-sans text-muted-foreground max-w-2xl text-center">
        Coming soon. We are compiling our best enterprise case studies.
      </p>
    </main>
  );
}

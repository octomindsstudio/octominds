export const metadata = {
  title: "About Us | Octominds Studio",
  description: "Learn more about the Octominds freelance agency.",
};

export default function AboutPage() {
  return (
    <main className="min-h-dvh bg-bg-1 text-foreground pt-40 px-6 md:px-12 flex flex-col items-center">
      <h1 className="font-display font-black text-6xl md:text-9xl tracking-tight text-center uppercase mix-blend-difference">
        About Us
      </h1>
      <p className="mt-8 text-xl font-sans text-muted-foreground max-w-2xl text-center">
        We are a premier freelance agency forging robust SaaS, Enterprise, and
        Mobile experiences.
      </p>
    </main>
  );
}

export const metadata = {
  title: "Contact | Octominds Studio",
  description: "Get in touch with Octominds Studio.",
};

export default function ContactPage() {
  return (
    <main className="min-h-dvh bg-bg-1 text-foreground pt-40 px-6 md:px-12 flex flex-col items-center">
      <h1 className="font-display font-black text-6xl md:text-9xl tracking-tight text-center uppercase mix-blend-difference">
        Contact
      </h1>
      <p className="mt-8 text-xl font-sans text-muted-foreground max-w-2xl text-center">
        Ready to disrupt? Reach out to us at hello@octomindsstudio.com.
      </p>
    </main>
  );
}

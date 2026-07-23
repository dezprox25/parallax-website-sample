import { Container } from "@/components/ui/Container";

export function Scene1Hero() {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(88,101,242,0.16),_transparent_60%)]" />
      <Container className="relative flex flex-col items-center gap-8 text-center">
        <span className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Parallax
        </span>
        <div className="flex flex-col items-center gap-5">
          <h1
            data-hero-headline
            className="max-w-4xl text-5xl font-semibold leading-tight sm:text-6xl md:text-7xl"
          >
            Design that moves
            <br />
            with you.
          </h1>
          <p
            data-hero-text
            className="max-w-md text-base text-foreground/60 sm:text-lg"
          >
            A scroll-driven story, built for the way people actually
            experience the web.
          </p>
        </div>
      </Container>
      <div
        data-hero-indicator
        className="absolute bottom-10 flex flex-col items-center gap-3 text-foreground/40"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <div className="h-10 w-px bg-foreground/20" />
      </div>
    </section>
  );
}

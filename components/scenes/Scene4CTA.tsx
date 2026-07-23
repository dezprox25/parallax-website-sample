import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Scene4CTA() {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(88,101,242,0.16),_transparent_60%)]" />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-2xl">Ready to build something that moves?</h2>
        <p className="max-w-md text-lg text-foreground/60">
          Start with a single scene. Let the story grow from there.
        </p>
        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
          <Button className="bg-foreground text-background hover:bg-foreground/90 focus-visible:ring-foreground/50">
            Get Started
          </Button>
          <Button
            variant="secondary"
            className="border border-border text-foreground hover:bg-foreground/10 focus-visible:ring-foreground/30"
          >
            Learn More
          </Button>
        </div>
      </Container>
    </section>
  );
}

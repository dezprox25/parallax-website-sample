import { Container } from "@/components/ui/Container";

const features = [
  {
    title: "AI",
    description: "Models that understand context, not just commands.",
    className: "sm:col-span-4 min-h-[220px] sm:min-h-[280px]",
  },
  {
    title: "Analytics",
    description: "Real-time insight into everything that matters.",
    className: "sm:col-span-2 min-h-[220px]",
  },
  {
    title: "Security",
    description: "Encrypted by default, audited by design.",
    className: "sm:col-span-2 min-h-[200px]",
  },
  {
    title: "Cloud",
    description: "Infrastructure that scales without the operations.",
    className: "sm:col-span-2 min-h-[200px]",
  },
  {
    title: "Automation",
    description: "Repetitive work, handled quietly in the background.",
    className: "sm:col-span-2 min-h-[200px] sm:translate-y-6",
  },
];

export function Scene3Features() {
  return (
    <section
      className="relative flex w-full flex-col items-center justify-center bg-background py-24 text-foreground"
      style={{ minHeight: "150vh" }}
    >
      <Container className="flex flex-col items-center gap-16">
        <h2 className="max-w-2xl text-center">Built for what&apos;s next.</h2>
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`flex flex-col justify-between gap-6 rounded-3xl border border-border bg-surface p-8 shadow-2xl ${feature.className}`}
            >
              <h3 className="text-foreground">{feature.title}</h3>
              <p className="max-w-xs text-foreground/60">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

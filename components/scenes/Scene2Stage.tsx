"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export function Scene2Stage() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const dashboardRef = useRef<HTMLDivElement | null>(null);
  const cardARef = useRef<HTMLDivElement | null>(null);
  const cardBRef = useRef<HTMLDivElement | null>(null);
  const cardCRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const headlineARef = useRef<HTMLHeadingElement | null>(null);
  const headlineBRef = useRef<HTMLHeadingElement | null>(null);
  const headlineCRef = useRef<HTMLHeadingElement | null>(null);
  const chartRef = useRef<HTMLDivElement | null>(null);
  const kpiCardRef = useRef<HTMLDivElement | null>(null);
  const sidebarIconsRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  // Deconstruction layers (phase 3) — each is an independent depth plane.
  const topNavRef = useRef<HTMLDivElement | null>(null);
  const chartPanelRef = useRef<HTMLDivElement | null>(null);
  const kpiCard1Ref = useRef<HTMLDivElement | null>(null);
  const kpiCard2Ref = useRef<HTMLDivElement | null>(null);
  const kpiCard3Ref = useRef<HTMLDivElement | null>(null);
  const activityPanelRef = useRef<HTMLDivElement | null>(null);
  const recentActivityRef = useRef<HTMLDivElement | null>(null);
  const kpiCardRefsList = [kpiCard1Ref, kpiCard2Ref, kpiCard3Ref];

  useLayoutEffect(() => {
    // Hero elements live in Scene 1, a sibling component — refs can't
    // cross that boundary, so they're picked up by a stable data-attribute.
    const heroHeadline = document.querySelector<HTMLElement>("[data-hero-headline]");
    const heroText = document.querySelector<HTMLElement>("[data-hero-text]");
    const heroIndicator = document.querySelector<HTMLElement>("[data-hero-indicator]");

    const allRefs = [
      heroHeadline,
      heroText,
      heroIndicator,
      dashboardRef.current,
      cardARef.current,
      cardBRef.current,
      cardCRef.current,
      bgRef.current,
      glowRef.current,
      headlineARef.current,
      headlineBRef.current,
      headlineCRef.current,
      chartRef.current,
      kpiCardRef.current,
      sidebarIconsRef.current,
      progressBarRef.current,
      topNavRef.current,
      chartPanelRef.current,
      kpiCard1Ref.current,
      kpiCard2Ref.current,
      kpiCard3Ref.current,
      activityPanelRef.current,
      recentActivityRef.current,
    ];

    if (prefersReducedMotion()) {
      gsap.set(allRefs, { clearProps: "all" });
      return;
    }

    const mm = gsap.matchMedia();

    mm.add(
      {
        // Both queries are required so one of them always matches — gsap
        // only invokes this callback when at least one condition is true.
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        const isMobile = Boolean(context.conditions?.isMobile);
        // Same story on mobile, shorter travel distances.
        const motionScale = isMobile ? 0.6 : 1;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: pinRef.current,
            scrub: true,
            start: "top top",
            // 425% keeps the original 0->1.3 pacing intact (250% * 1.7) and
            // hands the added 0.4 of timeline duration its own scroll room.
            end: "+=425%",
          },
        });

        // First half (0 -> 0.5): the reveal — hero recedes, dashboard rises
        // into its resting place. Second half (0.5 -> 1): the immersion —
        // camera pushes in and the dashboard comes alive. Third phase
        // (1 -> 1.3): the deconstruction — the dashboard's layers separate
        // into independent depth planes as the camera keeps moving through.
        // Fourth phase (1.3 -> 1.7): the reconstruction — every layer settles
        // back to rest, the camera eases back, and the headline crossfades
        // into the closing line as the pin releases into the next section.
        if (heroHeadline) {
          tl.fromTo(
            heroHeadline,
            { scale: 1, y: 0, opacity: 1 },
            {
              scale: 1 - (1 - 0.55) * motionScale,
              y: -220 * motionScale,
              opacity: 1 - (1 - 0.25) * motionScale,
              ease: "none",
              duration: 0.5,
            },
            0
          );
        }
        if (heroText) {
          tl.fromTo(
            heroText,
            { opacity: 1, y: 0 },
            { opacity: 0, y: -120 * motionScale, ease: "none", duration: 0.5 },
            0
          );
        }
        if (heroIndicator) {
          tl.fromTo(
            heroIndicator,
            { opacity: 1 },
            { opacity: 0, ease: "none", duration: 0.1 },
            0
          );
        }

        tl.fromTo(
          dashboardRef.current,
          { y: 220 * motionScale, scale: 1 - (1 - 0.82) * motionScale, rotateX: 8 * motionScale, transformOrigin: "center center" },
          { y: 0, scale: 1, rotateX: 0, ease: "none", duration: 0.5 },
          0
        );

        tl.fromTo(cardARef.current, { y: 140 * motionScale }, { y: -30 * motionScale, ease: "none", duration: 0.5 }, 0);
        tl.fromTo(cardBRef.current, { y: 80 * motionScale }, { y: -15 * motionScale, ease: "none", duration: 0.5 }, 0);
        tl.fromTo(cardCRef.current, { y: 40 * motionScale }, { y: 0, ease: "none", duration: 0.5 }, 0);

        tl.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.5 }, 0);

        // --- second half: the camera moves closer, the dashboard comes alive ---
        tl.fromTo(
          dashboardRef.current,
          { scale: 1, rotateX: 0, rotateY: 0 },
          {
            scale: 1 + 0.18 * motionScale,
            rotateX: 2 * motionScale,
            rotateY: -4 * motionScale,
            ease: "none",
            duration: 0.5,
          },
          0.5
        );

        tl.fromTo(cardARef.current, { x: 0 }, { x: -30 * motionScale, ease: "none", duration: 0.5 }, 0.5);
        tl.fromTo(cardBRef.current, { x: 0 }, { x: 20 * motionScale, ease: "none", duration: 0.5 }, 0.5);
        tl.fromTo(cardCRef.current, { x: 0 }, { x: -15 * motionScale, ease: "none", duration: 0.5 }, 0.5);

        if (headlineARef.current && headlineBRef.current) {
          tl.fromTo(headlineARef.current, { opacity: 1 }, { opacity: 0, ease: "none", duration: 0.5 }, 0.5);
          tl.fromTo(headlineBRef.current, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.5 }, 0.5);
        }

        if (chartRef.current) {
          tl.fromTo(
            chartRef.current,
            { scaleY: 0.4, transformOrigin: "center bottom" },
            { scaleY: 1, ease: "none", duration: 0.5 },
            0.5
          );
        }
        if (kpiCardRef.current) {
          tl.fromTo(
            kpiCardRef.current,
            { x: 24 * motionScale, opacity: 0 },
            { x: 0, opacity: 1, ease: "none", duration: 0.5 },
            0.5
          );
        }
        if (sidebarIconsRef.current) {
          tl.fromTo(sidebarIconsRef.current, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.5 }, 0.5);
        }
        if (progressBarRef.current) {
          tl.fromTo(
            progressBarRef.current,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, ease: "none", duration: 0.5 },
            0.5
          );
        }
        if (glowRef.current) {
          tl.fromTo(glowRef.current, { opacity: 0.15 }, { opacity: 0.35, ease: "none", duration: 0.5 }, 0.5);
        }

        // --- third phase: controlled deconstruction — layers separate to reveal depth ---
        tl.fromTo(
          dashboardRef.current,
          { scale: 1 + 0.18 * motionScale, rotateX: 2 * motionScale, rotateY: -4 * motionScale },
          {
            scale: 1 + 0.28 * motionScale,
            rotateX: 3 * motionScale,
            rotateY: -6 * motionScale,
            ease: "none",
            duration: 0.3,
          },
          1
        );

        if (topNavRef.current) {
          tl.fromTo(
            topNavRef.current,
            { y: 0 },
            { y: -25 * motionScale, ease: "none", duration: 0.3 },
            1
          );
        }

        if (sidebarIconsRef.current) {
          tl.fromTo(
            sidebarIconsRef.current,
            { x: 0, z: 0 },
            { x: -40 * motionScale, z: 20 * motionScale, ease: "none", duration: 0.3 },
            1
          );
        }

        if (chartPanelRef.current) {
          tl.fromTo(
            chartPanelRef.current,
            { scale: 1, z: 0, transformOrigin: "center center" },
            { scale: 1 + 0.06 * motionScale, z: 30 * motionScale, ease: "none", duration: 0.3 },
            1
          );
        }

        if (kpiCard1Ref.current) {
          tl.fromTo(
            kpiCard1Ref.current,
            { y: 0, x: 0 },
            { y: -15 * motionScale, x: -4 * motionScale, ease: "none", duration: 0.3 },
            1
          );
        }
        if (kpiCard2Ref.current) {
          tl.fromTo(
            kpiCard2Ref.current,
            { y: 0, x: 0 },
            { y: -30 * motionScale, x: 4 * motionScale, ease: "none", duration: 0.3 },
            1
          );
        }
        if (kpiCard3Ref.current) {
          tl.fromTo(
            kpiCard3Ref.current,
            { y: 0, x: 0 },
            { y: -45 * motionScale, x: -6 * motionScale, ease: "none", duration: 0.3 },
            1
          );
        }

        if (activityPanelRef.current) {
          tl.fromTo(
            activityPanelRef.current,
            { x: 0, y: 0 },
            { x: 25 * motionScale, y: -15 * motionScale, ease: "none", duration: 0.3 },
            1
          );
        }

        if (recentActivityRef.current) {
          tl.fromTo(
            recentActivityRef.current,
            { x: 0, opacity: 1 },
            { x: 40 * motionScale, opacity: 0.85, ease: "none", duration: 0.3 },
            1
          );
        }

        if (glowRef.current) {
          tl.fromTo(glowRef.current, { opacity: 0.35 }, { opacity: 0.42, ease: "none", duration: 0.3 }, 1);
        }

        // --- fourth phase: reconstruction — the layers settle, the camera pulls back ---
        tl.fromTo(
          dashboardRef.current,
          { scale: 1 + 0.28 * motionScale, rotateX: 3 * motionScale, rotateY: -6 * motionScale },
          { scale: 1, rotateX: 0, rotateY: 0, ease: "none", duration: 0.4 },
          1.3
        );

        if (topNavRef.current) {
          tl.fromTo(topNavRef.current, { y: -25 * motionScale }, { y: 0, ease: "none", duration: 0.4 }, 1.3);
        }

        if (sidebarIconsRef.current) {
          tl.fromTo(
            sidebarIconsRef.current,
            { x: -40 * motionScale, z: 20 * motionScale },
            { x: 0, z: 0, ease: "none", duration: 0.4 },
            1.3
          );
        }

        if (chartPanelRef.current) {
          tl.fromTo(
            chartPanelRef.current,
            { scale: 1 + 0.06 * motionScale, z: 30 * motionScale },
            { scale: 1, z: 0, ease: "none", duration: 0.4 },
            1.3
          );
        }

        // KPI cards return staggered by distance, not by a fixed time delay —
        // the farther a card travelled outward, the earlier it starts easing
        // back and the longer it takes, so all three arrive together at 1.7.
        if (kpiCard1Ref.current) {
          tl.fromTo(
            kpiCard1Ref.current,
            { y: -15 * motionScale, x: -4 * motionScale },
            { y: 0, x: 0, ease: "none", duration: 0.3 },
            1.4
          );
        }
        if (kpiCard2Ref.current) {
          tl.fromTo(
            kpiCard2Ref.current,
            { y: -30 * motionScale, x: 4 * motionScale },
            { y: 0, x: 0, ease: "none", duration: 0.35 },
            1.35
          );
        }
        if (kpiCard3Ref.current) {
          tl.fromTo(
            kpiCard3Ref.current,
            { y: -45 * motionScale, x: -6 * motionScale },
            { y: 0, x: 0, ease: "none", duration: 0.4 },
            1.3
          );
        }

        if (activityPanelRef.current) {
          tl.fromTo(
            activityPanelRef.current,
            { x: 25 * motionScale, y: -15 * motionScale },
            { x: 0, y: 0, ease: "none", duration: 0.4 },
            1.3
          );
        }

        if (recentActivityRef.current) {
          tl.fromTo(
            recentActivityRef.current,
            { x: 40 * motionScale, opacity: 0.85 },
            { x: 0, opacity: 1, ease: "none", duration: 0.4 },
            1.3
          );
        }

        if (glowRef.current) {
          tl.fromTo(glowRef.current, { opacity: 0.42 }, { opacity: 0.18, ease: "none", duration: 0.4 }, 1.3);
        }

        if (headlineBRef.current && headlineCRef.current) {
          tl.fromTo(headlineBRef.current, { opacity: 1 }, { opacity: 0, ease: "none", duration: 0.4 }, 1.3);
          tl.fromTo(headlineCRef.current, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.4 }, 1.3);
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-background text-foreground"
      style={{ height: "300vh" }}
    >
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(88,101,242,0.14),_transparent_65%)]"
      />
      <div
        ref={pinRef}
        className="flex h-screen w-full items-center justify-center"
      >
        <Container className="flex flex-col items-center gap-10 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative mx-auto flex min-h-[6rem] w-full max-w-2xl items-center justify-center sm:min-h-[5rem]">
              <h2 ref={headlineARef} className="absolute inset-0 flex items-center justify-center">
                Build Beyond Code
              </h2>
              <h2 ref={headlineBRef} className="absolute inset-0 flex items-center justify-center opacity-0">
                Crafting Digital Experiences
              </h2>
              <h2 ref={headlineCRef} className="absolute inset-0 flex items-center justify-center opacity-0">
                Ready to Build Yours?
              </h2>
            </div>
            <p className="max-w-lg text-lg text-foreground/60">
              A single workspace that adapts to how your team already works.
            </p>
          </div>
          <div
            className="relative mt-8 w-full max-w-4xl"
            style={{ perspective: "1200px" }}
          >
            <div
              ref={glowRef}
              className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(88,101,242,0.45),_transparent_70%)] opacity-[0.15]"
            />
            <div
              ref={cardARef}
              className="absolute -left-6 top-6 hidden w-40 rounded-xl border border-border bg-surface p-3 shadow-xl sm:-left-16 sm:top-10 sm:block"
            >
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="text-[9px] font-medium text-foreground/50">Team activity</span>
              </div>
              <div className="mt-2.5 flex items-center gap-1.5">
                <div className="flex -space-x-1.5">
                  <span className="h-4 w-4 rounded-full border border-surface bg-accent/40" />
                  <span className="h-4 w-4 rounded-full border border-surface bg-foreground/20" />
                  <span className="h-4 w-4 rounded-full border border-surface bg-foreground/20" />
                </div>
                <span className="text-[9px] text-foreground/30">+6 online</span>
              </div>
            </div>
            <div
              ref={cardCRef}
              className="absolute -right-4 top-0 hidden w-28 rounded-xl border border-border bg-surface p-3 shadow-xl sm:-right-10 sm:-top-6 sm:block"
            >
              <div className="text-[8px] uppercase tracking-wide text-foreground/30">Uptime</div>
              <div className="mt-1 text-sm font-semibold text-foreground">99.98%</div>
            </div>
            <div
              ref={cardBRef}
              className="absolute -right-6 bottom-10 hidden w-36 rounded-xl border border-border bg-surface p-3 shadow-xl sm:-right-14 sm:bottom-16 sm:block"
            >
              <div className="text-[8px] uppercase tracking-wide text-foreground/30">MRR</div>
              <div className="mt-1 text-sm font-semibold text-foreground">$48.2k</div>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-foreground/10">
                <div className="h-full w-3/4 rounded-full bg-accent/70" />
              </div>
            </div>

            <div
              ref={dashboardRef}
              className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* top nav */}
              <div ref={topNavRef} className="flex h-11 items-center justify-between gap-4 border-b border-border px-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-foreground/15" />
                    <span className="h-2 w-2 rounded-full bg-foreground/15" />
                    <span className="h-2 w-2 rounded-full bg-foreground/15" />
                  </div>
                  <span className="h-4 w-px bg-border" />
                  <div className="flex items-center gap-1 text-[11px]">
                    <span className="text-foreground/35">Acme</span>
                    <span className="text-foreground/25">/</span>
                    <span className="font-medium text-foreground/80">Overview</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden items-center gap-1.5 rounded-md border border-border bg-foreground/4 px-2 py-1 sm:flex">
                    <svg viewBox="0 0 16 16" className="h-3 w-3 text-foreground/30" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="7" cy="7" r="4.5" />
                      <path d="M10.5 10.5L14 14" strokeLinecap="round" />
                    </svg>
                    <span className="text-[10px] text-foreground/30">Search…</span>
                  </div>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[9px] font-semibold text-white">
                    JD
                  </div>
                </div>
              </div>

              <div className="flex gap-4 p-4">
                {/* sidebar */}
                <div ref={sidebarIconsRef} className="hidden flex-col items-center gap-2 border-r border-border pr-4 opacity-0 sm:flex">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-[10px] font-bold text-white">
                    P
                  </div>
                  <span className="my-1 h-px w-5 bg-border" />
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/15 text-accent">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
                      <rect x="2" y="2" width="5" height="5" rx="1" />
                      <rect x="9" y="2" width="5" height="5" rx="1" />
                      <rect x="2" y="9" width="5" height="5" rx="1" />
                      <rect x="9" y="9" width="5" height="5" rx="1" />
                    </svg>
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-md text-foreground/30">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 12V7M6 12V3M10 12V9M14 12V5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-md text-foreground/30">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="8" cy="5" r="2" />
                      <path d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="mt-auto flex h-7 w-7 items-center justify-center rounded-md text-foreground/25">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="8" cy="8" r="2" />
                      <path d="M8 2v1.5M8 12.5V14M14 8h-1.5M3.5 8H2M12 4l-1 1M5 11l-1 1M12 12l-1-1M5 5L4 4" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4">
                  <div className="grid grid-cols-3 gap-4">
                    {/* chart */}
                    <div ref={chartPanelRef} className="col-span-3 flex flex-col gap-2 rounded-lg border border-border bg-foreground/3 p-3 sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-medium text-foreground/60">Revenue</span>
                        <div className="hidden items-center gap-2.5 sm:flex">
                          <span className="flex items-center gap-1 text-[8px] text-foreground/35">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Revenue
                          </span>
                          <span className="flex items-center gap-1 text-[8px] text-foreground/35">
                            <span className="h-1.5 w-1.5 rounded-full bg-foreground/25" /> Target
                          </span>
                        </div>
                      </div>
                      <div className="flex h-24 items-end gap-2 overflow-hidden border-b border-border/60 pb-0">
                        <div ref={chartRef} className="flex h-full flex-1 items-end gap-2">
                          <div className="h-[35%] w-full rounded-t bg-accent/30" />
                          <div className="h-[55%] w-full rounded-t bg-accent/30" />
                          <div className="h-[45%] w-full rounded-t bg-accent/30" />
                          <div className="h-[70%] w-full rounded-t bg-accent/40" />
                          <div className="h-[60%] w-full rounded-t bg-accent/40" />
                          <div className="h-[85%] w-full rounded-t bg-accent" />
                        </div>
                      </div>
                      <div className="hidden grid-cols-6 gap-2 text-center sm:grid">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                          <span key={d} className="text-[7px] text-foreground/25">{d}</span>
                        ))}
                      </div>
                    </div>

                    {/* KPI cards */}
                    <div ref={kpiCardRef} className="hidden flex-col gap-2 sm:flex">
                      {[
                        { label: "MRR", value: "$48.2k", trend: "+12.4%" },
                        { label: "Active users", value: "2,318", trend: "+3.1%" },
                        { label: "Churn", value: "1.2%", trend: "-0.3%" },
                      ].map((kpi, i) => (
                        <div
                          key={kpi.label}
                          ref={kpiCardRefsList[i]}
                          className="flex flex-1 flex-col justify-center gap-1 rounded-lg border border-border bg-foreground/3 px-2.5 py-1.5"
                        >
                          <span className="text-[8px] uppercase tracking-wide text-foreground/35">{kpi.label}</span>
                          <div className="flex items-baseline justify-between">
                            <span className="text-sm font-semibold text-foreground">{kpi.value}</span>
                            <span className="rounded-full bg-accent/15 px-1 py-0.5 text-[7px] font-medium text-accent">
                              {kpi.trend}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="hidden flex-1 grid-cols-3 gap-4 sm:grid">
                    {/* activity panel */}
                    <div ref={activityPanelRef} className="col-span-3 flex flex-col justify-center gap-2 rounded-lg border border-border bg-foreground/3 p-3 md:col-span-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-medium text-foreground/60">Weekly progress</span>
                        <span className="text-[10px] text-foreground/35">68%</span>
                      </div>
                      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                        <div ref={progressBarRef} className="absolute inset-y-0 left-0 w-[68%] rounded-full bg-accent" />
                      </div>
                      <div className="flex items-center gap-1.5 text-[8px] text-foreground/30">
                        <span>24 tasks completed</span>
                        <span className="h-0.5 w-0.5 rounded-full bg-foreground/20" />
                        <span>8 remaining</span>
                      </div>
                    </div>

                    {/* recent events */}
                    <div ref={recentActivityRef} className="hidden flex-col gap-2 rounded-lg border border-border bg-foreground/3 p-3 md:flex">
                      <span className="text-[8px] uppercase tracking-wide text-foreground/30">Recent activity</span>
                      {[
                        { i: "AK", t: "Ana merged PR #482", ts: "2m ago" },
                        { i: "MJ", t: "Milo deployed to prod", ts: "14m ago" },
                        { i: "TS", t: "Tara closed 3 issues", ts: "1h ago" },
                      ].map((ev) => (
                        <div key={ev.t} className="flex items-center gap-2">
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[7px] font-medium text-accent">
                            {ev.i}
                          </span>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <span className="truncate text-[8px] text-foreground/60">{ev.t}</span>
                            <span className="text-[7px] text-foreground/25">{ev.ts}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

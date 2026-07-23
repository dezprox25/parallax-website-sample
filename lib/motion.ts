/**
 * Shared entrance-animation tuning so every section moves in sync.
 * Values mirror the originals set across Hero/About/Features/CTA in
 * earlier phases — centralized here instead of repeated per file.
 */
export const DURATION = 0.7;
export const STAGGER = 0.15;
export const DISTANCE = 30;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

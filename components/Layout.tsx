"use client";

import { type ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <main className="relative">{children}</main>
    </SmoothScrollProvider>
  );
}

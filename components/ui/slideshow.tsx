"use client";

import { Children, useEffect, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Cross-fades between its children every `interval` ms. Slides are rendered on the
 * server and passed in, so images still go through next/image. Respects reduced motion.
 */
export function Slideshow({ interval = 3000, children }: { interval?: number; children: React.ReactNode }) {
  const slides = Children.toArray(children);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(id);
  }, [slides.length, interval]);

  return (
    <div className="absolute inset-0" aria-hidden>
      {slides.map((slide, i) => (
        <div
          key={i}
          className={cn("absolute inset-0 transition-opacity duration-1000 ease-in-out", i === active ? "opacity-100" : "opacity-0")}
        >
          {slide}
        </div>
      ))}
    </div>
  );
}

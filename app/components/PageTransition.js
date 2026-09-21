"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const CUBIC_EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

export default function PageTransition({ children }) {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const content = containerRef.current;
    const overlay = overlayRef.current;
    if (!content) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(content, { opacity: 1, y: 0 });
      if (overlay) gsap.set(overlay, { display: "none" });
      return;
    }

    const tl = gsap.timeline();

    // 1. Transparent 40% opacity overlay fading to 0 over 1000ms with cubic-bezier(0.65, 0, 0.35, 1)
    if (overlay) {
      gsap.set(overlay, { opacity: 0.4, display: "block" });
      tl.to(
        overlay,
        {
          opacity: 0,
          duration: 1.0,
          ease: CUBIC_EASE,
          onComplete: () => {
            gsap.set(overlay, { display: "none" });
          },
        },
        0
      );
    }

    // 2. Synchronized subtle vertical reveal movement (35px -> 0px) and fade-in over 1000ms
    gsap.set(content, { opacity: 0, y: 35 });
    tl.to(
      content,
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: CUBIC_EASE,
        clearProps: "transform,opacity",
      },
      0
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative w-full flex-1">
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 pointer-events-none bg-surface border-b border-brand-crimson-500/20 shadow-lg"
        style={{ opacity: 0.4 }}
        aria-hidden="true"
      />
      <div ref={containerRef} className="w-full flex-1">
        {children}
      </div>
    </div>
  );
}

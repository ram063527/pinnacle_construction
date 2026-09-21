"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Custom premium ease curve matching luxury architectural sites
const LUXURY_EASE = "power3.out";

export default function HomePageAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const heroEl = document.querySelector("[data-hero]");
    if (!heroEl) return;

    const heroImage = heroEl.querySelector("[data-hero-image]");
    const heroOverlay = heroEl.querySelector("[data-hero-overlay]");
    const heroTitle = heroEl.querySelector("[data-hero-title]");
    const heroDesc = heroEl.querySelector("[data-hero-description]");
    const heroButtons = heroEl.querySelectorAll("[data-hero-button]");
    const heroStripItems = heroEl.querySelectorAll("[data-hero-strip-item]");

    const ctx = gsap.context(() => {
      // 1. Initial Hero Entrance Timeline - Slow Cinematic Reveal
      const tl = gsap.timeline({ defaults: { ease: LUXURY_EASE } });

      if (heroImage) {
        gsap.set(heroImage, { scale: 1.15, transformOrigin: "center center" });
        tl.to(
          heroImage,
          {
            scale: 1.0,
            duration: 2.0,
            ease: "power2.out",
          },
          0
        );
      }

      if (heroOverlay) {
        gsap.set(heroOverlay, { opacity: 0 });
        tl.to(
          heroOverlay,
          {
            opacity: 1,
            duration: 1.4,
            ease: "power2.out",
          },
          0
        );
      }

      if (heroTitle) {
        gsap.set(heroTitle, { opacity: 0, y: 35 });
        tl.to(
          heroTitle,
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
          },
          0.2
        );
      }

      if (heroDesc) {
        gsap.set(heroDesc, { opacity: 0, y: 25 });
        tl.to(
          heroDesc,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
          0.4
        );
      }

      if (heroButtons && heroButtons.length > 0) {
        gsap.set(heroButtons, { opacity: 0, y: 20 });
        tl.to(
          heroButtons,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            clearProps: "transform",
          },
          0.6
        );
      }

      if (heroStripItems && heroStripItems.length > 0) {
        gsap.set(heroStripItems, { opacity: 0, y: 20 });
        tl.to(
          heroStripItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.09,
            clearProps: "transform",
          },
          0.8
        );
      }

      // 2. Slow, Subtle Hero Scroll Parallax
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (!isMobile) {
        if (heroImage) {
          gsap.to(heroImage, {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: heroEl,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        const heroContent = heroEl.querySelector("[data-hero-content]");
        if (heroContent) {
          gsap.to(heroContent, {
            yPercent: -5,
            opacity: 0.8,
            ease: "none",
            scrollTrigger: {
              trigger: heroEl,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      }
    }, heroEl);

    return () => ctx.revert();
  }, []);

  return null;
}

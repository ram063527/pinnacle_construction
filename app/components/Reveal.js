"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Reveal({ children, className = "", delay = 0, direction = "up" }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(node, { opacity: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    let initialProps = { opacity: 0 };
    if (direction === "up") initialProps.y = 30;
    else if (direction === "left") initialProps.x = -35;
    else if (direction === "right") initialProps.x = 35;
    else if (direction === "scale") initialProps.scale = 0.95;

    gsap.set(node, initialProps);

    const delaySec = delay ? delay / 1000 : 0;

    const trigger = ScrollTrigger.create({
      trigger: node,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(node, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.9,
          delay: delaySec,
          ease: "power3.out",
          clearProps: "transform",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [delay, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

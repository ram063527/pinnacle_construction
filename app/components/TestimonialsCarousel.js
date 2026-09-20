"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./icons";

const AUTOPLAY_MS = 6000;

export default function TestimonialsCarousel({ testimonials }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const count = testimonials.length;

  const goTo = useCallback(
    (next) => {
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || count <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, count]);

  function handleKeyDown(event) {
    if (event.key === "ArrowRight") next();
    if (event.key === "ArrowLeft") prev();
  }

  function handleTouchStart(event) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (delta > 40) prev();
    if (delta < -40) next();
    touchStartX.current = null;
  }

  return (
    <div
      className="relative mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-surface-raised">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="w-full shrink-0 px-8 py-12 text-center sm:px-14"
              aria-hidden={i !== index}
            >
              <Icon name="quote" className="mx-auto h-8 w-8 text-brand-crimson-400" />
              <blockquote className="mt-4 text-lg leading-relaxed text-ink sm:text-xl">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5">
                <span className="font-heading text-sm font-semibold text-brand-blue-600">
                  {testimonial.author}
                </span>
                {testimonial.unit && (
                  <span className="block text-xs text-ink-muted">Unit {testimonial.unit}</span>
                )}
              </figcaption>
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 hidden h-10 w-10 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-ink shadow-sm transition-all hover:-translate-x-5 hover:shadow-md sm:flex"
          >
            <Icon name="chevronLeft" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 translate-x-4 items-center justify-center rounded-full border border-border bg-surface text-ink shadow-sm transition-all hover:translate-x-5 hover:shadow-md sm:flex"
          >
            <Icon name="chevronRight" className="h-5 w-5" />
          </button>

          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-brand-blue-500" : "w-2 bg-border hover:bg-brand-blue-400"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

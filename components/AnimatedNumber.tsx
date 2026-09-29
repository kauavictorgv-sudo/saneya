"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedNumberProps = {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
};

const numberFormatter = new Intl.NumberFormat("pt-BR");

export default function AnimatedNumber({
  value,
  duration = 1600,
  prefix = "",
  suffix = "",
}: AnimatedNumberProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);
  const [displayedValue, setDisplayedValue] = useState(0);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const showFinalValue = () => {
      hasAnimatedRef.current = true;
      setDisplayedValue(value);
    };

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      showFinalValue();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);

        if (!isVisible || hasAnimatedRef.current) {
          return;
        }

        hasAnimatedRef.current = true;
        observer.disconnect();

        const startedAt = performance.now();
        const safeDuration = Math.max(duration, 1);

        const updateNumber = (currentTime: number) => {
          const progress = Math.min(1, (currentTime - startedAt) / safeDuration);
          const easedProgress = 1 - (1 - progress) ** 3;

          setDisplayedValue(Math.round(value * easedProgress));

          if (progress < 1) {
            animationFrameRef.current = requestAnimationFrame(updateNumber);
          }
        };

        animationFrameRef.current = requestAnimationFrame(updateNumber);
      },
      { threshold: 0.3 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [duration, value]);

  const formattedFinalValue = `${prefix}${numberFormatter.format(value)}${suffix}`;

  return (
    <span
      ref={elementRef}
      aria-label={formattedFinalValue}
      className="inline-block tabular-nums"
    >
      {prefix}
      {numberFormatter.format(displayedValue)}
      {suffix}
    </span>
  );
}

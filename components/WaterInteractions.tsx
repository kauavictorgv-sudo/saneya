"use client";

import { useEffect } from "react";

const interactiveSelector = "a[href], button:not(:disabled), summary";

export default function WaterInteractions() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cleanupTimers = new Map<HTMLElement, number>();

    function activateRipple(element: HTMLElement, x: number, y: number) {
      if (reducedMotion.matches || element.getAttribute("aria-disabled") === "true") {
        return;
      }

      const previousTimer = cleanupTimers.get(element);
      if (previousTimer) {
        window.clearTimeout(previousTimer);
      }

      element.style.setProperty("--water-ripple-x", `${x}px`);
      element.style.setProperty("--water-ripple-y", `${y}px`);
      element.classList.remove("water-ripple-active");
      void element.offsetWidth;
      element.classList.add("water-ripple-active");

      const timer = window.setTimeout(() => {
        element.classList.remove("water-ripple-active");
        cleanupTimers.delete(element);
      }, 680);

      cleanupTimers.set(element, timer);
    }

    function findInteractiveTarget(target: EventTarget | null) {
      return target instanceof Element
        ? target.closest<HTMLElement>(interactiveSelector)
        : null;
    }

    function handlePointerDown(event: PointerEvent) {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      const element = findInteractiveTarget(event.target);
      if (!element) {
        return;
      }

      const bounds = element.getBoundingClientRect();
      activateRipple(element, event.clientX - bounds.left, event.clientY - bounds.top);
    }

    function handleKeyDown(event: KeyboardEvent) {
      const element = findInteractiveTarget(event.target);
      const activatesWithSpace =
        event.key === " " && element?.matches("button, summary");

      if (!element || event.repeat || (event.key !== "Enter" && !activatesWithSpace)) {
        return;
      }

      const bounds = element.getBoundingClientRect();
      activateRipple(element, bounds.width / 2, bounds.height / 2);
    }

    document.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);

      cleanupTimers.forEach((timer, element) => {
        window.clearTimeout(timer);
        element.classList.remove("water-ripple-active");
      });
    };
  }, []);

  return null;
}

import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

/**
 * useScrollToTop — Instantly scrolls to top on every route change.
 *
 * Uses useLayoutEffect so the scroll completes BEFORE the browser paints,
 * preventing the user from ever seeing stale scroll position. This also
 * preserves reveal-on-scroll animations because the viewport starts at
 * the top before any intersection observers fire.
 *
 * Respects prefers-reduced-motion by using instant scroll behavior
 * unconditionally (no smooth scrolling that would interfere with
 * page entrance animations).
 */
export default function useScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
}

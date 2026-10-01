import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initReveal, initCounts } from '../lib/reveal.js';

/**
 * Page-level entrance effects (split headings, reveals, bars, count-ups).
 * Call once per page component, AFTER the page's JSX is in the DOM.
 * Re-runs when the route changes; cleans up observers on unmount.
 */
export function usePageFx() {
  const { pathname } = useLocation();
  useEffect(() => {
    const offReveal = initReveal();
    const offCounts = initCounts();
    return () => { offReveal(); offCounts(); };
  }, [pathname]);
}

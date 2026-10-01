import { useEffect, useRef } from 'react';

/**
 * Run an imperative effect that returns a cleanup, with refs resolved.
 * Usage: const ref = useRef(); useFx(() => initThing(ref.current), []);
 */
export function useFx(setup, deps = []) {
  useEffect(() => {
    const cleanup = setup();
    return typeof cleanup === 'function' ? cleanup : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Roving-tabindex tab list keyboard handler (ArrowLeft/ArrowRight). */
export function useTabKeys(count, active, setActive) {
  const refs = useRef([]);
  const onKeyDown = (i) => (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + count) % count;
    setActive(n);
    refs.current[n]?.focus();
  };
  const tabProps = (i) => ({
    role: 'tab',
    'aria-selected': active === i,
    tabIndex: active === i ? 0 : -1,
    ref: (el) => { refs.current[i] = el; },
    onClick: () => setActive(i),
    onKeyDown: onKeyDown(i),
  });
  return tabProps;
}

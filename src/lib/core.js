/* Shared utilities for the interaction engine.
   Ported from the original main.js — same math, same visuals. */

export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

export const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const smooth = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

export const NS = 'http://www.w3.org/2000/svg';
export const C = {
  ink: '#283038', blue: '#0080F8', blueDeep: '#0060F0', slate: '#66717C',
  line: '#E5E9EE', slateLight: '#C3CBD3', blueSoft: '#E8F2FE', white: '#FFFFFF', barFill: '#D5DBE2',
};

export function svg(tag, attrs = {}, parent) {
  const el = document.createElementNS(NS, tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(el);
  return el;
}

export function debounce(fn, ms = 150) {
  let t;
  const d = (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
  d.cancel = () => clearTimeout(t);
  return d;
}

/* Deterministic PRNG so demo data looks identical on every load */
export function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function onVisible(el, cb, { margin = '0px 0px -10% 0px', once = true } = {}) {
  if (!('IntersectionObserver' in window)) { cb(); return null; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { cb(e); if (once) io.unobserve(e.target); } });
  }, { rootMargin: margin });
  io.observe(el);
  return io;
}

export const belowFold = (el) => el.getBoundingClientRect().top > window.innerHeight * 0.92;
export const canAnimate = !reduceMotion && typeof window !== 'undefined' && 'IntersectionObserver' in window;
export const money = (n, d = 0) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

/* Monotone cubic path (no overshoot on data lines) */
export function monotonePath(pts) {
  const n = pts.length; if (n < 2) return '';
  const dx = [], m = [], t = [];
  for (let i = 0; i < n - 1; i++) { dx[i] = pts[i + 1][0] - pts[i][0]; m[i] = (pts[i + 1][1] - pts[i][1]) / dx[i]; }
  t[0] = m[0]; t[n - 1] = m[n - 2];
  for (let i = 1; i < n - 1; i++) t[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2;
  for (let i = 0; i < n - 1; i++) {
    if (m[i] === 0) { t[i] = 0; t[i + 1] = 0; continue; }
    const a = t[i] / m[i], b = t[i + 1] / m[i], h = a * a + b * b;
    if (h > 9) { const s = 3 / Math.sqrt(h); t[i] = s * a * m[i]; t[i + 1] = s * b * m[i]; }
  }
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n - 1; i++) {
    const c1x = pts[i][0] + dx[i] / 3, c1y = pts[i][1] + t[i] * dx[i] / 3;
    const c2x = pts[i + 1][0] - dx[i] / 3, c2y = pts[i + 1][1] - t[i + 1] * dx[i] / 3;
    d += `C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${pts[i + 1][0].toFixed(1)},${pts[i + 1][1].toFixed(1)}`;
  }
  return d;
}

export function addGradient(root, id, color, top = 0.16) {
  const defs = svg('defs', {}, root);
  const lg = svg('linearGradient', { id, x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
  svg('stop', { offset: 0, 'stop-color': color, 'stop-opacity': top }, lg);
  svg('stop', { offset: 1, 'stop-color': color, 'stop-opacity': 0 }, lg);
  return `url(#${id})`;
}

/* Range-based text bounds (block elements are wider than their text) */
export function textRight(container, relTo) {
  let right = 0;
  Array.from(container.children).forEach((el) => {
    const r = document.createRange(); r.selectNodeContents(el);
    const rr = r.getBoundingClientRect(); right = Math.max(right, rr.right);
  });
  return right - relTo.left;
}

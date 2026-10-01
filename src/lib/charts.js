/* SVG chart painters + mount helper. Ported 1:1 from main.js with cleanup.
   All figures are the same sample data, clearly labelled on the pages. */
import {
  $, $$, svg, clamp, money, monotonePath, addGradient, debounce,
  onVisible, belowFold, canAnimate, mulberry32, C,
} from './core.js';

/* Draw now, animate the line/area once when scrolled into view. */
export function mountChart(el, draw) {
  if (!el) return { redraw: () => {}, destroy: () => {} };
  let done = !canAnimate || !belowFold(el);
  const run = () => {
    $$('svg', el).forEach((n) => n.remove());
    draw(el);
    if (!done) {
      el.classList.add('is-pre');
      $$('[data-draw]', el).forEach((p) => { const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L; });
      $$('[data-fade]', el).forEach((a) => { a.style.opacity = 0; });
    }
  };
  run();
  let io = null;
  if (!done) {
    io = onVisible(el, () => {
      requestAnimationFrame(() => {
        el.classList.remove('is-pre'); el.classList.add('is-anim');
        $$('[data-draw]', el).forEach((p) => { p.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(.2,.7,.2,1)'; p.getBoundingClientRect(); p.style.strokeDashoffset = 0; });
        $$('[data-fade]', el).forEach((a) => { a.style.transition = 'opacity 1.2s ease .5s'; a.style.opacity = 1; });
        done = true;
      });
    }, { margin: '0px 0px -15% 0px' });
  }
  let lastW = el.clientWidth;
  const onResize = debounce(() => {
    if (el.clientWidth === lastW) return; lastW = el.clientWidth;
    if (!done) return; run();
  }, 150);
  window.addEventListener('resize', onResize);
  return {
    redraw: () => run(),
    destroy: () => { window.removeEventListener('resize', onResize); onResize.cancel?.(); io?.disconnect(); },
  };
}

/* ---------- Data & tracking: spend vs conversions ---------- */
export const SPEND = [3210, 3360, 3510, 3670, 3820, 3970, 4070, 4220, 4370, 4520, 4670, 4810];
export const CONV = [70, 76, 82, 90, 98, 103, 110, 116, 121, 127, 134, 141];

export function drawSpendChart(el) {
  const W = el.clientWidth; if (!W) return;
  const H = Math.round(clamp(W * 0.42, 250, 360));
  const m = { t: 14, r: 40, b: 30, l: 48 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
  const root = svg('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img',
    'aria-label': 'Sample data: weekly ad spend rises from $3,210 to $4,810 over 12 weeks while weekly conversions rise from 70 to 141.' });
  el.insertBefore(root, el.firstChild);
  const fill = addGradient(root, 'gSpend', C.blueDeep, 0.18);
  const n = SPEND.length, band = iw / n;
  const x = (i) => m.l + (i + 0.5) * band;
  const yL = (v) => m.t + ih - (v / 5000) * ih;
  const yR = (v) => m.t + ih - (v / 160) * ih;
  const narrow = W < 520;

  for (let v = 0; v <= 5000; v += 1000) {
    svg('line', { x1: m.l, x2: W - m.r, y1: yL(v), y2: yL(v), stroke: v === 0 ? C.ink : C.line, 'stroke-width': 1 }, root);
    svg('text', { x: m.l - 10, y: yL(v) + 4, 'text-anchor': 'end' }, root).textContent = v === 0 ? '$0' : `$${v / 1000}k`;
  }
  for (let v = 0; v <= 160; v += 40) svg('text', { x: W - m.r + 10, y: yR(v) + 4, class: 't-blue' }, root).textContent = v;

  const bw = Math.min(26, band * 0.5);
  const bars = SPEND.map((v, i) => {
    const r = svg('rect', { x: x(i) - bw / 2, y: yL(v), width: bw, height: yL(0) - yL(v), rx: 1.5, fill: C.barFill, class: 'bar grow' }, root);
    r.style.setProperty('--i', i); return r;
  });
  const pts = CONV.map((v, i) => [x(i), yR(v)]);
  const d = monotonePath(pts);
  svg('path', { d: `${d} L${pts[n - 1][0]},${yR(0)} L${pts[0][0]},${yR(0)} Z`, fill, 'data-fade': '' }, root);
  svg('path', { d, fill: 'none', stroke: C.blueDeep, 'stroke-width': 2.5, 'stroke-linecap': 'round', 'data-draw': '' }, root);
  const dots = pts.map(([px, py], i) => {
    const c = svg('circle', { cx: px, cy: py, r: 3.5, fill: C.white, stroke: C.blueDeep, 'stroke-width': 2, 'data-pop': '' }, root);
    c.style.setProperty('--i', i); return c;
  });
  CONV.forEach((_, i) => {
    if (narrow && i % 2) return;
    svg('text', { x: x(i), y: H - 8, 'text-anchor': 'middle' }, root).textContent = `W${i + 1}`;
  });

  const guide = svg('line', { x1: 0, x2: 0, y1: m.t, y2: m.t + ih, class: 'hover-guide' }, root);
  const hit = svg('rect', { x: m.l, y: m.t, width: iw, height: ih, fill: 'transparent' }, root);
  let tip = $('.tip', el); if (!tip) { tip = document.createElement('div'); tip.className = 'tip'; el.appendChild(tip); }
  const show = (clientX) => {
    const r = root.getBoundingClientRect();
    const i = clamp(Math.floor((clientX - r.left - m.l) / band), 0, n - 1);
    guide.setAttribute('x1', x(i)); guide.setAttribute('x2', x(i)); guide.classList.add('is-on');
    bars.forEach((b, j) => b.classList.toggle('is-hot', j === i));
    dots.forEach((c, j) => c.setAttribute('r', j === i ? 5.5 : 3.5));
    tip.innerHTML = `<b>Week ${i + 1}</b><div><span>Ad spend</span><span>${money(SPEND[i])}</span></div><div><span>Conversions</span><span>${CONV[i]}</span></div><div><span>CPA</span><span>${money(SPEND[i] / CONV[i], 2)}</span></div>`;
    const left = x(i) + 16 + 180 > W ? x(i) - 16 - 180 : x(i) + 16;
    tip.style.left = left + 'px'; tip.style.top = (m.t + 6) + 'px'; tip.classList.add('is-on');
  };
  const hide = () => { guide.classList.remove('is-on'); tip.classList.remove('is-on'); bars.forEach((b) => b.classList.remove('is-hot')); dots.forEach((c) => c.setAttribute('r', 3.5)); };
  hit.addEventListener('pointermove', (e) => show(e.clientX));
  hit.addEventListener('pointerdown', (e) => show(e.clientX));
  hit.addEventListener('pointerleave', hide);
}

/* ---------- Paid media card ---------- */
export const PM = {
  google: { spend: 7420, ctr: '4.8%', cpc: '$1.92', roas: '4.3×', seed: 4, trend: 0.28 },
  meta: { spend: 5730, ctr: '1.6%', cpc: '$0.84', roas: '3.6×', seed: 9, trend: 0.18 },
  tiktok: { spend: 2810, ctr: '1.1%', cpc: '$0.52', roas: '2.9×', seed: 15, trend: 0.42 },
};
function pmSeries(ch) {
  const c = PM[ch], r = mulberry32(c.seed), raw = [];
  for (let i = 0; i < 30; i++) raw.push(0.78 + c.trend * (i / 29) + (r() - 0.5) * 0.22 + (i % 7 === 5 || i % 7 === 6 ? -0.08 : 0));
  const s = raw.reduce((a, b) => a + b, 0);
  return raw.map((v) => (v / s) * c.spend);
}
export function drawPmChart(el, channel) {
  const W = el.clientWidth; if (!W) return;
  const H = el.clientHeight || 170;
  const data = pmSeries(channel);
  const max = Math.ceil(Math.max(...data) / 100) * 100;
  const m = { t: 10, r: 6, b: 22, l: 40 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
  const root = svg('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img', 'aria-label': `Sample daily spend for the last 30 days, peaking near ${money(max)} per day.` });
  el.appendChild(root);
  const fill = addGradient(root, 'gPm', C.blueDeep, 0.2);
  const x = (i) => m.l + (i / 29) * iw, y = (v) => m.t + ih - (v / max) * ih;
  [0, max / 2, max].forEach((v) => {
    svg('line', { x1: m.l, x2: W - m.r, y1: y(v), y2: y(v), stroke: v === 0 ? C.ink : C.line }, root);
    svg('text', { x: m.l - 8, y: y(v) + 4, 'text-anchor': 'end' }, root).textContent = money(v);
  });
  const pts = data.map((v, i) => [x(i), y(v)]), d = monotonePath(pts);
  svg('path', { d: `${d} L${x(29)},${y(0)} L${x(0)},${y(0)} Z`, fill, 'data-fade': '' }, root);
  svg('path', { d, fill: 'none', stroke: C.blueDeep, 'stroke-width': 2, 'data-draw': '' }, root);
  svg('circle', { cx: x(29), cy: y(data[29]), r: 4, fill: C.blueDeep, 'data-pop': '' }, root);
  [[0, 'Day 1'], [14, 'Day 15'], [29, 'Day 30']].forEach(([i, t], k) => {
    svg('text', { x: x(i), y: H - 4, 'text-anchor': k === 0 ? 'start' : k === 2 ? 'end' : 'middle' }, root).textContent = t;
  });
}

/* ---------- Results: weekly conversions trend ---------- */
export const TREND = [80, 83, 82, 86, 91, 95, 99, 101, 104, 106, 109, 111, 111];
const NOTES = [[2, 1], [5, 2], [8, 3]];
export function drawTrend(el) {
  const W = el.clientWidth; if (!W) return;
  const H = Math.round(clamp(W * 0.4, 240, 330));
  const m = { t: 30, r: 34, b: 28, l: 36 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
  const root = svg('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img', 'aria-label': 'Sample data: weekly conversions rise from about 83 per week in the first four weeks to 109 per week in the last four, a 32% increase.' });
  el.appendChild(root);
  const fill = addGradient(root, 'gTrend', C.blueDeep, 0.14);
  const n = TREND.length, x = (i) => m.l + (i / (n - 1)) * iw, y = (v) => m.t + ih - ((v - 60) / 60) * ih;
  [60, 80, 100, 120].forEach((v) => {
    svg('line', { x1: m.l, x2: W - m.r, y1: y(v), y2: y(v), stroke: v === 60 ? C.ink : C.line }, root);
    svg('text', { x: m.l - 8, y: y(v) + 4, 'text-anchor': 'end' }, root).textContent = v;
  });
  const base = 82.75;
  svg('line', { x1: m.l, x2: W - m.r, y1: y(base), y2: y(base), stroke: C.slate, 'stroke-dasharray': '5 5', 'stroke-width': 1.5 }, root);
  NOTES.forEach(([i, k]) => {
    svg('line', { x1: x(i), x2: x(i), y1: m.t - 8, y2: m.t + ih, stroke: C.blueDeep, 'stroke-opacity': 0.35, 'stroke-dasharray': '2 4' }, root);
    svg('circle', { cx: x(i), cy: m.t - 16, r: 9, fill: C.white, stroke: C.blueDeep, 'stroke-width': 1.5 }, root);
    svg('text', { x: x(i), y: m.t - 12, 'text-anchor': 'middle', class: 't-blue' }, root).textContent = k;
  });
  const pts = TREND.map((v, i) => [x(i), y(v)]), d = monotonePath(pts);
  svg('path', { d: `${d} L${x(n - 1)},${y(60)} L${x(0)},${y(60)} Z`, fill, 'data-fade': '' }, root);
  svg('path', { d, fill: 'none', stroke: C.blueDeep, 'stroke-width': 2.5, 'stroke-linecap': 'round', 'data-draw': '' }, root);
  pts.forEach(([px, py], i) => {
    const last = i === n - 1;
    const c = svg('circle', { cx: px, cy: py, r: last ? 5 : 3, fill: last ? C.blueDeep : C.white, stroke: C.blueDeep, 'stroke-width': last ? 0 : 1.5, 'data-pop': '' }, root);
    c.style.setProperty('--i', i);
  });
  const endLabel = svg('text', { x: x(n - 1), y: y(TREND[n - 1]) - 14, 'text-anchor': 'end', class: 't-blue', 'data-pop': '' }, root);
  endLabel.style.setProperty('--i', n); endLabel.textContent = '111 / wk';
  const narrow = W < 520;
  TREND.forEach((_, i) => { if (narrow && i % 2) return; svg('text', { x: x(i), y: H - 6, 'text-anchor': 'middle' }, root).textContent = `W${i + 1}`; });
}

/* ---------- Creative: testing rounds ---------- */
export const ROUNDS = [62, 55, 51, 46, 44, 41];
const WINNERS = ['Baseline', 'Problem-first hook', 'Shorter form', 'Creator cut', 'Offer framing', 'LP variant B'];
export function drawRounds(el) {
  const W = el.clientWidth; if (!W) return;
  const narrow = W < 600;
  const H = narrow ? 240 : 280;
  const m = { t: 30, r: 24, b: narrow ? 28 : 46, l: 40 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
  const root = svg('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img', 'aria-label': 'Sample data: cost per acquisition falls across six testing rounds, from $62 to $41.' });
  el.appendChild(root);
  const fill = addGradient(root, 'gRounds', C.blueDeep, 0.12);
  const n = ROUNDS.length, x = (i) => m.l + (i / (n - 1)) * iw, y = (v) => m.t + ih - ((v - 30) / 40) * ih;
  [30, 40, 50, 60, 70].forEach((v) => {
    svg('line', { x1: m.l, x2: W - m.r, y1: y(v), y2: y(v), stroke: v === 30 ? C.ink : C.line }, root);
    svg('text', { x: m.l - 8, y: y(v) + 4, 'text-anchor': 'end' }, root).textContent = '$' + v;
  });
  let d = `M${x(0)},${y(ROUNDS[0])}`;
  for (let i = 1; i < n; i++) d += ` H${x(i)} V${y(ROUNDS[i])}`;
  svg('path', { d: `${d} V${y(30)} H${x(0)} Z`, fill, 'data-fade': '' }, root);
  svg('path', { d, fill: 'none', stroke: C.blueDeep, 'stroke-width': 2.5, 'stroke-linejoin': 'round', 'data-draw': '' }, root);
  ROUNDS.forEach((v, i) => {
    const c = svg('circle', { cx: x(i), cy: y(v), r: 4.5, fill: i === n - 1 ? C.blueDeep : C.white, stroke: C.blueDeep, 'stroke-width': 2, 'data-pop': '' }, root);
    c.style.setProperty('--i', i);
    const t = svg('text', { x: x(i) + (i === n - 1 ? -10 : 10), y: y(v) + 20, 'text-anchor': i === n - 1 ? 'end' : 'start', 'data-pop': '', style: `fill:${C.ink};font-weight:500` }, root);
    t.style.setProperty('--i', i); t.textContent = '$' + v;
    svg('text', { x: x(i), y: m.t + ih + 18, 'text-anchor': i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle' }, root).textContent = `R${i + 1}`;
    if (!narrow) {
      const w = svg('text', { x: x(i), y: m.t + ih + 34, 'text-anchor': i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle', style: `fill:${i ? C.blueDeep : C.slate}` }, root);
      w.textContent = WINNERS[i];
    }
  });
}

/* ---------- Sparklines ---------- */
export function initSparks(root = document) {
  const draws = [];
  $$('[data-spark]', root).forEach((s) => {
    const vals = s.dataset.spark.split(',').map(Number);
    const draw = () => {
      s.innerHTML = '';
      const W = s.clientWidth || 120, H = s.clientHeight || 44;
      s.setAttribute('viewBox', `0 0 ${W} ${H}`);
      const min = Math.min(...vals), max = Math.max(...vals), pad = 5;
      const x = (i) => (i / (vals.length - 1)) * (W - 8), y = (v) => pad + (1 - (v - min) / (max - min)) * (H - pad * 2);
      const pts = vals.map((v, i) => [x(i), y(v)]), d = monotonePath(pts);
      svg('path', { d: `${d} L${x(vals.length - 1)},${H} L0,${H} Z`, class: 'spark__area' }, s);
      svg('path', { d }, s);
      svg('circle', { cx: pts[pts.length - 1][0], cy: pts[pts.length - 1][1], r: 3.5 }, s);
    };
    draw(); draws.push(draw);
  });
  const onResize = debounce(() => draws.forEach((d) => d()), 150);
  window.addEventListener('resize', onResize);
  return () => { window.removeEventListener('resize', onResize); onResize.cancel?.(); };
}

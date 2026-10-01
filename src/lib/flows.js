/* Ecosystem connector lines, strategy flow line, and scroll-progress lines.
   Each init returns a cleanup for React effects. */
import { $$, svg, debounce, clamp, canAnimate, onVisible } from './core.js';

/* ---------- Ecosystem connectors + hover chains ---------- */
export function initEcosystem(flow, s) {
  if (!flow || !s) return () => {};
  const cols = $$('.eco-col', flow).map((c) => $$('.eco-node', c));
  let links = [];
  const draw = () => {
    if (!flow.isConnected) return;
    s.innerHTML = ''; links = [];
    const fr = flow.getBoundingClientRect();
    s.setAttribute('viewBox', `0 0 ${fr.width} ${fr.height}`);
    for (let k = 0; k < cols.length - 1; k++) {
      cols[k].forEach((a, i) => {
        cols[k + 1].forEach((b, j) => {
          const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
          const x1 = ra.right - fr.left, y1 = ra.top + ra.height / 2 - fr.top;
          const x2 = rb.left - fr.left, y2 = rb.top + rb.height / 2 - fr.top;
          const mx = (x1 + x2) / 2;
          const p = svg('path', { d: `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`, class: 'eco-link' }, s);
          if ((i * 3 + j + k) % 4 === 0) p.classList.add('is-flow');
          links.push({ p, a, b });
        });
      });
    }
  };
  draw();
  const onResize = debounce(draw, 120);
  window.addEventListener('resize', onResize);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);

  const nodes = cols.flat();
  const enter = (n) => () => {
    s.classList.add('is-dim');
    let frontier = [n];
    for (let step = 0; step < 4; step++) { const next = []; links.forEach((l) => { if (frontier.includes(l.a)) { l.p.classList.add('is-hot'); next.push(l.b); } }); frontier = [...new Set(next)]; }
    frontier = [n];
    for (let step = 0; step < 4; step++) { const next = []; links.forEach((l) => { if (frontier.includes(l.b)) { l.p.classList.add('is-hot'); next.push(l.a); } }); frontier = [...new Set(next)]; }
  };
  const leave = () => { s.classList.remove('is-dim'); links.forEach((l) => l.p.classList.remove('is-hot')); };
  const handlers = nodes.map((n) => {
    const on = enter(n);
    n.addEventListener('mouseenter', on);
    n.addEventListener('mouseleave', leave);
    return { n, on };
  });

  return () => {
    window.removeEventListener('resize', onResize); onResize.cancel?.();
    handlers.forEach(({ n, on }) => { n.removeEventListener('mouseenter', on); n.removeEventListener('mouseleave', leave); });
  };
}

/* ---------- Strategy card: the 4-step flow line ---------- */
export function initFlow4(wrap, s) {
  if (!wrap || !s) return () => {};
  const draw = () => {
    if (!wrap.isConnected) return;
    s.innerHTML = '';
    if (getComputedStyle(s).display === 'none') return;
    const wr = s.getBoundingClientRect();
    const nodes = $$('.flow4__node', wrap).map((n) => { const r = n.getBoundingClientRect(); return [r.left + r.width / 2 - wr.left, r.top + r.height / 2 - wr.top]; });
    if (nodes.length < 2) return;
    s.setAttribute('viewBox', `0 0 ${wr.width} ${wr.height}`);
    let d = `M${nodes[0][0]},${nodes[0][1]}`;
    for (let i = 1; i < nodes.length; i++) {
      const [x0, y0] = nodes[i - 1], [x1, y1] = nodes[i], mx = (x0 + x1) / 2, off = i % 2 ? -14 : 14;
      d += ` C${mx},${y0 + off} ${mx},${y1 - off} ${x1},${y1}`;
    }
    svg('path', { d, class: 'flow4__path flow4__path--base' }, s);
    svg('path', { d, class: 'flow4__path' }, s);
  };
  draw();
  const onResize = debounce(draw, 150);
  window.addEventListener('resize', onResize);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
  return () => { window.removeEventListener('resize', onResize); onResize.cancel?.(); };
}

/* ---------- Process list: progress line follows scroll ---------- */
export function initSteps(list) {
  if (!list) return () => {};
  const steps = $$('.step', list);
  let ticking = false;
  const update = () => {
    ticking = false;
    if (!list.isConnected) return;
    const r = list.getBoundingClientRect(), vh = window.innerHeight;
    const p = clamp((vh * 0.62 - r.top - 50) / (r.height - 100), 0, 1);
    list.style.setProperty('--p', p.toFixed(4));
    const lineY = r.top + 50 + p * (r.height - 100);
    steps.forEach((s, i) => { const sr = s.getBoundingClientRect(); s.classList.toggle('is-active', i === 0 || sr.top + 40 <= lineY + 1); });
  };
  update();
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  const onResize = debounce(update, 100);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize); onResize.cancel?.();
  };
}

/* ---------- Case timeline: fill once visible ---------- */
export function initTimeline(tl) {
  if (!tl) return () => {};
  if (!canAnimate) { tl.style.setProperty('--p', 1); return () => {}; }
  const io = onVisible(tl, () => tl.style.setProperty('--p', 1), { margin: '0px 0px -20% 0px' });
  return () => { io?.disconnect(); tl.style.setProperty('--p', 1); };
}

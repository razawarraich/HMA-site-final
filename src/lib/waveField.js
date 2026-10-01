/* Flowing-data canvas renderer shared by the hero, the funnel and the CTA.
   Ported 1:1 from the original main.js, plus destroy() so React effects can
   clean up listeners, observers and the animation loop on unmount. */
import { clamp, lerp, smooth, debounce, mulberry32, reduceMotion, C, textRight, $$ } from './core.js';

export class WaveField {
  constructor(canvas, geometryFn, opts = {}) {
    this.c = canvas; this.ctx = canvas.getContext('2d');
    this.geometryFn = geometryFn; this.opts = opts;
    this.t = 0; this.last = 0; this.running = false; this.visible = true; this.dead = false;
    this.frame = this.frame.bind(this);

    this._onResize = debounce(() => this.resize(), 120);
    window.addEventListener('resize', this._onResize);

    if ('IntersectionObserver' in window) {
      this._io = new IntersectionObserver((es) => {
        this.visible = es[0].isIntersecting;
        this.visible ? this.start() : this.stop();
      });
      this._io.observe(canvas);
    }
    this._onVis = () => { if (document.hidden) this.stop(); else if (this.visible) this.start(); };
    document.addEventListener('visibilitychange', this._onVis);

    this.resize();
    if (reduceMotion) this.draw(); else this.start();
  }
  resize() {
    if (this.dead) return;
    const r = this.c.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.W = r.width; this.H = r.height;
    this.c.width = Math.round(r.width * dpr); this.c.height = Math.round(r.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.g = this.geometryFn(this.W, this.H);
    const rnd = mulberry32(this.opts.seed || 11);
    this.rnd = rnd;
    const N = this.g.lines;
    this.lines = Array.from({ length: N }, (_, i) => ({
      v: i / (N - 1) - 0.5, k: 0.7 + rnd() * 1.5, k2: 1.4 + rnd() * 2.2, ph: rnd() * Math.PI * 2, sp: 0.25 + rnd() * 0.55,
    }));
    this.packets = Array.from({ length: this.g.packets }, () => this.spawn(true));
    const horiz = this.g.orient === 'h';
    const grad = horiz ? this.ctx.createLinearGradient(0, 0, this.W, 0) : this.ctx.createLinearGradient(0, 0, 0, this.H);
    this.g.stops.forEach(([p, c]) => grad.addColorStop(p, c));
    this.grad = grad;
    if (this.opts.onLayout) this.opts.onLayout(this);
    if (!this.running) this.draw();
  }
  spawn(initial) {
    const r = this.rnd;
    const li = Math.floor(r() * this.lines.length);
    return {
      li, u: initial ? r() : -r() * 0.1,
      speed: (70 + r() * 90) / this.g.L,
      exit: this.g.exitFn ? this.g.exitFn(r) : 2,
      side: r() < 0.5 ? -1 : 1,
    };
  }
  cross(l, u, t) {
    const g = this.g, x = u * g.L;
    return g.center(u, t) + l.v * g.spread(u) +
      g.amp(u) * (0.7 * Math.sin(x * 0.0055 * l.k + t * l.sp + l.ph) + 0.3 * Math.sin(x * 0.009 * l.k2 - t * l.sp * 1.3 + l.ph * 2));
  }
  pt(u, c) { return this.g.orient === 'h' ? [u * this.g.L, c] : [c, u * this.g.L]; }
  draw() {
    const { ctx, g } = this; const t = this.t;
    ctx.clearRect(0, 0, this.W, this.H);

    if (g.guides) {
      ctx.save(); ctx.setLineDash([3, 5]); ctx.lineWidth = 1; ctx.strokeStyle = g.guideColor;
      g.guides.forEach((u) => {
        const c = g.center(u, t); const [x, y] = this.pt(u, c);
        ctx.beginPath();
        if (g.orient === 'h') { ctx.moveTo(x, Math.min(y - g.spread(u) * 0.5 - 30, g.guideTop ?? y)); ctx.lineTo(x, g.guideBottom); }
        ctx.stroke();
      });
      ctx.restore();
    }

    const S = Math.max(40, Math.round(g.L / 7));
    ctx.strokeStyle = this.grad; ctx.lineCap = 'round';
    for (const l of this.lines) {
      ctx.globalAlpha = g.alpha(l.v);
      ctx.lineWidth = Math.abs(l.v) < 0.08 ? 1.4 : 1;
      ctx.beginPath();
      for (let s = 0; s <= S; s++) {
        const u = s / S; const [x, y] = this.pt(u, this.cross(l, u, t));
        s ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    if (g.guides) {
      g.guides.forEach((u) => {
        const [x, y] = this.pt(u, g.center(u, t));
        ctx.beginPath(); ctx.arc(x, y, 5.5, 0, Math.PI * 2); ctx.fillStyle = g.markerRing; ctx.fill();
        ctx.beginPath(); ctx.arc(x, y, 2.6, 0, Math.PI * 2); ctx.fillStyle = g.markerDot; ctx.fill();
      });
    }

    for (const p of this.packets) {
      if (p.u < 0 || p.u > 1) continue;
      const l = this.lines[p.li];
      let c = this.cross(l, p.u, t), a = 1;
      if (p.u > p.exit) { const d = (p.u - p.exit) * g.L; c += p.side * d * 0.9; a = clamp(1 - d / 70, 0, 1); }
      else a = smooth(0, 0.05, p.u) * (1 - smooth(0.94, 1, p.u));
      if (a <= 0) continue;
      const [x, y] = this.pt(p.u, c);
      ctx.globalAlpha = a * 0.22; ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fillStyle = g.packetRing; ctx.fill();
      ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(x, y, 2.3, 0, Math.PI * 2); ctx.fillStyle = g.packetDot; ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  frame(now) {
    if (!this.running || this.dead) return;
    const dt = Math.min(0.05, (now - (this.last || now)) / 1000); this.last = now;
    this.t += dt;
    for (let i = 0; i < this.packets.length; i++) {
      const p = this.packets[i]; p.u += p.speed * dt;
      const gone = p.u > 1.02 || (p.u > p.exit && (p.u - p.exit) * this.g.L > 80);
      if (gone) this.packets[i] = this.spawn(false);
    }
    this.draw();
    requestAnimationFrame(this.frame);
  }
  start() { if (this.running || reduceMotion || this.dead) return; this.running = true; this.last = 0; requestAnimationFrame(this.frame); }
  stop() { this.running = false; }
  destroy() {
    this.dead = true; this.stop();
    window.removeEventListener('resize', this._onResize);
    this._onResize.cancel?.();
    document.removeEventListener('visibilitychange', this._onVis);
    this._io?.disconnect();
  }
}

/* ---------- The three scene geometries, as init(el) → destroy() ---------- */

export function initHero(hero, canvas, content) {
  if (!canvas) return () => {};
  const chips = $$('.ev-chip', hero);
  const ticks = $$('.axis-tick', hero);
  const STAGES = [0.04, 0.34, 0.62, 0.96];

  const geometry = (W, H) => {
    const hr = hero.getBoundingClientRect(), cr = content.getBoundingClientRect();
    const wide = W >= 1000;
    const axisH = 56;
    const textBottom = cr.bottom - hr.top;
    const bandTop = textBottom + (wide ? 34 : 26);
    const bandBottom = H - axisH - 16;
    const bandH = Math.max(90, bandBottom - bandTop);
    const bandMid = bandTop + bandH / 2;
    const tr = textRight(content, hr) / W;
    const uRise = wide ? clamp(tr - 0.02, 0.45, 0.66) : 0.38;
    const yEnd = wide ? Math.max(H * 0.14, 96) : bandTop + bandH * 0.08;
    const uConv = Math.min(uRise + 0.08, 0.8);
    const spread0 = bandH * 0.92, spreadEnd = wide ? 16 : 10;
    return {
      orient: 'h', L: W, lines: wide ? 44 : 28, packets: wide ? 26 : 12,
      center: (u, t) => {
        const p = clamp((u - uRise) / (1 - uRise), 0, 1); const rise = Math.pow(p, 1.7);
        return lerp(bandMid, yEnd, rise) + Math.sin(u * 5 + t * 0.5) * bandH * 0.035 * (1 - rise * 0.7);
      },
      spread: (u) => lerp(spread0, spreadEnd, smooth(0, uConv, u)),
      amp: (u) => bandH * 0.2 * (1 - smooth(0.04, uConv, u)) + 1.5,
      alpha: (v) => 0.12 + 0.6 * Math.pow(1 - Math.abs(v) * 2, 1.4),
      stops: [[0, 'rgba(102,113,124,0.55)'], [0.42, 'rgba(0,96,240,0.7)'], [1, 'rgba(0,128,248,1)']],
      guides: STAGES.slice(1, 3), guideColor: 'rgba(40,48,56,0.16)', guideBottom: H - axisH, guideTop: bandTop - 10,
      markerRing: 'rgba(0,128,248,0.18)', markerDot: C.blueDeep,
      packetRing: C.blue, packetDot: C.blueDeep,
      wide,
    };
  };

  const placeChips = (wf) => {
    const g = wf.g, W = wf.W;
    ticks.forEach((tk, i) => { tk.style.left = (STAGES[i] * 100) + '%'; });
    chips.forEach((chip) => {
      if (!g.wide || W < 1100) { chip.classList.remove('is-placed'); return; }
      const u = parseFloat(chip.dataset.u), lift = parseFloat(chip.dataset.lift);
      const x = u * W, y = g.center(u, 0) - lift;
      chip.style.left = x + 'px'; chip.style.top = y + 'px';
      chip.style.transform = chip.dataset.anchor === 'right' ? 'translate(-100%, -50%)' : 'translate(-50%, -50%)';
      chip.classList.add('is-placed');
    });
  };

  const wf = new WaveField(canvas, geometry, { seed: 7, onLayout: placeChips });
  let alive = true;
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (alive) wf.resize(); });
  return () => { alive = false; wf.destroy(); };
}

export function initFunnel(canvas) {
  if (!canvas) return () => {};
  const mq = window.matchMedia('(max-width: 760px)');
  const WIDTHS = [0.46, 0.35, 0.25, 0.17, 0.11, 0.07];
  const EXIT_P = [0.3, 0.24, 0.17, 0.12, 0.08];
  const geometry = (W, H) => {
    const vertical = mq.matches;
    const L = vertical ? H : W, X = vertical ? W : H;
    const cx = vertical ? W * 0.56 : H * 0.5;
    const spreadAt = (u) => {
      const x = u * 6 - 0.5, i = Math.floor(x), f = x - i;
      const a = WIDTHS[clamp(i, 0, 5)], b = WIDTHS[clamp(i + 1, 0, 5)];
      return lerp(a, b, smooth(0.2, 0.8, f)) * X * (vertical ? 0.7 : 1);
    };
    return {
      orient: vertical ? 'v' : 'h', L, lines: vertical ? 26 : 40, packets: vertical ? 16 : 34,
      center: (u, t) => cx + Math.sin(u * 4 + t * 0.4) * X * 0.012,
      spread: spreadAt,
      amp: (u) => spreadAt(u) * 0.07 + 1.5,
      alpha: (v) => (vertical ? 0.08 : 0.12) + (vertical ? 0.4 : 0.58) * Math.pow(1 - Math.abs(v) * 2, 1.3),
      stops: [[0, 'rgba(156,203,251,0.55)'], [0.5, 'rgba(0,128,248,0.85)'], [1, 'rgba(0,128,248,1)']],
      packetRing: C.blue, packetDot: C.white,
      exitFn: (r) => {
        let x = r(), acc = 0;
        for (let k = 0; k < EXIT_P.length; k++) { acc += EXIT_P[k]; if (x < acc) return (k + 1) / 6 + r() * 0.05; }
        return 2;
      },
    };
  };
  const wf = new WaveField(canvas, geometry, { seed: 21 });
  return () => wf.destroy();
}

export function initCtaWaves(canvas) {
  if (!canvas) return () => {};
  const geometry = (W, H) => {
    const narrow = W < 760;
    return {
      orient: 'h', L: W, lines: narrow ? 20 : 34, packets: 0,
      center: (u, t) => lerp(H * (narrow ? 0.985 : 0.93), H * (narrow ? 0.78 : 0.26), Math.pow(smooth(0.15, 1, u), 1.2)) + Math.sin(u * 4 + t * 0.35) * H * 0.015,
      spread: (u) => lerp(narrow ? 90 : H * 0.26, 30, smooth(0, 0.8, u)),
      amp: (u) => (narrow ? 20 : H * 0.06) * (1 - smooth(0, 0.75, u)) + 1.5,
      alpha: (v) => 0.05 + 0.32 * Math.pow(1 - Math.abs(v) * 2, 1.4),
      stops: [[0, 'rgba(156,203,251,0.5)'], [0.6, 'rgba(0,128,248,0.8)'], [1, 'rgba(0,128,248,1)']],
      packetRing: C.blue, packetDot: C.white,
    };
  };
  const wf = new WaveField(canvas, geometry, { seed: 3 });
  return () => wf.destroy();
}

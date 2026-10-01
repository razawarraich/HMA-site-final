/* Page-level entrance effects: split headings, reveals, growing bars, count-ups.
   Runs once per route mount; returns a cleanup that disconnects every observer
   and never leaves an element stuck hidden. Safe under StrictMode double-mount. */
import { $$, canAnimate, belowFold, onVisible, clamp } from './core.js';

export function initReveal(root = document) {
  const ios = [];

  $$('[data-split]', root).forEach((h) => {
    if (h.dataset.splitDone) return; // idempotent across StrictMode re-runs
    h.dataset.splitDone = '1';
    let i = 0;
    const walk = (node) => {
      Array.from(node.childNodes).forEach((ch) => {
        if (ch.nodeType === 3) {
          const frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'split-w';
            const inner = document.createElement('span'); inner.textContent = part; inner.style.setProperty('--i', i++);
            w.appendChild(inner); frag.appendChild(w);
          });
          ch.replaceWith(frag);
        } else if (ch.nodeType === 1 && ch.tagName !== 'BR') { walk(ch); }
      });
    };
    walk(h);
    if (canAnimate && belowFold(h)) {
      h.classList.add('split-pending');
      ios.push(onVisible(h, () => { h.classList.remove('split-pending'); h.classList.add('split-in'); }));
    }
  });

  const pend = [];
  if (canAnimate) {
    $$('[data-reveal]', root).forEach((el) => {
      if (!belowFold(el)) return;
      el.classList.add('is-pending'); pend.push(el);
      ios.push(onVisible(el, () => { el.classList.add('is-revealed'); el.classList.remove('is-pending'); }));
    });

    $$('[data-bar]', root).forEach((bar) => {
      if (!belowFold(bar)) return;
      const w = bar.style.getPropertyValue('--w');
      bar.style.setProperty('--w', '0%');
      ios.push(onVisible(bar, () => setTimeout(() => bar.style.setProperty('--w', w), 150), { margin: '0px 0px -8% 0px' }));
    });
  }

  return () => {
    ios.forEach((io) => io && io.disconnect());
    // never strand content invisible
    pend.forEach((el) => el.classList.remove('is-pending'));
    $$('.split-pending', root).forEach((el) => el.classList.remove('split-pending'));
  };
}

export function initCounts(root = document) {
  if (!canAnimate) return () => {};
  const ios = [];
  let dead = false;
  $$('[data-count]', root).forEach((el) => {
    if (!belowFold(el)) return;
    const target = parseFloat(el.dataset.count);
    const dec = +(el.dataset.decimals || 0);
    const pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    const render = (v) => {
      el.textContent = pre + v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
    };
    render(0);
    ios.push(onVisible(el, () => {
      const t0 = performance.now(), dur = 1500;
      const step = (now) => {
        if (dead) { render(target); return; }
        const p = clamp((now - t0) / dur, 0, 1), e = 1 - Math.pow(1 - p, 3);
        render(target * e);
        if (p < 1) requestAnimationFrame(step); else render(target);
      };
      requestAnimationFrame(step);
    }, { margin: '0px 0px -12% 0px' }));
  });
  return () => {
    dead = true;
    ios.forEach((io) => io && io.disconnect());
    // leave real values, not zeros
    $$('[data-count]', root).forEach((el) => {
      const dec = +(el.dataset.decimals || 0);
      el.textContent = (el.dataset.prefix || '') +
        parseFloat(el.dataset.count).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) +
        (el.dataset.suffix || '');
    });
  };
}

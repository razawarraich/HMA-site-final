import { useEffect, useRef, useState } from 'react';
import { SectionHead, Ez, Photo } from '../shared.jsx';
import { useTabKeys } from '../../hooks/useFx.js';
import { mountChart, drawPmChart, PM } from '../../lib/charts.js';
import { initFlow4 } from '../../lib/flows.js';
import { reduceMotion } from '../../lib/core.js';

/* ---------- Paid media card: channel tabs + daily-spend chart ---------- */
const CHANNELS = [
  { ch: 'google', label: 'Google Ads' },
  { ch: 'meta', label: 'Meta' },
  { ch: 'tiktok', label: 'TikTok' },
];

function PaidMediaCard() {
  const [active, setActive] = useState(0);
  const tabProps = useTabKeys(CHANNELS.length, active, setActive);
  const chartRef = useRef(null);
  const apiRef = useRef(null);
  const channelRef = useRef('google');

  useEffect(() => {
    apiRef.current = mountChart(chartRef.current, (el) => drawPmChart(el, channelRef.current));
    return () => apiRef.current?.destroy();
  }, []);

  useEffect(() => {
    const ch = CHANNELS[active].ch;
    if (channelRef.current === ch) return;
    channelRef.current = ch;
    const api = apiRef.current, el = chartRef.current;
    api?.redraw();
    const p = el?.querySelector('[data-draw]');
    if (p && !reduceMotion) {
      const L = p.getTotalLength();
      p.style.strokeDasharray = L; p.style.strokeDashoffset = L;
      p.getBoundingClientRect();
      p.style.transition = 'stroke-dashoffset 1s cubic-bezier(.2,.7,.2,1)';
      p.style.strokeDashoffset = 0;
    }
  }, [active]);

  const c = PM[CHANNELS[active].ch];
  return (
    <article className="svc svc--media" data-reveal="" aria-labelledby="svc-media">
      <div className="svc__kicker"><p className="label">Paid Media</p><span className="sample-tag">Sample data</span></div>
      <h3 className="display svc__title" id="svc-media">Reach the right people without wasting the budget.</h3>
      <ul className="svc__list"><li>Google Ads</li><li>Meta Ads</li><li>TikTok Ads</li><li>LinkedIn Ads</li><li>Microsoft Ads</li></ul>
      <div className="pm">
        <div className="pm__bar">
          <div className="tabs" role="tablist" aria-label="Channel">
            {CHANNELS.map((t, i) => (
              <button type="button" key={t.ch} aria-controls="pmPanel" {...tabProps(i)}>{t.label}</button>
            ))}
          </div>
          <span className="label">Last 30 days · daily spend</span>
        </div>
        <div id="pmPanel" role="tabpanel" aria-live="polite">
          <div className="pm__metrics">
            <div className="pm__metric"><span className="label">Spend</span><b>${c.spend.toLocaleString('en-US')}</b></div>
            <div className="pm__metric"><span className="label">CTR</span><b>{c.ctr}</b></div>
            <div className="pm__metric"><span className="label">CPC</span><b>{c.cpc}</b></div>
            <div className="pm__metric"><span className="label">ROAS</span><b>{c.roas}</b></div>
          </div>
          <div className="pm__chart chart" ref={chartRef} />
        </div>
      </div>
    </article>
  );
}

/* ---------- Tracking card: live-style event stream + dataLayer sample ---------- */
const STREAM_EVENTS = [
  ['page_view', '/', ['GA4', 'CAPI']],
  ['page_view', '/services/tracking', ['GA4', 'CAPI']],
  ['view_item', 'service: audit', ['GA4', 'CAPI', 'TT']],
  ['generate_lead', 'value 120.00', ['GA4', 'ADS', 'CAPI']],
  ['page_view', '/pricing', ['GA4', 'CAPI']],
  ['begin_checkout', 'value 148.00', ['GA4', 'CAPI']],
  ['purchase', 'value 148.00 USD', ['GA4', 'ADS', 'CAPI']],
  ['qualified_lead', 'offline import', ['ADS', 'CAPI']],
];
const pad = (n) => String(n).padStart(2, '0');
const fmtClock = (c) => `${pad(Math.floor(c / 3600))}:${pad(Math.floor(c / 60) % 60)}:${pad(c % 60)}`;

const INITIAL_ROWS = (() => {
  // Same opening rows as the original markup
  let clock = 14 * 3600 + 2 * 60 + 31;
  const base = [
    ['purchase', 'value 148.00 USD', ['GA4', 'ADS', 'CAPI']],
    ['begin_checkout', 'value 148.00', ['GA4', 'CAPI']],
    ['generate_lead', 'value 120.00', ['GA4', 'ADS', 'CAPI']],
    ['view_item', 'service: audit', ['GA4', 'CAPI']],
    ['page_view', '/pricing', ['GA4', 'CAPI']],
    ['page_view', '/', ['GA4', 'CAPI']],
  ];
  const gaps = [0, 5, 7, 5, 6, 5];
  return base.map(([name, param, dest], i) => {
    clock -= gaps[i];
    return { key: `init-${i}`, t: fmtClock(clock), name, param, dest };
  });
})();

function TrackingCard() {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const listRef = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    const list = listRef.current;
    let k = 0, clock = 14 * 3600 + 2 * 60 + 31, timer = null, key = 0;
    const add = () => {
      clock += 2 + Math.floor(Math.random() * 7);
      const [name, param, dest] = STREAM_EVENTS[k++ % STREAM_EVENTS.length];
      const row = { key: `live-${key++}`, t: fmtClock(clock), name, param, dest };
      setRows((prev) => [row, ...prev].slice(0, 14));
    };
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) { if (!timer) timer = setInterval(add, 1700); }
      else { clearInterval(timer); timer = null; }
    });
    io.observe(list);
    return () => { clearInterval(timer); io.disconnect(); };
  }, []);

  return (
    <article className="svc svc--tracking on-dark" data-reveal="" aria-labelledby="svc-tracking">
      <div className="svc__kicker"><p className="label">Tracking &amp; Analytics</p></div>
      <h3 className="display svc__title" id="svc-tracking">Know exactly where every conversion comes from.</h3>
      <ul className="svc__list"><li>Google Tag Manager</li><li>GA4</li><li>Meta Pixel &amp; CAPI</li><li>Enhanced conversions</li><li>Offline imports</li><li>Server-side tagging</li></ul>

      <div className="stream">
        <div className="stream__head"><span className="label">Event stream</span><span className="stream__live">Live preview</span></div>
        <div className="stream__list" ref={listRef}>
          {rows.map((r) => (
            <div className="ev-row" key={r.key}>
              <span className="ev-row__t">{r.t}</span>
              <span className="ev-row__name">{r.name} <em>{r.param}</em></span>
              <span className="ev-row__dest">{r.dest.map((d) => <span key={d}>{d}</span>)}</span>
            </div>
          ))}
        </div>
      </div>
      <pre className="code" aria-label="Example dataLayer event"><code><span className="f">dataLayer</span>.push({'{'}
  <span className="k">event</span>: <span className="s">'generate_lead'</span>,
  <span className="k">lead_type</span>: <span className="s">'strategy_call'</span>,
  <span className="k">value</span>: <span className="n">120</span>,
  <span className="k">currency</span>: <span className="s">'USD'</span>,
  <span className="k">event_id</span>: <span className="s">'lead_8f2c19'</span>
{'}'});</code></pre>
      <p className="svc__foot">One event definition, deduplicated across GA4, Google Ads and Meta CAPI through a shared event_id.</p>
    </article>
  );
}

/* ---------- CRO card: A/B wireframes ---------- */
function CroCard() {
  return (
    <article className="svc svc--cro" data-reveal="" aria-labelledby="svc-cro">
      <div className="svc__kicker"><p className="label">Conversion Optimization</p><span className="sample-tag">Sample test</span></div>
      <h3 className="display svc__title" id="svc-cro">Turn more of your traffic into actual business.</h3>
      <ul className="svc__list"><li>Landing pages</li><li>Funnels</li><li>Forms</li><li>A/B testing</li><li>Page speed</li></ul>
      <div className="ab" aria-label="A/B test: Version B converts at 3.8% versus 2.9% for Version A">
        <div className="wire" aria-hidden="true">
          <div className="wire__bar"><i></i><i></i><i></i></div>
          <div className="wire__hero">
            <span className="wire__l wire__l--h" style={{ width: '70%' }}></span>
            <span className="wire__l" style={{ width: '90%' }}></span>
            <span className="wire__l" style={{ width: '60%' }}></span>
            <span className="wire__btn"></span>
          </div>
          <div className="wire__rows"><i></i><i></i><i></i></div>
          <div className="wire__meta"><span className="label">Version A</span><b>2.9%</b></div>
          <div className="wire__cr"><span data-bar="" style={{ '--w': '76%' }}></span></div>
        </div>
        <div className="wire wire--b" aria-hidden="true">
          <span className="wire__badge">+31% conv. rate</span>
          <div className="wire__bar"><i></i><i></i><i></i></div>
          <div className="wire__hero">
            <span className="wire__l wire__l--h" style={{ width: '88%' }}></span>
            <span className="wire__l wire__l--h" style={{ width: '54%' }}></span>
            <span className="wire__l" style={{ width: '72%' }}></span>
            <span className="wire__btn"></span>
          </div>
          <div className="wire__rows"><i></i><i></i><i></i></div>
          <div className="wire__meta"><span className="label">Version B</span><b>3.8%</b></div>
          <div className="wire__cr"><span data-bar="" style={{ '--w': '100%' }}></span></div>
        </div>
      </div>
      <p className="ab__note">14-day test · 11,240 sessions · 95% confidence · Winner: shorter form, proof above the fold</p>
    </article>
  );
}

/* ---------- Strategy card: photo + 4-step flow ---------- */
const FLOW4 = [
  { label: 'Traffic', count: '48.2', dec: '1', suf: 'K', val: '48.2K', small: 'sessions' },
  { label: 'Lead', count: '1930', val: '1,930', small: '4.0% of traffic' },
  { label: 'Customer', count: '214', val: '214', small: '11.1% of leads' },
  { label: 'Revenue', count: '182.9', dec: '1', pre: '$', suf: 'K', val: '$182.9K', small: '$855 per customer' },
];

function StrategyCard() {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  useEffect(() => initFlow4(wrapRef.current, svgRef.current), []);

  return (
    <article className="svc svc--strategy" data-reveal="" aria-labelledby="svc-strategy">
      <Photo
        src="/img/meeting-lounge.jpg"
        alt="Two colleagues in a strategy discussion in a bright office lounge"
        cap="Strategy session"
        width="776" height="1100"
      />
      <div className="strategy__body">
        <div className="svc__kicker"><p className="label">Performance Strategy</p><span className="sample-tag">Sample model</span></div>
        <h3 className="display svc__title" id="svc-strategy">Build a marketing system around measurable growth.</h3>
        <ul className="svc__list"><li>Paid media strategy</li><li>Customer acquisition</li><li>Marketing audits</li><li>Growth planning</li><li>Performance reporting</li></ul>
        <div className="flow4" ref={wrapRef}>
          <svg className="flow4__svg" ref={svgRef} aria-hidden="true" />
          <ol className="flow4__steps">
            {FLOW4.map((f) => (
              <li className="flow4__step" key={f.label}>
                <span className="label">{f.label}</span>
                <span className="flow4__node"></span>
                <b data-count={f.count} data-decimals={f.dec} data-prefix={f.pre} data-suffix={f.suf}>{f.val}</b>
                <small>{f.small}</small>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}

export default function ServicesShowcase() {
  return (
    <section className="section" id="showcase" aria-labelledby="services-title">
      <div className="container">
        <SectionHead
          eyebrow="The same services, in action"
          titleId="services-title"
          title="Four disciplines. One performance system."
          aside="Media buying, measurement, conversion work and strategy usually sit with different vendors. We run them as one system, because each one depends on the others."
        />

        <Ez>
          Below is a live-style demo of each service. The numbers are sample data on your
          account, this is where your real numbers would live.
        </Ez>

        <div className="services__grid">
          <PaidMediaCard />
          <TrackingCard />
          <CroCard />
          <StrategyCard />
        </div>
      </div>
    </section>
  );
}

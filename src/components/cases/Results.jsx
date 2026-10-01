import { useEffect, useRef } from 'react';
import { Ez } from '../shared.jsx';
import { mountChart, drawTrend, initSparks } from '../../lib/charts.js';

/* Edit metric rows and campaign cards here. */
const MROWS = [
  { n: '−18', u: '%', label: 'CPA · $46.10 → $37.80', spark: '46,45.2,44.5,43.1,41.6,40.4,39.3,38.6,38.1,37.8' },
  { n: '+24', u: '%', label: 'CTR · 1.21% → 1.50%', spark: '1.21,1.23,1.26,1.3,1.33,1.37,1.41,1.44,1.48,1.5' },
  { n: '3.8', u: '×', label: 'ROAS · blended across channels', spark: '3.1,3.18,3.22,3.34,3.41,3.5,3.56,3.66,3.73,3.8' },
];

const HBARS = [
  { name: 'Google Ads', pct: '−20%', before: ['39%', '$46'], after: ['31.4%', '$37'] },
  { name: 'Meta', pct: '−19%', before: ['44.1%', '$52'], after: ['35.6%', '$42'] },
  { name: 'TikTok', pct: '−16%', before: ['51.7%', '$61'], after: ['43.2%', '$51'] },
  { name: 'LinkedIn', pct: '−18%', before: ['100%', '$118'], after: ['82.2%', '$97'] },
];

const CAMPAIGNS = [
  { ch: 'Google Ads', pill: ['pill--scale', 'Scaling'], name: 'Search · High-intent services', bars: [40, 46, 52, 58, 66, 78, 92], m: [['Spend', '$14.2K'], ['CPA', '$31'], ['ROAS', '4.9×']] },
  { ch: 'Google Ads', pill: ['pill--scale', 'Scaling'], name: 'Performance Max · Lead form', bars: [30, 34, 44, 50, 57, 62, 74], m: [['Spend', '$8.2K'], ['CPA', '$36'], ['ROAS', '4.1×']] },
  { ch: 'Meta', pill: ['pill--test', 'Testing'], name: 'Prospecting · Problem-first video', bars: [48, 44, 52, 60, 58, 68, 72], m: [['Spend', '$9.6K'], ['CPA', '$39'], ['ROAS', '3.6×']] },
  { ch: 'Meta', pill: ['pill--scale', 'Scaling'], name: 'Retargeting · 14-day visitors', bars: [60, 62, 66, 70, 69, 76, 80], m: [['Spend', '$3.1K'], ['CPA', '$24'], ['ROAS', '5.2×']] },
  { ch: 'TikTok', pill: ['pill--learn', 'Learning'], name: 'Spark Ads · Creator cut', bars: [20, 28, 26, 38, 42, 40, 52], m: [['Spend', '$4.4K'], ['CPA', '$49'], ['ROAS', '2.8×']] },
  { ch: 'LinkedIn', pill: ['pill--pause', 'Paused'], name: 'Lead Gen · Broad job titles', bars: [70, 62, 50, 44, 30, 18, 6], m: [['Spend', '$2.9K'], ['CPA', '$124'], ['ROAS', '0.9×']] },
];

export default function Results() {
  const trendRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const api = mountChart(trendRef.current, drawTrend);
    const offSparks = initSparks(rootRef.current);
    return () => { api.destroy(); offSparks(); };
  }, []);

  return (
    <section className="section" id="results" aria-labelledby="results-title" ref={rootRef}>
      <div className="container">
        <div className="sec-head results__head">
          <div className="sec-head__main">
            <p className="eyebrow">Results</p>
            <h2 className="display h2" id="results-title" data-split="">
              What a well-run account looks like after 90 days.
            </h2>
          </div>
          <div className="sec-head__aside">
            <p className="lead">A sample campaign, reported the way we report: outcomes first, then the trend, then the campaigns behind it.</p>
            <span className="sample-tag">Sample campaign · demo data</span>
          </div>
        </div>

        <Ez>
          What you are seeing: more sales (+32%) while each sale costs less (−18%). That is the
          goal on every account: pay less, get more.
        </Ez>

        <div className="results__top" data-reveal="">
          <div className="bignum">
            <p className="bignum__n"><span data-count="32" data-prefix="+">+32</span><sup>%</sup></p>
            <div className="bignum__label"><b>Conversions</b><span className="label">Last 4 weeks vs. first 4 weeks</span></div>
          </div>
          <div className="mlist">
            {MROWS.map((r) => (
              <div className="mrow" key={r.label}>
                <div><p className="mrow__n">{r.n}<span className="u">{r.u}</span></p><span className="mrow__l">{r.label}</span></div>
                <svg className="spark" data-spark={r.spark} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>

        <div className="results__charts" data-reveal="">
          <div className="results__trend">
            <div className="panel-head">
              <h3>Weekly conversions</h3>
              <div className="legend"><span><i className="sw-line"></i>Conversions</span><span><i className="sw-dash"></i>Baseline (first 4 weeks)</span></div>
            </div>
            <div className="chart" ref={trendRef} />
            <ol className="legend" style={{ marginTop: 12 }} aria-label="Annotations">
              <li><span className="mono" style={{ color: 'var(--blue-deep)' }}>1</span>&nbsp;Tracking rebuilt (W3)</li>
              <li><span className="mono" style={{ color: 'var(--blue-deep)' }}>2</span>&nbsp;Creative round 2 (W6)</li>
              <li><span className="mono" style={{ color: 'var(--blue-deep)' }}>3</span>&nbsp;Budget shifted to PMax (W9)</li>
            </ol>
          </div>
          <div className="results__bars">
            <div className="panel-head">
              <h3>CPA by channel</h3>
              <div className="legend"><span><i className="sw-bar"></i>Before</span><span><i className="sw-bar" style={{ background: 'var(--blue-deep)' }}></i>After</span></div>
            </div>
            <div className="hbars">
              {HBARS.map((h) => (
                <div className="hbar" key={h.name}>
                  <div className="hbar__name"><span>{h.name}</span><span>{h.pct}</span></div>
                  <div className="hbar__tracks">
                    <div className="hbar__track"><i data-bar="" style={{ '--w': h.before[0] }}></i><span>{h.before[1]}</span></div>
                    <div className="hbar__track hbar__track--after"><i data-bar="" style={{ '--w': h.after[0] }}></i><span>{h.after[1]}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="results__cards">
          <div className="panel-head" style={{ marginBottom: 16 }}><h3>Campaigns</h3><span className="label">Scroll →</span></div>
          <div className="cards-track" tabIndex={0} aria-label="Sample campaigns">
            {CAMPAIGNS.map((c) => (
              <article className="camp" key={c.name}>
                <div className="camp__top"><span className="label">{c.ch}</span><span className={`pill ${c.pill[0]}`}>{c.pill[1]}</span></div>
                <p className="camp__name">{c.name}</p>
                <div className="camp__bars" aria-hidden="true">
                  {c.bars.map((h, i) => <i key={i} style={{ '--h': `${h}%` }}></i>)}
                </div>
                <div className="camp__m">
                  {c.m.map(([l, v]) => <div key={l}><span className="label">{l}</span><b>{v}</b></div>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

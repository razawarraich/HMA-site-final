import { useEffect, useRef, useState } from 'react';
import { Ez, Photo } from '../shared.jsx';
import { useTabKeys } from '../../hooks/useFx.js';
import { mountChart, drawRounds } from '../../lib/charts.js';

/* A/B creative comparison — the metric switcher is pure React state. */
const AB = {
  ctr: { a: 1.12, b: 1.71, f: (v) => v.toFixed(2) + '%', delta: '+53%', what: 'CTR', lowerBetter: false },
  cpc: { a: 1.84, b: 1.21, f: (v) => '$' + v.toFixed(2), delta: '−34%', what: 'cost per click', lowerBetter: true },
  cvr: { a: 2.6, b: 3.4, f: (v) => v.toFixed(1) + '%', delta: '+31%', what: 'conversion rate', lowerBetter: false },
};
const METRICS = [
  { m: 'ctr', label: 'CTR' },
  { m: 'cpc', label: 'CPC' },
  { m: 'cvr', label: 'Conv. rate' },
];

export default function CreativeTesting() {
  const [active, setActive] = useState(0);
  const tabProps = useTabKeys(METRICS.length, active, setActive);
  const roundsRef = useRef(null);

  useEffect(() => {
    const api = mountChart(roundsRef.current, drawRounds);
    return () => api.destroy();
  }, []);

  const d = AB[METRICS[active].m];
  const max = Math.max(d.a, d.b);

  return (
    <section className="section" id="creative" aria-labelledby="creative-title">
      <div className="container">
        <div className="creative__top">
          <div className="creative__media" data-reveal="">
            <Photo
              src="/img/creative-desk.jpg"
              alt="Overhead view of a designer working at a laptop on a wooden desk"
              variant="cool"
              cap="Creative production"
              className="creative__photo"
              width="1500" height="1151"
            />
            <div className="creative__quote">
              <b>Test brief · hypothesis</b>
              A problem-first hook in the first two seconds will lift CTR by 20% or more against the product-led static.
            </div>
          </div>

          <div className="creative__intro">
            <p className="eyebrow">Creative &amp; testing</p>
            <h2 className="display h2" id="creative-title" data-split="">
              Media buying is half the job. The other half is what people see.
            </h2>
            <p className="lead">
              Creative is the biggest lever left in paid social. We brief, produce and test
              variations continuously, and read every result against the metric that matters.
            </p>

            <Ez>
              We always test two ads against each other. The winner stays, the loser teaches us
              something and your ads keep getting cheaper.
            </Ez>

            <div className="ads">
              <div className="ad-wrap">
                <div className="ad-wrap__label"><b>CREATIVE A</b><span>Static · benefit-led</span></div>
                <div className="ad" id="adA">
                  <div className="ad__top"><span className="ad__avatar">Y</span><span className="ad__who"><b>Your Brand</b><span>Sponsored</span></span></div>
                  <p className="ad__copy">Every conversion, tracked across Google, Meta and TikTok.</p>
                  <div className="ad__media">
                    <img src="/img/laptop-minimal.jpg" alt="Sample ad image: hands typing on a laptop at a white desk" loading="lazy" width="900" height="640" />
                    <span className="ad__overlay ad__overlay--dark" style={{ top: 16, bottom: 'auto' }}>One dashboard.<br />Every channel.</span>
                  </div>
                  <div className="ad__cta"><b>Free tracking audit</b><span>Learn more</span></div>
                </div>
              </div>
              <div className="ad-wrap">
                <div className="ad-wrap__label"><b>CREATIVE B</b><span>Video · problem-first hook</span></div>
                <div className="ad is-winner" id="adB">
                  <div className="ad__top"><span className="ad__avatar">Y</span><span className="ad__who"><b>Your Brand</b><span>Sponsored</span></span></div>
                  <p className="ad__copy">Still guessing which ads actually drive sales?</p>
                  <div className="ad__media">
                    <img src="/img/blue-booth.jpg" alt="Sample ad video frame: a man working on a laptop in a blue booth" loading="lazy" width="846" height="900" />
                    <span className="ad__play" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M2 1.2v9.6L10.5 6z" fill="#283038" /></svg></span>
                    <span className="ad__overlay">3 signs your conversion tracking is broken</span>
                    <span className="ad__progress" aria-hidden="true"><span></span></span>
                  </div>
                  <div className="ad__cta"><b>Free tracking audit</b><span>Learn more</span></div>
                </div>
              </div>
            </div>

            <div className="abm">
              <div className="abm__bar">
                <div className="tabs" role="tablist" aria-label="Compare creatives by metric" id="abTabs">
                  {METRICS.map((t, i) => (
                    <button type="button" key={t.m} aria-controls="abPanel" {...tabProps(i)}>{t.label}</button>
                  ))}
                </div>
                <p className="abm__delta" id="abDelta">
                  Creative B vs. A: <b>{d.delta}</b> {d.what}{d.lowerBetter ? ' (lower is better)' : ''}
                </p>
              </div>
              <div className="abm__rows" id="abPanel" role="tabpanel" aria-live="polite">
                <div className="abm__row">
                  <b>A</b>
                  <div className="abm__track"><span style={{ '--w': `${(d.a / max * 100).toFixed(1)}%` }}></span></div>
                  <span className="abm__val">{d.f(d.a)}</span>
                </div>
                <div className="abm__row abm__row--b">
                  <b>B</b>
                  <div className="abm__track"><span style={{ '--w': `${(d.b / max * 100).toFixed(1)}%` }}></span></div>
                  <span className="abm__val">{d.f(d.b)}</span>
                </div>
              </div>
              <p className="label">Sample test · 21 days · $6,000 split evenly</p>
            </div>
          </div>
        </div>

        <div className="rounds" data-reveal="">
          <div className="rounds__text">
            <p className="label">Continuous testing</p>
            <h3 className="display">Every round of tests lowers the cost of the next customer.</h3>
            <p style={{ color: 'var(--slate)' }}>
              Winners become the new control. Losing variants still teach us something about the
              audience. Across six rounds in this sample, CPA falls from $62 to $41.
            </p>
          </div>
          <div className="chart" ref={roundsRef} />
        </div>
      </div>
    </section>
  );
}

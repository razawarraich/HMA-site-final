import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SectionHead, Ez } from '../shared.jsx';
import { initFunnel } from '../../lib/waveField.js';

/* Edit the funnel stages here. `count` drives the count-up animation. */
const STAGES = [
  { name: 'Traffic', count: '48200', val: '48,200', b: 'sessions', s: 'Google · Meta · TikTok' },
  { name: 'Engagement', count: '29400', val: '29,400', b: '61%', s: 'of sessions engaged' },
  { name: 'Leads', count: '1930', val: '1,930', b: '6.6%', s: 'of engaged sessions' },
  { name: 'Qualified leads', count: '734', val: '734', b: '38%', s: 'of leads qualify' },
  { name: 'Customers', count: '214', val: '214', b: '29%', s: 'close rate' },
  { name: 'Revenue', count: '182.9', val: '$182.9K', b: '$855', s: 'per customer', dec: '1', pre: '$', suf: 'K' },
];

export default function FunnelSection() {
  const canvasRef = useRef(null);
  useEffect(() => initFunnel(canvasRef.current), []);

  return (
    <section className="section funnel on-dark" id="funnel" aria-labelledby="funnel-title">
      <div className="container">
        <SectionHead
          eyebrow="The performance funnel"
          titleId="funnel-title"
          title="From first click to closed revenue."
          aside="We measure every stage, not just the ones ad platforms can see, so optimization targets the customers who pay rather than the clicks that are cheapest to buy."
          sampleTag="Sample lead-gen funnel"
        />

        <Ez dark>
          A funnel is just the path a stranger takes to become a customer. We watch every step of
          that path, see where people drop off, and fix that exact step.
        </Ez>

        <div className="funnel__viz" id="funnelViz">
          <canvas className="funnel__canvas" ref={canvasRef} aria-hidden="true" />
          <ol className="funnel__stages">
            {STAGES.map((st) => (
              <li className="fstage" key={st.name}>
                <div className="fstage__top">
                  <span className="fstage__name">{st.name}</span>
                  <span
                    className="fstage__val"
                    data-count={st.count}
                    data-decimals={st.dec}
                    data-prefix={st.pre}
                    data-suffix={st.suf}
                  >
                    {st.val}
                  </span>
                </div>
                <div className="fstage__bottom"><b>{st.b}</b><span>{st.s}</span></div>
              </li>
            ))}
          </ol>
        </div>
        <div className="funnel__foot">
          <p>
            Figures are illustrative. Every stage maps to a tracked event or a CRM status, so each
            rate can be reported from real data rather than estimated.
          </p>
          <Link className="btn btn--ghost btn--sm" to="/services#tracking">See the tracking plan</Link>
        </div>
      </div>
    </section>
  );
}

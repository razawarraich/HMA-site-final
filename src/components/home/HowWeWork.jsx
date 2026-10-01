import { useEffect, useRef } from 'react';
import { Ez, Photo } from '../shared.jsx';
import { initSteps } from '../../lib/flows.js';

/* Edit the five steps here. */
const STEPS = [
  {
    n: '01', title: 'Audit',
    text: 'We review your ad accounts, tracking setup, funnel and spend efficiency to find exactly where budget and data are leaking.',
    out: ['Prioritized audit', 'Tracking gap report'],
  },
  {
    n: '02', title: 'Measure',
    text: 'We write a tracking plan and implement it: GTM, GA4 events, Meta CAPI, enhanced conversions and click-ID capture in your CRM.',
    out: ['Tracking plan', 'Verified conversion data'],
  },
  {
    n: '03', title: 'Launch',
    text: 'Campaigns are rebuilt around clear goals: account structure, audiences, bidding strategy, creative briefs and landing page fixes.',
    out: ['Campaign architecture', 'Creative briefs'],
  },
  {
    n: '04', title: 'Optimize',
    text: 'A weekly cycle of bid, audience, creative and landing page tests, each with a written hypothesis and a success metric.',
    out: ['Test log', 'Weekly change list'],
  },
  {
    n: '05', title: 'Scale & report',
    text: 'Budget moves toward the channels with the best marginal return. You get a live dashboard and a one-page weekly summary in plain language.',
    out: ['Live dashboard', 'Weekly summary'],
  },
];

export default function HowWeWork() {
  const stepsRef = useRef(null);
  useEffect(() => initSteps(stepsRef.current), []);

  return (
    <section className="section" id="how" aria-labelledby="how-title" style={{ background: 'var(--mist)' }}>
      <div className="container process">
        <div className="process__aside">
          <p className="eyebrow">How we work</p>
          <h2 className="display h2" id="how-title" data-split="">Measurement first. Then scale.</h2>
          <p className="lead">
            Most accounts are optimized on incomplete data. We fix measurement before we touch
            budgets, then build structure, then scale what the numbers prove.
          </p>
          <Ez>
            First we make your numbers true. Only then do we spend more — and only on the things
            the numbers prove are working.
          </Ez>
          <Photo
            src="/img/team-session.jpg"
            alt="A team working together on laptops around a shared table"
            cap="Weekly performance review"
            className="process__photo"
            width="1500" height="1001"
          />
        </div>

        <ol className="steps" ref={stepsRef}>
          {STEPS.map((s) => (
            <li className="step" key={s.n}>
              <span className="step__node" aria-hidden="true">{s.n}</span>
              <h3 className="display step__title h3">{s.title}</h3>
              <p>{s.text}</p>
              <div className="step__out">
                <span>Output →</span>
                {s.out.map((o) => <span key={o}>{o}</span>)}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

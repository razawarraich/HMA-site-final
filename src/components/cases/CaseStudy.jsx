import { useEffect, useRef } from 'react';
import { initTimeline } from '../../lib/flows.js';

/* Edit the engagement timeline + before/after table here.
   To add a REAL client case later, copy this component, swap the copy,
   and remove the "Illustrative example" tag. */
const TIMELINE = [
  { when: 'Weeks 1–2', title: 'Audit', text: 'Accounts, tracking and CRM reviewed. Every issue logged and ranked by revenue impact.' },
  { when: 'Weeks 3–4', title: 'Rebuild tracking', text: 'Server-side GTM, Meta CAPI, enhanced conversions and click-ID capture in the CRM.' },
  { when: 'Weeks 5–6', title: 'Restructure', text: 'Campaigns consolidated and optimized to qualified-lead value instead of raw form fills.' },
  { when: 'Weeks 7–10', title: 'Test', text: 'Two creative rounds and a landing page test run in parallel, each against one metric.' },
  { when: 'Week 11+', title: 'Scale', text: 'Budget shifts to the channels with the lowest cost per qualified lead.' },
];

const BEFORE_AFTER = [
  ['Source of truth', 'Three platforms, three conversion counts', 'CRM-matched leads and revenue, one number'],
  ['Optimization target', 'The cheapest form fill', 'Qualified-lead value, imported back to Google and Meta'],
  ['Budget decisions', 'Moved on platform-reported ROAS', 'Moved on blended CPA and pipeline value'],
  ['Reporting', 'A monthly deck of screenshots', 'A live dashboard and a one-page weekly summary'],
];

export default function CaseStudy() {
  const tlRef = useRef(null);
  useEffect(() => initTimeline(tlRef.current), []);

  return (
    <section className="section case on-dark" id="case" aria-labelledby="case-title">
      <div className="case__media" aria-hidden="true">
        <div className="photo"><img src="/img/office-dark.jpg" alt="" loading="lazy" width="1800" height="1200" /></div>
      </div>
      <div className="container">
        <div className="case__head">
          <span className="sample-tag" style={{ justifySelf: 'start' }}>Illustrative example · not a client result</span>
          <h2 className="display case__title" id="case-title" data-split="">
            From three conflicting conversion counts to one number the whole team trusts.
          </h2>
          <p className="lead">
            A hypothetical lead-generation business spending across Google, Meta and LinkedIn,
            used to show how a typical engagement unfolds week by week.
          </p>
        </div>

        <ol className="timeline" ref={tlRef}>
          {TIMELINE.map((t) => (
            <li className="tl" key={t.when}>
              <span className="label">{t.when}</span><b>{t.title}</b><p>{t.text}</p>
            </li>
          ))}
        </ol>

        <table className="ba">
          <caption className="sr-only">Before and after the engagement</caption>
          <thead>
            <tr><th scope="col"><span className="sr-only">Area</span></th><th scope="col">Before</th><th scope="col">After</th></tr>
          </thead>
          <tbody>
            {BEFORE_AFTER.map(([area, b, a]) => (
              <tr key={area}><td>{area}</td><td>{b}</td><td>{a}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

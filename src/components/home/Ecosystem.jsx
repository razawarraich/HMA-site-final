import { useEffect, useRef } from 'react';
import { SectionHead, Ez } from '../shared.jsx';
import { initEcosystem } from '../../lib/flows.js';

const COLS = [
  {
    head: 'Ad platforms', sub: 'Where attention is bought',
    nodes: [
      { g: 'G', name: 'Google Ads', small: 'Search · PMax · YouTube' },
      { g: 'M', name: 'Meta', small: 'Facebook · Instagram' },
      { g: 'T', name: 'TikTok', small: 'In-feed · Spark Ads' },
      { g: 'in', name: 'LinkedIn', small: 'Lead Gen · Sponsored' },
    ],
  },
  {
    head: 'Tracking', sub: 'Where every action is captured',
    nodes: [
      { g: '{ }', name: 'Google Tag Manager', small: 'Web + server containers' },
      { g: 'PX', name: 'Meta Pixel + CAPI', small: 'Browser + server events' },
      { g: 'EC', name: 'Enhanced Conversions', small: 'Hashed first-party data' },
    ],
  },
  {
    head: 'Data', sub: 'Where it becomes one story',
    nodes: [
      { g: 'GA', name: 'GA4', small: 'Events · funnels · paths' },
      { g: 'CR', name: 'CRM & offline', small: 'Qualified leads · deals' },
      { g: '≡', name: 'Reporting', small: 'One weekly view' },
    ],
  },
  {
    head: 'Optimization', sub: 'Where decisions get made',
    nodes: [
      { g: '$', name: 'Bids & budgets' },
      { g: '◎', name: 'Audiences' },
      { g: 'A/B', name: 'Creative' },
      { g: 'LP', name: 'Landing pages' },
    ],
  },
  {
    head: 'Conversions', sub: 'Where it pays off',
    nodes: [
      { g: '✓', name: 'Leads', small: 'generate_lead' },
      { g: '✓', name: 'Purchases', small: 'purchase' },
      { g: '$', name: 'Revenue', small: 'The number that matters', dark: true },
    ],
  },
];

export default function Ecosystem() {
  const flowRef = useRef(null);
  const svgRef = useRef(null);
  useEffect(() => initEcosystem(flowRef.current, svgRef.current), []);

  return (
    <section className="section eco" id="ecosystem" aria-labelledby="eco-title">
      <div className="container">
        <SectionHead
          eyebrow="The ecosystem"
          titleId="eco-title"
          title="Every platform. One measurement system."
          aside="Each ad platform reports its own version of the truth. We connect them through a single tracking layer, so spend, conversions and revenue are measured the same way everywhere."
        />

        <Ez>
          All your ads and all your numbers get connected in one place, so everyone counts the
          same way. No more mystery about where a sale came from.
        </Ez>

        <div className="eco__scroller" data-reveal="">
          <div className="eco__flow" ref={flowRef}>
            <svg className="eco__svg" ref={svgRef} aria-hidden="true" />
            {COLS.map((col) => (
              <div className="eco-col" key={col.head}>
                <div className="eco-col__head"><b>{col.head}</b><span>{col.sub}</span></div>
                <div className="eco-col__nodes">
                  {col.nodes.map((n) => (
                    <div className={`eco-node${n.dark ? ' eco-node--dark' : ''}`} key={n.name}>
                      <span className="eco-node__glyph">{n.g}</span>
                      <span>{n.name}{n.small && <small>{n.small}</small>}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="scroll-hint" aria-hidden="true">Swipe to follow the flow →</p>
        <div className="eco__note">
          <span>gclid · fbclid · ttclid stored with every lead</span>
          <span>Events deduplicated with event_id</span>
          <span>Consent Mode v2 respected</span>
        </div>
      </div>
    </section>
  );
}

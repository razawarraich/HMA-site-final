import { useEffect, useRef } from 'react';
import { Ez } from '../shared.jsx';
import { Sent, NotSent } from '../icons.jsx';
import { mountChart, drawSpendChart } from '../../lib/charts.js';

/* Edit KPI tiles, channel rows and the tracking plan here. */
const KPIS = [
  { label: 'Ad spend', count: '48200', pre: '$', val: '$48,200', delta: '▲ 9% vs. prior period' },
  { label: 'Conversions', count: '1268', val: '1,268', delta: '▲ 31%' },
  { label: 'CPA', count: '38.01', dec: '2', pre: '$', val: '$38.01', delta: '▼ 17%' },
  { label: 'ROAS', count: '3.8', dec: '1', suf: '×', val: '3.8×', delta: '▲ 22%', hl: true },
  { label: 'Conv. rate', count: '4.2', dec: '1', suf: '%', val: '4.2%', delta: '▲ 0.8 pts' },
  { label: 'Revenue', count: '183160', pre: '$', val: '$183,160', delta: '▲ 33%' },
];

const CHANNELS = [
  { cls: 'c-google', name: 'Google Ads', small: '659 conv · CPA $33.99 · ROAS 4.3×', share: '52%' },
  { cls: 'c-meta', name: 'Meta', small: '431 conv · CPA $40.14 · ROAS 3.6×', share: '34%' },
  { cls: 'c-tiktok', name: 'TikTok', small: '178 conv · CPA $47.75 · ROAS 2.9×', share: '14%' },
];

const PLAN = [
  { ev: 'page_view', when: 'Every page load', ga4: 1, ads: 0, capi: 1, tt: 1 },
  { ev: 'view_item', when: 'Product or service page viewed', ga4: 1, ads: 0, capi: 1, tt: 1 },
  { ev: 'generate_lead', when: 'Form submitted successfully', ga4: 1, ads: 1, adsPrimary: true, capi: 1, tt: 1 },
  { ev: 'qualified_lead', when: 'CRM stage changes to qualified (offline import)', ga4: 1, ads: 1, capi: 1, tt: 0 },
  { ev: 'purchase', when: 'Order or deal closed', ga4: 1, ads: 1, adsPrimary: true, capi: 1, tt: 1 },
];

const Flag = ({ on }) => (on ? <Sent /> : <NotSent />);

export default function TrackingDashboard() {
  const chartRef = useRef(null);
  useEffect(() => {
    const api = mountChart(chartRef.current, drawSpendChart);
    return () => api.destroy();
  }, []);

  return (
    <section className="section data" id="tracking" aria-labelledby="data-title" style={{ background: 'var(--white)' }}>
      <div className="container">
        <div className="sec-head data__head">
          <div className="sec-head__main">
            <p className="eyebrow">Data &amp; tracking</p>
            <h2 className="display h2--xl" id="data-title" data-split="">
              Don't Guess Where Your Growth <span className="accent">Comes From.</span>
            </h2>
          </div>
          <div className="sec-head__aside">
            <p className="lead">
              One reporting view that ties spend to conversions and revenue, by channel and by
              week, built on events you can verify.
            </p>
            <span className="sample-tag">Sample dashboard · demo data</span>
          </div>
        </div>

        <Ez>
          This is the kind of dashboard you get: money spent, sales made, and the cost of each
          sale — always up to date, always honest.
        </Ez>

        <div className="kpis" data-reveal="">
          {KPIS.map((k) => (
            <div className={`kpi${k.hl ? ' kpi--hl' : ''}`} key={k.label}>
              <span className="label">{k.label}</span>
              <span className="kpi__value" data-count={k.count} data-decimals={k.dec} data-prefix={k.pre} data-suffix={k.suf}>{k.val}</span>
              <span className="kpi__delta">{k.delta}</span>
            </div>
          ))}
        </div>

        <div className="dash" data-reveal="">
          <div className="dash__main">
            <div className="panel-head">
              <h3>Ad spend vs. conversions</h3>
              <div className="legend">
                <span><i className="sw-bar"></i>Ad spend (left)</span>
                <span><i className="sw-line"></i>Conversions (right)</span>
                <span className="label">Weekly · 12 weeks</span>
              </div>
            </div>
            <div className="chart" ref={chartRef} />
          </div>
          <div className="dash__side">
            <div className="panel-head"><h3>Conversions by channel</h3><span className="label">Share of 1,268</span></div>
            <div className="stack" role="img" aria-label="Google Ads 52%, Meta 34%, TikTok 14% of conversions">
              <span className="c-google" data-bar="" style={{ '--w': '52%' }}></span>
              <span className="c-meta" data-bar="" style={{ '--w': '34%' }}></span>
              <span className="c-tiktok" data-bar="" style={{ '--w': '14%' }}></span>
            </div>
            <div className="chan">
              {CHANNELS.map((c) => (
                <div className="chan__row" key={c.name}>
                  <i className={c.cls}></i>
                  <span><b>{c.name}</b><small>{c.small}</small></span>
                  <span className="share">{c.share}</span>
                </div>
              ))}
            </div>
            <div className="health">
              <span className="label">Tracking health</span>
              <div className="health__row"><span>purchase → GA4 · Ads · CAPI</span><span>matched</span></div>
              <div className="health__row"><span>Duplicate events</span><span>0 · event_id</span></div>
              <div className="health__row"><span>Consent Mode</span><span>v2 active</span></div>
            </div>
          </div>
        </div>

        <div className="matrix-wrap" data-reveal="">
          <div className="panel-head"><h3>Tracking plan</h3><span className="label">One definition per event, sent wherever it's needed</span></div>
          <div className="matrix-scroll">
            <table className="matrix">
              <caption className="sr-only">Which conversion events are sent to which platforms</caption>
              <thead>
                <tr>
                  <th scope="col">Event</th><th scope="col">Fires when</th><th scope="col">GA4</th>
                  <th scope="col">Google Ads</th><th scope="col">Meta CAPI</th><th scope="col">TikTok Events API</th>
                </tr>
              </thead>
              <tbody>
                {PLAN.map((r) => (
                  <tr key={r.ev}>
                    <td>{r.ev}</td>
                    <td>{r.when}</td>
                    <td><Flag on={r.ga4} /></td>
                    <td><Flag on={r.ads} />{r.adsPrimary && <span className="primary-tag">PRIMARY</span>}</td>
                    <td><Flag on={r.capi} /></td>
                    <td><Flag on={r.tt} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

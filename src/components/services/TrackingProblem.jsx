import { useState } from 'react';
import { Ez } from '../shared.jsx';

/* The leak diagram + "four answers" comparison, with the connect toggle in React state. */

const ANSWERS = [
  { name: 'Meta Ads Manager', val: '212', w: '100%' },
  { name: 'Google Ads', val: '188', w: '88.7%' },
  { name: 'GA4', val: '146', w: '68.9%' },
  { name: 'CRM · closed sales', val: '97', w: '45.8%', truth: true },
];

export default function TrackingProblem() {
  const [on, setOn] = useState(false);

  return (
    <section className="section" id="problem" aria-labelledby="problem-title" style={{ background: 'var(--mist)' }}>
      <div className="container">
        <div className="sec-head problem__head">
          <div className="sec-head__main">
            <p className="eyebrow">The problem we fix first</p>
            <h2 className="display h2 problem__title" id="problem-title" data-split="">
              Clicks are easy.Knowing what actually worked is harder. 
            </h2>
          </div>
          <div className="sec-head__aside">
            <p className="lead">
              Most accounts see the top of the funnel in detail and the bottom barely at all.
              Somewhere between the click and the sale, the signal breaks, and budget decisions
              get made on guesswork.
            </p>
          </div>
        </div>

        <Ez>
          Four tools can report four different sale counts for the same month. Your own sales
          list holds the truth — so we make every tool agree with it.
        </Ez>

        <div className="problem__body">
          <div className={`leak${on ? ' is-connected' : ''}`} id="leak">
            <div className="leak__top">
              <p className="label">Where visibility breaks · illustrative</p>
              <button
                className="toggle" type="button"
                aria-pressed={on}
                aria-controls="leak answers"
                onClick={() => setOn((v) => !v)}
              >
                <span className="toggle__track" aria-hidden="true"></span>
                <span className="toggle__text">{on ? 'Show it broken' : 'Connect the funnel'}</span>
              </button>
            </div>

            <div className="leak-row">
              <span className="leak-row__name">Impressions</span>
              <span className="leak-row__bar"><span data-bar="" style={{ '--w': '100%' }}></span></span>
              <span className="leak-row__val">1.24M<small>served</small></span>
            </div>
            <div className="leak-gap">
              <span></span><span className="leak-gap__line"></span>
              <p className="leak-gap__note"><b>CTR 1.48%</b>Ad platforms see this part clearly.</p>
            </div>

            <div className="leak-row">
              <span className="leak-row__name">Clicks</span>
              <span className="leak-row__bar"><span data-bar="" style={{ '--w': '80%' }}></span></span>
              <span className="leak-row__val">18,400<small>clicks</small></span>
            </div>
            <div className="leak-gap leak-gap--lossy">
              <span></span><span className="leak-gap__line"></span>
              <p className="leak-gap__note">
                <span className="issue"><b>−18% · click → session</b>Slow pages, redirects and consent banners lose visitors before analytics loads.</span>
                <span className="fix"><b>Gap measured</b>Consent Mode v2 and faster pages recover most of it.</span>
              </p>
            </div>

            <div className="leak-row">
              <span className="leak-row__name">Landing page</span>
              <span className="leak-row__bar"><span data-bar="" style={{ '--w': '64%' }}></span></span>
              <span className="leak-row__val">15,100<small>sessions</small></span>
            </div>
            <div className="leak-gap leak-gap--broken">
              <span></span><span className="leak-gap__line"><span className="leak-gap__x"></span></span>
              <p className="leak-gap__note">
                <span className="issue"><b>Signal lost</b>No conversion event fires on form submit, so leads never reach GA4 or the ad platforms.</span>
                <span className="fix"><b>generate_lead ✓</b>Fires on form success and is sent to GA4, Google Ads and Meta CAPI.</span>
              </p>
            </div>

            <div className="leak-row leak-row--unknown">
              <span className="leak-row__name">Leads</span>
              <span className="leak-row__bar"><span data-bar="" style={{ '--w': '44%' }}></span></span>
              <span className="leak-row__val"><span className="v-unknown">?</span><span className="v-known">612</span><small>leads</small></span>
            </div>
            <div className="leak-gap leak-gap--broken">
              <span></span><span className="leak-gap__line"><span className="leak-gap__x"></span></span>
              <p className="leak-gap__note">
                <span className="issue"><b>Signal lost</b>Leads aren't matched back to the click: no gclid or fbclid is stored in the CRM.</span>
                <span className="fix"><b>Offline import ✓</b>Click IDs are stored with each lead, and closed deals flow back to Google and Meta.</span>
              </p>
            </div>

            <div className="leak-row leak-row--unknown">
              <span className="leak-row__name">Sales</span>
              <span className="leak-row__bar"><span data-bar="" style={{ '--w': '26%' }}></span></span>
              <span className="leak-row__val"><span className="v-unknown">?</span><span className="v-known">97</span><small>closed sales</small></span>
            </div>
          </div>

          <div className={`answers${on ? ' is-connected' : ''}`} id="answers">
            <h3 className="display answers__title">Four tools.<br /> Four different answers.</h3>
            <p className="label">Conversions reported · same month, same campaigns · illustrative</p>
            <div className="answers__list">
              {ANSWERS.map((a) => (
                <div className={`answer${a.truth ? ' answer--truth' : ''}`} key={a.name}>
                  <div className="answer__meta">
                    <span>{a.name}{a.truth && <span className="answer__tag"> · source of truth</span>}</span>
                    <span className="mono">{a.val}</span>
                  </div>
                  <div className="answer__bar"><span data-bar="" style={{ '--w': a.w }}></span></div>
                </div>
              ))}
            </div>
            <p className="answers__cap">
              Each platform counts with its own attribution window and model, and each one takes
              credit. When budgets move on numbers nobody can reconcile, the campaigns that
              actually drive sales are often the ones that get cut.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

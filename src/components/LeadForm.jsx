import { useRef, useState } from 'react';
import { Arrow } from './icons.jsx';

/**
 * Strategy-call form. `variant="compact"` = the short home version;
 * `variant="full"` = the contact-page qualification form.
 *
 * Wiring it to a backend later: set VITE_CONTACT_ENDPOINT in .env and the
 * form POSTs its fields there as JSON. Without it, the form shows the
 * design-sample confirmation (nothing is sent).
 */
export default function LeadForm({ variant = 'compact' }) {
  const formRef = useRef(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState('');
  const full = variant === 'full';

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const data = Object.fromEntries(new FormData(form).entries());
    data.interest = Array.from(form.querySelectorAll('input[name="interest"]:checked')).map((i) => i.value);

    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
    if (endpoint) {
      setSending(true);
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('bad status');
        setDone('Thanks! Your request is in — we reply within one working day.');
        setSent(true);
      } catch {
        setDone('Something went wrong sending the form. Please email us instead — the address is on this page.');
      } finally {
        setSending(false);
      }
      return;
    }

    setDone('Thanks! This site is a design sample, so nothing was sent yet — on the live site this request goes straight to the HMA team.');
    setSent(true);
  };

  return (
    <form className={`form${sent ? ' is-sent' : ''}`} ref={formRef} noValidate onSubmit={onSubmit}>
      <h3>Request your strategy call</h3>

      {full ? (
        <div className="field-row">
          <div className="field"><label htmlFor="f-name">Name</label><input id="f-name" name="name" type="text" autoComplete="name" required /></div>
          <div className="field"><label htmlFor="f-email">Work email</label><input id="f-email" name="email" type="email" autoComplete="email" required /></div>
        </div>
      ) : (
        <>
          <div className="field"><label htmlFor="f-name">Name</label><input id="f-name" name="name" type="text" autoComplete="name" required /></div>
          <div className="field"><label htmlFor="f-email">Work email</label><input id="f-email" name="email" type="email" autoComplete="email" required /></div>
        </>
      )}

      {full && (
        <div className="field-row">
          <div className="field"><label htmlFor="f-company">Business name</label><input id="f-company" name="company" type="text" autoComplete="organization" /></div>
          <div className="field"><label htmlFor="f-site">Website</label><input id="f-site" name="website" type="text" inputMode="url" placeholder="yourcompany.com" autoComplete="url" /></div>
        </div>
      )}

      <div className="field-row">
        {!full && (
          <div className="field"><label htmlFor="f-site">Website</label><input id="f-site" name="website" type="text" inputMode="url" placeholder="yourcompany.com" autoComplete="url" /></div>
        )}
        <div className="field">
          <label htmlFor="f-spend">Monthly ad spend</label>
          <select id="f-spend" name="spend" defaultValue="$5,000 – $20,000">
            {full && <option>Not advertising yet</option>}
            <option>Under $2,000</option>
            <option>$2,000 – $5,000</option>
            <option>$5,000 – $10,000</option>
            <option>$20,000+</option>
          </select>
        </div>
        {full && (
          <div className="field">
            <label htmlFor="f-challenge">Biggest challenge right now</label>
            <select id="f-challenge" name="challenge" defaultValue="Ads cost too much">
              <option>Ads cost too much</option>
              <option>Not enough leads</option>
              <option>Leads don’t turn into sales</option>
              <option>Can’t see what’s working</option>
              <option>Reports are confusing</option>
              <option>Something else</option>
            </select>
          </div>
        )}
      </div>

      {full && (
        <>
          <fieldset className="field checks-field">
            <legend>What are you interested in?</legend>
            <div className="checks">
              <label className="check"><input type="checkbox" name="interest" value="paid-ads" defaultChecked /> Paid ads</label>
              <label className="check"><input type="checkbox" name="interest" value="tracking" /> Tracking &amp; analytics</label>
              <label className="check"><input type="checkbox" name="interest" value="cro" /> Better pages (CRO)</label>
              <label className="check"><input type="checkbox" name="interest" value="strategy" /> The plan (strategy)</label>
            </div>
          </fieldset>
          <div className="field">
            <label htmlFor="f-method">How should we contact you?</label>
            <select id="f-method" name="method" defaultValue="Email">
              <option>Email</option>
              <option>Phone call</option>
              <option>WhatsApp</option>
              <option>Video call</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-msg">Anything else we should know?</label>
            <textarea id="f-msg" name="message" rows="4" placeholder="What you sell, who buys it, what’s been frustrating you…" />
          </div>
        </>
      )}

      <button className="btn btn--primary" type="submit" disabled={sent || sending}>
        {sending ? 'Sending…' : 'Book a Strategy Call'}
        <Arrow />
      </button>
           <p className="form__done" role="status" aria-live="polite">{done}</p>
    </form>
  );
}

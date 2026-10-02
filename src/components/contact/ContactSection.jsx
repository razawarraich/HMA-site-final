import { useEffect, useRef } from 'react';
import LeadForm from '../LeadForm.jsx';
import { initCtaWaves } from '../../lib/waveField.js';

/* Edit the contact details here. The email is a placeholder until the
   real inbox exists — see README. */
const INFO = [
  { label: 'Email', value: 'hmaglobalsolutions@gmail.com' },
  { label: 'Response time', value: 'Within one working day' },
  { label: 'Prefer to chat first?', value: 'Choose WhatsApp in the form' },
];

export default function ContactSection() {
  const canvasRef = useRef(null);
  useEffect(() => initCtaWaves(canvasRef.current), []);

  return (
    <section className="section cta on-dark" id="contact" aria-labelledby="cta-title">
      <canvas className="cta__canvas" ref={canvasRef} aria-hidden="true" />
      <div className="container cta__grid">
        <div className="cta__main">
          <p className="eyebrow">Book a strategy call</p>
          <h2 className="display cta__title" id="cta-title" data-split="">Free. Honest. 30 minutes.</h2>
          <p className="lead">
            This is not a sales pitch with slides. It is a working session about your ads, your
            tracking and your money.
          </p>
          <ul className="cta__list">
            <li>We reply within one working day</li>
            <li>We review your ad accounts and tracking before the call</li>
            <li>You get the biggest opportunities we see, ranked by impact</li>
            <li>You keep the notes and ideas, whether or not we work together</li>
          </ul>
          <div className="contact-info">
            {INFO.map((i) => (
              <div className="contact-info__row" key={i.label}>
                <span className="label">{i.label}</span><b>{i.value}</b>
              </div>
            ))}
          </div>
        </div>

        <LeadForm variant="full" />
      </div>
    </section>
  );
}

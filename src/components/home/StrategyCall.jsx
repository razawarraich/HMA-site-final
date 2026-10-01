import { useEffect, useRef } from 'react';
import LeadForm from '../LeadForm.jsx';
import { initCtaWaves } from '../../lib/waveField.js';

export default function StrategyCall() {
  const canvasRef = useRef(null);
  useEffect(() => initCtaWaves(canvasRef.current), []);

  return (
    <section
      className="section cta on-dark"
      id="contact"
      aria-labelledby="cta-title"
      style={{ borderTop: '1px solid var(--line-dark)' }}
    >
      <canvas className="cta__canvas" ref={canvasRef} aria-hidden="true" />
      <div className="container cta__grid">
        <div className="cta__main">
          <p className="eyebrow">Book a strategy call</p>
          <h2 className="display cta__title" id="cta-title" data-split="">
            Your marketing should tell you exactly what's working.
          </h2>
          <p className="lead">
            In a 30-minute call we look at your ad accounts and tracking together, and show you
            where the data breaks and where spend is leaking.
          </p>
          <ul className="cta__list">
            <li>A review of your ad accounts and tracking setup</li>
            <li>The biggest opportunities we see, ranked by impact</li>
            <li>A clear next step, whether or not you work with us</li>
          </ul>
        </div>

        <LeadForm variant="compact" />
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Arrow } from '../icons.jsx';
import { initHero } from '../../lib/waveField.js';

export default function Hero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => initHero(heroRef.current, canvasRef.current, contentRef.current), []);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title" ref={heroRef}>
      <canvas className="hero__canvas" ref={canvasRef} aria-hidden="true" />
      <div className="container">
        <div className="hero__content" ref={contentRef}>
          <p className="eyebrow intro intro--1">Performance Marketing &amp; Growth</p>
          <h1 className="display hero__title intro intro--2" id="hero-title">
            Turn Ad Spend<br /> Into <span className="accent">Measurable</span><br /> Growth.
          </h1>
          <p className="lead hero__lead intro intro--3">
            We run your ads. We count every lead and sale they bring. Then we use those numbers
            to grow your business. Simple as that, and every dollar you spend can be traced to
            what it earned you.
          </p>
          <div className="hero__ctas intro intro--4">
            <Link className="btn btn--primary" to="/contact">
              Book a Strategy Call
              <Arrow />
            </Link>
            <a className="btn btn--ghost" href="#services">Explore Our Services</a>
          </div>
          <ul className="hero__stack intro intro--5" aria-label="Platforms and tools we work with">
            <li className="label">Built on</li>
            <li>Google Ads</li>
            <li>Meta Ads</li>
            <li>GA4</li>
            <li>GTM</li>
            <li>Conversion Tracking</li>
          </ul>
        </div>
      </div>

      <div className="hero__chips" aria-hidden="true">
        <span className="ev-chip" data-u="0.71" data-lift="58"><i></i>page_view <em>→ GA4</em></span>
        <span className="ev-chip" data-u="0.845" data-lift="62"><i></i>generate_lead <em>→ Ads · CAPI</em></span>
        <span className="ev-chip" data-u="0.965" data-lift="54" data-anchor="right"><i></i>purchase <b>$148.00</b></span>
      </div>

      <div className="hero__axis" aria-hidden="true">
        <div className="axis-tick axis-tick--first" style={{ left: '4%' }}><b>DATA</b><span>signals</span></div>
        <div className="axis-tick" style={{ left: '34%' }}><b>TRAFFIC</b><span>sessions</span></div>
        <div className="axis-tick" style={{ left: '62%' }}><b>CONVERSIONS</b><span>events</span></div>
        <div className="axis-tick axis-tick--last" style={{ left: '96%' }}><b>GROWTH</b><span>revenue</span></div>
      </div>
    </section>
  );
}

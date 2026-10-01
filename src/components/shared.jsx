/* Small shared layout blocks used across pages. */
import { Link } from 'react-router-dom';
import { Arrow } from './icons.jsx';

/** Section heading: eyebrow + big title + aside lead (+ optional sample tag). */
export function SectionHead({ eyebrow, title, titleId, aside, sampleTag, titleClass = 'h2' }) {
  return (
    <div className="sec-head">
      <div className="sec-head__main">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className={`display ${titleClass}`} id={titleId} data-split="">{title}</h2>
      </div>
      <div className="sec-head__aside">
        <p className="lead">{aside}</p>
        {sampleTag && <span className="sample-tag">{sampleTag}</span>}
      </div>
    </div>
  );
}

/** "In plain words" note. */
export function Ez({ children, dark = false, style }) {
  return (
    <p className={`ez${dark ? ' ez--dark' : ''}`} style={style}>
      <b>In plain words</b>
      {children}
    </p>
  );
}

/** Inner-page hero. */
export function PageHero({ crumb, title, lead, note }) {
  return (
    <section className="page-hero" aria-labelledby="ph-title">
      <div className="container">
        <p className="eyebrow">{crumb}</p>
        <h1 className="display h2 page-hero__title" id="ph-title" data-split="">{title}</h1>
        <p className="lead page-hero__lead">{lead}</p>
        {note && <p className="page-hero__note label">{note}</p>}
      </div>
    </section>
  );
}

/** Dark "Next step" band used on inner pages. */
export function CtaStrip({ title, sub, button = 'Book a Strategy Call' }) {
  return (
    <section className="section cta-strip on-dark" aria-labelledby="strip-title">
      <div className="container cta-strip__in">
        <div>
          <p className="eyebrow">Next step</p>
          <h2 className="display h2 cta-strip__title" id="strip-title" data-split="">{title}</h2>
          <p className="lead">{sub}</p>
        </div>
        <Link className="btn btn--primary" to="/contact">
          {button}
          <Arrow />
        </Link>
      </div>
    </section>
  );
}

/** Duotone/cool photo figure. */
export function Photo({ src, alt, cap, variant = 'duo', className = '', width, height }) {
  return (
    <figure className={`photo photo--${variant} ${className}`.trim()}>
      <img src={src} alt={alt} loading="lazy" width={width} height={height} />
      {cap && <figcaption className="photo__cap">{cap}</figcaption>}
    </figure>
  );
}

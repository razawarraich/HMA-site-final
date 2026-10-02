import { Photo } from '../shared.jsx';
import { PrincipleGlyph } from '../icons.jsx';

/* The five principles — shared with the About page via this export. */
export const PRINCIPLES = [
  {
    title: 'Measurement comes first.',
    text: 'We verify tracking before we touch budgets. Optimizing on bad data only scales the mistake.',
  },
  {
    title: 'Revenue over vanity metrics.',
    text: 'Campaigns are optimized to qualified leads, sales and revenue, not clicks or impressions.',
  },
  {
    title: 'Every test has a hypothesis.',
    text: 'Creative, audience and landing page tests are planned, documented and read to significance.',
  },
  {
    title: 'Reporting in plain language.',
    text: "What happened, why it happened, and what we're changing next. No forty-page decks.",
  },
  {
    title: 'Your accounts, your data.',
    text: 'Ad accounts, pixels, tag containers and dashboards stay in your ownership.',
  },
];

export function PrinciplesList({ items = PRINCIPLES, style }) {
  return (
    <ul className="principles" style={style}>
      {items.map((p) => (
        <li className="principle" key={p.title}>
          <PrincipleGlyph />
          <div>
            <h3 className="display h3">{p.title}</h3>
            <p>{p.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="section" id="why" aria-labelledby="why-title">
      <div className="container why">
        <div className="why__media" data-reveal="">
          <Photo
            src="/img/team-office.jpg"
            alt="A marketing team talking through work at their desks in an open office"
            variant="cool"
            className="why__photo"
            width="1500" height="1125"
          />
          <div className="why__stamp"><span className="label">Our rule</span><b>Tracking before scaling.</b></div>
        </div>

        <div>
          <div className="why__intro">
            <p className="eyebrow">Why choose us</p>
            <h2 className="display h2" id="why-title" data-split="">
              We'd rather show you the numbers than tell you we're great.
            </h2>
            <p className="lead">
              Plenty of agencies promise growth. We promise proof. These five rules shape every
              account we touch and they are why clients stay.
            </p>
          </div>
          <PrinciplesList />
        </div>
      </div>
    </section>
  );
}

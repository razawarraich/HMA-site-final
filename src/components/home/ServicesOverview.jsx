import { Link } from 'react-router-dom';
import { SectionHead } from '../shared.jsx';
import { Arrow } from '../icons.jsx';

/* Edit the four service cards here. `to` deep-links into the Services page. */
const CARDS = [
  {
    n: '01', title: 'Paid Ads', to: '/services#paid-media',
    text: 'We run your ads on Google, Facebook, Instagram, TikTok and LinkedIn. The right people see them, so less money is wasted.',
    get: 'More customers for the same budget',
  },
  {
    n: '02', title: 'Tracking & Analytics', to: '/services#analytics',
    text: "We count every click, every lead and every sale. You always know which ad made you money and which one didn't.",
    get: 'One clear number you can trust',
  },
  {
    n: '03', title: 'Better Pages', to: '/services#cro',
    text: 'We improve the page people land on after the click. Faster loading, clearer words, shorter forms so more visitors buy.',
    get: 'More sales from the visitors you already have',
  },
  {
    n: '04', title: 'The Plan', to: '/services#strategy',
    text: 'We decide where your money should go and why. We test new ideas every week and keep only the winners.',
    get: 'A weekly report you actually understand',
  },
];

export default function ServicesOverview() {
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHead
          eyebrow="What we do"
          titleId="services-title"
          title="Four jobs. One goal: more sales."
          aside="Each job helps the others. Ads bring people in. Good pages turn them into buyers. Tracking counts the money. The plan keeps everything moving the right way."
        />

        <div className="svcs-simple" data-reveal="">
          {CARDS.map((c) => (
            <Link className="svc-card" to={c.to} key={c.n}>
              <div className="svc-card__top">
                <span className="svc-card__num">{c.n}</span>
                <span className="svc-card__go" aria-hidden="true"><Arrow /></span>
              </div>
              <h3 className="display h3">{c.title}</h3>
              <p>{c.text}</p>
              <span className="svc-card__get"><b>You get</b>{c.get}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

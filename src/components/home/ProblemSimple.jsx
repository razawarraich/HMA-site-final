import { Link } from 'react-router-dom';
import { SectionHead } from '../shared.jsx';
import { Arrow } from '../icons.jsx';

/* Edit the four pains here — the layout takes care of itself. */
const PAINS = [
  {
    n: '01', title: 'Ads cost too much',
    text: 'You pay for every single click. When the wrong people click, that money is gone  and it bought you nothing.',
  },
  {
    n: '02', title: 'The wrong people click',
    text: 'Lots of visitors, very few buyers. Your website looks busy, but the cash register stays quiet.',
  },
  {
    n: '03', title: "You can't see what worked",
    text: 'A sale happens great! But which ad caused it? If you don’t know, you might switch off your best ad by mistake.',
  },
  {
    n: '04', title: 'Reports are confusing',
    text: 'Long charts. Big words. And still no answer to the only question that matters: “Did we make money?”',
  },
];

export default function ProblemSimple() {
  return (
    <section className="section" id="problem" aria-labelledby="problem-title" style={{ background: 'var(--mist)' }}>
      <div className="container">
        <div className="sec-head">
          <div className="sec-head__main">
            <p className="eyebrow">The problem</p>
            <h2 className="display h2 problem__title" id="problem-title" data-split="">
              You pay for ads.Do you know what you get back?
            </h2>
          </div>
          <div className="sec-head__aside">
            <p className="lead">
              Most businesses can't answer that. Money goes out, some sales come in, and nobody
              is sure which ad did the work. Here are the four ways it goes wrong.
            </p>
          </div>
        </div>

        <div className="pains" data-reveal="">
          {PAINS.map((p) => (
            <article className="pain" key={p.n}>
              <span className="pain__num">{p.n}</span>
              <h3 className="display h3">{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>

        <div className="pains__close">
          <p className="lead" style={{ maxWidth: '62ch' }}>
            HMA fixes all four. We aim your ads at the right people, count every sale, make your
            pages work harder, and report it in words you actually use.
          </p>
          <Link className="btn btn--primary" to="/services">
            See how we fix it
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

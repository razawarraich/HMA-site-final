import { SectionHead } from '../shared.jsx';

/* Edit the four explainers here. The `id` is the deep-link target
   used by the home page cards and the footer (e.g. /services#analytics). */
export const EXPLAINERS = [
  {
    id: 'paid-media', n: '01', title: 'Paid Ads',
    sub: 'Google · Meta · TikTok · LinkedIn · Microsoft',
    what: 'We make and run the ads you pay for on Google, Facebook, Instagram, TikTok and LinkedIn.',
    problem: 'Ads shown to the wrong people burn money. We aim yours at people who actually want what you sell.',
    how: 'Small tests first. We find what works, prove it with numbers, then put more money behind the winners.',
    get: 'More leads and sales for the same budget and a clear report every week.',
  },
  {
    id: 'analytics', n: '02', title: 'Tracking & Analytics',
    sub: 'GTM · GA4 · Meta Pixel & CAPI · Offline imports',
    what: 'We set up the tools that count every click, every lead and every sale correctly.',
    problem: "Without honest counting you're guessing. Good ads get switched off. Bad ads keep spending.",
    how: 'One counting system across every platform, tested until all the numbers agree with your sales list.',
    get: 'One dashboard with numbers you can trust and bet money on.',
  },
  {
    id: 'cro', n: '03', title: 'Better Pages',
    sub: 'Landing pages · A/B tests · Forms · Page speed',
    what: 'We improve the pages people land on after they click your ad.',
    problem: 'If the page is slow or confusing, people leave and the click you paid for is wasted.',
    how: 'We show two versions of a page to real visitors, keep the winner, then test again. Every change is proven.',
    get: 'More buyers from the visitors you already have without spending more on ads.',
  },
  {
    id: 'strategy', n: '04', title: 'The Plan',
    sub: 'Audits · Budgets · Testing · Weekly reporting',
    what: 'We plan where your money goes, and why then check the plan against real numbers every week.',
    problem: 'Without a plan, budgets follow feelings. With one, they follow results.',
    how: "Audit first. Then a weekly loop: test, measure, keep what works, cut what doesn't.",
    get: "A one-page weekly summary: what we did, what happened, and what's next.",
  },
];

const COLS = [
  ['What it is', 'what'],
  ['The problem it fixes', 'problem'],
  ['How we do it', 'how'],
  ['What you get', 'get'],
];

export default function ServiceExplainers() {
  return (
    <section className="section" id="explained" aria-labelledby="sx-title" style={{ background: 'var(--mist)' }}>
      <div className="container">
        <SectionHead
          eyebrow="Explained simply"
          titleId="sx-title"
          title="Each service, in plain words."
          aside="No jargon here. For each service: what it is, the problem it fixes, how we do it, and what you walk away with."
        />

        {EXPLAINERS.map((s) => (
          <article className="sx" id={s.id} key={s.id} data-reveal="">
            <header className="sx__head">
              <span className="sx__num">{s.n}</span>
              <div>
                <h3 className="display h3">{s.title}</h3>
                <span className="sx__sub">{s.sub}</span>
              </div>
            </header>
            <div className="sx__cols">
              {COLS.map(([label, key]) => (
                <div className="sx__col" key={key}>
                  <span className="label">{label}</span>
                  <p>{s[key]}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

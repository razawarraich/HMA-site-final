import { useEffect, useRef } from 'react';
import { SectionHead, Photo } from '../shared.jsx';
import { PrinciplesList } from '../home/WhyChooseUs.jsx';
import { initSteps } from '../../lib/flows.js';

/* ---------- Why we exist ---------- */
export function AboutStory() {
  return (
    <section className="section" id="story" aria-labelledby="story-title">
      <div className="container why">
        <div className="why__media" data-reveal="">
          <Photo
            src="/img/creative-desk.jpg"
            alt="Overhead view of a marketer working at a laptop on a wooden desk"
            variant="cool"
            className="why__photo"
            width="1500" height="1151"
          />
          <div className="why__stamp"><span className="label">Our rule</span><b>Measure first. Then spend.</b></div>
        </div>
        <div>
          <div className="why__intro">
            <p className="eyebrow">Why we exist</p>
            <h2 className="display h2" id="story-title" data-split="">
              Too many businesses pay for ads and get silence back.
            </h2>
            <p className="lead">
              Ad platforms make it very easy to spend money. They do not make it easy to know
              what you got for it.
            </p>
          </div>
          <div className="story__prose">
            <p>
              Dashboards disagree with each other. Reports are full of words nobody uses in real
              life. And when results are unclear, businesses do one of two things: they keep
              wasting money, or they get scared and stop growing. Both are bad endings.
            </p>
            <p>
              We started HMA Global Solutions to fix that. Our rule is simple: <b>measure first,
              then spend.</b> When you can see exactly which ad brings customers, growing stops
              feeling like gambling and starts feeling like a plan.
            </p>
            <p>
              We work with numbers, but we speak in plain language. If something works, we show
              you. If something fails, we tell you — and we tell you what we're changing because
              of it. Your accounts, your data and your dashboards stay yours, always.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Working with us, step by step ---------- */
const WORK_STEPS = [
  {
    n: '01', title: 'We talk',
    text: 'A free 30-minute call. You tell us about your business. We look at your ads and tracking before the call, so we come with real observations — not a sales pitch.',
    out: ['Honest first impressions', 'A clear next step'],
  },
  {
    n: '02', title: 'We check everything',
    text: "We audit your ad accounts, your tracking and your pages. You get a list of what's broken, what it's costing you, and what we'd fix first.",
    out: ['A ranked problem list', 'A price for fixing it'],
  },
  {
    n: '03', title: 'We fix, then build',
    text: 'Tracking first, so the numbers are true. Then better campaigns and better pages, built on data everyone can trust.',
    out: ['Honest numbers', 'Rebuilt campaigns'],
  },
  {
    n: '04', title: 'We report every week',
    text: "One page, in plain words: what we did, what happened, what's next. And you own every account, pixel and dashboard — forever.",
    out: ['A weekly summary', 'Full ownership'],
  },
];

export function WorkingSteps() {
  const ref = useRef(null);
  useEffect(() => initSteps(ref.current), []);

  return (
    <section className="section" id="working" aria-labelledby="working-title" style={{ background: 'var(--mist)' }}>
      <div className="container">
        <SectionHead
          eyebrow="Working with us"
          titleId="working-title"
          title="What it's like, step by step."
          aside="No long contracts, no mystery. This is the whole journey, from first hello to weekly results."
        />

        <ol className="steps" ref={ref} style={{ marginTop: 'clamp(32px,4vw,56px)' }}>
          {WORK_STEPS.map((s) => (
            <li className="step" key={s.n}>
              <span className="step__node" aria-hidden="true">{s.n}</span>
              <h3 className="display step__title h3">{s.title}</h3>
              <p>{s.text}</p>
              <div className="step__out">
                <span>You get →</span>
                {s.out.map((o) => <span key={o}>{o}</span>)}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Five rules ---------- */
const ABOUT_PRINCIPLES = [
  { title: 'Measurement comes first.', text: 'We check the counting before we touch budgets. Spending more on bad data only makes the mistake bigger.' },
  { title: 'Revenue over vanity numbers.', text: "Likes and clicks don't pay salaries. We optimize for leads, sales and revenue — the numbers that do." },
  { title: 'Every test has a reason.', text: 'Before we try something, we write down what we expect. Then the numbers tell us if we were right.' },
  { title: 'Reports in plain language.', text: "What happened, why it happened, what we're changing next. No forty-page decks. Ever." },
  { title: 'Your accounts stay yours.', text: 'Ad accounts, pixels, tags and dashboards live in your name. If we ever part ways, everything stays with you.' },
];

export function Principles() {
  return (
    <section className="section" id="principles" aria-labelledby="principles-title">
      <div className="container">
        <SectionHead
          eyebrow="How we think"
          titleId="principles-title"
          title="Five rules we never break."
          aside="Every agency says they're different. Rules are easier to judge than promises — here are ours."
        />
        <PrinciplesList items={ABOUT_PRINCIPLES} style={{ maxWidth: 980 }} />
      </div>
    </section>
  );
}

import { usePageMeta } from '../hooks/usePageMeta.js';
import { usePageFx } from '../hooks/usePageFx.js';
import { PageHero, CtaStrip } from '../components/shared.jsx';
import { AboutStory, WorkingSteps, Principles } from '../components/about/AboutSections.jsx';

export default function About() {
  usePageMeta(
    'About — HMA Global Solutions',
    'Who HMA is, why we exist, how we work with clients, and the five rules we never break. Performance marketing explained in plain words.'
  );
  usePageFx();

  return (
    <>
      <PageHero
        crumb="About HMA"
        title={<>We help you stop <span className="accent">guessing.</span></>}
        lead="HMA Global Solutions is a performance marketing agency. That is a long name for a simple job: we run your ads, we count the results, and we make the numbers grow."
      />
      <AboutStory />
      <WorkingSteps />
      <Principles />
      <CtaStrip
        title="Ready when you are."
        sub="A free 30-minute call. No pressure, no jargon — just honest answers about your ads."
      />
    </>
  );
}

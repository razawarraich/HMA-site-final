import { usePageMeta } from '../hooks/usePageMeta.js';
import { usePageFx } from '../hooks/usePageFx.js';
import { PageHero, CtaStrip } from '../components/shared.jsx';
import Results from '../components/cases/Results.jsx';
import CaseStudy from '../components/cases/CaseStudy.jsx';
import CreativeTesting from '../components/cases/CreativeTesting.jsx';

export default function CaseStudies() {
  usePageMeta(
    'Case Studies — HMA Global Solutions',
    'How a performance marketing engagement unfolds: the problem, the plan, the weekly work and the numbers — shown step by step.'
  );
  usePageFx();

  return (
    <>
      <PageHero
        crumb="Case Studies"
        title={<>Proof beats <span className="accent">promises.</span></>}
        lead="We show our work the way we run it: the problem first, then the plan, then the numbers. Everything below uses clearly-labelled sample data — your real results would be measured the same honest way."
      />
      <Results />
      <CaseStudy />
      <CreativeTesting />
      <CtaStrip
        title="Want numbers like these — but real, and yours?"
        sub="Your account, measured properly, for 90 days. Let's see what it can do."
      />
    </>
  );
}

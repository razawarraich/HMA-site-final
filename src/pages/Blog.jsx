import { usePageMeta } from '../hooks/usePageMeta.js';
import { usePageFx } from '../hooks/usePageFx.js';
import { PageHero, CtaStrip } from '../components/shared.jsx';
import BlogSection from '../components/blog/BlogSection.jsx';

export default function Blog() {
  usePageMeta(
    'Blog — HMA Global Solutions',
    'Short, plain-language guides on Google Ads, Meta Ads, TikTok, LinkedIn, tracking, CRO and growth strategy.'
  );
  usePageFx();

  return (
    <>
      <PageHero
        crumb="Blog"
        title={<>Learn how ads <span className="accent">really</span> work.</>}
        lead="Short guides in plain words. No jargon, no fluff — just things that help you spend smarter and grow faster."
        note="New guides are being written now. The structure below is live — articles land here as they're finished."
      />
      <BlogSection />
      <CtaStrip
        title="Rather have the answers done for you?"
        sub="Reading is free. So is the strategy call — and it comes with your own numbers."
      />
    </>
  );
}

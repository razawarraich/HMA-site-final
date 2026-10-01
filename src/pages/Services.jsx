import { usePageMeta } from '../hooks/usePageMeta.js';
import { usePageFx } from '../hooks/usePageFx.js';
import { PageHero, CtaStrip } from '../components/shared.jsx';
import ServiceExplainers from '../components/services/ServiceExplainers.jsx';
import ServicesShowcase from '../components/services/ServicesShowcase.jsx';
import TrackingProblem from '../components/services/TrackingProblem.jsx';
import TrackingDashboard from '../components/services/TrackingDashboard.jsx';

export default function Services() {
  usePageMeta(
    'Services — HMA Global Solutions',
    'Paid ads, tracking & analytics, better landing pages and a clear growth plan — each service explained in plain words, then shown in action.'
  );
  usePageFx();

  return (
    <>
      <PageHero
        crumb="Services"
        title={<>Four jobs. One goal: <span className="accent">more sales.</span></>}
        lead="We run your ads, count your results, improve your pages and plan your growth. Here is each piece — first in plain words, then shown in action."
      />
      <ServiceExplainers />
      <ServicesShowcase />
      <TrackingProblem />
      <TrackingDashboard />
      <CtaStrip
        title="Not sure which service you need?"
        sub="That's normal — most businesses need a mix. Book a free call and we'll tell you honestly what would help first."
      />
    </>
  );
}

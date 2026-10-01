import { usePageMeta } from '../hooks/usePageMeta.js';
import { usePageFx } from '../hooks/usePageFx.js';
import Hero from '../components/home/Hero.jsx';
import Ecosystem from '../components/home/Ecosystem.jsx';
import ProblemSimple from '../components/home/ProblemSimple.jsx';
import ServicesOverview from '../components/home/ServicesOverview.jsx';
import HowWeWork from '../components/home/HowWeWork.jsx';
import WhyChooseUs from '../components/home/WhyChooseUs.jsx';
import Platforms from '../components/home/Platforms.jsx';
import FunnelSection from '../components/home/FunnelSection.jsx';
import StrategyCall from '../components/home/StrategyCall.jsx';

export default function Home() {
  usePageMeta(
    'HMA Global Solutions — Performance Marketing & Growth',
    'HMA runs your ads, counts every sale they bring, and grows your business with proof. Paid ads, tracking, better pages and a clear plan — in plain words.'
  );
  usePageFx();

  return (
    <>
      <Hero />
      <Ecosystem />
      <ProblemSimple />
      <ServicesOverview />
      <HowWeWork />
      <WhyChooseUs />
      <Platforms />
      <FunnelSection />
      <StrategyCall />
    </>
  );
}

import { usePageMeta } from '../hooks/usePageMeta.js';
import { usePageFx } from '../hooks/usePageFx.js';
import { PageHero } from '../components/shared.jsx';
import ContactSection from '../components/contact/ContactSection.jsx';

export default function Contact() {
  usePageMeta(
    'Contact — HMA Global Solutions',
    'Book a free 30-minute strategy call. We review your ads and tracking first, then show you where spend is leaking and what to fix.'
  );
  usePageFx();

  return (
    <>
      <PageHero
        crumb="Contact"
        title={<>Let's look at your ads <span className="accent">together.</span></>}
        lead="Tell us a little about your business. We will study your ads and your tracking before we call, so the 30 minutes are all about you — not about us."
      />
      <ContactSection />
    </>
  );
}

import { SectionHead } from '../shared.jsx';

/* Edit the platform tiles here. */
const PLATFORMS = [
  { g: 'G', name: 'Google Ads', small: 'Ads in search results and on YouTube' },
  { g: 'M', name: 'Meta Ads', small: 'Facebook and Instagram' },
  { g: 'T', name: 'TikTok Ads', small: 'Short video ads' },
  { g: 'in', name: 'LinkedIn Ads', small: 'Reach other businesses' },
  { g: 'MS', name: 'Microsoft Ads', small: 'Ads on Bing search' },
  { g: 'GA', name: 'GA4', small: 'Counts what visitors do' },
  { g: '{ }', name: 'Google Tag Manager', small: 'Connects all the data' },
  { g: 'PX', name: 'Meta Pixel & CAPI', small: 'Tells Meta which ads sold' },
];

export default function Platforms() {
  return (
    <section className="section" id="platforms" aria-labelledby="plat-title" style={{ background: 'var(--mist)' }}>
      <div className="container">
        <SectionHead
          eyebrow="Platforms we work with"
          titleId="plat-title"
          title="We go where your customers already are."
          aside="Your customers are on Google, Facebook, Instagram, TikTok and LinkedIn every day. We put your ads there and we use trusted tools to count the results."
        />

        <div className="plats" data-reveal="">
          {PLATFORMS.map((p) => (
            <div className="eco-node" key={p.name}>
              <span className="eco-node__glyph">{p.g}</span>
              <span>{p.name}<small>{p.small}</small></span>
            </div>
          ))}
        </div>
        <p className="plats__note label">We set these up for you and you own every account, forever.</p>
      </div>
    </section>
  );
}

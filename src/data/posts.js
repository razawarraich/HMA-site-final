/* Blog articles. To publish a real post: set `soon: false`, add `href`
   (or wire a /blog/:slug route later — the data shape already supports it). */

export const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'google-ads', label: 'Google Ads' },
  { key: 'meta-ads', label: 'Meta Ads' },
  { key: 'tiktok', label: 'TikTok' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'tracking', label: 'Tracking' },
  { key: 'cro', label: 'CRO' },
  { key: 'strategy', label: 'Strategy' },
  { key: 'growth', label: 'Growth' },
];

export const FEATURED = {
  slug: 'do-your-ads-make-money',
  cat: 'tracking', catLabel: 'Tracking',
  title: 'How to tell if your ads actually make money',
  blurb: 'A five-step check you can do in one afternoon. No tools to buy, no big words to google. By the end you will know — with real numbers — whether your ads earn more than they cost.',
  mins: '8 min read',
  image: '/img/laptop-minimal.jpg',
  imageAlt: 'Hands typing on a laptop at a clean white desk',
  soon: true,
};

export const POSTS = [
  { slug: 'google-ads-where-money-goes', cat: 'google-ads', catLabel: 'Google Ads', title: 'Google Ads: where your money really goes', blurb: 'CPC, Quality Score and budgets — explained like you are brand new. Because once, everyone was.', mins: '6 min read', soon: true },
  { slug: 'meta-ads-people-dont-skip', cat: 'meta-ads', catLabel: 'Meta Ads', title: 'Facebook and Instagram ads people don’t skip', blurb: 'What makes someone stop scrolling? Hooks, pictures, and the first two seconds.', mins: '5 min read', soon: true },
  { slug: 'what-is-a-pixel', cat: 'tracking', catLabel: 'Tracking', title: 'What is a pixel? (And why yours might be lying)', blurb: 'The tiny piece of code that counts your sales — and the three most common ways it breaks.', mins: '7 min read', soon: true },
  { slug: 'why-nobody-fills-your-form', cat: 'cro', catLabel: 'CRO', title: 'Why nobody fills in your form', blurb: 'Long forms scare people away. Here is what to cut, what to keep, and why shorter usually wins.', mins: '4 min read', soon: true },
  { slug: 'how-much-to-spend-on-ads', cat: 'strategy', catLabel: 'Strategy', title: 'How much should you spend on ads?', blurb: 'A simple way to pick a budget that fits your business — without guessing or copying competitors.', mins: '6 min read', soon: true },
  { slug: 'tiktok-for-serious-businesses', cat: 'tiktok', catLabel: 'TikTok', title: 'TikTok ads for serious businesses', blurb: 'Yes, it is dancing teens. It is also some of the cheapest attention on the internet right now.', mins: '5 min read', soon: true },
  { slug: 'linkedin-ads-worth-it', cat: 'linkedin', catLabel: 'LinkedIn', title: 'LinkedIn ads: expensive, but worth it?', blurb: 'When paying $10 for one click makes perfect sense — and when it really, really doesn’t.', mins: '5 min read', soon: true },
  { slug: 'from-10-to-100-sales', cat: 'growth', catLabel: 'Growth', title: 'From 10 sales a month to 100', blurb: 'What has to change at each step of growing — and what breaks if you try to skip one.', mins: '8 min read', soon: true },
  { slug: 'ga4-in-plain-english', cat: 'tracking', catLabel: 'Tracking', title: 'GA4 in plain English', blurb: 'The six numbers worth checking every week, and the forty you can safely ignore.', mins: '6 min read', soon: true },
];

/* Small shared SVG pieces so sections stay short and editable. */

export function Arrow() {
  return (
    <svg className="i" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Placeholder mark: replace with the official HMA Global Solutions logo SVG */
export function LogoMark({ dark = false }) {
  return (
    <svg className="logo__mark" viewBox="0 0 34 34" aria-hidden="true">
      <rect width="34" height="34" rx="7" fill={dark ? '#323C46' : '#283038'} />
      <path d="M6 26.2c4 0 5.2-4.5 9-4.5s4.8-5.5 8.8-7.2c1.7-.7 3.2-1 4.2-1.1" fill="none" stroke="#0060F0" strokeWidth="1.8" strokeLinecap="round" opacity=".75" />
      <path d="M6 23c4 0 5.2-4.5 9-4.5s4.8-5.5 8.8-7.2c1.7-.7 3.2-1 4.2-1.1" fill="none" stroke="#0080F8" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="28" cy="10.2" r="2.3" fill="#FFFFFF" />
    </svg>
  );
}

export function Logo({ dark = false }) {
  return (
    <>
      <LogoMark dark={dark} />
      <span className="logo__type"><span className="logo__name">HMA</span><span className="logo__sub">Global Solutions</span></span>
    </>
  );
}

/** Tracking-plan matrix: sent / not sent */
export function Sent() {
  return (
    <span className="ok" role="img" aria-label="Sent">
      <svg viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2 5 8.5l4.5-5" stroke="#0060F0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}
export function NotSent() {
  return <span className="no" role="img" aria-label="Not sent" />;
}

export function PrincipleGlyph() {
  return (
    <svg className="principle__g" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M11 3v16M3 11h16" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

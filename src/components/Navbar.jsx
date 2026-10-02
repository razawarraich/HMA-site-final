import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Arrow } from './icons.jsx';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]); // close the panel on navigation

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const cls = (base) => ({ isActive }) => (isActive ? `${base} is-current`.trim() : base);

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`} id="nav">
      <div className="container nav__inner">
        <Link className="logo" to="/" aria-label="HMA Global Solutions — home">
          {/* Add your logo image link in the src attribute below */}
          <img src="img/hma-logo-light.svg" alt="HMA Global Solutions" className="nav__logo-img" />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={cls('')}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__right">
          <Link className="btn btn--dark btn--sm" to="/contact">
            Book a Strategy Call
            <Arrow />
          </Link>
          <button
            className="nav__burger"
            id="navBurger"
            type="button"
            aria-expanded={open}
            aria-controls="navPanel"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
          </button>
        </div>
      </div>

      <div className="nav__panel" id="navPanel">
        <div className="container">
          <ul>
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} onClick={() => setOpen(false)}>
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link className="btn btn--primary" to="/contact" onClick={() => setOpen(false)}>
                Book a Strategy Call
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
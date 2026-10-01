import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer on-dark">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link className="logo" to="/" aria-label="HMA Global Solutions — home">
              {/* Add your logo image link in the src attribute below */}
              <img src="img/hma-logo-dark-Photoroom.png" alt="HMA Global Solutions" className="footer__logo-img" />
            </Link>
            <p>
              Performance marketing for businesses that want every dollar of ad spend
              accounted for. We run the ads, count the results and explain it all in plain words.
            </p>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><Link to="/services#paid-media">Paid ads</Link></li>
              <li><Link to="/services#analytics">Tracking &amp; analytics</Link></li>
              <li><Link to="/services#cro">Better pages (CRO)</Link></li>
              <li><Link to="/services#strategy">The plan (strategy)</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/case-studies">Case studies</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Get started</h4>
            <p style={{ marginBottom: 16 }}>A free 30-minute call to look at your ads and your tracking together.</p>
            <Link className="btn btn--primary btn--sm" to="/contact">Book a Strategy Call</Link>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 HMA Global Solutions. All rights reserved.</span>
          <span>All figures on this site are sample data for illustration.</span>
        </div>
      </div>
    </footer>
  );
}
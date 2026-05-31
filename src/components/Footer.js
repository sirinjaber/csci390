import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="nav-logo">Wander<span>Lust</span></div>
          <p>Crafting meaningful travel experiences since 2026. Every journey tells a story.</p>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>hello@wanderlust.travel</li>
            <li>+961 78 859 584</li>
            <li>Beirut, Lebanon</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">© 2026 WanderLust Travel Co. All rights reserved.</div>
    </footer>
  );
}

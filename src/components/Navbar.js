import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <Link to="/" className="nav-logo">Wander<span>Lust</span></Link>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/"             className={location.pathname === '/'             ? 'active' : ''}>Home</Link></li>
        <li><Link to="/destinations" className={location.pathname === '/destinations' ? 'active' : ''}>Destinations</Link></li>
        <li><Link to="/gallery"      className={location.pathname === '/gallery'      ? 'active' : ''}>Gallery</Link></li>
        <li><Link to="/contact"      className={location.pathname === '/contact'      ? 'active' : ''}>Contact</Link></li>
      </ul>

      <button className="hamburger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '✕' : '☰'}
      </button>
    </nav>
  );
}

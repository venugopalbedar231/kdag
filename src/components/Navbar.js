import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
            <img src="https://kdagiitkgp.com/static/media/KDAGLogoNew.761c7d0b0cad7389a439.png" alt="Logo" className="logo-image" />
        </Link>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <a href="#" className="nav-link">Events</a>
          <a href="#" className="nav-link">Gallery</a>
          <a href="#" className="nav-link">ML Sheet</a>
          <a href="#" className="nav-link">Resources</a>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Blog
          </Link>
          <a href="#" className="nav-link">Certificate</a>
          <a href="#" className="nav-link">Team</a>
        </div>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

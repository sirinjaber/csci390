import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// ── data ──────────────────────────────────────────────────────────────
const FEATURED = [
  {
    large: true,
    img: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=1200&q=80',
    tag: 'Middle East',
    title: 'Beirut, Lebanon',
    desc: 'Amazing culture, vibrant nightlife, and breathtaking Mediterranean views.',
  },
  {
    img: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=700&q=80',
    tag: 'Europe',
    title: 'Paris, France',
    desc: 'Romance, art, cuisine — Paris never stops enchanting.',
  },
  {
    img: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1200&q=80',
    tag: 'Africa',
    title: 'Cairo, Egypt',
    desc: 'Discover the magnificent pyramids and 4,000 years of history.',
  },
];

const STATS = [
  { num: '120+', label: 'Destinations' },
  { num: '50k',  label: 'Happy Travelers' },
  { num: '15',   label: 'Years Experience' },
  { num: '98%',  label: 'Satisfaction Rate' },
];

const TESTIMONIALS = [
  {
    text: '"WanderLust made our honeymoon in Bali absolutely magical. Every detail was perfect — we didn\'t have to worry about a thing."',
    author: 'Sarah & James', location: 'London, UK',
  },
  {
    featured: true,
    text: '"I\'ve traveled with many agencies, but none match WanderLust\'s attention to detail and passion for authentic experiences. Iceland was life-changing."',
    author: 'Omar Al-Rashid', location: 'Dubai, UAE',
  },
  {
    text: '"Our family trip to Japan was flawless. The kids loved every moment, and the guide was fantastic with children!"',
    author: 'The Chen Family', location: 'Singapore',
  },
];

// ── component ──────────────────────────────────────────────────────────
export default function Home() {
  const [nlMsg, setNlMsg]       = React.useState('');
  const [nlEmail, setNlEmail]   = React.useState('');

  // Scroll-reveal
  const revealRef = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            e.target.style.opacity    = '1';
            e.target.style.transform  = 'translateY(0)';
          }, i * 80);
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    revealRef.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const addReveal = el => { if (el && !revealRef.current.includes(el)) revealRef.current.push(el); };

  const handleNewsletter = e => {
    e.preventDefault();
    setNlMsg('🎉 You\'re in! Welcome to the WanderLust community.');
    setNlEmail('');
  };

  return (
    <main className="home page-enter">

      {/* HERO */}
      <header className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-tag">Your World Awaits</p>
          <h1>Discover the <em>Beauty</em><br/>of Every Journey</h1>
          <p className="hero-sub">
            Hand-crafted travel experiences across 6 continents.<br/>
            From serene mountain retreats to vibrant coastal cities.
          </p>
          <div className="hero-btns">
            <Link to="/destinations" className="btn btn-primary">Explore Destinations</Link>
            <Link to="/contact"      className="btn btn-outline">Plan My Trip</Link>
          </div>
        </div>
        <div className="hero-scroll">↓ scroll</div>
      </header>

      {/* STATS */}
      <div className="stats-bar">
        {STATS.map(s => (
          <div className="stat" key={s.label} ref={addReveal} style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.5s ease' }}>
            <span className="stat-num">{s.num}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* FEATURED DESTINATIONS */}
      <section className="section featured">
        <div className="section-header">
          <p className="section-tag">Top Picks</p>
          <h2>Featured Destinations</h2>
          <p className="section-sub">Curated experiences that redefine travel.</p>
        </div>
        <div className="cards-grid">
          {FEATURED.map(d => (
            <div
              key={d.title}
              className={`card ${d.large ? 'card-large' : ''}`}
              ref={addReveal}
              style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.55s ease' }}
            >
              <div className="card-img" style={{ backgroundImage: `url('${d.img}')` }} />
              <div className="card-body">
                <span className="card-tag">{d.tag}</span>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
                <Link to="/destinations" className="card-link">Explore →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="section why-us">
        <div className="why-text">
          <p className="section-tag">Why WanderLust</p>
          <h2>Travel Better,<br/>Live Deeper</h2>
          <p>We believe every trip should be transformative. Our expert guides, handpicked accommodations, and deeply personalized itineraries make sure you experience destinations the way locals do.</p>
          <ul className="why-list">
            <li>✦ Expert local guides in every destination</li>
            <li>✦ Fully customizable itineraries</li>
            <li>✦ 24/7 on-trip support</li>
            <li>✦ Sustainable &amp; responsible travel</li>
          </ul>
          <Link to="/contact" className="btn btn-primary">Start Planning</Link>
        </div>
        <div className="why-image">
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=80" alt="Travelers hiking" loading="lazy"/>
          <div className="why-badge"><span>15+</span> Years of Wandering</div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="section-header">
          <p className="section-tag">Traveler Stories</p>
          <h2>Voices from the Road</h2>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map(t => (
            <div
              key={t.author}
              className={`testimonial ${t.featured ? 'featured-testimonial' : ''}`}
              ref={addReveal}
              style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.55s ease' }}
            >
              <p>{t.text}</p>
              <div className="testimonial-author">
                <strong>{t.author}</strong> — {t.location}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <div className="newsletter-inner">
          <h2>Get Travel Inspiration in Your Inbox</h2>
          <p>Join 50,000+ wanderers and receive curated destination guides, travel tips, and exclusive deals.</p>
          <form className="newsletter-form" onSubmit={handleNewsletter}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={nlEmail}
              onChange={e => setNlEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
          {nlMsg && <p className="nl-msg">{nlMsg}</p>}
        </div>
      </section>

    </main>
  );
}

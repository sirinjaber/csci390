import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Destinations.css';

const ALL_DESTINATIONS = [
  { id: 1, continent: 'middleeast', tag: 'Middle East', title: 'Beirut, Lebanon',   desc: 'Vibrant culture, stunning coastline, and world-class cuisine.',   img: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=700&q=80',  duration: '4–7 days',  price: 'From $800'  },
  { id: 2, continent: 'asia',       tag: 'Asia',        title: 'Bali, Indonesia',    desc: 'Rice terraces, sacred temples, and world-class surfing.',          img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&q=80', duration: '7–14 days', price: 'From $1,200' },
  { id: 3, continent: 'asia',       tag: 'Asia',        title: 'Kyoto, Japan',       desc: 'Ancient shrines, geisha districts, and autumn maple forests.',     img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=700&q=80', duration: '5–10 days', price: 'From $1,800' },
  { id: 4, continent: 'europe',     tag: 'Europe',      title: 'Paris, France',      desc: 'The city of light — where art, food, and romance collide.',        img: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=700&q=80', duration: '4–7 days',  price: 'From $2,100' },
  { id: 5, continent: 'europe',     tag: 'Europe',      title: 'Santorini, Greece',  desc: 'Iconic blue domes, volcanic cliffs, and Aegean sunsets.',          img: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=700&q=80', duration: '5–8 days',  price: 'From $1,600' },
  { id: 6, continent: 'africa',     tag: 'Africa',      title: 'Cairo, Egypt',       desc: 'Discover the magnificent pyramids and 4,000 years of history.',   img: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1200&q=80',duration: '5–8 days',  price: 'From $900'  },
  { id: 7, continent: 'africa',     tag: 'Africa',      title: 'Serengeti, Tanzania',desc: 'Witness the Great Migration — nature\'s most spectacular show.',   img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=700&q=80', duration: '7–12 days', price: 'From $3,200' },
  { id: 8, continent: 'americas',   tag: 'Americas',    title: 'Machu Picchu, Peru', desc: 'The Lost City of the Incas — a marvel above the clouds.',          img: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=700&q=80', duration: '6–10 days', price: 'From $1,400' },
  { id: 9, continent: 'americas',   tag: 'Americas',    title: 'Patagonia, Argentina',desc:'Glaciers, condors, and end-of-the-world wilderness.',             img: 'https://images.unsplash.com/photo-1454117096348-e4abbeba002c?w=700&q=80', duration: '10–16 days',price: 'From $2,600' },
];

const FILTERS = [
  { key: 'all',       label: 'All' },
  { key: 'middleeast',label: 'Middle East' },
  { key: 'asia',      label: 'Asia' },
  { key: 'europe',    label: 'Europe' },
  { key: 'africa',    label: 'Africa' },
  { key: 'americas',  label: 'Americas' },
];

export default function Destinations() {
  const [active, setActive] = useState('all');
  const revealRef = useRef([]);

  const filtered = active === 'all'
    ? ALL_DESTINATIONS
    : ALL_DESTINATIONS.filter(d => d.continent === active);

  useEffect(() => {
    revealRef.current = [];
  }, [active]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            e.target.style.opacity   = '1';
            e.target.style.transform = 'translateY(0)';
          }, i * 80);
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    revealRef.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [filtered]);

  const addReveal = el => {
    if (el && !revealRef.current.includes(el)) revealRef.current.push(el);
  };

  return (
    <main className="destinations-page page-enter">
      <header className="page-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80')" }}>
        <div className="hero-overlay" />
        <div className="page-hero-content">
          <p className="hero-tag">Around the Globe</p>
          <h1>Our <em>Destinations</em></h1>
          <p className="hero-sub">Filter by region and find your next adventure.</p>
        </div>
      </header>

      <div className="filter-section">
        <div className="filter-bar">
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`filter-btn ${active === f.key ? 'active' : ''}`}
              onClick={() => setActive(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <section className="section dest-section">
        <div className="dest-grid">
          {filtered.map(d => (
            <div
              key={d.id}
              className="dest-card"
              ref={addReveal}
              style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.5s ease' }}
            >
              <div className="dest-img" style={{ backgroundImage: `url('${d.img}')` }}>
                <span className="dest-tag">{d.tag}</span>
              </div>
              <div className="dest-info">
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
                <div className="dest-meta">
                  <span>⏱ {d.duration}</span>
                  <span>💰 {d.price}</span>
                </div>
                <Link to="/contact" className="btn btn-primary btn-sm">Book Now</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

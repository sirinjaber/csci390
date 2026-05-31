import React, { useState } from 'react';
import './Gallery.css';

const PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&q=80',  caption: 'Beirut, Lebanon',        size: '' },
  { src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80', caption: 'Bali, Indonesia',       size: 'tall' },
  { src: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&q=80', caption: 'Cairo Pyramids, Egypt', size: '' },
  { src: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1200&q=80',caption: 'Serengeti, Tanzania',   size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80', caption: 'Santorini, Greece',     size: '' },
  { src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80', caption: 'Kyoto, Japan',          size: '' },
  { src: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80', caption: 'Machu Picchu, Peru',    size: 'tall' },
  { src: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80', caption: 'Marrakech, Morocco',    size: '' },
  { src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80', caption: 'Patagonia, Argentina',  size: '' },
  { src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80',caption: 'Iceland Ring Road',     size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80', caption: 'Kenya Wildlife',        size: '' },
  { src: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80', caption: 'Paris, France',         size: '' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null); // index or null

  const handleKey = e => { if (e.key === 'Escape') setLightbox(null); };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  });

  React.useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <main className="gallery-page page-enter">
      <header className="page-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80')" }}>
        <div className="hero-overlay" />
        <div className="page-hero-content">
          <p className="hero-tag">Visual Journey</p>
          <h1>The <em>Gallery</em></h1>
          <p className="hero-sub">Moments captured across continents.</p>
        </div>
      </header>

      <section className="section gallery-section">
        <div className="gallery-grid">
          {PHOTOS.map((p, i) => (
            <div
              key={i}
              className={`gallery-item ${p.size}`}
              onClick={() => setLightbox(i)}
            >
              <img src={p.src} alt={p.caption} loading="lazy" />
              <div className="gallery-overlay"><span>{p.caption}</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div className="lightbox open" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img
            src={PHOTOS[lightbox].src.replace('w=800', 'w=1200')}
            alt={PHOTOS[lightbox].caption}
            onClick={e => e.stopPropagation()}
          />
          <p>{PHOTOS[lightbox].caption}</p>
          <div className="lightbox-nav" onClick={e => e.stopPropagation()}>
            <button onClick={() => setLightbox((lightbox - 1 + PHOTOS.length) % PHOTOS.length)}>‹ Prev</button>
            <span>{lightbox + 1} / {PHOTOS.length}</span>
            <button onClick={() => setLightbox((lightbox + 1) % PHOTOS.length)}>Next ›</button>
          </div>
        </div>
      )}
    </main>
  );
}

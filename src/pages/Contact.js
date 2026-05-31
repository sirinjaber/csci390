import React, { useState } from 'react';
import './Contact.css';

const FAQS = [
  { q: 'How far in advance should I book?', a: 'We recommend booking at least 3–6 months in advance for peak season destinations. For popular spots like Santorini or Bali in summer, 8–12 months ensures the best availability and pricing.' },
  { q: 'Do you offer custom itineraries?', a: 'Absolutely! Every trip we create is 100% tailored to you. After your enquiry, a dedicated travel expert will work with you to craft an itinerary that matches your interests, pace, and budget.' },
  { q: 'What\'s included in your packages?', a: 'Our packages typically include flights, accommodations, local transfers, guided tours, and 24/7 on-trip support. Meals are sometimes included depending on the package.' },
  { q: 'Is travel insurance required?', a: 'We strongly recommend comprehensive travel insurance for all bookings. We can recommend trusted partners, or you can arrange your own coverage.' },
];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm]       = useState({ fname: '', lname: '', email: '', phone: '', destination: '', travelers: '', budget: '', message: '', agreed: false });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.agreed) { setError('Please agree to the Privacy Policy to continue.'); return; }
    setError('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
    setForm({ fname: '', lname: '', email: '', phone: '', destination: '', travelers: '', budget: '', message: '', agreed: false });
  };

  return (
    <main className="contact-page page-enter">
      <header className="page-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=1600&q=80')" }}>
        <div className="hero-overlay" />
        <div className="page-hero-content">
          <p className="hero-tag">Let's Connect</p>
          <h1>Plan Your <em>Dream Trip</em></h1>
          <p className="hero-sub">Our travel experts are ready to craft your perfect journey.</p>
        </div>
      </header>

      <section className="section contact-section">
        <div className="contact-wrapper">

          {/* INFO */}
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>Whether you have a destination in mind or just a dream of adventure, our team will help you every step of the way.</p>
            <div className="info-cards">
              <div className="info-card"><div className="info-icon">📍</div><div><h4>Our Office</h4><p>Hamra, Beirut, Lebanon</p></div></div>
              <div className="info-card"><div className="info-icon">📞</div><div><h4>Phone</h4><p>+961 78 859 584</p></div></div>
              <div className="info-card"><div className="info-icon">✉️</div><div><h4>Email</h4><p>hello@wanderlust.travel</p></div></div>
            </div>
            <div className="social-links">
              <span>Follow us:</span>
              <a href="#instagram" className="social-btn">Instagram</a>
              <a href="#facebook"  className="social-btn">Facebook</a>
              <a href="#twitter"   className="social-btn">Twitter</a>
            </div>
          </div>

          {/* FORM */}
          <div className="contact-form-wrap">
            <h2>Send a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group"><label>First Name *</label><input name="fname" placeholder="John" value={form.fname} onChange={handleChange} required /></div>
                <div className="form-group"><label>Last Name *</label><input name="lname" placeholder="Doe" value={form.lname} onChange={handleChange} required /></div>
              </div>
              <div className="form-group"><label>Email *</label><input type="email" name="email" placeholder="john@example.com" value={form.email} onChange={handleChange} required /></div>
              <div className="form-group"><label>Phone</label><input type="tel" name="phone" placeholder="+961 XX XXX XXX" value={form.phone} onChange={handleChange} /></div>
              <div className="form-group">
                <label>Dream Destination</label>
                <select name="destination" value={form.destination} onChange={handleChange}>
                  <option value="">Select a destination...</option>
                  <option>Beirut, Lebanon</option>
                  <option>Bali, Indonesia</option>
                  <option>Kyoto, Japan</option>
                  <option>Paris, France</option>
                  <option>Santorini, Greece</option>
                  <option>Cairo, Egypt</option>
                  <option>Serengeti, Tanzania</option>
                  <option>Machu Picchu, Peru</option>
                  <option>Other / Not sure yet</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group"><label>No. of Travelers</label><input type="number" name="travelers" placeholder="2" min="1" max="50" value={form.travelers} onChange={handleChange} /></div>
                <div className="form-group">
                  <label>Approximate Budget</label>
                  <select name="budget" value={form.budget} onChange={handleChange}>
                    <option value="">Select budget...</option>
                    <option>Under $1,000</option>
                    <option>$1,000 – $3,000</option>
                    <option>$3,000 – $6,000</option>
                    <option>$6,000 – $10,000</option>
                    <option>$10,000+</option>
                  </select>
                </div>
              </div>
              <div className="form-group"><label>Your Message *</label><textarea name="message" rows="5" placeholder="Describe your ideal travel experience, dates, interests..." value={form.message} onChange={handleChange} required /></div>
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" name="agreed" checked={form.agreed} onChange={handleChange} />
                  I agree to the Privacy Policy and Terms of Service.
                </label>
              </div>
              {error && <p className="form-msg error">{error}</p>}
              <button type="submit" className="btn btn-primary btn-full">Send My Enquiry ✈</button>
              {submitted && <p className="form-msg success">✈ Thank you! We'll be in touch within 24 hours.</p>}
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="section-header">
          <p className="section-tag">Common Questions</p>
          <h2>FAQs</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div className="faq-item" key={i}>
              <button className={`faq-q ${openFaq === i ? 'open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {f.q} <span>{openFaq === i ? '−' : '+'}</span>
              </button>
              <div className={`faq-a ${openFaq === i ? 'open' : ''}`}>
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

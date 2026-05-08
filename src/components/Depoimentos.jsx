import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { TESTIMONIALS } from '../data/constantes';

export function Depoimentos() {
  const [current, setCurrent] = useState(0);
  const ref = useScrollReveal();

  const prev = () => setCurrent(c => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent(c => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  return (
    <section className="testimonials reveal" ref={ref}>
      <h2 className="section-title">O que nossos clientes dizem</h2>
      <p className="section-subtitle">Depoimentos reais de quem confia no nosso trabalho:</p>
      <div className="testimonials-wrapper">
        <div className="testimonials-track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {TESTIMONIALS.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="stars">{'★'.repeat(t.stars)}</div>
              <blockquote>"{t.text}"</blockquote>
              <div className="testimonial-author">{t.name}</div>
              <div className="testimonial-company">{t.company}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="test-nav">
        <button onClick={prev} aria-label="Anterior">‹</button>
        <button onClick={next} aria-label="Próximo">›</button>
      </div>
    </section>
  );
}

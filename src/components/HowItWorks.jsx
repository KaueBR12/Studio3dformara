import React, { useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function HowItWorks() {
  const ref = useScrollReveal();
  const lineRef = useRef(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.classList.add('animated');
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const steps = [
    { icon: '📤', title: 'Envie o Arquivo', desc: 'Formato PNG, JPG, STL ou OBJ ' },
    { icon: '⚙️', title: 'Configuramos', desc: 'Escolha material e quantidade' },
    { icon: '🖨️', title: 'Imprimimos', desc: 'Produção com equipamentos de alta precisão' },
    { icon: '📦', title: 'Entregamos', desc: 'Embalagem segura para todo o Brasil' },
  ];

  return (
    <section className="how-it-works reveal" id="como-funciona" ref={ref}>
      <h2 className="section-title">Processo Simples, Resultado Excepcional</h2>
      <p className="section-subtitle">Do arquivo digital ao objeto físico em 4 passos</p>
      <div className="steps-container">
        <div className="steps-line"><div className="steps-line-fill" ref={lineRef} /></div>
        {steps.map((s, i) => (
          <div className="step" key={i}>
            <div className="step-icon">{s.icon}</div>
            <div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

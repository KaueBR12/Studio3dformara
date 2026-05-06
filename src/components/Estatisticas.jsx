import React, { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { StatsIcon } from './ui/Icones';

function AnimatedNumber({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const duration = 2000;
        const step = (ts) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString('pt-BR')}{suffix}</span>;
}

export function Estatisticas() {
  const ref = useScrollReveal();
  return (
    <section className="stats reveal" ref={ref}>
      <div className="stats-grid">
        <div className="stat-item"><h3><AnimatedNumber target={15} suffix="+" /></h3><p>Modelos Disponíveis</p></div>
        <div className="stat-item"><h3><AnimatedNumber target={80} suffix="+" /></h3><p>Peças Entregues</p></div>
        <div className="stat-item"><h3><AnimatedNumber target={3} suffix="+" /></h3><p>Materiais Disponíveis</p></div>
        <div className="stat-item"><h3><AnimatedNumber target={98} suffix="%" /></h3><p>Satisfação dos Clientes</p></div>
      </div>
    </section>
  );
}

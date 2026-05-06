import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { MATERIALS } from '../data/constants';

export function Materials() {
  const ref = useScrollReveal();
  return (
    <section className="materials reveal glass" id="materiais" ref={ref}>
      <h2 className="section-title">Materiais Disponíveis</h2>
      <p className="section-subtitle">Cada projeto merece o material ideal</p>
      <div className="materials-grid">
        {MATERIALS.map(m => (
          <div className="material-card" key={m.name}>
            <div className="material-header">
              <div className="material-icon">{m.icon}</div>
              <h4>{m.name}</h4>
            </div>
            <p>{m.desc}</p>
            <div className="progress-bar"><label>Resistência</label><div className="progress-track"><div className="progress-fill" style={{ width: m.res + '%' }} /></div></div>
            <div className="progress-bar"><label>Flexibilidade</label><div className="progress-track"><div className="progress-fill" style={{ width: m.flex + '%' }} /></div></div>
            <div className="progress-bar"><label>Temp. máx.</label><div className="progress-track"><div className="progress-fill" style={{ width: m.temp + '%' }} /></div></div>
          </div>
        ))}
      </div>
    </section>
  );
}

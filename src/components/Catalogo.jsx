import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ProductIcon } from './ui/Icones';
import { PRODUCTS, CATEGORIES, WHATSAPP_NUMBER } from '../data/constantes';

export function Catalogo({ onSelectProduct }) {
  const [filter, setFilter] = useState('Todos');
  const ref = useScrollReveal();

  const filtered = filter === 'Todos' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  return (
    <section className="catalog reveal glass" id="catalogo" ref={ref}>
      <h2 className="section-title">Nosso Catálogo</h2>
      <p className="section-subtitle">Peças sob demanda com a mais alta qualidade de impressão 3D</p>
      <div className="catalog-filters">
        {CATEGORIES.map(c => (
          <button key={c} className={`filter-btn${filter === c ? ' active' : ''}`} onClick={() => setFilter(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="catalog-grid">
        {filtered.map(p => (
          <div className="product-card" key={p.id} onClick={() => onSelectProduct(p)}>
            <div className="product-image">
              {p.images && p.images[0] ? (
                <img
                  src={p.images[0]}
                  alt={p.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <ProductIcon />
              )}
              {p.ribbon && <div className="product-ribbon">{p.ribbon}</div>}
            </div>
            <div className="product-body">
              <h4>{p.name}</h4>
              <div className="product-meta">
                <span className="badge-material">{p.material}</span>
                <span className="badge-category">{p.category}</span>
              </div>
              <div className="product-price">
                {p.priceMin != null
                  ? `R$ ${p.priceMin} – R$ ${p.priceMax}`
                  : `R$ ${p.price.toFixed(2).replace('.', ',')}`}
              </div>
              <button
                className="btn-solicitar"
                onClick={(e) => {
                  e.stopPropagation();
                  const priceLabel = p.priceMin != null
                    ? `R$ ${p.priceMin} – R$ ${p.priceMax}`
                    : `R$ ${p.price.toFixed(2).replace('.', ',')}`;
                  const message = `*Solicitação de Orçamento - Studio 3D Formará*\n` +
                    `\n` +
                    `Olá! Gostaria de verificar a disponibilidade e condições para o seguinte item do catálogo:\n\n` +
                    `*Item:* ${p.name}\n` +
                    `*Material:* ${p.material}\n` +
                    `*Referência:* ${priceLabel}\n\n` +
                    `Poderiam me informar o prazo de entrega e as opções de personalização disponíveis para este projeto?`;
                  const msgEncoded = encodeURIComponent(message);
                  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msgEncoded}`, '_blank');
                }}
              >
                <span>Solicitar</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

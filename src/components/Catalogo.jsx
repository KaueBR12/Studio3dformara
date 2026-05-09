import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ProductIcon } from './ui/Icones';
import { PRODUCTS, CATEGORIES, WHATSAPP_NUMBER } from '../data/constantes';

export function Catalogo({ onSelectProduct }) {
  const [filter, setFilter] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const ref = useScrollReveal();

  const filtered = filter === 'Todos' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

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
        {paginatedItems.map(p => {
          const firstImage = p.images && p.images[0];
          const isVideo = firstImage?.toLowerCase().endsWith('.mp4') ||
            firstImage?.toLowerCase().endsWith('.webm') ||
            firstImage?.toLowerCase().endsWith('.mov');

          return (
            <div className="product-card" key={p.id} onClick={() => onSelectProduct(p)}>
              <div className="product-image">
                {firstImage ? (
                  isVideo ? (
                    <video
                      src={firstImage}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <img
                      src={firstImage}
                      alt={p.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  )
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
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage(prev => Math.max(prev - 1, 1));
              document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Anterior
          </button>

          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`page-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => {
                  setCurrentPage(page);
                  document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage(prev => Math.min(prev + 1, totalPages));
              document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Próximo
          </button>
        </div>
      )}
    </section>
  );
}

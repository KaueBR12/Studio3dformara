import React, { useState, useEffect } from 'react';
import { ProductIcon } from './ui/Icons';
import { WHATSAPP_NUMBER } from '../data/constants';

export function ProductPage({ product, onBack }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const priceLabel = product.priceMin != null
    ? `R$ ${product.priceMin} – R$ ${product.priceMax}`
    : `R$ ${product.price.toFixed(2).replace('.', ',')}`;

  return (
    <div className="product-detail-page">
      <div className="container">
        <button className="btn-back" onClick={onBack}>← Voltar para o Catálogo</button>
        <div className="product-detail-container glass">
          <div className="product-detail-left">
            <div className="product-carousel">
              {product.images && product.images.length > 1 && (
                <>
                  <button className="carousel-arrow prev" onClick={prevImage}>‹</button>
                  <button className="carousel-arrow next" onClick={nextImage}>›</button>
                </>
              )}
              <div className="carousel-image-container">
                {product.images && product.images[currentImageIndex] ? (
                  <img src={product.images[currentImageIndex]} alt={product.name} />
                ) : (
                  <div className="placeholder-image"><ProductIcon /></div>
                )}
              </div>
              {product.images && product.images.length > 1 && (
                <div className="carousel-dots">
                  {product.images.map((_, i) => (
                    <span
                      key={i}
                      className={`dot ${i === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(i)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="product-detail-right">
            <span className="detail-category">{product.category}</span>
            <h1>{product.name}</h1>
            <div className="detail-meta">
              <span className="badge-material">{product.material}</span>
            </div>
            <p className="detail-description">{product.description}</p>
            <div className="detail-price">{priceLabel}</div>
            <button
              className="btn-primary btn-solicitar-large"
              onClick={() => {
                const message = `*Solicitação de Orçamento - Studio 3D Formará*\n` +
                  `--------------------------------------------\n` +
                  `Olá! Gostaria de verificar a disponibilidade e condições para o seguinte item do catálogo:\n\n` +
                  `*Item:* ${product.name}\n` +
                  `*Material:* ${product.material}\n` +
                  `*Referência:* ${priceLabel}\n\n` +
                  `Poderiam me informar o prazo de entrega e as opções de personalização disponíveis para este projeto?`;
                const msgEncoded = encodeURIComponent(message);
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msgEncoded}`, '_blank');
              }}
            >
              Solicitar Orçamento no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

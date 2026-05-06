import React from 'react';
import { CubeLogo } from './ui/Icones';
import { WHATSAPP_NUMBER } from '../data/constantes';

export function Rodape({ onHome }) {
  return (
    <footer className="footer glass">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); if (onHome) onHome('home'); window.scrollTo(0, 0); }}>
            <CubeLogo /> Studio 3D Formará
          </a>
          <p>Transformando ideias em objetos reais com impressão 3D profissional de alta qualidade.</p>
          <div className="footer-social">
            <a href="https://www.instagram.com/maker_formara?igsh=dnJlejQ3eXluMXdw" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
          </div>
        </div>
        <div>
          <h5>Empresa</h5>
          <ul>
            <li><a href="#" onClick={(e) => { e.preventDefault(); if (onHome) onHome('about'); }}>Sobre Nós</a></li>
          </ul>
        </div>
        <div>
          <h5>Catálogo</h5>
          <ul>
            <li><a href="#catalogo" onClick={(e) => { e.preventDefault(); if (onHome) onHome('home', 'catalogo'); }}>Todos</a></li>
          </ul>
        </div>
        <div>
          <h5>Suporte</h5>
          <ul>
            <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">Contato</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Studio 3D Formará. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

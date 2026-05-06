import React, { useState, useEffect } from 'react';
import { CubeLogo } from './ui/Icones';
import { WHATSAPP_NUMBER } from '../data/constantes';

export function Cabecalho({ onHome }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { label: 'Sobre Nós', view: 'about' },
    { label: 'Catálogo', href: '#catalogo', view: 'home' },
    { label: 'Materiais', href: '#materiais', view: 'home' },
    { label: 'Como Funciona', href: '#como-funciona', view: 'home' },
  ];

  const handleLinkClick = (l) => {
    setMenuOpen(false);
    const targetId = l.href ? l.href.replace('#', '') : null;
    if (onHome) onHome(l.view, targetId);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); if (onHome) onHome('home'); window.scrollTo(0, 0); }}>
          <CubeLogo /> Studio 3D Formará
        </a>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.label}>
              <a
                href={l.href || '#'}
                onClick={(e) => {
                  if (!l.href) e.preventDefault();
                  handleLinkClick(l);
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de solicitar um orçamento.`, '_blank')}>
          Solicitar Orçamento
        </button>
        <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map(l => <a key={l.label} href={l.href || '#'} onClick={(e) => { e.preventDefault(); handleLinkClick(l); }}>{l.label}</a>)}
        <button className="btn-primary" onClick={() => { setMenuOpen(false); window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de solicitar um orçamento.`, '_blank'); }}>
          Solicitar Orçamento
        </button>
      </div>
    </>
  );
}

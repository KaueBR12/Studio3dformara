import React from 'react';

export const CubeLogo = () => (
  <img
    src="/images/LOGO.jpeg"
    alt="Formará Logo"
    style={{ width: '41px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
  />
);

export const ProductIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 6L40 15V33L24 42L8 33V15L24 6Z" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none" />
    <path d="M24 6L40 15L24 24L8 15L24 6Z" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="rgba(255,255,255,0.05)" />
    <path d="M24 24V42" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
  </svg>
);

export const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
  </svg>
);

export const StatsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

export const FilamentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M2 12h20M5.07 5.07l13.86 13.86M5.07 18.93L18.93 5.07" />
  </svg>
);

export const PrecisionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="22" y1="12" x2="18" y2="12" />
    <line x1="6" y1="12" x2="2" y2="12" />
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="22" x2="12" y2="18" />
  </svg>
);

export const DurabilityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

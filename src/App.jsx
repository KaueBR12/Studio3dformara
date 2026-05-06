import { useState } from 'react';
import './index.css';

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Catalog } from './components/Catalog';
import { Materials } from './components/Materials';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { ProductPage } from './components/ProductPage';
import { AboutPage } from './components/AboutPage';

export default function App() {
  const [view, setView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setView('product');
  };

  const handleNavigate = (newView, targetId = null) => {
    setSelectedProduct(null);
    setView(newView);
    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="app">
      <div id="stars" />
      <div id="stars2" />
      <div id="stars3" />
      <Navbar onHome={handleNavigate} />

      {view === 'product' && selectedProduct ? (
        <ProductPage product={selectedProduct} onBack={() => handleNavigate('home', 'catalogo')} />
      ) : view === 'about' ? (
        <AboutPage onBack={handleNavigate} />
      ) : (
        <>
          <Hero />
          <Stats />
          <Catalog onSelectProduct={handleSelectProduct} />
          <Materials />
          <HowItWorks />
          <Testimonials />
          <CTA />
        </>
      )}

      <Footer onHome={handleNavigate} />
    </div>
  );
}

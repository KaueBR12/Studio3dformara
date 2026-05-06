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
  const [loading, setLoading] = useState(false);

  const handleSelectProduct = (product) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedProduct(product);
      setView('product');
      setLoading(false);
      window.scrollTo(0, 0);
    }, 600);
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

      {loading && <ProductLoader />}

      {view === 'product' && selectedProduct ? (
        <ProductPage product={selectedProduct} onBack={() => handleNavigate('home', 'catalogo')} />
      ) : view === 'about' ? (
        <AboutPage onBack={() => handleNavigate('home')} />
      ) : (
        <>
          <Hero onCatalogClick={() => handleNavigate('home', 'catalogo')} />
          <Stats />
          <div id="catalogo">
            <Catalog onSelectProduct={handleSelectProduct} />
          </div>
          <div id="materiais">
            <Materials />
          </div>
          <HowItWorks />
          <Testimonials />
          <CTA />
        </>
      )}

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

function ProductLoader() {
  return (
    <div className="product-loader-overlay">
      <div className="product-loader-content">
        <div className="concentric-loader">
          <div className="outer-ring">
            <div className="inner-ring" />
          </div>
        </div>
        <p>Carregando Detalhes...</p>
      </div>
    </div>
  );
}

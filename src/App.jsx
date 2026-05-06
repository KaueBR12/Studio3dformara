import { useState } from 'react';
import './index.css';

// Componentes
import { Cabecalho } from './components/Cabecalho';
import { Hero } from './components/Hero';
import { Estatisticas } from './components/Estatisticas';
import { Catalogo } from './components/Catalogo';
import { Materiais } from './components/Materiais';
import { ComoFunciona } from './components/ComoFunciona';
import { Depoimentos } from './components/Depoimentos';
import { Contato } from './components/Contato';
import { Rodape } from './components/Rodape';
import { PaginaProduto } from './components/PaginaProduto';
import { PaginaSobre } from './components/PaginaSobre';

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
      <Cabecalho onHome={handleNavigate} />

      {loading && <ProductLoader />}

      {view === 'product' && selectedProduct ? (
        <PaginaProduto product={selectedProduct} onBack={() => handleNavigate('home', 'catalogo')} />
      ) : view === 'about' ? (
        <PaginaSobre onBack={() => handleNavigate('home')} />
      ) : (
        <>
          <Hero onCatalogClick={() => handleNavigate('home', 'catalogo')} />
          <Estatisticas />
          <div id="catalogo">
            <Catalogo onSelectProduct={handleSelectProduct} />
          </div>
          <div id="materiais">
            <Materiais />
          </div>
          <ComoFunciona />
          <Depoimentos />
          <Contato />
        </>
      )}

      <Rodape onHome={handleNavigate} />
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

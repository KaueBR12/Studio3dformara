import { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';

const WHATSAPP_NUMBER = '5547984197103';

/* ============================================================
   DATA
   ============================================================ */
const PRODUCTS = [
  {
    id: 1,
    name: 'Litofania',
    price: 250,
    material: 'PLA',
    category: 'Decoração',
    ribbon: 'Popular',
    description: 'A Litofania é uma peça de arte tridimensional que revela uma imagem detalhada quando iluminada por trás. Perfeita para presentes personalizados e decoração memorável.',
    images: ['/images/p1a.png', '/images/p1b.png']
  },
  {
    id: 2,
    name: 'Chaveiros Personalizados',
    priceMin: 8,
    priceMax: 25,
    material: 'PLA/PETG',
    category: 'Decoração',
    ribbon: 'Novo',
    description: 'Chaveiros exclusivos criados sob medida. Personalize com nomes, logotipos ou designs únicos. Alta durabilidade e acabamento premium.',
    images: ['/images/p2a.png', '/images/p2b.png']
  },
  {
    id: 3,
    name: 'Chaveiros',
    priceMin: 5,
    priceMax: 30,
    material: 'PLA/PETG',
    category: 'Decoração',
    ribbon: null,
    description: 'Chaveiros em resina com detalhes ultra-precisos e acabamento translúcido. Ideais para colecionáveis e brindes sofisticados.',
    images: ['/images/p3a.png', '/images/p3b.png']
  },
  {
    id: 4,
    name: 'Caixa Livro',
    price: 150,
    material: 'PLA',
    category: 'Decoração',
    ribbon: null,
    description: 'Uma caixa organizadora elegante disfarçada de livro. Combina funcionalidade com um toque clássico para qualquer ambiente.',
    images: ['/images/p4a.png', '/images/p4b.png']
  },
  {
    id: 5,
    name: 'Marca Páginas',
    priceMin: 10,
    priceMax: 40,
    material: 'PLA',
    category: 'Decoração',
    description: 'Marca-páginas com designs geométricos e artísticos. Leves, resistentes e perfeitos para os amantes da leitura.',
    images: ['/images/p5a.png', '/images/p5b.png']
  },
  {
    id: 6,
    name: 'Miniatura Decorativa do seu Pet',
    price: 180,
    material: 'PLA',
    category: 'Decoração',
    ribbon: 'Popular',
    description: 'Transforme a foto do seu melhor amigo em uma miniatura 3D eterna. Capturamos os detalhes únicos que tornam seu pet especial.',
    images: ['/images/p6a.png', '/images/p6b.png']
  },
];

const CATEGORIES = ['Todos', 'Decoração'];

const MATERIALS = [
  { name: 'PLA', desc: 'Biodegradável e fácil de imprimir. Ideal para protótipos e modelos decorativos.', icon: '🌿', res: 60, flex: 30, temp: 40 },
  { name: 'ABS', desc: 'Alta resistência mecânica e térmica. Perfeito para peças industriais.', icon: '🔧', res: 80, flex: 40, temp: 85 },
  { name: 'PETG', desc: 'Combina resistência com transparência. Ótimo para peças funcionais.', icon: '💎', res: 75, flex: 50, temp: 70 },
];

const TESTIMONIALS = [
  { name: 'Carlos Mendes', company: 'AutoTech Engenharia', text: 'A qualidade das peças superou todas as expectativas. O acabamento é impecável e a precisão dimensional é perfeita para nossas aplicações industriais.', stars: 5 },
  { name: 'Ana Beatriz', company: 'Studio Arquitetura', text: 'Já fizemos mais de 30 maquetes com a Studio 3D Formará. A equipe entende exatamente o que precisamos e entrega sempre no prazo. Recomendo demais!', stars: 5 },
  { name: 'Roberto Silva', company: 'EduRobot', text: 'Os kits educacionais ficaram incríveis! Material resistente, cores vibrantes e o suporte técnico é excepcional. Parceria de longo prazo garantida.', stars: 5 },
];

/* ============================================================
   SVG ICONS (inline)
   ============================================================ */
const CubeLogo = () => (
  <img
    src="/images/LOGO.jpeg"
    alt="Formará Logo"
    style={{ width: '41px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
  />
);

const ProductIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 6L40 15V33L24 42L8 33V15L24 6Z" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none" />
    <path d="M24 6L40 15L24 24L8 15L24 6Z" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="rgba(255,255,255,0.05)" />
    <path d="M24 24V42" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
  </svg>
);

/* ============================================================
   useScrollReveal HOOK
   ============================================================ */
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ============================================================
   NAVBAR
   ============================================================ */
function Navbar({ onHome }) {
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
    if (l.view === 'about') {
      if (onHome) onHome('about');
    } else {
      if (onHome) onHome('home');
      setTimeout(() => {
        if (l.href) {
          const el = document.querySelector(l.href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
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

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className="loader-wrapper">
          <div className="custom-loader"></div>
        </div>
        <h1>Transformamos <span>Ideias</span> em Objetos Reais</h1>
        <p>Impressão 3D profissional com precisão, velocidade de entrega e qualidade. Do protótipo à produção em escala.</p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}>
            Ver Catálogo
          </button>
          <button className="btn-outline" onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}>
            Como Funciona
          </button>
        </div>
        <div className="hero-badge">✓ Entrega em até 5 dias úteis</div>
        <div className="hero-social">
          <a href="https://www.instagram.com/maker_formara?igsh=dnJlejQ3eXluMXdw" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   STATS
   ============================================================ */
function AnimatedNumber({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const duration = 2000;
        const step = (ts) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString('pt-BR')}{suffix}</span>;
}

function Stats() {
  const ref = useScrollReveal();
  return (
    <section className="stats reveal" ref={ref}>
      <div className="stats-grid">
        <div className="stat-item"><h3><AnimatedNumber target={15} suffix="+" /></h3><p>Modelos Disponíveis</p></div>
        <div className="stat-item"><h3><AnimatedNumber target={80} suffix="+" /></h3><p>Peças Entregues</p></div>
        <div className="stat-item"><h3><AnimatedNumber target={3} suffix="+" /></h3><p>Materiais Disponíveis</p></div>
        <div className="stat-item"><h3><AnimatedNumber target={98} suffix="%" /></h3><p>Satisfação dos Clientes</p></div>
      </div>
    </section>
  );
}

/* ============================================================
   CATALOG
   ============================================================ */
function Catalog({ onSelectProduct }) {
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
                <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                  const message = `🛠️ *Interesse em Produto - Studio 3D Formará*\n` +
                    `--------------------------------------------\n` +
                    `*Produto:* ${p.name}\n` +
                    `*Material:* ${p.material}\n` +
                    `*Valor:* ${priceLabel}\n\n` +
                    `Olá! Tenho interesse neste item do catálogo e gostaria de mais detalhes sobre prazos e personalização.`;
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

/* ============================================================
   MATERIALS
   ============================================================ */
function Materials() {
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

/* ============================================================
   HOW IT WORKS
   ============================================================ */
function HowItWorks() {
  const ref = useScrollReveal();
  const lineRef = useRef(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.classList.add('animated');
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const steps = [
    { icon: '📤', title: 'Envie o Arquivo', desc: 'Formato PNG, JPG, STL ou OBJ ' },
    { icon: '⚙️', title: 'Configuramos', desc: 'Escolha material e quantidade' },
    { icon: '🖨️', title: 'Imprimimos', desc: 'Produção com equipamentos de alta precisão' },
    { icon: '📦', title: 'Entregamos', desc: 'Embalagem segura para todo o Brasil' },
  ];

  return (
    <section className="how-it-works reveal" id="como-funciona" ref={ref}>
      <h2 className="section-title">Processo Simples, Resultado Excepcional</h2>
      <p className="section-subtitle">Do arquivo digital ao objeto físico em 4 passos</p>
      <div className="steps-container">
        <div className="steps-line"><div className="steps-line-fill" ref={lineRef} /></div>
        {steps.map((s, i) => (
          <div className="step" key={i}>
            <div className="step-icon">{s.icon}</div>
            <div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   PRODUCT PAGE (Detail)
   ============================================================ */
function ProductPage({ product, onBack }) {
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
                const message = `🛠️ *Interesse em Produto - Studio 3D Formará*\n` +
                  `--------------------------------------------\n` +
                  `*Produto:* ${product.name}\n` +
                  `*Material:* ${product.material}\n` +
                  `*Valor:* ${priceLabel}\n\n` +
                  `Olá! Tenho interesse neste item do catálogo e gostaria de mais detalhes sobre prazos e personalização.`;
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

/* ============================================================
   ABOUT PAGE
   ============================================================ */
function AboutPage({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <div className="container">
        <button className="btn-back" onClick={() => onBack('home')}>← Voltar para o Início</button>

        <article className="about-content glass animated">
          <header className="about-header">
            <span className="detail-category">Nossa Empresa</span>
            <h1>Sobre Nós</h1>
          </header>

          <section className="about-section">
            <h2>Nossa História</h2>
            <p>Minha jornada no mundo da impressão 3D começou há cerca de dois anos. Durante esse período, adquiri conhecimento aprofundado em montagem e manutenção de equipamentos, trabalhando diretamente na área e compreendendo todos os detalhes técnicos necessários para o sucesso neste segmento.</p>
            <p>Após essa minha experiência acumulada, decidi empreender por conta própria. Investi meus recursos em uma impressora 3D iniciante da marca Two Trees Bluer Plus, marcando o início oficial de nossa operação. Nessa etapa, contei com o apoio da minha noiva, e juntos começamos a estruturar nosso negócio.</p>
            <p>Com o crescimento progressivo, reinvestimos nossos ganhos e realizamos uma atualização significativa de equipamento, adquirindo uma impressora Bambu Lab A1 com o módulo AMS. Esse investimento potencializou nossa capacidade produtiva e qualidade de trabalho.</p>
          </section>

          <section className="about-section">
            <h2>Presente e Alcance</h2>
            <p>Hoje, nossa empresa atua tanto no mercado nacional quanto internacional. Realizamos vendas para clientes em todo o Brasil, assim como para os Estados Unidos e Venezuela, consolidando nossa posição como fornecedora confiável de produtos impressos em 3D em diferentes regiões.</p>
            <p>Continuamos comprometidos com a qualidade, inovação e excelência no atendimento, mantendo os valores que nos levaram a crescer desde o início: dedicação, conhecimento técnico e foco no cliente.</p>
          </section>
        </article>
      </div>
    </div>
  );
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */
function Testimonials() {
  const [current, setCurrent] = useState(0);
  const ref = useScrollReveal();

  const prev = () => setCurrent(c => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent(c => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  return (
    <section className="testimonials reveal" ref={ref}>
      <h2 className="section-title">O Que Nossos Clientes Dizem</h2>
      <p className="section-subtitle">Depoimentos reais de quem confia no nosso trabalho</p>
      <div className="testimonials-wrapper">
        <div className="testimonials-track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {TESTIMONIALS.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="stars">{'★'.repeat(t.stars)}</div>
              <blockquote>"{t.text}"</blockquote>
              <div className="testimonial-author">{t.name}</div>
              <div className="testimonial-company">{t.company}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="test-nav">
        <button onClick={prev} aria-label="Anterior">‹</button>
        <button onClick={next} aria-label="Próximo">›</button>
      </div>
    </section>
  );
}

/* ============================================================
   CTA
   ============================================================ */
function CTA() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const ref = useScrollReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!name.trim()) errs.name = true;
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = true;
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      const message = `🚀 *Novo Contato - Studio 3D Formará*\n` +
        `--------------------------------------------\n` +
        `👤 *Nome:* ${name}\n` +
        `✉️ *E-mail:* ${email}\n\n` +
        `Olá! Vi o site e gostaria de solicitar um orçamento personalizado para o meu projeto 3D.`;
      const msgEncoded = encodeURIComponent(message);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msgEncoded}`, '_blank');
    }
  };

  return (
    <section className="cta-section reveal glass" id="contato" ref={ref}>
      <h2>Pronto para Dar Vida ao Seu Projeto?</h2>
      {submitted ? (
        <div className="form-success">🎉 Obrigado! Entraremos em contato em breve.</div>
      ) : (
        <>
          <form className="cta-form" onSubmit={handleSubmit}>
            <input
              type="text" placeholder="Seu nome" value={name}
              onChange={e => setName(e.target.value)}
              className={errors.name ? 'error' : ''}
            />
            <input
              type="email" placeholder="Seu e-mail" value={email}
              onChange={e => setEmail(e.target.value)}
              className={errors.email ? 'error' : ''}
            />
            <button type="submit">Solicitar Orçamento Grátis</button>
          </form>
          <p className="cta-micro">Resposta em até 2 horas úteis • Sem compromisso</p>
        </>
      )}
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer({ onHome }) {
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

/* ============================================================
   APP
   ============================================================ */
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

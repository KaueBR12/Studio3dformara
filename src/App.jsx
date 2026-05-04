import { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';

/* ============================================================
   DATA
   ============================================================ */
const PRODUCTS = [
  { id: 1, name: 'Engrenagem Industrial', price: 45, material: 'PLA/ABS', category: 'Peças Técnicas', ribbon: 'Popular' },
  { id: 2, name: 'Case para Eletrônicos', price: 89, material: 'PETG', category: 'Peças Técnicas', ribbon: 'Novo' },
  { id: 3, name: 'Protótipo Arquitetônico', price: 320, material: 'Resina', category: 'Protótipos', ribbon: null },
  { id: 4, name: 'Suporte de Parede Modular', price: 35, material: 'PLA', category: 'Decoração', ribbon: null },
  { id: 5, name: 'Peça de Reposição Custom', price: 120, material: 'Nylon', category: 'Peças Técnicas', ribbon: 'Popular' },
  { id: 6, name: 'Miniatura Decorativa', price: 65, material: 'Resina UV', category: 'Decoração', ribbon: 'Novo' },
  { id: 7, name: 'Molde para Fabricação', price: 280, material: 'ABS', category: 'Protótipos', ribbon: null },
  { id: 8, name: 'Conector Mecânico', price: 28, material: 'PLA+', category: 'Peças Técnicas', ribbon: null },
  { id: 9, name: 'Kit Educacional Robótica', price: 195, material: 'PLA Colorido', category: 'Educacional', ribbon: 'Novo' },
];

const CATEGORIES = ['Todos', 'Peças Técnicas', 'Decoração', 'Protótipos', 'Educacional'];

const MATERIALS = [
  { name: 'PLA', desc: 'Biodegradável e fácil de imprimir. Ideal para protótipos e modelos decorativos.', icon: '🌿', res: 60, flex: 30, temp: 40 },
  { name: 'ABS', desc: 'Alta resistência mecânica e térmica. Perfeito para peças industriais.', icon: '🔧', res: 80, flex: 40, temp: 85 },
  { name: 'PETG', desc: 'Combina resistência com transparência. Ótimo para peças funcionais.', icon: '💎', res: 75, flex: 50, temp: 70 },
  { name: 'Resina', desc: 'Detalhamento excepcional. Ideal para miniaturas e peças estéticas.', icon: '✨', res: 50, flex: 20, temp: 55 },
  { name: 'Nylon', desc: 'Extremamente resistente e flexível. Para aplicações de engenharia.', icon: '⚡', res: 90, flex: 80, temp: 75 },
  { name: 'TPU', desc: 'Material flexível e elástico. Perfeito para capas, vedações e juntas.', icon: '🔄', res: 45, flex: 95, temp: 60 },
];

const TESTIMONIALS = [
  { name: 'Carlos Mendes', company: 'AutoTech Engenharia', text: 'A qualidade das peças superou todas as expectativas. O acabamento é impecável e a precisão dimensional é perfeita para nossas aplicações industriais.', stars: 5 },
  { name: 'Ana Beatriz', company: 'Studio Arquitetura', text: 'Já fizemos mais de 30 maquetes com a PrintLab 3D. A equipe entende exatamente o que precisamos e entrega sempre no prazo. Recomendo demais!', stars: 5 },
  { name: 'Roberto Silva', company: 'EduRobot', text: 'Os kits educacionais ficaram incríveis! Material resistente, cores vibrantes e o suporte técnico é excepcional. Parceria de longo prazo garantida.', stars: 5 },
];

/* ============================================================
   SVG ICONS (inline)
   ============================================================ */
const CubeLogo = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" stroke="currentColor" strokeWidth="2" fill="rgba(29,111,164,0.2)"/>
    <path d="M16 2L28 9L16 16L4 9L16 2Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(55,138,221,0.15)"/>
    <path d="M16 16V30" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M16 16L28 9" stroke="currentColor" strokeWidth="1"/>
  </svg>
);

const ProductIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 6L40 15V33L24 42L8 33V15L24 6Z" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none"/>
    <path d="M24 6L40 15L24 24L8 15L24 6Z" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="rgba(255,255,255,0.05)"/>
    <path d="M24 24V42" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
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
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { label: 'Catálogo', href: '#catalogo' },
    { label: 'Materiais', href: '#materiais' },
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="nav-logo"><CubeLogo /> PrintLab 3D</a>
        <ul className="nav-links">
          {links.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
        </ul>
        <button className="nav-cta" onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}>
          Solicitar Orçamento
        </button>
        <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map(l => <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>)}
        <button className="btn-primary" onClick={() => { setMenuOpen(false); document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }); }}>
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
      <div className="hero-grid" />
      <div className="cube-container">
        <div className="cube">
          {[...Array(6)].map((_, i) => <div key={i} className="cube-face" />)}
        </div>
      </div>
      <div className="hero-content">
        <h1>Transformamos <span>Ideias</span> em Objetos Reais</h1>
        <p>Impressão 3D profissional com precisão micrométrica, velocidade de entrega e qualidade industrial. Do protótipo à produção em escala.</p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}>
            Ver Catálogo
          </button>
          <button className="btn-outline" onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}>
            Como Funciona
          </button>
        </div>
        <div className="hero-badge">✓ Entrega em até 5 dias úteis</div>
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
        <div className="stat-item"><h3><AnimatedNumber target={500} suffix="+" /></h3><p>Modelos Disponíveis</p></div>
        <div className="stat-item"><h3><AnimatedNumber target={10000} suffix="+" /></h3><p>Peças Entregues</p></div>
        <div className="stat-item"><h3><AnimatedNumber target={15} suffix="+" /></h3><p>Materiais Disponíveis</p></div>
        <div className="stat-item"><h3><AnimatedNumber target={98} suffix="%" /></h3><p>Satisfação dos Clientes</p></div>
      </div>
    </section>
  );
}

/* ============================================================
   CATALOG
   ============================================================ */
function Catalog() {
  const [filter, setFilter] = useState('Todos');
  const ref = useScrollReveal();

  const filtered = filter === 'Todos' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  return (
    <section className="catalog reveal" id="catalogo" ref={ref}>
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
          <div className="product-card" key={p.id}>
            <div className="product-image">
              <ProductIcon />
              {p.ribbon && <div className="product-ribbon">{p.ribbon}</div>}
            </div>
            <div className="product-body">
              <h4>{p.name}</h4>
              <div className="product-meta">
                <span className="badge-material">{p.material}</span>
                <span className="badge-category">{p.category}</span>
              </div>
              <div className="product-price">R$ {p.price.toFixed(2).replace('.', ',')}</div>
              <button className="btn-solicitar"><span>Solicitar</span></button>
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
    <section className="materials reveal" id="materiais" ref={ref}>
      <h2 className="section-title">Materiais Disponíveis</h2>
      <p className="section-subtitle">Cada projeto merece o material ideal</p>
      <div className="materials-grid">
        {MATERIALS.map(m => (
          <div className="material-card" key={m.name}>
            <div className="material-icon">{m.icon}</div>
            <h4>{m.name}</h4>
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
    { icon: '📤', title: 'Envie o Arquivo', desc: 'Formato STL, OBJ ou STEP' },
    { icon: '⚙️', title: 'Configuramos', desc: 'Escolha material, qualidade e quantidade' },
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
    }
  };

  return (
    <section className="cta-section reveal" id="contato" ref={ref}>
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
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="#" className="nav-logo"><CubeLogo /> PrintLab 3D</a>
          <p>Transformando ideias em objetos reais com impressão 3D profissional de alta qualidade.</p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
        <div>
          <h5>Empresa</h5>
          <ul><li><a href="#">Sobre Nós</a></li><li><a href="#">Blog</a></li><li><a href="#">Carreiras</a></li><li><a href="#">Parceiros</a></li></ul>
        </div>
        <div>
          <h5>Catálogo</h5>
          <ul><li><a href="#">Peças Técnicas</a></li><li><a href="#">Decoração</a></li><li><a href="#">Protótipos</a></li><li><a href="#">Educacional</a></li></ul>
        </div>
        <div>
          <h5>Suporte</h5>
          <ul><li><a href="#">Central de Ajuda</a></li><li><a href="#">Envio de Arquivos</a></li><li><a href="#">Guia de Materiais</a></li><li><a href="#">Contato</a></li></ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 PrintLab 3D. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Catalog />
      <Materials />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}

export const WHATSAPP_NUMBER = '5547984197103';

export const PRODUCTS = [
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

export const CATEGORIES = ['Todos', 'Decoração'];

export const MATERIALS = [
  { name: 'PLA', desc: 'Biodegradável e fácil de imprimir. Ideal para protótipos e modelos decorativos.', icon: '🌿', res: 60, flex: 30, temp: 40 },
  { name: 'ABS', desc: 'Alta resistência mecânica e térmica. Perfeito para peças industriais.', icon: '🔧', res: 80, flex: 40, temp: 85 },
  { name: 'PETG', desc: 'Combina resistência com transparência. Ótimo para peças funcionais.', icon: '💎', res: 75, flex: 50, temp: 70 },
];

export const TESTIMONIALS = [
  { name: 'Carlos Mendes', company: 'AutoTech Engenharia', text: 'A qualidade das peças superou todas as expectativas. O acabamento é impecável e a precisão dimensional é perfeita para nossas aplicações industriais.', stars: 5 },
  { name: 'Ana Beatriz', company: 'Studio Arquitetura', text: 'Já fizemos mais de 30 maquetes com a Studio 3D Formará. A equipe entende exatamente o que precisamos e entrega sempre no prazo. Recomendo demais!', stars: 5 },
  { name: 'Roberto Silva', company: 'EduRobot', text: 'Os kits educacionais ficaram incríveis! Material resistente, cores vibrantes e o suporte técnico é excepcional. Parceria de longo prazo garantida.', stars: 5 },
];

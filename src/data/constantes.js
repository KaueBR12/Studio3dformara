export const WHATSAPP_NUMBER = '554796282944';

export const PRODUCTS = [
  {
    id: 1,
    name: 'Litofania',
    price: 250,
    material: 'PLA',
    category: 'Decoração',
    ribbon: 'Popular',
    description: 'A Litofania é uma peça de arte tridimensional que revela uma imagem detalhada quando iluminada por trás. Perfeita para presentes personalizados e decoração memorável.',
    images: ['/images/lito1.jpeg', '/images/lito2.jpeg', '/images/p1b.png']
  },
  {
    id: 9,
    name: 'Action Figures',
    priceMin: 100,
    priceMax: 500,
    material: 'PLA/PETG',
    category: 'Colecionáveis',
    ribbon: 'Premium',
    description: 'Action Figures com alto nível de detalhamento e acabamento impecável. Perfeito para colecionadores e entusiastas que buscam peças exclusivas de seus personagens favoritos.',
    images: ['/images/1.png', '/images/3.png']
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
    images: ['/images/cheaveirocefe.png', '/images/chaveirotanjr.png', '/images/chaveirocoracao.png']
  },
  {
    id: 4,
    name: 'Caixa Livro',
    price: 150,
    material: 'PLA',
    category: 'Decoração',
    ribbon: null,
    description: 'Uma caixa organizadora elegante disfarçada de livro. Combina funcionalidade com um toque clássico para qualquer ambiente.',
    images: ['/images/livrocaixa.png']
  },
  {
    id: 5,
    name: 'Marca Páginas',
    priceMin: 10,
    priceMax: 40,
    material: 'PLA',
    category: 'Decoração',
    description: 'Marca-páginas com designs geométricos e artísticos. Leves, resistentes e perfeitos para os amantes da leitura.',
    images: ['/images/marcapg1.png', '/images/marcapg2.png', '/images/marcapg3.png']
  },
  {
    id: 6,
    name: 'Miniatura Decorativa do seu Pet',
    price: 180,
    material: 'PLA',
    category: 'Decoração',
    ribbon: 'Popular',
    description: 'Transforme a foto do seu melhor amigo em uma miniatura 3D eterna. Capturamos os detalhes únicos que tornam seu pet especial.',
    images: ['/images/pet.png', '/images/pet2.png']
  },
  {
    id: 7,
    name: 'Carta Envelope',
    price: 15,
    material: 'PLA',
    category: 'Decoração',
    description: 'Um envelope decorativo elegante e personalizado, ideal para presentear ou organizar pequenos cartões com um toque artesanal 3D.',
    images: ['/images/cartaenv.png']
  },
  {
    id: 8,
    name: 'Porta Retrato de Nuvem',
    price: 10,
    material: 'PLA',
    category: 'Decoração',
    description: 'Um porta-retrato charmoso em formato de nuvem, perfeito para decorar quartos infantis ou trazer um toque lúdico ao ambiente.',
    images: ['/images/portretrato.png']
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
];

export const CATEGORIES = ['Todos', 'Decoração', 'Colecionáveis'];

export const MATERIALS = [
  { name: 'PLA', desc: 'Biodegradável e fácil de imprimir. Ideal para protótipos e modelos decorativos.', icon: '🌿', res: 60, flex: 30, temp: 40 },
  { name: 'ABS', desc: 'Alta resistência mecânica e térmica. Perfeito para peças industriais.', icon: '🔧', res: 80, flex: 40, temp: 85 },
  { name: 'PETG', desc: 'Combina resistência com transparência. Ótimo para peças funcionais.', icon: '💎', res: 75, flex: 50, temp: 70 },
];

export const TESTIMONIALS = [
  { name: 'Amanda de Araújo Bonetti', text: 'Amei esse ursinho em impressão 3D pra decorar o quarto da Alice. Ficou top!', stars: 5 },
  { name: 'Arianna', text: 'Adorei esse lindo detalhe, gostei da qualidade também, uma linda lembrança para dar de presente!', stars: 5 },
  { name: 'Cristiane', company: 'OhubDev', text: 'Amei!', stars: 5 },
  { name: 'Madalena Rockemback', text: 'Vocês são incríveis, eu amei, vocês fizeram exatamente o que eu pensei <3', stars: 5 }
];

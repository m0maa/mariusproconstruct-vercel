// Marius ProConstruct Ilfov - Constructor General

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  priceFrom?: string
  priceType?: 'mp' | 'lucrare' | 'proiect' | 'ml'
}

export interface Project {
  id: string
  title: string
  category: string
  image: string
  description: string
  date?: string
}

// Company Information
export const companyInfo = {
  name: 'Marius ProConstruct',
  tagline: 'Construim Case la Cheie în București și Ilfov',
  email: 'banmarius18@gmail.com',
  facebook: 'https://www.facebook.com/share/1FTWDpHEv1/?mibextid=wwXIfr',
  phone: '+40 727 400 613',
  years: 20,
  teamSize: 7,
  location: 'București și Ilfov',
}

// Services Configuration
export const services: Service[] = [
  {
    id: 'case-la-cheie',
    title: 'Construcții Case la Cheie',
    description: 'Construim case complete de la fundație până la finisaje. Proiectare, execuție și predare la cheie.',
    icon: 'Home',
    priceFrom: 'La cerere',
    priceType: 'proiect',
  },
  {
    id: 'montaj-gresie-faianza',
    title: 'Montaj Gresie și Faianță',
    description: 'Montaj profesional gresie și faianță pentru băi, bucătării și alte spații. Preț în funcție de mărimea plăcilor.',
    icon: 'Squares',
    priceFrom: '80-120 lei/mp',
    priceType: 'mp',
  },
  {
    id: 'montaj-rigips',
    title: 'Montaj Rigips Complet',
    description: 'Sistem complet: structură metalică, placare rigips, gletuire, șlefuire, amorsă și vopsea albă 2 straturi.',
    icon: 'Layers',
    priceFrom: '100 lei/mp',
    priceType: 'mp',
  },
  {
    id: 'montaj-parchet',
    title: 'Montaj Parchet',
    description: 'Montaj parchet laminat, stratificat sau masiv. Prețul variază în funcție de model și complexitate.',
    icon: 'Grid3x3',
    priceFrom: '40-100 lei/mp',
    priceType: 'mp',
  },
  {
    id: 'tencuiala-gletuita',
    title: 'Tencuială Gletuită',
    description: 'Gletuit interior pentru finisaje perfecte. Pregătire pentru vopsire, finisaje lucioase sau mate.',
    icon: 'Paintbrush',
    priceFrom: '45-70 lei/mp',
    priceType: 'mp',
  },
  {
    id: 'fatade-termosistem',
    title: 'Fațade și Termosistem',
    description: 'Izolație termică exterioară cu polistiren, armare și finisaj decorativ. Eficiență energetică maximă.',
    icon: 'Building',
    priceFrom: '80-120 lei/mp',
    priceType: 'mp',
  },
  {
    id: 'placari-faiana-exterior',
    title: 'Placări Faianță Exterior',
    description: 'Placări faianță pentru balcoane, terase și fațade decorative. Rezistență la intemperii.',
    icon: 'BrickWall',
    priceFrom: '90-130 lei/mp',
    priceType: 'mp',
  },
  {
    id: 'plinti-soclu',
    title: 'Plinți și Socluri',
    description: 'Montaj plinți PVC/MDF și socluri gresie. Finisaje complete pentru pardoseli.',
    icon: 'Minus',
    priceFrom: '20-30 lei/ml',
    priceType: 'ml',
  },
  {
    id: 'zidarie-interior',
    title: 'Zidărie Interior',
    description: 'Pereți interiori cărămidă, compartimentări, deschideri. Structuri stabile și durabile.',
    icon: 'Wall',
    priceFrom: 'La cerere',
    priceType: 'lucrare',
  },
  {
    id: 'finisaje-premium',
    title: 'Finisaje Premium',
    description: 'Vopsire decorativă, tapet premium, decorări interioare. Calitate superioară pentru detalii care fac diferența.',
    icon: 'Sparkles',
    priceFrom: 'La cerere',
    priceType: 'lucrare',
  },
]

// Project Categories
export const projectCategories = [
  { id: 'all', name: 'Toate', slug: 'toate' },
  { id: 'case-la-cheie', name: 'Case la Cheie', slug: 'case-la-cheie' },
  { id: 'finisaje-interioare', name: 'Finisaje Interioare', slug: 'finisaje-interioare' },
  { id: 'gresie-faianza', name: 'Gresie și Faianță', slug: 'gresie-faianza' },
  { id: 'rigips-gletuit', name: 'Rigips și Gletuit', slug: 'rigips-gletuit' },
  { id: 'parchet', name: 'Parchet', slug: 'parchet' },
]

// Coverage Zones - București și Ilfov
export const coverageZones = [
  'București - toate zonele',
  'Voluntari',
  'Pantelimon',
  'Popești-Leordeni',
  'Buftea',
  'Otopeni',
  'Mogoșoaia',
  'Snagov',
  'Cernica',
  'Brănești',
  'Afumați',
  'Și alte localități din Ilfov...',
]

// Testimonials
export const testimonials = [
  {
    id: '1',
    name: 'Ion Popescu',
    service: 'Construcție Casă la Cheie',
    rating: 5,
    text: 'Echipa lui Marius a construit casa visurilor noastre. Profesioniști desăvârșiți, serioși și punctuali. Finisajele sunt deosebite!',
    date: 'Aprilie 2024',
  },
  {
    id: '2',
    name: 'Maria Ionescu',
    service: 'Montaj Gresie și Faianță',
    rating: 5,
    text: 'Montaj impecabil în baie și bucătărie. Au terminat în timpul promis și prețul a fost exact cel convenit. Recomand!',
    date: 'Mai 2024',
  },
  {
    id: '3',
    name: 'Georgel Dumitrescu',
    service: 'Finisaje Complete',
    rating: 5,
    text: 'Au finisat apartamentul de la A la Z. Rigips, gletuit, vopsire, parchet - totul la superlativ. Echipă tânără și serioasă.',
    date: 'Martie 2024',
  },
  {
    id: '4',
    name: 'Elena Radu',
    service: 'Renovare Completă',
    rating: 5,
    text: 'Renovare completă a casei. Au muncit fără oprire, nu au băut nimic la muncă și au respectat tot ce am stabilit. Recomand cu toată încrederea!',
    date: 'Februarie 2024',
  },
]

// Translations
export const t = {
  nav: {
    home: 'Acasă',
    services: 'Servicii',
    projects: 'Proiecte',
    about: 'Despre',
    contact: 'Contact',
    getQuote: 'Solicită Ofertă',
  },
  hero: {
    badge: 'Constructor Profesionist în București și Ilfov',
    cta: 'Vreau o Ofertă Gratuită',
    viewProjects: 'Descoperă Proiectele',
    stats: {
      experience: 'Ani Experiență',
      projects: 'Proiecte Finalizate',
      team: 'Membri Echipă',
      satisfaction: 'Clienți Mulțumiți',
    },
  },
  services: {
    subtitle: 'De Ce Noi?',
    title: 'Servicii',
    description: 'Construcții și finisaje de calitate premium în București și Ilfov',
    priceFrom: 'de la',
    perMp: '/mp',
    perLucrare: '/lucrare',
    perProiect: '/proiect',
    perMl: '/ml',
    requestService: 'Cere o Ofertă',
  },
  projects: {
    subtitle: 'Portofoliu',
    title: 'Proiectele Noastre',
    description: 'Vezi lucrările noastre - calitate și finisaje premium',
    filterAll: 'Toate',
    viewProject: 'Vezi Detalii',
  },
  about: {
    subtitle: 'Despre Noi',
    title: 'Marius ProConstruct Ilfov',
    description: '20 de ani de experiență în construcții și finisaje',
    story: 'Povestea Noastră',
    storyText: 'Suntem o echipă de 7 constructori profesioniști cu peste 20 de ani de experiență în domeniu. Construim case de la 0 la cheie și executăm finisaje premium în București și Ilfov. Ne mândrim cu seriozitate, punctualitate și calitate. La noi nu se bea alcool la muncă - doar muncă serioasă și rezultate care vorbesc de la sine. Fiecare proiect este tratat cu maximă seriozitate, fie că e vorba de o casă nouă sau de finisaje interioare.',
    values: {
      title: 'De Ce Noi?',
      items: [
        { title: 'Experiență', description: '20 de ani în domeniu' },
        { title: 'Echipă Stabilă', description: '7 profesioniști serioși' },
        { title: 'Fără Alcool', description: 'Exclus băutura în timpul muncii' },
        { title: 'Finisaje Premium', description: 'Calitate superioară garantată' },
        { title: 'Prețuri Corecte', description: 'Transparent și onest' },
        { title: 'Punctualitate', description: 'Respectăm termenele' },
      ],
    },
  },
  testimonials: {
    subtitle: 'Recenzii',
    title: 'Ce Spun Clienții',
    description: 'Feedback real de la clienții mulțumiți',
  },
  contact: {
    subtitle: 'Contact',
    title: 'Vrei o Ofertă Gratuită?',
    description: 'Suntem aici pentru a te ajuta cu proiectul tău',
    form: {
      name: 'Numele tău',
      email: 'Email',
      phone: 'Telefon',
      service: 'Serviciul dorit',
      message: 'Descrie proiectul tău',
      submit: 'Trimite',
      success: 'Solicitare trimisă cu succes! Te vom contacta în curând.',
      error: 'Eroare la trimitere. Te rog încearcă din nou.',
    },
    info: {
      title: 'Informații Contact',
      phone: 'Telefon',
      email: 'Email',
      address: 'Zonă Acoperită',
      program: 'Program Lucru',
      hours: 'Luni - Sâmbătă: 7:00 - 19:00',
    },
  },
  footer: {
    tagline: 'Construim case de la 0 la Cheie',
    services: 'Servicii',
    quickLinks: 'Link-uri Rapide',
    contact: 'Contact',
    copyright: 'Toate drepturile rezervate.',
    felistar: 'Creat de',
    felicitar: 'Creat de',
  },
  zones: {
    subtitle: 'Zone Acoperite',
    title: 'București și Ilfov',
    description: 'Acoperim complet Bucureștiul și județul Ilfov',
  },
}

// Stats for Hero
export const heroStats = [
  { value: '20+', label: 'Ani Experiență' },
  { value: '200+', label: 'Proiecte' },
  { value: '7', label: 'Membri Echipă' },
  { value: '100%', label: 'Satisfacție' },
]

// Helper functions
export function getServiceById(id: string): Service | undefined {
  return services.find(s => s.id === id)
}

export function getServicesByCategory(category: string): Service[] {
  if (category === 'all') return services
  return services.filter(s => s.id.startsWith(category))
}

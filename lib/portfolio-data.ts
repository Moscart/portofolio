import type { ProjectItem } from './portfolio-logic';

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'indonesian-movie-recommender',
    index: '01',
    title: 'Sistem Rekomendasi Film Indonesia',
    client: 'Riset & Pengembangan Web · Surakarta',
    year: '2024',
    role: 'Frontend & Full-Stack Developer',
    category: 'interactive-ui',
    categoryLabel: 'Web App',
    readTime: '5 mnt baca',
    featuredSpan: 'wide',
    summary:
      'Aplikasi web pencari dan pemberi rekomendasi film Indonesia berbasis algoritma Content-Based Filtering dan Vector Space Model (VSM) dengan antarmuka pencarian instan yang responsif.',
    problemStatement:
      'Pengguna kesulitan menemukan referensi film Indonesia yang relevan berdasarkan kemiripan sinopsis, genre, dan pemeran tanpa harus menelusuri katalog secara manual.',
    architectureHighlights: [
      'Implementasi pembobotan TF-IDF dan perhitungan Cosine Similarity pada Vector Space Model untuk menyajikan rekomendasi film yang akurat.',
      'Antarmuka katalog responsif dengan pendekatan Mobile-First, fitur pencarian real-time, serta halaman detail informasi film yang bersih.',
      'Integrasi API yang efisien dengan pemuatan data terstruktur agar tetap ringan diakses melalui jaringan perangkat seluler.',
    ],
    metrics: [
      { label: 'Metode', value: 'VSM & TF-IDF', delta: 'Content-Based Filtering' },
      { label: 'Antarmuka', value: 'Responsif', delta: 'Mobile-First Design' },
      { label: 'Akurasi', value: 'Presisi Tinggi', delta: 'Kemiripan konten relevan' },
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'REST API'],
    liveDemoType: 'command-router',
    codeSnippet: `// Perhitungan kemiripan vektor (Cosine Similarity) untuk rekomendasi film
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * (vecB[i] ?? 0), 0);
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return magA && magB ? dotProduct / (magA * magB) : 0;
}`,
    liveUrl: 'https://github.com/Moscart',
    repoUrl: 'https://github.com/Moscart',
  },
  {
    id: 'next-typescript-boilerplate',
    index: '02',
    title: 'Next.js & TypeScript Starter Kit',
    client: 'Open Source · GitHub (@Moscart)',
    year: '2025',
    role: 'Frontend Programmer',
    category: 'design-system',
    categoryLabel: 'Design System',
    readTime: '4 mnt baca',
    featuredSpan: 'normal',
    summary:
      'Arsitektur fondasi proyek (boilerplate) berbasis Next.js, React, dan TypeScript yang dirancang untuk mempercepat inisiasi aplikasi web modern dengan struktur kode yang rapi dan konsisten.',
    problemStatement:
      'Memulai proyek frontend baru sering kali memakan waktu berulang pada tahap konfigurasi linting, struktur folder, komponen dasar UI, serta aturan pengetikan TypeScript.',
    architectureHighlights: [
      'Struktur direktori modular yang memisahkan komponen UI, utilitas murni, dan custom hooks agar mudah dipelihara.',
      'Konfigurasi ketat TypeScript dan ESLint untuk mencegah bug tipe data sejak tahap pengembangan.',
      'Komponen dasar responsif dengan dukungan penuh tema terang dan gelap menggunakan Tailwind CSS.',
    ],
    metrics: [
      { label: 'Inisiasi Proyek', value: '3x Cepat', delta: 'Siap produksi sejak hari pertama' },
      { label: 'Type Safety', value: '100% Strict', delta: 'Zero implicit any' },
      { label: 'Performa Build', value: 'Optimal', delta: 'Bundle ringan & modular' },
    ],
    techStack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
    liveDemoType: 'token-button',
    codeSnippet: `// Komponen UI modular dengan dukungan penuh TypeScript
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}`,
    liveUrl: 'https://github.com/Moscart/next-boilerplate',
    repoUrl: 'https://github.com/Moscart/next-boilerplate',
  },
  {
    id: 'space-tourism-interactive',
    index: '03',
    title: 'Space Tourism Interactive Portal',
    client: 'Eksplorasi Frontend · GitHub (@Moscart)',
    year: '2024',
    role: 'Frontend Developer',
    category: 'performance',
    categoryLabel: 'Performa',
    readTime: '4 mnt baca',
    featuredSpan: 'normal',
    summary:
      'Website interaktif multi-halaman bertema eksplorasi antariksa yang dibangun menggunakan TypeScript, menonjolkan ketepatan tata letak responsif dari layar mobile, tablet, hingga desktop.',
    problemStatement:
      'Menyajikan konten visual dan navigasi bertingkat (destinasi, kru, dan teknologi) tanpa membebani performa halaman atau merusak tata letak pada layar ponsel.',
    architectureHighlights: [
      'Implementasi sistem tab aksesibel yang mendukung navigasi penuh melalui keyboard maupun sentuhan layar.',
      'Tata letak Mobile-First menggunakan CSS Grid dan Flexbox yang beradaptasi mulus di setiap titik henti (breakpoint).',
      'Pengelolaan aset gambar adaptif untuk memastikan waktu muat halaman tetap cepat dan bebas pergeseran tata letak (CLS).',
    ],
    metrics: [
      { label: 'Skor Performa', value: '99/100', delta: 'Optimasi aset & struktur DOM' },
      { label: 'Responsivitas', value: '3 Viewport', delta: 'Mobile, Tablet, Desktop' },
      { label: 'Aksesibilitas', value: 'WCAG AA', delta: 'Navigasi tab semantik' },
    ],
    techStack: ['TypeScript', 'React', 'CSS Grid', 'Responsive UI'],
    liveDemoType: 'editorial-fluid',
    codeSnippet: `// Pengelolaan tab destinasi interaktif yang ramah aksesibilitas
const [activeTab, setActiveTab] = useState<number>(0);`,
    liveUrl: 'https://github.com/Moscart/space-tourism',
    repoUrl: 'https://github.com/Moscart/space-tourism',
  },
  {
    id: 'ecommerce-typemaster-showcase',
    index: '04',
    title: 'Typemaster & E-Commerce Storefront',
    client: 'Portofolio Proyek Web · GitHub (@Moscart)',
    year: '2024',
    role: 'Frontend Developer',
    category: 'interactive-ui',
    categoryLabel: 'Web App',
    readTime: '4 mnt baca',
    featuredSpan: 'wide',
    summary:
      'Implementasi antarmuka aplikasi e-commerce dan landing page produk perangkat keras dengan galeri produk interaktif, pengelolaan keranjang belanja, dan validasi input instan.',
    problemStatement:
      'Pengalaman berbelanja di perangkat mobile membutuhkan alur interaksi yang jelas, tombol yang nyaman disentuh ibu jari, serta umpan balik visual yang seketika.',
    architectureHighlights: [
      'Pengelolaan state keranjang belanja secara reaktif dengan pembaruan jumlah item dan kalkulasi harga instan.',
      'Galeri pratinjau produk dilengkapi modal lightbox dan kontrol pemilihan varian yang intuitif.',
      'Komponen formulir dan validasi input berfokus pada kejelasan pesan kesalahan serta kemudahan penggunaan.',
    ],
    metrics: [
      { label: 'Interaksi UI', value: 'Instan', delta: 'State keranjang reaktif' },
      { label: 'Tata Letak', value: 'Mobile-First', delta: 'Ergonomi layar sentuh' },
      { label: 'Kualitas Kode', value: 'Clean Code', delta: 'Komponen dapat digunakan ulang' },
    ],
    techStack: ['TypeScript', 'React', 'Tailwind CSS', 'State Management'],
    liveDemoType: 'orderbook-stream',
    codeSnippet: `// Kalkulasi total keranjang belanja secara deterministik
const totalAmount = items.reduce((acc, item) => acc + item.price * item.qty, 0);`,
    liveUrl: 'https://github.com/Moscart/e-commerce',
    repoUrl: 'https://github.com/Moscart/e-commerce',
  },
];

export interface ExperienceItem {
  index: string;
  period: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  impactMetrics: string;
  technologies: string;
}

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    index: '01',
    period: '2024 — Sekarang',
    role: 'Frontend Programmer',
    company: 'PT Daya Rekadigital Indonesia (Rekadigi)',
    location: 'Surakarta, Jawa Tengah',
    summary:
      'Merancang dan mengembangkan antarmuka aplikasi web modern untuk berbagai proyek transformasi digital menggunakan React.js, Next.js, TypeScript, dan Tailwind CSS dengan pendekatan Mobile-First.',
    impactMetrics: 'Software House & Digital Agency',
    technologies: 'React.js · Next.js · TypeScript · Tailwind CSS · REST API',
  },
  {
    index: '02',
    period: '2023 — 2024',
    role: 'Frontend / Web Developer',
    company: 'STT Warga Surakarta (Sekolah Tinggi Teknologi Warga)',
    location: 'Sukoharjo / Surakarta, Jawa Tengah',
    summary:
      'Mengembangkan dan memodernisasi antarmuka sistem informasi serta portal web institusi agar responsif, cepat, dan nyaman diakses di berbagai perangkat.',
    impactMetrics: 'Sistem Informasi & Portal Web',
    technologies: 'React.js · JavaScript · Tailwind CSS · Responsive UI',
  },
  {
    index: '03',
    period: '2022 — 2023',
    role: 'Frontend Programmer',
    company: 'PT Javan Cipta Solusi',
    location: 'Yogyakarta / Remote',
    summary:
      'Terlibat dalam pengembangan antarmuka aplikasi web berskala enterprise dan solusi Business Process Automation (BPA) melalui kolaborasi aktif bersama tim engineering dan produk.',
    impactMetrics: 'Enterprise Web & IT Consultant',
    technologies: 'React.js · TypeScript · Modern Frontend · Git Workflow',
  },
  {
    index: '04',
    period: '2019',
    role: 'Web & Software Developer Intern',
    company: 'CV Duxeos (Duxeos Software House Solo)',
    location: 'Surakarta, Jawa Tengah',
    summary:
      'Melaksanakan Praktik Kerja Industri pengembangan perangkat lunak dan antarmuka web, mempelajari alur kerja tim engineering serta implementasi desain ke kode.',
    impactMetrics: 'Internship · Software House',
    technologies: 'HTML5 · CSS3 · JavaScript · Web Development · SQL',
  },
];

export const EDUCATION_HISTORY: ExperienceItem[] = [
  {
    index: '01',
    period: '2020 — 2024',
    role: 'Sarjana Komputer (S1 Teknik Informatika)',
    company: 'Universitas Duta Bangsa Surakarta (UDB)',
    location: 'Surakarta, Jawa Tengah',
    summary:
      'Mendalami rekayasa perangkat lunak, pengembangan aplikasi web modern, serta pengolahan data dan temu kembali informasi.',
    impactMetrics: 'Gelar Sarjana Komputer (S.Kom)',
    technologies: 'Software Engineering · Web Architecture · Algoritma',
  },
  {
    index: '02',
    period: '2017 — 2020',
    role: 'Rekayasa Perangkat Lunak (RPL)',
    company: 'SMK Negeri 2 Surakarta',
    location: 'Surakarta, Jawa Tengah',
    summary:
      'Mempelajari fondasi pemrograman berorientasi objek, pembuatan antarmuka web (HTML5, CSS3, JavaScript), basis data SQL, dan Git.',
    impactMetrics: 'Kompetensi Keahlian RPL',
    technologies: 'HTML5 · CSS3 · JavaScript · SQL · Git',
  },
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  ...WORK_EXPERIENCE,
  ...EDUCATION_HISTORY,
];

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  verifiedOutcome: string;
}

export const CLIENT_TESTIMONIALS: TestimonialItem[] = [];
export const ENGINEERING_PRINCIPLES = [];

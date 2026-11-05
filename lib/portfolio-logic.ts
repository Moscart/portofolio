export type ProjectCategory = 'all' | 'design-system' | 'performance' | 'interactive-ui';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  client: string;
  year: string;
  role: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  readTime: string;
  featuredSpan: 'wide' | 'normal';
  summary: string;
  problemStatement: string;
  architectureHighlights: string[];
  metrics: {
    label: string;
    value: string;
    delta: string;
  }[];
  techStack: string[];
  liveDemoType: 'token-button' | 'orderbook-stream' | 'editorial-fluid' | 'command-router';
  codeSnippet: string;
  liveUrl: string;
  repoUrl: string;
}

export interface SpringSimulationResult {
  points: { t: number; value: number }[];
  svgPath: string;
  settlingTimeMs: number;
  overshootPercent: number;
  dampingRatio: number;
  regimeLabel: 'Underdamped (Responsif & Membal)' | 'Critically Damped (Presisi & Cepat)' | 'Overdamped (Lambat & Tahan)';
  motionSnippet: string;
}

export interface ContrastAuditResult {
  ratio: number;
  formattedRatio: string;
  aaNormal: boolean;
  aaLarge: boolean;
  aaaNormal: boolean;
  aaaLarge: boolean;
  ratingLabel: 'AAA Sempurna' | 'AA Standar Produksi' | 'Hanya Teks Besar' | 'Gagal Kontras WCAG';
}

export type RenderStrategy = 'csr-naive' | 'ssr-streaming' | 'virtualized-window';

export interface RenderBenchmarkResult {
  domNodesRendered: number;
  frameTimeMs: number;
  estimatedFps: number;
  memoryKb: number;
  ttiMs: number;
  droppedFramesWarning: boolean;
  recommendation: string;
}

export interface InquiryFormInput {
  name: string;
  email: string;
  company: string;
  scope: 'design-system' | 'frontend-architecture' | 'interactive-web' | 'performance-audit';
  timelineWeeks: number;
  message: string;
}

export interface InquiryValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof InquiryFormInput, string>>;
}

export interface ProjectEstimateResult {
  estimatedWeeks: number;
  deliverablesCount: number;
  recommendedArchitecture: string;
  sprintBreakdown: { phase: string; weeks: number }[];
}

/**
 * Simulates a second-order harmonic oscillator (spring physics) used in modern UI libraries (Motion / React Spring).
 */
export function computeSpringTrajectory(
  stiffness: number,
  damping: number,
  mass: number = 1
): SpringSimulationResult {
  const safeStiffness = Math.max(20, Math.min(800, stiffness));
  const safeDamping = Math.max(2, Math.min(80, damping));
  const safeMass = Math.max(0.2, Math.min(5, mass));

  const omega0 = Math.sqrt(safeStiffness / safeMass);
  const zeta = safeDamping / (2 * Math.sqrt(safeStiffness * safeMass));

  const dt = 0.01; // 10ms steps
  const maxDuration = 1.5; // 1500ms
  const steps = Math.floor(maxDuration / dt);

  let x = 0;
  let v = 0;
  const target = 1;

  const points: { t: number; value: number }[] = [];
  let maxValue = 0;
  let lastUnsettledStep = 0;

  for (let i = 0; i <= steps; i++) {
    const t = Number((i * dt).toFixed(3));
    points.push({ t, value: Number(x.toFixed(4)) });

    if (x > maxValue) {
      maxValue = x;
    }
    if (Math.abs(target - x) > 0.005 || Math.abs(v) > 0.02) {
      lastUnsettledStep = i;
    }

    // Semi-implicit Euler integration with sub-stepping for stability
    const subSteps = 8;
    const subDt = dt / subSteps;
    for (let s = 0; s < subSteps; s++) {
      const force = -safeStiffness * (x - target) - safeDamping * v;
      const accel = force / safeMass;
      v += accel * subDt;
      x += v * subDt;
    }
  }

  const settlingTimeMs = Math.min(1500, Math.max(80, Math.round(lastUnsettledStep * dt * 1000)));
  const overshootPercent = Math.max(0, Number(((maxValue - 1) * 100).toFixed(1)));
  const roundedZeta = Number(zeta.toFixed(2));

  let regimeLabel: SpringSimulationResult['regimeLabel'] = 'Critically Damped (Presisi & Cepat)';
  if (zeta < 0.85) {
    regimeLabel = 'Underdamped (Responsif & Membal)';
  } else if (zeta > 1.15) {
    regimeLabel = 'Overdamped (Lambat & Tahan)';
  }

  // Build SVG path in a 320x120 viewBox where y=90 is target(1.0) and y=110 is start(0.0)
  // Wait: let's map value=0 -> y=104, value=1 -> y=44, value=1.4 -> y=20
  const width = 320;
  const pathParts = points.map((pt, idx) => {
    const px = Number(((idx / steps) * width).toFixed(1));
    const py = Number((104 - pt.value * 60).toFixed(1));
    return `${idx === 0 ? 'M' : 'L'} ${px} ${Math.max(6, Math.min(116, py))}`;
  });

  const motionSnippet = `<motion.div\n  animate={{ scale: 1, y: 0 }}\n  transition={{\n    type: "spring",\n    stiffness: ${safeStiffness},\n    damping: ${safeDamping},\n    mass: ${safeMass}\n  }}\n/>`;

  return {
    points,
    svgPath: pathParts.join(' '),
    settlingTimeMs,
    overshootPercent,
    dampingRatio: roundedZeta,
    regimeLabel,
    motionSnippet,
  };
}

/**
 * Parses a 6-digit or 3-digit hex color string into normalized RGB [0..255]
 */
export function parseHexColor(hex: string): [number, number, number] {
  const clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) {
      return [r, g, b];
    }
  }
  if (clean.length === 6) {
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) {
      return [r, g, b];
    }
  }
  return [0, 0, 0];
}

export function getRelativeLuminance(hex: string): number {
  const [r8, g8, b8] = parseHexColor(hex);
  const transform = (channel: number) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const r = transform(r8);
  const g = transform(g8);
  const b = transform(b8);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function evaluateWcagContrast(fgHex: string, bgHex: string): ContrastAuditResult {
  const lum1 = getRelativeLuminance(fgHex);
  const lum2 = getRelativeLuminance(bgHex);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  const rawRatio = (brightest + 0.05) / (darkest + 0.05);
  const ratio = Number(rawRatio.toFixed(2));

  const aaNormal = ratio >= 4.5;
  const aaLarge = ratio >= 3.0;
  const aaaNormal = ratio >= 7.0;
  const aaaLarge = ratio >= 4.5;

  let ratingLabel: ContrastAuditResult['ratingLabel'] = 'Gagal Kontras WCAG';
  if (aaaNormal) {
    ratingLabel = 'AAA Sempurna';
  } else if (aaNormal) {
    ratingLabel = 'AA Standar Produksi';
  } else if (aaLarge) {
    ratingLabel = 'Hanya Teks Besar';
  }

  return {
    ratio,
    formattedRatio: `${ratio.toFixed(2)}:1`,
    aaNormal,
    aaLarge,
    aaaNormal,
    aaaLarge,
    ratingLabel,
  };
}

/**
 * Computes frontend rendering metrics based on rendering strategy and item count.
 */
export function calculateRenderMetrics(
  strategy: RenderStrategy,
  itemCount: number
): RenderBenchmarkResult {
  const clampedItems = Math.max(100, Math.min(10000, itemCount));

  if (strategy === 'csr-naive') {
    const domNodesRendered = clampedItems * 6;
    const frameTimeMs = Number((3.2 + (clampedItems / 1000) * 14.8).toFixed(1));
    const estimatedFps = Math.min(60, Math.max(8, Math.round(1000 / Math.max(16.6, frameTimeMs))));
    const memoryKb = Math.round(1400 + clampedItems * 4.2);
    const ttiMs = Math.round(420 + clampedItems * 0.45);
    return {
      domNodesRendered,
      frameTimeMs,
      estimatedFps,
      memoryKb,
      ttiMs,
      droppedFramesWarning: frameTimeMs > 16.6,
      recommendation:
        'Render penuh di sisi klien memicu long-task > 50ms saat jumlah baris melebihi 1.000 item. Gunakan window virtualization.',
    };
  }

  if (strategy === 'ssr-streaming') {
    const domNodesRendered = clampedItems * 5;
    const frameTimeMs = Number((2.1 + (clampedItems / 1000) * 6.4).toFixed(1));
    const estimatedFps = Math.min(60, Math.max(18, Math.round(1000 / Math.max(16.6, frameTimeMs))));
    const memoryKb = Math.round(980 + clampedItems * 2.6);
    const ttiMs = Math.round(180 + clampedItems * 0.16);
    return {
      domNodesRendered,
      frameTimeMs,
      estimatedFps,
      memoryKb,
      ttiMs,
      droppedFramesWarning: frameTimeMs > 16.6,
      recommendation:
        'React Server Components + Suspense mempercepat First Contentful Paint, namun tetap membutuhkan virtualisasi DOM untuk daftar masif.',
    };
  }

  // virtualized-window
  const visibleRows = 18;
  const domNodesRendered = visibleRows * 6;
  const frameTimeMs = Number((1.8 + Math.log10(clampedItems) * 0.6).toFixed(1));
  const estimatedFps = 60;
  const memoryKb = Math.round(640 + visibleRows * 12);
  const ttiMs = Math.round(115 + Math.log10(clampedItems) * 18);

  return {
    domNodesRendered,
    frameTimeMs,
    estimatedFps,
    memoryKb,
    ttiMs,
    droppedFramesWarning: false,
    recommendation:
      'Optimal: Hanya 18 baris di dalam viewport yang dirender ke DOM. Frame budget konsisten < 4ms pada 60fps di perangkat mobile.',
  };
}

/**
 * Filters portfolio projects by category and search query.
 */
export function filterProjects(
  projects: ProjectItem[],
  category: ProjectCategory,
  searchQuery: string
): ProjectItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory = category === 'all' || project.category === category;
    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const searchableText = [
      project.title,
      project.client,
      project.summary,
      project.categoryLabel,
      ...project.techStack,
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

/**
 * Validates project inquiry / contact form inputs without silent fallbacks.
 */
export function validateInquiryForm(input: InquiryFormInput): InquiryValidationResult {
  const errors: Partial<Record<keyof InquiryFormInput, string>> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Nama lengkap wajib diisi (minimal 2 karakter).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'Masukkan alamat email kerja yang valid.';
  }

  if (!input.message || input.message.trim().length < 15) {
    errors.message = 'Jelaskan konteks atau tujuan proyek (minimal 15 karakter).';
  }

  if (input.timelineWeeks < 2 || input.timelineWeeks > 24) {
    errors.timelineWeeks = 'Durasi proyek harus antara 2 hingga 24 minggu.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Estimates project deliverables and sprint phases from selected scope and duration.
 */
export function estimateProjectScope(
  scope: InquiryFormInput['scope'],
  timelineWeeks: number
): ProjectEstimateResult {
  const weeks = Math.max(2, Math.min(24, timelineWeeks));
  const auditWeeks = Math.max(1, Math.round(weeks * 0.25));
  const buildWeeks = Math.max(1, Math.round(weeks * 0.5));
  const polishWeeks = Math.max(1, weeks - auditWeeks - buildWeeks);

  const scopeMap: Record<
    InquiryFormInput['scope'],
    { deliverablesBase: number; architecture: string }
  > = {
    'design-system': {
      deliverablesBase: 14,
      architecture: 'Multi-Brand Design Tokens + Radix Primitives + Storybook + WCAG AA Automation',
    },
    'frontend-architecture': {
      deliverablesBase: 10,
      architecture: 'Next.js 15 App Router + Server Actions + Edge Caching + Strict Type-Safety',
    },
    'interactive-web': {
      deliverablesBase: 8,
      architecture: 'Motion Spring Physics + Custom SVG/Canvas Shaders + 60fps Mobile Ergonomics',
    },
    'performance-audit': {
      deliverablesBase: 6,
      architecture: 'Core Web Vitals Profiling + Bundle Splitting + DOM Virtualization Refactor',
    },
  };

  const selected = scopeMap[scope];
  const deliverablesCount = selected.deliverablesBase + Math.floor(weeks / 2);

  return {
    estimatedWeeks: weeks,
    deliverablesCount,
    recommendedArchitecture: selected.architecture,
    sprintBreakdown: [
      { phase: 'Arsitektur & Spesifikasi Token', weeks: auditWeeks },
      { phase: 'Implementasi Komponen & Integrasi', weeks: buildWeeks },
      { phase: 'Uji Aksesibilitas & Optimasi Performa', weeks: polishWeeks },
    ],
  };
}

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeSpringTrajectory,
  evaluateWcagContrast,
  calculateRenderMetrics,
  filterProjects,
  validateInquiryForm,
  estimateProjectScope,
  type ProjectItem,
} from './portfolio-logic';

test('computeSpringTrajectory calculates underdamped vs critically damped physics accurately', () => {
  const bouncy = computeSpringTrajectory(320, 14, 1);
  assert.equal(bouncy.regimeLabel, 'Underdamped (Responsif & Membal)');
  assert.ok(bouncy.overshootPercent > 5, 'Underdamped spring should overshoot target');
  assert.ok(bouncy.svgPath.startsWith('M 0'), 'SVG path should start at origin');

  const stiffCrit = computeSpringTrajectory(200, 30, 1);
  assert.equal(stiffCrit.regimeLabel, 'Critically Damped (Presisi & Cepat)');
  assert.ok(stiffCrit.overshootPercent < bouncy.overshootPercent);
});

test('evaluateWcagContrast computes accurate WCAG 2.1 luminance ratios', () => {
  const highContrast = evaluateWcagContrast('#F4F4F6', '#090A0F');
  assert.ok(highContrast.ratio > 15);
  assert.equal(highContrast.aaaNormal, true);
  assert.equal(highContrast.ratingLabel, 'AAA Sempurna');

  const lowContrast = evaluateWcagContrast('#64748B', '#334155');
  assert.equal(lowContrast.aaNormal, false);
  assert.equal(lowContrast.ratingLabel, 'Gagal Kontras WCAG');
});

test('calculateRenderMetrics differentiates naive CSR vs virtualized windowing', () => {
  const naive = calculateRenderMetrics('csr-naive', 5000);
  const virtualized = calculateRenderMetrics('virtualized-window', 5000);

  assert.equal(naive.droppedFramesWarning, true);
  assert.equal(virtualized.droppedFramesWarning, false);
  assert.equal(virtualized.estimatedFps, 60);
  assert.ok(virtualized.domNodesRendered < naive.domNodesRendered);
});

test('filterProjects filters by category and search query accurately', () => {
  const sample: ProjectItem[] = [
    {
      id: 'p1',
      index: '01',
      title: 'Aksara Design System',
      client: 'Bank Nusantara',
      year: '2026',
      role: 'Lead Design Engineer',
      category: 'design-system',
      categoryLabel: 'Design System',
      readTime: '6 mnt baca',
      featuredSpan: 'wide',
      summary: 'Arsitektur token multi-platform',
      problemStatement: 'Inkonsistensi UI',
      architectureHighlights: ['Token W3C'],
      metrics: [{ label: 'Adopsi', value: '98%', delta: '+42%' }],
      techStack: ['React 19', 'TypeScript', 'Tailwind v4'],
      liveDemoType: 'token-button',
      codeSnippet: 'const token = true;',
      liveUrl: 'https://example.com',
      repoUrl: 'https://github.com',
    },
    {
      id: 'p2',
      index: '02',
      title: 'Velox Orderbook Engine',
      client: 'Artha Sekuritas',
      year: '2025',
      role: 'Principal Frontend Engineer',
      category: 'performance',
      categoryLabel: 'Web Performance',
      readTime: '5 mnt baca',
      featuredSpan: 'normal',
      summary: 'Visualisasi transaksi 60fps',
      problemStatement: 'DOM bottleneck',
      architectureHighlights: ['Canvas & Virtualization'],
      metrics: [{ label: 'Latency', value: '4.2ms', delta: '-78%' }],
      techStack: ['Next.js', 'WebWorkers'],
      liveDemoType: 'orderbook-stream',
      codeSnippet: 'const stream = true;',
      liveUrl: 'https://example.com',
      repoUrl: 'https://github.com',
    },
  ];

  assert.equal(filterProjects(sample, 'all', '').length, 2);
  assert.equal(filterProjects(sample, 'design-system', '').length, 1);
  assert.equal(filterProjects(sample, 'all', 'velox').length, 1);
  assert.equal(filterProjects(sample, 'performance', 'aksara').length, 0);
});

test('validateInquiryForm catches invalid inputs and passes valid submissions', () => {
  const invalid = validateInquiryForm({
    name: 'A',
    email: 'bukan-email',
    company: 'PT Maju',
    scope: 'design-system',
    timelineWeeks: 8,
    message: 'Pendek',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);

  const valid = validateInquiryForm({
    name: 'Budi Santoso',
    email: 'budi@perusahaan.id',
    company: 'FinTech Indonesia',
    scope: 'design-system',
    timelineWeeks: 8,
    message: 'Kami ingin membangun design system multi-brand untuk 12 squad produk.',
  });
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);

  const estimate = estimateProjectScope('design-system', 8);
  assert.equal(estimate.estimatedWeeks, 8);
  assert.equal(estimate.sprintBreakdown.length, 3);
});

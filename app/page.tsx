'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import {
  ArrowUpRight,
  Sun,
  Moon,
  Copy,
  Check,
  X,
  Menu,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import {
  PORTFOLIO_PROJECTS,
  WORK_EXPERIENCE,
  EDUCATION_HISTORY,
} from '@/lib/portfolio-data';
import {
  filterProjects,
  type ProjectCategory,
  type ProjectItem,
} from '@/lib/portfolio-logic';
import ProfilePhotoCard from '@/components/ProfilePhotoCard';

const CORE_SKILLS = [
  { group: 'Utama', items: 'React.js · Next.js · TypeScript · JavaScript (ES6+)' },
  { group: 'Styling & UI', items: 'Tailwind CSS · HTML5 & CSS3 · Responsive Mobile-First · UI/UX' },
  { group: 'Ekosistem & Tools', items: 'Git & GitHub · REST API · Node.js · Vite · Figma' },
];

const NAV_ITEMS = [
  { index: '01', label: 'Tentang', href: '#tentang' },
  { index: '02', label: 'Proyek', href: '#proyek' },
  { index: '03', label: 'Pengalaman', href: '#pengalaman' },
  { index: '04', label: 'Kontak', href: '#kontak' },
];

const LINKEDIN_URL = 'https://www.linkedin.com/in/daniel-theo-santoso/';
const GITHUB_URL = 'https://github.com/Moscart';
const EMAIL_ADDRESS = 'danieltheo.73@gmail.com';

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PortfolioHomePage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('lenis', 'lenis-smooth');

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      root.classList.remove('lenis', 'lenis-smooth');
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const filteredProjects = filterProjects(PORTFOLIO_PROJECTS, selectedCategory, '');

  const handleSmoothNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (lenisRef.current && href.startsWith('#')) {
      e.preventDefault();
      if (href === '#') {
        lenisRef.current.scrollTo(0);
      } else {
        lenisRef.current.scrollTo(href, { offset: -72 });
      }
    }
  };

  const handleCopyEmail = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(EMAIL_ADDRESS).catch(() => {});
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 1800);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0B0C0E] text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* STICKY TOP NAVBAR (DESKTOP LINKS + MOBILE HAMBURGER TRIGGER) */}
      <motion.header
        initial={{ y: -8, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        className="sticky top-0 z-40 w-full bg-[#FAF9F6]/85 dark:bg-[#0B0C0E]/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            onClick={(e) => handleSmoothNavClick(e, '#')}
            className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-white hover:text-orange-600 dark:hover:text-yellow-400 transition-colors whitespace-nowrap shrink-0"
          >
            Daniel Theo
            <span className="text-orange-600 dark:text-yellow-400">.</span>
          </a>

          {/* Zone 2: Desktop Navigation Links (Hidden on Mobile) */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden sm:flex items-center gap-7 text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleSmoothNavClick(e, item.href)}
                className="py-1 hover:text-orange-600 dark:hover:text-yellow-400 hover:underline decoration-orange-500 dark:decoration-yellow-400 underline-offset-8 transition-colors whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Theme Toggle Button + Mobile Hamburger Button */}
          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setIsDark((d) => !d)}
              aria-label={isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
              className="min-h-[40px] min-w-[40px] sm:min-h-[42px] px-2.5 sm:px-3.5 py-1.5 rounded-xl border border-orange-500/30 dark:border-yellow-400/30 bg-orange-500/10 dark:bg-yellow-400/10 hover:bg-orange-600 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-zinc-950 text-orange-700 dark:text-yellow-300 text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="hidden sm:inline">Mode Terang</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="hidden sm:inline">Mode Gelap</span>
                </>
              )}
            </motion.button>

            {/* Hamburger Trigger (Mobile Only) */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Buka menu navigasi"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-sidebar"
              className="sm:hidden min-h-[40px] min-w-[40px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111216] hover:border-orange-500 dark:hover:border-yellow-400 text-zinc-800 dark:text-zinc-200 inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <Menu className="w-4 h-4" aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE SIDEBAR DRAWER (HAMBURGER MENU WITH FRAMER MOTION) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-sidebar"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 sm:hidden flex justify-end bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="w-72 max-w-[82vw] h-full bg-[#FAF9F6] dark:bg-[#0B0C0E] border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-8">
                {/* Sidebar Top Header */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
                  <div>
                    <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-orange-600 dark:text-yellow-400 font-semibold">
                      Menu Navigasi
                    </div>
                    <div className="font-[family-name:var(--font-display)] text-base font-bold text-zinc-900 dark:text-white mt-0.5">
                      Daniel Theo<span className="text-orange-600 dark:text-yellow-400">.</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Tutup menu navigasi"
                    className="min-h-[40px] min-w-[40px] rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-yellow-400 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                {/* Numbered Editorial Sidebar Links */}
                <nav aria-label="Navigasi Mobile" className="flex flex-col space-y-1.5">
                  {NAV_ITEMS.map((item, idx) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx, duration: 0.3, ease: EASE_OUT_EXPO }}
                      onClick={(e) => {
                        setIsMobileMenuOpen(false);
                        handleSmoothNavClick(e, item.href);
                      }}
                      className="group min-h-[48px] px-3.5 py-2.5 rounded-xl hover:bg-orange-500/10 dark:hover:bg-yellow-400/10 flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-[family-name:var(--font-mono)] text-xs font-semibold text-orange-600 dark:text-yellow-400">
                          {item.index}
                        </span>
                        <span className="font-[family-name:var(--font-display)] text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-orange-600 dark:group-hover:text-yellow-400 transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight
                        className="w-4 h-4 text-zinc-400 group-hover:text-orange-600 dark:group-hover:text-yellow-400 transition-colors"
                        aria-hidden="true"
                      />
                    </motion.a>
                  ))}
                </nav>
              </div>

              {/* Sidebar Bottom Footer */}
              <div className="pt-5 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs font-medium">
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-700 dark:text-zinc-300 hover:text-orange-600 dark:hover:text-yellow-400 inline-flex items-center gap-1"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-700 dark:text-zinc-300 hover:text-orange-600 dark:hover:text-yellow-400 inline-flex items-center gap-1"
                  >
                    <span>GitHub (@Moscart)</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
                <div className="font-[family-name:var(--font-mono)] text-[11px] text-zinc-400 dark:text-zinc-500">
                  Frontend Programmer · Surakarta, ID
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* 1. HERO / TENTANG SAYA + FOTO PROFIL */}
        <section id="tentang" className="scroll-mt-20 py-12 sm:py-20">
          <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-8 sm:gap-12">
            <motion.div
              initial={{ opacity: 1, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
              className="flex-1 space-y-6"
            >
              {/* Exclusive Editorial Eyebrow Line */}
              <div className="inline-flex items-center gap-3">
                <span className="w-6 h-[2px] bg-orange-600 dark:bg-yellow-400" aria-hidden="true" />
                <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] font-semibold text-orange-600 dark:text-yellow-400">
                  Frontend Programmer · ID
                </span>
              </div>

              {/* Sculptural Name & Concise Value Statement */}
              <div className="space-y-2.5">
                <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.08]">
                  Daniel Theo{' '}
                  <span className="text-orange-600 dark:text-yellow-400">Santoso.</span>
                </h1>
                <p className="font-[family-name:var(--font-display)] text-base sm:text-xl font-medium text-zinc-600 dark:text-zinc-300 tracking-tight max-w-lg">
                  Membangun antarmuka web modern yang presisi, cepat, dan berkarakter.
                </p>
              </div>

              {/* Minimalist Executive Spec Strip (Replaces Long Paragraph) */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1 text-xs font-[family-name:var(--font-mono)] text-zinc-500 dark:text-zinc-400">
                <span className="text-zinc-800 dark:text-zinc-200 font-medium">
                  PT Daya Rekadigital Indonesia
                </span>
                <span className="text-orange-600 dark:text-yellow-400" aria-hidden="true">/</span>
                <span className="text-zinc-800 dark:text-zinc-200 font-medium">React & Next.js</span>
                <span className="text-orange-600 dark:text-yellow-400" aria-hidden="true">/</span>
                <span>TypeScript</span>
              </div>

              {/* Exclusive Action Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[42px] px-4 py-2 rounded-xl bg-zinc-900 hover:bg-orange-600 text-white dark:bg-yellow-400 dark:hover:bg-yellow-300 dark:text-zinc-950 text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 shadow-2xs"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </motion.a>

                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[42px] px-4 py-2 rounded-xl bg-white dark:bg-zinc-900/90 border border-zinc-200/90 dark:border-zinc-800 hover:border-orange-500 dark:hover:border-yellow-400 text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:text-orange-600 dark:hover:text-yellow-400 inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </motion.a>

                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={handleCopyEmail}
                  className="min-h-[42px] px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900/90 border border-zinc-200/90 dark:border-zinc-800 hover:border-orange-500 dark:hover:border-yellow-400 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-orange-600 dark:hover:text-yellow-400 inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-orange-600 dark:text-yellow-400" aria-hidden="true" />
                      <span>Salin Email</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Tempat Foto Profil Sederhana & Elegan (Hidden on Mobile) */}
            <motion.div
              initial={{ opacity: 1, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.05, ease: EASE_OUT_EXPO }}
              className="hidden sm:block shrink-0"
            >
              <ProfilePhotoCard />
            </motion.div>
          </div>

          {/* Keahlian Utama (Unboxed Clean Text) */}
          <motion.div
            initial={{ opacity: 1, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="mt-12 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {CORE_SKILLS.map((skill) => (
              <div key={skill.group}>
                <div className="text-xs font-semibold text-orange-600 dark:text-yellow-400 mb-1">
                  {skill.group}
                </div>
                <div className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                  {skill.items}
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* 2. PROYEK PILIHAN (MOBILE-FIRST EXCLUSIVE SHOWCASE) */}
        <section
          id="proyek"
          aria-labelledby="projects-heading"
          className="scroll-mt-20 py-12 sm:py-16 border-t border-zinc-200/80 dark:border-zinc-800/80"
        >
          {/* Section Header & Mobile-First Segmented Filter */}
          <motion.div
            initial={{ opacity: 1, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2.5">
                <span className="w-5 h-[2px] bg-orange-600 dark:bg-yellow-400" aria-hidden="true" />
                <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] font-semibold text-orange-600 dark:text-yellow-400">
                  Karya Terpilih
                </span>
              </div>
              <h2
                id="projects-heading"
                className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white"
              >
                Proyek Pilihan<span className="text-orange-600 dark:text-yellow-400">.</span>
              </h2>
            </div>

            {/* Mobile-First 4-Column Thumb-Friendly Filter Bar */}
            <div
              role="group"
              aria-label="Filter kategori proyek"
              className="grid grid-cols-4 sm:inline-flex items-center gap-1 p-1 rounded-xl bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800"
            >
              {(
                [
                  { id: 'all', label: 'Semua' },
                  { id: 'design-system', label: 'Boilerplate' },
                  { id: 'performance', label: 'Performa' },
                  { id: 'interactive-ui', label: 'Web App' },
                ] as const
              ).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative min-h-[40px] px-2 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'text-white dark:text-zinc-950'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-yellow-400'
                  }`}
                >
                  {selectedCategory === cat.id && (
                    <motion.span
                      layoutId="activeProjectFilter"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-lg bg-zinc-900 dark:bg-yellow-400 shadow-2xs"
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Mobile-First Project Cards Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.article
                  layout
                  key={project.id}
                  initial={{ opacity: 1, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: EASE_OUT_EXPO }}
                  whileHover={{ y: -4 }}
                  onClick={() => setActiveProject(project)}
                  className="group relative rounded-2xl bg-white dark:bg-[#111216] border border-zinc-200/90 dark:border-zinc-800/90 hover:border-orange-500/80 dark:hover:border-yellow-400/70 p-5 sm:p-6 flex flex-col justify-between transition-colors cursor-pointer"
                >
                  <div>
                    {/* Card Top Meta Row: Index + Category/Year + Action Icon */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2.5 text-xs">
                        <span className="font-[family-name:var(--font-mono)] text-xs font-bold px-2 py-0.5 rounded-md bg-orange-500/10 dark:bg-yellow-400/10 text-orange-600 dark:text-yellow-400 tabular-nums">
                          {project.index}
                        </span>
                        <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          {project.categoryLabel} · {project.year}
                        </span>
                      </div>

                      <span
                        aria-hidden="true"
                        className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 dark:group-hover:bg-yellow-400 dark:group-hover:text-zinc-950 dark:group-hover:border-yellow-400 transition-colors shrink-0"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>

                    {/* Title & Concise 2-Line Description */}
                    <h3 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-orange-600 dark:group-hover:text-yellow-400 transition-colors mb-2">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2 mb-4">
                      {project.summary}
                    </p>
                  </div>

                  {/* Card Bottom: Primary Metric Highlight + Tech Stack & Explicit Detail Button */}
                  <div className="pt-3.5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-[family-name:var(--font-mono)] text-zinc-500 dark:text-zinc-400 truncate">
                      {project.techStack.slice(0, 3).map((tech, idx) => (
                        <React.Fragment key={tech}>
                          {idx > 0 && (
                            <span className="text-orange-600 dark:text-yellow-400" aria-hidden="true">
                              /
                            </span>
                          )}
                          <span className="text-zinc-700 dark:text-zinc-300">{tech}</span>
                        </React.Fragment>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveProject(project);
                      }}
                      aria-label={`Detail proyek ${project.title}`}
                      className="min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-semibold text-orange-600 dark:text-yellow-400 bg-orange-500/5 dark:bg-yellow-400/5 hover:bg-orange-600 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-zinc-950 inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Detail</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* 3. PENGALAMAN & PENDIDIKAN (SEPARATED EXCLUSIVE MOBILE-FIRST LAYOUT) */}
        <section
          id="pengalaman"
          aria-labelledby="experience-heading"
          className="scroll-mt-20 py-12 sm:py-16 border-t border-zinc-200/80 dark:border-zinc-800/80"
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 1, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="space-y-2 mb-8"
          >
            <div className="inline-flex items-center gap-2.5">
              <span className="w-5 h-[2px] bg-orange-600 dark:bg-yellow-400" aria-hidden="true" />
              <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] font-semibold text-orange-600 dark:text-yellow-400">
                Rekam Jejak
              </span>
            </div>
            <h2
              id="experience-heading"
              className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white"
            >
              Pengalaman & Pendidikan<span className="text-orange-600 dark:text-yellow-400">.</span>
            </h2>
          </motion.div>

          {/* Vertical Flex-Col Layout: Pengalaman Stacked Above Pendidikan */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* COLUMN 1: PENGALAMAN KERJA & PROYEK */}
            <motion.div
              initial={{ opacity: 1, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              className="rounded-2xl bg-white dark:bg-[#111216] border border-zinc-200/90 dark:border-zinc-800/90 p-5 sm:p-6 space-y-6"
            >
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-orange-500/10 dark:bg-yellow-400/10 border border-orange-500/20 dark:border-yellow-400/20 flex items-center justify-center text-orange-600 dark:text-yellow-400 shrink-0">
                    <Briefcase className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                      Karier & Praktik
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-zinc-900 dark:text-white">
                      Pengalaman
                    </h3>
                  </div>
                </div>
                <span className="font-[family-name:var(--font-mono)] text-xs font-semibold text-orange-600 dark:text-yellow-400">
                  01
                </span>
              </div>

              <div className="relative pl-4 sm:pl-5 border-l border-zinc-200 dark:border-zinc-800 space-y-7">
                {WORK_EXPERIENCE.map((exp, idx) => (
                  <motion.div
                    key={exp.index}
                    initial={{ opacity: 1, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: idx * 0.06, ease: EASE_OUT_EXPO }}
                    className="relative space-y-1.5"
                  >
                    <span
                      className="absolute -left-[21px] sm:-left-[25px] top-1.5 w-2.5 h-2.5 rounded-full bg-orange-600 dark:bg-yellow-400 ring-4 ring-white dark:ring-[#111216]"
                      aria-hidden="true"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-[family-name:var(--font-mono)] text-xs font-semibold text-orange-600 dark:text-yellow-400 tabular-nums">
                        {exp.period}
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-[11px] text-zinc-400 dark:text-zinc-500">
                        {exp.location}
                      </span>
                    </div>

                    <h4 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {exp.role}
                    </h4>

                    <div className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {exp.company}
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pt-0.5">
                      {exp.summary}
                    </p>

                    <div className="pt-1.5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-[family-name:var(--font-mono)]">
                      <span className="text-zinc-500 dark:text-zinc-400">
                        {exp.technologies}
                      </span>
                      <span className="text-orange-600 dark:text-yellow-400 font-medium">
                        {exp.impactMetrics}
                      </span>
                    </div>
                  </motion.div>
                ))}

                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Rekam jejak selengkapnya di profil LinkedIn
                  </span>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-orange-600 dark:text-yellow-400 hover:underline underline-offset-4 inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                  >
                    <span>Lihat LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* COLUMN 2: RIWAYAT PENDIDIKAN */}
            <motion.div
              initial={{ opacity: 1, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              className="rounded-2xl bg-white dark:bg-[#111216] border border-zinc-200/90 dark:border-zinc-800/90 p-5 sm:p-6 space-y-6"
            >
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-orange-500/10 dark:bg-yellow-400/10 border border-orange-500/20 dark:border-yellow-400/20 flex items-center justify-center text-orange-600 dark:text-yellow-400 shrink-0">
                    <GraduationCap className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                      Akademik & Fondasi
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-zinc-900 dark:text-white">
                      Pendidikan
                    </h3>
                  </div>
                </div>
                <span className="font-[family-name:var(--font-mono)] text-xs font-semibold text-orange-600 dark:text-yellow-400">
                  02
                </span>
              </div>

              <div className="relative pl-4 border-l border-zinc-200 dark:border-zinc-800 space-y-6">
                {EDUCATION_HISTORY.map((edu, idx) => (
                  <motion.div
                    key={edu.index}
                    initial={{ opacity: 1, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: idx * 0.06, ease: EASE_OUT_EXPO }}
                    className="relative space-y-1.5"
                  >
                    <span
                      className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-orange-600 dark:bg-yellow-400 ring-4 ring-white dark:ring-[#111216]"
                      aria-hidden="true"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-orange-600 dark:text-yellow-400 tabular-nums">
                        {edu.period}
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-[11px] text-zinc-400 dark:text-zinc-500">
                        {edu.location}
                      </span>
                    </div>

                    <h4 className="font-[family-name:var(--font-display)] text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {edu.role}
                    </h4>

                    <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {edu.company}
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pt-0.5">
                      {edu.summary}
                    </p>

                    <div className="pt-1.5 font-[family-name:var(--font-mono)] text-[11px] text-zinc-500 dark:text-zinc-400">
                      {edu.technologies}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4. KONTAK (SIMPLE & MINIMALIST) */}
        <section
          id="kontak"
          aria-labelledby="contact-heading"
          className="scroll-mt-20 py-12 sm:py-16 border-t border-zinc-200/80 dark:border-zinc-800/80"
        >
          <motion.div
            initial={{ opacity: 1, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2.5">
                <span className="w-5 h-[2px] bg-orange-600 dark:bg-yellow-400" aria-hidden="true" />
                <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] font-semibold text-orange-600 dark:text-yellow-400">
                  Kontak
                </span>
              </div>
              <h2
                id="contact-heading"
                className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white"
              >
                Mari Terhubung<span className="text-orange-600 dark:text-yellow-400">.</span>
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
                Terbuka untuk diskusi proyek web, kolaborasi frontend, atau peluang kerja baru.
              </p>
            </div>

            {/* Direct Minimalist Actions */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                href={`mailto:${EMAIL_ADDRESS}`}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-zinc-900 hover:bg-orange-600 text-white dark:bg-yellow-400 dark:hover:bg-yellow-300 dark:text-zinc-950 text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Kirim Email</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </motion.a>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={handleCopyEmail}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-white dark:bg-[#111216] border border-zinc-200/90 dark:border-zinc-800 hover:border-orange-500 dark:hover:border-yellow-400 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-orange-600 dark:hover:text-yellow-400 inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    <span>Email Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-orange-600 dark:text-yellow-400" aria-hidden="true" />
                    <span className="font-[family-name:var(--font-mono)] text-xs">{EMAIL_ADDRESS}</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Minimalist Direct Links Strip */}
            <div className="pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-zinc-800 dark:text-zinc-200 hover:text-orange-600 dark:hover:text-yellow-400 inline-flex items-center gap-1 transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-orange-600 dark:text-yellow-400" aria-hidden="true" />
              </a>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-zinc-800 dark:text-zinc-200 hover:text-orange-600 dark:hover:text-yellow-400 inline-flex items-center gap-1 transition-colors"
              >
                <span>GitHub (@Moscart)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-orange-600 dark:text-yellow-400" aria-hidden="true" />
              </a>

              <span className="font-[family-name:var(--font-mono)] text-xs text-zinc-400 dark:text-zinc-500">
                Surakarta, Jawa Tengah · ID
              </span>
            </div>
          </motion.div>
        </section>
      </main>

      {/* MINIMALIST FOOTER */}
      <footer className="py-8 border-t border-zinc-200/80 dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>© 2026 Daniel Theo Santoso</span>
          <div className="flex items-center gap-3">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600 dark:hover:text-yellow-400 transition-colors"
            >
              LinkedIn
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-600 dark:hover:text-yellow-400 transition-colors"
            >
              GitHub
            </a>
            <span aria-hidden="true">·</span>
            <span className="text-orange-600 dark:text-yellow-400 font-medium">
              Next.js & Tailwind CSS
            </span>
          </div>
        </div>
      </footer>

      {/* EXCLUSIVE MOBILE-FIRST PROJECT DETAIL MODAL (BOTTOM SHEET ON MOBILE, DIALOG ON DESKTOP) */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/65 backdrop-blur-xs p-0 sm:p-4"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 340, damping: 30 }}
              className="w-full max-w-xl max-h-[88dvh] flex flex-col rounded-t-3xl sm:rounded-2xl bg-[#FAF9F6] dark:bg-[#111216] border-t sm:border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Bottom-Sheet Handle Bar */}
              <div className="pt-3 pb-1 flex justify-center sm:hidden">
                <span className="w-10 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" aria-hidden="true" />
              </div>

              {/* Sticky Modal Header */}
              <div className="px-5 sm:px-6 pt-3 sm:pt-6 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-orange-600 dark:text-yellow-400 font-semibold">
                    <span>#{activeProject.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeProject.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeProject.year}</span>
                  </div>
                  <h3
                    id="modal-project-title"
                    className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white"
                  >
                    {activeProject.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  aria-label="Tutup detail proyek"
                  className="min-h-[40px] min-w-[40px] rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-orange-600 dark:hover:text-yellow-400 transition-colors shrink-0 cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Scrollable Modal Body */}
              <div
                data-lenis-prevent
                className="px-5 sm:px-6 py-5 overflow-y-auto overscroll-contain space-y-5"
              >
                {/* 3-Column Executive Metrics Strip (Instant Scannable Value) */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {activeProject.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-[#0B0C0E] border border-zinc-200/80 dark:border-zinc-800/80"
                    >
                      <div className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 truncate">
                        {metric.label}
                      </div>
                      <div className="font-[family-name:var(--font-display)] text-xs sm:text-sm font-bold text-orange-600 dark:text-yellow-400 mt-0.5 truncate">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Concise Summary */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {activeProject.summary}
                </p>

                {/* Key Architecture Highlights (Compact & Scannable) */}
                <div className="space-y-2">
                  <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider font-semibold text-zinc-900 dark:text-zinc-200">
                    Arsitektur & Implementasi
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                    {activeProject.architectureHighlights.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-orange-600 dark:bg-yellow-400 mt-1.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stack Line */}
                <div className="pt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-[family-name:var(--font-mono)] text-zinc-500 dark:text-zinc-400">
                  <span className="text-zinc-400 dark:text-zinc-500">Stack:</span>
                  {activeProject.techStack.map((tech, idx) => (
                    <React.Fragment key={tech}>
                      {idx > 0 && (
                        <span className="text-orange-600 dark:text-yellow-400" aria-hidden="true">
                          /
                        </span>
                      )}
                      <span className="text-zinc-800 dark:text-zinc-200 font-medium">{tech}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Sticky Thumb-Friendly Modal Footer */}
              <div className="px-5 sm:px-6 py-4 bg-white/80 dark:bg-[#0B0C0E]/80 border-t border-zinc-200/80 dark:border-zinc-800/80 grid grid-cols-2 sm:flex sm:items-center sm:justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="min-h-[44px] px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-800 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-orange-500 dark:hover:border-yellow-400 transition-colors cursor-pointer"
                >
                  Tutup
                </button>
                <a
                  href={activeProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-zinc-900 hover:bg-orange-600 text-white dark:bg-yellow-400 dark:hover:bg-yellow-300 dark:text-zinc-950 text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <span>Lihat Repositori</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

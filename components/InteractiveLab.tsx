'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sliders,
  Eye,
  Cpu,
  Play,
  Copy,
  Check,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import {
  computeSpringTrajectory,
  evaluateWcagContrast,
  calculateRenderMetrics,
  type RenderStrategy,
} from '@/lib/portfolio-logic';

type LabTab = 'spring' | 'contrast' | 'performance';

const SPRING_PRESETS = [
  { name: 'Snappy Popover (Paco)', stiffness: 420, damping: 28, mass: 0.9 },
  { name: 'Silk Drawer (Emil)', stiffness: 280, damping: 26, mass: 1.0 },
  { name: 'Playful Elastic (Rauno)', stiffness: 340, damping: 14, mass: 1.1 },
];

const COLOR_PAIR_PRESETS = [
  { name: 'Obsidian & Pure Ivory', fg: '#F4F4F6', bg: '#090A0F' },
  { name: 'Cobalt Action & White', fg: '#FFFFFF', bg: '#2563EB' },
  { name: 'Paper Editorial & Ink', fg: '#18181B', bg: '#F8FAFC' },
  { name: 'Low Contrast Slate (Uji Gagal)', fg: '#64748B', bg: '#1E293B' },
];

export default function InteractiveLab() {
  const [activeTab, setActiveTab] = useState<LabTab>('spring');

  // Spring Physics state
  const [stiffness, setStiffness] = useState<number>(340);
  const [damping, setDamping] = useState<number>(22);
  const [mass, setMass] = useState<number>(1.0);
  const [triggerCount, setTriggerCount] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // WCAG Contrast state
  const [fgColor, setFgColor] = useState<string>('#F4F4F6');
  const [bgColor, setBgColor] = useState<string>('#090A0F');

  // Performance state
  const [strategy, setStrategy] = useState<RenderStrategy>('virtualized-window');
  const [itemCount, setItemCount] = useState<number>(5000);

  const springData = computeSpringTrajectory(stiffness, damping, mass);
  const contrastData = evaluateWcagContrast(fgColor, bgColor);
  const renderData = calculateRenderMetrics(strategy, itemCount);

  const handleCopySnippet = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(springData.motionSnippet).catch(() => {});
    }
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1800);
  };

  return (
    <section
      id="laboratorium"
      aria-labelledby="lab-heading"
      className="py-16 md:py-24 border-t border-zinc-200/80 dark:border-zinc-800/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              02. Laboratorium Rekayasa Antarmuka · Eksperimen Interaktif Langsung
            </p>
            <h2
              id="lab-heading"
              className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 text-balance"
            >
              Uji langsung detail fisika pegas, aksesibilitas warna, dan anggaran render DOM.
            </h2>
          </div>

          {/* Interactive Segmented Tab Control */}
          <div
            role="tablist"
            aria-label="Pilih simulasi laboratorium"
            className="flex flex-wrap sm:flex-nowrap items-center gap-1 p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800"
          >
            <button
              role="tab"
              aria-selected={activeTab === 'spring'}
              onClick={() => setActiveTab('spring')}
              className={`min-h-[44px] px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
                activeTab === 'spring'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <Sliders className="w-4 h-4" aria-hidden="true" />
              <span>Fisika Pegas & Motion</span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'contrast'}
              onClick={() => setActiveTab('contrast')}
              className={`min-h-[44px] px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
                activeTab === 'contrast'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <Eye className="w-4 h-4" aria-hidden="true" />
              <span>Audit Kontras WCAG</span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'performance'}
              onClick={() => setActiveTab('performance')}
              className={`min-h-[44px] px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
                activeTab === 'performance'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <Cpu className="w-4 h-4" aria-hidden="true" />
              <span>Virtualisasi DOM 60fps</span>
            </button>
          </div>
        </div>

        {/* Lab Workspace Surface (Single-elevation card container) */}
        <div className="rounded-2xl bg-zinc-50 dark:bg-[#11131A] border border-zinc-200 dark:border-zinc-800/90 p-5 sm:p-8">
          {activeTab === 'spring' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Sliders & Presets */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      Simulator Kurva Osilator Harmonik
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Karakteristik: {springData.regimeLabel}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setStiffness(340);
                      setDamping(22);
                      setMass(1.0);
                      setTriggerCount((c) => c + 1);
                    }}
                    className="min-h-[44px] px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white rounded-lg border border-zinc-300 dark:border-zinc-700 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Reset Parameter</span>
                  </button>
                </div>

                {/* Preset Buttons */}
                <div>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                    Profil Kalibrasi Industri:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {SPRING_PRESETS.map((preset) => {
                      const isCurrent =
                        stiffness === preset.stiffness &&
                        damping === preset.damping &&
                        mass === preset.mass;
                      return (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => {
                            setStiffness(preset.stiffness);
                            setDamping(preset.damping);
                            setMass(preset.mass);
                            setTriggerCount((c) => c + 1);
                          }}
                          className={`min-h-[44px] px-3 py-2 rounded-xl text-left text-xs font-medium border transition-colors ${
                            isCurrent
                              ? 'border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB] dark:text-blue-400'
                              : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-700'
                          }`}
                        >
                          <div className="truncate font-semibold">{preset.name}</div>
                          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-[family-name:var(--font-mono)] tabular-nums mt-0.5">
                            S:{preset.stiffness} · D:{preset.damping} · M:{preset.mass}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Parameter Sliders */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <label htmlFor="slider-stiffness" className="text-zinc-700 dark:text-zinc-300">
                        Kekakuan Pegas (Stiffness)
                      </label>
                      <span className="font-[family-name:var(--font-mono)] tabular-nums text-zinc-900 dark:text-zinc-100">
                        {stiffness} N/m
                      </span>
                    </div>
                    <input
                      id="slider-stiffness"
                      type="range"
                      min={60}
                      max={700}
                      step={10}
                      value={stiffness}
                      onChange={(e) => setStiffness(Number(e.target.value))}
                      className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <label htmlFor="slider-damping" className="text-zinc-700 dark:text-zinc-300">
                        Redaman Gesek (Damping)
                      </label>
                      <span className="font-[family-name:var(--font-mono)] tabular-nums text-zinc-900 dark:text-zinc-100">
                        {damping} Ns/m
                      </span>
                    </div>
                    <input
                      id="slider-damping"
                      type="range"
                      min={6}
                      max={60}
                      step={2}
                      value={damping}
                      onChange={(e) => setDamping(Number(e.target.value))}
                      className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <label htmlFor="slider-mass" className="text-zinc-700 dark:text-zinc-300">
                        Massa Elemen UI (Mass)
                      </label>
                      <span className="font-[family-name:var(--font-mono)] tabular-nums text-zinc-900 dark:text-zinc-100">
                        {mass.toFixed(1)} kg
                      </span>
                    </div>
                    <input
                      id="slider-mass"
                      type="range"
                      min={0.4}
                      max={3.0}
                      step={0.1}
                      value={mass}
                      onChange={(e) => setMass(Number(e.target.value))}
                      className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                    />
                  </div>
                </div>

                {/* Telemetry Readout */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Waktu Settle</div>
                    <div className="text-lg font-bold font-[family-name:var(--font-mono)] tabular-nums text-zinc-900 dark:text-zinc-100 mt-0.5">
                      {springData.settlingTimeMs} ms
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Overshoot</div>
                    <div className="text-lg font-bold font-[family-name:var(--font-mono)] tabular-nums text-zinc-900 dark:text-zinc-100 mt-0.5">
                      {springData.overshootPercent}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Rasio Redaman (ζ)</div>
                    <div className="text-lg font-bold font-[family-name:var(--font-mono)] tabular-nums text-zinc-900 dark:text-zinc-100 mt-0.5">
                      {springData.dampingRatio}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Trajectory Graph, Interactive Target & Generated Code */}
              <div className="lg:col-span-6 space-y-5">
                {/* Trajectory SVG & Live Animated Card */}
                <div className="p-5 rounded-xl bg-white dark:bg-[#090A0F] border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      Kurva Perpindahan (0ms — 1500ms) · Target y = 1.0
                    </div>
                    <button
                      type="button"
                      onClick={() => setTriggerCount((c) => c + 1)}
                      className="min-h-[44px] px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                    >
                      <Play className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Uji Animasi Pegas</span>
                    </button>
                  </div>

                  <svg
                    viewBox="0 0 320 120"
                    className="w-full h-32 overflow-visible"
                    role="img"
                    aria-label="Grafik respons pegas terhadap waktu"
                  >
                    {/* Target equilibrium line */}
                    <line
                      x1="0"
                      y1="44"
                      x2="320"
                      y2="44"
                      stroke="currentColor"
                      strokeDasharray="4 4"
                      className="text-zinc-300 dark:text-zinc-700"
                      strokeWidth="1"
                    />
                    {/* Baseline */}
                    <line
                      x1="0"
                      y1="104"
                      x2="320"
                      y2="104"
                      stroke="currentColor"
                      className="text-zinc-200 dark:text-zinc-800"
                      strokeWidth="1"
                    />
                    {/* Spring Curve */}
                    <path
                      d={springData.svgPath}
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Interactive Spring Preview Surface */}
                  <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-4">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      Objek Uji Transisi (Klik tombol di atas):
                    </span>
                    <motion.div
                      key={triggerCount}
                      initial={{ scale: 0.72, x: -36, opacity: 0.5 }}
                      animate={{ scale: 1, x: 0, opacity: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness,
                        damping,
                        mass,
                      }}
                      onClick={() => setTriggerCount((c) => c + 1)}
                      className="cursor-pointer select-none px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold shadow-sm"
                    >
                      Komponen Interaktif #{triggerCount + 1}
                    </motion.div>
                  </div>
                </div>

                {/* Copyable Code Output */}
                <div className="p-4 rounded-xl bg-zinc-900 text-zinc-100 border border-zinc-800">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs text-zinc-400 font-[family-name:var(--font-mono)]">
                      Konfigurasi Motion React
                    </span>
                    <button
                      type="button"
                      onClick={handleCopySnippet}
                      className="min-h-[44px] px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                          <span>Kode Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Salin Kode</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-xs font-[family-name:var(--font-mono)] text-blue-300 overflow-x-auto leading-relaxed">
                    <code>{springData.motionSnippet}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contrast' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Controls */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    Inspektor Token Kontras Luminesensi WCAG 2.1
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Menguji keterbacaan pasangan token warna teks dan permukaan sesuai standar aksesibilitas AA (4.5:1) dan AAA (7.0:1).
                  </p>
                </div>

                {/* Preset Pairs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {COLOR_PAIR_PRESETS.map((pair) => (
                    <button
                      key={pair.name}
                      type="button"
                      onClick={() => {
                        setFgColor(pair.fg);
                        setBgColor(pair.bg);
                      }}
                      className="min-h-[44px] p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 text-left transition-colors flex items-center justify-between gap-2"
                    >
                      <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 truncate">
                        {pair.name}
                      </span>
                      <span className="flex items-center gap-1 shrink-0">
                        <span
                          className="w-4 h-4 rounded-full border border-zinc-400/40"
                          style={{ backgroundColor: pair.fg }}
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-zinc-400/40"
                          style={{ backgroundColor: pair.bg }}
                        />
                      </span>
                    </button>
                  ))}
                </div>

                {/* Custom Color Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="input-fg-color"
                      className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                    >
                      Token Warna Teks (Foreground)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="input-fg-color"
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-11 h-11 rounded-lg cursor-pointer border border-zinc-300 dark:border-zinc-700 bg-transparent"
                      />
                      <input
                        type="text"
                        aria-label="Kode hex warna teks"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-full min-h-[44px] px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs font-[family-name:var(--font-mono)] text-zinc-900 dark:text-zinc-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="input-bg-color"
                      className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                    >
                      Token Permukaan (Background)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="input-bg-color"
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-11 h-11 rounded-lg cursor-pointer border border-zinc-300 dark:border-zinc-700 bg-transparent"
                      />
                      <input
                        type="text"
                        aria-label="Kode hex warna latar"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-full min-h-[44px] px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs font-[family-name:var(--font-mono)] text-zinc-900 dark:text-zinc-100"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Preview & Audit Table */}
              <div className="lg:col-span-6 space-y-5">
                <div
                  className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-colors"
                  style={{ backgroundColor: bgColor, color: fgColor }}
                >
                  <div className="text-xs opacity-80 mb-1 font-[family-name:var(--font-mono)]">
                    Pratinjau Komponen Langsung · Rasio {contrastData.formattedRatio}
                  </div>
                  <h4 className="text-xl font-bold tracking-tight mb-2">
                    Tipografi yang mudah dibaca oleh setiap pengguna
                  </h4>
                  <p className="text-sm leading-relaxed opacity-90">
                    Kontras bukan sekadar kepatuhan regulasi, melainkan fondasi kenyamanan membaca di bawah cahaya matahari maupun ruang redup.
                  </p>
                </div>

                {/* WCAG Audit Matrix */}
                <div className="p-5 rounded-xl bg-white dark:bg-[#090A0F] border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-200 dark:border-zinc-800">
                    <div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        Rasio Luminesensi Relatif
                      </div>
                      <div className="text-2xl font-bold font-[family-name:var(--font-mono)] tabular-nums text-zinc-900 dark:text-zinc-100">
                        {contrastData.formattedRatio}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      {contrastData.aaNormal ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-500" aria-hidden="true" />
                      )}
                      <span className="text-zinc-900 dark:text-zinc-100">
                        {contrastData.ratingLabel}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center justify-between py-1.5 border-b border-zinc-100 dark:border-zinc-800/70">
                      <span className="text-zinc-500 dark:text-zinc-400">Teks Normal AA (4.5:1)</span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {contrastData.aaNormal ? 'Lulus (Pass)' : 'Gagal (Fail)'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-zinc-100 dark:border-zinc-800/70">
                      <span className="text-zinc-500 dark:text-zinc-400">Teks Besar AA (3.0:1)</span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {contrastData.aaLarge ? 'Lulus (Pass)' : 'Gagal (Fail)'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-zinc-500 dark:text-zinc-400">Teks Normal AAA (7.0:1)</span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {contrastData.aaaNormal ? 'Lulus (Pass)' : 'Gagal (Fail)'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-zinc-500 dark:text-zinc-400">Teks Besar AAA (4.5:1)</span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {contrastData.aaaLarge ? 'Lulus (Pass)' : 'Gagal (Fail)'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    Simulator Anggaran Frame & Virtualisasi Daftar
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Bandingkan dampak jumlah elemen data terhadap waktu render main-thread dan konsumsi memori DOM.
                  </p>
                </div>

                {/* Strategy Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'csr-naive', label: 'CSR Tanpa Virtualisasi' },
                      { id: 'ssr-streaming', label: 'SSR + Suspense' },
                      { id: 'virtualized-window', label: 'Window Virtualization' },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setStrategy(item.id)}
                      className={`min-h-[44px] px-3 py-2.5 rounded-xl text-xs font-medium border text-left transition-colors ${
                        strategy === item.id
                          ? 'border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB] dark:text-blue-400'
                          : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Row Count Slider */}
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <label htmlFor="slider-rows" className="text-zinc-700 dark:text-zinc-300">
                      Jumlah Baris Data Transaksi
                    </label>
                    <span className="font-[family-name:var(--font-mono)] tabular-nums text-zinc-900 dark:text-zinc-100">
                      {itemCount.toLocaleString('id-ID')} baris
                    </span>
                  </div>
                  <input
                    id="slider-rows"
                    type="range"
                    min={500}
                    max={10000}
                    step={500}
                    value={itemCount}
                    onChange={(e) => setItemCount(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                  />
                </div>

                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  {renderData.recommendation}
                </p>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl bg-white dark:bg-[#090A0F] border border-zinc-200 dark:border-zinc-800">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Simpul DOM Aktif</div>
                    <div className="text-lg font-bold font-[family-name:var(--font-mono)] tabular-nums text-zinc-900 dark:text-zinc-100 mt-1">
                      {renderData.domNodesRendered.toLocaleString('id-ID')}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-[#090A0F] border border-zinc-200 dark:border-zinc-800">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Waktu Frame</div>
                    <div className="text-lg font-bold font-[family-name:var(--font-mono)] tabular-nums text-zinc-900 dark:text-zinc-100 mt-1">
                      {renderData.frameTimeMs} ms
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-[#090A0F] border border-zinc-200 dark:border-zinc-800">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Frame Rate</div>
                    <div className="text-lg font-bold font-[family-name:var(--font-mono)] tabular-nums text-zinc-900 dark:text-zinc-100 mt-1">
                      {renderData.estimatedFps} fps
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-[#090A0F] border border-zinc-200 dark:border-zinc-800">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">Time to Interactive</div>
                    <div className="text-lg font-bold font-[family-name:var(--font-mono)] tabular-nums text-zinc-900 dark:text-zinc-100 mt-1">
                      {renderData.ttiMs} ms
                    </div>
                  </div>
                </div>

                {/* Visual Frame Budget Bar */}
                <div className="p-5 rounded-xl bg-white dark:bg-[#090A0F] border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                      Konsumsi Anggaran Frame (Batas 16.6ms untuk 60Hz)
                    </span>
                    <span className="font-[family-name:var(--font-mono)] tabular-nums text-zinc-600 dark:text-zinc-400">
                      {renderData.droppedFramesWarning
                        ? 'Melebihi Anggaran (Jank Terdeteksi)'
                        : 'Stabil di Bawah 16.6ms'}
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-200 ${
                        renderData.droppedFramesWarning ? 'bg-rose-500' : 'bg-[#2563EB]'
                      }`}
                      style={{
                        width: `${Math.min(100, Math.round((renderData.frameTimeMs / 32) * 100))}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

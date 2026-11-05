'use client';

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectItem } from '@/lib/portfolio-logic';

interface ProjectBentoCardProps {
  project: ProjectItem;
  onSelectProject: (project: ProjectItem) => void;
}

export default function ProjectBentoCard({
  project,
  onSelectProject,
}: ProjectBentoCardProps) {
  const [interactiveState, setInteractiveState] = useState<number>(0);

  const colSpanClass =
    project.featuredSpan === 'wide' ? 'lg:col-span-7' : 'lg:col-span-5';

  return (
    <article
      className={`${colSpanClass} group rounded-2xl bg-zinc-50/70 dark:bg-[#111216] border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors flex flex-col justify-between p-6 sm:p-8`}
    >
      <div>
        {/* Clean Unboxed Metadata (Zero-Pill Discipline) */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-3">
          <span className="font-[family-name:var(--font-mono)] tabular-nums font-medium text-zinc-800 dark:text-zinc-200">
            {project.index}
          </span>
          <span aria-hidden="true">·</span>
          <span>{project.categoryLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{project.client}</span>
          <span aria-hidden="true">·</span>
          <span className="font-[family-name:var(--font-mono)] tabular-nums">{project.year}</span>
        </div>

        {/* Title & Summary */}
        <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3 text-balance">
          {project.title}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
          {project.summary}
        </p>

        {/* Minimalist Interactive Component Preview */}
        <div className="rounded-xl bg-white dark:bg-[#090A0F] border border-zinc-200/70 dark:border-zinc-800/80 p-4 mb-6">
          {project.liveDemoType === 'token-button' && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                <span>Token Desain Interaktif</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span className="font-[family-name:var(--font-mono)] tabular-nums">
                  Radius {['12px', '6px', '16px'][interactiveState]}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setInteractiveState((s) => (s + 1) % 3)}
                className="min-h-[44px] px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-medium transition-transform active:scale-95 whitespace-nowrap shrink-0"
              >
                Ubah Varian ({['Utama', 'Kontras', 'Halus'][interactiveState]})
              </button>
            </div>
          )}

          {project.liveDemoType === 'orderbook-stream' && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="font-[family-name:var(--font-mono)] text-xs tabular-nums text-zinc-700 dark:text-zinc-300">
                IDR {(68420 + interactiveState * 15).toLocaleString('id-ID')} · 3.8ms frame
              </div>
              <button
                type="button"
                onClick={() => setInteractiveState((s) => s + 1)}
                className="min-h-[44px] px-3.5 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 text-xs font-medium whitespace-nowrap shrink-0"
              >
                Simulasi Tick Harga
              </button>
            </div>
          )}

          {project.liveDemoType === 'command-router' && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Navigasi Keyboard Instan · INP 28ms
              </span>
              <button
                type="button"
                onClick={() => setInteractiveState((s) => (s + 1) % 2)}
                className="min-h-[44px] px-3.5 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 whitespace-nowrap shrink-0"
              >
                {interactiveState === 0 ? 'Mode: Fokus Cepat' : 'Mode: Pencarian Fuzzy'}
              </button>
            </div>
          )}

          {project.liveDemoType === 'editorial-fluid' && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {interactiveState % 2 === 0
                  ? 'Kanvas Desktop 1440px (12 Kolom)'
                  : 'Kanvas Mobile 390px (Responsif)'}
              </span>
              <button
                type="button"
                onClick={() => setInteractiveState((s) => s + 1)}
                className="min-h-[44px] px-3.5 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 whitespace-nowrap shrink-0"
              >
                Uji Proporsi Grid
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Metrics & Case Study Trigger */}
      <div className="pt-4 border-t border-zinc-200/70 dark:border-zinc-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          {project.metrics.slice(0, 2).map((metric, idx) => (
            <div key={metric.label} className="flex items-center gap-1.5">
              {idx > 0 && <span className="text-zinc-400" aria-hidden="true">·</span>}
              <span className="text-zinc-500 dark:text-zinc-400">{metric.label}:</span>
              <span className="font-[family-name:var(--font-mono)] tabular-nums font-semibold text-zinc-900 dark:text-zinc-100">
                {metric.value}
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onSelectProject(project)}
          aria-label={`Lihat studi kasus ${project.title}`}
          className="min-h-[44px] px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-zinc-300 text-zinc-900 dark:text-zinc-100 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
        >
          <span>Lihat Studi Kasus</span>
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

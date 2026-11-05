'use client';

import React, { useEffect, useState } from 'react';
import { X, Code2, Layers, Copy, Check, ExternalLink } from 'lucide-react';
import type { ProjectItem } from '@/lib/portfolio-logic';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const [activeView, setActiveView] = useState<'overview' | 'code'>('overview');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const handleCopyCode = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(project.codeSnippet).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-xs p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-white dark:bg-[#11131A] border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Bottom Sheet Drag Handle Affordance */}
        <div className="sm:hidden w-10 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full mx-auto mb-5" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              <span className="font-[family-name:var(--font-mono)] font-semibold text-zinc-900 dark:text-zinc-100">
                Studi Kasus {project.index}
              </span>
              <span aria-hidden="true">·</span>
              <span>{project.client}</span>
              <span aria-hidden="true">·</span>
              <span>{project.role}</span>
              <span aria-hidden="true">·</span>
              <span>{project.readTime}</span>
            </div>
            <h2
              id="case-study-modal-title"
              className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100"
            >
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup studi kasus"
            className="min-h-[44px] min-w-[44px] rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 my-5">
          <button
            type="button"
            onClick={() => setActiveView('overview')}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'overview'
                ? 'bg-[#2563EB] text-white'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            <Layers className="w-4 h-4" aria-hidden="true" />
            <span>Arsitektur & Dampak Bisnis</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView('code')}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'code'
                ? 'bg-[#2563EB] text-white'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            <Code2 className="w-4 h-4" aria-hidden="true" />
            <span>Cuplikan Kode Produksi</span>
          </button>
        </div>

        {activeView === 'overview' ? (
          <div className="space-y-6">
            {/* Quantitative Impact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-4 rounded-xl bg-zinc-50 dark:bg-[#090A0F] border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{m.label}</div>
                  <div className="text-2xl font-bold font-[family-name:var(--font-mono)] tabular-nums text-zinc-900 dark:text-zinc-100 mt-1">
                    {m.value}
                  </div>
                  <div className="text-xs text-[#2563EB] dark:text-blue-400 mt-1">{m.delta}</div>
                </div>
              ))}
            </div>

            {/* Problem Statement */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
                Tantangan Teknis & Konteks Masalah
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            {/* Architecture Decisions */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Keputusan Arsitektur Frontend
              </h3>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                {project.architectureHighlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="font-[family-name:var(--font-mono)] text-xs text-[#2563EB] dark:text-blue-400 mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Unboxed Tech Stack Metadata */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                Tumpukan Teknologi:{' '}
              </span>
              {project.techStack.join(' · ')}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800">
                <span className="text-xs font-[family-name:var(--font-mono)] text-zinc-400">
                  Implementasi Inti ({project.techStack[0]})
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="min-h-[44px] px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Salin Snippet</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs font-[family-name:var(--font-mono)] text-blue-300 overflow-x-auto leading-relaxed">
                <code>{project.codeSnippet}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-6 pt-5 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          <a
            href="#kontak"
            onClick={onClose}
            className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Diskusikan Arsitektur Serupa</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Tutup Jendela
          </button>
        </div>
      </div>
    </div>
  );
}

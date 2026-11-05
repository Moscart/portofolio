'use client';

import React, { useEffect, useState } from 'react';
import { Search, X, ArrowRight, Sun, Moon, Mail, Check } from 'lucide-react';
import type { ProjectItem } from '@/lib/portfolio-logic';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  projects,
  onSelectProject,
  isDark,
  onToggleTheme,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalized = query.trim().toLowerCase();

  const matchingProjects = projects.filter(
    (p) =>
      !normalized ||
      p.title.toLowerCase().includes(normalized) ||
      p.categoryLabel.toLowerCase().includes(normalized) ||
      p.client.toLowerCase().includes(normalized)
  );

  const quickNavigation = [
    { label: 'Lompat ke Karya Pilihan', href: '#karya' },
    { label: 'Buka Laboratorium Interaksi UI', href: '#laboratorium' },
    { label: 'Lihat Riwayat Pengalaman & Testimoni', href: '#pengalaman' },
    { label: 'Estimator & Formulir Kolaborasi Proyek', href: '#kontak' },
  ].filter((item) => !normalized || item.label.toLowerCase().includes(normalized));

  const handleCopyEmail = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('raka.pratama@frontend.id').catch(() => {});
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 1800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Palet Perintah Cepat"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-xs pt-16 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-white dark:bg-[#11131A] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" aria-hidden="true" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari studi kasus, navigasi bagian, atau ganti tema..."
            aria-label="Cari perintah atau proyek"
            className="w-full min-h-[36px] bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup palet perintah"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-3 space-y-4">
          {/* Quick Actions */}
          <div>
            <div className="px-2 pb-1.5 text-[11px] font-medium text-zinc-400">
              Tindakan Cepat Sistem
            </div>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => {
                  onToggleTheme();
                  onClose();
                }}
                className="w-full min-h-[44px] px-3 py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/70 flex items-center justify-between text-xs font-medium text-zinc-800 dark:text-zinc-200 transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  {isDark ? (
                    <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
                  ) : (
                    <Moon className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                  )}
                  <span>
                    Beralih ke Mode {isDark ? 'Terang (Editorial Daylight)' : 'Gelap (Studio Obsidian)'}
                  </span>
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[11px] text-zinc-400">
                  Tema
                </span>
              </button>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full min-h-[44px] px-3 py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/70 flex items-center justify-between text-xs font-medium text-zinc-800 dark:text-zinc-200 transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                  ) : (
                    <Mail className="w-4 h-4 text-zinc-400" aria-hidden="true" />
                  )}
                  <span>
                    {copiedEmail
                      ? 'Alamat email disalin (raka.pratama@frontend.id)'
                      : 'Salin Email Langsung (raka.pratama@frontend.id)'}
                  </span>
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[11px] text-zinc-400">
                  Kontak
                </span>
              </button>
            </div>
          </div>

          {/* Matching Case Studies */}
          {matchingProjects.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 text-[11px] font-medium text-zinc-400">
                Studi Kasus Rekayasa ({matchingProjects.length})
              </div>
              <div className="space-y-1">
                {matchingProjects.map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => {
                      onSelectProject(project);
                      onClose();
                    }}
                    className="w-full min-h-[44px] px-3 py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/70 flex items-center justify-between text-left text-xs transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {project.title}
                      </div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {project.categoryLabel} · {project.client}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-400 shrink-0" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section Navigation */}
          {quickNavigation.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 text-[11px] font-medium text-zinc-400">
                Navigasi Bagian
              </div>
              <div className="space-y-1">
                {quickNavigation.map((nav) => (
                  <a
                    key={nav.href}
                    href={nav.href}
                    onClick={onClose}
                    className="w-full min-h-[44px] px-3 py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/70 flex items-center justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors"
                  >
                    <span>{nav.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

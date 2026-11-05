'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  validateInquiryForm,
  estimateProjectScope,
  type InquiryFormInput,
} from '@/lib/portfolio-logic';

interface SubmittedInquiry extends InquiryFormInput {
  id: string;
  submittedAt: string;
  deliverablesCount: number;
}

export default function ContactEstimator() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [scope, setScope] = useState<InquiryFormInput['scope']>('design-system');
  const [timelineWeeks, setTimelineWeeks] = useState<number>(8);
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormInput, string>>>({});
  const [submittedList, setSubmittedList] = useState<SubmittedInquiry[]>([]);

  const estimate = estimateProjectScope(scope, timelineWeeks);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formPayload: InquiryFormInput = {
      name,
      email,
      company,
      scope,
      timelineWeeks,
      message,
    };

    const validation = validateInquiryForm(formPayload);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const newEntry: SubmittedInquiry = {
      ...formPayload,
      id: `INQ-${104 + submittedList.length}`,
      submittedAt: 'Baru saja tercatat',
      deliverablesCount: estimate.deliverablesCount,
    };

    setSubmittedList((prev) => [newEntry, ...prev]);
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
  };

  return (
    <section
      id="kontak"
      aria-labelledby="contact-heading"
      className="py-16 md:py-24 border-t border-zinc-200/80 dark:border-zinc-800/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
            04. Kolaborasi & Estimasi Ruang Lingkup · Respons dalam 24 Jam Kerja
          </p>
          <h2
            id="contact-heading"
            className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 text-balance"
          >
            Rancang arsitektur frontend atau sistem desain produk Anda berikutnya.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Scope Estimator */}
          <div className="lg:col-span-5 rounded-2xl bg-zinc-50 dark:bg-[#11131A] border border-zinc-200 dark:border-zinc-800/90 p-6 sm:p-7 space-y-6">
            <div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Kalkulator Spesifikasi Teknis & Sprint
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Pilih fokus rekayasa dan target durasi untuk memetakan alokasi sprint.
              </p>
            </div>

            <div className="space-y-2">
              <span className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Fokus Rekayasa Utama
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(
                  [
                    { id: 'design-system', label: 'Lingkup: Design System' },
                    { id: 'frontend-architecture', label: 'Lingkup: Arsitektur App' },
                    { id: 'interactive-web', label: 'Lingkup: Web Interaktif' },
                    { id: 'performance-audit', label: 'Lingkup: Audit Performa' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setScope(item.id)}
                    className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium border text-left transition-colors ${
                      scope === item.id
                        ? 'border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB] dark:text-blue-400'
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <label htmlFor="slider-timeline" className="text-zinc-700 dark:text-zinc-300">
                  Target Durasi Pelaksanaan
                </label>
                <span className="font-[family-name:var(--font-mono)] tabular-nums text-zinc-900 dark:text-zinc-100">
                  {timelineWeeks} minggu
                </span>
              </div>
              <input
                id="slider-timeline"
                type="range"
                min={2}
                max={16}
                step={1}
                value={timelineWeeks}
                onChange={(e) => setTimelineWeeks(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
              />
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">Estimasi Komponen / Modul</span>
                <span className="font-[family-name:var(--font-mono)] tabular-nums font-bold text-zinc-900 dark:text-zinc-100">
                  {estimate.deliverablesCount} artefak produksi
                </span>
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">
                  Rekomendasi Stack:
                </span>
                {estimate.recommendedArchitecture}
              </div>

              <div className="space-y-1.5 pt-2">
                {estimate.sprintBreakdown.map((phase, idx) => (
                  <div
                    key={phase.phase}
                    className="flex items-center justify-between text-xs py-1 border-b border-zinc-200/60 dark:border-zinc-800/60 last:border-none"
                  >
                    <span className="text-zinc-600 dark:text-zinc-400">
                      0{idx + 1}. {phase.phase}
                    </span>
                    <span className="font-[family-name:var(--font-mono)] tabular-nums font-medium text-zinc-900 dark:text-zinc-100">
                      {phase.weeks} mgg
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form & Live Session Log */}
          <div className="lg:col-span-7 rounded-2xl bg-zinc-50 dark:bg-[#11131A] border border-zinc-200 dark:border-zinc-800/90 p-6 sm:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="inquiry-name"
                    className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                  >
                    Nama Lengkap *
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mis. Nadia Kusuma"
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-white dark:bg-[#090A0F] border border-zinc-300 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-2 focus:outline-[#2563EB]"
                  />
                  {errors.name && (
                    <p role="alert" className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="inquiry-email"
                    className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                  >
                    Email Kerja *
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nadia@perusahaan.id"
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-white dark:bg-[#090A0F] border border-zinc-300 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-2 focus:outline-[#2563EB]"
                  />
                  {errors.email && (
                    <p role="alert" className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="inquiry-company"
                  className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                >
                  Perusahaan / Organisasi (Opsional)
                </label>
                <input
                  id="inquiry-company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Mis. Sovereign Digital Banking"
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-white dark:bg-[#090A0F] border border-zinc-300 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-2 focus:outline-[#2563EB]"
                />
              </div>

              <div>
                <label
                  htmlFor="inquiry-message"
                  className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                >
                  Ringkasan Kebutuhan & Target Produk *
                </label>
                <textarea
                  id="inquiry-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ceritakan tantangan arsitektur UI, target Core Web Vitals, atau kebutuhan Design System tim Anda..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#090A0F] border border-zinc-300 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-2 focus:outline-[#2563EB]"
                />
                {errors.message && (
                  <p role="alert" className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Estimasi terlampir: {timelineWeeks} minggu · {estimate.deliverablesCount} modul
                </p>
                <button
                  type="submit"
                  className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Kirim Brief Proyek</span>
                </button>
              </div>
            </form>

            {/* Submitted Briefs State */}
            {submittedList.length > 0 && (
              <div
                aria-live="polite"
                className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  <span>Brief Proyek Tercatat ({submittedList.length})</span>
                </div>
                {submittedList.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-white dark:bg-[#090A0F] border border-zinc-200 dark:border-zinc-800 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-semibold text-zinc-900 dark:text-zinc-100">
                      <span>
                        {item.id} · {item.name} ({item.email})
                      </span>
                      <span className="font-[family-name:var(--font-mono)] tabular-nums text-zinc-500">
                        {item.timelineWeeks} mgg · {item.deliverablesCount} modul
                      </span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400">{item.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

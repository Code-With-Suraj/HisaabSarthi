'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MessageCircle,
  ArrowUpRight,
  LayoutGrid,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FEATURE_POSTERS,
  type PosterCategory,
  type FeaturePoster,
} from '@/lib/feature-posters';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';

type GalleryFilter = 'all' | PosterCategory;

const GALLERY_FILTERS: { id: GalleryFilter; label: string }[] = [
  { id: 'all', label: 'All 12 Modules' },
  { id: 'billing', label: 'Billing & Challans' },
  { id: 'banking', label: 'Banking & Ledgers' },
  { id: 'inventory', label: 'Inventory & Pricing' },
  { id: 'operations', label: 'Purchases & Setup' },
];

export default function VisualProductCatalog() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visiblePosters: FeaturePoster[] = useMemo(() => {
    if (activeFilter === 'all') return FEATURE_POSTERS;
    return FEATURE_POSTERS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const activePoster =
    lightboxIndex !== null ? visiblePosters[lightboxIndex] ?? null : null;

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? visiblePosters.length - 1 : prev - 1;
    });
  }, [visiblePosters.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === visiblePosters.length - 1 ? 0 : prev + 1;
    });
  }, [visiblePosters.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, goPrev, goNext]);

  const buyNowUrl = buildWhatsAppUrl('buy-setup');

  return (
    <div>
      {/* Filter & Counter Header Bar */}
      <div className="mb-8 flex flex-col gap-4 border-b border-slate-800 pb-6 md:flex-row md:items-center md:justify-between">
        <div
          role="tablist"
          aria-label="Filter visual feature showcase"
          className="inline-flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 p-1.5"
        >
          {GALLERY_FILTERS.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveFilter(tab.id);
                  setLightboxIndex(null);
                }}
                className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isActive
                    ? 'bg-[#059669] text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <LayoutGrid className="h-3.5 w-3.5 text-emerald-400" />
          <span>
            Showing{' '}
            <span className="font-mono-num font-semibold text-white">
              {visiblePosters.length}
            </span>{' '}
            of <span className="font-mono-num text-slate-300">12</span> product
            blueprints · Click any card to inspect full screen
          </span>
        </div>
      </div>

      {/* Modern 3:4 Editorial Bento Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {visiblePosters.map((poster, index) => (
          <motion.article
            layout
            key={poster.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/70 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-slate-950/60"
          >
            {/* Exact 3:4 Portrait Visual Container */}
            <button
              type="button"
              onClick={() => {
                trackEvent('feature_screen_preview', {
                  location: 'visual_catalog',
                  label: poster.id,
                });
                setLightboxIndex(index);
              }}
              aria-label={`Inspect ${poster.title} in full screen`}
              className="relative aspect-[3/4] w-full cursor-zoom-in overflow-hidden bg-[#07152D] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400"
            >
              <Image
                src={poster.src}
                alt={poster.alt}
                width={poster.width}
                height={poster.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025]"
              />

              {/* Hover Zoom Affordance */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent p-3.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <span className="font-mono-num text-[11px] font-semibold text-emerald-300">
                  {poster.order} / 12
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-slate-950/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-xs">
                  <ZoomIn className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Full View</span>
                </span>
              </div>
            </button>

            {/* Clean Footer Caption Bar */}
            <div className="flex flex-1 flex-col justify-between border-t border-slate-800/90 p-4">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-num text-[11px] font-semibold text-emerald-400">
                    MODULE {poster.order}
                  </span>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="text-[11px] font-medium text-slate-400 transition-colors hover:text-white"
                  >
                    Zoom
                  </button>
                </div>
                <h3 className="mt-1.5 font-display text-sm font-bold leading-snug text-white">
                  {poster.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400 line-clamp-2">
                  {poster.tagline}
                </p>
              </div>

              <div className="mt-3.5 border-t border-slate-800/80 pt-3">
                <Link
                  href={poster.detailHref}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
                >
                  <span>{poster.detailLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* Full-Screen High-Res Lightbox Modal */}
      <AnimatePresence>
        {activePoster && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${activePoster.title} full screen preview`}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-3 backdrop-blur-xs sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-[#0F172A] text-white shadow-2xl"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between gap-4 border-b border-slate-800 bg-slate-950/70 px-4 py-3 sm:px-6">
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-white truncate sm:text-base">
                    {activePoster.title}{' '}
                    <span className="font-mono-num text-xs font-medium text-emerald-400">
                      ({lightboxIndex + 1} / {visiblePosters.length})
                    </span>
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    {activePoster.tagline}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close full-screen preview"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Stage */}
              <div className="relative flex flex-1 items-center justify-center overflow-auto bg-[#071122] p-4 sm:p-6">
                <Image
                  src={activePoster.src}
                  alt={activePoster.alt}
                  width={activePoster.width}
                  height={activePoster.height}
                  referrerPolicy="no-referrer"
                  className="max-h-[68vh] h-auto w-auto max-w-full rounded-xl border border-slate-700/80 object-contain shadow-2xl"
                />

                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous module graphic"
                  className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900/95 text-white shadow-lg transition-colors hover:border-emerald-500 hover:bg-emerald-600"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next module graphic"
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900/95 text-white shadow-lg transition-colors hover:border-emerald-500 hover:bg-emerald-600"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Footer Navigation & Quick Actions */}
              <div className="flex flex-col gap-3 border-t border-slate-800 bg-slate-950/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {visiblePosters.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      className={`shrink-0 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-colors whitespace-nowrap ${
                        idx === lightboxIndex
                          ? 'border-emerald-500 bg-emerald-600 text-white'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {item.shortLabel}
                    </button>
                  ))}
                </div>

                <div className="flex shrink-0 items-center gap-2.5">
                  <Link
                    href={activePoster.detailHref}
                    onClick={() => setLightboxIndex(null)}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-slate-500 hover:text-white whitespace-nowrap"
                  >
                    <span>{activePoster.detailLabel}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <a
                    href={buyNowUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#059669] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#047857] whitespace-nowrap"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Get ₹4,999 Setup</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

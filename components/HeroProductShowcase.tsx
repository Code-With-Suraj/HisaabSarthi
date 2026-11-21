'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  ZoomIn,
  X,
  Play,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCT_SCREENS } from '@/lib/product-screens';
import { LIVE_DEMO_URL } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';

export default function HeroProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const totalSlides = PRODUCT_SCREENS.length;
  const activeSlide = PRODUCT_SCREENS[activeIndex];

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen, goPrev, goNext]);

  return (
    <div className="flex flex-col gap-3.5">
      {/* Main E-Commerce Product Stage */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-[#F4F2EC]">
          {/* Subtle Application Window Header */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3.5 py-2 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="h-2 w-2 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
              <span className="h-2 w-2 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
              <span className="h-2 w-2 shrink-0 rounded-full bg-slate-300" aria-hidden="true" />
              <span className="ml-2 truncate font-semibold text-[#0F172A]">
                {activeSlide.title}
              </span>
            </div>
            <span className="font-mono-num shrink-0 text-[11px] font-medium text-slate-500">
              {activeIndex + 1} / {totalSlides}
            </span>
          </div>

          {/* Uniform Studio Pedestal Viewport (Zero layout jump across wide & portrait screens) */}
          <div className="relative flex h-[260px] items-center justify-center bg-[#F4F2EC] p-2.5 sm:h-[350px] sm:p-3.5 lg:h-[370px]">
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label={`Zoom ${activeSlide.title} in full screen`}
              className="group relative flex h-full w-full cursor-zoom-in items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg"
            >
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0.35 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-full w-full items-center justify-center"
              >
                <Image
                  src={activeSlide.src}
                  alt={activeSlide.alt}
                  width={activeSlide.width}
                  height={activeSlide.height}
                  priority={activeIndex === 0}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full h-auto w-auto rounded-lg border border-slate-200/90 bg-white object-contain shadow-xs"
                />
              </motion.div>

              {/* Hover Zoom Affordance */}
              <span className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white/95 px-2.5 py-1.5 text-xs font-semibold text-[#0F172A] shadow-xs transition-transform duration-150 group-hover:-translate-y-0.5">
                <ZoomIn className="h-3.5 w-3.5 text-emerald-700" />
                <span>Zoom</span>
              </span>
            </button>

            {/* E-Commerce Prev / Next Arrows */}
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous product screen"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-[#0F172A] shadow-xs transition-colors hover:bg-[#0F172A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next product screen"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-[#0F172A] shadow-xs transition-colors hover:bg-[#0F172A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Product Stage Caption + Quick Demo Jump */}
        <div className="mt-3 flex flex-col gap-2 px-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-slate-600">
            {activeSlide.caption}
          </p>
          <a
            href={LIVE_DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent('demo_interaction', {
                location: 'hero_gallery',
                label: 'launch_live_demo_app',
              })
            }
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 whitespace-nowrap shrink-0"
          >
            <Play className="h-3.5 w-3.5" />
            <span>Launch Live App Demo</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* E-Commerce 8-Screen Product Thumbnail Grid (4x2) */}
      <div
        role="tablist"
        aria-label="HisabSarthi actual software screens"
        className="grid grid-cols-4 gap-2 sm:gap-2.5"
      >
        {PRODUCT_SCREENS.map((slide, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveIndex(idx)}
              className={`group flex flex-col overflow-hidden rounded-xl border bg-white text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                isSelected
                  ? 'border-[#0F172A] ring-1 ring-[#0F172A]'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F4F2EC] p-1">
                <Image
                  src={slide.src}
                  alt={slide.shortLabel}
                  width={slide.width}
                  height={slide.height}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full h-auto w-auto rounded-[4px] object-contain"
                />
              </div>
              <div className="border-t border-slate-100 px-2 py-1.5">
                <p
                  className={`truncate text-[11px] font-semibold ${
                    isSelected
                      ? 'text-[#0F172A]'
                      : 'text-slate-600 group-hover:text-[#0F172A]'
                  }`}
                >
                  {slide.shortLabel}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* E-Commerce Product Guarantees Strip */}
      <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 sm:grid-cols-4">
        {[
          { title: 'Lifetime License', sub: 'No Monthly Fee' },
          { title: 'Free Setup', sub: 'Suraj Automation' },
          { title: 'Your Google Drive', sub: '100% Data Control' },
          { title: 'Browser Based', sub: 'Zero Download' },
        ].map((item) => (
          <div key={item.title} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-[#0F172A]">
                {item.title}
              </p>
              <p className="truncate text-[11px] text-slate-500">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Full-Screen E-Commerce Product Lightbox with Prev/Next & Thumbnail Bar */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeSlide.title} full-screen preview`}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-3 backdrop-blur-xs sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-white shadow-2xl"
            >
              {/* Lightbox Header */}
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-[#FAF9F6] px-4 py-3 sm:px-6">
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-[#0F172A] truncate">
                    {activeSlide.title}{' '}
                    <span className="font-mono-num text-xs font-medium text-slate-500">
                      ({activeIndex + 1} / {totalSlides})
                    </span>
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {activeSlide.caption}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  aria-label="Close full-screen preview"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Lightbox Stage */}
              <div className="relative flex flex-1 items-center justify-center overflow-auto bg-[#F4F2EC] p-4 sm:p-6">
                <Image
                  src={activeSlide.src}
                  alt={activeSlide.alt}
                  width={activeSlide.width}
                  height={activeSlide.height}
                  referrerPolicy="no-referrer"
                  className="max-h-[65vh] w-auto max-w-full rounded-lg border border-slate-200 bg-white object-contain shadow-sm"
                />

                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-[#0F172A] shadow-sm hover:bg-[#0F172A] hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-[#0F172A] shadow-sm hover:bg-[#0F172A] hover:text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Lightbox Bottom Strip */}
              <div className="flex items-center gap-2 overflow-x-auto border-t border-slate-200 bg-white px-4 py-2.5">
                {PRODUCT_SCREENS.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                      idx === activeIndex
                        ? 'border-[#0F172A] bg-[#0F172A] text-white'
                        : 'border-slate-200 bg-[#FAF9F6] text-slate-600 hover:border-slate-300 hover:text-[#0F172A]'
                    }`}
                  >
                    {slide.shortLabel}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

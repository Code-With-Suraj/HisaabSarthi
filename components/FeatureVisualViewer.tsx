'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ZoomIn, X, Layers, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { ProductScreen } from '@/lib/product-screens';
import type { FeaturePoster } from '@/lib/feature-posters';

interface FeatureVisualViewerProps {
  screen?: ProductScreen;
  posters: FeaturePoster[];
}

export default function FeatureVisualViewer({
  screen,
  posters,
}: FeatureVisualViewerProps) {
  const [selectedView, setSelectedView] = useState<'screen' | string>(
    screen ? 'screen' : posters[0]?.id ?? 'screen'
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activePoster = posters.find((p) => p.id === selectedView);
  const isShowingScreen = selectedView === 'screen' && Boolean(screen);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen]);

  if (!screen && posters.length === 0) return null;

  const activeTitle = isShowingScreen
    ? screen!.title
    : activePoster?.title ?? '';
  const activeCaption = isShowingScreen
    ? `Actual HisabSarthi workspace screen: ${screen!.caption}`
    : activePoster?.tagline ?? '';
  const activeSrc = isShowingScreen ? screen!.src : activePoster?.src ?? '';
  const activeAlt = isShowingScreen ? screen!.alt : activePoster?.alt ?? '';
  const activeWidth = isShowingScreen
    ? screen!.width
    : activePoster?.width ?? 1086;
  const activeHeight = isShowingScreen
    ? screen!.height
    : activePoster?.height ?? 1448;

  return (
    <figure className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
      {/* Switcher Bar when both Workspace Screen and Feature Poster(s) exist */}
      {posters.length > 0 && (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="inline-flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-[#FAF9F6] p-1">
            {screen && (
              <button
                type="button"
                onClick={() => setSelectedView('screen')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                  selectedView === 'screen'
                    ? 'bg-[#0F172A] text-white'
                    : 'text-slate-600 hover:bg-white hover:text-[#0F172A]'
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
                <span>Live Software Screen</span>
              </button>
            )}
            {posters.map((poster) => (
              <button
                key={poster.id}
                type="button"
                onClick={() => setSelectedView(poster.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                  selectedView === poster.id
                    ? 'bg-[#059669] text-white'
                    : 'text-slate-600 hover:bg-white hover:text-[#0F172A]'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>{poster.shortLabel} Poster</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#0F172A] transition-colors hover:bg-slate-50"
          >
            <ZoomIn className="h-3.5 w-3.5 text-emerald-700" />
            <span>Inspect Full Screen</span>
          </button>
        </div>
      )}

      {/* Visual Stage */}
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        aria-label={`Zoom ${activeTitle} in full screen`}
        className={`group relative flex w-full cursor-zoom-in items-center justify-center rounded-xl border p-3 sm:p-4 transition-colors ${
          isShowingScreen
            ? 'border-slate-200 bg-[#F4F2EC]'
            : 'border-slate-800 bg-[#08152E]'
        }`}
      >
        <Image
          src={activeSrc}
          alt={activeAlt}
          width={activeWidth}
          height={activeHeight}
          priority
          referrerPolicy="no-referrer"
          className={`h-auto w-auto max-w-full rounded-lg object-contain shadow-sm ${
            isShowingScreen
              ? 'max-h-[480px] border border-slate-200 bg-white'
              : 'max-h-[540px] border border-slate-700/70'
          }`}
        />

        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white/95 px-2.5 py-1.5 text-xs font-semibold text-[#0F172A] shadow-xs transition-transform duration-150 group-hover:-translate-y-0.5">
          <ZoomIn className="h-3.5 w-3.5 text-emerald-700" />
          <span>Zoom</span>
        </span>
      </button>

      <figcaption className="mt-3 px-1 text-xs text-slate-500">
        {activeCaption}
      </figcaption>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeTitle} full-screen preview`}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/88 p-4 backdrop-blur-xs sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-[#FAF9F6] px-5 py-3.5">
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-[#0F172A] truncate">
                    {activeTitle}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {activeCaption}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  aria-label="Close full-screen preview"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div
                className={`flex flex-1 items-center justify-center overflow-auto p-4 sm:p-6 ${
                  isShowingScreen ? 'bg-[#F4F2EC]' : 'bg-[#08152E]'
                }`}
              >
                <Image
                  src={activeSrc}
                  alt={activeAlt}
                  width={activeWidth}
                  height={activeHeight}
                  referrerPolicy="no-referrer"
                  className="max-h-[75vh] h-auto w-auto max-w-full rounded-lg object-contain shadow-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </figure>
  );
}

export function PosterSpotlightCard({ poster }: { poster: FeaturePoster }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Inspect ${poster.title} in full screen`}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-slate-800 bg-[#08152E] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
      >
        <div className="aspect-[3/4] w-full overflow-hidden">
          <Image
            src={poster.src}
            alt={poster.alt}
            width={poster.width}
            height={poster.height}
            priority
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-slate-950/85 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-xs">
          <ZoomIn className="h-3.5 w-3.5 text-emerald-400" />
          <span>Inspect Full Graphic</span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${poster.title} full-screen preview`}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-xs sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-[#0F172A] shadow-2xl"
            >
              <div className="flex items-center justify-between gap-4 border-b border-slate-800 bg-slate-950/70 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-white truncate">
                    {poster.title}
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    {poster.tagline}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close preview"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-1 items-center justify-center overflow-auto bg-[#071122] p-4 sm:p-6">
                <Image
                  src={poster.src}
                  alt={poster.alt}
                  width={poster.width}
                  height={poster.height}
                  referrerPolicy="no-referrer"
                  className="max-h-[75vh] h-auto w-auto max-w-full rounded-xl border border-slate-700/80 object-contain shadow-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

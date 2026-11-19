'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Info, Eye, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FEATURE_MODULES, type FeatureModule } from '@/lib/hisab-data';
import { PRODUCT_SCREENS, type ProductScreen } from '@/lib/product-screens';
import { trackEvent } from '@/lib/analytics';

const FEATURE_ROUTE_MAP: Record<string, string> = {
  'sales-invoice': '/features/business-dashboard',
  'delivery-challan': '/features/delivery-challan-management',
  'inventory-stock': '/features/inventory-management',
  'custom-pricing': '/features/custom-pricing',
  'payments-accounting': '/features/ageing-reports',
  'reports-gst': '/features/gst-reporting',
};

type FilterTab = 'all' | 'sales' | 'inventory' | 'purchases' | 'accounting';

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All 8 Modules' },
  { id: 'sales', label: 'Sales & Challans' },
  { id: 'inventory', label: 'Inventory & Pricing' },
  { id: 'purchases', label: 'Purchases & GST' },
  { id: 'accounting', label: 'Masters & Ledgers' },
];

export default function FeatureExplorer() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [previewScreen, setPreviewScreen] = useState<ProductScreen | null>(null);

  const visibleModules: FeatureModule[] =
    activeFilter === 'all'
      ? FEATURE_MODULES
      : FEATURE_MODULES.filter((mod) => mod.category === activeFilter);

  useEffect(() => {
    if (!previewScreen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewScreen(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [previewScreen]);

  return (
    <div>
      {/* Interactive Segmented Filter */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div
          role="tablist"
          aria-label="Filter feature modules"
          className="inline-flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1.5"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(tab.id)}
                className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                  isActive
                    ? 'bg-[#0F172A] text-white'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#0F172A]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <p className="text-sm text-slate-500">
          Showing{' '}
          <span className="font-mono-num font-semibold text-[#0F172A]">
            {visibleModules.length}
          </span>{' '}
          of <span className="font-mono-num">8</span> core modules
        </p>
      </div>

      {/* Clean 2-Column Module Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {visibleModules.map((mod) => {
          const matchingScreens = PRODUCT_SCREENS.filter(
            (s) => s.featureId === mod.id
          );

          return (
            <article
              key={mod.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 sm:p-8 transition-colors duration-150 hover:border-slate-300"
            >
              <div>
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono-num text-sm font-semibold text-emerald-700">
                      {mod.number}
                    </span>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-[#0F172A]">
                      {mod.title}
                    </h3>
                  </div>

                  {matchingScreens.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      {matchingScreens.map((screen) => (
                        <button
                          key={screen.id}
                          type="button"
                          onClick={() => {
                            trackEvent('feature_screen_preview', {
                              location: 'feature_explorer',
                              label: screen.id,
                            });
                            setPreviewScreen(screen);
                          }}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 transition-colors hover:text-emerald-800 hover:decoration-emerald-800 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>
                            {matchingScreens.length > 1
                              ? screen.shortLabel
                              : 'View Screen'}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <p className="mb-5 text-sm leading-relaxed text-slate-600">
                  {mod.description}
                </p>

                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {mod.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                        strokeWidth={2}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {(mod.callout || mod.footnote || FEATURE_ROUTE_MAP[mod.id]) && (
                <div className="mt-6 space-y-2 border-t border-slate-100 pt-4">
                  {mod.callout && (
                    <p className="text-sm font-semibold text-[#0F172A]">
                      {mod.callout}
                    </p>
                  )}
                  {mod.footnote && (
                    <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-500 italic">
                      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span>{mod.footnote}</span>
                    </p>
                  )}
                  {FEATURE_ROUTE_MAP[mod.id] && (
                    <Link
                      href={FEATURE_ROUTE_MAP[mod.id]}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      <span>Explore detailed workflow &amp; FAQs</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Feature Screenshot Preview Modal */}
      <AnimatePresence>
        {previewScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${previewScreen.title} screen preview`}
            onClick={() => setPreviewScreen(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-xs sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-700 bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-[#FAF9F6] px-5 py-3.5">
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-[#0F172A] truncate">
                    {previewScreen.title}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {previewScreen.caption}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewScreen(null)}
                  aria-label="Close screen preview"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex max-h-[78vh] items-center justify-center overflow-auto bg-[#F4F2EC] p-4">
                <Image
                  src={previewScreen.src}
                  alt={previewScreen.alt}
                  width={previewScreen.width}
                  height={previewScreen.height}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] w-auto max-w-full rounded-lg border border-slate-200 bg-white object-contain shadow-sm"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

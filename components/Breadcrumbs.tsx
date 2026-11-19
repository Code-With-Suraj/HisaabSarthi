import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.href} className="inline-flex items-center gap-1.5">
              {idx > 0 && (
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
              )}
              {isLast ? (
                <span className="font-semibold text-[#0F172A]" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[#0F172A] hover:underline hover:underline-offset-4"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';
import {
  FEATURE_PAGES,
  SOLUTION_PAGES,
  GUIDE_ARTICLES,
} from '@/lib/seo-pages-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-11-18T00:00:00.000Z');

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: absoluteUrl('/how-it-works'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: absoluteUrl('/security'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: absoluteUrl('/guides'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ];

  const featureRoutes: MetadataRoute.Sitemap = FEATURE_PAGES.map((feature) => ({
    url: absoluteUrl(`/features/${feature.slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const solutionRoutes: MetadataRoute.Sitemap = SOLUTION_PAGES.map(
    (solution) => ({
      url: absoluteUrl(`/solutions/${solution.slug}`),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    })
  );

  const guideRoutes: MetadataRoute.Sitemap = GUIDE_ARTICLES.map((guide) => ({
    url: absoluteUrl(`/guides/${guide.slug}`),
    lastModified: new Date(guide.publishedTime),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...featureRoutes, ...solutionRoutes, ...guideRoutes];
}

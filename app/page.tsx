/**
 * Home Page - Enhanced SaaS Landing Page
 *
 * Professional landing page showcasing FlatWP's performance and features
 */

import { HeroSection } from '@/components/landing/HeroSection';
import { PerformanceMetrics } from '@/components/landing/PerformanceMetrics';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { CTASection } from '@/components/landing/CTASection';
import { Metadata } from 'next';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PerformanceMetrics />
      <FeaturesSection />
      <CTASection />
    </>
  );
}

/**
 * Metadata for SEO
 */
export const metadata: Metadata = {
  title: 'FlatWP - Build Lightning-Fast WordPress Sites with Next.js',
  description:
    'FlatWP combines WordPress CMS power with Next.js 15 performance. Get 95+ Lighthouse scores, ISR, TypeScript, GraphQL, and 12+ premium blocks. Open source and free.',
  keywords: [
    'headless wordpress',
    'nextjs wordpress',
    'wordpress nextjs',
    'static wordpress',
    'wordpress graphql',
    'fast wordpress',
    'wordpress performance',
    'wordpress typescript',
  ],
  authors: [{ name: 'FlatWP Team' }],
  openGraph: {
    title: 'FlatWP - Build Lightning-Fast WordPress Sites with Next.js',
    description:
      'Achieve 95+ Lighthouse scores with headless WordPress. FlatWP provides ISR, TypeScript, GraphQL, and premium blocks out of the box.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlatWP - Lightning-Fast WordPress with Next.js',
    description:
      'Build modern WordPress sites with 95+ Lighthouse scores. Open source headless WordPress starter with Next.js 15.',
  },
};

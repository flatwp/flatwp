/**
 * Features Section
 *
 * Showcases main FlatWP features with detailed descriptions
 */

import { FeatureCard } from './FeatureCard';
import {
  Zap,
  Code2,
  Shield,
  Blocks,
  Search,
  RefreshCw,
  Database,
  Globe,
  Image,
  Layers,
  Sparkles,
  Rocket,
} from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning-Fast Performance',
      description:
        'Static generation and ISR ensure your pages load in milliseconds. Automatically optimized images and code splitting out of the box.',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Code2,
      title: 'Full TypeScript Support',
      description:
        'End-to-end type safety with auto-generated types from GraphQL schema. Catch errors before they reach production.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Shield,
      title: 'Production-Ready Security',
      description:
        'Built-in security headers, CSP policies, and rate limiting. WordPress backend is completely isolated from your frontend.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Blocks,
      title: '12+ Premium Blocks',
      description:
        'Beautiful, accessible WordPress blocks built with Shadcn/UI. From hero sections to testimonials, tables, and forms.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: RefreshCw,
      title: 'Incremental Static Regeneration',
      description:
        'Get the best of both worlds: static speed with dynamic content. Pages revalidate on-demand when content updates.',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Database,
      title: 'GraphQL-Powered',
      description:
        'Efficient data fetching with WPGraphQL. Request exactly what you need, nothing more. Built-in query optimization.',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Image,
      title: 'Automatic Image Optimization',
      description:
        'Next.js Image component handles resizing, format conversion (WebP/AVIF), and lazy loading automatically.',
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      icon: Search,
      title: 'Built-in Search',
      description:
        'Client-side fuzzy search with Fuse.js. Fast, instant results without hitting your server or database.',
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      icon: Globe,
      title: 'SEO Optimized',
      description:
        'Dynamic meta tags, Open Graph, Twitter Cards, and automatic sitemap generation. Perfect Lighthouse SEO scores.',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Layers,
      title: 'Flexible Content Modeling',
      description:
        'Support for custom post types, ACF fields, and taxonomies. Map WordPress content to React components seamlessly.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: Sparkles,
      title: 'Dark Mode Ready',
      description:
        'Beautiful dark mode built-in with Tailwind CSS. Respects user preferences and persists across sessions.',
      gradient: 'from-slate-700 to-slate-900',
    },
    {
      icon: Rocket,
      title: 'Deploy Anywhere',
      description:
        'Optimized for Vercel, Netlify, and Cloudflare Pages. Edge functions support for dynamic features.',
      gradient: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold">
            Everything You Need to Build{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Modern WordPress Sites
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            FlatWP provides a complete toolkit for building high-performance headless WordPress sites
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

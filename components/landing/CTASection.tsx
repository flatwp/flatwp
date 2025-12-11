/**
 * CTA (Call to Action) Section
 *
 * Final conversion section with compelling call to action
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600" />
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.5),transparent)]" />

      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 text-white">
          <div className="inline-block">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Open Source & Free Forever
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            Ready to Build Something Amazing?
          </h2>

          <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Join developers using FlatWP to build lightning-fast WordPress sites.
            Get started in minutes with our comprehensive starter template.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-white/90 text-lg px-8 h-14 group"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 h-14"
              asChild
            >
              <Link href="/docs" className="inline-flex items-center">
                <BookOpen className="mr-2 w-5 h-5" />
                Read Documentation
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="space-y-1">
              <div className="text-3xl font-bold">95+</div>
              <div className="text-sm text-white/80">Lighthouse Score</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold">12+</div>
              <div className="text-sm text-white/80">Premium Blocks</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm text-white/80">Type Safe</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold">MIT</div>
              <div className="text-sm text-white/80">Open Source</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

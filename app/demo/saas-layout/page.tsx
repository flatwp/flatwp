/**
 * SaaS Layout Demo Page
 *
 * This page demonstrates content sections for a SaaS landing page.
 * The SaaS header and footer are now automatically included via the root layout.
 */
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Shield,
  BarChart3,
  Users,
  ArrowRight,
  Check,
  Star,
  TrendingUp,
  Globe,
  Lock,
  Sparkles,
} from "lucide-react";

export default function SaaSLayoutDemoPage() {
  return (
    <>
      {/* Note: Header and Footer are already included in the root layout */}
      {/* This demo page just shows the content sections */}
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <Badge className="mb-4" variant="secondary">
                <Sparkles className="mr-1 h-3 w-3" />
                New: AI-Powered Features Now Available
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Build Headless WordPress Sites
                <span className="text-primary"> 10x Faster</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                The modern platform that combines WordPress content management with Next.js performance.
                Ship production-ready sites in minutes, not months.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="min-w-[200px]">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="min-w-[200px]">
                  View Live Demo
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                No credit card required · 14-day free trial · Cancel anytime
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Everything You Need to Succeed</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Powerful features to help you build, deploy, and scale
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Zap className="h-6 w-6" />}
                title="Lightning Fast"
                description="Sub-second page loads with ISR and edge caching"
              />
              <FeatureCard
                icon={<Shield className="h-6 w-6" />}
                title="Enterprise Security"
                description="SOC 2 Type II certified with end-to-end encryption"
              />
              <FeatureCard
                icon={<BarChart3 className="h-6 w-6" />}
                title="Analytics Built-in"
                description="Real-time insights into your site performance"
              />
              <FeatureCard
                icon={<Users className="h-6 w-6" />}
                title="Team Collaboration"
                description="Work together with unlimited team members"
              />
              <FeatureCard
                icon={<Globe className="h-6 w-6" />}
                title="Global CDN"
                description="Deploy to 300+ edge locations worldwide"
              />
              <FeatureCard
                icon={<Lock className="h-6 w-6" />}
                title="GDPR Compliant"
                description="Full compliance with privacy regulations"
              />
              <FeatureCard
                icon={<TrendingUp className="h-6 w-6" />}
                title="SEO Optimized"
                description="Built-in SEO tools and schema markup"
              />
              <FeatureCard
                icon={<Star className="h-6 w-6" />}
                title="99.99% Uptime"
                description="Enterprise SLA with guaranteed uptime"
              />
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="border-y bg-muted/50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">10,000+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">50M+</div>
                  <div className="text-sm text-muted-foreground">API Requests/mo</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">99.99%</div>
                  <div className="text-sm text-muted-foreground">Uptime SLA</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-2 text-sm font-medium">4.9/5 from 500+ reviews</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Choose the plan that fits your needs. Upgrade or downgrade anytime.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <PricingCard
                name="Starter"
                price="$29"
                description="Perfect for small projects"
                features={[
                  "Up to 10,000 page views",
                  "3 team members",
                  "Basic analytics",
                  "Community support",
                  "SSL certificate",
                ]}
              />
              <PricingCard
                name="Professional"
                price="$99"
                description="For growing businesses"
                features={[
                  "Up to 100,000 page views",
                  "Unlimited team members",
                  "Advanced analytics",
                  "Priority support",
                  "Custom domain",
                  "API access",
                ]}
                popular
              />
              <PricingCard
                name="Enterprise"
                price="Custom"
                description="For large organizations"
                features={[
                  "Unlimited page views",
                  "Unlimited everything",
                  "Custom analytics",
                  "Dedicated support",
                  "SLA guarantee",
                  "Custom integrations",
                ]}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary px-4 py-20 text-primary-foreground sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="mt-4 text-lg opacity-90">
              Join thousands of developers building with FlatWP
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="min-w-[200px]"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="min-w-[200px] border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
    </>
  );
}

// Helper Components

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
      <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function PricingCard({
  name,
  price,
  description,
  features,
  popular = false,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-lg border p-8",
        popular && "border-primary shadow-lg"
      )}
    >
      {popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
          Most Popular
        </Badge>
      )}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <div className="text-3xl font-bold mb-2">
          {price}
          {price !== "Custom" && <span className="text-sm font-normal">/mo</span>}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full" variant={popular ? "default" : "outline"}>
        {price === "Custom" ? "Contact Sales" : "Get Started"}
      </Button>
    </div>
  );
}

// Import cn utility
import { cn } from "@/lib/utils";
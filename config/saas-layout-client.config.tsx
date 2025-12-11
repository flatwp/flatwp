"use client";

import { HeaderConfig, FooterConfig } from "@/components/layout/header/types";

// SaaS Header Configuration (Client-side)
export const saasHeaderConfig: HeaderConfig = {
  variant: "standard",
  sticky: true,
  height: "md",
  zones: {
    left: [
      {
        id: "logo",
        type: "logo",
        order: 1,
        config: {
          src: "/flatwp-logo.svg",
          alt: "FlatWP Logo",
          href: "/",
          width: 150,
          height: 80,
        },
      },
    ],
    center: [
      {
        id: "main-nav",
        type: "navigation",
        order: 1,
        config: {
          items: [
            {
              id: "product",
              label: "Product",
              items: [
                {
                  id: "features",
                  label: "Features",
                  href: "/features",
                  icon: "sparkles",
                },
                {
                  id: "integrations",
                  label: "Integrations",
                  href: "/integrations",
                  icon: "zap",
                },
                {
                  id: "security",
                  label: "Security",
                  href: "/security",
                  icon: "shield",
                },
                {
                  id: "analytics",
                  label: "Analytics",
                  href: "/analytics",
                  icon: "bar-chart-3",
                },
              ],
            },
            {
              id: "solutions",
              label: "Solutions",
              items: [
                {
                  id: "startups",
                  label: "For Startups",
                  href: "/solutions/startups",
                  icon: "rocket",
                },
                {
                  id: "enterprise",
                  label: "For Enterprise",
                  href: "/solutions/enterprise",
                  badge: "Popular",
                  icon: "building-2",
                },
                {
                  id: "agencies",
                  label: "For Agencies",
                  href: "/solutions/agencies",
                  icon: "briefcase",
                },
                {
                  id: "developers",
                  label: "For Developers",
                  href: "/solutions/developers",
                  icon: "code-2",
                },
              ],
            },
            {
              id: "pricing",
              label: "Pricing",
              href: "/pricing",
            },
            {
              id: "resources",
              label: "Resources",
              items: [
                {
                  id: "docs",
                  label: "Documentation",
                  href: "/docs",
                  icon: "book-open",
                  external: false,
                },
                {
                  id: "api",
                  label: "API Reference",
                  href: "/api",
                  icon: "code-2",
                },
                {
                  id: "blog",
                  label: "Blog",
                  href: "/blog",
                  icon: "newspaper",
                },
                {
                  id: "community",
                  label: "Community",
                  href: "https://community.flatwp.com",
                  icon: "users",
                  external: true,
                },
                {
                  id: "support",
                  label: "Support Center",
                  href: "/support",
                  icon: "help-circle",
                },
              ],
            },
          ],
          variant: "dropdown",
        },
        responsive: { mobile: false, desktop: true },
      },
    ],
    right: [
      {
        id: "get-started",
        type: "custom",
        order: 1,
        config: {
          component: "GetStartedButton",
        },
        responsive: { mobile: false, desktop: true },
      },
      {
        id: "mobile-menu",
        type: "menu",
        order: 3,
        config: {
          variant: "hamburger",
          position: "right",
          items: [
            {
              id: "product",
              label: "Product",
              items: [
                { id: "features", label: "Features", href: "/features", icon: "sparkles" },
                {
                  id: "integrations",
                  label: "Integrations",
                  href: "/integrations",
                  icon: "zap",
                },
                { id: "security", label: "Security", href: "/security", icon: "shield" },
                { id: "analytics", label: "Analytics", href: "/analytics", icon: "bar-chart-3" },
              ],
            },
            {
              id: "solutions",
              label: "Solutions",
              items: [
                {
                  id: "startups",
                  label: "For Startups",
                  href: "/solutions/startups",
                  icon: "rocket",
                },
                {
                  id: "enterprise",
                  label: "For Enterprise",
                  href: "/solutions/enterprise",
                  icon: "building-2",
                },
                {
                  id: "agencies",
                  label: "For Agencies",
                  href: "/solutions/agencies",
                  icon: "briefcase",
                },
                {
                  id: "developers",
                  label: "For Developers",
                  href: "/solutions/developers",
                  icon: "code-2",
                },
              ],
            },
            { id: "pricing", label: "Pricing", href: "/pricing", icon: "dollar-sign" },
            { id: "docs", label: "Documentation", href: "/docs", icon: "book-open" },
            { id: "blog", label: "Blog", href: "/blog", icon: "newspaper" },
            { id: "support", label: "Support", href: "/support", icon: "help-circle" },
          ],
        },
        responsive: { mobile: true, desktop: false },
      },
    ],
  },
};

// SaaS Footer Configuration (Client-side)
export const saasFooterConfig: FooterConfig = {
  variant: "mega",
  columns: 4,
  zones: {
    column1: [
      {
        id: "brand",
        type: "logo",
        order: 1,
        config: {
          src: "/flatwp-logo.svg",
          alt: "FlatWP Logo",
          width: 150,
          height: 80,
        },
      },
      {
        id: "tagline",
        type: "text",
        order: 2,
        config: {
          content:
            "The modern headless WordPress platform for developers and agencies. Build faster, scale better.",
          variant: "paragraph",
        },
      },
      {
        id: "social",
        type: "social",
        order: 3,
        config: {
          platforms: [
            {
              name: "GitHub",
              url: "https://github.com/flatwp",
              icon: "github",
              label: "Star us on GitHub",
            },
            {
              name: "Twitter",
              url: "https://twitter.com/flatwp",
              icon: "twitter",
              label: "Follow on Twitter",
            },
            {
              name: "LinkedIn",
              url: "https://linkedin.com/company/flatwp",
              icon: "linkedin",
              label: "Connect on LinkedIn",
            },
            {
              name: "YouTube",
              url: "https://youtube.com/@flatwp",
              icon: "youtube",
              label: "Watch on YouTube",
            },
          ],
          variant: "icons",
        },
      },
      {
        id: "badges",
        type: "custom",
        order: 4,
        config: {
          component: "TrustBadges",
        },
      },
    ],
    column2: [
      {
        id: "product-links",
        type: "links",
        order: 1,
        config: {
          title: "Product",
          links: [
            { label: "Features", href: "/features", icon: "sparkles" },
            { label: "Integrations", href: "/integrations", icon: "zap" },
            { label: "Pricing", href: "/pricing", icon: "dollar-sign" },
            { label: "Changelog", href: "/changelog", icon: "git-branch" },
            { label: "Roadmap", href: "/roadmap", icon: "map" },
            { label: "Download", href: "/download", icon: "download" },
          ],
        },
      },
      {
        id: "solutions-links",
        type: "links",
        order: 2,
        config: {
          title: "Solutions",
          links: [
            { label: "For Startups", href: "/solutions/startups", icon: "rocket" },
            { label: "For Enterprise", href: "/solutions/enterprise", icon: "building-2" },
            { label: "For Agencies", href: "/solutions/agencies", icon: "briefcase" },
            { label: "For Developers", href: "/solutions/developers", icon: "code-2" },
          ],
        },
      },
    ],
    column3: [
      {
        id: "resources-links",
        type: "links",
        order: 1,
        config: {
          title: "Resources",
          links: [
            {
              label: "Documentation",
              href: "/docs",
              icon: "book-open",
            },
            {
              label: "API Reference",
              href: "/api",
              icon: "code-2",
            },
            { label: "Guides & Tutorials", href: "/guides", icon: "info" },
            { label: "Blog", href: "/blog", icon: "newspaper" },
            {
              label: "Community Forum",
              href: "https://community.flatwp.com",
              external: true,
              icon: "users",
            },
            {
              label: "Video Tutorials",
              href: "/videos",
              icon: "play-circle",
            },
          ],
        },
      },
      {
        id: "developers-links",
        type: "links",
        order: 2,
        config: {
          title: "Developers",
          links: [
            {
              label: "GitHub",
              href: "https://github.com/flatwp",
              external: true,
              icon: "github",
            },
            {
              label: "NPM Package",
              href: "https://npmjs.com/package/flatwp",
              external: true,
              icon: "download",
            },
            { label: "CLI Tool", href: "/cli", icon: "code-2" },
            { label: "VS Code Extension", href: "/vscode", icon: "code-2" },
          ],
        },
      },
    ],
    column4: [
      {
        id: "company-links",
        type: "links",
        order: 1,
        config: {
          title: "Company",
          links: [
            { label: "About Us", href: "/about", icon: "info" },
            { label: "Careers", href: "/careers", badge: "We're hiring!", icon: "briefcase" },
            { label: "Press Kit", href: "/press", icon: "newspaper" },
            { label: "Partners", href: "/partners", icon: "handshake" },
            { label: "Contact", href: "/contact", icon: "mail" },
          ],
        },
      },
      {
        id: "support-links",
        type: "links",
        order: 2,
        config: {
          title: "Support",
          links: [
            {
              label: "Help Center",
              href: "/support",
              icon: "help-circle",
            },
            {
              label: "Live Chat",
              href: "#",
              icon: "message-square",
            },
            {
              label: "Email Support",
              href: "mailto:support@flatwp.com",
              icon: "mail",
            },
            {
              label: "System Status",
              href: "https://status.flatwp.com",
              external: true,
              icon: "alert-circle",
            },
          ],
        },
      },
    ],
    bottom: [
      {
        id: "newsletter",
        type: "newsletter",
        order: 1,
        config: {
          title: "Stay in the loop",
          description: "Join 10,000+ developers getting our weekly newsletter",
          placeholder: "Enter your email",
          buttonText: "Subscribe",
          action: "/api/newsletter",
        },
      },
      {
        id: "divider",
        type: "custom",
        order: 2,
        config: {
          component: "FooterDivider",
        },
      },
      {
        id: "copyright",
        type: "copyright",
        order: 3,
        config: {
          text: "© 2024 FlatWP, Inc. All rights reserved.",
          showYear: false,
        },
      },
      {
        id: "legal-links",
        type: "links",
        order: 4,
        config: {
          links: [
            { label: "Terms of Service", href: "/terms", icon: "shield" },
            { label: "Privacy Policy", href: "/privacy", icon: "lock" },
            { label: "Cookie Policy", href: "/cookies", icon: "file-check" },
            { label: "GDPR", href: "/gdpr", icon: "scale" },
            { label: "DPA", href: "/dpa", icon: "scale" },
          ],
          variant: "horizontal",
        },
      },
      {
        id: "language-selector",
        type: "custom",
        order: 5,
        config: {
          component: "LanguageSelector",
        },
      },
    ],
  },
};

// Export the complete SaaS layout configuration
export const saasLayoutConfig = {
  header: saasHeaderConfig,
  footer: saasFooterConfig,
};

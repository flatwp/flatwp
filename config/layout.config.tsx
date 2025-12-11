import { HeaderConfig, FooterConfig } from "@/components/layout/header/types";

// Default header configuration
export const defaultHeaderConfig: HeaderConfig = {
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
          showWordmark: true,
          href: "/",
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
            { id: "home", label: "Home", href: "/" },
            { id: "features", label: "Features", href: "/#features", icon: "sparkles" },
            { id: "blog", label: "Blog", href: "/blog", icon: "newspaper" },
            {
              id: "resources",
              label: "Resources",
              icon: "book-open",
              items: [
                { id: "docs", label: "Documentation", href: "https://docs.flatwp.com", external: true, icon: "book-open" },
                { id: "github", label: "GitHub", href: "https://github.com/flatwp", external: true, icon: "github" },
                { id: "support", label: "Support", href: "/support", icon: "help-circle" },
              ],
            },
          ],
          variant: "horizontal",
        },
        responsive: { mobile: false, desktop: true },
      },
    ],
    right: [
      {
        id: "search",
        type: "search",
        order: 1,
        config: {
          variant: "modal",
          placeholder: "Search documentation...",
        },
        responsive: { mobile: false, desktop: true },
      },
      {
        id: "mobile-menu",
        type: "menu",
        order: 2,
        config: {
          variant: "hamburger",
          position: "right",
          items: [
            { id: "home", label: "Home", href: "/" },
            { id: "features", label: "Features", href: "/#features", icon: "sparkles" },
            { id: "blog", label: "Blog", href: "/blog", icon: "newspaper" },
            {
              id: "resources",
              label: "Resources",
              icon: "book-open",
              items: [
                { id: "docs", label: "Documentation", href: "https://docs.flatwp.com", external: true, icon: "book-open" },
                { id: "github", label: "GitHub", href: "https://github.com/flatwp", external: true, icon: "github" },
                { id: "support", label: "Support", href: "/support", icon: "help-circle" },
              ],
            },
          ],
        },
        responsive: { mobile: true, desktop: false },
      },
    ],
  },
};

// Centered header variant
export const centeredHeaderConfig: HeaderConfig = {
  variant: "centered",
  sticky: true,
  transparent: true,
  height: "lg",
  zones: {
    center: [
      {
        id: "logo",
        type: "logo",
        order: 1,
        config: {
          showWordmark: true,
        },
      },
      {
        id: "nav",
        type: "navigation",
        order: 2,
        config: {
          items: [
            { id: "home", label: "Home", href: "/" },
            { id: "about", label: "About", href: "/about" },
            { id: "services", label: "Services", href: "/services" },
            { id: "contact", label: "Contact", href: "/contact" },
          ],
          variant: "horizontal",
          alignment: "center",
        },
      },
      {
        id: "social",
        type: "social",
        order: 3,
        config: {
          platforms: [
            { name: "GitHub", url: "https://github.com", icon: "github" },
            { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
          ],
          variant: "icons",
        },
      },
    ],
  },
};

// Default footer configuration
export const defaultFooterConfig: FooterConfig = {
  variant: "standard",
  columns: 3,
  zones: {
    column1: [
      {
        id: "brand",
        type: "logo",
        order: 1,
        config: {
          showWordmark: false,
        },
      },
      {
        id: "about",
        type: "text",
        order: 2,
        config: {
          content: "Modern headless WordPress starter kit. Build blazing-fast sites with Next.js 14, TypeScript, and WordPress GraphQL.",
        },
      },
      {
        id: "social",
        type: "social",
        order: 3,
        config: {
          platforms: [
            { name: "GitHub", url: "https://github.com/flatwp", icon: "github" },
            { name: "Twitter", url: "https://twitter.com/flatwp", icon: "twitter" },
            { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
          ],
          variant: "icons",
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
            { label: "Features", href: "/#features", icon: "sparkles" },
            { label: "Demo", href: "https://dev.flatwp.com", external: true, icon: "play-circle" },
            { label: "Pricing", href: "/pricing", icon: "dollar-sign" },
            { label: "Changelog", href: "/changelog", icon: "git-commit" },
          ],
        },
      },
    ],
    column3: [
      {
        id: "resource-links",
        type: "links",
        order: 1,
        config: {
          title: "Resources",
          links: [
            { label: "Documentation", href: "https://docs.flatwp.com", external: true, icon: "book-open" },
            { label: "Blog", href: "/blog", icon: "newspaper" },
            { label: "Support", href: "/support", icon: "help-circle" },
            { label: "Community", href: "https://discord.gg/flatwp", external: true, icon: "users" },
          ],
        },
      },
    ],
    bottom: [
      {
        id: "copyright",
        type: "copyright",
        order: 1,
        config: {
          showYear: true,
          companyName: "FlatWP",
        },
      },
      {
        id: "bottom-links",
        type: "links",
        order: 2,
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
    ],
  },
};

// Mega footer variant
export const megaFooterConfig: FooterConfig = {
  variant: "mega",
  columns: 4,
  zones: {
    column1: [
      {
        id: "brand",
        type: "logo",
        order: 1,
        config: {
          showWordmark: true,
        },
      },
      {
        id: "about",
        type: "text",
        order: 2,
        config: {
          content: "Building the future of headless WordPress development with modern tools and best practices.",
        },
      },
      {
        id: "newsletter",
        type: "newsletter",
        order: 3,
        config: {
          title: "Stay Updated",
          description: "Get the latest updates and tutorials.",
          placeholder: "your@email.com",
          buttonText: "Subscribe",
        },
      },
    ],
    column2: [
      {
        id: "product",
        type: "links",
        order: 1,
        config: {
          title: "Product",
          links: [
            { label: "Features", href: "/#features", icon: "sparkles" },
            { label: "Pricing", href: "/pricing", icon: "dollar-sign" },
            { label: "Pro Version", href: "/pro", icon: "star" },
            { label: "Roadmap", href: "/roadmap", icon: "map" },
            { label: "Changelog", href: "/changelog", icon: "git-commit" },
          ],
        },
      },
    ],
    column3: [
      {
        id: "developers",
        type: "links",
        order: 1,
        config: {
          title: "Developers",
          links: [
            { label: "Documentation", href: "https://docs.flatwp.com", external: true, icon: "book-open" },
            { label: "API Reference", href: "/api", icon: "code-2" },
            { label: "GitHub", href: "https://github.com/flatwp", external: true, icon: "github" },
            { label: "Examples", href: "/examples", icon: "sparkles" },
            { label: "Contributing", href: "/contributing", icon: "git-commit" },
          ],
        },
      },
    ],
    column4: [
      {
        id: "company",
        type: "links",
        order: 1,
        config: {
          title: "Company",
          links: [
            { label: "About", href: "/about", icon: "info" },
            { label: "Blog", href: "/blog", icon: "newspaper" },
            { label: "Careers", href: "/careers", icon: "briefcase" },
            { label: "Contact", href: "/contact", icon: "mail" },
            { label: "Partners", href: "/partners", icon: "handshake" },
          ],
        },
      },
    ],
    bottom: [
      {
        id: "copyright",
        type: "copyright",
        order: 1,
        config: {
          text: "© 2024 FlatWP. Built with ❤️ for the WordPress community.",
        },
      },
      {
        id: "social",
        type: "social",
        order: 2,
        config: {
          platforms: [
            { name: "GitHub", url: "https://github.com/flatwp", icon: "github" },
            { name: "Twitter", url: "https://twitter.com/flatwp", icon: "twitter" },
            { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
            { name: "Facebook", url: "https://facebook.com", icon: "facebook" },
          ],
          variant: "icons",
        },
      },
      {
        id: "legal",
        type: "links",
        order: 3,
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
    ],
  },
};

// Minimal footer variant
export const minimalFooterConfig: FooterConfig = {
  variant: "minimal",
  zones: {
    column1: [
      {
        id: "copyright",
        type: "copyright",
        order: 1,
        config: {
          showYear: true,
        },
      },
    ],
    column2: [
      {
        id: "social",
        type: "social",
        order: 1,
        config: {
          platforms: [
            { name: "GitHub", url: "https://github.com/flatwp", icon: "github" },
            { name: "Twitter", url: "https://twitter.com/flatwp", icon: "twitter" },
          ],
          variant: "icons",
        },
      },
    ],
  },
};

// Export the current configuration (can be changed dynamically)
export const layoutConfig = {
  header: defaultHeaderConfig,
  footer: defaultFooterConfig,
};
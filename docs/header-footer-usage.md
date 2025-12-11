# Header & Footer Block System Usage Guide

## Overview
The new header and footer system provides a flexible, block-based architecture that allows you to customize layouts through configuration rather than code changes.

## Quick Start

### Using Default Configuration

```tsx
// app/layout.tsx
import { Header } from "@/components/layout/header-v2";
import { Footer } from "@/components/layout/footer-v2";

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

### Custom Configuration

```tsx
// app/layout.tsx
import { Header } from "@/components/layout/header/Header";
import { Footer } from "@/components/layout/footer/Footer";
import { HeaderConfig, FooterConfig } from "@/components/layout/header/types";

const customHeaderConfig: HeaderConfig = {
  variant: "centered",
  sticky: true,
  transparent: false,
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
          ],
        },
      },
    ],
  },
};

const customFooterConfig: FooterConfig = {
  variant: "minimal",
  zones: {
    column1: [
      {
        id: "copyright",
        type: "copyright",
        order: 1,
        config: {},
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <Header config={customHeaderConfig} />
      <main>{children}</main>
      <Footer config={customFooterConfig} />
    </>
  );
}
```

## Header Examples

### Standard Header with Navigation
```tsx
const standardHeader: HeaderConfig = {
  variant: "standard",
  sticky: true,
  zones: {
    left: [
      {
        id: "logo",
        type: "logo",
        order: 1,
        config: { showWordmark: true },
      },
    ],
    center: [
      {
        id: "nav",
        type: "navigation",
        order: 1,
        config: {
          items: [
            { id: "home", label: "Home", href: "/" },
            { id: "products", label: "Products", href: "/products" },
            { id: "about", label: "About", href: "/about" },
          ],
        },
      },
    ],
    right: [
      {
        id: "search",
        type: "search",
        order: 1,
        config: { variant: "modal" },
      },
    ],
  },
};
```

### Centered Header with Logo Above Navigation
```tsx
const centeredHeader: HeaderConfig = {
  variant: "centered",
  height: "lg",
  zones: {
    center: [
      {
        id: "logo",
        type: "logo",
        order: 1,
        config: { showWordmark: true },
      },
      {
        id: "nav",
        type: "navigation",
        order: 2,
        config: {
          items: [...],
          alignment: "center",
        },
      },
    ],
  },
};
```

### Mobile-First Responsive Header
```tsx
const responsiveHeader: HeaderConfig = {
  variant: "standard",
  zones: {
    left: [
      {
        id: "logo",
        type: "logo",
        order: 1,
        config: { showWordmark: true },
      },
    ],
    center: [
      {
        id: "desktop-nav",
        type: "navigation",
        order: 1,
        config: { items: [...] },
        responsive: {
          mobile: false,
          desktop: true,
        },
      },
    ],
    right: [
      {
        id: "mobile-menu",
        type: "menu",
        order: 1,
        config: {
          variant: "hamburger",
          items: [...],
        },
        responsive: {
          mobile: true,
          desktop: false,
        },
      },
    ],
  },
};
```

## Footer Examples

### Standard Three-Column Footer
```tsx
const standardFooter: FooterConfig = {
  variant: "standard",
  columns: 3,
  zones: {
    column1: [
      {
        id: "brand",
        type: "logo",
        order: 1,
        config: { showWordmark: false },
      },
      {
        id: "description",
        type: "text",
        order: 2,
        config: {
          content: "Your company description here.",
        },
      },
    ],
    column2: [
      {
        id: "links",
        type: "links",
        order: 1,
        config: {
          title: "Quick Links",
          links: [
            { label: "About", href: "/about" },
            { label: "Services", href: "/services" },
          ],
        },
      },
    ],
    column3: [
      {
        id: "newsletter",
        type: "newsletter",
        order: 1,
        config: {
          title: "Subscribe",
          description: "Get our latest updates",
        },
      },
    ],
    bottom: [
      {
        id: "copyright",
        type: "copyright",
        order: 1,
        config: {},
      },
    ],
  },
};
```

### Mega Footer with Four Columns
```tsx
const megaFooter: FooterConfig = {
  variant: "mega",
  zones: {
    column1: [...],
    column2: [...],
    column3: [...],
    column4: [...],
    bottom: [
      {
        id: "copyright",
        type: "copyright",
        order: 1,
        config: {},
      },
      {
        id: "social",
        type: "social",
        order: 2,
        config: {
          platforms: [
            { name: "GitHub", url: "...", icon: <Github /> },
            { name: "Twitter", url: "...", icon: <Twitter /> },
          ],
        },
      },
    ],
  },
};
```

## Block Types Reference

### Header Blocks

#### Logo Block
```tsx
{
  type: "logo",
  config: {
    src?: string,          // Custom logo image
    alt?: string,          // Alt text
    href?: string,         // Link destination
    showWordmark?: boolean,// Show text logo
    text?: string,         // Custom text
  }
}
```

#### Navigation Block
```tsx
{
  type: "navigation",
  config: {
    items: NavItem[],
    variant?: "horizontal" | "dropdown" | "mega",
    alignment?: "left" | "center" | "right",
  }
}
```

#### Menu Block (Mobile)
```tsx
{
  type: "menu",
  config: {
    variant?: "hamburger" | "dots",
    position?: "left" | "right",
    items?: NavItem[],
  }
}
```

#### Search Block
```tsx
{
  type: "search",
  config: {
    placeholder?: string,
    variant?: "inline" | "modal" | "dropdown",
    searchPath?: string,
  }
}
```

### Footer Blocks

#### Links Block
```tsx
{
  type: "links",
  config: {
    title?: string,
    links: LinkItem[],
    variant?: "vertical" | "horizontal" | "grid",
  }
}
```

#### Newsletter Block
```tsx
{
  type: "newsletter",
  config: {
    title?: string,
    description?: string,
    placeholder?: string,
    buttonText?: string,
    action?: string,
  }
}
```

#### Social Block
```tsx
{
  type: "social",
  config: {
    platforms: SocialPlatform[],
    variant?: "icons" | "buttons" | "text",
  }
}
```

## Responsive Configuration

Each block supports responsive visibility:

```tsx
{
  id: "desktop-nav",
  type: "navigation",
  responsive: {
    mobile: false,    // Hidden on mobile
    tablet: true,     // Visible on tablet
    desktop: true,    // Visible on desktop
  }
}
```

## Dynamic Configuration

### From CMS/Database
```tsx
// lib/get-layout-config.ts
export async function getLayoutConfig() {
  const data = await fetchFromCMS();

  return {
    header: transformToHeaderConfig(data.header),
    footer: transformToFooterConfig(data.footer),
  };
}

// app/layout.tsx
import { getLayoutConfig } from "@/lib/get-layout-config";

export default async function RootLayout({ children }) {
  const { header, footer } = await getLayoutConfig();

  return (
    <>
      <Header config={header} />
      <main>{children}</main>
      <Footer config={footer} />
    </>
  );
}
```

### With WordPress ACF
```tsx
// GraphQL query for ACF fields
const GET_LAYOUT_CONFIG = gql`
  query GetLayoutConfig {
    siteSettings {
      header {
        variant
        sticky
        blocks {
          ... on LogoBlock {
            type
            showWordmark
          }
          ... on NavigationBlock {
            type
            items {
              label
              href
            }
          }
        }
      }
    }
  }
`;
```

## Custom Blocks

Create your own block types:

```tsx
// components/layout/header/blocks/CustomBlock.tsx
export function CustomBlockComponent({ block, className }) {
  return (
    <div className={className}>
      {/* Your custom content */}
    </div>
  );
}

// Register in Header.tsx
const blockRegistry = {
  // ... existing blocks
  custom: CustomBlockComponent,
};
```

## Styling & Theming

### Using TailwindCSS Classes
```tsx
{
  id: "nav",
  type: "navigation",
  className: "text-primary hover:text-primary-dark",
  config: {...}
}
```

### Dark Mode Support
The system automatically supports dark mode through Tailwind's dark mode classes. Components use semantic colors like `text-foreground` and `bg-background`.

## Performance Optimization

1. **Static Configuration**: Define configs outside components to prevent re-renders
2. **Memoization**: Large configs can be memoized with `useMemo`
3. **Code Splitting**: Block components are automatically code-split
4. **Lazy Loading**: Heavy blocks can use dynamic imports

## TypeScript Support

Full TypeScript support with type safety:

```tsx
import type { HeaderConfig, FooterConfig } from "@/components/layout/header/types";

const config: HeaderConfig = {
  // TypeScript will validate this configuration
};
```

## Migration from Old System

To migrate from the old header/footer:

1. Keep existing components as `header.tsx` and `footer.tsx`
2. Create new versions as `header-v2.tsx` and `footer-v2.tsx`
3. Gradually migrate by swapping imports
4. Once validated, replace old components

## Troubleshooting

### Block Not Rendering
- Check block type is registered in blockRegistry
- Verify block ID is unique
- Check responsive configuration

### Layout Issues
- Verify variant is supported
- Check zone names match variant
- Validate order values

### TypeScript Errors
- Ensure all required config properties are provided
- Check imported types match component expectations
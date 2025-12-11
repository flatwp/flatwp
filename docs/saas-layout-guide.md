# SaaS Layout Configuration Guide

## Overview
The SaaS layout configuration provides a professional, feature-rich header and footer designed specifically for SaaS applications and products. It includes everything you need for a modern SaaS website:

- Multi-level navigation with dropdowns
- Sign in/Sign up CTAs
- Product feature highlights
- Trust badges and social proof
- Newsletter subscription
- Comprehensive footer with multiple sections
- Language selector for internationalization

## Quick Start

### 1. Using the SaaS Layout

```tsx
// app/layout.tsx
import { SaaSHeader } from "@/components/layout/saas-header";
import { SaaSFooter } from "@/components/layout/saas-footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SaaSHeader />
        <main>{children}</main>
        <SaaSFooter />
      </body>
    </html>
  );
}
```

### 2. View the Demo

Visit `/demo/saas-layout` to see the complete SaaS layout in action with example content.

## Features

### Header Features
- **Logo Block**: Displays your brand logo with optional wordmark
- **Multi-level Navigation**: Dropdown menus with icons and badges
- **Search**: Modal search with keyboard shortcut (⌘+K)
- **Auth CTAs**: Sign In and Get Started buttons
- **Mobile Menu**: Responsive hamburger menu for mobile devices

### Footer Features
- **Company Info**: Logo, tagline, and social links
- **Trust Badges**: Security certifications and ratings
- **Link Columns**: Organized navigation for Product, Resources, Company
- **Newsletter**: Email subscription form
- **Language Selector**: Multi-language support
- **Legal Links**: Privacy, Terms, Cookie policies

## Customization

### Modifying Navigation Items

Edit the navigation items in `config/saas-layout.config.tsx`:

```tsx
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
          icon: <Sparkles className="h-4 w-4" />
        },
        // Add more items...
      ],
    },
  ],
}
```

### Adding Badges to Menu Items

```tsx
{
  id: "enterprise",
  label: "For Enterprise",
  href: "/solutions/enterprise",
  badge: "Popular"  // Adds a badge to the menu item
}
```

### Customizing CTAs

The header includes custom button components for authentication:

```tsx
// In saas-layout.config.tsx
function GetStartedButton() {
  return (
    <Button size="sm" asChild>
      <Link href="/signup">
        Get Started Free
      </Link>
    </Button>
  );
}
```

### Modifying Footer Content

#### Update Company Information
```tsx
column1: [
  {
    id: "tagline",
    type: "text",
    order: 2,
    config: {
      content: "Your custom tagline here",
      variant: "paragraph",
    },
  },
]
```

#### Add Trust Badges
```tsx
function TrustBadges() {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <Badge variant="secondary">
        <Shield className="h-3 w-3 mr-1" />
        SOC 2 Type II
      </Badge>
      <Badge variant="secondary">
        <Shield className="h-3 w-3 mr-1" />
        GDPR Compliant
      </Badge>
    </div>
  );
}
```

#### Configure Newsletter
```tsx
{
  id: "newsletter",
  type: "newsletter",
  config: {
    title: "Stay Updated",
    description: "Get the latest updates and tutorials.",
    placeholder: "your@email.com",
    buttonText: "Subscribe",
    action: "/api/newsletter", // Your newsletter endpoint
  },
}
```

## Responsive Behavior

### Mobile-First Design
The layout automatically adapts to different screen sizes:

- **Desktop**: Full navigation, search, and CTAs visible
- **Tablet**: Simplified navigation, some elements hidden
- **Mobile**: Hamburger menu with all navigation items

### Controlling Visibility

Use the `responsive` configuration to control when blocks appear:

```tsx
{
  id: "desktop-nav",
  type: "navigation",
  responsive: {
    mobile: false,    // Hidden on mobile
    tablet: false,    // Hidden on tablet
    desktop: true,    // Visible on desktop
  }
}
```

## Color Schemes

The SaaS layout uses your application's theme colors. Customize in your `globals.css`:

```css
:root {
  --primary: 220 90% 56%;
  --primary-foreground: 0 0% 100%;
  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;
  /* Add more color variables */
}
```

## Integration with APIs

### Newsletter Subscription

Create an API endpoint to handle newsletter signups:

```tsx
// app/api/newsletter/route.ts
export async function POST(request: Request) {
  const { email } = await request.json();

  // Add email to your mailing list service
  await subscribeToNewsletter(email);

  return Response.json({ success: true });
}
```

### Authentication

Integrate with your auth provider:

```tsx
// components/auth-buttons.tsx
import { signIn } from "next-auth/react";

function SignInButton() {
  return (
    <Button onClick={() => signIn()}>
      Sign In
    </Button>
  );
}
```

## Best Practices

### 1. Keep Navigation Organized
- Group related items under dropdowns
- Use icons to improve scanability
- Add badges to highlight new or popular items

### 2. Optimize for Conversion
- Place primary CTA prominently
- Use contrasting colors for buttons
- Keep sign-up process simple

### 3. Footer Information Architecture
- Most important links in first column
- Group related links together
- Keep legal links in bottom row

### 4. Performance
- Lazy load heavy components
- Use Next.js Image for logos
- Minimize client-side JavaScript

## Common Modifications

### Adding a Notification Bar

```tsx
// Above the header
<NotificationBar>
  🎉 Black Friday Sale - 50% off all plans
</NotificationBar>
<SaaSHeader />
```

### Adding Search Functionality

The search block is pre-configured. Implement the search page:

```tsx
// app/search/page.tsx
export default function SearchPage({ searchParams }) {
  const query = searchParams.q;
  // Implement search logic
}
```

### Multi-language Support

The footer includes a language selector. Implement with next-intl:

```tsx
import { useLocale } from "next-intl";

function LanguageSelector() {
  const locale = useLocale();
  // Handle language change
}
```

## Troubleshooting

### Navigation Not Showing
- Check responsive configuration
- Verify items array is properly formatted
- Check for console errors

### Footer Columns Misaligned
- Ensure column count matches zone configuration
- Check for missing required fields

### Custom Blocks Not Rendering
- Verify component is properly exported
- Check that component is imported in config file
- Ensure block type is "custom"

## Examples

### E-commerce SaaS Header
```tsx
const ecommerceHeader: HeaderConfig = {
  zones: {
    center: [
      {
        type: "navigation",
        config: {
          items: [
            { label: "Products", href: "/products" },
            { label: "Pricing", href: "/pricing" },
            { label: "Enterprise", href: "/enterprise" },
          ],
        },
      },
    ],
    right: [
      {
        type: "custom",
        config: { component: CartButton },
      },
    ],
  },
};
```

### Minimal SaaS Footer
```tsx
const minimalFooter: FooterConfig = {
  variant: "minimal",
  zones: {
    column1: [
      { type: "copyright", config: {} },
      { type: "social", config: { platforms: [...] } },
    ],
  },
};
```

## Next Steps

1. Customize colors and typography in `globals.css`
2. Update navigation items for your product
3. Configure newsletter integration
4. Add your social media links
5. Implement authentication flow
6. Set up analytics tracking
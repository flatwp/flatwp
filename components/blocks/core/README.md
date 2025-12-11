# WordPress Core Blocks

This directory contains optimized implementations of WordPress core blocks for use in Next.js.

## Components

### CoreImage

Optimized image display using Next.js Image component with automatic optimization.

**Features:**
- Automatic WebP/AVIF conversion
- Responsive srcset generation
- Lazy loading by default (unless `priority` is set)
- Blur placeholder for loading states
- Multiple alignment options (left, center, right, wide, full)
- Optional border radius (none, sm, md, lg, full)
- Aspect ratio control (e.g., "16/9", "4/3", "1/1")
- Accessible alt text requirement

**Example:**
```tsx
import { CoreImage } from '@/components/blocks/core';

<CoreImage
  url="https://example.com/image.jpg"
  alt="Description of image"
  width={1200}
  height={800}
  caption="Optional caption below image"
  align="center"
  borderRadius="lg"
  aspectRatio="16/9"
/>
```

### CoreButton

CTA button with Shadcn UI styling and security features.

**Features:**
- All Shadcn button variants (default, secondary, outline, ghost, link, destructive)
- Multiple sizes (sm, default, lg)
- Width control (auto, full)
- Alignment control (left, center, right)
- External link support with automatic security attributes
- Proper rel attributes (noopener noreferrer for external links)

**Example:**
```tsx
import { CoreButton } from '@/components/blocks/core';

<CoreButton
  text="Get Started"
  url="/signup"
  variant="default"
  size="lg"
  align="center"
/>

// External link example
<CoreButton
  text="Visit GitHub"
  url="https://github.com"
  variant="outline"
  opensInNewTab={true}
  // rel="noopener noreferrer" is added automatically
/>
```

### CoreButtons

Container for multiple button blocks with layout control.

**Features:**
- Horizontal/vertical layout
- Alignment control
- Configurable spacing (tight, normal, relaxed)
- Responsive stacking (horizontal on desktop, vertical on mobile)
- Flexbox-based layout

**Example:**
```tsx
import { CoreButtons } from '@/components/blocks/core';

<CoreButtons
  layout="horizontal"
  align="center"
  spacing="normal"
  buttons={[
    {
      blockName: 'core/button',
      text: 'Primary Action',
      url: '/action',
      variant: 'default',
      size: 'lg',
    },
    {
      blockName: 'core/button',
      text: 'Secondary Action',
      url: '/info',
      variant: 'outline',
      size: 'lg',
    },
  ]}
/>
```

## Optimization Techniques

### Image Component
1. **Next.js Image**: Uses `next/image` for automatic optimization
2. **Blur Placeholder**: Generates SVG shimmer effect for loading states
3. **Responsive Srcset**: Automatically generates appropriate image sizes
4. **Lazy Loading**: Deferred loading by default (disabled with `priority` prop)
5. **Modern Formats**: Automatic WebP/AVIF conversion

### Button Component
1. **Security**: Automatic `noopener noreferrer` for external links
2. **Performance**: Uses Next.js Link component for internal navigation
3. **Accessibility**: Proper button semantics and keyboard navigation

### Buttons Container
1. **Responsive**: Stacks vertically on mobile, horizontal on desktop
2. **Flexible Layout**: Supports both horizontal and vertical layouts
3. **Spacing Control**: Configurable gap between buttons

## Accessibility Features

### CoreImage
- **Required alt text**: Alt attribute is required for screen readers
- **Semantic HTML**: Uses `<figure>` and `<figcaption>` elements
- **Caption support**: Optional caption for additional context

### CoreButton
- **Link semantics**: Uses proper `<a>` or Next.js `<Link>` elements
- **Security attributes**: Automatic `rel` attributes for external links
- **Keyboard navigation**: Full keyboard support via Shadcn Button

### CoreButtons
- **Logical grouping**: Buttons are semantically grouped
- **Responsive design**: Mobile-friendly stacking behavior

## Type Safety

All components are fully typed with TypeScript:

```tsx
import type {
  CoreImageBlock,
  CoreButtonBlock,
  CoreButtonsBlock,
} from '@/components/blocks/core';

// Type guards available
import {
  isCoreImageBlock,
  isCoreButtonBlock,
  isCoreButtonsBlock,
} from '@/components/blocks/core';
```

## Server Components

All components are Server Components by default for optimal performance. They can be used in:
- Server Components (default)
- Client Components (when needed)

## Integration with Block Renderer

To integrate with the main block renderer:

```tsx
// In block-renderer.tsx
import { CoreImage, CoreButton, CoreButtons } from '@/components/blocks/core';

// Add to switch statement
switch (block.blockName) {
  case 'core/image':
    return <CoreImage key={key} {...block} />;
  case 'core/button':
    return <CoreButton key={key} {...block} />;
  case 'core/buttons':
    return <CoreButtons key={key} {...block} />;
  // ... other cases
}
```

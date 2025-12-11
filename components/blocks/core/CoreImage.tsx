import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { CoreImageAttributes } from './types';

/**
 * CoreImage Component
 * Optimized image display using Next.js Image component
 *
 * Features:
 * - Automatic image optimization (WebP/AVIF conversion)
 * - Responsive srcset generation
 * - Lazy loading by default (unless priority is set)
 * - Blur placeholder for loading states
 * - Multiple alignment options
 * - Optional border radius
 * - Aspect ratio control
 * - Accessible alt text
 */
export function CoreImage({
  url,
  alt,
  width,
  height,
  caption,
  align = 'center',
  aspectRatio,
  borderRadius = 'none',
  priority = false,
}: Omit<CoreImageAttributes, 'blockName'>) {
  // Handle missing images gracefully
  if (!url) {
    return null;
  }

  // Ensure alt text is present for accessibility
  const imageAlt = alt || 'Image';

  // Calculate dimensions - use provided or default to reasonable sizes
  const imageWidth = width || 1200;
  const imageHeight = height || 800;

  // Alignment classes
  const alignmentClasses = {
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto',
    wide: 'w-full max-w-screen-xl mx-auto',
    full: 'w-full',
  };

  // Border radius classes
  const borderRadiusClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  // Container classes based on alignment
  const containerClasses = cn(
    'relative overflow-hidden',
    alignmentClasses[align],
    borderRadiusClasses[borderRadius],
    // Apply max width for standard alignments
    align !== 'wide' && align !== 'full' && 'max-w-4xl'
  );

  // Image wrapper with optional aspect ratio
  const imageWrapperClasses = cn(
    'relative',
    aspectRatio && 'overflow-hidden'
  );

  // Apply aspect ratio via inline style if specified
  const aspectRatioStyle = aspectRatio
    ? { aspectRatio }
    : undefined;

  return (
    <figure className={cn('my-8', align === 'center' && 'text-center')}>
      <div className={containerClasses}>
        <div className={imageWrapperClasses} style={aspectRatioStyle}>
          <Image
            src={url}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            priority={priority}
            quality={85}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(imageWidth, imageHeight))}`}
            className={cn(
              'w-full h-auto',
              aspectRatio && 'object-cover',
              borderRadiusClasses[borderRadius]
            )}
            sizes={
              align === 'full'
                ? '100vw'
                : align === 'wide'
                ? '(min-width: 1280px) 1280px, 100vw'
                : '(min-width: 1024px) 896px, (min-width: 768px) 90vw, 100vw'
            }
          />
        </div>
      </div>

      {/* Optional caption */}
      {caption && (
        <figcaption className="mt-3 text-sm text-muted-foreground text-center px-4">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Shimmer effect for loading placeholder
 * Creates a subtle animated gradient
 */
function shimmer(w: number, h: number): string {
  return `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f6f7f8" offset="0%" />
          <stop stop-color="#edeef1" offset="20%" />
          <stop stop-color="#f6f7f8" offset="40%" />
          <stop stop-color="#f6f7f8" offset="100%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f6f7f8" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>
  `;
}

/**
 * Convert string to base64
 */
function toBase64(str: string): string {
  return typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);
}

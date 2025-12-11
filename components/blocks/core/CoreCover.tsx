import type { CoreCoverAttributes } from './types';
import { cn } from '@/lib/utils';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

/**
 * CoreCover - Full-width background section
 * Supports background images with optimization, overlay colors, parallax
 * Content positioned using 9-position grid system
 */
export function CoreCover({
  url,
  id: _id,
  alt = '',
  hasParallax = false,
  dimRatio = 50,
  overlayColor,
  customOverlayColor,
  gradient,
  minHeight = 400,
  contentPosition = 'center center',
  innerBlocks = [],
  className,
  anchor,
  backgroundColor,
  textColor,
}: CoreCoverAttributes) {
  // Map content position to Tailwind classes
  const positionMap: Record<string, string> = {
    'top left': 'items-start justify-start',
    'top center': 'items-start justify-center',
    'top right': 'items-start justify-end',
    'center left': 'items-center justify-start',
    'center center': 'items-center justify-center',
    'center right': 'items-center justify-end',
    'bottom left': 'items-end justify-start',
    'bottom center': 'items-end justify-center',
    'bottom right': 'items-end justify-end',
  };

  const positionClasses = positionMap[contentPosition] || positionMap['center center'];

  return (
    <div
      id={anchor}
      className={cn(
        'cover-block relative w-full overflow-hidden',
        className
      )}
      style={{
        minHeight: `${minHeight}px`,
        backgroundColor: backgroundColor || customOverlayColor,
      }}
    >
      {/* Background Image Layer */}
      {url && (
        <div
          className={cn(
            'absolute inset-0',
            hasParallax && 'bg-fixed bg-center bg-cover'
          )}
        >
          {!hasParallax && (
            <OptimizedImage
              src={url}
              alt={alt}
              fill
              className="object-cover"
              priority={false}
              sizes="100vw"
            />
          )}
          {hasParallax && (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${url})`,
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            />
          )}
        </div>
      )}

      {/* Overlay Layer */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundColor: overlayColor || customOverlayColor,
          backgroundImage: gradient,
          opacity: dimRatio / 100,
        }}
      />

      {/* Content Layer */}
      <div
        className={cn(
          'relative z-20 flex w-full h-full px-4 sm:px-6 lg:px-8',
          positionClasses
        )}
        style={{
          minHeight: `${minHeight}px`,
          color: textColor || 'white',
        }}
      >
        <div className="max-w-7xl w-full">
          {/* Render nested blocks - would be handled by main BlockRenderer */}
          <div className="space-y-6">
            {innerBlocks.map((block, index) => (
              <div key={`block-${index}`}>
                {/* Block content would be rendered here by BlockRenderer */}
                {JSON.stringify(block)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

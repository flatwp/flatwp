import type { CoreSeparatorAttributes } from './types';
import { cn } from '@/lib/utils';

/**
 * CoreSeparator - Horizontal divider
 * Provides visual separation between content sections
 * Supports multiple style variants and customizable spacing
 */
export function CoreSeparator({
  style = 'default',
  opacity = 'default',
  className,
  anchor,
  backgroundColor,
}: CoreSeparatorAttributes) {
  // Style variants
  const styleClasses = {
    default: 'w-full h-px',
    wide: 'w-full h-0.5',
    dots: 'flex justify-center space-x-2',
  };

  // Opacity classes
  const opacityClasses = {
    default: 'opacity-20',
    css: 'opacity-100',
  };

  // Dots variant renders three dots
  if (style === 'dots') {
    return (
      <div
        id={anchor}
        className={cn(
          'separator-dots my-8',
          styleClasses.dots,
          className
        )}
        aria-hidden="true"
      >
        <span
          className={cn(
            'w-1 h-1 rounded-full',
            opacityClasses[opacity]
          )}
          style={{ backgroundColor: backgroundColor || 'currentColor' }}
        />
        <span
          className={cn(
            'w-1 h-1 rounded-full',
            opacityClasses[opacity]
          )}
          style={{ backgroundColor: backgroundColor || 'currentColor' }}
        />
        <span
          className={cn(
            'w-1 h-1 rounded-full',
            opacityClasses[opacity]
          )}
          style={{ backgroundColor: backgroundColor || 'currentColor' }}
        />
      </div>
    );
  }

  // Default and wide variants render a horizontal line
  return (
    <hr
      id={anchor}
      className={cn(
        'separator border-0 my-8',
        styleClasses[style],
        opacityClasses[opacity],
        className
      )}
      style={{
        backgroundColor: backgroundColor || 'currentColor',
      }}
      aria-hidden="true"
    />
  );
}

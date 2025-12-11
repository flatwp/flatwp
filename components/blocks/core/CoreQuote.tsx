import { cn } from '@/lib/utils';
import type { CoreQuoteAttributes } from './types';

/**
 * Core Quote Block Component
 * Renders a WordPress core blockquote with optional citation,
 * beautiful styling with border accent, and support for default/large variants
 *
 * @param props - CoreQuoteAttributes properties
 */
export function CoreQuote({
  value,
  citation,
  align = 'left',
  className,
  style = 'default',
}: CoreQuoteAttributes) {
  // Return null if no quote content
  if (!value || value.trim() === '') {
    return null;
  }

  // Text alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  // Style variant classes
  const styleClasses = {
    default: {
      quote: 'text-lg md:text-xl',
      citation: 'text-sm',
    },
    large: {
      quote: 'text-2xl md:text-3xl font-medium',
      citation: 'text-base',
    },
  };

  return (
    <blockquote
      className={cn(
        // Base styles
        'relative',
        // Border accent on left
        'border-l-4 border-primary',
        // Padding and spacing
        'pl-6 pr-4 py-4 my-6',
        // Background
        'bg-gray-50 dark:bg-gray-900',
        // Max width for centered/right aligned quotes
        align !== 'left' && 'max-w-3xl',
        // Alignment
        alignClasses[align],
        // Custom classes
        className
      )}
    >
      {/* Quote content */}
      <p
        className={cn(
          // Font sizing based on style variant
          styleClasses[style].quote,
          // Text color
          'text-gray-900 dark:text-gray-100',
          // Line height and spacing
          'leading-relaxed',
          // Remove default margin
          'mb-0',
          // Add margin if citation exists
          citation && 'mb-3'
        )}
        dangerouslySetInnerHTML={{ __html: value }}
      />

      {/* Citation footer */}
      {citation && (
        <footer
          className={cn(
            // Font sizing based on style variant
            styleClasses[style].citation,
            // Text color - muted
            'text-gray-600 dark:text-gray-400',
            // Font style
            'not-italic',
            // Spacing
            'mt-3'
          )}
        >
          <cite
            className="not-italic before:content-['—_']"
            dangerouslySetInnerHTML={{ __html: citation }}
          />
        </footer>
      )}

      {/* Opening quote mark decoration for large style */}
      {style === 'large' && (
        <span
          className={cn(
            'absolute -top-2 -left-2',
            'text-6xl text-primary/20 dark:text-primary/10',
            'font-serif leading-none',
            'select-none pointer-events-none'
          )}
          aria-hidden="true"
        >
          &quot;
        </span>
      )}
    </blockquote>
  );
}

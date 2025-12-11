import { cn } from '@/lib/utils';
import type { CoreParagraphAttributes } from './types';

/**
 * Core Paragraph Block Component
 * Renders a WordPress core paragraph block with responsive typography,
 * optional drop cap, and alignment support
 *
 * @param props - CoreParagraphAttributes properties
 */
export function CoreParagraph({
  content,
  dropCap = false,
  fontSize = 'medium',
  align = 'left',
  backgroundColor,
  textColor,
  className,
}: CoreParagraphAttributes) {
  // Return null if no content
  if (!content || content.trim() === '') {
    return null;
  }

  // Font size mappings with responsive scaling
  const fontSizeClasses = {
    small: 'text-sm md:text-base',
    normal: 'text-base md:text-base',
    medium: 'text-base md:text-lg',
    large: 'text-lg md:text-xl',
    'x-large': 'text-xl md:text-2xl',
  };

  // Text alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  // Drop cap styles
  const dropCapClass = dropCap
    ? 'first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:mt-1'
    : '';

  return (
    <p
      className={cn(
        // Base styles
        'leading-relaxed',
        // Spacing
        'mb-4 last:mb-0',
        // Font size
        fontSizeClasses[fontSize],
        // Alignment
        alignClasses[align],
        // Drop cap
        dropCapClass,
        // Dark mode text color
        'text-gray-900 dark:text-gray-100',
        // Custom classes
        className
      )}
      style={{
        backgroundColor: backgroundColor || undefined,
        color: textColor || undefined,
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

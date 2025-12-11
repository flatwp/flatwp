import type { CoreColumnsAttributes, CoreColumnAttributes } from './types';
import { cn } from '@/lib/utils';

/**
 * CoreColumns - Responsive grid system
 * Uses CSS Grid with auto-fit/auto-fill for responsive behavior
 * Supports nested blocks within each column
 */
export function CoreColumns({
  columns = 2,
  verticalAlignment = 'top',
  isStackedOnMobile = true,
  innerBlocks = [],
  className,
  anchor,
  backgroundColor,
  textColor,
}: CoreColumnsAttributes) {
  // Map vertical alignment to CSS classes
  const alignmentClasses = {
    top: 'items-start',
    center: 'items-center',
    bottom: 'items-end',
  };

  return (
    <div
      id={anchor}
      className={cn(
        'grid gap-6',
        // Responsive grid - stack on mobile if enabled
        isStackedOnMobile
          ? 'grid-cols-1 md:grid-cols-[repeat(var(--columns),1fr)]'
          : 'grid-cols-[repeat(var(--columns),1fr)]',
        alignmentClasses[verticalAlignment],
        className
      )}
      style={{
        '--columns': columns,
        backgroundColor,
        color: textColor,
      } as React.CSSProperties}
    >
      {innerBlocks.map((column, index) => (
        <CoreColumn key={`column-${index}`} {...column} />
      ))}
    </div>
  );
}

/**
 * CoreColumn - Individual column within CoreColumns
 * Supports custom width and vertical alignment
 */
function CoreColumn({
  width,
  verticalAlignment = 'top',
  innerBlocks = [],
  className,
  anchor,
  backgroundColor,
  textColor,
}: CoreColumnAttributes) {
  const alignmentClasses = {
    top: 'justify-start',
    center: 'justify-center',
    bottom: 'justify-end',
  };

  return (
    <div
      id={anchor}
      className={cn(
        'flex flex-col',
        alignmentClasses[verticalAlignment],
        className
      )}
      style={{
        width: width || 'auto',
        backgroundColor,
        color: textColor,
      }}
    >
      {/* Render nested blocks - would be handled by main BlockRenderer */}
      {innerBlocks.map((block, index) => (
        <div key={`block-${index}`} className="w-full">
          {/* Block content would be rendered here by BlockRenderer */}
          {JSON.stringify(block)}
        </div>
      ))}
    </div>
  );
}

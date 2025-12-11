import type { CoreGroupAttributes } from './types';
import { cn } from '@/lib/utils';

/**
 * CoreGroup - Container wrapper for blocks
 * Provides semantic HTML structure and layout control
 * Supports constrained, full-width, or default layouts
 */
export function CoreGroup({
  layout = 'default',
  tagName = 'div',
  innerBlocks = [],
  className,
  anchor,
  backgroundColor,
  textColor,
}: CoreGroupAttributes) {
  // Dynamic tag component
  const Tag = tagName;

  // Layout classes based on type
  const layoutClasses = {
    default: 'w-full',
    constrained: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    full: 'w-full',
  };

  return (
    <Tag
      id={anchor}
      className={cn(
        'group-block',
        layoutClasses[layout],
        // Add padding for default and full layouts
        layout !== 'constrained' && 'px-4 sm:px-6 lg:px-8',
        className
      )}
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      {/* Render nested blocks - would be handled by main BlockRenderer */}
      <div className="space-y-6">
        {innerBlocks.map((block, index) => (
          <div key={`block-${index}`}>
            {/* Block content would be rendered here by BlockRenderer */}
            {JSON.stringify(block)}
          </div>
        ))}
      </div>
    </Tag>
  );
}

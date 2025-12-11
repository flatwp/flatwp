import { cn } from '@/lib/utils';
import { CoreButton } from './CoreButton';
import type { CoreButtonsAttributes } from './types';

/**
 * CoreButtons Component
 * Container for multiple button blocks with layout control
 *
 * Features:
 * - Horizontal/vertical layout
 * - Alignment control
 * - Configurable spacing between buttons
 * - Responsive stacking (horizontal on desktop, vertical on mobile)
 * - Flexbox-based layout
 */
export function CoreButtons({
  buttons,
  layout = 'horizontal',
  align = 'left',
  spacing = 'normal',
}: Omit<CoreButtonsAttributes, 'blockName'>) {
  // Handle empty buttons array
  if (!buttons || buttons.length === 0) {
    return null;
  }

  // Alignment classes
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  // Spacing classes (gap between buttons)
  const spacingClasses = {
    tight: 'gap-2',
    normal: 'gap-4',
    relaxed: 'gap-6',
  };

  // Layout classes
  const layoutClasses = {
    horizontal: 'flex-row flex-wrap',
    vertical: 'flex-col',
  };

  // Responsive behavior: stack on mobile for horizontal layout
  const responsiveClasses =
    layout === 'horizontal'
      ? 'flex-col sm:flex-row'
      : layoutClasses[layout];

  // Container classes
  const containerClasses = cn(
    'flex',
    responsiveClasses,
    alignmentClasses[align],
    spacingClasses[spacing],
    'my-6'
  );

  return (
    <div className={containerClasses}>
      {buttons.map((button, index) => (
        <div
          key={index}
          className={cn(
            // Make buttons take full width in vertical layout
            layout === 'vertical' && 'w-full',
            // On mobile (flex-col), make buttons full width
            layout === 'horizontal' && 'w-full sm:w-auto'
          )}
        >
          <CoreButton
            {...button}
            // Override button alignment to match container in vertical layout
            align={layout === 'vertical' ? align : button.align}
            // In vertical layout with full width, make buttons full width
            width={layout === 'vertical' ? 'full' : button.width}
          />
        </div>
      ))}
    </div>
  );
}

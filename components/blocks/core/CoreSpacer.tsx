import type { CoreSpacerAttributes } from './types';
import { cn } from '@/lib/utils';

/**
 * CoreSpacer - Vertical spacing control
 * Creates invisible vertical space between blocks
 * Responsive sizing with consistent height units
 */
export function CoreSpacer({
  height,
  className,
  anchor,
}: CoreSpacerAttributes) {
  // Normalize height to string with units
  const normalizedHeight = typeof height === 'number'
    ? `${height}px`
    : height;

  return (
    <div
      id={anchor}
      className={cn(
        'spacer',
        className
      )}
      style={{
        height: normalizedHeight,
        minHeight: normalizedHeight,
      }}
      aria-hidden="true"
    />
  );
}

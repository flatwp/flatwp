import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { CoreButtonAttributes } from './types';

/**
 * CoreButton Component
 * CTA button with Shadcn UI styling and security features
 *
 * Features:
 * - All Shadcn button variants (default, secondary, outline, ghost, link, destructive)
 * - Multiple sizes (sm, default, lg)
 * - Width control (auto, full)
 * - Alignment control
 * - External link support with proper security attributes
 * - Automatic rel attributes for external links
 * - Accessible button semantics
 */
export function CoreButton({
  text,
  url,
  variant = 'default',
  size = 'default',
  width = 'auto',
  align = 'left',
  opensInNewTab = false,
  rel,
}: Omit<CoreButtonAttributes, 'blockName'>) {
  // Handle missing required props
  if (!text || !url) {
    return null;
  }

  // Determine if link is external
  const isExternal = url.startsWith('http://') || url.startsWith('https://');
  const isMailto = url.startsWith('mailto:');
  const isTel = url.startsWith('tel:');

  // Build rel attribute for security
  // External links get noopener noreferrer by default
  let relAttribute = rel;
  if (isExternal && opensInNewTab && !rel) {
    relAttribute = 'noopener noreferrer';
  }

  // Alignment classes for container
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  // Width classes for button
  const widthClasses = {
    auto: '',
    full: 'w-full',
  };

  // Container for alignment
  const containerClasses = cn(
    'flex',
    alignmentClasses[align],
    'my-4'
  );

  // Button classes
  const buttonClasses = cn(widthClasses[width]);

  // For internal links or non-http links, use Link component
  if (!isExternal || isMailto || isTel) {
    return (
      <div className={containerClasses}>
        <Button
          asChild
          variant={variant}
          size={size}
          className={buttonClasses}
        >
          <Link
            href={url}
            target={opensInNewTab ? '_blank' : undefined}
            rel={relAttribute}
          >
            {text}
          </Link>
        </Button>
      </div>
    );
  }

  // For external links, use regular anchor
  return (
    <div className={containerClasses}>
      <Button
        asChild
        variant={variant}
        size={size}
        className={buttonClasses}
      >
        <a
          href={url}
          target={opensInNewTab ? '_blank' : undefined}
          rel={relAttribute}
        >
          {text}
        </a>
      </Button>
    </div>
  );
}

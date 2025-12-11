import React from 'react';
import { cn } from '@/lib/utils';
import type { CoreHeadingAttributes } from './types';

/**
 * Generate a URL-friendly slug from heading content
 * Strips HTML tags and converts to lowercase kebab-case
 *
 * @param content - HTML content string
 * @returns URL-friendly slug
 */
function generateSlug(content: string): string {
  return content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
}

/**
 * Core Heading Block Component
 * Renders a WordPress core heading (H1-H6) with automatic anchor link generation,
 * responsive sizing, and hover state for the anchor link
 *
 * @param props - CoreHeadingAttributes properties
 */
export function CoreHeading({
  content,
  level,
  align = 'left',
  anchor,
  className,
}: CoreHeadingAttributes) {
  // Return null if no content
  if (!content || content.trim() === '') {
    return null;
  }

  // Generate slug from content or use provided anchor
  const slug = anchor || generateSlug(content);

  // Heading level to component mapping
  const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements;

  // Responsive font sizes for each heading level
  const levelSizeClasses = {
    1: 'text-4xl md:text-5xl lg:text-6xl font-bold',
    2: 'text-3xl md:text-4xl lg:text-5xl font-bold',
    3: 'text-2xl md:text-3xl lg:text-4xl font-semibold',
    4: 'text-xl md:text-2xl lg:text-3xl font-semibold',
    5: 'text-lg md:text-xl lg:text-2xl font-medium',
    6: 'text-base md:text-lg lg:text-xl font-medium',
  };

  // Text alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // Spacing for each heading level
  const levelSpacingClasses = {
    1: 'mb-6 mt-8 first:mt-0',
    2: 'mb-5 mt-8 first:mt-0',
    3: 'mb-4 mt-6 first:mt-0',
    4: 'mb-4 mt-6 first:mt-0',
    5: 'mb-3 mt-4 first:mt-0',
    6: 'mb-3 mt-4 first:mt-0',
  };

  return (
    <HeadingTag
      id={slug}
      className={cn(
        // Base styles
        'relative group',
        // Responsive sizing
        levelSizeClasses[level],
        // Spacing
        levelSpacingClasses[level],
        // Alignment
        alignClasses[align],
        // Dark mode
        'text-gray-900 dark:text-gray-100',
        // Scroll margin for fixed headers
        'scroll-mt-20',
        // Custom classes
        className
      )}
    >
      {/* Anchor link icon - visible on hover */}
      <a
        href={`#${slug}`}
        className={cn(
          'absolute -left-6 top-1/2 -translate-y-1/2',
          'opacity-0 group-hover:opacity-100',
          'transition-opacity duration-200',
          'text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400',
          'no-underline',
          'hidden md:inline-block'
        )}
        aria-label={`Link to ${content.replace(/<[^>]*>/g, '')}`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      </a>
      {/* Heading content */}
      <span dangerouslySetInnerHTML={{ __html: content }} />
    </HeadingTag>
  );
}

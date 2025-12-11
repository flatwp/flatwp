'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface LogoProps {
  variant?: 'wordmark' | 'icon';
  className?: string;
  width?: number;
  height?: number;
}

/**
 * FlatWP Logo Component with automatic theme switching
 *
 * Uses light variant (light gray #e2e6ed) for light mode
 * Uses dark variant (dark gray #2e3033) for dark mode
 * Both variants include orange accent (#ffa631)
 */
export function Logo({
  variant = 'wordmark',
  className = '',
  width,
  height
}: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Default dimensions based on variant
  const defaultWidth = variant === 'wordmark' ? 120 : 32;
  const defaultHeight = variant === 'wordmark' ? 32 : 32;

  const logoWidth = width || defaultWidth;
  const logoHeight = height || defaultHeight;

  // During SSR or initial render, show light version
  if (!mounted) {
    return (
      <Image
        src={`/logos/flatwp/${variant}-light.svg`}
        alt="FlatWP"
        width={logoWidth}
        height={logoHeight}
        className={className}
      />
    );
  }

  // Client-side: use theme-appropriate version
  const logoSrc = resolvedTheme === 'dark'
    ? `/logos/flatwp/${variant}-dark.svg`
    : `/logos/flatwp/${variant}-light.svg`;

  return (
    <Image
      src={logoSrc}
      alt="FlatWP"
      width={logoWidth}
      height={logoHeight}
      className={className}
      priority={variant === 'wordmark'}
    />
  );
}

/**
 * FlatWP Wordmark Logo (full logo with text)
 * For headers and prominent branding areas
 */
export function LogoWordmark({ className = '', width, height }: Omit<LogoProps, 'variant'>) {
  return (
    <Logo
      variant="wordmark"
      className={className}
      width={width}
      height={height}
    />
  );
}

/**
 * FlatWP Icon Logo (just the icon)
 * For favicons, small spaces, and secondary branding
 */
export function LogoIcon({ className = '', width, height }: Omit<LogoProps, 'variant'>) {
  return (
    <Logo
      variant="icon"
      className={className}
      width={width}
      height={height}
    />
  );
}

import type { FlatWPConfig } from './schema';

/**
 * Default FlatWP Configuration
 * These values are used when not explicitly configured
 */
export const DEFAULT_CONFIG: Omit<FlatWPConfig, 'wordpress'> = {
    rendering: {
        posts: {
            strategy: 'isr',
            revalidate: false, // On-demand revalidation only
            generateStaticParams: true,
        },
        pages: {
            strategy: 'static',
            revalidate: false,
            generateStaticParams: true,
        },
        archives: {
            strategy: 'isr',
            revalidate: 300, // 5 minutes
            generateStaticParams: true,
        },
        homepage: {
            strategy: 'isr',
            revalidate: 60, // 1 minute
            generateStaticParams: false,
        },
    },
    features: {
        preview: true,
        search: {
            enabled: true,
            provider: 'fuse',
        },
        seo: {
            provider: 'auto',
        },
        analytics: {
            vercel: false,
        },
    },
};

/**
 * Get revalidation value for Next.js
 * Converts config revalidate values to Next.js format
 *
 * @param revalidate - Config revalidate value
 * @returns Next.js revalidate value (number, false, or undefined)
 */
export function getRevalidateValue(
    revalidate: number | boolean | undefined
): number | false | undefined {
    if (revalidate === false) return false; // On-demand only
    if (revalidate === true) return 60; // Default 1 minute
    if (typeof revalidate === 'number') return revalidate;
    return undefined; // Use Next.js default
}

/**
 * Get ISR configuration for a content type
 *
 * @param config - FlatWP configuration
 * @param contentType - Content type (posts, pages, archives, homepage, or custom key)
 * @returns ISR configuration object
 */
export function getISRConfig(
    config: FlatWPConfig,
    contentType: keyof FlatWPConfig['rendering'] | string
) {
    // Check custom content types first
    if (
        contentType !== 'posts' &&
        contentType !== 'pages' &&
        contentType !== 'archives' &&
        contentType !== 'homepage' &&
        config.rendering.custom?.[contentType]
    ) {
        const custom = config.rendering.custom[contentType];
        return {
            revalidate: getRevalidateValue(custom.revalidate),
            generateStaticParams: custom.generateStaticParams,
        };
    }

    // Standard content types
    const standardTypes = ['posts', 'pages', 'archives', 'homepage'] as const;
    if (standardTypes.includes(contentType as typeof standardTypes[number])) {
        const typeConfig =
            config.rendering[contentType as keyof typeof config.rendering];
        if (typeConfig && typeof typeConfig === 'object' && 'revalidate' in typeConfig) {
            return {
                revalidate: getRevalidateValue(typeConfig.revalidate as number | boolean | undefined),
                generateStaticParams: typeConfig.generateStaticParams,
            };
        }
    }

    // Fallback to default
    return {
        revalidate: false,
        generateStaticParams: true,
    };
}

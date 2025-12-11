import { z } from 'zod';

/**
 * Rendering Strategy Schema
 * Defines how content should be rendered and cached
 */
const renderingStrategySchema = z.object({
    /** Rendering strategy: static (SSG), isr (ISR), or ssr (SSR) */
    strategy: z.enum(['static', 'isr', 'ssr']).default('isr'),
    /** Revalidation time in seconds, false for on-demand only, or true for default (60s) */
    revalidate: z
        .union([z.number().positive(), z.boolean()])
        .optional()
        .default(false),
    /** Whether to generate static params at build time */
    generateStaticParams: z.boolean().optional().default(true),
});

/**
 * Search Configuration Schema
 */
const searchConfigSchema = z.object({
    /** Enable search functionality */
    enabled: z.boolean().default(true),
    /** Search provider: 'fuse' (client-side) or 'algolia' (server-side) */
    provider: z.enum(['fuse', 'algolia']).default('fuse'),
    /** Algolia configuration (Pro only) */
    algolia: z
        .object({
            appId: z.string(),
            apiKey: z.string(),
            indexName: z.string(),
        })
        .optional(),
});

/**
 * SEO Configuration Schema
 */
const seoConfigSchema = z.object({
    /** SEO provider: 'auto' (detect), 'yoast', 'rankmath', or 'none' */
    provider: z.enum(['auto', 'yoast', 'rankmath', 'none']).default('auto'),
});

/**
 * Analytics Configuration Schema
 */
const analyticsConfigSchema = z.object({
    /** Enable Vercel Analytics */
    vercel: z.boolean().default(false),
    /** Google Analytics measurement ID */
    google: z.string().optional(),
});

/**
 * Preview Configuration Schema
 */
const previewConfigSchema = z.union([
    z.boolean(),
    z.object({
        /** Enable preview mode */
        enabled: z.boolean().default(true),
        /** Custom preview secret (overrides env) */
        secret: z.string().optional(),
    }),
]);

/**
 * Main FlatWP Configuration Schema
 */
export const flatwpConfigSchema = z.object({
    /**
     * WordPress Connection Configuration
     */
    wordpress: z.object({
        /** WordPress GraphQL API URL */
        graphqlUrl: z.string().url({
            message: 'wordpress.graphqlUrl must be a valid URL (e.g., https://cms.example.com/graphql)',
        }),
        /** WordPress domain for image optimization (auto-detected if not provided) */
        domain: z.string().optional(),
        /** Unified secret token for revalidation webhooks and preview mode */
        secret: z
            .string()
            .min(16, 'wordpress.secret must be at least 16 characters')
            .describe('Secret for WordPress webhook authentication and preview mode'),
    }),

    /**
     * Rendering Strategies per Content Type
     */
    rendering: z.object({
        /** Blog post rendering strategy */
        posts: renderingStrategySchema.default({
            strategy: 'isr',
            revalidate: false, // On-demand only via webhook
            generateStaticParams: true,
        }),
        /** Page rendering strategy */
        pages: renderingStrategySchema.default({
            strategy: 'static',
            revalidate: false,
            generateStaticParams: true,
        }),
        /** Archive pages (blog, category, tag) rendering strategy */
        archives: renderingStrategySchema.default({
            strategy: 'isr',
            revalidate: 300, // 5 minutes
            generateStaticParams: true,
        }),
        /** Homepage rendering strategy */
        homepage: renderingStrategySchema.default({
            strategy: 'isr',
            revalidate: 60, // 1 minute
            generateStaticParams: false,
        }),
        /** Custom content type rendering strategies */
        custom: z.record(z.string(), renderingStrategySchema).optional(),
    }),

    /**
     * Feature Flags and Configuration
     */
    features: z.object({
        /** Preview mode configuration */
        preview: previewConfigSchema.default(true),
        /** Search configuration */
        search: searchConfigSchema.default({
            enabled: true,
            provider: 'fuse',
        }),
        /** SEO configuration */
        seo: seoConfigSchema.default({
            provider: 'auto',
            // TODO: Add support for Yoast and RankMath specific options
        }),
        /** Analytics configuration */
        analytics: analyticsConfigSchema.default({
            vercel: false,
        }),
    }),

    /**
     * Site Metadata Configuration
     */
    site: z
        .object({
            /** Public site URL */
            url: z.string().url().optional(),
            /** Site name for metadata */
            name: z.string().optional(),
            /** Site description for metadata */
            description: z.string().optional(),
        })
        .optional(),
});

/**
 * Inferred TypeScript type from the schema
 */
export type FlatWPConfig = z.infer<typeof flatwpConfigSchema>;

/**
 * Individual schema exports for validation
 */
export type RenderingStrategy = z.infer<typeof renderingStrategySchema>;
export type SearchConfig = z.infer<typeof searchConfigSchema>;
export type SEOConfig = z.infer<typeof seoConfigSchema>;
export type AnalyticsConfig = z.infer<typeof analyticsConfigSchema>;
export type PreviewConfig = z.infer<typeof previewConfigSchema>;

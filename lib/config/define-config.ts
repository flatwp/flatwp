import { ZodError } from 'zod';
import { flatwpConfigSchema, type FlatWPConfig } from './schema';
import { formatValidationError } from './errors';

/**
 * User-provided configuration (before validation and defaults)
 */
export type UserConfig = Partial<FlatWPConfig> &
    Required<Pick<FlatWPConfig, 'wordpress'>>;

/**
 * Define and validate a FlatWP configuration
 *
 * @param config - User configuration object
 * @returns Validated and type-safe configuration
 * @throws {Error} If configuration is invalid
 *
 * @example
 * ```ts
 * import { defineConfig } from '@/lib/config';
 *
 * export default defineConfig({
 *   wordpress: {
 *     graphqlUrl: process.env.NEXT_PUBLIC_WORDPRESS_API_URL!,
 *     secret: process.env.FLATWP_SECRET!,
 *   },
 *   rendering: {
 *     posts: {
 *       strategy: 'isr',
 *       revalidate: false, // On-demand only
 *     },
 *   },
 * });
 * ```
 */
export function defineConfig(config: UserConfig): FlatWPConfig {
    try {
        // Validate and apply defaults
        const validated = flatwpConfigSchema.parse(config);

        // Auto-detect WordPress domain if not provided
        if (!validated.wordpress.domain && validated.wordpress.graphqlUrl) {
            try {
                const url = new URL(validated.wordpress.graphqlUrl);
                validated.wordpress.domain = url.hostname;
            } catch {
                // If URL parsing fails, domain stays undefined
            }
        }

        return validated;
    } catch (error) {
        if (error instanceof ZodError) {
            throw new Error(formatValidationError(error));
        }
        throw error;
    }
}

/**
 * Validate configuration without throwing
 * Useful for testing or conditional validation
 *
 * @param config - User configuration object
 * @returns Validation result with success flag and data/errors
 */
export function validateConfig(config: UserConfig): {
    success: boolean;
    data?: FlatWPConfig;
    errors?: string[];
} {
    try {
        const data = defineConfig(config);
        return { success: true, data };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                errors: error.message.split('\n').filter(Boolean),
            };
        }
        return {
            success: false,
            errors: ['Unknown validation error'],
        };
    }
}

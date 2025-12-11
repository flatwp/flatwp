/**
 * @flatwp/config
 *
 * Type-safe configuration system for FlatWP
 * Provides centralized configuration for WordPress connection,
 * rendering strategies, and feature flags
 */

// Main API
export { defineConfig, validateConfig } from './define-config';
export type { UserConfig } from './define-config';

// Schema and types
export { flatwpConfigSchema } from './schema';
export type {
    FlatWPConfig,
    RenderingStrategy,
    SearchConfig,
    SEOConfig,
    AnalyticsConfig,
    PreviewConfig,
} from './schema';

// Utilities
export { DEFAULT_CONFIG, getRevalidateValue, getISRConfig } from './defaults';
export { ConfigError, validateEnv, formatValidationError } from './errors';

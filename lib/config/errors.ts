import { ZodError, ZodIssue } from 'zod';

/**
 * Format Zod validation errors into human-readable messages
 */
export function formatValidationError(error: ZodError): string {
    const messages: string[] = [
        '❌ FlatWP Configuration Error:',
        '',
        'Your flatwp.config.ts has validation errors:',
        '',
    ];

    // Group errors by path
    const errorsByPath = new Map<string, ZodIssue[]>();
    for (const issue of error.errors) {
        const path = issue.path.join('.');
        if (!errorsByPath.has(path)) {
            errorsByPath.set(path, []);
        }
        errorsByPath.get(path)!.push(issue);
    }

    // Format each error
    for (const [path, issues] of Array.from(errorsByPath)) {
        messages.push(`  ➤ ${path || 'root'}:`);
        for (const issue of issues) {
            messages.push(`    ${formatIssue(issue)}`);
        }
        messages.push('');
    }

    // Add helpful tips
    messages.push('💡 Tips:');
    messages.push('  • Check your environment variables are set correctly');
    messages.push('  • Ensure all required fields have values');
    messages.push('  • Verify URLs are valid and secrets are at least 16 characters');
    messages.push('');
    messages.push('📖 Documentation: https://flatwp.com/docs/configuration');

    return messages.join('\n');
}

/**
 * Format a single Zod issue into a readable message
 */
function formatIssue(issue: ZodIssue): string {
    switch (issue.code) {
        case 'invalid_type':
            return `Expected ${issue.expected}, received ${issue.received}`;
        case 'invalid_string':
            if (issue.validation === 'url') {
                return 'Must be a valid URL (e.g., https://example.com)';
            }
            return `Invalid string: ${issue.message}`;
        case 'too_small':
            if (issue.type === 'string') {
                const received = 'received' in issue ? issue.received : 0;
                return `Must be at least ${issue.minimum} characters (currently ${received})`;
            }
            return `Must be at least ${issue.minimum}`;
        case 'too_big':
            if (issue.type === 'string') {
                return `Must be at most ${issue.maximum} characters`;
            }
            return `Must be at most ${issue.maximum}`;
        case 'invalid_enum_value':
            return `Must be one of: ${issue.options.join(', ')}`;
        case 'invalid_union':
            return 'Invalid value for this field';
        default:
            return issue.message || 'Validation failed';
    }
}

/**
 * Create a configuration error with helpful context
 */
export class ConfigError extends Error {
    constructor(
        message: string,
        public readonly field?: string,
        public readonly hint?: string
    ) {
        super(message);
        this.name = 'ConfigError';
    }
}

/**
 * Validate environment variables are set
 */
export function validateEnv(
    varName: string,
    value: string | undefined
): string {
    if (!value || value.trim() === '') {
        throw new ConfigError(
            `Missing required environment variable: ${varName}`,
            varName,
            `Set ${varName} in your .env.local file`
        );
    }
    return value;
}

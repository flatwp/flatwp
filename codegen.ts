import type { CodegenConfig } from '@graphql-codegen/cli';

/**
 * GraphQL Code Generator Configuration
 *
 * Schema Source Priority:
 * 1. Local schema.graphql file (default - reliable for all environments)
 * 2. Remote NEXT_PUBLIC_WORDPRESS_API_URL (when GRAPHQL_FETCH_REMOTE_SCHEMA=true)
 *
 * To use live WordPress schema for development/updates:
 * GRAPHQL_FETCH_REMOTE_SCHEMA=true NEXT_PUBLIC_WORDPRESS_API_URL=https://cms.flatwp.com/graphql npm run graphql:codegen
 *
 * Benefits of using local schema by default:
 * - Works on Vercel without external API calls
 * - Faster builds (no network requests)
 * - Reliable when remote API is unreachable
 * - Schema is version-controlled for consistency
 */

// Use local schema by default for reliability, only fetch remote schema if explicitly enabled
const useRemoteSchema = process.env.GRAPHQL_FETCH_REMOTE_SCHEMA === 'true';
const schemaSource = useRemoteSchema && process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  ? process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  : './graphql/schema.graphql';

const config: CodegenConfig = {
  overwrite: true,
  schema: schemaSource,
  documents: ['graphql/**/*.graphql', 'graphql/**/*.gql', '!graphql/queries/pages.graphql'],
  generates: {
    'lib/wordpress/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
      config: {
        skipDocumentsValidation: true,
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
  ignoreNoDocuments: true,
};

export default config;

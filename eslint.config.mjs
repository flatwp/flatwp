import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'turbo'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      '.next.*/**',
      '.next-build/**',
      'dist/**',
      'build/**',
      '.turbo/**',
      'coverage/**',
      '**/__generated__/**',
      'graphql.schema.json',
      'next-env.d.ts',
      '*.config.js',
      '*.config.mjs',
    ],
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },
];

export default eslintConfig;

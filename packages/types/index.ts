/**
 * Shared type definitions for FlatWP monorepo
 */

// WordPress GraphQL types will be auto-generated
// This file is for custom shared types across packages

export interface Image {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface SEO {
  title?: string;
  description?: string;
  ogImage?: Image;
  noindex?: boolean;
  nofollow?: boolean;
}

export interface Author {
  name: string;
  slug: string;
  avatar?: Image;
  bio?: string;
}

export interface Category {
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  name: string;
  slug: string;
}

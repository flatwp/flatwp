/**
 * Core Block Registry
 * Maps WordPress block names to React components
 */

import type { ComponentType } from 'react';
import {
  CoreParagraph,
  CoreHeading,
  CoreQuote,
  CoreCode,
  CoreCodeTabs,
  CoreImage,
  CoreButton,
  CoreButtons,
  CoreColumns,
  CoreGroup,
  CoreSeparator,
  CoreSpacer,
  CoreTable,
  CoreCover,
} from '@/components/blocks/core';

import type { CoreBlockAttributes } from '@/components/blocks/core';

/**
 * Block registry mapping block names to components
 */
export const coreBlockRegistry: Record<
  string,
  ComponentType<CoreBlockAttributes>
> = {
  // Content Blocks
  'core/paragraph': CoreParagraph as ComponentType<CoreBlockAttributes>,
  'core/heading': CoreHeading as ComponentType<CoreBlockAttributes>,
  'core/quote': CoreQuote as ComponentType<CoreBlockAttributes>,

  // Code Blocks
  'core/code': CoreCode as ComponentType<CoreBlockAttributes>,
  'core/code-tabs': CoreCodeTabs as ComponentType<CoreBlockAttributes>,

  // Media Blocks
  'core/image': CoreImage as ComponentType<CoreBlockAttributes>,
  'core/button': CoreButton as ComponentType<CoreBlockAttributes>,
  'core/buttons': CoreButtons as ComponentType<CoreBlockAttributes>,

  // Layout Blocks
  'core/columns': CoreColumns as ComponentType<CoreBlockAttributes>,
  'core/group': CoreGroup as ComponentType<CoreBlockAttributes>,
  'core/separator': CoreSeparator as ComponentType<CoreBlockAttributes>,
  'core/spacer': CoreSpacer as ComponentType<CoreBlockAttributes>,
  'core/table': CoreTable as ComponentType<CoreBlockAttributes>,
  'core/cover': CoreCover as ComponentType<CoreBlockAttributes>,
};

/**
 * Get component for a block name
 */
export function getBlockComponent(
  blockName: string
): ComponentType<CoreBlockAttributes> | null {
  return coreBlockRegistry[blockName] || null;
}

/**
 * Check if a block is registered
 */
export function isBlockRegistered(blockName: string): boolean {
  return blockName in coreBlockRegistry;
}

/**
 * Get all registered block names
 */
export function getRegisteredBlockNames(): string[] {
  return Object.keys(coreBlockRegistry);
}

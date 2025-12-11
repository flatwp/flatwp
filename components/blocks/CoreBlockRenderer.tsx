/**
 * Core Block Renderer
 * Dynamically renders WordPress core blocks from GraphQL data
 */

import { getBlockComponent, isBlockRegistered } from '@/lib/blocks/registry';
import type { CoreBlockAttributes } from './core';

interface CoreBlockRendererProps {
  blocks: Array<CoreBlockAttributes & { blockName: string }>;
}

/**
 * Renders an array of WordPress core blocks
 *
 * @param blocks - Array of block data from WPGraphQL Content Blocks
 */
export function CoreBlockRenderer({ blocks }: CoreBlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <>
      {blocks.map((block, index) => {
        const BlockComponent = getBlockComponent(block.blockName);

        if (!BlockComponent) {
          // Log unknown blocks in development
          if (process.env.NODE_ENV === 'development') {
            console.warn(
              `[CoreBlockRenderer] Unknown block type: ${block.blockName}`
            );
          }
          return null;
        }

        // Generate unique key from clientId or fallback to index
        const key =
          'clientId' in block
            ? (block as { clientId?: string }).clientId
            : `${block.blockName}-${index}`;

        return <BlockComponent key={key} {...block} />;
      })}
    </>
  );
}

/**
 * Render a single core block
 *
 * @param block - Single block data
 */
export function renderCoreBlock(
  block: CoreBlockAttributes & { blockName: string }
) {
  const BlockComponent = getBlockComponent(block.blockName);

  if (!BlockComponent) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[renderCoreBlock] Unknown block type: ${block.blockName}`);
    }
    return null;
  }

  return <BlockComponent {...block} />;
}

/**
 * Check if a block type is supported
 */
export function isBlockSupported(blockName: string): boolean {
  return isBlockRegistered(blockName);
}

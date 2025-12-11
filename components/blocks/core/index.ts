/**
 * Core Blocks Index
 * Exports all WordPress core block components with Shadcn/Tailwind styling
 */

// Content Blocks
export { CoreParagraph } from './CoreParagraph';
export { CoreHeading } from './CoreHeading';
export { CoreQuote } from './CoreQuote';

// Code Blocks
export { CoreCode } from './CoreCode';
export { CoreCodeTabs } from './CoreCodeTabs';
export { CopyButton } from './CopyButton';

// Media Blocks
export { CoreImage } from './CoreImage';
export { CoreButton } from './CoreButton';
export { CoreButtons } from './CoreButtons';

// Layout Blocks
export { CoreColumns } from './CoreColumns';
export { CoreGroup } from './CoreGroup';
export { CoreSeparator } from './CoreSeparator';
export { CoreSpacer } from './CoreSpacer';
export { CoreTable } from './CoreTable';
export { CoreCover } from './CoreCover';

// Type Exports
export type {
  BaseBlockAttributes,
  CoreParagraphAttributes,
  CoreHeadingAttributes,
  CoreQuoteAttributes,
  CoreCodeAttributes,
  CoreCodeTabsAttributes,
  CoreImageAttributes,
  CoreButtonAttributes,
  CoreButtonsAttributes,
  CoreColumnsAttributes,
  CoreColumnAttributes,
  CoreTableAttributes,
  CoreGroupAttributes,
  CoreSeparatorAttributes,
  CoreSpacerAttributes,
  CoreCoverAttributes,
  CoreBlockAttributes,
} from './types';

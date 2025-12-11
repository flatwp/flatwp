/**
 * Core WordPress Block Type Definitions
 * TypeScript interfaces for WordPress core blocks
 */

/**
 * Base block attributes shared by all blocks
 */
export interface BaseBlockAttributes {
  anchor?: string;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  gradient?: string;
}

/**
 * Paragraph Block
 */
export interface CoreParagraphAttributes extends BaseBlockAttributes {
  content: string;
  dropCap?: boolean;
  fontSize?: 'small' | 'normal' | 'medium' | 'large' | 'x-large';
  align?: 'left' | 'center' | 'right' | 'justify';
}

/**
 * Heading Block
 */
export interface CoreHeadingAttributes extends BaseBlockAttributes {
  content: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  align?: 'left' | 'center' | 'right';
  anchor?: string;
  fontSize?: string;
}

/**
 * Quote Block
 */
export interface CoreQuoteAttributes extends BaseBlockAttributes {
  value: string;
  citation?: string;
  align?: 'left' | 'center' | 'right';
  style?: 'default' | 'large';
}

/**
 * Code Block Props
 */
export interface CoreCodeProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: string;
  theme?: 'light' | 'dark' | 'auto';
  maxHeight?: number;
  className?: string;
}

/**
 * Code Block Attributes
 */
export interface CoreCodeAttributes extends BaseBlockAttributes {
  content: string;
  language?: string;
  lineNumbers?: boolean;
  showCopyButton?: boolean;
  highlightLines?: string;
  fileName?: string;
}

/**
 * Code Tab
 */
export interface CodeTab {
  label: string;
  code: string;
  language?: string;
  filename?: string;
}

/**
 * Code Tabs Props
 */
export interface CoreCodeTabsProps {
  tabs: CodeTab[];
  showLineNumbers?: boolean;
  defaultTab?: number;
  theme?: 'light' | 'dark' | 'auto';
  maxHeight?: number;
  className?: string;
}

/**
 * Code Tabs Block
 */
export interface CoreCodeTabsAttributes extends BaseBlockAttributes {
  tabs: Array<{
    label: string;
    language: string;
    content: string;
  }>;
  showCopyButton?: boolean;
}

/**
 * Image Block
 */
export interface CoreImageAttributes extends BaseBlockAttributes {
  url: string;
  alt: string;
  caption?: string;
  id?: number;
  width?: number;
  height?: number;
  sizeSlug?: string;
  align?: 'left' | 'center' | 'right' | 'wide' | 'full';
  linkDestination?: string;
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  aspectRatio?: string;
  priority?: boolean;
}

/**
 * Button Block
 */
export interface CoreButtonAttributes extends BaseBlockAttributes {
  text: string;
  url: string;
  linkTarget?: '_blank' | '_self';
  rel?: string;
  opensInNewTab?: boolean;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  width?: 'auto' | 'full';
  align?: 'left' | 'center' | 'right';
}

/**
 * Buttons Block (Container)
 */
export interface CoreButtonsAttributes extends BaseBlockAttributes {
  buttons?: CoreButtonAttributes[];
  align?: 'left' | 'center' | 'right';
  verticalAlignment?: 'top' | 'center' | 'bottom';
  layout?: 'horizontal' | 'vertical';
  spacing?: 'tight' | 'normal' | 'relaxed';
  innerBlocks?: CoreButtonAttributes[];
}

/**
 * Columns Block
 */
export interface CoreColumnsAttributes extends BaseBlockAttributes {
  columns?: number;
  verticalAlignment?: 'top' | 'center' | 'bottom';
  isStackedOnMobile?: boolean;
  innerBlocks?: CoreColumnAttributes[];
}

/**
 * Column Block (Inside Columns)
 */
export interface CoreColumnAttributes extends BaseBlockAttributes {
  width?: string;
  verticalAlignment?: 'top' | 'center' | 'bottom';
  innerBlocks?: BaseBlockAttributes[];
}

/**
 * Table Block
 */
export interface CoreTableAttributes extends BaseBlockAttributes {
  body: Array<{
    cells: Array<{
      content: string;
      tag: 'td' | 'th';
    }>;
  }>;
  head?: Array<{
    cells: Array<{
      content: string;
      tag: 'th';
    }>;
  }>;
  foot?: Array<{
    cells: Array<{
      content: string;
      tag: 'td';
    }>;
  }>;
  hasFixedLayout?: boolean;
  hasHeader?: boolean;
  hasFooter?: boolean;
  stripes?: boolean;
}

/**
 * Group Block
 */
export interface CoreGroupAttributes extends BaseBlockAttributes {
  layout?: 'default' | 'constrained' | 'full';
  tagName?: 'div' | 'section' | 'article' | 'aside' | 'main' | 'header' | 'footer';
  innerBlocks?: BaseBlockAttributes[];
}

/**
 * Separator Block
 */
export interface CoreSeparatorAttributes extends BaseBlockAttributes {
  style?: 'default' | 'wide' | 'dots';
  opacity?: 'default' | 'css';
}

/**
 * Spacer Block
 */
export interface CoreSpacerAttributes extends BaseBlockAttributes {
  height: string | number;
}

/**
 * Cover Block
 */
export interface CoreCoverAttributes extends BaseBlockAttributes {
  url?: string;
  id?: number;
  alt?: string;
  hasParallax?: boolean;
  dimRatio?: number;
  overlayColor?: string;
  customOverlayColor?: string;
  gradient?: string;
  minHeight?: number;
  contentPosition?: 'top left' | 'top center' | 'top right' | 'center left' | 'center center' | 'center right' | 'bottom left' | 'bottom center' | 'bottom right';
  innerBlocks?: BaseBlockAttributes[];
}

/**
 * Union type of all core block attributes
 */
export type CoreBlockAttributes =
  | CoreParagraphAttributes
  | CoreHeadingAttributes
  | CoreQuoteAttributes
  | CoreCodeAttributes
  | CoreCodeTabsAttributes
  | CoreImageAttributes
  | CoreButtonAttributes
  | CoreButtonsAttributes
  | CoreColumnsAttributes
  | CoreColumnAttributes
  | CoreTableAttributes
  | CoreGroupAttributes
  | CoreSeparatorAttributes
  | CoreSpacerAttributes
  | CoreCoverAttributes;

/**
 * Type guard functions
 */
export function isCoreImageBlock(block: unknown): block is CoreImageAttributes {
  return (
    block !== null &&
    typeof block === 'object' &&
    'url' in block
  );
}

export function isCoreButtonBlock(block: unknown): block is CoreButtonAttributes {
  return (
    block !== null &&
    typeof block === 'object' &&
    'text' in block &&
    'url' in block
  );
}

export function isCoreButtonsBlock(block: unknown): block is CoreButtonsAttributes {
  return (
    block !== null &&
    typeof block === 'object' &&
    'align' in block
  );
}

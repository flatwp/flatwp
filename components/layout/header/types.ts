// Core block types
export type BlockType =
  | 'logo'
  | 'navigation'
  | 'menu'
  | 'search'
  | 'social'
  | 'links'
  | 'text'
  | 'newsletter'
  | 'copyright'
  | 'custom';

// Responsive configuration
export interface ResponsiveConfig {
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
  mobileOrder?: number;
  tabletOrder?: number;
  desktopOrder?: number;
}

// Base block configuration
export interface BaseBlock {
  id: string;
  type: BlockType;
  order: number;
  className?: string;
  responsive?: ResponsiveConfig;
}

// Layout zones
export type HeaderZone = 'left' | 'center' | 'right';
export type FooterZone = 'column1' | 'column2' | 'column3' | 'column4' | 'bottom';

// Navigation item
export interface NavItem {
  id: string;
  label: string;
  href?: string;
  items?: NavItem[]; // Nested items for dropdowns
  icon?: React.ReactNode | string;
  badge?: string;
  external?: boolean;
}

// Link item
export interface LinkItem {
  label: string;
  href: string;
  external?: boolean;
  icon?: React.ReactNode | string;
  badge?: string;
}

// Social platform
export interface SocialPlatform {
  name: string;
  url: string;
  icon: React.ReactNode | string;
  label?: string;
}

// Header block types
export interface LogoBlock extends BaseBlock {
  type: 'logo';
  config: {
    src?: string;
    alt?: string;
    href?: string;
    width?: number;
    height?: number;
    text?: string; // Optional text next to logo
    showWordmark?: boolean;
  };
}

export interface NavigationBlock extends BaseBlock {
  type: 'navigation';
  config: {
    items: NavItem[];
    variant?: 'horizontal' | 'dropdown' | 'mega';
    alignment?: 'left' | 'center' | 'right';
  };
}

export interface MenuBlock extends BaseBlock {
  type: 'menu';
  config: {
    variant?: 'hamburger' | 'dots' | 'custom';
    position?: 'left' | 'right';
    items?: NavItem[];
  };
}

export interface SearchBlock extends BaseBlock {
  type: 'search';
  config: {
    placeholder?: string;
    variant?: 'inline' | 'modal' | 'dropdown';
    searchPath?: string;
  };
}

// Footer block types
export interface LinksBlock extends BaseBlock {
  type: 'links';
  config: {
    title?: string;
    links: LinkItem[];
    variant?: 'vertical' | 'horizontal' | 'grid';
  };
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  config: {
    content: string;
    variant?: 'paragraph' | 'heading' | 'caption';
  };
}

export interface NewsletterBlock extends BaseBlock {
  type: 'newsletter';
  config: {
    title?: string;
    description?: string;
    placeholder?: string;
    buttonText?: string;
    action?: string;
  };
}

export interface SocialBlock extends BaseBlock {
  type: 'social';
  config: {
    platforms: SocialPlatform[];
    variant?: 'icons' | 'buttons' | 'text';
  };
}

export interface CopyrightBlock extends BaseBlock {
  type: 'copyright';
  config: {
    text?: string;
    showYear?: boolean;
    companyName?: string;
  };
}

export interface CustomBlock extends BaseBlock {
  type: 'custom';
  config: {
    component: React.ComponentType<any> | string;
    props?: Record<string, any>;
  };
}

// Union types
export type HeaderBlock =
  | LogoBlock
  | NavigationBlock
  | MenuBlock
  | SearchBlock
  | SocialBlock
  | CustomBlock;

export type FooterBlock =
  | LogoBlock
  | LinksBlock
  | TextBlock
  | NewsletterBlock
  | SocialBlock
  | CopyrightBlock
  | CustomBlock;

export type AnyBlock = HeaderBlock | FooterBlock;

// Header configuration
export interface HeaderConfig {
  variant?: 'standard' | 'centered' | 'split' | 'minimal';
  sticky?: boolean;
  transparent?: boolean;
  height?: 'sm' | 'md' | 'lg';
  zones: {
    [K in HeaderZone]?: HeaderBlock[];
  };
}

// Footer configuration
export interface FooterConfig {
  variant?: 'standard' | 'minimal' | 'mega' | 'centered';
  columns?: 1 | 2 | 3 | 4;
  zones: {
    [K in FooterZone]?: FooterBlock[];
  };
}

// Block component props
export interface BlockComponentProps<T extends BaseBlock = BaseBlock> {
  block: T;
  className?: string;
}
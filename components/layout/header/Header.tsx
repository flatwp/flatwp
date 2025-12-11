"use client";

import { cn } from "@/lib/utils";
import {
  HeaderConfig,
  HeaderBlock,
} from "./types";
import {
  LogoBlockComponent,
  NavigationBlockComponent,
  MenuBlockComponent,
  SearchBlockComponent,
} from "./blocks";
import { SocialBlockComponent } from "../footer/blocks/SocialBlock";
import { CustomBlockRenderer } from "../custom-block-renderer";

// Block registry for dynamic component rendering
const blockRegistry: Record<string, React.ComponentType<any>> = {
  logo: LogoBlockComponent,
  navigation: NavigationBlockComponent,
  menu: MenuBlockComponent,
  search: SearchBlockComponent,
  social: SocialBlockComponent,
};

// Helper function to get responsive classes
const getResponsiveClasses = (config?: {
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
}) => {
  if (!config) return "";

  return cn(
    config.mobile === false && "hidden sm:block",
    config.tablet === false && "md:hidden",
    config.desktop === false && "lg:hidden",
    config.mobile === true && "block sm:hidden"
  );
};

// Helper function to render blocks
const renderBlock = (block: HeaderBlock) => {
  // Handle custom blocks
  if (block.type === 'custom' && 'config' in block && 'component' in block.config) {
    const componentName = block.config.component;

    if (typeof componentName !== 'string') {
      console.warn(`Custom component must be a string, got: ${typeof componentName}`);
      return null;
    }

    return (
      <CustomBlockRenderer
        key={block.id}
        componentName={componentName}
        props={block.config.props || {}}
        className={cn(
          block.className,
          getResponsiveClasses(block.responsive)
        )}
      />
    );
  }

  const BlockComponent = blockRegistry[block.type];

  if (!BlockComponent) {
    console.warn(`Unknown block type: ${block.type}`);
    return null;
  }

  return (
    <BlockComponent
      key={block.id}
      block={block}
      className={cn(
        block.className,
        getResponsiveClasses(block.responsive)
      )}
    />
  );
};

// Standard header layout
function StandardHeader({ config }: { config: HeaderConfig }) {
  const leftBlocks = config.zones.left || [];
  const centerBlocks = config.zones.center || [];
  const rightBlocks = config.zones.right || [];

  return (
    <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        {leftBlocks.sort((a, b) => a.order - b.order).map(renderBlock)}
      </div>
      {centerBlocks.length > 0 && (
        <div className="flex items-center gap-6">
          {centerBlocks.sort((a, b) => a.order - b.order).map(renderBlock)}
        </div>
      )}
      <div className="flex items-center gap-4">
        {rightBlocks.sort((a, b) => a.order - b.order).map(renderBlock)}
      </div>
    </div>
  );
}

// Centered header layout
function CenteredHeader({ config }: { config: HeaderConfig }) {
  const leftBlocks = config.zones.left || [];
  const centerBlocks = config.zones.center || [];
  const rightBlocks = config.zones.right || [];

  // Combine all blocks for centered layout
  const allBlocks = [...leftBlocks, ...centerBlocks, ...rightBlocks];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-4">
        {allBlocks
          .filter((block) => block.type === "logo")
          .sort((a, b) => a.order - b.order)
          .map(renderBlock)}
        <div className="flex items-center gap-6">
          {allBlocks
            .filter((block) => block.type !== "logo")
            .sort((a, b) => a.order - b.order)
            .map(renderBlock)}
        </div>
      </div>
    </div>
  );
}

// Split header layout
function SplitHeader({ config }: { config: HeaderConfig }) {
  const leftBlocks = config.zones.left || [];
  const centerBlocks = config.zones.center || [];
  const rightBlocks = config.zones.right || [];

  return (
    <div className="container mx-auto grid grid-cols-3 items-center px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 justify-start">
        {leftBlocks.sort((a, b) => a.order - b.order).map(renderBlock)}
      </div>
      <div className="flex items-center gap-4 justify-center">
        {centerBlocks.sort((a, b) => a.order - b.order).map(renderBlock)}
      </div>
      <div className="flex items-center gap-4 justify-end">
        {rightBlocks.sort((a, b) => a.order - b.order).map(renderBlock)}
      </div>
    </div>
  );
}

// Minimal header layout
function MinimalHeader({ config }: { config: HeaderConfig }) {
  const leftBlocks = config.zones.left || [];
  const rightBlocks = config.zones.right || [];

  return (
    <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        {leftBlocks.sort((a, b) => a.order - b.order).map(renderBlock)}
      </div>
      <div className="flex items-center gap-4">
        {rightBlocks.sort((a, b) => a.order - b.order).map(renderBlock)}
      </div>
    </div>
  );
}

// Layout component mapping
const layoutComponents = {
  standard: StandardHeader,
  centered: CenteredHeader,
  split: SplitHeader,
  minimal: MinimalHeader,
};

// Main Header component
export interface HeaderProps {
  config: HeaderConfig;
  className?: string;
}

export function Header({ config, className }: HeaderProps) {
  const {
    variant = "standard",
    sticky = false,
    transparent = false,
    height = "md",
  } = config;

  const LayoutComponent = layoutComponents[variant];

  if (!LayoutComponent) {
    console.warn(`Unknown header variant: ${variant}`);
    return null;
  }

  const heightClasses = {
    sm: "h-14",
    md: "h-16",
    lg: "h-20",
  };

  return (
    <header
      className={cn(
        "w-full border-b",
        sticky && "sticky top-0 z-50",
        transparent
          ? "border-transparent bg-transparent"
          : "border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        heightClasses[height],
        "flex items-center",
        className
      )}
    >
      <LayoutComponent config={config} />
    </header>
  );
}
"use client";

import { cn } from "@/lib/utils";
import {
  FooterConfig,
  FooterBlock,
} from "../header/types";
import {
  LinksBlockComponent,
  TextBlockComponent,
  NewsletterBlockComponent,
  SocialBlockComponent,
  CopyrightBlockComponent,
  LogoBlockComponent,
} from "./blocks";
import { CustomBlockRenderer } from "../custom-block-renderer";

// Block registry for dynamic component rendering
const blockRegistry: Record<string, React.ComponentType<any>> = {
  logo: LogoBlockComponent,
  links: LinksBlockComponent,
  text: TextBlockComponent,
  newsletter: NewsletterBlockComponent,
  social: SocialBlockComponent,
  copyright: CopyrightBlockComponent,
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
const renderBlock = (block: FooterBlock) => {
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

// Standard footer layout
function StandardFooter({ config }: { config: FooterConfig }) {
  const { columns = 3, zones } = config;
  const bottomBlocks = zones.bottom || [];

  // Separate copyright from other bottom blocks
  const copyrightBlock = bottomBlocks.find(b => b.type === 'copyright');
  const otherBottomBlocks = bottomBlocks.filter(b => b.type !== 'copyright');

  // Collect column blocks
  const columnBlocks = [
    zones.column1 || [],
    zones.column2 || [],
    zones.column3 || [],
    zones.column4 || [],
  ].slice(0, columns);

  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <>
      <div className={cn("grid gap-12", gridCols[columns as keyof typeof gridCols])}>
        {columnBlocks.map((blocks, index) => (
          <div key={`column-${index}`} className="space-y-4">
            {blocks
              .sort((a, b) => a.order - b.order)
              .map(renderBlock)}
          </div>
        ))}
      </div>
      {/* Copyright and legal links section */}
      {(copyrightBlock || otherBottomBlocks.length > 0) && (
        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="space-y-3 text-xs text-muted-foreground">
            {/* Copyright line */}
            {copyrightBlock && (
              <div className="text-center sm:text-left">
                {renderBlock(copyrightBlock)}
              </div>
            )}

            {/* Legal/bottom links line - below copyright, aligned right */}
            {otherBottomBlocks.length > 0 && (
              <div className="text-center sm:text-right">
                {otherBottomBlocks
                  .sort((a, b) => a.order - b.order)
                  .map((block, index) => (
                    <span key={block.id}>
                      {renderBlock(block)}
                    </span>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Minimal footer layout
function MinimalFooter({ config }: { config: FooterConfig }) {
  const { zones } = config;
  const allBlocks = [
    ...(zones.column1 || []),
    ...(zones.column2 || []),
    ...(zones.column3 || []),
    ...(zones.column4 || []),
    ...(zones.bottom || []),
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      {allBlocks
        .sort((a, b) => a.order - b.order)
        .map(renderBlock)}
    </div>
  );
}

// Mega footer layout
function MegaFooter({ config }: { config: FooterConfig }) {
  const { zones } = config;
  const bottomBlocks = zones.bottom || [];

  // Separate copyright from other bottom blocks
  const copyrightBlock = bottomBlocks.find(b => b.type === 'copyright');
  const socialBlock = bottomBlocks.find(b => b.type === 'social');
  const legalLinksBlock = bottomBlocks.find(b => b.type === 'links' && (b.id === 'legal' || b.id === 'legal-links'));
  const otherBottomBlocks = bottomBlocks.filter(b =>
    b.type !== 'copyright' && b.type !== 'social' && b.id !== 'legal' && b.id !== 'legal-links'
  );

  // Check if column1 has newsletter
  const column1Blocks = zones.column1 || [];
  const hasNewsletter = column1Blocks.some(b => b.type === 'newsletter');

  // Always use 4 columns for mega footer, but handle newsletter specially
  const columnBlocks = [
    zones.column1 || [],
    zones.column2 || [],
    zones.column3 || [],
    zones.column4 || [],
  ];

  return (
    <>
      {hasNewsletter ? (
        // Special layout when newsletter is present
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* First column with newsletter - wider on desktop */}
          <div className="lg:col-span-5 space-y-4">
            {columnBlocks[0]
              .sort((a, b) => a.order - b.order)
              .map(renderBlock)}
          </div>
          {/* Other columns - share remaining space */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12">
            {columnBlocks.slice(1).map((blocks, index) => (
              <div key={`column-${index + 1}`} className="space-y-4">
                {blocks
                  .sort((a, b) => a.order - b.order)
                  .map(renderBlock)}
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Standard 4-column layout
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {columnBlocks.map((blocks, index) => (
            <div key={`column-${index}`} className="space-y-4">
              {blocks
                .sort((a, b) => a.order - b.order)
                .map(renderBlock)}
            </div>
          ))}
        </div>
      )}

      {/* Bottom section with better layout */}
      {(socialBlock || otherBottomBlocks.length > 0) && (
        <div className="mt-12 border-t border-border/40 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Social links on the left */}
            {socialBlock && (
              <div className="order-2 lg:order-1">
                {renderBlock(socialBlock)}
              </div>
            )}

            {/* Other bottom blocks */}
            {otherBottomBlocks
              .sort((a, b) => a.order - b.order)
              .map((block) => (
                <div key={block.id} className="order-3">
                  {renderBlock(block)}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Copyright and Legal links section */}
      {(copyrightBlock || legalLinksBlock) && (
        <div className="mt-8 pt-6 border-t border-border/40">
          <div className="space-y-3">
            {/* Copyright line */}
            {copyrightBlock && (
              <div className="text-center sm:text-left">
                {renderBlock(copyrightBlock)}
              </div>
            )}

            {/* Legal links line - below copyright, aligned right */}
            {legalLinksBlock && (
              <div className="text-center sm:text-right">
                {renderBlock(legalLinksBlock)}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Centered footer layout
function CenteredFooter({ config }: { config: FooterConfig }) {
  const { zones } = config;
  const allBlocks = [
    ...(zones.column1 || []),
    ...(zones.column2 || []),
    ...(zones.column3 || []),
    ...(zones.column4 || []),
  ];
  const bottomBlocks = zones.bottom || [];

  return (
    <div className="flex flex-col items-center text-center">
      <div className="space-y-6 max-w-md">
        {allBlocks
          .sort((a, b) => a.order - b.order)
          .map(renderBlock)}
      </div>
      {bottomBlocks.length > 0 && (
        <div className="mt-8 pt-6 border-t border-border/40 w-full">
          <div className="flex flex-col items-center gap-4">
            {bottomBlocks
              .sort((a, b) => a.order - b.order)
              .map(renderBlock)}
          </div>
        </div>
      )}
    </div>
  );
}

// Layout component mapping
const layoutComponents = {
  standard: StandardFooter,
  minimal: MinimalFooter,
  mega: MegaFooter,
  centered: CenteredFooter,
};

// Main Footer component
export interface FooterProps {
  config: FooterConfig;
  className?: string;
}

export function Footer({ config, className }: FooterProps) {
  const { variant = "standard" } = config;

  const LayoutComponent = layoutComponents[variant];

  if (!LayoutComponent) {
    console.warn(`Unknown footer variant: ${variant}`);
    return null;
  }

  return (
    <footer
      className={cn(
        "border-t border-border/40 bg-background",
        className
      )}
    >
      <div className="container mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <LayoutComponent config={config} />
      </div>
    </footer>
  );
}
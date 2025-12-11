'use client';

import { useState } from 'react';
import { codeToHtml } from 'shiki';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CopyButton } from './CopyButton';
import type { CoreCodeTabsProps } from './types';

/**
 * CoreCodeTabs Component
 * Tabbed code blocks with syntax highlighting
 * Note: This is a client component due to interactive tabs
 */
export function CoreCodeTabs({
  tabs,
  showLineNumbers = false,
  defaultTab = 0,
  theme = 'auto',
  maxHeight = 500,
  className,
}: CoreCodeTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab.toString());
  const [highlightedCode, setHighlightedCode] = useState<Record<number, string>>({});

  // Current active tab for copy button
  const currentTab = tabs[parseInt(activeTab)];

  // Highlight code on demand (when tab is clicked)
  const highlightCode = async (index: number) => {
    if (highlightedCode[index]) return; // Already highlighted

    const tab = tabs[index];
    const lightTheme = 'github-light';
    const darkTheme = 'github-dark';

    try {
      const html = await codeToHtml(tab.code, {
        lang: tab.language || 'text',
        themes: {
          light: lightTheme,
          dark: darkTheme,
        },
        defaultColor: theme === 'auto' ? false : theme,
      });

      setHighlightedCode((prev) => ({
        ...prev,
        [index]: html,
      }));
    } catch (error) {
      console.error(`Failed to highlight code for tab ${index}:`, error);
      // Use plain text as fallback
      setHighlightedCode((prev) => ({
        ...prev,
        [index]: `<pre><code>${tab.code}</code></pre>`,
      }));
    }
  };

  // Highlight the default tab on mount
  useState(() => {
    highlightCode(defaultTab);
  });

  return (
    <div
      className={cn(
        'relative rounded-lg border border-border bg-muted/50 overflow-hidden',
        'dark:bg-muted/30',
        className
      )}
    >
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value);
          highlightCode(parseInt(value));
        }}
      >
        {/* Header with tabs and copy button */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/80">
          <TabsList className="h-9">
            {tabs.map((tab, index) => (
              <TabsTrigger
                key={index}
                value={index.toString()}
                className="text-xs"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <CopyButton code={currentTab?.code || ''} className="ml-4" />
        </div>

        {/* Tab contents */}
        {tabs.map((tab, index) => (
          <TabsContent
            key={index}
            value={index.toString()}
            className="m-0 focus-visible:ring-0"
          >
            {tab.filename && (
              <div className="px-4 py-2 text-sm font-mono text-muted-foreground border-b border-border bg-muted/50">
                {tab.filename}
              </div>
            )}

            <div
              className={cn(
                'overflow-auto',
                showLineNumbers && 'line-numbers'
              )}
              style={{ maxHeight: `${maxHeight}px` }}
            >
              {highlightedCode[index] ? (
                <div
                  className="code-block"
                  dangerouslySetInnerHTML={{ __html: highlightedCode[index] }}
                />
              ) : (
                <div className="p-4 text-sm font-mono text-muted-foreground">
                  Loading...
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Custom styles for code block */}
      <style jsx>{`
        .code-block :global(pre) {
          margin: 0;
          padding: 1rem;
          background: transparent !important;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .code-block :global(code) {
          font-family: 'Fira Code', 'JetBrains Mono', 'Consolas', 'Monaco', 'Courier New', monospace;
          font-size: 0.875rem;
        }

        /* Line numbers */
        .line-numbers :global(pre) {
          counter-reset: line;
        }

        .line-numbers :global(.line)::before {
          counter-increment: line;
          content: counter(line);
          display: inline-block;
          width: 2.5rem;
          margin-right: 1rem;
          text-align: right;
          color: hsl(var(--muted-foreground) / 0.5);
          user-select: none;
        }

        /* Scrollbar styling */
        .code-block :global(pre)::-webkit-scrollbar {
          height: 8px;
        }

        .code-block :global(pre)::-webkit-scrollbar-track {
          background: hsl(var(--muted) / 0.3);
          border-radius: 4px;
        }

        .code-block :global(pre)::-webkit-scrollbar-thumb {
          background: hsl(var(--muted-foreground) / 0.3);
          border-radius: 4px;
        }

        .code-block :global(pre)::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--muted-foreground) / 0.5);
        }
      `}</style>
    </div>
  );
}

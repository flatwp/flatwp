'use client';

import React from 'react';
import { codeToHtml } from 'shiki';
import { cn } from '@/lib/utils';
import { CopyButton } from './CopyButton';
import type { CoreCodeProps } from './types';

/**
 * Parse highlight lines string into array of line numbers
 * Examples: "1,3-5,8" -> [1, 3, 4, 5, 8]
 */
function parseHighlightLines(highlightLines?: string): number[] {
  if (!highlightLines) return [];

  const lines: number[] = [];
  const parts = highlightLines.split(',').map((s) => s.trim());

  for (const part of parts) {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number);
      for (let i = start; i <= end; i++) {
        lines.push(i);
      }
    } else {
      lines.push(Number(part));
    }
  }

  return lines;
}

/**
 * CoreCode Component
 * Client component for code block with syntax highlighting via Shiki
 *
 * @param props - CoreCodeProps
 */
export function CoreCode({
  code,
  language = 'text',
  filename,
  showLineNumbers = false,
  highlightLines,
  theme = 'auto',
  maxHeight = 500,
  className,
}: CoreCodeProps) {
  // Parse highlighted lines
  const highlightedLines = parseHighlightLines(highlightLines);

  // State for async highlighting
  const [html, setHtml] = React.useState<string>('');
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Determine themes
  const lightTheme = 'github-light';
  const darkTheme = 'github-dark';

  // Highlight code on mount and when dependencies change
  React.useEffect(() => {
    const highlightCode = async () => {
      try {
        // Generate HTML with Shiki
        const highlighted = await codeToHtml(code, {
          lang: language,
          themes: {
            light: lightTheme,
            dark: darkTheme,
          },
          defaultColor: theme === 'auto' ? false : theme,
        });

        // Apply line highlighting
        let processedHtml = highlighted;
        if (highlightedLines.length > 0) {
          const lines = highlighted.split('\n');
          processedHtml = lines
            .map((line, index) => {
              const lineNumber = index + 1;
              if (highlightedLines.includes(lineNumber)) {
                return line.replace('<span class="line">', '<span class="line highlighted-line">');
              }
              return line;
            })
            .join('\n');
        }

        setHtml(processedHtml);
        setIsLoaded(true);
        setError(null);
      } catch (err) {
        console.error(`Failed to highlight code with language "${language}":`, err);
        setError(`Failed to highlight code`);
        setIsLoaded(true);
      }
    };

    highlightCode();
  }, [code, language, lightTheme, darkTheme, theme, highlightedLines]);

  // Show loading state
  if (!isLoaded) {
    return (
      <div
        className={cn(
          'relative rounded-lg border border-border bg-muted/50 overflow-hidden',
          'dark:bg-muted/30',
          className
        )}
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/80">
          {filename && (
            <div className="text-sm font-mono text-muted-foreground">{filename}</div>
          )}
          <div className={cn(!filename && 'ml-auto')}>
            <div className="text-xs text-muted-foreground">Loading...</div>
          </div>
        </div>
        <div className="p-4 text-sm text-muted-foreground">Highlighting code...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div
        className={cn(
          'relative rounded-lg border border-border bg-muted/50 overflow-hidden',
          className
        )}
      >
        {(filename || true) && (
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/80">
            {filename && (
              <div className="text-sm font-mono text-muted-foreground">{filename}</div>
            )}
            <div className={cn(!filename && 'ml-auto')}>
              <CopyButton code={code} />
            </div>
          </div>
        )}

        <div
          className="overflow-auto"
          style={{ maxHeight: `${maxHeight}px` }}
        >
          <pre className="p-4 m-0 text-sm font-mono">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    );
  }

  // Render highlighted code
  return (
    <div
      className={cn(
        'relative rounded-lg border border-border bg-muted/50 overflow-hidden',
        'dark:bg-muted/30',
        className
      )}
    >
      {/* Header with filename and copy button */}
      {(filename || true) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/80">
          {filename && (
            <div className="text-sm font-mono text-muted-foreground">{filename}</div>
          )}
          <div className={cn(!filename && 'ml-auto')}>
            <CopyButton code={code} />
          </div>
        </div>
      )}

      {/* Code block with syntax highlighting */}
      <div
        className={cn(
          'overflow-auto',
          showLineNumbers && 'line-numbers'
        )}
        style={{ maxHeight: `${maxHeight}px` }}
      >
        <div
          className="code-block"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

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

        /* Highlighted lines */
        :global(.highlighted-line) {
          background-color: hsl(var(--accent) / 0.2);
          display: block;
          margin: 0 -1rem;
          padding: 0 1rem;
          border-left: 3px solid hsl(var(--accent));
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

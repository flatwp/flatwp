import type { CoreTableAttributes } from './types';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

/**
 * CoreTable - Responsive data table
 * Uses Shadcn Table components with horizontal scroll for mobile
 * Supports header, body, footer sections with stripe rows option
 */
export function CoreTable({
  body,
  head,
  foot,
  hasFixedLayout = false,
  hasHeader = true,
  hasFooter = false,
  stripes = false,
  className,
  anchor,
  backgroundColor,
  textColor,
}: CoreTableAttributes) {
  return (
    <div
      id={anchor}
      className={cn(
        'table-wrapper my-6',
        className
      )}
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      {/* Responsive horizontal scroll wrapper */}
      <div className="overflow-x-auto rounded-lg border">
        <Table
          className={cn(
            hasFixedLayout && 'table-fixed',
            stripes && '[&_tbody_tr:nth-child(odd)]:bg-muted/50'
          )}
        >
          {/* Table Header */}
          {hasHeader && head && head.length > 0 && (
            <TableHeader>
              {head.map((row, rowIndex) => (
                <TableRow key={`header-row-${rowIndex}`}>
                  {row.cells.map((cell, cellIndex) => (
                    <TableHead
                      key={`header-cell-${rowIndex}-${cellIndex}`}
                      dangerouslySetInnerHTML={{ __html: cell.content }}
                    />
                  ))}
                </TableRow>
              ))}
            </TableHeader>
          )}

          {/* Table Body */}
          <TableBody>
            {body.map((row, rowIndex) => (
              <TableRow key={`body-row-${rowIndex}`}>
                {row.cells.map((cell, cellIndex) => {
                  // Use TableHead for th cells in body
                  if (cell.tag === 'th') {
                    return (
                      <TableHead
                        key={`body-cell-${rowIndex}-${cellIndex}`}
                        dangerouslySetInnerHTML={{ __html: cell.content }}
                      />
                    );
                  }

                  // Use TableCell for td cells
                  return (
                    <TableCell
                      key={`body-cell-${rowIndex}-${cellIndex}`}
                      dangerouslySetInnerHTML={{ __html: cell.content }}
                    />
                  );
                })}
              </TableRow>
            ))}
          </TableBody>

          {/* Table Footer */}
          {hasFooter && foot && foot.length > 0 && (
            <TableFooter>
              {foot.map((row, rowIndex) => (
                <TableRow key={`footer-row-${rowIndex}`}>
                  {row.cells.map((cell, cellIndex) => (
                    <TableCell
                      key={`footer-cell-${rowIndex}-${cellIndex}`}
                      dangerouslySetInnerHTML={{ __html: cell.content }}
                    />
                  ))}
                </TableRow>
              ))}
            </TableFooter>
          )}
        </Table>
      </div>
    </div>
  );
}

"use client";

import { BlockComponentProps, CopyrightBlock } from "../../header/types";
import { cn } from "@/lib/utils";

export function CopyrightBlockComponent({
  block,
  className,
}: BlockComponentProps<CopyrightBlock>) {
  const { config } = block;
  const {
    text,
    showYear = true,
    companyName = "FlatWP",
  } = config;

  const year = showYear ? new Date().getFullYear() : null;
  const defaultText = `© ${year ? `${year} ` : ""}${companyName}. All rights reserved.`;

  return (
    <p className={cn("text-xs text-muted-foreground whitespace-nowrap", className)}>
      {text || defaultText}
    </p>
  );
}
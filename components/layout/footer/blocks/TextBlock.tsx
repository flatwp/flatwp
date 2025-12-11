"use client";

import { BlockComponentProps, TextBlock } from "../../header/types";
import { cn } from "@/lib/utils";

export function TextBlockComponent({
  block,
  className,
}: BlockComponentProps<TextBlock>) {
  const { config } = block;
  const { content, variant = "paragraph" } = config;

  const variantStyles = {
    paragraph: "text-sm text-muted-foreground",
    heading: "text-base font-semibold",
    caption: "text-xs text-muted-foreground",
  };

  const Element = variant === "heading" ? "h3" : "p";

  return (
    <Element className={cn(variantStyles[variant], className)}>
      {content}
    </Element>
  );
}
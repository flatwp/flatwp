"use client";

import { customBlockRegistry } from "@/components/layout/custom-blocks";
import { FC } from "react";

interface CustomBlockRendererProps {
  componentName: string;
  props?: Record<string, any>;
  className?: string;
}

export function CustomBlockRenderer({
  componentName,
  props,
  className,
}: CustomBlockRendererProps) {
  const Component = customBlockRegistry[componentName as keyof typeof customBlockRegistry] as FC<any>;

  if (!Component) {
    console.warn(`Custom component not found: ${componentName}`);
    return null;
  }

  return <Component {...props} className={className} />;
}

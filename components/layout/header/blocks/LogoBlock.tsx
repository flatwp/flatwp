"use client";

import Link from "next/link";
import Image from "next/image";
import { LogoIcon, LogoWordmark } from "@/components/ui/Logo";
import { BlockComponentProps, LogoBlock } from "../types";
import { cn } from "@/lib/utils";

export function LogoBlockComponent({
  block,
  className,
}: BlockComponentProps<LogoBlock>) {
  const { config } = block;
  const {
    src,
    alt = "Logo",
    href = "/",
    width = 120,
    height = 32,
    text,
    showWordmark = true,
  } = config;

  const logoContent = (
    <>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-8 w-auto"
          priority
        />
      ) : showWordmark ? (
        <LogoWordmark width={width} height={height} className="h-8 w-auto" />
      ) : (
        <LogoIcon width={32} height={32} className="h-8 w-8" />
      )}
      {text && (
        <span className="ml-2 text-lg font-semibold">{text}</span>
      )}
    </>
  );

  return href ? (
    <Link
      href={href}
      className={cn("flex items-center space-x-2", className)}
    >
      {logoContent}
    </Link>
  ) : (
    <div className={cn("flex items-center space-x-2", className)}>
      {logoContent}
    </div>
  );
}
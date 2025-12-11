"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Facebook, Youtube, Instagram, ExternalLink } from "lucide-react";
import { BlockComponentProps, SocialBlock } from "../../header/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Icon map for rendering social icons from string names
const iconMap: Record<string, React.ReactNode> = {
  github: <Github className="h-5 w-5" />,
  twitter: <Twitter className="h-5 w-5" />,
  linkedin: <Linkedin className="h-5 w-5" />,
  facebook: <Facebook className="h-5 w-5" />,
  youtube: <Youtube className="h-5 w-5" />,
  instagram: <Instagram className="h-5 w-5" />,
};

const getIcon = (iconName: string | React.ReactNode): React.ReactNode => {
  if (typeof iconName === "string") {
    return iconMap[iconName.toLowerCase()] || <ExternalLink className="h-5 w-5" />;
  }
  return iconName;
};

export function SocialBlockComponent({
  block,
  className,
}: BlockComponentProps<SocialBlock>) {
  const { config } = block;
  const { platforms, variant = "icons" } = config;

  if (variant === "buttons") {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {platforms.map((platform, index) => (
          <Button
            key={index}
            asChild
            variant="default"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Link
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={platform.label || platform.name}
            >
              {getIcon(platform.icon)}
              <span className="ml-2">{platform.label || platform.name}</span>
            </Link>
          </Button>
        ))}
      </div>
    );
  }

  if (variant === "text") {
    return (
      <div className={cn("flex flex-wrap gap-4", className)}>
        {platforms.map((platform, index) => (
          <Link
            key={index}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            aria-label={platform.label || platform.name}
          >
            {platform.label || platform.name}
          </Link>
        ))}
      </div>
    );
  }

  // Icons variant (default)
  return (
    <div className={cn("flex gap-4", className)}>
      {platforms.map((platform, index) => (
        <Link
          key={index}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label={platform.label || platform.name}
        >
          {getIcon(platform.icon)}
        </Link>
      ))}
    </div>
  );
}
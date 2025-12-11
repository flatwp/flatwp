"use client";

import { useState } from "react";
import { Share2, Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ShareButtonsProps {
  url: string;
  title: string;
  variant?: "horizontal" | "vertical";
}

export function ShareButtons({ url, title, variant = "horizontal" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: "hover:text-blue-400",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "hover:text-blue-600",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: "hover:text-blue-700",
    },
  ];

  if (variant === "vertical") {
    return (
      <div className="space-y-2">
        {shareLinks.map((share) => {
          const Icon = share.icon;
          return (
            <Button
              key={share.name}
              variant="default"
              className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
              asChild
            >
              <a
                href={share.url}
                target="_blank"
                rel="noopener noreferrer"
                className={share.color}
              >
                <Icon className="w-4 h-4 mr-2" />
                Share on {share.name}
              </a>
            </Button>
          );
        })}
        <Button
          variant="default"
          className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleCopyLink}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4 mr-2" />
              Copy Link
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {shareLinks.map((share) => {
          const Icon = share.icon;
          return (
            <DropdownMenuItem key={share.name} asChild>
              <a
                href={share.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 cursor-pointer"
              >
                <Icon className="w-4 h-4" />
                {share.name}
              </a>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4 mr-2" />
              Copy Link
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
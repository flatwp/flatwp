"use client";

import { useState } from "react";
import { Menu, X, MoreVertical } from "lucide-react";
import { BlockComponentProps, MenuBlock, NavItem } from "../types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

export function MenuBlockComponent({
  block,
  className,
}: BlockComponentProps<MenuBlock>) {
  const { config } = block;
  const { variant = "hamburger", position = "right", items = [] } = config;
  const [isOpen, setIsOpen] = useState(false);

  const menuIcon = {
    hamburger: <Menu className="h-5 w-5" />,
    dots: <MoreVertical className="h-5 w-5" />,
    custom: <Menu className="h-5 w-5" />,
  };

  const renderNavItems = (items: NavItem[], level = 0) => {
    return items.map((item) => (
      <div key={item.id} className={cn(level > 0 && "ml-4")}>
        {item.href ? (
          <Link
            href={item.href}
            onClick={() => setIsOpen(false)}
            className={cn(
              "block py-2 text-sm transition-colors hover:text-foreground",
              level === 0 ? "font-medium" : "text-muted-foreground"
            )}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
          >
            <span className="flex items-center gap-2">
              {item.icon && <span>{item.icon}</span>}
              {item.label}
              {item.badge && (
                <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs">
                  {item.badge}
                </span>
              )}
            </span>
          </Link>
        ) : (
          <div
            className={cn(
              "py-2 text-sm",
              level === 0 ? "font-medium" : "text-muted-foreground"
            )}
          >
            <span className="flex items-center gap-2">
              {item.icon && <span>{item.icon}</span>}
              {item.label}
              {item.badge && (
                <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs">
                  {item.badge}
                </span>
              )}
            </span>
          </div>
        )}
        {item.items && item.items.length > 0 && (
          <div className="mt-2 space-y-1">
            {renderNavItems(item.items, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("md:hidden", className)}
          aria-label="Menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : menuIcon[variant]}
        </Button>
      </SheetTrigger>
      <SheetContent side={position} className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Navigation menu
          </SheetDescription>
        </SheetHeader>
        <nav className="mt-6 space-y-4">{renderNavItems(items)}</nav>
      </SheetContent>
    </Sheet>
  );
}
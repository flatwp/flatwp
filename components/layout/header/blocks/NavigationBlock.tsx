"use client";

import Link from "next/link";
import { BookOpen, Code2, Github, FileText, ExternalLink, Sparkles, Newspaper, HelpCircle, Zap, Shield, BarChart3, Rocket, Building2, Briefcase, DollarSign, Users } from "lucide-react";
import { BlockComponentProps, NavigationBlock } from "../types";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// Icon map for rendering navigation icons from string names
const iconMap: Record<string, React.ReactNode> = {
  "book-open": <BookOpen className="h-4 w-4" />,
  "code-2": <Code2 className="h-4 w-4" />,
  github: <Github className="h-4 w-4" />,
  file: <FileText className="h-4 w-4" />,
  "file-text": <FileText className="h-4 w-4" />,
  sparkles: <Sparkles className="h-4 w-4" />,
  newspaper: <Newspaper className="h-4 w-4" />,
  "help-circle": <HelpCircle className="h-4 w-4" />,
  zap: <Zap className="h-4 w-4" />,
  shield: <Shield className="h-4 w-4" />,
  "bar-chart-3": <BarChart3 className="h-4 w-4" />,
  rocket: <Rocket className="h-4 w-4" />,
  "building-2": <Building2 className="h-4 w-4" />,
  briefcase: <Briefcase className="h-4 w-4" />,
  "dollar-sign": <DollarSign className="h-4 w-4" />,
  users: <Users className="h-4 w-4" />,
};

const getIcon = (iconName: string | React.ReactNode): React.ReactNode => {
  if (typeof iconName === "string") {
    return iconMap[iconName.toLowerCase()] || <ExternalLink className="h-4 w-4" />;
  }
  return iconName;
};

export function NavigationBlockComponent({
  block,
  className,
}: BlockComponentProps<NavigationBlock>) {
  const { config } = block;
  const { items, variant = "horizontal", alignment = "left" } = config;

  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  if (variant === "dropdown" || variant === "mega") {
    return (
      <NavigationMenu className={cn(alignmentClasses[alignment], className)}>
        <NavigationMenuList>
          {items.map((item) => (
            <NavigationMenuItem key={item.id}>
              {item.items && item.items.length > 0 ? (
                <>
                  <NavigationMenuTrigger className="flex items-center gap-1">
                    {item.icon && getIcon(item.icon)}
                    {item.label}
                    {item.badge && (
                      <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs">
                        {item.badge}
                      </span>
                    )}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul
                      className={cn(
                        "grid gap-3 p-4",
                        variant === "mega"
                          ? "w-[500px] md:w-[600px] md:grid-cols-2"
                          : "w-[400px]"
                      )}
                    >
                      {item.items.map((subItem) => (
                        <li key={subItem.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={subItem.href || "#"}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                                "hover:bg-accent hover:text-accent-foreground",
                                "focus:bg-accent focus:text-accent-foreground"
                              )}
                              target={subItem.external ? "_blank" : undefined}
                              rel={subItem.external ? "noopener noreferrer" : undefined}
                            >
                              <div className="flex items-center gap-2">
                                {subItem.icon && getIcon(subItem.icon)}
                                <div className="text-sm font-medium leading-none">
                                  {subItem.label}
                                </div>
                                {subItem.badge && (
                                  <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs">
                                    {subItem.badge}
                                  </span>
                                )}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink asChild>
                  <a
                    href={item.href || "#"}
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2",
                      "text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      "focus:bg-accent focus:text-accent-foreground focus:outline-none",
                      "disabled:pointer-events-none disabled:opacity-50"
                    )}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                  >
                    {item.icon && (
                      <span className="mr-2">
                        {getIcon(item.icon)}
                      </span>
                    )}
                    {item.label}
                    {item.badge && (
                      <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  // Horizontal variant (simple)
  return (
    <nav
      className={cn(
        "flex items-center gap-6",
        alignmentClasses[alignment],
        className
      )}
    >
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href || "#"}
          className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
        >
          {item.icon && getIcon(item.icon)}
          {item.label}
          {item.badge && (
            <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs">
              {item.badge}
            </span>
          )}
        </Link>
      ))}
    </nav>
  );
}
"use client";

import Link from "next/link";
import { ExternalLink, BookOpen, Code2, Github, FileText, Sparkles, PlayCircle, DollarSign, GitCommit, Newspaper, HelpCircle, Users, Lock, Shield, Info, Briefcase, Mail, Handshake, Star, Map, FileCheck, Scale, Zap, BarChart3, Rocket, Building2, MessageSquare, Download, GitBranch, AlertCircle } from "lucide-react";
import { BlockComponentProps, LinksBlock } from "../../header/types";
import { cn } from "@/lib/utils";

// Icon map for rendering link icons from string names
const iconMap: Record<string, React.ReactNode> = {
  "book-open": <BookOpen className="h-4 w-4" />,
  "code-2": <Code2 className="h-4 w-4" />,
  github: <Github className="h-4 w-4" />,
  file: <FileText className="h-4 w-4" />,
  sparkles: <Sparkles className="h-4 w-4" />,
  "play-circle": <PlayCircle className="h-4 w-4" />,
  "dollar-sign": <DollarSign className="h-4 w-4" />,
  "git-commit": <GitCommit className="h-4 w-4" />,
  newspaper: <Newspaper className="h-4 w-4" />,
  "help-circle": <HelpCircle className="h-4 w-4" />,
  users: <Users className="h-4 w-4" />,
  lock: <Lock className="h-4 w-4" />,
  shield: <Shield className="h-4 w-4" />,
  info: <Info className="h-4 w-4" />,
  briefcase: <Briefcase className="h-4 w-4" />,
  mail: <Mail className="h-4 w-4" />,
  handshake: <Handshake className="h-4 w-4" />,
  star: <Star className="h-4 w-4" />,
  map: <Map className="h-4 w-4" />,
  "file-check": <FileCheck className="h-4 w-4" />,
  scale: <Scale className="h-4 w-4" />,
  zap: <Zap className="h-4 w-4" />,
  "bar-chart-3": <BarChart3 className="h-4 w-4" />,
  rocket: <Rocket className="h-4 w-4" />,
  "building-2": <Building2 className="h-4 w-4" />,
  "message-square": <MessageSquare className="h-4 w-4" />,
  download: <Download className="h-4 w-4" />,
  "git-branch": <GitBranch className="h-4 w-4" />,
  "alert-circle": <AlertCircle className="h-4 w-4" />,
};

const getIcon = (iconName: string | React.ReactNode): React.ReactNode => {
  if (typeof iconName === "string") {
    return iconMap[iconName.toLowerCase()] || <ExternalLink className="h-4 w-4" />;
  }
  return iconName;
};

export function LinksBlockComponent({
  block,
  className,
}: BlockComponentProps<LinksBlock>) {
  const { config } = block;
  const { title, links, variant = "vertical" } = config;

  const linkStyles = {
    vertical: "flex flex-col space-y-2",
    horizontal: "flex flex-wrap gap-x-6 gap-y-2",
    grid: "grid grid-cols-2 gap-2",
  };

  const isTiny = variant === "horizontal" && !title;

  return (
    <div className={cn(isTiny ? "" : "space-y-3", className)}>
      {title && (
        <h3 className="text-sm font-semibold">{title}</h3>
      )}
      <ul className={cn(
        isTiny ? "flex items-center gap-6 flex-nowrap whitespace-nowrap" : linkStyles[variant]
      )}>
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className={cn(
                "flex items-center gap-1 transition-colors hover:text-foreground",
                isTiny ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"
              )}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
            >
              {link.icon && getIcon(link.icon)}
              {link.label}
              {link.external && !link.icon && <ExternalLink className="h-3 w-3 ml-1" />}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
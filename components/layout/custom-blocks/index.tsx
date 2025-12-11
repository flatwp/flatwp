import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, Star, Github, BookOpen } from "lucide-react";

// Custom block components for SaaS layout

export function SignInButton() {
  return (
    <Button variant="ghost" size="sm" asChild className="text-gray-700 hover:text-gray-900">
      <Link href="/signin">Sign In</Link>
    </Button>
  );
}

export function GetStartedButton() {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
        title="View Documentation"
      >
        <Link href="https://docs.flatwp.com" target="_blank" rel="noopener noreferrer">
          <BookOpen className="h-4 w-4" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
        title="FlatWP on GitHub"
      >
        <Link href="https://github.com/flatwp" target="_blank" rel="noopener noreferrer">
          <Github className="h-4 w-4" />
        </Link>
      </Button>
      <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700 text-white">
        <Link href="/signup">
          Get Started
        </Link>
      </Button>
    </div>
  );
}

export function TrustBadges() {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <Badge variant="secondary" className="text-xs">
        <Shield className="h-3 w-3 mr-1" />
        SOC 2 Type II
      </Badge>
      <Badge variant="secondary" className="text-xs">
        <Shield className="h-3 w-3 mr-1" />
        GDPR Compliant
      </Badge>
      <Badge variant="secondary" className="text-xs">
        <Star className="h-3 w-3 mr-1" />
        4.9/5 Rating
      </Badge>
    </div>
  );
}

export function FooterDivider() {
  return <div className="w-full border-t border-border/40 my-6" />;
}

export function LanguageSelector() {
  return (
    <Select defaultValue="en">
      <SelectTrigger className="w-[140px] h-8 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">🇺🇸 English</SelectItem>
        <SelectItem value="es">🇪🇸 Español</SelectItem>
        <SelectItem value="fr">🇫🇷 Français</SelectItem>
        <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
        <SelectItem value="ja">🇯🇵 日本語</SelectItem>
      </SelectContent>
    </Select>
  );
}

// Registry mapping component names to actual components
export const customBlockRegistry: Record<string, React.ComponentType<any>> = {
  SignInButton,
  GetStartedButton,
  TrustBadges,
  FooterDivider,
  LanguageSelector,
};
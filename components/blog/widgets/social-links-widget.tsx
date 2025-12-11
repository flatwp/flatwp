import { Share2, Twitter, Github, Linkedin, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export async function SocialLinksWidget() {
  // This could be fetched from GraphQL or site configuration
  const socialLinks = [
    { name: "Twitter", icon: Twitter, url: "https://twitter.com/yourhandle", color: "hover:text-blue-400" },
    { name: "GitHub", icon: Github, url: "https://github.com/yourhandle", color: "hover:text-gray-600" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/in/yourhandle", color: "hover:text-blue-600" },
    { name: "Facebook", icon: Facebook, url: "https://facebook.com/yourpage", color: "hover:text-blue-500" },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com/yourhandle", color: "hover:text-pink-500" },
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Share2 className="w-5 h-5 text-primary" />
        Follow Us
      </h3>

      <div className="flex justify-center gap-3">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center transition-all hover:bg-primary/10 ${social.color}`}
              aria-label={`Follow us on ${social.name}`}
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-center text-muted-foreground">
        Stay connected with our latest updates
      </p>
    </div>
  );
}
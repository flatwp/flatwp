import Link from "next/link";
import { Hash } from "lucide-react";
import { getAllTags } from "@/lib/wordpress/queries";
import { cn } from "@/lib/utils";

interface TagCloudWidgetProps {
  limit?: number;
}

export async function TagCloudWidget({ limit = 20 }: TagCloudWidgetProps) {
  const tags = await getAllTags();

  if (!tags || tags.length === 0) {
    return null;
  }

  // Sort tags by count and take the top ones
  const topTags = tags
    .sort((a, b) => (b.count || 0) - (a.count || 0))
    .slice(0, limit);

  // Calculate tag sizes based on count
  const maxCount = Math.max(...topTags.map(t => t.count || 1));
  const minCount = Math.min(...topTags.map(t => t.count || 1));
  const range = maxCount - minCount || 1;

  const getTagSize = (count: number) => {
    const normalized = ((count || 1) - minCount) / range;
    if (normalized > 0.75) return "lg";
    if (normalized > 0.5) return "md";
    if (normalized > 0.25) return "sm";
    return "xs";
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Hash className="w-5 h-5 text-primary" />
        Popular Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {topTags.map((tag) => {
          const size = getTagSize(tag.count || 1);
          return (
            <Link
              key={tag.id}
              href={`/blog/tag/${tag.slug}`}
              className={cn(
                "inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                "bg-primary/5 hover:bg-primary/10 text-foreground hover:text-primary",
                size === "xs" && "text-xs",
                size === "sm" && "text-xs",
                size === "md" && "text-sm",
                size === "lg" && "text-sm font-semibold"
              )}
            >
              #{tag.name}
              {(tag.count || 0) > 5 && (
                <span className="ml-1.5 text-[10px] text-muted-foreground">
                  ({tag.count})
                </span>
              )}
            </Link>
          );
        })}
      </div>
      {tags.length > limit && (
        <Link
          href="/blog/tags"
          className="block mt-4 text-sm text-primary hover:underline font-medium text-center"
        >
          View All Tags →
        </Link>
      )}
    </div>
  );
}
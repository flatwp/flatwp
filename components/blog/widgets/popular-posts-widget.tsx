import Link from "next/link";
import { TrendingUp, Eye } from "lucide-react";
import { getPostsForSearchIndex } from "@/lib/wordpress/queries";
import { formatDate } from "@/lib/utils/text";

interface PopularPostsWidgetProps {
  limit?: number;
}

export async function PopularPostsWidget({ limit = 5 }: PopularPostsWidgetProps) {
  const searchIndex = await getPostsForSearchIndex();

  // For now, we'll use recent posts as popular posts
  // In a real app, you'd track view counts or engagement metrics
  const popularPosts = searchIndex
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  if (!popularPosts || popularPosts.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        Trending Posts
      </h3>
      <div className="space-y-4">
        {popularPosts.map((post, index) => (
          <article key={post.id} className="group flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <Link href={`/blog/${post.slug}`}>
                <h4 className="text-sm font-medium group-hover:text-primary transition-colors mb-1 line-clamp-2">
                  {post.title}
                </h4>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{Math.floor(Math.random() * 1000) + 100} views</span>
                  </div>
                  <span>•</span>
                  <time dateTime={post.date}>{formatDate(post.date, "short")}</time>
                </div>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
import Link from "next/link";
import { Clock } from "lucide-react";
import { getPostsForSearchIndex } from "@/lib/wordpress/queries";
import { formatDate } from "@/lib/utils/text";

interface RecentPostsWidgetProps {
  limit?: number;
}

export async function RecentPostsWidget({ limit = 5 }: RecentPostsWidgetProps) {
  const searchIndex = await getPostsForSearchIndex();

  // Get recent posts (latest by date)
  const recentPosts = searchIndex
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  if (!recentPosts || recentPosts.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary" />
        Recent Posts
      </h3>
      <div className="space-y-4">
        {recentPosts.map((post) => (
          <article key={post.id} className="group">
            <Link href={`/blog/${post.slug}`}>
              <h4 className="text-sm font-medium group-hover:text-primary transition-colors mb-1 line-clamp-2">
                {post.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <time dateTime={post.date}>{formatDate(post.date, "short")}</time>
              </div>
            </Link>
          </article>
        ))}
      </div>
      <Link
        href="/blog"
        className="block mt-4 text-sm text-primary hover:underline font-medium text-center"
      >
        View All Posts →
      </Link>
    </div>
  );
}
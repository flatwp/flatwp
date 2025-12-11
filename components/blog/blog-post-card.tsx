import Link from "next/link";
import Image from "next/image";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import { Post } from "@/lib/wordpress/adapters/post";
import { Badge } from "@/components/ui/badge";
import { calculateReadingTime, formatDate } from "@/lib/utils/text";

interface BlogPostCardProps {
  post: Post;
  variant?: "default" | "enhanced" | "compact";
}

export function BlogPostCard({ post, variant = "default" }: BlogPostCardProps) {
  const readTime = calculateReadingTime(post.content);

  if (variant === "enhanced") {
    return (
      <article className="group bg-card rounded-xl border border-border/50 overflow-hidden transition-all hover:border-border hover:shadow-lg hover:shadow-primary/5">
        <div className="p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Categories at top */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-4">
                  {post.categories.slice(0, 2).map((category) => (
                    <Badge
                      key={category.id}
                      href={`/blog/category/${category.slug}`}
                      variant="secondary"
                      size="sm"
                      className="hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {category.name}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Title with hover effect */}
              <h2 className="text-2xl font-bold mb-3 leading-snug">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-primary transition-colors inline-block"
                >
                  {post.title}
                  <ArrowRight className="inline-block w-5 h-5 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </h2>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Meta information with improved layout */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {post.author && (
                  <Link
                    href={`/blog/author/${post.author.slug}`}
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    {post.author.avatar?.url ? (
                      <Image
                        src={post.author.avatar.url}
                        alt={post.author.name}
                        width={32}
                        height={32}
                        className="rounded-full ring-2 ring-background"
                        unoptimized={!post.author.avatar.url.includes('gravatar.com')}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <span className="font-medium">{post.author.name}</span>
                  </Link>
                )}
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date}>
                      {formatDate(post.date, 'short')}
                    </time>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{readTime} min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image Thumbnail (if available) */}
            {post.featuredImage && (
              <Link
                href={`/blog/${post.slug}`}
                className="relative w-full lg:w-48 h-32 lg:h-32 rounded-lg overflow-hidden bg-muted shrink-0"
              >
                <Image
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt || post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 192px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            )}
          </div>

          {/* Tags section at bottom */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-6 pt-6 border-t border-border/50">
              <div className="flex gap-2 flex-wrap">
                {post.tags.slice(0, 4).map((tag) => (
                  <Badge
                    key={tag.id}
                    href={`/blog/tag/${tag.slug}`}
                    variant="outline"
                    size="sm"
                    className="text-xs hover:bg-primary/10 hover:border-primary transition-colors"
                  >
                    #{tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    );
  }

  // Default variant
  return (
    <article className="bg-card rounded-lg p-8 border border-border transition-shadow hover:shadow-lg">
      {/* Categories at top */}
      {post.categories && post.categories.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-4">
          {post.categories.slice(0, 3).map((category) => (
            <Badge
              key={category.id}
              href={`/blog/category/${category.slug}`}
              variant="secondary"
              size="sm"
            >
              {category.name}
            </Badge>
          ))}
          {post.categories.length > 3 && (
            <Badge variant="secondary" size="sm">
              +{post.categories.length - 3} more
            </Badge>
          )}
        </div>
      )}

      {/* Title */}
      <h2 className="text-2xl font-bold mb-3 leading-snug">
        <Link
          href={`/blog/${post.slug}`}
          className="hover:text-primary transition-colors"
        >
          {post.title}
        </Link>
      </h2>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-muted-foreground mb-6 line-clamp-2">{post.excerpt}</p>
      )}

      {/* Author & Date Meta */}
      <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
        {post.author && (
          <div className="flex items-center gap-2">
            {post.author.avatar?.url ? (
              <Image
                src={post.author.avatar.url}
                alt={post.author.name}
                width={24}
                height={24}
                className="rounded-full"
                unoptimized={!post.author.avatar.url.includes('gravatar.com')}
              />
            ) : (
              <User className="w-4 h-4" />
            )}
            <span>{post.author.name}</span>
          </div>
        )}
        <span>•</span>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <time dateTime={post.date}>
            {formatDate(post.date, 'short')}
          </time>
        </div>
        <span>•</span>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{readTime} min read</span>
        </div>
      </div>

      {/* Tags section (optional, at bottom) */}
      {post.tags && post.tags.length > 0 && (
        <div className="pt-6 border-t border-border">
          <div className="flex gap-2 flex-wrap">
            {post.tags.slice(0, 5).map((tag) => (
              <Badge
                key={tag.id}
                href={`/blog/tag/${tag.slug}`}
                variant="outline"
                size="sm"
              >
                #{tag.name}
              </Badge>
            ))}
            {post.tags.length > 5 && (
              <Badge variant="outline" size="sm">
                +{post.tags.length - 5} more
              </Badge>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
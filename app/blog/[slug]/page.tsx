import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User, BookOpen, Tag } from "lucide-react";
import { PostContent } from "@/components/blog/post-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FeaturedImage } from "@/components/ui/OptimizedImage";
import { RelatedPosts } from "@/components/blog/related-posts";
import { AuthorCard } from "@/components/blog/author-card";
import { ShareButtons } from "@/components/blog/share-buttons";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { getPostBySlug, getRelatedPosts } from "@/lib/wordpress/queries";
import { calculateReadingTime, formatDate } from "@/lib/utils/text";
import { unstable_cache } from 'next/cache';
import { getRevalidate } from '@/lib/config';

// Dynamic params - allow non-prerendered paths
export const dynamicParams = true;

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  // First fetch to get revalidate time
  const initialPost = await getPostBySlug(slug);

  if (!initialPost) {
    notFound();
  }

  // Create cached version with ISR revalidation from config
  const revalidateTime = getRevalidate('posts');
  const getCachedPost = unstable_cache(
    async () => getPostBySlug(slug),
    [`post-${slug}`],
    {
      revalidate: revalidateTime,
      tags: [`post-${slug}`]
    }
  );

  const post = await getCachedPost();

  if (!post) {
    notFound();
  }

  // Calculate read time using utility function
  const readTime = calculateReadingTime(post.content);

  // Fetch related posts based on categories/tags
  const relatedPosts = await getRelatedPosts(post, 3);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section with Featured Image Background */}
      <div className="relative">
        {post.featuredImage && (
          <>
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 h-[500px] overflow-hidden">
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.alt || post.title}
                fill
                className="object-cover opacity-20"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
            </div>
          </>
        )}

        {/* Content Container */}
        <div className="relative container mx-auto max-w-6xl px-6 py-12">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <header className="max-w-4xl mx-auto mb-12">
            {/* Categories at top */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex gap-2 mb-6 flex-wrap">
                {post.categories.map((category) => (
                  <Badge
                    key={category.id}
                    href={`/blog/category/${category.slug}`}
                    variant="default"
                    className="px-3 py-1"
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              {/* Author with enhanced display */}
              {post.author && (
                <Link
                  href={`/blog/author/${post.author.slug}`}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  {post.author.avatar?.url ? (
                    <Image
                      src={post.author.avatar.url}
                      alt={post.author.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full ring-2 ring-background"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-foreground">{post.author.name}</p>
                    <p className="text-xs text-muted-foreground">Author</p>
                  </div>
                </Link>
              )}

              {/* Date and Reading Time */}
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.date}>
                    {formatDate(post.date, 'full')}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{post.content.split(' ').length} words</span>
                </div>
              </div>

              {/* Share Button */}
              <div className="ml-auto">
                <ShareButtons
                  url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`}
                  title={post.title}
                />
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* Main Article Content */}
      <main className="container mx-auto max-w-6xl px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
          {/* Article Body */}
          <article className="max-w-4xl">
            {/* Featured Image (Full Width) */}
            {post.featuredImage && (
              <div className="mb-12 rounded-xl overflow-hidden shadow-xl">
                <FeaturedImage
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt || post.title}
                  width={post.featuredImage.width}
                  height={post.featuredImage.height}
                  priority
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Post Content with Enhanced Typography */}
            <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
              <PostContent content={post.content} />
            </div>

            {/* Tags Section */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Tag className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Tags</h3>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag.id}
                      href={`/blog/tag/${tag.slug}`}
                      variant="outline"
                      className="px-3 py-1.5"
                    >
                      #{tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Author Card */}
            <div className="mt-12">
              <AuthorCard author={post.author} variant="expanded" />
            </div>

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <div className="flex items-center gap-3 mb-8">
                  <h2 className="text-2xl font-bold">You Might Also Like</h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                </div>
                <RelatedPosts posts={relatedPosts} />
              </div>
            )}
          </article>

          {/* Sticky Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents */}
              <TableOfContents content={post.content} />

              {/* Quick Actions */}
              <div className="bg-card rounded-xl p-6 border border-border/50">
                <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <ShareButtons
                    url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`}
                    title={post.title}
                    variant="vertical"
                  />
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/blog">
                      View More Posts
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
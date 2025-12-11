import { Suspense } from "react";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { FeaturedPostCard } from "@/components/blog/featured-post-card";
import { WidgetSidebar } from "@/components/blog/widgets/widget-sidebar";
import { Pagination } from "@/components/ui/pagination";
import { BlogPageHeader } from "@/components/blog/blog-page-header";
import { BlogPostSkeleton } from "@/components/blog/blog-post-skeleton";
import {
  getFeaturedPosts,
  getRegularPosts,
  getTotalPostCount,
  calculateTotalPages,
  POSTS_PER_PAGE,
} from "@/lib/wordpress/queries";

export const revalidate = 300; // Revalidate every 5 minutes

export default async function BlogPage() {
  // Fetch featured (sticky) posts, regular posts, and total count in parallel
  const [featuredPosts, regularPosts, totalPosts] = await Promise.all([
    getFeaturedPosts(3), // Get up to 3 sticky posts
    getRegularPosts(1), // Get first page of non-sticky posts
    getTotalPostCount(),
  ]);

  const totalPages = calculateTotalPages(totalPosts, POSTS_PER_PAGE);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Header */}
      <BlogPageHeader />

      <div className="container mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
        {featuredPosts.length === 0 && regularPosts.length === 0 ? (
          <div className="bg-card rounded-xl p-12 border border-border/50 text-center shadow-sm">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-lg text-muted-foreground">No posts available yet.</p>
              <p className="text-sm text-muted-foreground/80 mt-2">Check back soon for fresh content!</p>
            </div>
          </div>
        ) : (
          <>
            {/* Featured (Sticky) Posts Section - Full Width */}
            {featuredPosts.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Featured Stories
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {featuredPosts.map((post, index) => (
                    <FeaturedPostCard
                      key={post.id}
                      post={post}
                      priority={index === 0} // First featured post gets priority for LCP
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Regular Posts Section with Sidebar - Two Column Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 lg:gap-12">
              {/* Main content */}
              <section className="min-w-0">
                {featuredPosts.length > 0 && (
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl font-bold">Latest Posts</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  </div>
                )}

                <Suspense fallback={<BlogPostSkeleton count={3} />}>
                  <div className="space-y-6">
                    {regularPosts.map((post) => (
                      <BlogPostCard key={post.id} post={post} variant="enhanced" />
                    ))}
                  </div>
                </Suspense>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination
                      currentPage={1}
                      totalPages={totalPages}
                      basePath="/blog"
                    />
                  </div>
                )}
              </section>

              {/* Enhanced Sidebar with Widget System */}
              <aside className="hidden xl:block">
                <div className="sticky top-24">
                  <WidgetSidebar />
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
export function BlogPageHeader() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-background border-b">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />

      {/* Floating shapes for visual interest */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl opacity-20 animate-pulse" />

      <div className="relative container mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Our Blog
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
            Insights, tutorials, and updates from our team. Discover the latest in web development,
            WordPress, and digital innovation.
          </p>

          {/* Quick Stats */}
          <div className="flex gap-8 mt-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">Updated weekly</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-sm text-muted-foreground">Expert authors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
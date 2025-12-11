export function BlogPostSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card rounded-xl p-6 border border-border/50 animate-pulse">
          <div className="flex gap-2 mb-4">
            <div className="h-5 w-16 bg-muted rounded-full" />
            <div className="h-5 w-20 bg-muted rounded-full" />
          </div>
          <div className="h-7 bg-muted rounded-lg mb-4 w-3/4" />
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-muted rounded-full" />
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-4 w-20 bg-muted rounded" />
          </div>
        </div>
      ))}
    </>
  );
}
export function WidgetSkeleton() {
  return (
    <div className="bg-card rounded-xl p-6 border border-border/50 animate-pulse">
      <div className="h-5 w-32 bg-muted rounded mb-4" />
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-5/6" />
      </div>
    </div>
  );
}
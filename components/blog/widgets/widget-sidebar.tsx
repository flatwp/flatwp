import { Suspense } from "react";
import { BlogSearchWidget } from "./blog-search-widget";
import { CategoriesWidget } from "./categories-widget";
import { TagCloudWidget } from "./tag-cloud-widget";
import { RecentPostsWidget } from "./recent-posts-widget";
import { NewsletterWidget } from "./newsletter-widget";
import { PopularPostsWidget } from "./popular-posts-widget";
import { AboutWidget } from "./about-widget";
import { SocialLinksWidget } from "./social-links-widget";
import { WidgetSkeleton } from "./widget-skeleton";

// Widget configuration type
export interface WidgetConfig {
  id: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  enabled: boolean;
  order: number;
}

// Default widget configuration - can be customized
const defaultWidgets: WidgetConfig[] = [
  {
    id: "search",
    component: BlogSearchWidget,
    enabled: true,
    order: 1,
  },
  {
    id: "categories",
    component: CategoriesWidget,
    enabled: true,
    order: 2,
  },
  {
    id: "recent-posts",
    component: RecentPostsWidget,
    props: { limit: 5 },
    enabled: true,
    order: 3,
  },
  {
    id: "tag-cloud",
    component: TagCloudWidget,
    props: { limit: 20 },
    enabled: true,
    order: 4,
  },
  {
    id: "newsletter",
    component: NewsletterWidget,
    enabled: true,
    order: 5,
  },
  {
    id: "popular-posts",
    component: PopularPostsWidget,
    props: { limit: 5 },
    enabled: false, // Disabled by default
    order: 6,
  },
  {
    id: "about",
    component: AboutWidget,
    enabled: false, // Disabled by default
    order: 7,
  },
  {
    id: "social-links",
    component: SocialLinksWidget,
    enabled: false, // Disabled by default
    order: 8,
  },
];

interface WidgetSidebarProps {
  widgets?: WidgetConfig[];
  className?: string;
}

export async function WidgetSidebar({ widgets = defaultWidgets, className }: WidgetSidebarProps) {
  // Filter and sort enabled widgets
  const activeWidgets = widgets
    .filter(widget => widget.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div className={className}>
      <div className="space-y-6">
        {activeWidgets.map((widget) => {
          const WidgetComponent = widget.component;
          return (
            <Suspense key={widget.id} fallback={<WidgetSkeleton />}>
              <WidgetComponent {...widget.props} />
            </Suspense>
          );
        })}
      </div>
    </div>
  );
}
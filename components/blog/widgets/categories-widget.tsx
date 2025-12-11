import Link from "next/link";
import { Folder } from "lucide-react";
import { getAllCategories } from "@/lib/wordpress/queries";
import { Badge } from "@/components/ui/badge";

export async function CategoriesWidget() {
  const categories = await getAllCategories();

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Folder className="w-5 h-5 text-primary" />
        Categories
      </h3>
      <div className="space-y-2">
        {categories.slice(0, 8).map((category) => (
          <Link
            key={category.id}
            href={`/blog/category/${category.slug}`}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-primary/5 transition-all group"
          >
            <span className="text-sm font-medium group-hover:text-primary transition-colors">
              {category.name}
            </span>
            <Badge variant="secondary" className="text-xs">
              {category.count}
            </Badge>
          </Link>
        ))}
      </div>
      {categories.length > 8 && (
        <Link
          href="/blog/categories"
          className="block mt-4 text-sm text-primary hover:underline font-medium text-center"
        >
          View All Categories →
        </Link>
      )}
    </div>
  );
}
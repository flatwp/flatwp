import { User } from "lucide-react";

export async function AboutWidget() {
  // This could be fetched from GraphQL or configured
  const aboutData = {
    title: "About Our Blog",
    description: "Sharing insights and knowledge about web development, WordPress, and modern tech stacks.",
    image: "/api/placeholder/200/200",
    authorName: "Editorial Team",
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <User className="w-5 h-5 text-primary" />
        {aboutData.title}
      </h3>

      <div className="text-center mb-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
          <User className="w-10 h-10 text-primary" />
        </div>
        <p className="font-medium text-sm">{aboutData.authorName}</p>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {aboutData.description}
      </p>

      <div className="mt-4 pt-4 border-t border-border/50">
        <p className="text-xs text-center text-muted-foreground">
          Powered by FlatWP
        </p>
      </div>
    </div>
  );
}
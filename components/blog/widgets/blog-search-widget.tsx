"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function BlogSearchWidget() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page
      window.location.href = `/blog/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Search className="w-5 h-5 text-primary" />
        Search Blog
      </h3>
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="search"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10 bg-background border-border/50 focus:border-primary"
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
        >
          <Search className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
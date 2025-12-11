"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { BlockComponentProps, SearchBlock } from "../types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function SearchBlockComponent({
  block,
  className,
}: BlockComponentProps<SearchBlock>) {
  const { config } = block;
  const { placeholder = "Search...", variant = "inline", searchPath = "/search" } = config;
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`${searchPath}?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  // Handle keyboard shortcut for opening search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (variant === "modal") {
          setIsOpen((prev) => !prev);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [variant]);

  if (variant === "modal") {
    return (
      <>
        <Button
          variant="outline"
          size="sm"
          className={cn("relative", className)}
          onClick={() => setIsOpen(true)}
        >
          <Search className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="p-0">
            <DialogHeader className="sr-only">
              <DialogTitle>Search</DialogTitle>
              <DialogDescription>
                Search for content across the site
              </DialogDescription>
            </DialogHeader>
            <Command className="rounded-lg border-none">
              <CommandInput
                placeholder={placeholder}
                value={searchQuery}
                onValueChange={setSearchQuery}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    router.push(`${searchPath}?q=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchQuery("");
                    setIsOpen(false);
                  }
                }}
              />
              <CommandList>
                <CommandEmpty>Type to search...</CommandEmpty>
                {searchQuery.trim() && (
                  <CommandGroup heading="Actions">
                    <CommandItem
                      onSelect={() => {
                        router.push(`${searchPath}?q=${encodeURIComponent(searchQuery.trim())}`);
                        setSearchQuery("");
                        setIsOpen(false);
                      }}
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Search for &quot;{searchQuery}&quot;
                    </CommandItem>
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  if (variant === "dropdown") {
    return (
      <div className={cn("relative", className)}>
        <div className="relative">
          <Input
            type="search"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchQuery.trim()) {
                router.push(`${searchPath}?q=${encodeURIComponent(searchQuery.trim())}`);
                setSearchQuery("");
              }
            }}
            className="pr-8"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-2"
            onClick={() => {
              if (searchQuery.trim()) {
                router.push(`${searchPath}?q=${encodeURIComponent(searchQuery.trim())}`);
                setSearchQuery("");
              }
            }}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Inline variant
  return (
    <form onSubmit={handleSearch} className={cn("relative", className)}>
      <Input
        type="search"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pr-8"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full px-2"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
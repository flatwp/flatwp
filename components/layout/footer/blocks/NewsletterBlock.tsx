"use client";

import { useState } from "react";
import { BlockComponentProps, NewsletterBlock } from "../../header/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function NewsletterBlockComponent({
  block,
  className,
}: BlockComponentProps<NewsletterBlock>) {
  const { config } = block;
  const {
    title = "Subscribe to our newsletter",
    description = "Stay updated with the latest news and updates.",
    placeholder = "Enter your email",
    buttonText = "Subscribe",
    action = "/api/newsletter",
  } = config;

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch(action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Failed to subscribe. Please try again.");
    }

    // Reset status after 3 seconds
    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 3000);
  };

  return (
    <div className={cn("space-y-5", className)}>
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {description && (
        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">{description}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Label htmlFor={`email-${block.id}`} className="sr-only">
          Email
        </Label>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md">
          <Input
            id={`email-${block.id}`}
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            className="flex-1 text-sm h-11"
            required
          />
          <Button
            type="submit"
            size="default"
            disabled={status === "loading"}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-11 whitespace-nowrap"
          >
            {status === "loading" ? "Subscribing..." : buttonText}
          </Button>
        </div>
        {message && (
          <p
            className={cn(
              "text-xs",
              status === "success" ? "text-green-600" : "text-red-600"
            )}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
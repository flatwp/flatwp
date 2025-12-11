"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterWidget() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setIsSubmitting(true);
    setMessage("");

    try {
      // TODO: Integrate with newsletter service
      // For now, just simulate a successful subscription
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessage("Thanks for subscribing!");
      setEmail("");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-xl p-6 border border-primary/20">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          Newsletter
        </h3>
        <p className="text-sm text-muted-foreground">
          Get the latest posts delivered to your inbox
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
          className="bg-background border-border/50"
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>

      {message && (
        <p className={`mt-3 text-sm ${message.includes("Thanks") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      <p className="mt-4 text-xs text-muted-foreground text-center">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
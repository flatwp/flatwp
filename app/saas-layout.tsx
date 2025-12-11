/**
 * SaaS Layout Wrapper
 *
 * This layout file demonstrates how to use the SaaS header and footer
 * configuration across your entire application.
 *
 * To use this layout:
 * 1. Rename your current app/layout.tsx to app/layout-original.tsx
 * 2. Rename this file to app/layout.tsx
 * 3. Or import and use these components in your existing layout
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SaaSHeader } from "@/components/layout/saas-header";
import { SaaSFooter } from "@/components/layout/saas-footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlatWP - Modern Headless WordPress Platform",
  description: "Build blazing-fast headless WordPress sites with Next.js. Enterprise-ready, developer-friendly, and scalable.",
  keywords: "headless wordpress, nextjs, react, cms, jamstack, static site generator",
};

export default function SaaSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <SaaSHeader />
          <main className="flex-1">{children}</main>
          <SaaSFooter />
        </div>
      </body>
    </html>
  );
}
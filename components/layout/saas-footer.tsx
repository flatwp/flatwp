/**
 * SaaS Footer Component
 *
 * A comprehensive footer designed for SaaS applications with:
 * - Multiple link columns for navigation
 * - Newsletter subscription
 * - Trust badges and social proof
 * - Language selector
 * - Legal links
 */

import { Footer as BlockBasedFooter } from "./footer/Footer";
import { saasFooterConfig } from "@/config/saas-layout-client.config";

export function SaaSFooter() {
  return <BlockBasedFooter config={saasFooterConfig} />;
}
/**
 * SaaS Header Component
 *
 * A professional header designed for SaaS applications with:
 * - Multi-level dropdown navigation
 * - Sign in/Sign up CTAs
 * - Mobile responsive menu
 * - Search functionality
 */

import { Header as BlockBasedHeader } from "./header/Header";
import { saasHeaderConfig } from "@/config/saas-layout-client.config";

export function SaaSHeader() {
  return <BlockBasedHeader config={saasHeaderConfig} />;
}
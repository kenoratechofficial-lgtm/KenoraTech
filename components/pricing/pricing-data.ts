import { BriefcaseBusiness, Code2, ShoppingBag, Smartphone, Rocket, type LucideIcon } from "lucide-react";

export interface PricingPlan {
  name: string;
  icon: LucideIcon;
  price: number;
  pricePrefix?: string;
  description: string;
  subtext: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  { name: "Starter Website", icon: Rocket, price: 4999, description: "Perfect for personal brands, portfolios, and small businesses looking to build their online presence.", subtext: "A polished starting point for your online presence.", features: ["Responsive website", "Ideal for portfolios and small businesses"], cta: "Get Started" },
  { name: "Business Website", icon: BriefcaseBusiness, price: 9999, description: "A professional, multi-page responsive website with a contact form and WhatsApp integration.", subtext: "A complete website to help your business grow.", features: ["Multiple responsive pages", "Contact form", "WhatsApp integration"], cta: "Get Started", popular: true },
  { name: "E-commerce Website", icon: ShoppingBag, price: 11999, description: "Launch your online store with a product catalogue, shopping cart, and checkout integration. Payment gateway charges extra.", subtext: "Start selling online with a complete storefront.", features: ["Product catalogue", "Shopping cart", "Checkout integration", "Payment gateway charges extra"], cta: "Launch Your Store" },
  { name: "Custom Web Application", icon: Code2, price: 15999, pricePrefix: "From", description: "Tailored web applications with custom frontend, backend, database, and features designed around your business needs.", subtext: "Custom scope and features shaped around your business.", features: ["Custom frontend and backend", "Database", "Business-specific features"], cta: "Discuss Your Project" },
  { name: "Android App Development", icon: Smartphone, price: 18999, pricePrefix: "From", description: "Custom Android apps built around your ideas and requirements. Final pricing depends on screens, features, and complexity.", subtext: "Final pricing depends on screens, features, and complexity.", features: ["Custom Android app", "Requirements-based scope"], cta: "Discuss Your App" }
];

export interface ComparisonRow {
  feature: string;
  starter: string | boolean;
  growth: string | boolean;
  business: string | boolean;
  enterprise: string | boolean;
}

export const comparisonRows: ComparisonRow[] = [];

import type { LucideIcon } from "lucide-react";
import { BriefcaseBusiness, Crown, Rocket, TrendingUp } from "lucide-react";

export interface PricingPlan {
  name: string;
  icon: LucideIcon;
  originalPrice?: number;
  offerPrice?: number;
  unit?: "/project" | "/month";
  priceLabel?: string;
  description: string;
  subtext: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export interface ComparisonRow {
  feature: string;
  starter: string | boolean;
  growth: string | boolean;
  business: string | boolean;
  enterprise: string | boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    icon: Rocket,
    originalPrice: 6999,
    offerPrice: 3999,
    unit: "/project",
    description: "Perfect for startups",
    subtext: "Everything you need to launch your business online.",
    features: ["Up to 5 Pages", "Responsive Design", "Contact Form", "1 Month Support"],
    cta: "Get Started"
  },
  {
    name: "Growth",
    icon: TrendingUp,
    originalPrice: 11999,
    offerPrice: 6999,
    unit: "/project",
    description: "Best for growing businesses",
    subtext: "Advanced features to grow your brand and reach.",
    features: ["Up to 15 Pages", "Responsive Design", "CMS Integration", "Speed Optimization", "3 Months Support"],
    cta: "Get Started",
    popular: true
  },
  {
    name: "Business",
    icon: BriefcaseBusiness,
    originalPrice: 18999,
    offerPrice: 10999,
    unit: "/project",
    description: "For established businesses",
    subtext: "Powerful solutions for business scalability.",
    features: [
      "Up to 30 Pages",
      "Responsive Design",
      "CMS Integration",
      "Speed Optimization",
      "Analytics Integration",
      "6 Months Support"
    ],
    cta: "Get Started"
  },
  {
    name: "Enterprise",
    icon: Crown,
    priceLabel: "Custom Quote",
    description: "For large scale solutions",
    subtext: "Tailored solutions for your unique business needs.",
    features: [
      "Unlimited Pages",
      "Custom Features",
      "CMS Integration",
      "Speed Optimization",
      "Analytics",
      "Priority Support"
    ],
    cta: "Contact Us"
  }
];

export const comparisonRows: ComparisonRow[] = [
  {
    feature: "Responsive Design",
    starter: true,
    growth: true,
    business: true,
    enterprise: true
  },
  {
    feature: "Pages",
    starter: "Up to 5",
    growth: "Up to 15",
    business: "Up to 30",
    enterprise: "Unlimited"
  },
  {
    feature: "CMS Integration",
    starter: false,
    growth: true,
    business: true,
    enterprise: true
  },
  {
    feature: "Speed Optimization",
    starter: false,
    growth: true,
    business: true,
    enterprise: true
  },
  {
    feature: "Analytics",
    starter: false,
    growth: false,
    business: true,
    enterprise: true
  },
  {
    feature: "Support",
    starter: "1 Month",
    growth: "3 Months",
    business: "6 Months",
    enterprise: "Priority Support"
  }
];

import {
  Code2,
  LayoutDashboard,
  LifeBuoy,
  Palette,
  ShoppingBag
} from "lucide-react";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Careers", href: "/careers" },
  { label: "Process", href: "/process" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" }
];

export const services = [
  {
    icon: Code2,
    title: "Website Development",
    description: "Fast, refined marketing sites built with clean architecture and easy future scaling."
  },
  {
    icon: LayoutDashboard,
    title: "Web Applications",
    description: "Dashboards, portals, booking systems and SaaS interfaces engineered for reliability and intuitive workflows."
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Development",
    description: "Conversion-focused storefronts with product storytelling, checkout polish and operational integrations."
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Premium interfaces, responsive systems and product flows that make complex experiences feel simple."
  },
  {
    icon: LifeBuoy,
    title: "Website Maintenance",
    description: "Ongoing updates, performance monitoring, security hardening and content support after launch."
  }
];

export const pricing = [
  {
    name: "Starter",
    price: "₹1,999",
    description: "A clean launch package for founders, creators and service brands.",
    features: ["One-page responsive website", "Contact form", "Speed optimization", "7 days support"],
    cta: "Start lean"
  },
  {
    name: "Business",
    price: "₹4,999",
    description: "A multi-page presence with stronger conversion and credibility systems.",
    features: ["Up to 6 custom pages", "CMS-ready structure", "Analytics setup", "30 days support"],
    cta: "Grow smarter",
    featured: true
  },
  {
    name: "Premium",
    price: "Custom",
    description: "A tailored product engagement for applications, commerce and automation.",
    features: ["Product discovery", "Custom web app or store", "Design system", "Integrations", "Priority roadmap support"],
    cta: "Plan premium"
  }
];

export const testimonials = [
  {
    quote: "Kenora Tech turned our scattered ideas into a polished website that instantly made our brand feel more credible.",
    name: "Rhea Sharma",
    role: "Founder, Studio Luma"
  },
  {
    quote: "The team understood product thinking, not just page design. Our client portal is cleaner and much faster.",
    name: "Arjun Mehta",
    role: "Operations Lead, BrightPath"
  },
  {
    quote: "They shipped quickly, communicated clearly and cared about details that usually get missed before launch.",
    name: "Neha Iyer",
    role: "Director, Veda Retail"
  }
];

export const faqs = [
  {
    question: "How long does a website project take?",
    answer: "Starter sites can launch in 5-7 business days after content approval. Business and custom builds are scoped around complexity, usually 2-6 weeks."
  },
  {
    question: "Do you provide content and copywriting?",
    answer: "Yes. We can shape page structure, write conversion-focused copy and refine your existing brand material into a polished digital experience."
  },
  {
    question: "Can you maintain the site after launch?",
    answer: "Yes. Maintenance can include content updates, backups, performance checks, security updates and feature iterations."
  },
  {
    question: "Do you build custom web applications?",
    answer: "Absolutely. We design and build dashboards, portals, SaaS tools, booking workflows, admin systems and integrations based on your business needs."
  }
];

export const values = [
  {
    title: "Premium without noise",
    description: "We favor clarity, restraint and fast experiences over visual clutter."
  },
  {
    title: "Built for growth",
    description: "Every component is structured so your site can become a fuller product later."
  },
  {
    title: "Measured execution",
    description: "Performance, accessibility and conversion goals are part of the build, not an afterthought."
  }
];

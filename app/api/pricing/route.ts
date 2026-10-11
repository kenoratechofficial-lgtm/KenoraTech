import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedAdmin } from "@/lib/admin-auth";
import { DatabaseConnectionError, getMongoDb } from "@/lib/mongodb";

const defaults = [
  { name: "Starter Website", price: 4999, pricePrefix: "", description: "Perfect for personal brands, portfolios, and small businesses looking to build their online presence.", subtext: "A polished starting point for your online presence.", features: ["Responsive website", "Ideal for portfolios and small businesses"], cta: "Get Started", order: 0 },
  { name: "Business Website", price: 9999, pricePrefix: "", description: "A professional, multi-page responsive website with a contact form and WhatsApp integration.", subtext: "A complete website to help your business grow.", features: ["Multiple responsive pages", "Contact form", "WhatsApp integration"], cta: "Get Started", popular: true, order: 1 },
  { name: "E-commerce Website", price: 11999, pricePrefix: "", description: "Launch your online store with a product catalogue, shopping cart, and checkout integration. Payment gateway charges extra.", subtext: "Start selling online with a complete storefront.", features: ["Product catalogue", "Shopping cart", "Checkout integration", "Payment gateway charges extra"], cta: "Launch Your Store", order: 2 },
  { name: "Custom Web Application", price: 15999, pricePrefix: "From", description: "Tailored web applications with custom frontend, backend, database, and features designed around your business needs.", subtext: "Custom scope and features shaped around your business.", features: ["Custom frontend and backend", "Database", "Business-specific features"], cta: "Discuss Your Project", order: 3 },
  { name: "Android App Development", price: 18999, pricePrefix: "From", description: "Custom Android apps built around your ideas and requirements. Final pricing depends on screens, features, and complexity.", subtext: "Final pricing depends on screens, features, and complexity.", features: ["Custom Android app", "Requirements-based scope"], cta: "Discuss Your App", order: 4 }
];

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const db = await getMongoDb();
    const plans = await db.collection("pricingPlans").find({}).sort({ order: 1 }).toArray();
    const savedPlans = plans.map(({ _id, ...plan }) => plan);
    const isCurrentFormat = savedPlans.length > 0 && savedPlans.every((plan) => typeof plan.name === "string" && Number.isFinite(Number(plan.price)) && typeof plan.description === "string");
    return NextResponse.json({ plans: isCurrentFormat ? savedPlans : defaults });
  } catch (error) {
    if (error instanceof DatabaseConnectionError) return NextResponse.json({ plans: defaults });
    return NextResponse.json({ error: "Unable to load pricing." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  try {
    const body = await request.json();
    if (!Array.isArray(body.plans) || body.plans.length < 1 || body.plans.length > 10) return NextResponse.json({ error: "Between one and ten pricing plans are required." }, { status: 400 });
    const plans = body.plans.map((plan: Record<string, unknown>, order: number) => ({
      name: typeof plan.name === "string" ? plan.name : "",
      price: Number(plan.price),
      pricePrefix: typeof plan.pricePrefix === "string" ? plan.pricePrefix.trim() : "",
      description: typeof plan.description === "string" ? plan.description.trim() : "",
      subtext: typeof plan.subtext === "string" ? plan.subtext.trim() : "",
      features: Array.isArray(plan.features) ? plan.features.filter((feature: unknown) => typeof feature === "string").slice(0, 12) : [],
      cta: typeof plan.cta === "string" ? plan.cta.trim() : "Get Started",
      popular: Boolean(plan.popular),
      order
    }));
    if (plans.some((plan: { name: string; price: number; description: string }) => !plan.name || !Number.isFinite(plan.price) || plan.price <= 0 || !plan.description)) return NextResponse.json({ error: "Each plan needs a name, description, and valid price." }, { status: 400 });
    const db = await getMongoDb();
    await db.collection("pricingPlans").deleteMany({});
    await db.collection("pricingPlans").insertMany(plans);
    return NextResponse.json({ plans });
  } catch (error) {
    return NextResponse.json({ error: error instanceof DatabaseConnectionError ? error.message : "Unable to save pricing." }, { status: 500 });
  }
}

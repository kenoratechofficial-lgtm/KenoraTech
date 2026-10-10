import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedAdmin } from "@/lib/admin-auth";
import { DatabaseConnectionError, getMongoDb } from "@/lib/mongodb";

const defaults = [
  { name: "Starter", originalPrice: 6999, offerPrice: 3999, unit: "/project" },
  { name: "Growth", originalPrice: 11999, offerPrice: 6999, unit: "/project" },
  { name: "Business", originalPrice: 18999, offerPrice: 10999, unit: "/project" },
  { name: "Enterprise", priceLabel: "Custom Quote", unit: "" }
];

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const db = await getMongoDb();
    const plans = await db.collection("pricingPlans").find({}).sort({ order: 1 }).toArray();
    return NextResponse.json({ plans: plans.length ? plans.map(({ _id, ...plan }) => plan) : defaults });
  } catch (error) {
    if (error instanceof DatabaseConnectionError) return NextResponse.json({ plans: defaults });
    return NextResponse.json({ error: "Unable to load pricing." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  try {
    const body = await request.json();
    if (!Array.isArray(body.plans) || body.plans.length !== 4) return NextResponse.json({ error: "Four pricing plans are required." }, { status: 400 });
    const plans = body.plans.map((plan: Record<string, unknown>, order: number) => ({
      name: typeof plan.name === "string" ? plan.name : "",
      originalPrice: Number(plan.originalPrice) || undefined,
      offerPrice: Number(plan.offerPrice) || undefined,
      priceLabel: typeof plan.priceLabel === "string" ? plan.priceLabel.trim() : undefined,
      unit: plan.unit === "/month" ? "/month" : "/project",
      order
    }));
    if (plans.some((plan: { name: string }) => !plan.name)) return NextResponse.json({ error: "Each plan needs a name." }, { status: 400 });
    const db = await getMongoDb();
    await db.collection("pricingPlans").deleteMany({});
    await db.collection("pricingPlans").insertMany(plans);
    return NextResponse.json({ plans });
  } catch (error) {
    return NextResponse.json({ error: error instanceof DatabaseConnectionError ? error.message : "Unable to save pricing." }, { status: 500 });
  }
}

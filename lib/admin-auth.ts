import type { NextRequest } from "next/server";

export function isAuthorizedAdmin(request: NextRequest) {
  const token = process.env.ADMIN_TOKEN;
  const authorization = request.headers.get("authorization");

  return Boolean(token && authorization === `Bearer ${token}`);
}

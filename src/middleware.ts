import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const user_agent = userAgent(request);

  const headers = new Headers(request.headers);
  headers.set("user_agent", user_agent.ua);

  return NextResponse.next({ headers });
}

export const config = {
  matcher: ["/user-agent"],
};

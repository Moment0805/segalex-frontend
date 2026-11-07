import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const prototypePassword = process.env.PROTOTYPE_PASSWORD;

  // If no password gate is configured in env, allow all traffic
  if (!prototypePassword) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Allow static files, api, gate page, and brand assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/brand") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/videos") ||
    pathname === "/gate" ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Check cookie
  const cookiePassword = request.cookies.get("proto_pass")?.value;
  if (cookiePassword === prototypePassword) {
    return NextResponse.next();
  }

  // Redirect to password gate
  const url = request.nextUrl.clone();
  url.pathname = "/gate";
  url.searchParams.set("redirect", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};


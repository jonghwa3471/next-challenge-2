import getSession from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

const publicUrls = new Set(["/create-account", "/login"]);

export async function middleware(request: NextRequest) {
  const isPublicPath = publicUrls.has(request.nextUrl.pathname);
  const isLoggedIn = Boolean((await getSession()).id);

  if (!isLoggedIn && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && isPublicPath) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

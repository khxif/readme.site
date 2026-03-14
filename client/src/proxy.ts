import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const hostname = host.split(":")[0];

  const parts = hostname.split(".");

  let subdomain: string | null = null;

  if (hostname.includes("localhost")) {
    // abc.localhost
    if (parts.length > 1) subdomain = parts[0];
  } 
  else if (!hostname.endsWith("vercel.app")) {
    // production domain: abc.myapp.com
    if (parts.length > 2) subdomain = parts[0];
  }

  // Ignore main domain
  if (!subdomain || subdomain === "www") {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = `/${subdomain}${url.pathname}`;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
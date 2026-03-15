import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const hostname = host.split(":")[0];

  const parts = hostname.split(".");
  let subdomain: string | null = null;

  // localhost → abc.localhost:3000
  if (hostname.includes("localhost")) {
    if (parts.length > 1) subdomain = parts[0];
  }

  // vercel preview → abc.project.vercel.app
  else if (hostname.endsWith("vercel.app")) {
    if (parts.length > 3) subdomain = parts[0];
  }

  // custom domain → abc.domain.com
  else {
    if (parts.length > 2) subdomain = parts[0];
  }

  // ignore root
  if (!subdomain || subdomain === "www") {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = `/${subdomain}${url.pathname}`;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!api|_next|_static|_vercel|favicon.ico).*)",
  ],
};
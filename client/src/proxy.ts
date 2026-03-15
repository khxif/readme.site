import { NextRequest, NextResponse } from "next/server";

const ROOT_DOMAIN =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN || "vercel.app";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const hostname = host.split(":")[0];

  let subdomain: string | null = null;

  // localhost (tenant.localhost:3000)
  if (hostname.includes("localhost")) {
    const parts = hostname.split(".");
    if (parts.length > 1) subdomain = parts[0];
  }

  // production / vercel
  else if (hostname.endsWith(ROOT_DOMAIN)) {
    subdomain = hostname.replace(`.${ROOT_DOMAIN}`, "");
  }

  // custom domains
  else {
    const parts = hostname.split(".");
    if (parts.length > 2) subdomain = parts[0];
  }

  // root domain
  if (!subdomain || subdomain === "www" || subdomain === ROOT_DOMAIN) {
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
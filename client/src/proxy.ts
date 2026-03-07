import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const host = req.headers.get('host') || '';
  const subdomain = host.split('.')[0];

  if (subdomain === 'localhost' || subdomain === 'www') return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${subdomain}${url.pathname}`;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};

import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib";

export async function middleware(request: NextRequest) {
  const session = request.cookies.has('session')

  if (session && (request.nextUrl.pathname === "/")) {
   return NextResponse.redirect(new URL('/dashboard', request.url))
  } else if (!session && (request.nextUrl.pathname !== "/") && (request.nextUrl.pathname !== "/signup")) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

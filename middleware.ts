import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
<<<<<<< HEAD
  const session = request.cookies.has('session')
  if (session && (request.nextUrl.pathname === "/")) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  } else if (!session && (request.nextUrl.pathname !== "/") && (request.nextUrl.pathname !== "/signup")) {
=======
  const user = request.cookies.has('user')
  if (user && (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/signup")) {
   return NextResponse.redirect(new URL('/accueil', request.url))
  } else if (!user && (request.nextUrl.pathname !== "/") && (request.nextUrl.pathname !== "/signup")) {
>>>>>>> develop
    return NextResponse.redirect(new URL('/', request.url))
  }
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

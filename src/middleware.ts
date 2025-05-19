import { NextRequest, NextResponse } from 'next/server'
import { validUUID } from './helpers/uuid'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const uuid = pathname.split('/')[2]

  // Redirect the student to the dashboard if he have an uuid in the URL
  if (
    (pathname.includes('dashboard') && pathname !== '/dashboard') ||
    (pathname.includes('category') && pathname !== '/category' && validUUID(uuid))
  ) {
    if (validUUID(uuid)) {
      return
    } else {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Check if the user cookie exists
  const user = request.cookies.get('user')

  // Redirect the user to the login page if the user cookie does not exist
  if (user && (pathname === '/' || pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/sessions', request.url))
  } else if (!user && pathname !== '/' && pathname !== '/sign-up') {
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

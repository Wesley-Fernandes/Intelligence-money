import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (request.nextUrl.pathname === "/auth/logout") {
    const response = NextResponse.redirect(new URL('/', request.url));
    
    response.cookies.delete({
      name: "token",
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    });

    response.headers.set('Cache-Control', 'no-store, max-age=0');

    return response;
  }

  if (!token || token === undefined) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/auth/:path*', '/api/auth/:path*'],
}
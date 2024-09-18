import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {

    const token = cookies().get('token');

    if(!token){
        return NextResponse.redirect(new URL('/', request.url))
    }

    if(!token.value){
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}
 

export const config = {
  matcher: ['/auth/:path*', '/api/auth/:path*'],
}
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {

    const token = cookies().get('token')?.value;



    if(request.nextUrl.pathname === "/auth/logout"){
      console.log(request.nextUrl.pathname)
      NextResponse.next().cookies.set("token", "")
      return NextResponse.redirect(new URL('/', request.url));
    }

    if(!token){
      return NextResponse.redirect(new URL('/', request.url))
    }
    
    return NextResponse.next()
}
 

export const config = {
  matcher: ['/auth/:path*', '/api/auth/:path*'],
}
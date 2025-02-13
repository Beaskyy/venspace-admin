
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as cookie from 'cookie';

export function middleware(request: NextRequest) {
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  
  // Check if the token cookie exists
  const token = cookies.token;

  // If the token does not exist, redirect to the login page
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login'; // Change to your login page path
    return NextResponse.redirect(url);
  }

  // If the token exists, continue to the requested page
  return NextResponse.next();
}

// Apply the middleware to specific paths (like protected routes)
export const config = {
  matcher: ['/dashboard/:path*'], // Change this to match your protected routes
};

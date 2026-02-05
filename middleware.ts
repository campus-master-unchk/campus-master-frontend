import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get('user');
  const { pathname } = request.nextUrl;

  // 1. Si l'utilisateur n'est pas connecté et tente d'accéder au dashboard
  if (!userCookie && (pathname.startsWith('/admin') || pathname.startsWith('/teacher') || pathname.startsWith('/student'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 2. Si l'utilisateur est connecté
  if (userCookie) {
    try {
      const user = JSON.parse(userCookie.value);
      
      // Empêcher l'accès aux dossiers des autres rôles
      if (pathname.startsWith('/admin') && user.user_type !== 'admin') {
        return NextResponse.redirect(new URL(`/${user.user_type}`, request.url));
      }
      if (pathname.startsWith('/teacher') && user.user_type !== 'teacher') {
        return NextResponse.redirect(new URL(`/${user.user_type}`, request.url));
      }
      if (pathname.startsWith('/student') && user.user_type !== 'student') {
        return NextResponse.redirect(new URL(`/${user.user_type}`, request.url));
      }

      // Rediriger vers son dashboard s'il tente d'aller sur la page de login
      if (pathname === '/') {
        return NextResponse.redirect(new URL(`/${user.user_type}`, request.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
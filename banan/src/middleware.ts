import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Získání cookies
  const userCookie = req.cookies.get('user');

  if (!userCookie || !userCookie.value) {
    // Přesměrování na login, pokud cookie neexistuje
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  try {
    // Parsování uživatelských dat z cookies
    const user = JSON.parse(userCookie.value);

    if (!user || !user.id) {
      throw new Error('Invalid user data');
    }
  } catch (error) {
    console.error('Error parsing user cookie:', error);

    // Přesměrování na login při chybě
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  // Pokud je vše v pořádku, pokračujeme
  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*'], // Middleware funguje pouze pro cesty začínající `/app/`
};

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { generateLoginUrl } from "./utils";

const ACCESS_TOKEN = 'access_token';
const ID_TOKEN = 'id_token';


// the following code is taken from : https://nextjs.org/docs/advanced-features/middleware#setting-headers
export function middleware(request: NextRequest) {
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers);
  const {  nextUrl } = request;
  const urlParams = nextUrl.searchParams;
  const albumTitle = urlParams.get("album");
  const accessToken = urlParams.get(ACCESS_TOKEN);
  const idToken = urlParams.get(ID_TOKEN);

  requestHeaders.set("x-origin", nextUrl.origin);
  requestHeaders.set('x-pathname', nextUrl.pathname);

  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  // clear cookies on login
  if (nextUrl.pathname === '/login' || nextUrl.pathname === '/logout' || nextUrl.pathname === '/') {
    request.cookies.delete('access_token')
    request.cookies.delete('id_token')

    response.cookies.delete('access_token')
    response.cookies.delete('id_token')

  }

  if (albumTitle) {
    response.cookies.set('album_title', albumTitle)
  }

  const oneHr = 60 * 60 * 1000;

  if (accessToken && idToken) {
    response.cookies.set(ID_TOKEN, idToken, { expires: Date.now() + oneHr })
    response.cookies.set(ACCESS_TOKEN, accessToken, { expires: Date.now() + oneHr });
  }

  return response;
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

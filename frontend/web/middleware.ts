import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  // Splash screen sempre pode ser acessada
  if (path === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/home", req.url));
    } else {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // Rotas autenticadas
  const protectedPaths = ["/home", "/harvester", "/alerts", "/dashboard", "/harvestForecast", "/land", "/profile", "/reports", "/sensors"];
  if (protectedPaths.some((p) => path.startsWith(p)) && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home/:path*", "/dashboard/:path*"],
};

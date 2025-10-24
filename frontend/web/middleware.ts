import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  // Páginas públicas
  const publicPaths = ["/", "/auth/login", "/auth/register"];
  if (publicPaths.includes(path)) {
    if (path === "/" && token) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
    return NextResponse.next();
  }

  // Rotas protegidas
  const protectedPaths = [
    "/home",
    "/harvester",
    "/alerts",
    "/dashboard",
    "/harvestForecast",
    "/land",
    "/profile",
    "/reports",
    "/sensors",
  ];
  if (protectedPaths.some((p) => path.startsWith(p)) && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/home/:path*",
    "/harvester/:path*",
    "/alerts/:path*",
    "/dashboard/:path*",
    "/harvestForecast/:path*",
    "/land/:path*",
    "/profile/:path*",
    "/reports/:path*",
    "/sensors/:path*",
  ],
};

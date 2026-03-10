import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/response";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    if (path.startsWith("/portal/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/portal/dashboard", req.url));
    }

    if (path.startsWith("/portal/hr") && token?.role !== "hr" && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/portal/dashboard", req.url));
    }

    if (path.startsWith("/portal/candidate") && token?.role !== "candidate") {
      return NextResponse.redirect(new URL("/portal/dashboard", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/portal/login",
    },
  }
);

export const config = {
  matcher: [
    "/portal/dashboard/:path*",
    "/portal/admin/:path*",
    "/portal/hr/:path*",
    "/portal/candidate/:path*",
  ],
};

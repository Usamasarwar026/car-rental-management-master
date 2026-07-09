import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const user = req.nextauth?.token;

    if (!user || !user.role) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const pathname = req.nextUrl.pathname;

    if (user.role === "ADMIN") {
      return NextResponse.next();
    }

    const allowedUserPaths = [
      "/dashboard/assets",
      "/dashboard/booking",
      "/dashboard/bookCar",
      "/dashboard/settings",
      "/dashboard/bookForm",
      "/dashboard/invoice",
    ];

    if (pathname.startsWith("/dashboard") && user.role === "USER") {
      if (!allowedUserPaths.includes(pathname)) {
        return NextResponse.redirect(new URL("/dashboard/booking", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*"],
};

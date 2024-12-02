import { NextRequest, NextResponse } from "next/server";

const middleware = (request: NextRequest) => {
  const token = request.cookies.get("next-auth.session-token");
  const currentUrl = request.nextUrl.pathname;

  if (
    (token && currentUrl === "/auth/register") ||
    (token && currentUrl === "/auth/login")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && currentUrl !== "/auth/register") {
    return NextResponse.rewrite(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
};

export default middleware;

export const config = {
  matcher: ["/client", "/", "/dashboard", "/auth/register", "/auth/login"],
};

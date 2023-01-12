import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0/edge";

export async function middleware(req: any) {
  const res = NextResponse.next();
  const ses = await getSession(req, res);
  console.log(ses?.user.email);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};

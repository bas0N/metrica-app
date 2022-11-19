// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { NextApiRequest } from "next";
import { hasCookie } from "cookies-next";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log(request.url);

  console.log("cookies2");
  //console.log(request.cookies);
  //???????
  ///??????????
  // console.log("has cookie: ", hasCookie("appSession"));
  // if (hasCookie("appSession")) {
  //   console.log("redirect");
  //   return NextResponse.redirect(
  //     new URL("http://localhost:3000/", request.url)
  //   );
  // }
  //if includes api in url
  //get token and attach it to the request
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};

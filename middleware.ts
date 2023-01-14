import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0/edge";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const ses = await getSession(req, res);
  console.log(ses?.user.email);
  console.log(ses?.accessToken);
  if (ses?.accessToken) {
    //ask server about payment details of this particular user

    const response = await fetch(
      "http://localhost:3001/users/check-if-payment-needed",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ses.accessToken}`,
        },
      }
    );
    const { paymentNeeded } = await response.json();
    if (paymentNeeded) {
      //something can be added to url to indicate that pricing is really needed
      return NextResponse.redirect(
        "http://localhost:3000/pricing?paymentNeeded=true"
      );
    }
  }

  //Do nothing
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};

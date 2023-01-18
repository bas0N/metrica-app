import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0/edge";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  console.log(req.url);
  const ses = await getSession(req, res);
  console.log(ses?.user.email);
  //console.log(ses?.accessToken);
  if (ses?.accessToken) {
    //ask server about payment details of this particular user

    const response = await fetch(
      "http://localhost:3001/users/check-if-payment-config-needed",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ses.accessToken}`,
        },
      }
    );

    const { paymentNeeded, configNeeded } = await response.json();
    console.log(
      "payment needed:",
      paymentNeeded,
      "config needed:",
      configNeeded,
      "url: ",
      req.url
    );
    // const { paymentNeeded } = await response.json();
    if (paymentNeeded && !req.url.includes("http://localhost:3002/pricing")) {
      return NextResponse.redirect("http://localhost:3002/pricing");

      //something can be added to url to indicate that pricing is really needed
    }
    if (!paymentNeeded && req.url.includes("http://localhost:3002/pricing")) {
      return NextResponse.redirect("http://localhost:3002/dashboard");

      //something can be added to url to indicate that pricing is really needed
    }
    if (configNeeded && !req.url.includes("http://localhost:3002/pricing")) {
      return NextResponse.redirect("http://localhost:3002/configure");
    }
    if (!configNeeded && !req.url.includes("http://localhost:3002/dashboard")) {
      return NextResponse.redirect("http://localhost:3002/dashboard");
    }
  } else {
    return NextResponse.redirect("http://localhost:3002/api/auth/login");
  }

  //Do nothing
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/pricing/:path*",
    "/buy/success/:path*",
    "/buy/configure/:path*",
  ],
};

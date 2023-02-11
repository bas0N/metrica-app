import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0/edge";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  console.log(req.url);
  const ses = await getSession(req, res);
  console.log(ses?.user.email);
  //console.log(ses?.accessToken);
  if (ses?.accessToken) {
    // console.log(ses?.accessToken);
    //ask server about payment details of this particular user
    // console.log("prit url", process.env.NEXT_PUBLIC_BACKEND_URL);
    // console.log(
    //   process.env.NEXT_PUBLIC_BACKEND_URL +
    //     "/users/check-if-payment-config-needed"
    // );
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/check-if-payment-config-needed`,
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
    // console.log(process.env.NEXT_PUBLIC_APP_URL + "/pricing");
    // console.log(process.env.NEXT_PUBLIC_APP_URL + "/dashboard");
    // const { paymentNeeded } = await response.json();
    if (paymentNeeded && !req.url.includes("/pricing")) {
      console.log("1");
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_APP_URL + "/pricing"
      );

      //something can be added to url to indicate that pricing is really needed
    }
    if (!paymentNeeded && req.url.includes("/pricing")) {
      console.log("2");
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_APP_URL + "/dashboard"
      );

      //something can be added to url to indicate that pricing is really needed
    }
    if (configNeeded && !req.url.includes("/pricing")) {
      console.log("3");
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_APP_URL + "/configure"
      );
    }
    if (!configNeeded && !req.url.includes("/dashboard")) {
      console.log("4");
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_APP_URL + "/dashboard"
      );
    }
  } else {
    console.log("5");
    return NextResponse.redirect(
      process.env.NEXT_PUBLIC_APP_URL + "/api/auth/login"
    );
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

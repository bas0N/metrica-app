import { Button } from "@nextui-org/react";
import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { loadStripe } from "@stripe/stripe-js";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { getAccessToken } from "@auth0/nextjs-auth0";

const stripePromise = loadStripe(
  "pk_test_51MN42aGl8yFTD812BMhMCUuK59UA2fr5aqFGpVZUzlFXxZM1O3SPWQcODSC2SUdQmNarmyAGPyUCbeeFv0ebQt6T00o1L2wQQY"
);
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { accessToken } = await getAccessToken(context.req, context.res);

  const res = await fetch(
    `${process.env.BACKEND_URL}/payment/get-all-products`
  );
  const products = await res.json();
  return {
    props: { products, accessToken },
  };
}

function index({
  products,
  accessToken,
}: {
  products: any;
  accessToken: string;
}) {
  const router = useRouter();

  const handleBuy = async (event: any) => {
    console.log(event.target.value);
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ productId: event.target.value }),
      });
      console.log(res);
      const resJSON = await res.json();
      router.push(resJSON.url);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="h-screen flex">
      {products.data.map((product: any) => (
        <Button
          value={product.default_price}
          className="bg-green-500 hover:bg-green-500/50"
          onClick={handleBuy}
        >
          {product.name}
        </Button>
      ))}
    </div>
  );
}
index.PageLayout = DashboardLayout;

export default index;

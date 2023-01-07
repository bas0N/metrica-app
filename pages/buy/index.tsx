import { Button } from "@nextui-org/react";
import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { loadStripe } from "@stripe/stripe-js";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

const stripePromise = loadStripe(
  "pk_test_51MN42aGl8yFTD812BMhMCUuK59UA2fr5aqFGpVZUzlFXxZM1O3SPWQcODSC2SUdQmNarmyAGPyUCbeeFv0ebQt6T00o1L2wQQY"
);
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch(`http://localhost:3001/payment/get-all-products`);
  const products = await res.json();
  return {
    props: { products },
  };
}
function index({ products }: { products: any }) {
  const router = useRouter();

  const handleBuy = async (event: any) => {
    console.log(event.target.value);
    const res = await fetch(`http://localhost:3001/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: event.target.value }),
    });
    const resJSON = await res.json();
    router.push(resJSON.url);
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

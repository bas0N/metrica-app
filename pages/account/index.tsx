import {
  Button,
  Card,
  FormElement,
  Input,
  Text,
  Row,
  Col,
  User,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { GetServerSidePropsContext } from "next";
import { getAccessToken } from "@auth0/nextjs-auth0";
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { accessToken } = await getAccessToken(context.req, context.res, {
    scopes: ["openid", "profile", "email"],
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(accessToken);
  const me = await res.json();
  console.log(me);
  return {
    props: { me },
  };
}
function index({ me }: { me: any }) {
  return (
    <div className="  items-center justify-center">
      <Text className="text-4xl sm:text-5xl lg:col-span-2  font-bold">
        Account
      </Text>
      <div className=" lg:h-1/2 grid grid-cols-1  gap-2 lg:grid-cols-3 p-4">
        <Card className="border-0 row-span-1" isHoverable>
          <Card.Header>
            <Text className="text-green-500" b>
              Account
            </Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body className="flex">
            <User
              className="self-start text-green-500 w-full pb-4 "
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              name="Ariana Wattson"
              description={`${me.email}`}
            ></User>
            <Card.Divider />

            <div className="self-center items-center h-full pt-4 flex">
              <Text className="text-2xl" b>
                Company:
              </Text>
              <Text className="font-light text-xl ml-2">{me.companyName}</Text>
            </div>
          </Card.Body>
          <Card.Divider />
        </Card>

        <Card className="border-0 " isHoverable>
          <Card.Header>
            <Text className="text-green-500" b>
              Chosen plan
            </Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body css={{ py: "$10" }}>
            <Text>The currently choosen plan is:</Text>
          </Card.Body>
          <Card.Divider />
          <Card.Footer>
            <Row justify="center">
              <Button size="sm">Chceck plans</Button>
            </Row>
          </Card.Footer>
        </Card>
        <Card className="border-0 " isHoverable>
          <Card.Header>
            <Text className="text-green-500" b>
              Payment
            </Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body className="flex">
            <div className="pb-2">
              <Text className="text-2xl" b>
                Last payment:
              </Text>
              <Text className="font-light text-xl">
                {me.lastPayment.slice(0, 10)}
              </Text>
            </div>
            <Card.Divider />
            <div className="pt-2">
              <Text className="text-2xl" b>
                Next payment:
              </Text>
              <Text className="font-light text-xl">
                {me.nextPayment.slice(0, 10)}
              </Text>
            </div>
          </Card.Body>
          <Card.Divider />
        </Card>
        <Card className="border-0 lg:col-span-2" isHoverable>
          <Card.Header>
            <Text className="text-green-500" b>
              Stats
            </Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body css={{ py: "$10" }}>
            <Text>To be added</Text>
          </Card.Body>
          <Card.Divider />
        </Card>
        <Card.Image
          className="p-5"
          src="https://drive.google.com/uc?export=view&id=1dozKTbPG0g6hgbMbGpVmw5NAkjCjODjG"
          alt="Card image background"
          objectFit="contain"
        />
      </div>
    </div>
  );
}
index.PageLayout = DashboardLayout;

export default index;

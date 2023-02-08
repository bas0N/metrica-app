import { Button, FormElement, Input, Text } from "@nextui-org/react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/layout/DashboardLayout";
function index() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const sendCompanyName = async () => {
    console.log(companyName);
    const resAccessToken = await fetch(
      `http://localhost:3002/api/auth/getAccessToken`
    );
    const { token } = await resAccessToken.json();
    const response = await fetch(
      `http://localhost:3001/users/set-company-name`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.accessToken}`,
        },
        body: JSON.stringify({ companyName }),
      }
    );
    const responseJSON = await response.json();
    //if success, redirect
    router.push("/dashboard");
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col h-1/2  ">
        <img
          className="w-[70%] lg:w-[60%] mx-auto"
          src="https://drive.google.com/uc?export=view&id=1dozKTbPG0g6hgbMbGpVmw5NAkjCjODjG"
        />

        <div className=" w-2/3 lg:w-1/2 self-center flex flex-col mt-10 ">
          <Text className="text-2xl font-light">
            Set the name of yout company:
          </Text>
          <Input
            onChange={(event: React.ChangeEvent<FormElement>) =>
              setCompanyName(event.target.value)
            }
            value={companyName}
            className="w-full "
            name="recruitmentId"
            underlined
            color="default"
          />
          <Button
            onClick={sendCompanyName}
            shadow
            auto
            color="success"
            className="bg-green-500 mt-4"
            href="/"
          >
            Get started
          </Button>
        </div>
      </div>
    </div>
  );
}
index.PageLayout = DashboardLayout;

export default index;

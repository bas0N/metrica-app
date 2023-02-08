import { Button, FormElement, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/layout/DashboardLayout";
function index() {
  const router = useRouter();

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col h-1/2  ">
        <img
          className="w-[70%] lg:w-[60%] mx-auto"
          src="https://drive.google.com/uc?export=view&id=1dozKTbPG0g6hgbMbGpVmw5NAkjCjODjG"
        />

        <div className=" w-2/3 lg:w-1/2 self-center flex flex-col mt-10 ">
          Account
        </div>
        <div className=" w-2/3 lg:w-1/2 self-center flex flex-col mt-10 ">
          Account owner details
        </div>
        <div className=" w-2/3 lg:w-1/2 self-center flex flex-col mt-10 ">
          Company name
        </div>
        <div className=" w-2/3 lg:w-1/2 self-center flex flex-col mt-10 ">
          Plan details
        </div>
        <div className=" w-2/3 lg:w-1/2 self-center flex flex-col mt-10 ">
          Last payment, next payment
        </div>
        <div className=" w-2/3 lg:w-1/2 self-center flex flex-col mt-10 ">
          Recruitment statss
        </div>
      </div>
    </div>
  );
}
index.PageLayout = DashboardLayout;

export default index;

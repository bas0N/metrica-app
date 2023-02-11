import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import SendFormToApplicant from "../../components/dashboard/SendForm";
import { Recruitment } from "../../types/recruitment";
import { GetServerSidePropsContext } from "next";
import { getAccessToken } from "@auth0/nextjs-auth0";
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { accessToken } = await getAccessToken(context.req, context.res);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/recruitment/getAllRecruitments`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const recruitments: Array<Recruitment> = await res.json();
  return {
    props: { recruitments },
  };
}
function SendForm({ recruitments }: { recruitments: Recruitment[] }) {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  // useEffect(() => {
  //   if (!user) {
  //     router.replace("/");
  //   }
  // }, [user]);
  if (isLoading) {
    //add isLoading component
    return <div></div>;
  } else if (user) {
    return <SendFormToApplicant recruitments={recruitments} />;
  } else if (!user) {
    router.replace("/");
  }
}
SendForm.PageLayout = DashboardLayout;
export default SendForm;

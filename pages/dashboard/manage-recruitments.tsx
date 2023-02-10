import { getAccessToken } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AddRecruitment from "../../components/dashboard/AddRecruitment";
import AllRecruitments from "../../components/dashboard/AllRecruitments";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Recruitment } from "../../types/recruitment";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { accessToken } = await getAccessToken(context.req, context.res);
  const res = await fetch(
    `${process.env.BACKEND_URL}/recruitment/getAllRecruitments`,
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
function ManageRecruitments({ recruitments }: { recruitments: Recruitment[] }) {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) {
    return <div></div>;
  } else if (user) {
    return <AllRecruitments recruitments={recruitments} />;
  } else if (!user) {
    router.replace("/");
  }
}

ManageRecruitments.PageLayout = DashboardLayout;
export default ManageRecruitments;

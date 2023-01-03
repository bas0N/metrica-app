import { getAccessToken, useUser } from "@auth0/nextjs-auth0";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AddRecruitment from "../../components/dashboard/AddRecruitment";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Recruitment } from "../../types/recruitment";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { accessToken } = await getAccessToken(context.req, context.res);
  const res = await fetch(
    `http://localhost:3001/recruitment/getAllRecruitments`,
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
    return <AddRecruitment recruitments={recruitments} />;
  } else if (!user) {
    router.replace("/");
  }
}

ManageRecruitments.PageLayout = DashboardLayout;
export default ManageRecruitments;

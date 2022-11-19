import { useUser } from "@auth0/nextjs-auth0";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AddRecruitment from "../../components/dashboard/AddRecruitment";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Recruitment } from "../../types/recruitment";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch(
    `http://localhost:3001/recruitment/getAllRecruitments`
  );
  const recruitments: Array<Recruitment> = await res.json();

  return {
    props: { recruitments },
  };
}
function ManageRecruitments({ recruitments }: { recruitments: Recruitment[] }) {
  //const { user, error, isLoading } = useUser();
  // useEffect(() => {
  //   if (!user) {
  //     console.log(user);
  //     console.log("redirect z page-a bo nie bylo usera");
  //     // router.replace("/");
  //   }
  // }, [user]);
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

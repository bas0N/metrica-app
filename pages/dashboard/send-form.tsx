import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import SendFormToApplicant from "../../components/dashboard/SendForm";
import { Recruitment } from "../../types/recruitment";
import { GetServerSidePropsContext } from "next";
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch(
    `http://localhost:3001/recruitment/getAllRecruitments`
  );
  const recruitments: Array<Recruitment> = await res.json();
  return {
    props: { recruitments },
  };
}
function SendForm({ recruitments }: { recruitments: Recruitment[] }) {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user]);
  if (isLoading) {
    return <div></div>;
  } else if (user) {
    return <SendFormToApplicant recruitments={recruitments} />;
  } else if (!user) {
    router.replace("/");
  }
}
SendForm.PageLayout = DashboardLayout;
export default SendForm;

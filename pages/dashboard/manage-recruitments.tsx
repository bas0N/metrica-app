import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

function ManageRecruitments() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user]);
  return <div>manage recruitments</div>;
}
ManageRecruitments.PageLayout = DashboardLayout;
export default ManageRecruitments;

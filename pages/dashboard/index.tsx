import { useUser } from "@auth0/nextjs-auth0";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HistoryTable from "../../components/dashboard/HistoryTable";
import HistoryTableMobile from "../../components/dashboard/HistoryTableMobile";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { GetSurveysPaginated, Survey } from "../../types/survey";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if ("appSession" in context.req.cookies) {
    try {
      //const res = await fetch(`http://localhost:3001/survey/getSurveys`);
      //const surveys: Array<Survey> = await res.json();
      const res = await fetch(
        `http://localhost:3001/survey/getSurveysPaginated/1`
      );
      let { surveys, pagesAvailable, totalItems }: GetSurveysPaginated =
        await res.json();
      //in case no elements are there
      surveys = surveys ? surveys : [];
      pagesAvailable = pagesAvailable ? pagesAvailable : 0;
      totalItems = totalItems ? totalItems : 0;
      return { props: { surveys, pagesAvailable, totalItems } };
    } catch (err) {
      console.log(err);
    }

    return { props: {} };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
}
function index({
  surveys,
  pagesAvailable,
  totalItems,
}: {
  surveys: Survey[];
  pagesAvailable: number;
  totalItems: number;
}) {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    /* Inside of a "useEffect" hook add an event listener that updates
         the "width" state variable when the window size changes */
    window.innerWidth < 620 ? setMobile(true) : setMobile(false);

    window.addEventListener("resize", () => {
      console.log("width is: ", window.innerWidth);
      window.innerWidth < 620 ? setMobile(true) : setMobile(false);
    });
    /* passing an empty array as the dependencies of the effect will cause this
         effect to only run when the component mounts, and not each time it updates.
         We only want the listener to be added once */
  }, []);
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <div></div>;
  } else if (user) {
    if (!mobile) {
      return (
        <div className="">
          <HistoryTable
            surveys={surveys}
            pagesAvailable={pagesAvailable}
            totalItems={totalItems}
          />
        </div>
      );
    } else {
      return (
        <HistoryTableMobile
          surveys={surveys}
          pagesAvailable={pagesAvailable}
          totalItems={totalItems}
        />
      );
    }
  } else if (!user) {
    console.log("nie ma usera w dashboardzie");
    router.replace("http://localhost:3000/");
  }
}

index.PageLayout = DashboardLayout;
export default index;

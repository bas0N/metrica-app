import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Survey } from "../../../types/survey";
import { Button } from "@nextui-org/react";
import ConfirmationModal from "../../../components/modals/ConfirmationModal";
import { GetServerSidePropsContext } from "next";
export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (context.params?.recruitmentId) {
    const res = await fetch(
      `http://localhost:3001/survey/${context.params.recruitmentId}`
    );
    if (res.status == 400 || res.status == 500) {
      console.log("error while fetching form data");
      return {
        props: {},
      };
    }

    //add types
    const survey: Survey = await res.json();
    console.log("STATUS", survey.surveyStatus);

    // if (survey.surveyStatus == 0) {
    //   console.log("filled already");
    //   //means that the survey has been filled already
    //   return {
    //     props: { 0} ,
    //   };
    // }
    return {
      props: { survey },
    };
  }
}
function InitForm({ survey }: { survey: any | undefined }) {
  const [formId, setFormId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const { recruitmentId } = router.query;
    setFormId(JSON.stringify(recruitmentId!));
    console.log(JSON.stringify(recruitmentId!));
    //check if exists in the db and is available; else redirect
  });
  const handleSubmit = async () => {
    try {
      // const res = await fetch(
      //   `http://localhost:3001/survey/${router.query.recruitmentId}`
      // );
      //console.log(await res);
      router.replace(
        `http://localhost:3002/form/fill-form/${router.query.recruitmentId}`
      );
    } catch (e) {
      console.dir(e);
      console.log(e.error);
    }
  };
  const handleCancel = () => {
    router.replace("http://localhost:3000/");
  };
  if (survey.surveyStatus == 1) {
    return (
      <div className="flex flex-col justify-center items-center h-screen mx-3">
        <div className="grid sm:grid-cols-2">
          <div className=" flex justify-center items-center">
            <img
              className="lg:w-[70%] mx-auto"
              src="https://drive.google.com/uc?export=view&id=1dozKTbPG0g6hgbMbGpVmw5NAkjCjODjG"
            />
          </div>
          <div>
            <h1 className=" text-6xl sm:text-7xl my-10">{`Dear ${survey.candidateFirstName}`}</h1>
            <h2 className="flex gap-1 mb-7">
              Thank you for applying as:
              <p className="font-bold">{survey.recruitment.recruitmentName}</p>
            </h2>
            <p className=" mb-8 ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <h4 className="font-bold mb-2">
              Questionaire deadline: {survey.recruitment.recruitmentDeadline}
            </h4>
            <div className="flex gap-3">
              <ConfirmationModal
                confirmationPrompt="Are you sure you want to cancel?"
                buttonTitle="Try later"
                buttonType="CANCEL"
                funct={handleCancel}
              />
              <ConfirmationModal
                confirmationPrompt="This page will take you directly to the questionaire. Are you sure you want to proceed?"
                buttonTitle="Start"
                buttonType="CONFIRM"
                funct={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center h-screen mx-3">
        <div className="grid sm:grid-cols-2">
          <div className=" flex justify-center items-center">
            <img
              className="lg:w-[70%] mx-auto"
              src="https://drive.google.com/uc?export=view&id=1dozKTbPG0g6hgbMbGpVmw5NAkjCjODjG"
            />
          </div>
          <div>
            <h1 className=" text-6xl sm:text-7xl my-10">Hello,</h1>
            <h2 className="flex gap-1 mb-3">
              The following survey has been
              <p className="font-bold">already filled.</p>
            </h2>
            <h2 className="flex gap-1 mb-7">
              Press the button to get redirected to the
              <p className="font-bold">main page.</p>
            </h2>
            <p className=" mb-8 ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>

            <div className="flex gap-3">
              <ConfirmationModal
                confirmationPrompt="Are you sure you want go to the main page?"
                buttonTitle="Go back"
                buttonType="CANCEL"
                funct={() => {
                  router.replace("http://localhost:3000/");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InitForm;

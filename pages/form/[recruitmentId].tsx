import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button } from "@nextui-org/react";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import { GetServerSidePropsContext } from "next";
export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log(context.params?.recruitmentId);
  if (context.params?.recruitmentId) {
    const res = await fetch(
      `http://localhost:3001/survey/${context.params.recruitmentId}`
    );
    if (res.status == 400 || 500) {
      console.log("error");
    }
    //add types
    const user: any = await res.json();
    return {
      props: { user },
    };
  }
  return {
    props: {},
  };
}
function InitForm({ user }: { user: any }) {
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
      const res = await fetch(
        `http://localhost:3001/survey/changeSurveyState`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: "6370918129a3e52f13f54966",
            newStatus: "PENDING",
          }),
        }
      );
      if (res.status == 400 || 500) {
        console.log("error");
      }
      console.log(await res.json());
    } catch (err) {
      console.log(err);
    }
  };
  const handleCancel = () => {
    router.replace("/");
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="grid sm:grid-cols-2">
        <div className=" flex justify-center items-center">
          <img
            className="lg:w-[70%]"
            src="https://drive.google.com/uc?export=view&id=1dozKTbPG0g6hgbMbGpVmw5NAkjCjODjG"
          />
        </div>
        <div>
          <h1 className="text-7xl mb-10">{`Dear ${user.candidateFirstName}`}</h1>
          <h2 className="flex gap-1 mb-7">
            Thank you for applying as:
            <p className="font-bold">{user.recruitment.recruitmentName}</p>
          </h2>
          <p className=" mb-8 ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <h4 className="font-bold mb-2">
            Questionaire deadline: {user.recruitment.recruitmentDeadline}
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
}

export default InitForm;

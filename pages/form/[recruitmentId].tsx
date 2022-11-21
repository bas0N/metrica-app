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
  const handleSubmit = () => {
    router.replace("/form");
  };
  const handleCancel = () => {
    router.replace("/");
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="grid grid-cols-2">
        <div>
          <img
            className="lg:w-[70%]"
            src="https://drive.google.com/uc?export=view&id=1dozKTbPG0g6hgbMbGpVmw5NAkjCjODjG"
          />
        </div>
        <div>
          <h1 className="text-7xl mb-10">{`Dear ${user.candidateFirstName}`}</h1>
          <p>page: {formId}</p>
          <div className="flex gap-3">
            <ConfirmationModal
              confirmationPrompt="Are you sure you want to cancel?"
              buttonTitle="Cancel"
              buttonType="CANCEL"
              funct={handleCancel}
            />
            <ConfirmationModal
              confirmationPrompt="This page will take you directly to the questionaire. Are you sure you want to proceed?"
              buttonTitle="Create"
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

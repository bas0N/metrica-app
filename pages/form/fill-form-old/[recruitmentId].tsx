import {
  Avatar,
  Button,
  Checkbox,
  Container,
  Grid,
  Switch,
  Textarea,
  Tooltip,
  useTheme,
  Text,
  Input,
} from "@nextui-org/react";
import React from "react";
import aws from "../../shared/svg/aws.svg";
import firebase from "../../shared/svg/firebase.svg";
import azure from "../../shared/svg/azure.svg";
import docker from "../../shared/svg/docker.svg";
import nodejs from "../../shared/svg/nodejs.svg";
import { useTheme as useNextTheme } from "next-themes";

import Image from "next/image";
import Technologies from "../../../components/form/Technologies";
import AboutYou from "../../../components/form/AboutYou";
import Links from "../../../components/form/PersonalLinks";
import PersonalLinks from "../../../components/form/PersonalLinks";
import { SelectProps } from "../../../components/input/Select";
import { SurveyStatus, SurveyType } from "../../../types/survey";
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
    const survey: any = await res.json();
    return {
      props: { survey },
    };
  }
  return {
    props: {},
  };
}
function index({ survey }: { survey: any }) {
  // const { setTheme } = useNextTheme();
  // const { isDark, type } = useTheme();
  // <Switch
  //   color="success"
  //   checked={isDark}
  //   onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
  // />;
  const typeOfForm: SurveyType = 1;
  const name: string = "Elon";
  const companyName: string = "Tesla";
  const submitForm = async () => {
    console.log("submit form successfully");
  };
  return (
    <Container>
      <div className=" flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-5xl sm:text-7xl font-bold my-4 ">FORM</h1>
        </div>
        <h3>
          Current form is of type{" "}
          {SurveyType[survey.recruitment.surveyType] + ". "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </h3>
        <h2 className="text-4xl sm:text-6xl font-light mt-6">
          PART 1: Technologies
        </h2>

        <Technologies typeOfForm={survey.recruitment.surveyType} />
        <h2 className="text-4xl sm:text-6xl font-light mt-6">
          PART 2: About You
        </h2>
        <AboutYou />
        <h2 className="text-4xl sm:text-6xl font-light mt-6">PART 3: Links</h2>
        <PersonalLinks />
      </div>
      <div className="w-full flex items-center justify-center">
        {" "}
        <Button
          onClick={submitForm}
          className="my-10 bg-green-500"
          shadow
          color="success"
        >
          Submit
        </Button>
      </div>
    </Container>
  );
}

export default index;
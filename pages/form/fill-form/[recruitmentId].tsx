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
import React, { useState } from "react";
import aws from "../../shared/svg/aws.svg";
import firebase from "../../shared/svg/firebase.svg";
import azure from "../../shared/svg/azure.svg";
import docker from "../../shared/svg/docker.svg";
import nodejs from "../../shared/svg/nodejs.svg";
import { useTheme as useNextTheme } from "next-themes";

import Image from "next/image";
import Technologies2 from "../../../components/form/Technologies2";
import AboutYou from "../../../components/form/AboutYou";
import Links from "../../../components/form/PersonalLinks";
import PersonalLinks from "../../../components/form/PersonalLinks";
import { SelectProps } from "../../../components/input/Select";

import {
  AboutYouSurveyType,
  PersonalLinksSurveyType,
  Survey,
  SurveyStatus,
  SurveyType,
  TechnologiesSurveyType,
} from "../../../types/survey";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
export async function getServerSideProps(context: GetServerSidePropsContext) {
  //get info about the recruitment
  if (context.params?.recruitmentId) {
    const res = await fetch(
      `${process.env.BACKEND_URL}/survey/${context.params.recruitmentId}`
    );
    if (res.status == 400 || 500) {
      console.log("error");
    }
    //add types
    const survey: Survey = await res.json();
    if (survey.surveyStatus == 0) {
      //means that the survey has been filled already
      toast.error("Error. Form has been already filled.", { theme: "dark" });

      return {
        redirect: {
          permanent: false,
          destination: `${process.env.LANDING_URL}`,
        },
        props: {},
      };
    }
    console.log(survey);
    return {
      props: { survey },
    };
  }
  return {
    props: {},
  };
}

function index({ survey }: { survey: any }) {
  const [technologies, setTechnologies] = useState<TechnologiesSurveyType>();
  const [aboutYou, setAboutYou] = useState<AboutYouSurveyType>();
  const [personalLinks, setPersonalLinks] = useState<PersonalLinksSurveyType>();
  const [error, setError] = useState({
    partOneError: false,
    partTwoError: false,
    partThreeError: false,
  });
  const router = useRouter();

  const onSubmit = async () => {
    if (
      technologies?.backend.length == 0 &&
      technologies.databases.length == 0 &&
      technologies.devops.length == 0 &&
      technologies.frontend.length == 0 &&
      technologies.languages.length == 0 &&
      technologies.uxui.length == 0
    ) {
      toast.error("Select at least one technology you know.", {
        theme: "dark",
      });
      return;
    } else {
    }
    if (
      aboutYou?.position.length == 0 ||
      aboutYou?.yearsOfExperience.length == 0 ||
      aboutYou?.description.length == 0
    ) {
      toast.error("Fill the about you part.", { theme: "dark" });
      return;
    } else {
    }
    if (
      personalLinks?.githubUrl.length == 0 ||
      personalLinks?.linkedinUrl.length == 0 ||
      personalLinks?.repositoryUrl.length == 0
    ) {
      toast.error("Fill the personal links part.", { theme: "dark" });
      return;
    } else {
    }

    // success toaster
    const fillForm = await fetch(
      `${process.env.BACKEND_URL}/survey/fillSurvey/${survey._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          technologiesSurvey: technologies,
          aboutYouSurvey: aboutYou,
          personalLinksSurvey: personalLinks,
        }),
      }
    );
    //change status of the survey
    const changeState = await fetch(
      `${process.env.BACKEND_URL}/survey/changeSurveyState`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: survey._id,
          newStatus: "FILLED",
        }),
      }
    );
    if (fillForm.status == 200 && changeState.status == 200) {
      toast.success("Form filled successfully.", { theme: "dark" });
      //redirect to main page
      setTimeout(() => {
        router.push(`${process.env.LANDING_URL}`);
      }, 3000);
      return;
    }
  };
  return (
    <Container>
      <ToastContainer />

      <div className=" flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-5xl sm:text-7xl font-bold my-4 ">FORM</h1>
        </div>
        <h3>
          Current form is of type
          {SurveyType[survey.recruitment.surveyType] + ". "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </h3>
        <h2 className="text-4xl sm:text-6xl font-light mt-6">
          PART 1: Technologies
        </h2>

        <Technologies2
          typeOfForm={survey.recruitment.surveyType}
          setTechnologies={setTechnologies}
        />
        <h2 className="text-4xl sm:text-6xl font-light mt-6">
          PART 2: About You
        </h2>
        <AboutYou setAboutYou={setAboutYou} />
        <h2 className="text-4xl sm:text-6xl font-light mt-6">
          PART 3: Personal links
        </h2>
        <PersonalLinks setPersonalLinks={setPersonalLinks} />
      </div>
      <div className="w-full flex items-center justify-center">
        <Button
          onClick={onSubmit}
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

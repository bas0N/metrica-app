import { Grid, Tooltip } from "@nextui-org/react";
import Image from "next/image";

import React from "react";
import javascript from "../../assets/svg/logos/javascript.svg";
import typescript from "../../assets/svg/logos/typescript-icon.svg";
import go from "../../assets/svg/logos/go.svg";
import python from "../../assets/svg/logos/python.svg";
import java from "../../assets/svg/logos/java.svg";
import react from "../../assets/svg/logos/react.svg";
import vue from "../../assets/svg/logos/vue.svg";
import angular from "../../assets/svg/logos/angular.svg";
import svelte from "../../assets/svg/logos/svelte-icon.svg";
import css from "../../assets/svg/logos/css-3.svg";
import graphql from "../../assets/svg/logos/graphql.svg";
import nodejs from "../../assets/svg/logos/nodejs-icon.svg";
import express from "../../assets/svg/logos/express.svg";
import kafka from "../../assets/svg/logos/kafka-icon.svg";
import nginx from "../../assets/svg/logos/nginx.svg";
//db
import postgresql from "../../assets/svg/logos/postgresql.svg";
import mongodb from "../../assets/svg/logos/mongodb-icon.svg";
import mysql from "../../assets/svg/logos/mysql.svg";
import redis from "../../assets/svg/logos/redis.svg";
import mariadb from "../../assets/svg/logos/mariadb-icon.svg";
//devops
import aws from "../../assets/svg/logos/aws.svg";
import firebase from "../../assets/svg/logos/firebase.svg";
import docker from "../../assets/svg/logos/docker.svg";
import azure from "../../assets/svg/logos/microsoft-azure.svg";
import kubernetes from "../../assets/svg/logos/kubernetes.svg";

//uxui
import figma from "../../assets/svg/logos/figma.svg";
import adobeXd from "../../assets/svg/logos/adobe-xd.svg";
import sketch from "../../assets/svg/logos/sketch.svg";
import adobeIlustrator from "../../assets/svg/logos/adobe-illustrator.svg";
import zepelin from "../../assets/svg/logos/zeplin.svg";
import { SurveyType } from "../../types/survey";

function Technologies({ typeOfForm }: { typeOfForm: SurveyType }) {
  return (
    <div className=" flex flex-col  ">
      <div>
        <h2 className="text-3xl mt-10 font-extrabold border-b-2">
          Programming Languages
        </h2>
        <Grid.Container justify="space-around" gap={4}>
          <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
            <Tooltip content={"Developers love Next.js"}>
              <Image width={40} height={40} src={javascript} />
            </Tooltip>{" "}
          </Grid>
          <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
            <Tooltip content={"AWS"}>
              <Image width={40} height={40} src={typescript} />
            </Tooltip>{" "}
          </Grid>
          <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
            <Tooltip content={"Developers love Next.js"}>
              <Image width={40} height={40} src={python} />
            </Tooltip>
          </Grid>

          <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
            <Tooltip content={"Developers love Next.js"}>
              <Image width={40} height={40} src={go} />
            </Tooltip>{" "}
          </Grid>
          <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
            <Tooltip content={"Developers love Next.js"}>
              <Image width={40} height={40} src={java} />
            </Tooltip>{" "}
          </Grid>
        </Grid.Container>
      </div>

      {typeOfForm == SurveyType["FRONTEND"] && (
        <div>
          {" "}
          <h2 className="text-3xl mt-10 font-extrabold border-b-2">Frontend</h2>
          <Grid.Container justify="space-around" gap={4}>
            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"Developers love Next.js"}>
                <Image width={40} height={40} src={react} />
              </Tooltip>{" "}
            </Grid>
            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"Developers love Next.js"}>
                <Image width={40} height={40} src={vue} />
              </Tooltip>{" "}
            </Grid>
            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"Developers love Next.js"}>
                <Image width={40} height={40} src={angular} />
              </Tooltip>{" "}
            </Grid>

            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"Developers love Next.js"}>
                <Image width={40} height={40} src={css} />
              </Tooltip>{" "}
            </Grid>
            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"Developers love Next.js"}>
                <Image width={40} height={40} src={svelte} />
              </Tooltip>{" "}
            </Grid>
          </Grid.Container>
        </div>
      )}
      {typeOfForm == SurveyType["FRONTEND"] && (
        <div>
          <h2 className="text-3xl mt-10 font-extrabold border-b-2">Backend</h2>
          <Grid.Container justify="space-around" gap={4}>
            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"Developers love Next.js"}>
                <Image width={40} height={40} src={nodejs} />
              </Tooltip>{" "}
            </Grid>
            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"Developers love Next.js"}>
                <Image width={40} height={40} src={express} />
              </Tooltip>{" "}
            </Grid>
            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"Developers love Next.js"}>
                <Image width={40} height={40} src={graphql} />
              </Tooltip>{" "}
            </Grid>

            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"Developers love Next.js"}>
                <Image width={40} height={40} src={nginx} />
              </Tooltip>{" "}
            </Grid>
            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"Developers love Next.js"}>
                <Image width={40} height={40} src={kafka} />
              </Tooltip>{" "}
            </Grid>
          </Grid.Container>
        </div>
      )}
      {(typeOfForm == SurveyType["BACKEND"] ||
        typeOfForm == SurveyType["DEVOPS"]) && (
        <div>
          <h2 className="text-3xl mt-10 font-extrabold border-b-2">
            Databases
          </h2>

          <Grid.Container justify="space-around" gap={4}>
            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"AWS"}>
                <Image width={40} height={40} src={postgresql} />
              </Tooltip>{" "}
            </Grid>
            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"AWS"}>
                <Image width={40} height={40} src={mongodb} />
              </Tooltip>{" "}
            </Grid>
            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"AWS"}>
                <Image width={40} height={40} src={mysql} />
              </Tooltip>{" "}
            </Grid>

            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"AWS"}>
                <Image width={40} height={40} src={redis} />
              </Tooltip>{" "}
            </Grid>
            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"AWS"}>
                <Image width={40} height={40} src={mariadb} />
              </Tooltip>{" "}
            </Grid>
          </Grid.Container>
        </div>
      )}

      {typeOfForm == SurveyType["DEVOPS"] && (
        <div>
          <h2 className="text-3xl mt-10 font-extrabold border-b-2">DevOps</h2>
          <Grid.Container justify="space-around" gap={4}>
            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"AWS"}>
                <Image width={40} height={40} src={aws} />
              </Tooltip>
            </Grid>
            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"AWS"}>
                <Image width={40} height={40} src={azure} />
              </Tooltip>
            </Grid>
            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"AWS"}>
                <Image width={40} height={40} src={kubernetes} />
              </Tooltip>{" "}
            </Grid>

            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"AWS"}>
                <Image width={40} height={40} src={firebase} />
              </Tooltip>{" "}
            </Grid>
            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"AWS"}>
                <Image width={40} height={40} src={docker} />
              </Tooltip>{" "}
            </Grid>
          </Grid.Container>
        </div>
      )}
      {typeOfForm == SurveyType["UXUI"] && (
        <div>
          <h2 className="text-3xl mt-10 font-extrabold border-b-2">UX/UI</h2>
          <Grid.Container justify="space-around" gap={4}>
            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"AWS"}>
                <Image width={40} height={40} src={figma} />
              </Tooltip>
            </Grid>
            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"AWS"}>
                <Image width={40} height={40} src={adobeIlustrator} />
              </Tooltip>
            </Grid>
            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"AWS"}>
                <Image width={40} height={40} src={adobeXd} />
              </Tooltip>
            </Grid>

            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"AWS"}>
                <Image width={40} height={40} src={sketch} />
              </Tooltip>
            </Grid>
            <Grid className="hover:bg-gray-300/[.2]  rounded-lg">
              <Tooltip content={"AWS"}>
                <Image width={40} height={40} src={zepelin} />
              </Tooltip>
            </Grid>
          </Grid.Container>
        </div>
      )}
    </div>
  );
}

export default Technologies;

import { Checkbox, Grid, Tooltip, Text, Spacer } from "@nextui-org/react";
import Image from "next/image";

import React, { MouseEventHandler, useEffect, useState } from "react";
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
import { SurveyType, TechnologiesSurveyType } from "../../types/survey";
import { type } from "os";

function Technologies2({
  typeOfForm,
  setTechnologies,
}: {
  typeOfForm: SurveyType;
  setTechnologies: React.Dispatch<
    React.SetStateAction<TechnologiesSurveyType | undefined>
  >;
}) {
  const [isMobile, setIsMobile] = useState(true);

  const Mobile = () => {
    if (typeof window !== "undefined") {
      console.log(window.innerWidth);
      if (window.innerWidth < 1024) {
        return true;
      }
      return false;
    }
    console.log("window undefined");
    return false;
  };

  //states
  const [languages, setLanguages] = useState<string[]>([]);
  const [frontend, setFrontend] = useState<string[]>([]);
  const [backend, setBackend] = useState<string[]>([]);
  const [devops, setDevops] = useState<string[]>([]);
  const [databases, setDatabases] = useState<string[]>([]);
  const [uxui, setUxui] = useState<string[]>([]);
  useEffect(() => {
    setTechnologies({ languages, frontend, backend, devops, databases, uxui });
    setIsMobile(Mobile());
    console.log("technologies:", SurveyType["FRONTEND"]);
  }, [languages, frontend, backend, devops, databases, uxui]);

  return (
    <div className=" flex flex-col mt-3  ">
      <h2 className="text-3xl mt-10 font-extralight border-b-2">
        Programing language
      </h2>
      <Spacer y={2} />

      <Checkbox.Group
        color="success"
        orientation={isMobile ? "vertical" : "horizontal"}
        className="overflow-auto w-max mx-auto"
        size="xl"
        onChange={setLanguages}
      >
        <Checkbox value="javascript">
          <div className="flex gap-4 ">
            <Image width={40} height={40} src={javascript} />
            <Text h2>Javascript</Text>
          </div>
        </Checkbox>

        <Checkbox value="typescript">
          <div className="flex gap-4 ">
            <Image width={40} height={40} src={typescript} />
            <Text h2>Typescript</Text>
          </div>
        </Checkbox>
        <Checkbox value="python">
          <div className="flex gap-4 ">
            <Image width={40} height={40} src={python} />
            <Text h2>Python</Text>
          </div>
        </Checkbox>
        <Checkbox value="go">
          <div className="flex gap-4 ">
            <Image width={40} height={40} src={go} />
            <Text h2>Go</Text>
          </div>
        </Checkbox>
        <Checkbox value="java">
          <div className="flex gap-4 ">
            <Image width={40} height={40} src={java} />
            <Text h2>Java</Text>
          </div>
        </Checkbox>
      </Checkbox.Group>
      <Spacer y={2} />

      {typeOfForm == SurveyType["FRONTEND"] && (
        <div>
          <h2 className="text-3xl mt-10 font-extralight border-b-2">
            Frontend
          </h2>
          <Spacer y={2} />

          <Checkbox.Group
            color="success"
            orientation={isMobile ? "vertical" : "horizontal"}
            className="overflow-auto w-max mx-auto"
            size="xl"
            onChange={setFrontend}
          >
            <Checkbox value="react">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={react} />
                <Text h2>React</Text>
              </div>
            </Checkbox>

            <Checkbox value="vue">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={vue} />
                <Text h2>Vue</Text>
              </div>
            </Checkbox>
            <Checkbox value="css">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={css} />
                <Text h2>CSS</Text>
              </div>
            </Checkbox>
            <Checkbox value="go">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={angular} />
                <Text h2>Angular</Text>
              </div>
            </Checkbox>
            <Checkbox value="svelte">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={svelte} />
                <Text h2>Svelte</Text>
              </div>
            </Checkbox>
          </Checkbox.Group>
          <Spacer y={2} />
        </div>
      )}
      {typeOfForm == SurveyType["BACKEND"] && (
        <div>
          <h2 className="text-3xl mt-10 font-extralight border-b-2">Backend</h2>
          <Spacer y={2} />

          <Checkbox.Group
            color="success"
            orientation={isMobile ? "vertical" : "horizontal"}
            className="overflow-auto w-max mx-auto"
            size="xl"
            onChange={setBackend}
          >
            <Checkbox value="nodejs">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={nodejs} />
                <Text h2>NodeJS</Text>
              </div>
            </Checkbox>

            <Checkbox value="expressjs">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={express} />
                <Text h2>ExpressJS</Text>
              </div>
            </Checkbox>
            <Checkbox value="graphql">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={graphql} />
                <Text h2>GraphQL</Text>
              </div>
            </Checkbox>
            <Checkbox value="nginx">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={nginx} />
                <Text h2>Nginx</Text>
              </div>
            </Checkbox>
            <Checkbox value="kafka">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={kafka} />
                <Text h2>Kafka</Text>
              </div>
            </Checkbox>
          </Checkbox.Group>
          <Spacer y={2} />
        </div>
      )}
      {(typeOfForm == SurveyType["BACKEND"] ||
        typeOfForm == SurveyType["DEVOPS"]) && (
        <div>
          <h2 className="text-3xl mt-10 font-extralight border-b-2">
            Databases
          </h2>
          <Spacer y={2} />

          <Checkbox.Group
            color="success"
            orientation={isMobile ? "vertical" : "horizontal"}
            className="overflow-auto w-max mx-auto"
            size="xl"
            onChange={setDatabases}
          >
            <Checkbox value="postgresql">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={postgresql} />
                <Text h2>PostgreSQL</Text>
              </div>
            </Checkbox>

            <Checkbox value="mongodb">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={mongodb} />
                <Text h2>MongoDB</Text>
              </div>
            </Checkbox>
            <Checkbox value="mysql">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={mysql} />
                <Text h2>MySQL</Text>
              </div>
            </Checkbox>
            <Checkbox value="Redis">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={redis} />
                <Text h2>Redis</Text>
              </div>
            </Checkbox>
            <Checkbox value="MariaDB">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={mariadb} />
                <Text h2>MariaDB</Text>
              </div>
            </Checkbox>
          </Checkbox.Group>
          <Spacer y={2} />
        </div>
      )}

      {typeOfForm == SurveyType["DEVOPS"] && (
        <div>
          <h2 className="text-3xl mt-10 font-extralight border-b-2">DevOps</h2>
          <Checkbox.Group
            label="Select your devops technology"
            color="success"
            orientation={isMobile ? "vertical" : "horizontal"}
            className="overflow-auto w-max mx-auto"
            size="xl"
            onChange={setDevops}
          >
            <Checkbox value="aws">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={aws} />
                <Text h2>AWS</Text>
              </div>
            </Checkbox>

            <Checkbox value="azure">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={azure} />
                <Text h2>Azure</Text>
              </div>
            </Checkbox>
            <Checkbox value="kubernetes">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={kubernetes} />
                <Text h2>Kubernetes</Text>
              </div>
            </Checkbox>
            <Checkbox value="firebase">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={firebase} />
                <Text h2>Firebase</Text>
              </div>
            </Checkbox>
            <Checkbox value="docker">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={docker} />
                <Text h2>Docker</Text>
              </div>
            </Checkbox>
          </Checkbox.Group>
          <Spacer y={1} />
        </div>
      )}
      {typeOfForm == SurveyType["UXUI"] && (
        <div>
          <h2 className="text-3xl mt-10 font-extralight border-b-2">UX/UI</h2>
          <Checkbox.Group
            label="Select your UX/UI technology"
            color="success"
            orientation={isMobile ? "vertical" : "horizontal"}
            className="overflow-auto w-max mx-auto"
            size="xl"
            onChange={setUxui}
          >
            <Checkbox value="figma">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={figma} />
                <Text h2>Figma</Text>
              </div>
            </Checkbox>

            <Checkbox value="Ilustrator">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={adobeIlustrator} />
                <Text h2>Ilustrator</Text>
              </div>
            </Checkbox>
            <Checkbox value="xd">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={adobeXd} />
                <Text h2>Xd</Text>
              </div>
            </Checkbox>
            <Checkbox value="sketch">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={sketch} />
                <Text h2>Sketch</Text>
              </div>
            </Checkbox>
            <Checkbox value="zeppelin">
              <div className="flex gap-4 ">
                <Image width={40} height={40} src={zepelin} />
                <Text h2>Zeppelin</Text>
              </div>
            </Checkbox>
          </Checkbox.Group>
          <Spacer y={2} />
        </div>
      )}
    </div>
  );
}

export default Technologies2;

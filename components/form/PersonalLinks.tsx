import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { PersonalLinksSurveyType } from "../../types/survey";

function PersonalLinks({
  setPersonalLinks,
}: {
  setPersonalLinks: React.Dispatch<
    React.SetStateAction<PersonalLinksSurveyType | undefined>
  >;
}) {
  const [githubUrl, setGithubUrl] = useState<string>("");
  const [linkedinUrl, setLinkedinUrl] = useState<string>("");
  const [repositoryUrl, setRepositoryUrl] = useState<string>("");

  useEffect(() => {
    setPersonalLinks({ githubUrl, linkedinUrl, repositoryUrl });
  }, [githubUrl, linkedinUrl, repositoryUrl]);
  return (
    <div className="flex flex-col">
      <h2 className="text-3xl mt-10 font-extrabold">Github</h2>
      <h3 className="font-light my-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.{" "}
      </h3>
      <Input
        label="Github Url"
        type="url"
        onChange={(e) => {
          setGithubUrl(e.target.value);
        }}
      />
      <h2 className="text-3xl mt-10 font-extrabold">Repo</h2>
      <h3 className="font-light my-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.{" "}
      </h3>
      <Input
        label="Repo Url"
        type="url"
        onChange={(e) => {
          setRepositoryUrl(e.target.value);
        }}
      />
      <h2 className="text-3xl mt-10 font-extrabold">Linkedin</h2>
      <h3 className="font-light my-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.{" "}
      </h3>

      <Input
        label="Linkedin Url"
        type="url"
        onChange={(e) => {
          setLinkedinUrl(e.target.value);
        }}
      />
    </div>
  );
}

export default PersonalLinks;

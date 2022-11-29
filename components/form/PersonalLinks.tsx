import { Input } from "@nextui-org/react";
import React from "react";
import { PersonalLinksSurveyType } from "../../types/survey";

function PersonalLinks({
  setPersonalLinks,
}: {
  setPersonalLinks: React.Dispatch<
    React.SetStateAction<PersonalLinksSurveyType | undefined>
  >;
}) {
  return (
    <div className="flex flex-col">
      <h2 className="text-3xl mt-10 font-extrabold">Github</h2>
      <h3 className="font-light my-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.{" "}
      </h3>
      <Input label="Url" type="url" />
      <h2 className="text-3xl mt-10 font-extrabold">Repo</h2>
      <h3 className="font-light my-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.{" "}
      </h3>
      <Input label="Url" type="url" />
      <h2 className="text-3xl mt-10 font-extrabold">Linkedin</h2>
      <h3 className="font-light my-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.{" "}
      </h3>

      <Input label="Url" type="url" />
    </div>
  );
}

export default PersonalLinks;

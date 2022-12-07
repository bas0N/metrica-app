import { Textarea, useTheme } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { AboutYouSurveyType } from "../../types/survey";
import Select from "../input/Select";
interface SelectProps {
  command: string;
  options: Array<{ value: string; desc: string }>;
}
const selectPropsYears: SelectProps = {
  command: "Select how many years of experience do you have.",
  options: [
    { desc: "1 Year", value: "1" },
    { desc: "2 Years", value: "2" },
    { desc: "3 Years", value: "3" },
  ],
};
const selectPropsPosition: SelectProps = {
  command: "Which position you identify yourself with",
  options: [
    { desc: "Intern", value: "1" },
    { desc: "Junior", value: "2" },
    { desc: "Mid", value: "3" },
    { desc: "Senior", value: "4" },
  ],
};
function AboutYou({
  setAboutYou,
}: {
  setAboutYou: React.Dispatch<
    React.SetStateAction<AboutYouSurveyType | undefined>
  >;
}) {
  const [description, setDescription] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [yearsOfExperience, setYearsOfExperience] = useState<string>("");

  const { isDark, type } = useTheme();
  useEffect(() => {
    setAboutYou({ position, yearsOfExperience, description });
  }, [description, position, yearsOfExperience]);
  return (
    <div className="flex flex-col">
      <Select handler={setYearsOfExperience} {...selectPropsYears} />
      <Select handler={setPosition} {...selectPropsPosition} />
      <Textarea
        className="mt-4"
        label="Write your thoughts"
        placeholder="Write something about yourself."
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
    </div>
  );
}

export default AboutYou;

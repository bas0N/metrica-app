import { Textarea, useTheme } from "@nextui-org/react";
import React from "react";
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
  const { isDark, type } = useTheme();
  return (
    <div className="flex flex-col">
      <Select {...selectPropsYears} />
      <Select {...selectPropsPosition} />
      <Textarea
        className="mt-4"
        label="Write your thoughts"
        placeholder="Enter your amazing ideas."
      />
    </div>
  );
}

export default AboutYou;
